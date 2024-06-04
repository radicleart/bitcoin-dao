# bdp000-core-team-sunset-height

[`bdp000-core-team-sunset-height.clar`](../contracts/proposals/testnet/bdp000-core-team-sunset-height.clar)

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

[View in file](../contracts/proposals/testnet/bdp000-core-team-sunset-height.clar#L8)

`(define-public (execute ((sender principal)) (response bool uint))`

<details>
  <summary>Source code:</summary>

```clarity
(define-public (execute (sender principal))
	(begin

		(try! (contract-call? .bde003-core-proposals set-core-team-sunset-height (+ burn-block-height u10)))

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
