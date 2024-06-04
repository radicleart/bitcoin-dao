# bde002-proposal-submission

[`bde002-proposal-submission.clar`](../contracts/extensions/bde002-proposal-submission.clar)

Title: BDE002 Proposal Submission

Author: Marvin Janssen

Depends-On: BDE001

Synopsis:

This extension part of the core of Bitcoin DAO. It allows governance token

holders to submit proposals when they hold at least n% percentage of the

token supply.

Description:

Proposals may be submitted by anyone that holds at least n% of governance

tokens. Any submission is subject to a pre-defined start delay before voting

can begin, and will then run for a pre-defined duration. The percentage,

start delay, and proposal duration can all by changed by means of a future

proposal.

**Public functions:**

- [`is-dao-or-extension`](#is-dao-or-extension)
- [`set-governance-token`](#set-governance-token)
- [`set-parameter`](#set-parameter)
- [`set-parameters`](#set-parameters)
- [`propose`](#propose)
- [`callback`](#callback)

**Read-only functions:**

- [`get-governance-token`](#get-governance-token)
- [`get-parameter`](#get-parameter)

**Private functions:**

- [`set-parameters-iter`](#set-parameters-iter)
- [`is-governance-token`](#is-governance-token)

**Maps**

- [`parameters`](#parameters)

**Variables**

- [`governance-token-principal`](#governance-token-principal)

**Constants**

- [`err-unauthorised`](#err-unauthorised)
- [`err-not-governance-token`](#err-not-governance-token)
- [`err-insufficient-balance`](#err-insufficient-balance)
- [`err-unknown-parameter`](#err-unknown-parameter)
- [`err-proposal-minimum-start-delay`](#err-proposal-minimum-start-delay)
- [`err-proposal-maximum-start-delay`](#err-proposal-maximum-start-delay)

## Functions

### is-dao-or-extension

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L37)

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

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L45)

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

### set-parameter

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L54)

`(define-public (set-parameter ((parameter (string-ascii 34)) (value uint)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-parameter (parameter (string-ascii 34)) (value uint))
	(begin
		(try! (is-dao-or-extension))
		(try! (get-parameter parameter))
		(ok (map-set parameters parameter value))
	)
)
```

</details>

**Parameters:**

| Name      | Type              |
| --------- | ----------------- |
| parameter | (string-ascii 34) |
| value     | uint              |

### set-parameters-iter

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L62)

`(define-private (set-parameters-iter ((item (tuple (parameter (string-ascii 34)) (value uint))) (previous (response bool uint))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-private (set-parameters-iter (item {parameter: (string-ascii 34), value: uint}) (previous (response bool uint)))
	(begin
		(try! previous)
		(try! (get-parameter (get parameter item)))
		(ok (map-set parameters (get parameter item) (get value item)))
	)
)
```

</details>

**Parameters:**

| Name     | Type                                               |
| -------- | -------------------------------------------------- |
| item     | (tuple (parameter (string-ascii 34)) (value uint)) |
| previous | (response bool uint)                               |

### set-parameters

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L70)

`(define-public (set-parameters ((parameter-list (list 200 (tuple (parameter (string-ascii 34)) (value uint))))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-parameters (parameter-list (list 200 {parameter: (string-ascii 34), value: uint})))
	(begin
		(try! (is-dao-or-extension))
		(fold set-parameters-iter parameter-list (ok true))
	)
)
```

</details>

**Parameters:**

| Name           | Type                                                          |
| -------------- | ------------------------------------------------------------- |
| parameter-list | (list 200 (tuple (parameter (string-ascii 34)) (value uint))) |

### get-governance-token

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L81)

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

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L85)

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

### get-parameter

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L91)

`(define-read-only (get-parameter ((parameter (string-ascii 34))) (response uint uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-parameter (parameter (string-ascii 34)))
	(ok (unwrap! (map-get? parameters parameter) err-unknown-parameter))
)
```

</details>

**Parameters:**

| Name      | Type              |
| --------- | ----------------- |
| parameter | (string-ascii 34) |

### propose

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L97)

`(define-public (propose ((proposal trait_reference) (start-block-height uint) (governance-token trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (propose (proposal <proposal-trait>) (start-block-height uint) (governance-token <governance-token-trait>))
	(begin
		(try! (is-governance-token governance-token))
		(asserts! (>= start-block-height (+ burn-block-height (try! (get-parameter "minimum-proposal-start-delay")))) err-proposal-minimum-start-delay)
		(asserts! (<= start-block-height (+ burn-block-height (try! (get-parameter "maximum-proposal-start-delay")))) err-proposal-maximum-start-delay)
		(asserts! (try! (contract-call? governance-token bdg-has-percentage-balance tx-sender (try! (get-parameter "propose-factor")))) err-insufficient-balance)
		(contract-call? .bde001-proposal-voting add-proposal
			proposal
			{
				start-block-height: start-block-height,
				end-block-height: (+ start-block-height (try! (get-parameter "proposal-duration"))),
				proposer: tx-sender
			}
		)
	)
)
```

</details>

**Parameters:**

| Name               | Type            |
| ------------------ | --------------- |
| proposal           | trait_reference |
| start-block-height | uint            |
| governance-token   | trait_reference |

### callback

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L116)

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

### parameters

```clarity
(define-map parameters (string-ascii 34) uint)
```

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L28)

## Variables

### governance-token-principal

principal

```clarity
(define-data-var governance-token-principal principal .bde000-governance-token)
```

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L26)

## Constants

### err-unauthorised

```clarity
(define-constant err-unauthorised (err u3100))
```

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L19)

### err-not-governance-token

```clarity
(define-constant err-not-governance-token (err u3101))
```

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L20)

### err-insufficient-balance

```clarity
(define-constant err-insufficient-balance (err u3102))
```

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L21)

### err-unknown-parameter

```clarity
(define-constant err-unknown-parameter (err u3103))
```

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L22)

### err-proposal-minimum-start-delay

```clarity
(define-constant err-proposal-minimum-start-delay (err u3104))
```

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L23)

### err-proposal-maximum-start-delay

```clarity
(define-constant err-proposal-maximum-start-delay (err u3105))
```

[View in file](../contracts/extensions/bde002-proposal-submission.clar#L24)
