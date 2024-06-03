import { project, accounts } from "./clarigen-types";
import { projectFactory, projectErrors } from "@clarigen/core";

export const contracts = projectFactory(project, "simnet");

export const deployer = accounts.deployer.address;
export const alice = accounts.wallet_1.address;
export const bob = accounts.wallet_2.address;
export const charlie = accounts.wallet_3.address;

export const governanceToken = contracts.bde000GovernanceToken;
export const proposalVoting = contracts.bde001ProposalVoting;
export const proposalSubmission = contracts.bde002ProposalSubmission;
export const coreProposals = contracts.bde003CoreProposals;
export const coreExecute = contracts.bde004CoreExecute;
export const treasury = contracts.bde006Treasury;
export const bitcoinDao = contracts.bitcoinDao;
export const extensionTrait = contracts.extensionTrait;
export const governanceTokenTrait = contracts.governanceTokenTrait;
export const ownableTrait = contracts.ownableTrait;
export const controllerId = `${accounts.deployer.address}.controller`;

const _errors = projectErrors(project);

export const errors = {
  governanceToken: _errors.bde000GovernanceToken,
  proposalVoting: _errors.bde001ProposalVoting,
  proposalSubmission: _errors.bde002ProposalSubmission,
  coreProposals: _errors.bde003CoreProposals,
  coreExecute: _errors.bde004CoreExecute,
  treasury: _errors.bde006Treasury,
  bitcoinDao: _errors.bitcoinDao,
};

