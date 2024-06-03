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
export const emergencyProposals = contracts.bde003EmergencyProposals;
export const emergencyExecute = contracts.bde004EmergencyExecute;
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
  emergencyProposals: _errors.bde003EmergencyProposals,
  emergencyExecute: _errors.bde004EmergencyExecute,
  treasury: _errors.bde006Treasury,
  bitcoinDao: _errors.bitcoinDao,
};

