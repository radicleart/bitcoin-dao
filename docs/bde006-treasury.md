# bde006-treasury

[`bde006-treasury.clar`](../contracts/extensions/bde006-treasury.clar)

Title: EDE006 Treasury

Author: Marvin Janssen

Depends-On:

Synopsis:

A treasury that can manage STX, SIP009, SIP010, and SIP013 tokens.

Description:

An extension contract that is meant to hold tokens on behalf of the

DAO. It can hold and transfer STX, SIP009, SIP010, and SIP013 tokens.

They can be deposited by simply transferring them to the contract.

Any extension or executing proposal can trigger transfers.

Technically, the ExecutorDAO core can hold and transfer tokens

directly. The treasury extension merely adds a bit of separation.

**Public functions:**

- [`is-dao-or-extension`](#is-dao-or-extension)
- [`stx-transfer`](#stx-transfer)
- [`stx-transfer-many`](#stx-transfer-many)
- [`sip009-transfer`](#sip009-transfer)
- [`sip009-transfer-many`](#sip009-transfer-many)
- [`sip010-transfer`](#sip010-transfer)
- [`sip010-transfer-many`](#sip010-transfer-many)
- [`sip013-transfer`](#sip013-transfer)
- [`sip013-transfer-many`](#sip013-transfer-many)
- [`sip013-transfer-many-memo`](#sip013-transfer-many-memo)
- [`callback`](#callback)

**Read-only functions:**

**Private functions:**

- [`stx-transfer-many-iter`](#stx-transfer-many-iter)
- [`sip009-transfer-many-iter`](#sip009-transfer-many-iter)
- [`sip010-transfer-many-iter`](#sip010-transfer-many-iter)

**Maps**

**Variables**

**Constants**

- [`err-unauthorised`](#err-unauthorised)

## Functions

### is-dao-or-extension

[View in file](../contracts/extensions/bde006-treasury.clar#L48)

`(define-public (is-dao-or-extension () (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .bitcoin-dao) (contract-call? .bitcoin-dao is-extension contract-caller)) err-unauthorised))
)
```

</details>

### stx-transfer

[View in file](../contracts/extensions/bde006-treasury.clar#L56)

`(define-public (stx-transfer ((amount uint) (recipient principal) (memo (optional (buff 34)))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (stx-transfer (amount uint) (recipient principal) (memo (optional (buff 34))))
	(begin
		(try! (is-dao-or-extension))
		(match memo to-print (print to-print) 0x)
		(as-contract (stx-transfer? amount tx-sender recipient))
	)
)
```

</details>

**Parameters:**

| Name      | Type                 |
| --------- | -------------------- |
| amount    | uint                 |
| recipient | principal            |
| memo      | (optional (buff 34)) |

### stx-transfer-many

[View in file](../contracts/extensions/bde006-treasury.clar#L64)

`(define-public (stx-transfer-many ((transfers (list 200 (tuple (amount uint) (memo (optional (buff 34))) (recipient principal))))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (stx-transfer-many (transfers (list 200 {amount: uint, recipient: principal, memo: (optional (buff 34))})))
	(begin
		(try! (is-dao-or-extension))
		(as-contract (fold stx-transfer-many-iter transfers (ok true)))
	)
)
```

</details>

**Parameters:**

| Name      | Type                                                                               |
| --------- | ---------------------------------------------------------------------------------- |
| transfers | (list 200 (tuple (amount uint) (memo (optional (buff 34))) (recipient principal))) |

### sip009-transfer

[View in file](../contracts/extensions/bde006-treasury.clar#L73)

`(define-public (sip009-transfer ((token-id uint) (recipient principal) (asset trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (sip009-transfer (token-id uint) (recipient principal) (asset <sip009-transferable>))
	(begin
		(try! (is-dao-or-extension))
		(as-contract (contract-call? asset transfer token-id tx-sender recipient))
	)
)
```

</details>

**Parameters:**

| Name      | Type            |
| --------- | --------------- |
| token-id  | uint            |
| recipient | principal       |
| asset     | trait_reference |

### sip009-transfer-many

[View in file](../contracts/extensions/bde006-treasury.clar#L80)

`(define-public (sip009-transfer-many ((data (list 200 (tuple (recipient principal) (token-id uint)))) (asset trait_reference)) (response bool none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (sip009-transfer-many (data (list 200 {token-id: uint, recipient: principal})) (asset <sip009-transferable>))
	(begin
		(as-contract (fold sip009-transfer-many-iter data asset))
		(ok true)
	)
)
```

</details>

**Parameters:**

| Name  | Type                                                     |
| ----- | -------------------------------------------------------- |
| data  | (list 200 (tuple (recipient principal) (token-id uint))) |
| asset | trait_reference                                          |

### sip010-transfer

[View in file](../contracts/extensions/bde006-treasury.clar#L89)

`(define-public (sip010-transfer ((amount uint) (recipient principal) (memo (optional (buff 34))) (asset trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (sip010-transfer (amount uint) (recipient principal) (memo (optional (buff 34))) (asset <sip010-transferable>))
	(begin
		(try! (is-dao-or-extension))
		(as-contract (contract-call? asset transfer amount tx-sender recipient memo))
	)
)
```

</details>

**Parameters:**

| Name      | Type                 |
| --------- | -------------------- |
| amount    | uint                 |
| recipient | principal            |
| memo      | (optional (buff 34)) |
| asset     | trait_reference      |

### sip010-transfer-many

[View in file](../contracts/extensions/bde006-treasury.clar#L96)

`(define-public (sip010-transfer-many ((data (list 200 (tuple (amount uint) (memo (optional (buff 34))) (recipient principal)))) (asset trait_reference)) (response bool none))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (sip010-transfer-many (data (list 200 {amount: uint, recipient: principal, memo: (optional (buff 34))})) (asset <sip010-transferable>))
	(begin
		(as-contract (fold sip010-transfer-many-iter data asset))
		(ok true)
	)
)
```

</details>

**Parameters:**

| Name  | Type                                                                               |
| ----- | ---------------------------------------------------------------------------------- |
| data  | (list 200 (tuple (amount uint) (memo (optional (buff 34))) (recipient principal))) |
| asset | trait_reference                                                                    |

### sip013-transfer

[View in file](../contracts/extensions/bde006-treasury.clar#L105)

`(define-public (sip013-transfer ((token-id uint) (amount uint) (recipient principal) (memo (optional (buff 34))) (asset trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (sip013-transfer (token-id uint) (amount uint) (recipient principal) (memo (optional (buff 34))) (asset <sip013-transferable>))
	(begin
		(try! (is-dao-or-extension))
		(as-contract (match memo memo-buff
			(contract-call? asset transfer-memo token-id amount tx-sender recipient memo-buff)
			(contract-call? asset transfer token-id amount tx-sender recipient)
		))
	)
)
```

</details>

**Parameters:**

| Name      | Type                 |
| --------- | -------------------- |
| token-id  | uint                 |
| amount    | uint                 |
| recipient | principal            |
| memo      | (optional (buff 34)) |
| asset     | trait_reference      |

### sip013-transfer-many

[View in file](../contracts/extensions/bde006-treasury.clar#L115)

`(define-public (sip013-transfer-many ((transfers (list 200 (tuple (amount uint) (recipient principal) (sender principal) (token-id uint)))) (asset trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (sip013-transfer-many (transfers (list 200 {token-id: uint, amount: uint, sender: principal, recipient: principal})) (asset <sip013-transferable-many>))
	(begin
		(try! (is-dao-or-extension))
		(as-contract (contract-call? asset transfer-many transfers))
	)
)
```

</details>

**Parameters:**

| Name      | Type                                                                                      |
| --------- | ----------------------------------------------------------------------------------------- |
| transfers | (list 200 (tuple (amount uint) (recipient principal) (sender principal) (token-id uint))) |
| asset     | trait_reference                                                                           |

### sip013-transfer-many-memo

[View in file](../contracts/extensions/bde006-treasury.clar#L122)

`(define-public (sip013-transfer-many-memo ((transfers (list 200 (tuple (amount uint) (memo (buff 34)) (recipient principal) (sender principal) (token-id uint)))) (asset trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (sip013-transfer-many-memo (transfers (list 200 {token-id: uint, amount: uint, sender: principal, recipient: principal, memo: (buff 34)})) (asset <sip013-transferable-many>))
	(begin
		(try! (is-dao-or-extension))
		(as-contract (contract-call? asset transfer-many-memo transfers))
	)
)
```

</details>

**Parameters:**

| Name      | Type                                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| transfers | (list 200 (tuple (amount uint) (memo (buff 34)) (recipient principal) (sender principal) (token-id uint))) |
| asset     | trait_reference                                                                                            |

### stx-transfer-many-iter

[View in file](../contracts/extensions/bde006-treasury.clar#L131)

`(define-private (stx-transfer-many-iter ((data (tuple (amount uint) (memo (optional (buff 34))) (recipient principal))) (previous-result (response bool uint))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-private (stx-transfer-many-iter (data {amount: uint, recipient: principal, memo: (optional (buff 34))}) (previous-result (response bool uint)))
	(begin
		(try! previous-result)
		(match (get memo data) to-print (print to-print) 0x)
		(stx-transfer? (get amount data) tx-sender (get recipient data))
	)
)
```

</details>

**Parameters:**

| Name            | Type                                                                    |
| --------------- | ----------------------------------------------------------------------- |
| data            | (tuple (amount uint) (memo (optional (buff 34))) (recipient principal)) |
| previous-result | (response bool uint)                                                    |

### sip009-transfer-many-iter

[View in file](../contracts/extensions/bde006-treasury.clar#L139)

`(define-private (sip009-transfer-many-iter ((data (tuple (recipient principal) (token-id uint))) (asset trait_reference)) trait_reference)`

<details>
  <summary>Source code:</summary>

```clarity
(define-private (sip009-transfer-many-iter (data {token-id: uint, recipient: principal}) (asset <sip009-transferable>))
	(begin
		(unwrap-panic (contract-call? asset transfer (get token-id data) tx-sender (get recipient data)))
		asset
	)
)
```

</details>

**Parameters:**

| Name  | Type                                          |
| ----- | --------------------------------------------- |
| data  | (tuple (recipient principal) (token-id uint)) |
| asset | trait_reference                               |

### sip010-transfer-many-iter

[View in file](../contracts/extensions/bde006-treasury.clar#L146)

`(define-private (sip010-transfer-many-iter ((data (tuple (amount uint) (memo (optional (buff 34))) (recipient principal))) (asset trait_reference)) trait_reference)`

<details>
  <summary>Source code:</summary>

```clarity
(define-private (sip010-transfer-many-iter (data {amount: uint, recipient: principal, memo: (optional (buff 34))}) (asset <sip010-transferable>))
	(begin
		(unwrap-panic (contract-call? asset transfer (get amount data) tx-sender (get recipient data) (get memo data)))
		asset
	)
)
```

</details>

**Parameters:**

| Name  | Type                                                                    |
| ----- | ----------------------------------------------------------------------- |
| data  | (tuple (amount uint) (memo (optional (buff 34))) (recipient principal)) |
| asset | trait_reference                                                         |

### callback

[View in file](../contracts/extensions/bde006-treasury.clar#L155)

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

## Constants

### err-unauthorised

```clarity
(define-constant err-unauthorised (err u3000))
```

[View in file](../contracts/extensions/bde006-treasury.clar#L16)
