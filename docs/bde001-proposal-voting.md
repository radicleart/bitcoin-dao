# bde001-proposal-voting

[`bde001-proposal-voting.clar`](../contracts/extensions/bde001-proposal-voting.clar)

Title: BDE001 Proposal Voting

Author: Marvin Janssen

Depends-On: BDE000

Synopsis:

This extension is part of the core of Bitcoin DAO. It allows governance token

holders to vote on and conclude proposals.

Description:

Once proposals are submitted, they are open for voting after a lead up time

passes. Any token holder may vote on an open proposal, where one token equals

one vote. Members can vote until the voting period is over. After this period

anyone may trigger a conclusion. The proposal will then be executed if the

votes in favour exceed the ones against.

**Public functions:**

- [`is-dao-or-extension`](#is-dao-or-extension)
- [`set-governance-token`](#set-governance-token)
- [`add-proposal`](#add-proposal)
- [`vote`](#vote)
- [`conclude`](#conclude)
- [`reclaim-votes`](#reclaim-votes)
- [`reclaim-and-vote`](#reclaim-and-vote)
- [`callback`](#callback)

**Read-only functions:**

- [`get-governance-token`](#get-governance-token)
- [`get-proposal-data`](#get-proposal-data)
- [`get-current-total-votes`](#get-current-total-votes)

**Private functions:**

- [`is-governance-token`](#is-governance-token)

**Maps**

- [`proposals`](#proposals)
- [`member-total-votes`](#member-total-votes)

**Variables**

- [`governance-token-principal`](#governance-token-principal)

**Constants**

- [`err-unauthorised`](#err-unauthorised)
- [`err-not-governance-token`](#err-not-governance-token)
- [`err-proposal-already-executed`](#err-proposal-already-executed)
- [`err-proposal-already-exists`](#err-proposal-already-exists)
- [`err-unknown-proposal`](#err-unknown-proposal)
- [`err-proposal-already-concluded`](#err-proposal-already-concluded)
- [`err-proposal-inactive`](#err-proposal-inactive)
- [`err-proposal-not-concluded`](#err-proposal-not-concluded)
- [`err-no-votes-to-return`](#err-no-votes-to-return)
- [`err-end-block-height-not-reached`](#err-end-block-height-not-reached)
- [`err-disabled`](#err-disabled)

## Functions

### is-dao-or-extension

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L49)

`(define-public (is-dao-or-extension () (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .bitcoin-dao) (contract-call? .bitcoin-dao is-extension contract-caller)) err-unauthorised))
)
```

</details>

### set-governance-token

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L57)

`(define-public (set-governance-token ((governance-token trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-governance-token (governance-token <governance-token-trait>))
	(begin
		(try! (is-dao-or-extension))
		(ok (var-set governance-token-principal (contract-of governance-token)))
	)
)
```

</details>

**Parameters:**

| Name             | Type            |
| ---------------- | --------------- |
| governance-token | trait_reference |

### add-proposal

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L66)

`(define-public (add-proposal ((proposal trait_reference) (data (tuple (end-block-height uint) (proposer principal) (start-block-height uint)))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (add-proposal (proposal <proposal-trait>) (data {start-block-height: uint, end-block-height: uint, proposer: principal}))
	(begin
		(try! (is-dao-or-extension))
		(asserts! (is-none (contract-call? .bitcoin-dao executed-at proposal)) err-proposal-already-executed)
		(print {event: "propose", proposal: proposal, proposer: tx-sender})
		(ok (asserts! (map-insert proposals (contract-of proposal) (merge {votes-for: u0, votes-against: u0, concluded: false, passed: false} data)) err-proposal-already-exists))
	)
)
```

</details>

**Parameters:**

| Name     | Type                                                                           |
| -------- | ------------------------------------------------------------------------------ |
| proposal | trait_reference                                                                |
| data     | (tuple (end-block-height uint) (proposer principal) (start-block-height uint)) |

### get-governance-token

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L79)

`(define-read-only (get-governance-token () principal)`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-governance-token)
	(var-get governance-token-principal)
)
```

</details>

### is-governance-token

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L83)

`(define-private (is-governance-token ((governance-token trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-private (is-governance-token (governance-token <governance-token-trait>))
	(ok (asserts! (is-eq (contract-of governance-token) (var-get governance-token-principal)) err-not-governance-token))
)
```

</details>

**Parameters:**

| Name             | Type            |
| ---------------- | --------------- |
| governance-token | trait_reference |

### get-proposal-data

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L89)

`(define-read-only (get-proposal-data ((proposal principal)) (optional (tuple (concluded bool) (end-block-height uint) (passed bool) (proposer principal) (start-block-height uint) (votes-against uint) (votes-for uint))))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-proposal-data (proposal principal))
	(map-get? proposals proposal)
)
```

</details>

**Parameters:**

| Name     | Type      |
| -------- | --------- |
| proposal | principal |

### get-current-total-votes

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L95)

`(define-read-only (get-current-total-votes ((proposal principal) (voter principal) (governance-token principal)) uint)`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-current-total-votes (proposal principal) (voter principal) (governance-token principal))
	(default-to u0 (map-get? member-total-votes {proposal: proposal, voter: voter, governance-token: governance-token}))
)
```

</details>

**Parameters:**

| Name             | Type      |
| ---------------- | --------- |
| proposal         | principal |
| voter            | principal |
| governance-token | principal |

### vote

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L99)

`(define-public (vote ((amount uint) (for bool) (proposal principal) (governance-token trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (vote (amount uint) (for bool) (proposal principal) (governance-token <governance-token-trait>))
	(let
		(
			(proposal-data (unwrap! (map-get? proposals proposal) err-unknown-proposal))
			(token-principal (contract-of governance-token))
		)
		(try! (is-governance-token governance-token))
		(asserts! (>= burn-block-height (get start-block-height proposal-data)) err-proposal-inactive)
		(asserts! (< burn-block-height (get end-block-height proposal-data)) err-proposal-inactive)
		(map-set member-total-votes {proposal: proposal, voter: tx-sender, governance-token: token-principal}
			(+ (get-current-total-votes proposal tx-sender token-principal) amount)
		)
		(map-set proposals proposal
			(if for
				(merge proposal-data {votes-for: (+ (get votes-for proposal-data) amount)})
				(merge proposal-data {votes-against: (+ (get votes-against proposal-data) amount)})
			)
		)
		(print {event: "vote", proposal: proposal, voter: tx-sender, for: for, amount: amount})
		(contract-call? governance-token bdg-lock amount tx-sender)
	)
)
```

</details>

**Parameters:**

| Name             | Type            |
| ---------------- | --------------- |
| amount           | uint            |
| for              | bool            |
| proposal         | principal       |
| governance-token | trait_reference |

### conclude

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L124)

`(define-public (conclude ((proposal trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (conclude (proposal <proposal-trait>))
	(let
		(
			(proposal-data (unwrap! (map-get? proposals (contract-of proposal)) err-unknown-proposal))
			(passed (> (get votes-for proposal-data) (get votes-against proposal-data)))
		)
		(asserts! (not (get concluded proposal-data)) err-proposal-already-concluded)
		(asserts! (>= burn-block-height (get end-block-height proposal-data)) err-end-block-height-not-reached)
		(map-set proposals (contract-of proposal) (merge proposal-data {concluded: true, passed: passed}))
		(print {event: "conclude", proposal: proposal, passed: passed})
		(and passed (try! (contract-call? .bitcoin-dao execute proposal tx-sender)))
		(ok passed)
	)
)
```

</details>

**Parameters:**

| Name     | Type            |
| -------- | --------------- |
| proposal | trait_reference |

### reclaim-votes

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L141)

`(define-public (reclaim-votes ((proposal trait_reference) (governance-token trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (reclaim-votes (proposal <proposal-trait>) (governance-token <governance-token-trait>))
	(let
		(
			(proposal-principal (contract-of proposal))
			(token-principal (contract-of governance-token))
			(proposal-data (unwrap! (map-get? proposals proposal-principal) err-unknown-proposal))
			(votes (unwrap! (map-get? member-total-votes {proposal: proposal-principal, voter: tx-sender, governance-token: token-principal}) err-no-votes-to-return))
		)
		(asserts! (get concluded proposal-data) err-proposal-not-concluded)
		(map-delete member-total-votes {proposal: proposal-principal, voter: tx-sender, governance-token: token-principal})
		(contract-call? governance-token bdg-unlock votes tx-sender)
	)
)
```

</details>

**Parameters:**

| Name             | Type            |
| ---------------- | --------------- |
| proposal         | trait_reference |
| governance-token | trait_reference |

### reclaim-and-vote

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L155)

`(define-public (reclaim-and-vote ((amount uint) (for bool) (proposal principal) (reclaim-from trait_reference) (governance-token trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (reclaim-and-vote (amount uint) (for bool) (proposal principal) (reclaim-from <proposal-trait>) (governance-token <governance-token-trait>))
	(begin
		(try! (reclaim-votes reclaim-from governance-token))
		(vote amount for proposal governance-token)
	)
)
```

</details>

**Parameters:**

| Name             | Type            |
| ---------------- | --------------- |
| amount           | uint            |
| for              | bool            |
| proposal         | principal       |
| reclaim-from     | trait_reference |
| governance-token | trait_reference |

### callback

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L164)

`(define-public (callback ((sender principal) (memo (buff 34))) (response bool none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (callback (sender principal) (memo (buff 34)))
	(ok true)
)
```

</details>

**Parameters:**

| Name   | Type      |
| ------ | --------- |
| sender | principal |
| memo   | (buff 34) |

## Maps

### proposals

```clarity
(define-map proposals
	principal
	{
		votes-for: uint,
		votes-against: uint,
		start-block-height: uint,
		end-block-height: uint,
		concluded: bool,
		passed: bool,
		proposer: principal
	}
)
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L32)

### member-total-votes

```clarity
(define-map member-total-votes {proposal: principal, voter: principal, governance-token: principal} uint)
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L45)

## Variables

### governance-token-principal

principal

```clarity
(define-data-var governance-token-principal principal .bde000-governance-token)
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L30)

## Constants

### err-unauthorised

```clarity
(define-constant err-unauthorised (err u3100))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L18)

### err-not-governance-token

```clarity
(define-constant err-not-governance-token (err u3101))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L19)

### err-proposal-already-executed

```clarity
(define-constant err-proposal-already-executed (err u3102))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L20)

### err-proposal-already-exists

```clarity
(define-constant err-proposal-already-exists (err u3103))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L21)

### err-unknown-proposal

```clarity
(define-constant err-unknown-proposal (err u3104))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L22)

### err-proposal-already-concluded

```clarity
(define-constant err-proposal-already-concluded (err u3105))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L23)

### err-proposal-inactive

```clarity
(define-constant err-proposal-inactive (err u3106))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L24)

### err-proposal-not-concluded

```clarity
(define-constant err-proposal-not-concluded (err u3107))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L25)

### err-no-votes-to-return

```clarity
(define-constant err-no-votes-to-return (err u3108))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L26)

### err-end-block-height-not-reached

```clarity
(define-constant err-end-block-height-not-reached (err u3109))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L27)

### err-disabled

```clarity
(define-constant err-disabled (err u3110))
```

[View in file](../contracts/extensions/bde001-proposal-voting.clar#L28)
