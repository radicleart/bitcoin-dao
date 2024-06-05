# bdp000-add-resource

[`bdp000-add-resource.clar`](../contracts/proposals/testnet/resources/bdp000-add-resource.clar)

Title: BDP000 Unit Tests

Author: Mike Cohen

Synopsis:

sets core team sunset height.

**Public functions:**

- [`execute`](#execute)

**Read-only functions:**

**Private functions:**

**Maps**

**Variables**

**Constants**

## Functions

### execute

[View in file](../contracts/proposals/testnet/resources/bdp000-add-resource.clar#L8)

`(define-public (execute ((sender principal)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (execute (sender principal))
	(begin

		(try! (contract-call? .bde020-resource-manager add-resource u"edg-token-mint" u"Resource mints 10 EDG to recipient" u10000000))

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
