;; Title: BDP003 Allowlist Escrow NFT
;; Author: Marvin Janssen
;; Synopsis:
;; An example proposal to illustrate how Bitcoin DAO can manage external
;; own-able contracts.
;; Description:
;; Bitcoin DAO is well-equipped to manage external contracts feature have
;; some form of ownership. This proposal updates the allowlist of an
;; example escrow contract that is owned by the Bitcoin DAO contract.
;; Note that the Bitcoin DAO contract must be the owner of nft-escrow
;; for this proposal to be executed.

(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
	(contract-call? .nft-escrow set-allowlisted .some-nft true)
)
