import { test, expect, describe } from "vitest";
import { bitcoinDao, coreProposals, errors, governanceToken, proposalVoting } from "./helpers";
import { rov, txErr, txOk, varGet } from '@clarigen/test';
import util from 'util'
import { Cl, trueCV } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const alice = accounts.get("wallet_1")!;
const bob = accounts.get("wallet_2")!;
const charlie = accounts.get("wallet_3")!;
const aria = accounts.get("wallet_4")!;

/*
  The test below is an example. Learn more in the clarinet-sdk readme:
  https://github.com/hirosystems/clarinet/blob/develop/components/clarinet-sdk/README.md
*/

describe("bde003-core-proposals sunset tests", () => {

  test("construct - bootstrap proposal sets core team", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()
    
    //console.log('response', util.inspect(response, false, null, true /* enable colors */));
    expect(rov(coreProposals.isCoreTeamMember(simnet.deployer))).toBe(true);
    expect(rov(coreProposals.isCoreTeamMember(alice))).toBe(true);
    expect(rov(coreProposals.isCoreTeamMember(bob))).toBe(false);
  });

  test("core-propose - core proposals can only be proposed by a core team member", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()
    
    //console.log('response', util.inspect(response, false, null, true /* enable colors */));
    const response1 = txErr(coreProposals.corePropose(proposal), bob);
    expect(response1.value).toBe(errors.coreProposals.errNotCoreTeamMember)
  });

  test("core-propose - sunset height is 0 by default", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()
    const height = await varGet(coreProposals.identifier, coreProposals.variables.coreTeamSunsetHeight);
    expect(height).toBe(0n)
  });

  test("core-propose - can only be proposed by a core team member", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()

    //console.log('response', util.inspect(response, false, null, true /* enable colors */));
    const response1 = txErr(coreProposals.corePropose(proposal), aria);
    expect(response1.value).toBe(errors.coreProposals.errNotCoreTeamMember)

    const proposal1 = simnet.deployer + '.' + 'bdp000-core-team-sunset-height'
    const response2 = txOk(coreProposals.corePropose(proposal1), simnet.deployer);
    expect(response2.value).toBe(true)
  });

  test("core-propose - can only be proposed by core team member", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()
    
    const proposal1 = simnet.deployer + '.' + 'bdp000-core-team-sunset-height'
    //console.log('response', util.inspect(response, false, null, true /* enable colors */));
    const response1 = txErr(coreProposals.corePropose(proposal1), aria);
    expect(response1.value).toBe(errors.coreProposals.errNotCoreTeamMember)

    const response2 = txOk(coreProposals.corePropose(proposal1), alice);
    expect(response2.value).toBe(true)
  });

  test("core-propose - cannot be proposed twice by the same team member", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()
    
    const proposal1 = simnet.deployer + '.' + 'bdp000-core-team-sunset-height'
    const response2 = txOk(coreProposals.corePropose(proposal1), alice);
    expect(response2.value).toBe(true)
    
    const response3 = txErr(coreProposals.corePropose(proposal1), alice);
    expect(response3.value).toBe(errors.proposalVoting.errProposalAlreadyExists)
  });

  test("core-propose - cannot propose an already executed proposal", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()
    
    const proposal1 = simnet.deployer + '.' + 'bdp000-core-team-sunset-height'
    const response2 = txOk(coreProposals.corePropose(proposal1), alice);
    expect(response2.value).toBe(true)

    const response3 = txErr(coreProposals.corePropose(proposal1), alice);
    expect(response3.value).toBe(errors.proposalVoting.errProposalAlreadyExists)
  });

  test("core-propose - can set new sunset height", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()
    
    const proposal1 = simnet.deployer + '.' + 'bdp000-core-team-sunset-height'
    const response2 = txOk(coreProposals.corePropose(proposal1), alice);
    expect(response2.value).toBe(true)

    let response3 = txOk(proposalVoting.vote(1000n, true, proposal1, governanceToken.identifier), bob);
    expect(response3.value).toBe(true)

    let height = await varGet(coreProposals.identifier, coreProposals.variables.coreTeamSunsetHeight);
    expect(height).toBe(0n)

    simnet.mineEmptyBlocks(200)

    response3 = txOk(proposalVoting.conclude(proposal1), bob);
    expect(response3.value).toBe(true)

    height = await varGet(coreProposals.identifier, coreProposals.variables.coreTeamSunsetHeight);
    expect(height).toBeGreaterThan(0n)
  });

  test("core-propose - cannot execute proposals after sunset", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    let response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()
    
    // pass proposal to change sunset
    const proposal1 = simnet.deployer + '.' + 'bdp000-core-team-sunset-height'
    response = txOk(coreProposals.corePropose(proposal1), alice);
    expect(response.value).toBe(true)
    response = txOk(proposalVoting.vote(1000n, true, proposal1, governanceToken.identifier), bob);
    expect(response.value).toBe(true)
    let height = await varGet(coreProposals.identifier, coreProposals.variables.coreTeamSunsetHeight);
    expect(height).toBe(0n)
    simnet.mineEmptyBlocks(200)
    response = txOk(proposalVoting.conclude(proposal1), bob);
    expect(response.value).toBe(true)
    height = await varGet(coreProposals.identifier, coreProposals.variables.coreTeamSunsetHeight);
    expect(height).toBeGreaterThan(0n)

    // fail to core team propose after new sunset 
    const proposal2 = simnet.deployer + '.' + 'bdp000-executive-team-sunset-height'
    simnet.mineEmptyBlocks(200)
    const responseErr = txErr(coreProposals.corePropose(proposal2), alice);
    expect(responseErr.value).toBe(errors.coreProposals.errSunsetHeightReached)
  });

});
