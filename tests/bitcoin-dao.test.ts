import { test, expect, describe } from "vitest";
import { bitcoinDao, errors, governanceToken } from "./helpers";
import { roOk, rov, txErr, txOk, varGet } from '@clarigen/test';
import util from 'util'

const accounts = simnet.getAccounts();
const alice = accounts.get("wallet_1")!;
const bob = accounts.get("wallet_2")!;
const charlie = accounts.get("wallet_3")!;

/*
  The test below is an example. Learn more in the clarinet-sdk readme:
  https://github.com/hirosystems/clarinet/blob/develop/components/clarinet-sdk/README.md
*/

describe("BitcoinDAO error tests", () => {

  test("execute cannot be called by non dao principal", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txErr(bitcoinDao.execute(proposal, alice), alice);
    expect(response.value).toBe(errors.bitcoinDao.errUnauthorised)
  });

  test("request-extension-callback cannot be called by unapproved extensions", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txErr(bitcoinDao.requestExtensionCallback(proposal, new Uint8Array()), alice);
    expect(response.value).toBe(errors.bitcoinDao.errInvalidExtension)
  });

  test("construct can only be called by contract deployer", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txErr(bitcoinDao.construct(proposal), alice);
    expect(response.value).toBe(errors.bitcoinDao.errUnauthorised)
  });

  test("isExtension returns false", async () => {
    const ext = await rov(bitcoinDao.isExtension(alice));
    expect(ext).toBeFalsy()
  });

});

describe("BitcoinDAO construction tests", () => {

  test("construct sets deployer to self", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    txOk(bitcoinDao.construct(proposal), simnet.deployer);
    const executive = await varGet(bitcoinDao.identifier, bitcoinDao.variables.executive);
    expect(executive).toBe(bitcoinDao.identifier)
  });

  test("construct executes and mints governance token", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy();
    
    const token = governanceToken;
    //console.log('response', util.inspect(response, false, null, true /* enable colors */));
    let bal = roOk(token.bdgGetBalance(alice));
    expect(bal.value).toEqual(1000n);
    bal = roOk(token.bdgGetBalance(bob));
    expect(bal.value).toEqual(1000n);
    bal = roOk(token.bdgGetBalance(charlie));
    expect(bal.value).toEqual(1000n);
  });

});
