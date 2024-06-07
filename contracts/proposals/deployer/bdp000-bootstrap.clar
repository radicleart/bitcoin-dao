;; Title: BDP000 Unit Tests
;; Author: Mike Cohen
;; Synopsis:
;; Boot proposal that sets the governance token, DAO parameters, and extensions, and
;; mints the initial governance tokens.
;; Description:
;; Mints the initial supply of governance tokens and enables the the following 
;; extensions: "BDE000 Governance Token", "BDE001 Proposal Voting",
;; "BDE002 Proposal Submission", "BDE003 Core Proposals",
;; "BDE004 Core Execute".

(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
	(begin
		;; Enable genesis extensions.
		(try! (contract-call? .bitcoin-dao set-extensions
			(list
				{extension: .bde000-governance-token, enabled: true}
				{extension: .bde001-proposal-voting, enabled: true}
				{extension: .bde002-proposal-submission, enabled: true}
				{extension: .bde003-core-proposals, enabled: true}
				{extension: .bde004-core-execute, enabled: true}
				{extension: .bde006-treasury, enabled: true}
				{extension: .bde020-resource-manager, enabled: true}
			)
		))

		;; Set core team members.
		(try! (contract-call? .bde003-core-proposals set-core-team-member '{{core-team1}} true))
		(try! (contract-call? .bde003-core-proposals set-core-team-member '{{core-team2}} true))
		(try! (contract-call? .bde003-core-proposals set-core-team-member '{{core-team3}} true))
		(try! (contract-call? .bde003-core-proposals set-core-team-member '{{core-team4}} true))

		;; Set executive team members.
		(try! (contract-call? .bde004-core-execute set-executive-team-member '{{core-team1}} true))
		(try! (contract-call? .bde004-core-execute set-executive-team-member '{{core-team2}} true))
		(try! (contract-call? .bde004-core-execute set-executive-team-member '{{core-team3}} true))
		(try! (contract-call? .bde004-core-execute set-executive-team-member '{{core-team4}} true))
		(try! (contract-call? .bde004-core-execute set-signals-required u2)) ;; signal from 3 out of 4 team members requied.

		;; Mint initial token supply.
		(try! (contract-call? .bde000-governance-token bdg-mint-many
			(list
				{amount: u1000, recipient: sender}
				{amount: u1000, recipient: '{{core-team1}}}
				{amount: u1000, recipient: '{{core-team2}}}
				{amount: u1000, recipient: '{{core-team3}}}
				{amount: u1000, recipient: '{{core-team4}}}
			)
		))

		(print "Bitcoin DAO has risen.")
		(ok true)
	)
)
