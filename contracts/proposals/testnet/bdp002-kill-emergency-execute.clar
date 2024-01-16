;; Title: BDP002 Kill Emergency Execute
;; Author: Marvin Janssen
;; Synopsis:
;; This proposal disables extension "BDE004 Emergency Execute".
;; Description:
;; If this proposal passes, extension "BDE004 Emergency Execute" is immediately
;; disabled.

(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
	(contract-call? .bitcoin-dao set-extension .bde004-emergency-execute false)
)
