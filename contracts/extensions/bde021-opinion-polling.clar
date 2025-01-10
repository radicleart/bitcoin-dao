;; Title: BDE021 Opinion Polling
;; Author: Mike Cohen
;; Depends-On: 
;; Synopsis:
;; Enables quick opinion polling functionality.
;; Description:
;; A more streamlined type of voting designed to quickly gauge community opinion.
;; Unlike DAO proposals, opinion polls cannot change the configuration of the DAO.

(impl-trait .extension-trait.extension-trait)

(define-constant err-unauthorised (err u2100))
(define-constant err-poll-already-exists (err u2102))
(define-constant err-unknown-proposal (err u2103))
(define-constant err-proposal-inactive (err u2105))
(define-constant err-already-voted (err u2106))
(define-constant err-proposal-start-no-reached (err u2109))


(define-constant structured-data-prefix 0x534950303138)
(define-constant message-domain-hash (sha256 (unwrap! (to-consensus-buff?
	{
		name: "BigMarket",
		version: "1.0.0",
		chain-id: chain-id
	}
    ) err-unauthorised)
))

(define-constant structured-data-header (concat structured-data-prefix message-domain-hash))

(define-data-var poll-cost uint u50000000)

(define-map opinion-polls
	(buff 32)
	{
		votes-for: uint,
		votes-against: uint,
		start-burn-height: uint,
		end-burn-height: uint,
		proposer: principal
	}
)
(define-map member-voted {opinion-poll: (buff 32), voter: principal} bool)

;; --- Authorisation check

(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .bitcoin-dao) (contract-call? .bitcoin-dao is-extension contract-caller)) err-unauthorised))
)

;; --- Internal DAO functions
(define-public (set-poll-cost (new-cost uint))
    (begin
        (try! (is-dao-or-extension))
        (var-set poll-cost new-cost)
        (print {event: "set-poll-cost", new-cost: new-cost})
        (ok true)
    )
)

;; Proposals

(define-public (add-opinion-poll (metadata-hash (buff 32)) (data {start-burn-height: uint, end-burn-height: uint, proposer: principal}))
	(begin
		;;(try! (is-dao-or-extension))
        (try! (stx-transfer? (var-get poll-cost) tx-sender .bde006-treasury))
		(asserts! (is-none (map-get? opinion-polls metadata-hash)) err-poll-already-exists)
		(print {event: "add-poll", metadata-hash: metadata-hash, proposer: tx-sender})
		(map-set opinion-polls metadata-hash
			{votes-for: u0, votes-against: u0, start-burn-height: (get start-burn-height data), end-burn-height: (get end-burn-height data), proposer: tx-sender})
		(ok true)
	)
)

;; --- Public functions

(define-read-only (get-proposal-data (metadata-hash (buff 32)))
	(map-get? opinion-polls metadata-hash)
)


;; Votes

(define-public (vote (opinion-poll (buff 32)) (for bool))
    (let
        (
            (poll-data (unwrap! (map-get? opinion-polls opinion-poll) err-unknown-proposal))
        )
        ;; Ensure the voter has not already voted
        (asserts! (is-none (map-get? member-voted {opinion-poll: opinion-poll, voter: tx-sender})) err-already-voted)

        ;; Ensure the voting period is active
		(asserts! (>= burn-block-height (get start-burn-height poll-data)) err-proposal-start-no-reached)
		(asserts! (< burn-block-height (get end-burn-height poll-data)) err-proposal-inactive)

        ;; Record the vote
        (map-set opinion-polls opinion-poll
            (if for
                (merge poll-data {votes-for: (+ (get votes-for poll-data) u1)})
                (merge poll-data {votes-against: (+ (get votes-against poll-data) u1)})
            )
        )

        ;; Mark the voter as having voted
        (map-set member-voted {opinion-poll: opinion-poll, voter: tx-sender} true)

        (print {event: "poll", poll: opinion-poll, voter: tx-sender, for: for})
        (ok true)
    )
)

(define-public (batch-vote (votes (list 50 {message: (tuple 
                                                (attestation (string-ascii 100)) 
                                                (opinion-poll (buff 32)) 
                                                (timestamp uint) 
                                                (vote bool)
                                                (voter principal)), 
                                   signature: (buff 65)})))
  (begin
    (ok (fold fold-vote votes u0))
  )
)

(define-private (fold-vote  (input-vote {message: (tuple 
                                                (attestation (string-ascii 100)) 
                                                (opinion-poll (buff 32)) 
                                                (timestamp uint) 
                                                (vote bool)
                                                (voter principal)), 
                                     signature: (buff 65)}) (current uint))
  (let
    (
      (vote-result (process-vote input-vote))
    )
    (if (is-ok vote-result)
        (if (is-eq (unwrap! vote-result u0) u1)
            (+ current u1)
            current) 
        current)
  )
)

(define-private (process-vote (input-vote {message: (tuple 
                                                (attestation (string-ascii 100)) 
                                                (opinion-poll (buff 32)) 
                                                (timestamp uint) 
                                                (vote bool)
                                                (voter principal)), 
                                     signature: (buff 65)}))
  (let
    (
      ;; Extract relevant fields from the message
      (message-data (get message input-vote))
      (opinion-poll (get opinion-poll message-data))
      (voter (get voter message-data))
      (for (get vote message-data))
      (structured-data-hash (sha256 (unwrap! (to-consensus-buff? message-data) err-unauthorised)))
      ;; Verify the signature
      (is-valid-sig (verify-signed-structured-data structured-data-hash (get signature input-vote) voter))
    )

    ;; Ensure the signature is valid
    (if is-valid-sig
      (let
        (
          ;; Poll details
          (poll-data (unwrap! (map-get? opinion-polls opinion-poll) err-unknown-proposal))
        )
        (begin
          ;; Ensure the voting period is active
		(asserts! (>= burn-block-height (get start-burn-height poll-data)) err-proposal-start-no-reached)
		(asserts! (< burn-block-height (get end-burn-height poll-data)) err-proposal-inactive)

          ;; Ensure the voter has not already voted
        (asserts! (is-none (map-get? member-voted {opinion-poll: opinion-poll, voter: tx-sender})) err-already-voted)

          ;; Record the vote
          (map-set opinion-polls opinion-poll
            (if for
              (merge poll-data {votes-for: (+ (get votes-for poll-data) u1)})
              (merge poll-data {votes-against: (+ (get votes-against poll-data) u1)})
            )
          )

          ;; Mark the voter as having voted
          (map-set member-voted {opinion-poll: opinion-poll, voter: voter} true)

          ;; Emit a vote event
          (print {event: "poll", opinion-poll: opinion-poll, voter: voter, for: for})
          (ok u1) ;; Vote processed successfully
        )
      )
      (begin
        (ok u0) ;; Invalid signature, skip vote
      )
    )
  )
)

(define-read-only (verify-signature (hash (buff 32)) (signature (buff 65)) (signer principal))
	(is-eq (principal-of? (unwrap! (secp256k1-recover? hash signature) false)) (ok signer))
)

(define-read-only (verify-signed-structured-data (structured-data-hash (buff 32)) (signature (buff 65)) (signer principal))
	(verify-signature (sha256 (concat structured-data-header structured-data-hash)) signature signer)
)

;; Conclusion

(define-read-only (get-poll-status (opinion-poll (buff 32)))
    (let
        (
            (poll-data (unwrap! (map-get? opinion-polls opinion-poll) err-unknown-proposal))
            (is-active (< burn-block-height (get end-burn-height poll-data)))
            (passed (> (get votes-for poll-data) (get votes-against poll-data)))
        )
        (ok {active: is-active, passed: passed})
    )
)

;; --- Extension callback
(define-public (callback (sender principal) (memo (buff 34)))
	(ok true)
)