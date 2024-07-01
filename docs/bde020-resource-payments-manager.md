# bde020-resource-payments-manager

[`bde020-resource-payments-manager.clar`](../contracts/extensions/bde020-resource-payments-manager.clar)

**Public functions:**

- [`is-dao-or-extension`](#is-dao-or-extension)
- [`add-resource`](#add-resource)
- [`toggle-resource`](#toggle-resource)
- [`toggle-resource-by-name`](#toggle-resource-by-name)
- [`pay-invoice`](#pay-invoice)
- [`pay-invoice-by-resource-name`](#pay-invoice-by-resource-name)
- [`callback`](#callback)

**Read-only functions:**

- [`get-total-users`](#get-total-users)
- [`get-user-index`](#get-user-index)
- [`get-user-data`](#get-user-data)
- [`get-user-data-by-address`](#get-user-data-by-address)
- [`get-total-resources`](#get-total-resources)
- [`get-resource-index`](#get-resource-index)
- [`get-resource`](#get-resource)
- [`get-resource-by-name`](#get-resource-by-name)
- [`get-total-invoices`](#get-total-invoices)
- [`get-invoice`](#get-invoice)
- [`get-recent-payment`](#get-recent-payment)
- [`get-recent-payment-data`](#get-recent-payment-data)
- [`get-recent-payment-data-by-address`](#get-recent-payment-data-by-address)
- [`get-total-revenue`](#get-total-revenue)

**Private functions:**

- [`get-or-create-user`](#get-or-create-user)

**Maps**

- [`UserIndexes`](#userindexes)
- [`UserData`](#userdata)
- [`ResourceIndexes`](#resourceindexes)
- [`ResourceData`](#resourcedata)
- [`InvoiceData`](#invoicedata)
- [`RecentPayments`](#recentpayments)

**Variables**

- [`userCount`](#usercount)
- [`resourceCount`](#resourcecount)
- [`invoiceCount`](#invoicecount)
- [`totalRevenue`](#totalrevenue)

**Constants**

- [`DEPLOYER`](#deployer)
- [`SELF`](#self)
- [`ONE_8`](#one_8)
- [`ERR_UNAUTHORIZED`](#err_unauthorized)
- [`ERR_INVALID_PARAMS`](#err_invalid_params)
- [`ERR_NAME_ALREADY_USED`](#err_name_already_used)
- [`ERR_SAVING_RESOURCE_DATA`](#err_saving_resource_data)
- [`ERR_DELETING_RESOURCE_DATA`](#err_deleting_resource_data)
- [`ERR_RESOURCE_NOT_FOUND`](#err_resource_not_found)
- [`ERR_RESOURCE_NOT_ENABLED`](#err_resource_not_enabled)
- [`ERR_USER_ALREADY_EXISTS`](#err_user_already_exists)
- [`ERR_SAVING_USER_DATA`](#err_saving_user_data)
- [`ERR_USER_NOT_FOUND`](#err_user_not_found)
- [`ERR_INVOICE_ALREADY_PAID`](#err_invoice_already_paid)
- [`ERR_SAVING_INVOICE_DATA`](#err_saving_invoice_data)
- [`ERR_INVOICE_NOT_FOUND`](#err_invoice_not_found)
- [`ERR_RECENT_PAYMENT_NOT_FOUND`](#err_recent_payment_not_found)

## Functions

### is-dao-or-extension

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L116)

`(define-public (is-dao-or-extension () (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .bitcoin-dao) (contract-call? .bitcoin-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)
```

</details>

### get-total-users

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L124)

`(define-read-only (get-total-users () uint)`

returns total registered users

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-total-users)
  (var-get userCount)
)
```

</details>

### get-user-index

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L129)

`(define-read-only (get-user-index ((user principal)) (optional uint))`

returns user index for address if known

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-user-index (user principal))
  (map-get? UserIndexes user)
)
```

</details>

**Parameters:**

| Name | Type      |
| ---- | --------- |
| user | principal |

### get-user-data

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L134)

`(define-read-only (get-user-data ((index uint)) (optional (tuple (address principal) (totalSpent uint) (totalUsed uint))))`

returns user data by user index if known

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-user-data (index uint))
  (map-get? UserData index)
)
```

</details>

**Parameters:**

| Name  | Type |
| ----- | ---- |
| index | uint |

### get-user-data-by-address

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L139)

`(define-read-only (get-user-data-by-address ((user principal)) (optional (tuple (address principal) (totalSpent uint) (totalUsed uint))))`

returns user data by address if known

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-user-data-by-address (user principal))
  (get-user-data (unwrap! (get-user-index user) none))
)
```

</details>

**Parameters:**

| Name | Type      |
| ---- | --------- |
| user | principal |

### get-total-resources

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L144)

`(define-read-only (get-total-resources () uint)`

returns total registered resources

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-total-resources)
  (var-get resourceCount)
)
```

</details>

### get-resource-index

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L149)

`(define-read-only (get-resource-index ((name (string-utf8 50))) (optional uint))`

returns resource index for name if known

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-resource-index (name (string-utf8 50)))
  (map-get? ResourceIndexes name)
)
```

</details>

**Parameters:**

| Name | Type             |
| ---- | ---------------- |
| name | (string-utf8 50) |

### get-resource

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L154)

`(define-read-only (get-resource ((index uint)) (optional (tuple (createdAt uint) (description (string-utf8 255)) (enabled bool) (name (string-utf8 50)) (price uint) (totalSpent uint) (totalUsed uint))))`

returns resource data by resource index if known

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-resource (index uint))
  (map-get? ResourceData index)
)
```

</details>

**Parameters:**

| Name  | Type |
| ----- | ---- |
| index | uint |

### get-resource-by-name

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L159)

`(define-read-only (get-resource-by-name ((name (string-utf8 50))) (optional (tuple (createdAt uint) (description (string-utf8 255)) (enabled bool) (name (string-utf8 50)) (price uint) (totalSpent uint) (totalUsed uint))))`

returns resource data by resource name if known

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-resource-by-name (name (string-utf8 50)))
  (get-resource (unwrap! (get-resource-index name) none))
)
```

</details>

**Parameters:**

| Name | Type             |
| ---- | ---------------- |
| name | (string-utf8 50) |

### get-total-invoices

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L164)

`(define-read-only (get-total-invoices () uint)`

returns total registered invoices

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-total-invoices)
  (var-get invoiceCount)
)
```

</details>

### get-invoice

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L169)

`(define-read-only (get-invoice ((index uint)) (optional (tuple (amount uint) (createdAt uint) (resourceIndex uint) (resourceName (string-utf8 50)) (userIndex uint))))`

returns invoice data by invoice index if known

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-invoice (index uint))
  (map-get? InvoiceData index)
)
```

</details>

**Parameters:**

| Name  | Type |
| ----- | ---- |
| index | uint |

### get-recent-payment

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L174)

`(define-read-only (get-recent-payment ((resourceIndex uint) (userIndex uint)) (optional uint))`

returns invoice index by user index and resource index if known

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-recent-payment (resourceIndex uint) (userIndex uint))
  (map-get? RecentPayments {
    userIndex: userIndex,
    resourceIndex: resourceIndex,
  })
)
```

</details>

**Parameters:**

| Name          | Type |
| ------------- | ---- |
| resourceIndex | uint |
| userIndex     | uint |

### get-recent-payment-data

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L182)

`(define-read-only (get-recent-payment-data ((resourceIndex uint) (userIndex uint)) (optional (tuple (amount uint) (createdAt uint) (resourceIndex uint) (resourceName (string-utf8 50)) (userIndex uint))))`

returns invoice data by user index and resource index if known

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-recent-payment-data (resourceIndex uint) (userIndex uint))
  (get-invoice (unwrap! (get-recent-payment resourceIndex userIndex) none))
)
```

</details>

**Parameters:**

| Name          | Type |
| ------------- | ---- |
| resourceIndex | uint |
| userIndex     | uint |

### get-recent-payment-data-by-address

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L187)

`(define-read-only (get-recent-payment-data-by-address ((name (string-utf8 50)) (user principal)) (optional (tuple (amount uint) (createdAt uint) (resourceIndex uint) (resourceName (string-utf8 50)) (userIndex uint))))`

returns invoice data by user address and resource name if known

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-recent-payment-data-by-address (name (string-utf8 50)) (user principal))
  (get-recent-payment-data (unwrap! (get-resource-index name) none) (unwrap! (get-user-index user) none))
)
```

</details>

**Parameters:**

| Name | Type             |
| ---- | ---------------- |
| name | (string-utf8 50) |
| user | principal        |

### get-total-revenue

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L192)

`(define-read-only (get-total-revenue () uint)`

returns total revenue

<details>
  <summary>Source code:</summary>

```clarity
(define-read-only (get-total-revenue)
  (var-get totalRevenue)
)
```

</details>

### add-resource

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L201)

`(define-public (add-resource ((name (string-utf8 50)) (description (string-utf8 255)) (price uint)) (response uint uint))`

adds active resource that invoices can be generated for
only accessible by deployer

<details>
  <summary>Source code:</summary>

```clarity
(define-public (add-resource (name (string-utf8 50)) (description (string-utf8 255)) (price uint))
  (let
    (
      (newCount (+ (get-total-resources) u1))
    )
    ;; check if caller matches deployer
		(try! (is-dao-or-extension))
    ;; check all values are provided
    (asserts! (> (len name) u0) ERR_INVALID_PARAMS)
    (asserts! (> (len description) u0) ERR_INVALID_PARAMS)
    (asserts! (> price u0) ERR_INVALID_PARAMS)
    ;; update ResourceIndexes map, check name is unique
    (asserts! (map-insert ResourceIndexes name newCount) ERR_NAME_ALREADY_USED)
    ;; update ResourceData map
    (asserts! (map-insert ResourceData
      newCount
      {
        createdAt: block-height,
        enabled: true,
        name: name,
        description: description,
        price: price,
        totalSpent: u0,
        totalUsed: u0,
      }
    ) ERR_SAVING_RESOURCE_DATA)
    ;; increment resourceCount
    (var-set resourceCount newCount)
    ;; print details
    (print {
      notification: "add-resource",
      payload: {
        resourceIndex: newCount,
        resourceData: (unwrap! (get-resource newCount) ERR_RESOURCE_NOT_FOUND),
        txSender: tx-sender,
        contractCaller: contract-caller
      }
    })
    ;; return new count
    (ok newCount)
  )
)
```

</details>

**Parameters:**

| Name        | Type              |
| ----------- | ----------------- |
| name        | (string-utf8 50)  |
| description | (string-utf8 255) |
| price       | uint              |

### toggle-resource

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L246)

`(define-public (toggle-resource ((index uint)) (response bool uint))`

toggles enabled status for resource
only accessible by deployer

<details>
  <summary>Source code:</summary>

```clarity
(define-public (toggle-resource (index uint))
  (let
    (
      (resourceData (unwrap! (get-resource index) ERR_RESOURCE_NOT_FOUND))
      (newStatus (not (get enabled resourceData)))
    )
    ;; verify resource > 0
    (asserts! (> index u0) ERR_INVALID_PARAMS)
    ;; check if caller matches deployer
		(try! (is-dao-or-extension))
    ;; update ResourceData map
    (map-set ResourceData
      index
      (merge resourceData {
        enabled: newStatus
      })
    )
    ;; print details
    (print {
      notification: "toggle-resource",
      payload: {
        resourceIndex: index,
        resourceData: (unwrap! (get-resource index) ERR_RESOURCE_NOT_FOUND),
        txSender: tx-sender,
        contractCaller: contract-caller
      }
    })
    ;; return based on set status
    (ok newStatus)
  )
)
```

</details>

**Parameters:**

| Name  | Type |
| ----- | ---- |
| index | uint |

### toggle-resource-by-name

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L280)

`(define-public (toggle-resource-by-name ((name (string-utf8 50))) (response bool uint))`

toggles enabled status for resource by name
only accessible by deployer

<details>
  <summary>Source code:</summary>

```clarity
(define-public (toggle-resource-by-name (name (string-utf8 50)))
  (toggle-resource (unwrap! (get-resource-index name) ERR_RESOURCE_NOT_FOUND))
)
```

</details>

**Parameters:**

| Name | Type             |
| ---- | ---------------- |
| name | (string-utf8 50) |

### pay-invoice

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L285)

`(define-public (pay-invoice ((resourceIndex uint) (memo (optional (buff 34)))) (response uint uint))`

allows a user to pay an invoice for a resource

<details>
  <summary>Source code:</summary>

```clarity
(define-public (pay-invoice (resourceIndex uint) (memo (optional (buff 34))))
  (let
    (
      (newCount (+ (get-total-invoices) u1))
      (lastAnchoredBlock (- block-height u1))
      (resourceData (unwrap! (get-resource resourceIndex) ERR_RESOURCE_NOT_FOUND))
      (userIndex (unwrap! (get-or-create-user contract-caller) ERR_USER_NOT_FOUND))
      (userData (unwrap! (get-user-data userIndex) ERR_USER_NOT_FOUND))
    )
    ;; check that resourceIndex is > 0
    (asserts! (> resourceIndex u0) ERR_INVALID_PARAMS)
    ;; check that resource is enabled
    (asserts! (get enabled resourceData) ERR_RESOURCE_NOT_ENABLED)
    ;; update InvoiceData map
    (asserts! (map-insert InvoiceData
      newCount
      {
        amount: (get price resourceData),
        createdAt: block-height,
        userIndex: userIndex,
        resourceName: (get name resourceData),
        resourceIndex: resourceIndex,
      }
    ) ERR_SAVING_INVOICE_DATA)
    ;; update RecentPayments map
    (map-set RecentPayments
      {
        userIndex: userIndex,
        resourceIndex: resourceIndex,
      }
      newCount
    )
    ;; update UserData map
    (map-set UserData
      userIndex
      (merge userData {
        totalSpent: (+ (get totalSpent userData) (get price resourceData)),
        totalUsed: (+ (get totalUsed userData) u1)
      })
    )
    ;; update ResourceData map
    (map-set ResourceData
      resourceIndex
      (merge resourceData {
        totalSpent: (+ (get totalSpent resourceData) (get price resourceData)),
        totalUsed: (+ (get totalUsed resourceData) u1)
      })
    )
    ;; update total revenue
    (var-set totalRevenue (+ (var-get totalRevenue) (get price resourceData)))
    ;; increment counter
    (var-set invoiceCount newCount)
    ;; print details
    (print {
      notification: "pay-invoice",
      payload: {
        invoiceIndex: newCount,
        invoiceData: (unwrap! (get-invoice newCount) ERR_INVOICE_NOT_FOUND),
        recentPayment: (unwrap! (get-recent-payment resourceIndex userIndex) ERR_RECENT_PAYMENT_NOT_FOUND),
        userIndex: userIndex,
        userData: (unwrap! (get-user-data userIndex) ERR_USER_NOT_FOUND),
        resourceIndex: resourceIndex,
        resourceData: (unwrap! (get-resource resourceIndex) ERR_RESOURCE_NOT_FOUND),
        totalRevenue: (var-get totalRevenue),
        txSender: tx-sender,
        contractCaller: contract-caller
      }
    })
    ;; make transfer
    (try! (contract-call? .bde000-governance-token transfer (get price resourceData) contract-caller .bde006-treasury memo))
    ;; return new count
    (ok newCount)
  )
)
```

</details>

**Parameters:**

| Name          | Type                 |
| ------------- | -------------------- |
| resourceIndex | uint                 |
| memo          | (optional (buff 34)) |

### pay-invoice-by-resource-name

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L360)

`(define-public (pay-invoice-by-resource-name ((name (string-utf8 50)) (memo (optional (buff 34)))) (response uint uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (pay-invoice-by-resource-name (name (string-utf8 50)) (memo (optional (buff 34))))
  (pay-invoice (unwrap! (get-resource-index name) ERR_RESOURCE_NOT_FOUND) memo)
)
```

</details>

**Parameters:**

| Name | Type                 |
| ---- | -------------------- |
| name | (string-utf8 50)     |
| memo | (optional (buff 34)) |

### get-or-create-user

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L367)

`(define-private (get-or-create-user ((address principal)) (response uint uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-private (get-or-create-user (address principal))
  (match (map-get? UserIndexes address)
    value (ok value) ;; return index if found
    (let
      (
        ;; increment current index
        (newCount (+ (get-total-users) u1))
      )
      ;; update UserIndexes map, check address is unique
      (asserts! (map-insert UserIndexes address newCount) ERR_USER_ALREADY_EXISTS)
      ;; update UserData map
      (asserts! (map-insert UserData
        newCount
        {
          address: address,
          totalSpent: u0,
          totalUsed: u0,
        }
      ) ERR_SAVING_USER_DATA)
      ;; save new index
      (var-set userCount newCount)
      ;; return new index
      (ok newCount)
    )
  )
)
```

</details>

**Parameters:**

| Name    | Type      |
| ------- | --------- |
| address | principal |

### callback

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L396)

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

### UserIndexes

tracks user indexes by address

```clarity
(define-map UserIndexes
  principal ;; user address
  uint      ;; user index
)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L53)

### UserData

tracks full user data keyed by user index
can iterate over full map with userCount data-var

```clarity
(define-map UserData
  uint ;; user index
  {
    address: principal,
    totalSpent: uint,
    totalUsed: uint,
  }
)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L60)

### ResourceIndexes

tracks resource indexes by resource name

```clarity
(define-map ResourceIndexes
  (string-utf8 50) ;; resource name
  uint             ;; resource index
)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L70)

### ResourceData

tracks resources added by deployer keyed by resource index
can iterate over full map with resourceCount data-var

```clarity
(define-map ResourceData
  uint ;; resource index
  {
    createdAt: uint,
    enabled: bool,
    name: (string-utf8 50),
    description: (string-utf8 255),
    price: uint,
    totalSpent: uint,
    totalUsed: uint,
    ;; TODO: for health check, setter would be nice
    ;; TODO: expect SIP-018 open timestamp response
    ;; url: (optional (string-utf8 255)),
  }
)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L77)

### InvoiceData

tracks invoices paid by users requesting access to a resource

```clarity
(define-map InvoiceData
  uint ;; invoice count
  {
    amount: uint,
    createdAt: uint,
    userIndex: uint,
    resourceName: (string-utf8 50),
    resourceIndex: uint,
  }
)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L94)

### RecentPayments

tracks last payment from user for a resource

```clarity
(define-map RecentPayments
  {
    userIndex: uint,
    resourceIndex: uint,
  }
  uint ;; invoice count
)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L106)

## Variables

### userCount

uint

tracking counts for each map

```clarity
(define-data-var userCount uint u0)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L42)

### resourceCount

uint

```clarity
(define-data-var resourceCount uint u0)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L43)

### invoiceCount

uint

```clarity
(define-data-var invoiceCount uint u0)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L44)

### totalRevenue

uint

tracking overall contract revenue

```clarity
(define-data-var totalRevenue uint u0)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L47)

## Constants

### DEPLOYER

initially scoped to service provider deploying a contract

```clarity
(define-constant DEPLOYER contract-caller)
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L16)

### SELF

```clarity
(define-constant SELF (as-contract tx-sender))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L17)

### ONE_8

math helpers (credit: ALEX)

```clarity
(define-constant ONE_8 (pow u10 u8))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L20)

### ERR_UNAUTHORIZED

errors

```clarity
(define-constant ERR_UNAUTHORIZED (err u1000))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L23)

### ERR_INVALID_PARAMS

```clarity
(define-constant ERR_INVALID_PARAMS (err u1001))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L24)

### ERR_NAME_ALREADY_USED

```clarity
(define-constant ERR_NAME_ALREADY_USED (err u1002))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L25)

### ERR_SAVING_RESOURCE_DATA

```clarity
(define-constant ERR_SAVING_RESOURCE_DATA (err u1003))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L26)

### ERR_DELETING_RESOURCE_DATA

```clarity
(define-constant ERR_DELETING_RESOURCE_DATA (err u1004))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L27)

### ERR_RESOURCE_NOT_FOUND

```clarity
(define-constant ERR_RESOURCE_NOT_FOUND (err u1005))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L28)

### ERR_RESOURCE_NOT_ENABLED

```clarity
(define-constant ERR_RESOURCE_NOT_ENABLED (err u1006))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L29)

### ERR_USER_ALREADY_EXISTS

```clarity
(define-constant ERR_USER_ALREADY_EXISTS (err u1007))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L30)

### ERR_SAVING_USER_DATA

```clarity
(define-constant ERR_SAVING_USER_DATA (err u1008))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L31)

### ERR_USER_NOT_FOUND

```clarity
(define-constant ERR_USER_NOT_FOUND (err u1009))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L32)

### ERR_INVOICE_ALREADY_PAID

```clarity
(define-constant ERR_INVOICE_ALREADY_PAID (err u1010))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L33)

### ERR_SAVING_INVOICE_DATA

```clarity
(define-constant ERR_SAVING_INVOICE_DATA (err u1011))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L34)

### ERR_INVOICE_NOT_FOUND

```clarity
(define-constant ERR_INVOICE_NOT_FOUND (err u1012))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L35)

### ERR_RECENT_PAYMENT_NOT_FOUND

```clarity
(define-constant ERR_RECENT_PAYMENT_NOT_FOUND (err u1013))
```

[View in file](../contracts/extensions/bde020-resource-payments-manager.clar#L36)
