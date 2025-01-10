;; Title: BDE001 Snapshot Proposal Voting
;; Author: Mike Cohen (based upon work of Marvin Janssen)
;; Depends-On: 
;; Synopsis:
;; This extension is a concept that allows all STX holders to
;; vote on proposals based on their STX balance.
;; Description:
;; This extension allows anyone with STX to vote on proposals. The maximum upper
;; bound, or voting power, depends on the amount of STX tokens the tx-sender
;; owned at the start block height of the proposal. The name "snapshot" comes
;; from the fact that the extension effectively uses the STX balance sheet
;; at a specific block heights to determine voting power. 
;; Custom majority thresholds for voting are also possible on a per proposal basis.
;; A custom majority of 66% mean the percent of votes for must be greater than 66 for
;; the vote to carry.

(impl-trait .extension-trait.extension-trait)
(impl-trait .voting-trait.voting-trait)
(use-trait proposal-trait .proposal-trait.proposal-trait)

(define-constant err-unauthorised (err u3000))
(define-constant err-proposal-already-executed (err u3001))
(define-constant err-proposal-already-exists (err u3002))
(define-constant err-unknown-proposal (err u3003))
(define-constant err-proposal-already-concluded (err u3004))
(define-constant err-proposal-inactive (err u3005))
(define-constant err-insufficient-voting-capacity (err u3006))
(define-constant err-end-burn-height-not-reached (err u3007))
(define-constant err-not-majority (err u3008))
(define-constant err-proposal-start-no-reached (err u3009))
(define-constant err-historical-data (err u3010))

(define-constant custom-majority-upper u10000)

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

(define-map proposals
	principal
	{
		votes-for: uint,
		votes-against: uint,
		start-height-stacks: uint,
		start-burn-height: uint,
		end-burn-height: uint,
		concluded: bool,
		passed: bool,
		custom-majority: (optional uint), ;; u10000 = 100%
		proposer: principal
	}
)
(define-map voter-timestamps {proposal: principal, voter: principal} uint)
(define-map member-total-votes {proposal: principal, voter: principal} uint)

;; --- Authorisation check

(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .bitcoin-dao) (contract-call? .bitcoin-dao is-extension contract-caller)) err-unauthorised))
)

;; --- Internal DAO functions

;; Proposals

(define-public (add-proposal (proposal <proposal-trait>) (data {start-height-stacks: uint, start-burn-height: uint, end-burn-height: uint, proposer: principal, custom-majority: (optional uint)}))
	(begin
		(try! (is-dao-or-extension))
		(asserts! (is-none (contract-call? .bitcoin-dao executed-at proposal)) err-proposal-already-executed)
		(asserts! (match (get custom-majority data) majority (> majority u5000) true) err-not-majority)
		(print {event: "propose", proposal: proposal, proposer: tx-sender})
		(ok (asserts! (map-insert proposals (contract-of proposal) (merge {votes-for: u0, votes-against: u0, concluded: false, passed: false} data)) err-proposal-already-exists))
	)
)

;; --- Public functions

;; Proposals

(define-read-only (get-proposal-data (proposal principal))
	(map-get? proposals proposal)
)

;; Votes

(define-read-only (get-current-total-votes (proposal principal) (voter principal))
	(default-to u0 (map-get? member-total-votes {proposal: proposal, voter: voter}))
)

(define-read-only (get-historical-values (height uint) (who principal))
  (at-block (unwrap! (get-stacks-block-info? id-header-hash height) none)
    (let (
      (account-data (stx-account who)) ;; Fetch the STX account data
    )
      (some 
        {
          user-balance: (tuple 
            (unlocked (get unlocked account-data))
            (locked (get locked account-data))
          )
        }
      )
    )
  )
)

(define-public (vote (amount uint) (for bool) (proposal principal))
	(let
		(
			(proposal-data (unwrap! (map-get? proposals proposal) err-unknown-proposal))
			(new-total-votes (+ (get-current-total-votes proposal tx-sender) amount))
			(historical-values (unwrap! (get-historical-values (get start-height-stacks proposal-data) tx-sender) err-historical-data))
  			(total-balance (+ (get unlocked (get user-balance historical-values)) (get locked (get user-balance historical-values))))
		)
		(asserts! (>= burn-block-height (get start-burn-height proposal-data)) err-proposal-start-no-reached)
		(asserts! (< burn-block-height (get end-burn-height proposal-data)) err-proposal-inactive)
		(asserts!
			(<= new-total-votes total-balance) err-insufficient-voting-capacity
		)
			
		(map-set member-total-votes {proposal: proposal, voter: tx-sender} new-total-votes)
		(map-set proposals proposal
			(if for
				(merge proposal-data {votes-for: (+ (get votes-for proposal-data) amount)})
				(merge proposal-data {votes-against: (+ (get votes-against proposal-data) amount)})
			)
		)
		(print {event: "vote", sip18: false, proposal: proposal, voter: tx-sender, for: for, height: (get start-height-stacks proposal-data), amount: amount})
		(ok true)
	)
)

(define-public (batch-vote (votes (list 50 {message: (tuple 
                                                (attestation (string-ascii 100))
                                                (proposal principal) 
                                                (timestamp uint) 
                                                (vote bool)
                                                (voter principal)
                                                (voting_power uint)), 
                                   signature: (buff 65)})))
  (begin
    (ok (fold fold-vote votes u0))
  )
)

(define-private (fold-vote  (input-vote {message: (tuple 
                                                (attestation (string-ascii 100)) 
                                                (proposal principal) 
                                                (timestamp uint) 
                                                (vote bool)
                                                (voter principal)
                                                (voting_power uint)), 
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
                                                (proposal principal) 
                                                (timestamp uint) 
                                                (vote bool)
                                                (voter principal)
                                                (voting_power uint)), 
                                     signature: (buff 65)}))
  (let
    (
      ;; Extract relevant fields from the message
		(message-data (get message input-vote))
		(proposal (get proposal message-data))
		(voter (get voter message-data))
		(voting_power (get voting_power message-data))
		(for (get vote message-data))
		(timestamp (get timestamp message-data))
		(structured-data-hash (sha256 (unwrap! (to-consensus-buff? message-data) err-unauthorised)))
		;; Verify the signature
		(is-valid-sig (verify-signed-structured-data structured-data-hash (get signature input-vote) voter))
		(last-timestamp (default-to u0 (map-get? voter-timestamps {proposal: proposal, voter: voter})))
    )
    (if (and is-valid-sig (> timestamp last-timestamp))
      (let
        (
			;; Proposal details
			(proposal-data (unwrap! (map-get? proposals proposal) (err u3003)))
			;; Total votes already cast
			(new-total-votes (+ (get-current-total-votes proposal voter) voting_power))
			(historical-values (unwrap! (get-historical-values (get start-height-stacks proposal-data) tx-sender) err-historical-data))
			(total-balance (+ (get unlocked (get user-balance historical-values)) (get locked (get user-balance historical-values))))
        )
        (begin
			(asserts! (>= burn-block-height (get start-burn-height proposal-data)) err-proposal-start-no-reached)
			(asserts! (< burn-block-height (get end-burn-height proposal-data)) err-proposal-inactive)
			(asserts!
				(<= new-total-votes total-balance) err-insufficient-voting-capacity
			)
			(map-set proposals proposal
				(if for
					(merge proposal-data {votes-for: (+ (get votes-for proposal-data) voting_power)})
					(merge proposal-data {votes-against: (+ (get votes-against proposal-data) voting_power)})
				)
			)
			(map-set member-total-votes {proposal: proposal, voter: voter} new-total-votes)
			(map-set voter-timestamps {proposal: proposal, voter: voter} timestamp)
			(print {event: "vote", sip18: true,  proposal: proposal, voter: voter, for: for, height: (get start-height-stacks proposal-data), amount: voting_power})
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

(define-read-only (verify-signed-tuple
    (message-data (tuple 
                    (attestation (string-ascii 100)) 
                    (proposal principal)
                    (timestamp uint) 
                    (vote bool)
                    (voter principal)
                    (voting_power uint))) 
    (signature (buff 65)) 
    (signer principal))
  (let
    (
      ;; Compute the structured data hash
      	(structured-data-hash (sha256 (unwrap! (to-consensus-buff? message-data) err-unauthorised)))
    )
    ;; Verify the signature using the computed hash
    (ok (verify-signed-structured-data structured-data-hash signature signer))
  )
)

;; Conclusion

(define-public (conclude (proposal <proposal-trait>))
	(let
		(
			(proposal-data (unwrap! (map-get? proposals (contract-of proposal)) err-unknown-proposal))
			(passed
				(match (get custom-majority proposal-data)
					majority (> (* (get votes-for proposal-data) custom-majority-upper) (* (+ (get votes-for proposal-data) (get votes-against proposal-data)) majority))
					(> (get votes-for proposal-data) (get votes-against proposal-data))
				)
			)
		)
		(asserts! (not (get concluded proposal-data)) err-proposal-already-concluded)
		(asserts! (>= burn-block-height (get end-burn-height proposal-data)) err-end-burn-height-not-reached)
		(map-set proposals (contract-of proposal) (merge proposal-data {concluded: true, passed: passed}))
		(print {event: "conclude", proposal: proposal, passed: passed})
		(and passed (try! (contract-call? .bitcoin-dao execute proposal tx-sender)))
		(ok passed)
	)
)

;; --- Extension callback

(define-public (callback (sender principal) (memo (buff 34)))
	(ok true)
)