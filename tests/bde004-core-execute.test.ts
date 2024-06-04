import { test, expect, describe } from "vitest";
import { constructDao, coreExecute, errors } from "./helpers";
import { rov, txErr, txOk, varGet } from '@clarigen/test';

const accounts = simnet.getAccounts();
const alice = accounts.get("wallet_1")!;
const bob = accounts.get("wallet_2")!;
const charlie = accounts.get("wallet_3")!;
const aria = accounts.get("wallet_4")!;

/*
  The test below is an example. Learn more in the clarinet-sdk readme:
  https://github.com/hirosystems/clarinet/blob/develop/components/clarinet-sdk/README.md
*/

describe("bde004-core-execute sunset tests", () => {

  test("construct - bootstrap proposal sets executive core team", async () => {
    constructDao()
    //console.log('response', util.inspect(response, false, null, true /* enable colors */));
    const signals = rov(coreExecute.getSignalsRequired());
    expect(Number(signals)).toEqual(2);
    expect(rov(coreExecute.isExecutiveTeamMember(simnet.deployer))).toBe(true);
    expect(rov(coreExecute.isExecutiveTeamMember(alice))).toBe(true);
    expect(rov(coreExecute.isExecutiveTeamMember(bob))).toBe(true);
    expect(rov(coreExecute.isExecutiveTeamMember(charlie))).toBe(true);
    expect(rov(coreExecute.isExecutiveTeamMember(aria))).toBe(false);
  });

  test("executive-action - can only be signalled by a core executive team member", async () => {
    const proposal = constructDao()
    //console.log('response', util.inspect(response, false, null, true /* enable colors */));
    const response1 = txErr(coreExecute.executiveAction(proposal), aria);
    expect(response1.value).toBe(errors.coreExecute.errNotExecutiveTeamMember)
  });

  test("executive-action - sunset height is 0 by default", async () => {
    constructDao()
    const height = await varGet(coreExecute.identifier, coreExecute.variables.executiveTeamSunsetHeight);
    expect(height).toBe(0n)
  });

  test("executive-action - can only be signalled by a core executive team member", async () => {
    const proposal = constructDao()
    
    //console.log('response', util.inspect(response, false, null, true /* enable colors */));
    const response1 = txErr(coreExecute.executiveAction(proposal), aria);
    expect(response1.value).toBe(errors.coreExecute.errNotExecutiveTeamMember)

    const response2 = txOk(coreExecute.executiveAction(proposal), alice);
    expect(response2.value).toBe(1n)
  });

  test("executive-action - can only be signalled by executive team member", async () => {
    const proposal = constructDao()
    
    //console.log('response', util.inspect(response, false, null, true /* enable colors */));
    const response1 = txErr(coreExecute.executiveAction(proposal), aria);
    expect(response1.value).toBe(errors.coreExecute.errNotExecutiveTeamMember)

    const response2 = txOk(coreExecute.executiveAction(proposal), alice);
    expect(response2.value).toBe(1n)
  });

  test("executive-action - cannot be signalled twice by the same team member", async () => {
    const proposal = constructDao()
    
    const response2 = txOk(coreExecute.executiveAction(proposal), alice);
    expect(response2.value).toBe(1n)
    
    const response3 = txOk(coreExecute.executiveAction(proposal), alice);
    expect(response3.value).toBe(1n)
  });

  test("executive-action - cannot execute an already executed proposal", async () => {
    const proposal = constructDao()
    
    const response2 = txOk(coreExecute.executiveAction(proposal), alice);
    expect(response2.value).toBe(1n)

    const response3 = txErr(coreExecute.executiveAction(proposal), bob);
    expect(response3.value).toBe(errors.bitcoinDao.errAlreadyExecuted)
  });

  test("executive-action - can set new sunset height", async () => {
    constructDao()
    
    const proposal1 = simnet.deployer + '.' + 'bdp000-executive-team-sunset-height'
    const response2 = txOk(coreExecute.executiveAction(proposal1), alice);
    expect(response2.value).toBe(1n)
    const response3 = txOk(coreExecute.executiveAction(proposal1), bob);
    expect(response3.value).toBe(2n)
  });

  test("executive-action - cannot execute proposals after sunset", async () => {
    constructDao()
    
    const proposal1 = simnet.deployer + '.' + 'bdp000-executive-team-sunset-height'
    let responseOk = txOk(coreExecute.executiveAction(proposal1), alice);
    expect(responseOk.value).toBe(1n)

    responseOk = txOk(coreExecute.executiveAction(proposal1), bob);
    expect(responseOk.value).toBe(2n)

    simnet.mineEmptyBlocks(10)

    responseOk = txErr(coreExecute.executiveAction(proposal1), alice);
    expect(responseOk.value).toBe(errors.coreExecute.errSunsetHeightReached)    

  });

});
