# bdp000-bootstrap

[`bdp000-bootstrap.clar`](../contracts/proposals/testnet/bdp000-bootstrap.clar)

Title: BDP000 Unit Tests

Author: Mike Cohen

Synopsis:

Boot proposal that sets the governance token, DAO parameters, and extensions, and

mints the initial governance tokens.

Description:

Mints the initial supply of governance tokens and enables the the following

extensions: "BDE000 Governance Token", "BDE001 Proposal Voting",

"BDE002 Proposal Submission", "BDE003 Core Proposals",

"BDE004 Core Execute".

**Public functions:**

- [`execute`](#execute)

**Read-only functions:**

**Private functions:**

**Maps**

**Variables**

**Constants**

## Functions

### execute

[View in file](../contracts/proposals/testnet/bdp000-bootstrap.clar#L14)

`(define-public (execute ((sender principal)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
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
		(try! (contract-call? .bde003-core-proposals set-core-team-member 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM true))
		(try! (contract-call? .bde003-core-proposals set-core-team-member 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5 true))

		;; Set executive team members.
		(try! (contract-call? .bde004-core-execute set-executive-team-member 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM true))
		(try! (contract-call? .bde004-core-execute set-executive-team-member 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5 true))
		(try! (contract-call? .bde004-core-execute set-executive-team-member 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG true))
		(try! (contract-call? .bde004-core-execute set-executive-team-member 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC true))
		(try! (contract-call? .bde004-core-execute set-signals-required u2)) ;; signal from 3 out of 4 team members requied.

		;; Mint initial token supply.
		(try! (contract-call? .bde000-governance-token bdg-mint-many
			(list
				{amount: u1000, recipient: sender}
				{amount: u1000, recipient: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5}
				{amount: u1000, recipient: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG}
				{amount: u1000, recipient: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC}
				{amount: u1000000000, recipient: .bde006-treasury}
			)
		))

		(print "Bitcoin DAO has risen.")
		(ok true)
	)
)
```

</details>

**Parameters:**

| Name   | Type      |
| ------ | --------- |
| sender | principal |

## Maps

## Variables

## Constants
