;; Title: BDE021 Poll Gating
;; Author: Mike Cohen
;; Depends-On: 
;; Synopsis:
;; Efficient verification of access control using merkel roots.
;; Description:
;; If the owner of a poll uploads a merkel root on poll creation the 
;; voting contract can call into this contract to determine if the current 
;; voter is allowed to vote - the rule are 1) the user must own eithr the 
;; nft token or the amount of ft provided and the nft/ft contract id hash
;; must be a hash leading to the merkel root and proven by the passed in proof.

;; Define the SIP-009 and SIP-010 traits
(use-trait nft-trait .sip009-nft-trait.nft-trait)
(use-trait ft-trait .sip010-ft-trait.sip010-ft-trait)
(impl-trait .extension-trait.extension-trait)

(define-constant err-unauthorised (err u2200))
(define-constant err-either-sip9-or-sip10-required (err u2201))
(define-constant err-token-contract-invalid (err u2202))
(define-constant err-token-ownership-invalid (err u2203))
(define-constant err-expecting-nft-contract (err u2204))
(define-constant err-expecting-ft-contract (err u2205))
(define-constant err-expecting-token-id (err u2206))
(define-constant err-not-nft-owner (err u2207))
(define-constant err-not-ft-owner (err u2208))
(define-constant err-expecting-nft-buffer (err u2209))
(define-constant err-expecting-ft-buffer (err u2210))
(define-constant err-expecting-valid-merkel-proof (err u2211))
(define-constant err-expecting-merkel-root-for-poll (err u2212))
(define-constant err-expecting-an-owner (err u2213))

;; Storage: Merkle roots for each poll
(define-map merkle-roots
  (buff 32) ;; poll identifier
  (buff 32))  ;; merkel root


(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .bitcoin-dao) (contract-call? .bitcoin-dao is-extension contract-caller)) err-unauthorised))
)


;; Admin sets the Merkle root for a poll
(define-public (set-merkle-root (poll-id (buff 32)) (root (buff 32)))
  (begin
    ;; Ensure only dao can set the root
    (try! (is-dao-or-extension))

    ;; Store the Merkle root
    (map-set merkle-roots poll-id root)
    (ok true)
  )
)

;; Verify a Merkle proof
(define-private (calculate-hash (hash1 (buff 32)) (hash2 (buff 32)))
  (if (< hash1 hash2)
      (sha256 (concat hash1 hash2))
      (sha256 (concat hash2 hash1))))

(define-private (verify-merkle-proof
    (leaf (buff 32))               ;; The leaf hash (token hash)
    (proof (list 10 (buff 32)))    ;; The Merkle proof
    (root (buff 32))               ;; The Merkle root
  )
  (let
      (
        (calculated-root
          (fold calculate-hash proof leaf)
        )
      )
    (ok (is-eq calculated-root root))
  ))


(define-private (verify-nft-ownership
    (nft-contract <nft-trait>) ;; NFT contract
    (voter principal)          ;; Voter's principal
    (token-id uint)            ;; Token ID
  )
  (let
      (
        (owner (unwrap! (contract-call? nft-contract get-owner token-id) (err u301)))
      )
    (ok (is-eq (unwrap! owner err-expecting-an-owner) voter))
  ))

(define-private (verify-ft-balance
    (ft-contract <ft-trait>) ;; FT contract
    (voter principal)        ;; Voter's principal
    (quantity uint)          ;; Required token quantity
  )
  (let
      (
        (balance (unwrap! (contract-call? ft-contract get-balance voter) (err u304)))
      )
    (ok (>= balance quantity))
  ))


;; Validate proof of access
(define-public (can-access
    (metadata-hash (buff 32))                ;; The poll ID
    (nft-contract (optional <nft-trait>)) ;; Optional NFT contract
    (ft-contract (optional <ft-trait>))   ;; Optional FT contract
    (token-id (optional uint))         ;; Token ID for NFTs
    (proof (list 10 (buff 32)))        ;; The Merkle proof
    (quantity uint)                    ;; Required token quantity
  )
  (let
      (
        ;; Determine if this is an NFT or FT contract
        (is-nft-contract (is-some nft-contract))

        ;; Fetch the Merkle root for the poll
        (root (unwrap! (map-get? merkle-roots metadata-hash) err-expecting-merkel-root-for-poll))

        ;; Compute the Merkle proof leaf
        (contract-id (if is-nft-contract
                         (unwrap! (to-consensus-buff? (as-contract (unwrap! nft-contract err-expecting-nft-contract))) err-expecting-nft-buffer)
                         (unwrap! (to-consensus-buff? (as-contract (unwrap! ft-contract err-expecting-ft-contract))) err-expecting-ft-buffer)))
        (leaf (sha256 contract-id))

        ;; Verify the Merkle proof
        (proof-valid (unwrap! (verify-merkle-proof leaf proof root) err-expecting-valid-merkel-proof))

        ;; Verify ownership or balance
        (ownership-valid
          (if is-nft-contract
              (unwrap! (verify-nft-ownership (unwrap! nft-contract err-expecting-nft-contract) tx-sender (unwrap! token-id err-expecting-token-id)) err-not-nft-owner)
              (unwrap! (verify-ft-balance (unwrap! ft-contract err-expecting-ft-contract) tx-sender quantity) err-not-ft-owner)))
      )
    ;; Ensure both conditions are satisfied
    (asserts! proof-valid err-token-contract-invalid)
    (asserts! ownership-valid err-token-ownership-invalid)
    (ok true)
  ))


  ;; --- Extension callback
(define-public (callback (sender principal) (memo (buff 34)))
	(ok true)
)

