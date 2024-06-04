import { test, expect, describe } from "vitest";
import { bitcoinDao, coreProposals, governanceToken, resourceManager, treasury } from "./helpers";
import { rov, txOk } from '@clarigen/test';

const accounts = simnet.getAccounts();
const alice = accounts.get("wallet_1")!;
const bob = accounts.get("wallet_2")!;

/*
  The test below is an example. Learn more in the clarinet-sdk readme:
  https://github.com/hirosystems/clarinet/blob/develop/components/clarinet-sdk/README.md
*/

/**
 * bde020-resource-payments-manager setup
 */
describe("bde020-resource-payments-manager setup", () => {

  test("construct - bootstrap proposal sets resource manager extensions", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()
    
    //expect(rov(bitcoinDao.isExtension(res))).toBe(true);
    expect(rov(bitcoinDao.isExtension(treasury.identifier))).toBe(true);
    expect(rov(bitcoinDao.isExtension(governanceToken.identifier))).toBe(true);
    expect(rov(bitcoinDao.isExtension(resourceManager.identifier))).toBe(true);
  });

});


/**
 * bde020-resource-payments-manager managing resources
 */
describe("bde020-resource-payments-manager managing resources", () => {

  test("construct - bootstrap proposal sets resource manager extensions", async () => {
    const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
    const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
    expect(response.value).toBeTruthy()
    
    expect(rov(coreProposals.isCoreTeamMember(alice))).toBe(true);
    expect(rov(coreProposals.isCoreTeamMember(bob))).toBe(false);
  });

});