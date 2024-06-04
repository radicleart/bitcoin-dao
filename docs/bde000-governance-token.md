# bde000-governance-token

[`bde000-governance-token.clar`](../contracts/extensions/bde000-governance-token.clar)

Title: BDE000 Governance Token

Author: Marvin Janssen

Depends-On:

Synopsis:

This extension defines the governance token of Bitcoin DAO.

Description:

The governance token is a simple SIP010-compliant fungible token

with some added functions to make it easier to manage by

Bitcoin DAO proposals and extensions.

**Public functions:**

- [`is-dao-or-extension`](#is-dao-or-extension)
- [`bdg-transfer`](#bdg-transfer)
- [`bdg-lock`](#bdg-lock)
- [`bdg-unlock`](#bdg-unlock)
- [`bdg-mint`](#bdg-mint)
- [`bdg-burn`](#bdg-burn)
- [`set-name`](#set-name)
- [`set-symbol`](#set-symbol)
- [`set-decimals`](#set-decimals)
- [`set-token-uri`](#set-token-uri)
- [`bdg-mint-many`](#bdg-mint-many)
- [`transfer`](#transfer)
- [`callback`](#callback)

**Read-only functions:**

- [`get-name`](#get-name)
- [`get-symbol`](#get-symbol)
- [`get-decimals`](#get-decimals)
- [`get-balance`](#get-balance)
- [`get-total-supply`](#get-total-supply)
- [`get-token-uri`](#get-token-uri)
- [`bdg-get-balance`](#bdg-get-balance)
- [`bdg-has-percentage-balance`](#bdg-has-percentage-balance)
- [`bdg-get-locked`](#bdg-get-locked)

**Private functions:**

- [`bdg-mint-many-iter`](#bdg-mint-many-iter)

**Maps**

**Variables**

- [`token-name`](#token-name)
- [`token-symbol`](#token-symbol)
- [`token-uri`](#token-uri)
- [`token-decimals`](#token-decimals)

**Constants**

- [`err-unauthorised`](#err-unauthorised)
- [`err-not-token-owner`](#err-not-token-owner)

## Functions

### is-dao-or-extension

[View in file](../contracts/extensions/bde000-governance-token.clar#L28)

`(define-public (is-dao-or-extension () (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .bitcoin-dao) (contract-call? .bitcoin-dao is-extension contract-caller)) err-unauthorised))
)
```

</details>

### bdg-transfer

[View in file](../contracts/extensions/bde000-governance-token.clar#L36)

`(define-public (bdg-transfer ((amount uint) (sender principal) (recipient principal)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (bdg-transfer (amount uint) (sender principal) (recipient principal))
	(begin
		(try! (is-dao-or-extension))
		(ft-transfer? bdg-token amount sender recipient)
	)
)
```

</details>

**Parameters:**

| Name      | Type      |
| --------- | --------- |
| amount    | uint      |
| sender    | principal |
| recipient | principal |

### bdg-lock

[View in file](../contracts/extensions/bde000-governance-token.clar#L43)

`(define-public (bdg-lock ((amount uint) (owner principal)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (bdg-lock (amount uint) (owner principal))
	(begin
		(try! (is-dao-or-extension))
		(try! (ft-burn? bdg-token amount owner))
		(ft-mint? bdg-token-locked amount owner)
	)
)
```

</details>

**Parameters:**

| Name   | Type      |
| ------ | --------- |
| amount | uint      |
| owner  | principal |

### bdg-unlock

[View in file](../contracts/extensions/bde000-governance-token.clar#L51)

`(define-public (bdg-unlock ((amount uint) (owner principal)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (bdg-unlock (amount uint) (owner principal))
	(begin
		(try! (is-dao-or-extension))
		(try! (ft-burn? bdg-token-locked amount owner))
		(ft-mint? bdg-token amount owner)
	)
)
```

</details>

**Parameters:**

| Name   | Type      |
| ------ | --------- |
| amount | uint      |
| owner  | principal |

### bdg-mint

[View in file](../contracts/extensions/bde000-governance-token.clar#L59)

`(define-public (bdg-mint ((amount uint) (recipient principal)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (bdg-mint (amount uint) (recipient principal))
	(begin
		(try! (is-dao-or-extension))
		(ft-mint? bdg-token amount recipient)
	)
)
```

</details>

**Parameters:**

| Name      | Type      |
| --------- | --------- |
| amount    | uint      |
| recipient | principal |

### bdg-burn

[View in file](../contracts/extensions/bde000-governance-token.clar#L66)

`(define-public (bdg-burn ((amount uint) (owner principal)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (bdg-burn (amount uint) (owner principal))
	(begin
		(try! (is-dao-or-extension))
		(ft-burn? bdg-token amount owner)

	)
)
```

</details>

**Parameters:**

| Name   | Type      |
| ------ | --------- |
| amount | uint      |
| owner  | principal |

### set-name

[View in file](../contracts/extensions/bde000-governance-token.clar#L76)

`(define-public (set-name ((new-name (string-ascii 32))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-name (new-name (string-ascii 32)))
	(begin
		(try! (is-dao-or-extension))
		(ok (var-set token-name new-name))
	)
)
```

</details>

**Parameters:**

| Name     | Type              |
| -------- | ----------------- |
| new-name | (string-ascii 32) |

### set-symbol

[View in file](../contracts/extensions/bde000-governance-token.clar#L83)

`(define-public (set-symbol ((new-symbol (string-ascii 10))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-symbol (new-symbol (string-ascii 10)))
	(begin
		(try! (is-dao-or-extension))
		(ok (var-set token-symbol new-symbol))
	)
)
```

</details>

**Parameters:**

| Name       | Type              |
| ---------- | ----------------- |
| new-symbol | (string-ascii 10) |

### set-decimals

[View in file](../contracts/extensions/bde000-governance-token.clar#L90)

`(define-public (set-decimals ((new-decimals uint)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-decimals (new-decimals uint))
	(begin
		(try! (is-dao-or-extension))
		(ok (var-set token-decimals new-decimals))
	)
)
```

</details>

**Parameters:**

| Name         | Type |
| ------------ | ---- |
| new-decimals | uint |

### set-token-uri

[View in file](../contracts/extensions/bde000-governance-token.clar#L97)

`(define-public (set-token-uri ((new-uri (optional (string-utf8 256)))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-token-uri (new-uri (optional (string-utf8 256))))
	(begin
		(try! (is-dao-or-extension))
		(ok (var-set token-uri new-uri))
	)
)
```

</details>

**Parameters:**

| Name    | Type                         |
| ------- | ---------------------------- |
| new-uri | (optional (string-utf8 256)) |

### bdg-mint-many-iter

[View in file](../contracts/extensions/bde000-governance-token.clar#L104)

`(define-private (bdg-mint-many-iter ((item (tuple (amount uint) (recipient principal)))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-private (bdg-mint-many-iter (item {amount: uint, recipient: principal}))
	(ft-mint? bdg-token (get amount item) (get recipient item))
)
```

</details>

**Parameters:**

| Name | Type                                        |
| ---- | ------------------------------------------- |
| item | (tuple (amount uint) (recipient principal)) |

### bdg-mint-many

[View in file](../contracts/extensions/bde000-governance-token.clar#L108)

`(define-public (bdg-mint-many ((recipients (list 200 (tuple (amount uint) (recipient principal))))) (response (list 200 (response bool uint)) uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (bdg-mint-many (recipients (list 200 {amount: uint, recipient: principal})))
	(begin
		(try! (is-dao-or-extension))
		(ok (map bdg-mint-many-iter recipients))
	)
)
```

</details>

**Parameters:**

| Name       | Type                                                   |
| ---------- | ------------------------------------------------------ |
| recipients | (list 200 (tuple (amount uint) (recipient principal))) |

### transfer

[View in file](../contracts/extensions/bde000-governance-token.clar#L119)

`(define-public (transfer ((amount uint) (sender principal) (recipient principal) (memo (optional (buff 34)))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
	(begin
		(asserts! (or (is-eq tx-sender sender) (is-eq contract-caller sender)) err-not-token-owner)
		(ft-transfer? bdg-token amount sender recipient)
	)
)
```

</details>

**Parameters:**

| Name      | Type                 |
| --------- | -------------------- |
| amount    | uint                 |
| sender    | principal            |
| recipient | principal            |
| memo      | (optional (buff 34)) |

### get-name

[View in file](../contracts/extensions/bde000-governance-token.clar#L126)

`(define-read-only (get-name () (response (string-ascii 32) none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-name)
	(ok (var-get token-name))
)
```

</details>

### get-symbol

[View in file](../contracts/extensions/bde000-governance-token.clar#L130)

`(define-read-only (get-symbol () (response (string-ascii 10) none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-symbol)
	(ok (var-get token-symbol))
)
```

</details>

### get-decimals

[View in file](../contracts/extensions/bde000-governance-token.clar#L134)

`(define-read-only (get-decimals () (response uint none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-decimals)
	(ok (var-get token-decimals))
)
```

</details>

### get-balance

[View in file](../contracts/extensions/bde000-governance-token.clar#L138)

`(define-read-only (get-balance ((who principal)) (response uint none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-balance (who principal))
	(ok (+ (ft-get-balance bdg-token who) (ft-get-balance bdg-token-locked who)))
)
```

</details>

**Parameters:**

| Name | Type      |
| ---- | --------- |
| who  | principal |

### get-total-supply

[View in file](../contracts/extensions/bde000-governance-token.clar#L142)

`(define-read-only (get-total-supply () (response uint none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-total-supply)
	(ok (+ (ft-get-supply bdg-token) (ft-get-supply bdg-token-locked)))
)
```

</details>

### get-token-uri

[View in file](../contracts/extensions/bde000-governance-token.clar#L146)

`(define-read-only (get-token-uri () (response (optional (string-utf8 256)) none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-token-uri)
	(ok (var-get token-uri))
)
```

</details>

### bdg-get-balance

[View in file](../contracts/extensions/bde000-governance-token.clar#L152)

`(define-read-only (bdg-get-balance ((who principal)) (response uint none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (bdg-get-balance (who principal))
	(get-balance who)
)
```

</details>

**Parameters:**

| Name | Type      |
| ---- | --------- |
| who  | principal |

### bdg-has-percentage-balance

[View in file](../contracts/extensions/bde000-governance-token.clar#L156)

`(define-read-only (bdg-has-percentage-balance ((who principal) (factor uint)) (response bool none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (bdg-has-percentage-balance (who principal) (factor uint))
	(ok (>= (* (unwrap-panic (get-balance who)) factor) (* (unwrap-panic (get-total-supply)) u1000)))
)
```

</details>

**Parameters:**

| Name   | Type      |
| ------ | --------- |
| who    | principal |
| factor | uint      |

### bdg-get-locked

[View in file](../contracts/extensions/bde000-governance-token.clar#L160)

`(define-read-only (bdg-get-locked ((owner principal)) (response uint none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (bdg-get-locked (owner principal))
	(ok (ft-get-balance bdg-token-locked owner))
)
```

</details>

**Parameters:**

| Name  | Type      |
| ----- | --------- |
| owner | principal |

### callback

[View in file](../contracts/extensions/bde000-governance-token.clar#L166)

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

## Variables

### token-name

(string-ascii 32)

```clarity
(define-data-var token-name (string-ascii 32) "Bitcoin DAO Governance Token")
```

[View in file](../contracts/extensions/bde000-governance-token.clar#L21)

### token-symbol

(string-ascii 10)

```clarity
(define-data-var token-symbol (string-ascii 10) "BDG")
```

[View in file](../contracts/extensions/bde000-governance-token.clar#L22)

### token-uri

(optional (string-utf8 256))

```clarity
(define-data-var token-uri (optional (string-utf8 256)) none)
```

[View in file](../contracts/extensions/bde000-governance-token.clar#L23)

### token-decimals

uint

```clarity
(define-data-var token-decimals uint u6)
```

[View in file](../contracts/extensions/bde000-governance-token.clar#L24)

## Constants

### err-unauthorised

```clarity
(define-constant err-unauthorised (err u3000))
```

[View in file](../contracts/extensions/bde000-governance-token.clar#L15)

### err-not-token-owner

```clarity
(define-constant err-not-token-owner (err u4))
```

[View in file](../contracts/extensions/bde000-governance-token.clar#L16)
