# bitcoin-dao

[`bitcoin-dao.clar`](../contracts/bitcoin-dao.clar)

Bitcoin DAO

Author Mike Cohen - based on Marvin Janssen' Executor DAO

Synopsis:

bitcoin-dao is the core of the dao framework.

Description:

Valid extensions must be registered here. The DAO is bootstrapped

by calling construct with a bootstrap proposal.

**Public functions:**

- [`set-extension`](#set-extension)
- [`set-extensions`](#set-extensions)
- [`execute`](#execute)
- [`construct`](#construct)
- [`request-extension-callback`](#request-extension-callback)

**Read-only functions:**

- [`is-extension`](#is-extension)
- [`executed-at`](#executed-at)

**Private functions:**

- [`is-self-or-extension`](#is-self-or-extension)
- [`set-extensions-iter`](#set-extensions-iter)

**Maps**

- [`executed-proposals`](#executed-proposals)
- [`extensions`](#extensions)

**Variables**

- [`executive`](#executive)

**Constants**

- [`err-unauthorised`](#err-unauthorised)
- [`err-already-executed`](#err-already-executed)
- [`err-invalid-extension`](#err-invalid-extension)

## Functions

### is-self-or-extension

[View in file](../contracts/bitcoin-dao.clar#L22)

`(define-private (is-self-or-extension () (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-private (is-self-or-extension)
	(ok (asserts! (or (is-eq tx-sender (as-contract tx-sender)) (is-extension contract-caller)) err-unauthorised))
)
```

</details>

### is-extension

[View in file](../contracts/bitcoin-dao.clar#L28)

`(define-read-only (is-extension ((extension principal)) bool)`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (is-extension (extension principal))
	(default-to false (map-get? extensions extension))
)
```

</details>

**Parameters:**

| Name      | Type      |
| --------- | --------- |
| extension | principal |

### set-extension

[View in file](../contracts/bitcoin-dao.clar#L32)

`(define-public (set-extension ((extension principal) (enabled bool)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-extension (extension principal) (enabled bool))
	(begin
		(try! (is-self-or-extension))
		(print {event: "extension", extension: extension, enabled: enabled})
		(ok (map-set extensions extension enabled))
	)
)
```

</details>

**Parameters:**

| Name      | Type      |
| --------- | --------- |
| extension | principal |
| enabled   | bool      |

### set-extensions-iter

[View in file](../contracts/bitcoin-dao.clar#L40)

`(define-private (set-extensions-iter ((item (tuple (enabled bool) (extension principal)))) bool)`

<details>
  <summary>Source code:</summary>

```clarity
(define-private (set-extensions-iter (item {extension: principal, enabled: bool}))
	(begin
		(print {event: "extension", extension: (get extension item), enabled: (get enabled item)})
		(map-set extensions (get extension item) (get enabled item))
	)
)
```

</details>

**Parameters:**

| Name | Type                                         |
| ---- | -------------------------------------------- |
| item | (tuple (enabled bool) (extension principal)) |

### set-extensions

[View in file](../contracts/bitcoin-dao.clar#L47)

`(define-public (set-extensions ((extension-list (list 200 (tuple (enabled bool) (extension principal))))) (response (list 200 bool) uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (set-extensions (extension-list (list 200 {extension: principal, enabled: bool})))
	(begin
		(try! (is-self-or-extension))
		(ok (map set-extensions-iter extension-list))
	)
)
```

</details>

**Parameters:**

| Name           | Type                                                    |
| -------------- | ------------------------------------------------------- |
| extension-list | (list 200 (tuple (enabled bool) (extension principal))) |

### executed-at

[View in file](../contracts/bitcoin-dao.clar#L56)

`(define-read-only (executed-at ((proposal trait_reference)) (optional uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (executed-at (proposal <proposal-trait>))
	(map-get? executed-proposals (contract-of proposal))
)
```

</details>

**Parameters:**

| Name     | Type            |
| -------- | --------------- |
| proposal | trait_reference |

### execute

[View in file](../contracts/bitcoin-dao.clar#L60)

`(define-public (execute ((proposal trait_reference) (sender principal)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (execute (proposal <proposal-trait>) (sender principal))
	(begin
		(try! (is-self-or-extension))
		(asserts! (map-insert executed-proposals (contract-of proposal) block-height) err-already-executed)
		(print {event: "execute", proposal: proposal})
		(as-contract (contract-call? proposal execute sender))
	)
)
```

</details>

**Parameters:**

| Name     | Type            |
| -------- | --------------- |
| proposal | trait_reference |
| sender   | principal       |

### construct

[View in file](../contracts/bitcoin-dao.clar#L71)

`(define-public (construct ((proposal trait_reference)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (construct (proposal <proposal-trait>))
	(let ((sender tx-sender))
		(asserts! (is-eq sender (var-get executive)) err-unauthorised)
		(var-set executive (as-contract tx-sender))
		(as-contract (execute proposal sender))
	)
)
```

</details>

**Parameters:**

| Name     | Type            |
| -------- | --------------- |
| proposal | trait_reference |

### request-extension-callback

[View in file](../contracts/bitcoin-dao.clar#L81)

`(define-public (request-extension-callback ((extension trait_reference) (memo (buff 34))) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (request-extension-callback (extension <extension-trait>) (memo (buff 34)))
	(let ((sender tx-sender))
		(asserts! (is-extension contract-caller) err-invalid-extension)
		(asserts! (is-eq contract-caller (contract-of extension)) err-invalid-extension)
		(as-contract (contract-call? extension callback sender memo))
	)
)
```

</details>

**Parameters:**

| Name      | Type            |
| --------- | --------------- |
| extension | trait_reference |
| memo      | (buff 34)       |

## Maps

### executed-proposals

```clarity
(define-map executed-proposals principal uint)
```

[View in file](../contracts/bitcoin-dao.clar#L17)

### extensions

```clarity
(define-map extensions principal bool)
```

[View in file](../contracts/bitcoin-dao.clar#L18)

## Variables

### executive

principal

```clarity
(define-data-var executive principal tx-sender)
```

[View in file](../contracts/bitcoin-dao.clar#L16)

## Constants

### err-unauthorised

```clarity
(define-constant err-unauthorised (err u1000))
```

[View in file](../contracts/bitcoin-dao.clar#L12)

### err-already-executed

```clarity
(define-constant err-already-executed (err u1001))
```

[View in file](../contracts/bitcoin-dao.clar#L13)

### err-invalid-extension

```clarity
(define-constant err-invalid-extension (err u1002))
```

[View in file](../contracts/bitcoin-dao.clar#L14)
