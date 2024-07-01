import { test, expect, describe } from "vitest";
import { alice, bitcoinDao, bob, constructDao, errors, fred, governanceToken, passProposalBySignals, resourceManager, treasury } from "./helpers";
import { mapGet, rov, txErr, txOk, varGet } from '@clarigen/test';


/**
 * bde020-resource-manager setup
 */
describe("bde020-resource-manager setup", () => {

  test("construct - bootstrap proposal sets resource manager extensions", async () => {
    constructDao()
    expect(rov(bitcoinDao.isExtension(treasury.identifier))).toBe(true);
    expect(rov(bitcoinDao.isExtension(governanceToken.identifier))).toBe(true);
    expect(rov(bitcoinDao.isExtension(resourceManager.identifier))).toBe(true);
  });

});


/**
 * bde020-resource-manager managing resources
 */
describe("bde020-resource-manager managing resources", () => {

  test("add-resource - cannot be added by non dao principal", async () => {
    constructDao()    
    const response1 = txErr(resourceManager.addResource("resource1", "description of resource1", 20000000), alice);
    expect(response1.value).toBe(errors.resourceManager.ERR_UNAUTHORIZED)
  });

  test("add-resource - can only be added by the dao", async () => {
    constructDao()
    try {
      mapGet(resourceManager.identifier, resourceManager.maps.resourceData, 0);
      throw new Error('expected error on line above')
    } catch(e) {}
    let resourceCount = await varGet(resourceManager.identifier, resourceManager.variables.resourceCount);
    expect(resourceCount).toBe(0n)
    passProposalBySignals('bdp000-add-resource')
    let result = mapGet(resourceManager.identifier, resourceManager.maps.resourceData, 1);
    expect(result?.name).toBe("edg-token-mint")
    expect(result?.description).toBe("Resource mints 10 EDG to recipient")
    expect(result?.price).toBe(100n)
    expect(result?.totalSpent).toBe(0n)
    expect(result?.totalUsed).toBe(0n)
    resourceCount = await varGet(resourceManager.identifier, resourceManager.variables.resourceCount);
    expect(resourceCount).toBe(1n)
  });

});

describe("bde020-resource-manager pay invoices", () => {

  test("pay-invoice - cannot be paid for resource id 0", async () => {
    constructDao()    
    passProposalBySignals('bdp000-add-resource')
    const response1 = txErr(resourceManager.payInvoice(0n, new Uint8Array()), alice);
    expect(response1.value).toBe(errors.resourceManager.ERR_RESOURCE_NOT_FOUND)
  });

  test("pay-invoice - fails if user balance is below price", async () => {
    constructDao()
    passProposalBySignals('bdp000-add-resource')
    const response1 = txErr(resourceManager.payInvoice(1n, new Uint8Array()), fred);
    expect(response1.value).toBe(1n) // insufficient funds
  });

  test("pay-invoice - succeeds if user balance has funds", async () => {
    constructDao()
    passProposalBySignals('bdp000-add-resource')
    const response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(1n) // insufficient funds
  });

  test("pay-invoice - succeeds for two users 1 resource", async () => {
    constructDao()
    passProposalBySignals('bdp000-add-resource')
    let response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(1n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), bob);
    expect(response1.value).toBe(2n) 
  });

  test("pay-invoice - succeeds for one users twice for same resource", async () => {
    constructDao()
    passProposalBySignals('bdp000-add-resource')
    let response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(1n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(2n) 
  });

  test("pay-invoice - fails for one user after they run out of funds", async () => {
    constructDao()
    passProposalBySignals('bdp000-add-resource')
    let response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(1n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(2n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(3n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(4n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(5n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(6n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(7n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(8n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(9n) 
    response1 = txOk(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(10n) 
    response1 = txErr(resourceManager.payInvoice(1n, new Uint8Array()), alice);
    expect(response1.value).toBe(1n)
  });

});
