;; Title: BDE003 Core Proposals
;; Author: Marvin Janssen
;; Depends-On: BDE001
;; Synopsis:
;; This extension allows for the creation of core proposals by a few trusted
;; principals.
;; Description:
;; Core proposals have a voting period of roughly 1 day, instead of the
;; normal proposal duration. Only a list of trusted principals, designated as the
;; "core team", can create core proposals. The core proposal
;; extension has an optional ~3 month sunset period, after which no more core
;; proposals can be made - set it to 0 to disable. The core team members, sunset period, and 
;; core vote duration can be changed by means of a future proposal.

(impl-trait .extension-trait.extension-trait)
(use-trait proposal-trait .proposal-trait.proposal-trait)

(define-data-var core-proposal-duration uint u144) ;; ~1 day
(define-data-var core-team-sunset-height uint u0) ;; does not expire by default - can be changed by proposal

(define-constant err-unauthorised (err u3000))
(define-constant err-not-core-team-member (err u3001))
(define-constant err-sunset-height-reached (err u3002))
(define-constant err-sunset-height-in-past (err u3003))

(define-map core-team principal bool)

;; --- Authorisation check

(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .bitcoin-dao) (contract-call? .bitcoin-dao is-extension contract-caller)) err-unauthorised))
)

;; --- Internal DAO functions

(define-public (set-core-proposal-duration (duration uint))
	(begin
		(try! (is-dao-or-extension))
		(ok (var-set core-proposal-duration duration))
	)
)

(define-public (set-core-team-sunset-height (height uint))
	(begin
		(try! (is-dao-or-extension))
		(asserts! (> height burn-block-height) err-sunset-height-in-past)
		(ok (var-set core-team-sunset-height height))
	)
)

(define-public (set-core-team-member (who principal) (member bool))
	(begin
		(try! (is-dao-or-extension))
		(ok (map-set core-team who member))
	)
)

;; --- Public functions

(define-read-only (is-core-team-member (who principal))
	(default-to false (map-get? core-team who))
)

(define-public (core-propose (proposal <proposal-trait>))
	(begin
		(asserts! (is-core-team-member tx-sender) err-not-core-team-member)
		(asserts! (or (is-eq (var-get core-team-sunset-height) u0) (< burn-block-height (var-get core-team-sunset-height))) err-sunset-height-reached)
		(contract-call? .bde001-proposal-voting add-proposal proposal
			{
				start-block-height: burn-block-height,
				end-block-height: (+ burn-block-height (var-get core-proposal-duration)),
				proposer: tx-sender
			}
		)
	)
)

;; --- Extension callback

(define-public (callback (sender principal) (memo (buff 34)))
	(ok true)
)
