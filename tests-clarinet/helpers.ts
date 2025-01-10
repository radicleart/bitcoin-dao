import { initSimnet } from "@hirosystems/clarinet-sdk";
import { Cl } from "@stacks/transactions";
import { expect } from "vitest";

const coreProposals = "bde003-core-proposals"; // Replace with actual contract name

export async function getSimnet() {
  const simnet = await initSimnet();
  const accounts = simnet.getAccounts();

  const deployer = accounts.get("deployer")!;
  const alice = accounts.get("wallet_1")!;
  const bob = accounts.get("wallet_2")!;

  if (!deployer || !alice || !bob) {
    throw new Error("Accounts not initialized properly");
  }

  return { simnet, deployer, alice, bob };
}

/**
 * Constructs the DAO
 */
export async function constructDao(simnet: any) {
  const proposal = simnet.deployer + "." + "bdp000-bootstrap";
  const result = await simnet.callPublicFn(
    "bitcoin-dao", // Replace with actual contract name
    "construct",
    [Cl.principal(proposal)],
    simnet.deployer
  );
  console.log("constructDao: ", Cl.prettyPrint(result.result));

  // Ensure the DAO is constructed successfully
  //expect(result.result).toEqual("(ok true)");
  return proposal;
}

export async function corePropose(
  simnet: any,
  proposalVoting: string,
  proposalName: string
) {
  const alice = simnet.getAccounts().get("wallet_1")!;
  const deployer = simnet.getAccounts().get("deployer")!;
  const proposal1 = `${deployer}.${proposalName}`;
  const result = await simnet.callPublicFn(
    coreProposals,
    "core-propose",
    [
      Cl.principal(`${deployer}.${proposalVoting}`),
      Cl.principal(proposal1),
      Cl.uint(simnet.blockHeight + 2),
      Cl.uint(100),
      Cl.uint(6600),
    ],
    alice
  );
  console.log("corePropose: ", Cl.prettyPrint(result.result));
  expect(result.result).toEqual("ok true");
}

/**
 * Pass a Proposal by Signals
 */
export async function passProposalBySignals(simnet: any, proposalName: string) {
  const accounts = simnet.getAccounts();
  const deployer = accounts.get("deployer")!;
  const alice = accounts.get("wallet_1")!;
  const bob = accounts.get("wallet_2")!;

  const proposal = `${deployer}.${proposalName}`;

  // Signal 1 by Alice
  const response2 = await simnet.callPublicFn(
    "bde004-core-execute", // Replace with actual contract name
    "executiveAction",
    [Cl.principal(proposal)],
    alice
  );
  expect(response2.result).toEqual("ok u1");

  // Signal 2 by Bob
  const response3 = await simnet.callPublicFn(
    "bde004-core-execute",
    "executiveAction",
    [Cl.principal(proposal)],
    bob
  );
  expect(response3.result).toEqual("ok u2");

  // Check if the proposal is executed
  const executedAt = await simnet.callReadOnlyFn(
    "bitcoin-dao",
    "executedAt",
    [Cl.principal(proposal)],
    deployer
  );
  expect(executedAt.result).toMatch(/^ok u\d+/); // Expect a valid block height
}

export function prepareVotes(
  voters: {
    voter: string;
    votingPower: number;
    for: boolean;
    timestamp: number;
  }[]
) {
  return Cl.list(
    voters.map((v) =>
      Cl.tuple({
        message: Cl.tuple({
          voter: Cl.principal(v.voter),
          "voting-power": Cl.uint(v.votingPower),
          for: Cl.bool(v.for),
          timestamp: Cl.uint(v.timestamp),
        }),
        signature: Cl.buffer(new Uint8Array(65).fill(0x01)), // Dummy signature, replace with real signature if available
      })
    )
  );
}
