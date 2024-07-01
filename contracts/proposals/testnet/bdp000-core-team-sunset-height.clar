;; Title: BDP000 Unit Tests
;; Author: Mike Cohen
;; Synopsis:
;; sets core team sunset height.

(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
	(begin

		(try! (contract-call? .bde003-core-proposals set-core-team-sunset-height (+ burn-block-height u10)))

		(ok true)
	)
)
