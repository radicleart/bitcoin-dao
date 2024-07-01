# bde003-core-proposals

[`bde003-core-proposals.clar`](../contracts/extensions/bde003-core-proposals.clar)

Title: BDE003 Core Proposals

Author: Marvin Janssen

Depends-On: BDE001

Synopsis:

This extension allows for the creation of core proposals by a few trusted

principals.

Description:

Core proposals have a voting period of roughly 1 day, instead of the

normal proposal duration. Only a list of trusted principals, designated as the

"core team", can create core proposals. The core proposal

extension has an optional ~3 month sunset period, after which no more core

proposals can be made - set it to 0 to disable. The core team members, sunset period, and

core vote duration can be changed by means of a future proposal.

**Public functions:**

- [`is-dao-or-extension`](#is-dao-or-extension)
- [`set-core-proposal-duration`](#set-core-proposal-duration)
- [`set-core-team-sunset-height`](#set-core-team-sunset-height)
- [`set-core-team-member`](#set-core-team-member)
- [`core-propose`](#core-propose)
- [`callback`](#callback)

**Read-only functions:**

- [`is-core-team-member`](#is-core-team-member)

**Private functions:**

**Maps**

- [`core-team`](#core-team)

**Variables**

- [`core-proposal-duration`](#core-proposal-duration)
- [`core-team-sunset-height`](#core-team-sunset-height)

**Constants**

- [`err-unauthorised`](#err-unauthorised)
- [`err-not-core-team-member`](#err-not-core-team-member)
- [`err-sunset-height-reached`](#err-sunset-height-reached)
- [`err-sunset-height-in-past`](#err-sunset-height-in-past)

## Functions

### is-dao-or-extension

[View in file](../contracts/extensions/bde003-core-proposals.clar#L30)

`(define-public (is-dao-or-extension () (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .bitcoin-dao) (contract-call? .bitcoin-dao is-extension contract-caller)) err-unauthorised))
)
```

</details>

### set-core-proposal-duration

[View in file](../contracts/extensions/bde003-core-proposals.clar#L36)

`(define-public (set-core-proposal-duration ((duration uint)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-core-proposal-duration (duration uint))
	(begin
		(try! (is-dao-or-extension))
		(ok (var-set core-proposal-duration duration))
	)
)
```

</details>

**Parameters:**

| Name     | Type |
| -------- | ---- |
| duration | uint |

### set-core-team-sunset-height

[View in file](../contracts/extensions/bde003-core-proposals.clar#L43)

`(define-public (set-core-team-sunset-height ((height uint)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-core-team-sunset-height (height uint))
	(begin
		(try! (is-dao-or-extension))
		(asserts! (> height burn-block-height) err-sunset-height-in-past)
		(ok (var-set core-team-sunset-height height))
	)
)
```

</details>

**Parameters:**

| Name   | Type |
| ------ | ---- |
| height | uint |

### set-core-team-member

[View in file](../contracts/extensions/bde003-core-proposals.clar#L51)

`(define-public (set-core-team-member ((who principal) (member bool)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-core-team-member (who principal) (member bool))
	(begin
		(try! (is-dao-or-extension))
		(ok (map-set core-team who member))
	)
)
```

</details>

**Parameters:**

| Name   | Type      |
| ------ | --------- |
| who    | principal |
| member | bool      |

### is-core-team-member

[View in file](../contracts/extensions/bde003-core-proposals.clar#L60)

`(define-read-only (is-core-team-member ((who principal)) bool)`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (is-core-team-member (who principal))
	(default-to false (map-get? core-team who))
)
```

</details>

**Parameters:**

| Name | Type      |
| ---- | --------- |
| who  | principal |

### core-propose

[View in file](../contracts/extensions/bde003-core-proposals.clar#L64)

`(define-public (core-propose ((proposal trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
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
```

</details>

**Parameters:**

| Name     | Type            |
| -------- | --------------- |
| proposal | trait_reference |

### callback

[View in file](../contracts/extensions/bde003-core-proposals.clar#L80)

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

### core-team

```clarity
(define-map core-team principal bool)
```

[View in file](../contracts/extensions/bde003-core-proposals.clar#L26)

## Variables

### core-proposal-duration

uint

```clarity
(define-data-var core-proposal-duration uint u144) ;; ~1 day
```

[View in file](../contracts/extensions/bde003-core-proposals.clar#L18)

### core-team-sunset-height

uint

```clarity
(define-data-var core-team-sunset-height uint u0) ;; does not expire by default - can be changed by proposal
```

[View in file](../contracts/extensions/bde003-core-proposals.clar#L19)

## Constants

### err-unauthorised

```clarity
(define-constant err-unauthorised (err u3300))
```

[View in file](../contracts/extensions/bde003-core-proposals.clar#L21)

### err-not-core-team-member

```clarity
(define-constant err-not-core-team-member (err u3301))
```

[View in file](../contracts/extensions/bde003-core-proposals.clar#L22)

### err-sunset-height-reached

```clarity
(define-constant err-sunset-height-reached (err u3302))
```

[View in file](../contracts/extensions/bde003-core-proposals.clar#L23)

### err-sunset-height-in-past

```clarity
(define-constant err-sunset-height-in-past (err u3303))
```

[View in file](../contracts/extensions/bde003-core-proposals.clar#L24)
