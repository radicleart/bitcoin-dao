import { rov, txOk } from "@clarigen/test";
import { project, accounts } from "./clarigen-types";
import { projectFactory, projectErrors } from "@clarigen/core";
import { expect } from "vitest";

export const contracts = projectFactory(project, "simnet");

export const deployer = accounts.deployer.address;
export const alice = accounts.wallet_1.address;
export const bob = accounts.wallet_2.address;
export const charlie = accounts.wallet_3.address;
export const fred = accounts.wallet_9.address;

export const resourceManager = contracts.bde020ResourceManager;
export const governanceToken = contracts.bde000GovernanceToken;
export const proposalVoting = contracts.bde001ProposalVoting;
export const proposalSubmission = contracts.bde002ProposalSubmission;
export const coreProposals = contracts.bde003CoreProposals;
export const coreExecute = contracts.bde004CoreExecute;
export const treasury = contracts.bde006Treasury;
export const bitcoinDao = contracts.bitcoinDao;
export const extensionTrait = contracts.extensionTrait;
export const proposalTrait = contracts.proposalTrait;
export const governanceTokenTrait = contracts.governanceTokenTrait;
export const ownableTrait = contracts.ownableTrait;
export const controllerId = `${accounts.deployer.address}.controller`;

const _errors = projectErrors(project);

export const errors = {
  resourceManager: _errors.bde020ResourceManager,
  governanceToken: _errors.bde000GovernanceToken,
  proposalVoting: _errors.bde001ProposalVoting,
  proposalSubmission: _errors.bde002ProposalSubmission,
  coreProposals: _errors.bde003CoreProposals,
  coreExecute: _errors.bde004CoreExecute,
  treasury: _errors.bde006Treasury,
  bitcoinDao: _errors.bitcoinDao,
};

export function constructDao() {
  const proposal = simnet.deployer + '.' + 'bdp000-bootstrap'
  const response = txOk(bitcoinDao.construct(proposal), simnet.deployer);
  expect(response.value).toBeTruthy()
  return proposal;
}
export function passProposalBySignals(contractName:string) {
  const proposal = simnet.deployer + '.' + contractName
  const response2 = txOk(coreExecute.executiveAction(proposal), alice);
  expect(response2.value).toBe(1n)
  const response3 = txOk(coreExecute.executiveAction(proposal), bob);
  expect(response3.value).toBe(2n)
  expect(rov(bitcoinDao.executedAt(proposal))).toBeGreaterThan(0);

}
