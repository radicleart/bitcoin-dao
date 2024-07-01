# bde004-core-execute

[`bde004-core-execute.clar`](../contracts/extensions/bde004-core-execute.clar)

Title: BDE004 Core Execute

Author: Marvin Janssen

Depends-On:

Synopsis:

This extension allows a small number of very trusted principals to immediately

execute a proposal once a super majority is reached.

Description:

An extension meant for the bootstrapping period of a DAO. It temporarily gives

some very trusted principals the ability to perform an "executive action";

meaning, they can skip the voting process to immediately executive a proposal.

The Core execute extension has an optional sunset period of ~1 month from deploy

time, set it to 0 to disable. The core executive team, parameters, and sunset period may be changed

by means of a future proposal.

**Public functions:**

- [`is-dao-or-extension`](#is-dao-or-extension)
- [`set-executive-team-sunset-height`](#set-executive-team-sunset-height)
- [`set-executive-team-member`](#set-executive-team-member)
- [`set-signals-required`](#set-signals-required)
- [`executive-action`](#executive-action)
- [`callback`](#callback)

**Read-only functions:**

- [`is-executive-team-member`](#is-executive-team-member)
- [`has-signalled`](#has-signalled)
- [`get-signals-required`](#get-signals-required)
- [`get-signals`](#get-signals)

**Private functions:**

**Maps**

- [`executive-team`](#executive-team)
- [`executive-action-signals`](#executive-action-signals)
- [`executive-action-signal-count`](#executive-action-signal-count)

**Variables**

- [`executive-team-sunset-height`](#executive-team-sunset-height)
- [`executive-signals-required`](#executive-signals-required)

**Constants**

- [`err-unauthorised`](#err-unauthorised)
- [`err-not-executive-team-member`](#err-not-executive-team-member)
- [`err-already-executed`](#err-already-executed)
- [`err-sunset-height-reached`](#err-sunset-height-reached)
- [`err-sunset-height-in-past`](#err-sunset-height-in-past)

## Functions

### is-dao-or-extension

[View in file](../contracts/extensions/bde004-core-execute.clar#L34)

`(define-public (is-dao-or-extension () (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .bitcoin-dao) (contract-call? .bitcoin-dao is-extension contract-caller)) err-unauthorised))
)
```

</details>

### set-executive-team-sunset-height

[View in file](../contracts/extensions/bde004-core-execute.clar#L40)

`(define-public (set-executive-team-sunset-height ((height uint)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-executive-team-sunset-height (height uint))
	(begin
		(try! (is-dao-or-extension))
		(asserts! (> height burn-block-height) err-sunset-height-in-past)
		(ok (var-set executive-team-sunset-height height))
	)
)
```

</details>

**Parameters:**

| Name   | Type |
| ------ | ---- |
| height | uint |

### set-executive-team-member

[View in file](../contracts/extensions/bde004-core-execute.clar#L48)

`(define-public (set-executive-team-member ((who principal) (member bool)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-executive-team-member (who principal) (member bool))
	(begin
		(try! (is-dao-or-extension))
		(ok (map-set executive-team who member))
	)
)
```

</details>

**Parameters:**

| Name   | Type      |
| ------ | --------- |
| who    | principal |
| member | bool      |

### set-signals-required

[View in file](../contracts/extensions/bde004-core-execute.clar#L55)

`(define-public (set-signals-required ((new-requirement uint)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-signals-required (new-requirement uint))
	(begin
		(try! (is-dao-or-extension))
		(ok (var-set executive-signals-required new-requirement))
	)
)
```

</details>

**Parameters:**

| Name            | Type |
| --------------- | ---- |
| new-requirement | uint |

### is-executive-team-member

[View in file](../contracts/extensions/bde004-core-execute.clar#L64)

`(define-read-only (is-executive-team-member ((who principal)) bool)`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (is-executive-team-member (who principal))
	(default-to false (map-get? executive-team who))
)
```

</details>

**Parameters:**

| Name | Type      |
| ---- | --------- |
| who  | principal |

### has-signalled

[View in file](../contracts/extensions/bde004-core-execute.clar#L68)

`(define-read-only (has-signalled ((proposal principal) (who principal)) bool)`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (has-signalled (proposal principal) (who principal))
	(default-to false (map-get? executive-action-signals {proposal: proposal, team-member: who}))
)
```

</details>

**Parameters:**

| Name     | Type      |
| -------- | --------- |
| proposal | principal |
| who      | principal |

### get-signals-required

[View in file](../contracts/extensions/bde004-core-execute.clar#L72)

`(define-read-only (get-signals-required () uint)`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-signals-required)
	(var-get executive-signals-required)
)
```

</details>

### get-signals

[View in file](../contracts/extensions/bde004-core-execute.clar#L76)

`(define-read-only (get-signals ((proposal principal)) uint)`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-signals (proposal principal))
	(default-to u0 (map-get? executive-action-signal-count proposal))
)
```

</details>

**Parameters:**

| Name     | Type      |
| -------- | --------- |
| proposal | principal |

### executive-action

[View in file](../contracts/extensions/bde004-core-execute.clar#L80)

`(define-public (executive-action ((proposal trait_reference)) (response uint uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (executive-action (proposal <proposal-trait>))
	(let
		(
			(proposal-principal (contract-of proposal))
			(signals (+ (get-signals proposal-principal) (if (has-signalled proposal-principal tx-sender) u0 u1)))
		)
		(asserts! (is-executive-team-member tx-sender) err-not-executive-team-member)
		(asserts! (or (is-eq (var-get executive-team-sunset-height) u0) (< burn-block-height (var-get executive-team-sunset-height))) err-sunset-height-reached)
		(and (>= signals (var-get executive-signals-required))
			(try! (contract-call? .bitcoin-dao execute proposal tx-sender))
		)
		(map-set executive-action-signals {proposal: proposal-principal, team-member: tx-sender} true)
		(map-set executive-action-signal-count proposal-principal signals)
		(ok signals)
	)
)
```

</details>

**Parameters:**

| Name     | Type            |
| -------- | --------------- |
| proposal | trait_reference |

### callback

[View in file](../contracts/extensions/bde004-core-execute.clar#L99)

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

### executive-team

```clarity
(define-map executive-team principal bool)
```

[View in file](../contracts/extensions/bde004-core-execute.clar#L26)

### executive-action-signals

```clarity
(define-map executive-action-signals {proposal: principal, team-member: principal} bool)
```

[View in file](../contracts/extensions/bde004-core-execute.clar#L27)

### executive-action-signal-count

```clarity
(define-map executive-action-signal-count principal uint)
```

[View in file](../contracts/extensions/bde004-core-execute.clar#L28)

## Variables

### executive-team-sunset-height

uint

```clarity
(define-data-var executive-team-sunset-height uint u0) ;; does not expire by default - can be changed by proposal
```

[View in file](../contracts/extensions/bde004-core-execute.clar#L18)

### executive-signals-required

uint

```clarity
(define-data-var executive-signals-required uint u1) ;; signals required for an executive action.
```

[View in file](../contracts/extensions/bde004-core-execute.clar#L30)

## Constants

### err-unauthorised

```clarity
(define-constant err-unauthorised (err u3400))
```

[View in file](../contracts/extensions/bde004-core-execute.clar#L20)

### err-not-executive-team-member

```clarity
(define-constant err-not-executive-team-member (err u3401))
```

[View in file](../contracts/extensions/bde004-core-execute.clar#L21)

### err-already-executed

```clarity
(define-constant err-already-executed (err u3402))
```

[View in file](../contracts/extensions/bde004-core-execute.clar#L22)

### err-sunset-height-reached

```clarity
(define-constant err-sunset-height-reached (err u3403))
```

[View in file](../contracts/extensions/bde004-core-execute.clar#L23)

### err-sunset-height-in-past

```clarity
(define-constant err-sunset-height-in-past (err u3404))
```

[View in file](../contracts/extensions/bde004-core-execute.clar#L24)
