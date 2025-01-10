import { test, expect, describe } from "vitest";
import {
  constructDao,
  coreProposals,
  deployer,
  errors,
  proposalVoting,
} from "./helpers";
import { rov, txErr, txOk } from "@clarigen/test";
import { accounts } from "./clarigen-types";

const acc = simnet.getAccounts();
const alice = acc.get("wallet_1")!;
const bob = acc.get("wallet_2")!;
const aria = acc.get("wallet_4")!;

/*
  The test below is an example. Learn more in the clarinet-sdk readme:
  https://github.com/hirosystems/clarinet/blob/develop/components/clarinet-sdk/README.md
*/

describe("bde001-proposal-voting", () => {
  test("proposal-voting - cannot vote before start height", async () => {
    constructDao();

    // pass proposal to change sunset
    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 6600),
      alice
    );
    expect(response.value).toBe(true);
    const response1 = txErr(proposalVoting.vote(1000n, true, proposal1), bob);
    expect(response1.value).toBe(errors.proposalVoting.errProposalInactive);
  });

  test("proposal-voting - can vote after start height", async () => {
    constructDao();

    // pass proposal to change sunset
    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 6600),
      alice
    );
    simnet.mineEmptyBlocks(5);
    expect(response.value).toBe(true);
    const response1 = txOk(proposalVoting.vote(1000n, true, proposal1), bob);
    expect(response1.value).toBe(true);
  });

  test("proposal-voting - cannot vote after end height", async () => {
    constructDao();

    // pass proposal to change sunset
    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 6600),
      alice
    );
    expect(response.value).toBe(true);

    simnet.mineEmptyBlocks(105);

    const response1 = txErr(proposalVoting.vote(1000n, true, proposal1), bob);
    expect(response1.value).toBe(errors.proposalVoting.errProposalInactive);
  });

  test("proposal-voting - cannot conclude before end height", async () => {
    constructDao();

    // pass proposal to change sunset
    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 6600),
      alice
    );
    expect(response.value).toBe(true);

    simnet.mineEmptyBlocks(103);

    const response1 = txErr(proposalVoting.conclude(proposal1), bob);
    expect(response1.value).toBe(
      errors.proposalVoting.errEndBurnHeightNotReached
    );
  });

  test("proposal-voting - can conclude - not passed - after end height", async () => {
    constructDao();

    // pass proposal to change sunset
    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 6600),
      alice
    );
    expect(response.value).toBe(true);

    simnet.mineEmptyBlocks(105);

    const response1 = txOk(proposalVoting.conclude(proposal1), bob);
    expect(response1.value).toBe(false);
  });

  test("proposal-voting - can conclude - not passed - after end height", async () => {
    constructDao();

    // pass proposal to change sunset
    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 6600),
      alice
    );
    expect(response.value).toBe(true);

    simnet.mineEmptyBlocks(5);

    response = txOk(proposalVoting.vote(1000n, true, proposal1), bob);

    simnet.mineEmptyBlocks(100);

    const response1 = txOk(proposalVoting.conclude(proposal1), bob);
    expect(response1.value).toBe(true);
  });

  test("proposal-voting - wins to custom majority", async () => {
    constructDao();

    // pass proposal to change sunset
    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 8000),
      alice
    );
    expect(response.value).toBe(true);

    simnet.mineEmptyBlocks(5);

    response = txOk(proposalVoting.vote(81n, true, proposal1), alice);
    response = txOk(proposalVoting.vote(19n, false, proposal1), bob);

    simnet.mineEmptyBlocks(100);

    const response1 = txOk(proposalVoting.conclude(proposal1), bob);
    expect(response1.value).toBe(true);
  });

  test("proposal-voting - looses to custom majority", async () => {
    constructDao();

    // pass proposal to change sunset
    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 8000),
      alice
    );
    expect(response.value).toBe(true);

    simnet.mineEmptyBlocks(5);

    response = txOk(proposalVoting.vote(79n, true, proposal1), alice);
    response = txOk(proposalVoting.vote(21n, false, proposal1), bob);

    simnet.mineEmptyBlocks(100);

    const response1 = txOk(proposalVoting.conclude(proposal1), bob);
    expect(response1.value).toBe(false);
  });

  test("proposal-voting - counts to tally with votes", async () => {
    constructDao();

    // pass proposal to change sunset
    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 8000),
      alice
    );
    expect(response.value).toBe(true);

    simnet.mineEmptyBlocks(5);

    response = txOk(proposalVoting.vote(100n, true, proposal1), deployer);
    response = txOk(proposalVoting.vote(79n, true, proposal1), alice);
    response = txOk(proposalVoting.vote(21n, false, proposal1), bob);
    response = txOk(proposalVoting.vote(21n, false, proposal1), aria);

    simnet.mineEmptyBlocks(100);

    const pd = await rov(proposalVoting.getProposalData(proposal1));
    expect(pd?.votesAgainst).toBe(42n);
    expect(pd?.votesFor).toBe(179n);

    const response1 = txOk(proposalVoting.conclude(proposal1), bob);
    expect(response1.value).toBe(true);
  });

  test("proposal-voting - alice cannot vote more than vote cap", async () => {
    constructDao();

    const voteCap = 140000000000n;
    const aliceB = BigInt(accounts.wallet_1.balance);
    expect(aliceB).toBeGreaterThan(voteCap);

    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 8000),
      alice
    );
    expect(response.value).toBe(true);

    simnet.mineEmptyBlocks(5);

    const rerr = txErr(proposalVoting.vote(aliceB, true, proposal1), alice);
    expect(rerr.value).toBe(errors.proposalVoting.errExceedsVotingCap);
  });

  test("proposal-voting - alice can vote with entire balance below voting cap", async () => {
    constructDao();

    const voteCap = 140000000000n;
    199859999999999n;
    const aliceB = BigInt(accounts.wallet_1.balance);
    const diff = aliceB - voteCap;
    simnet.transferSTX(
      diff,
      accounts.wallet_2.address,
      accounts.wallet_1.address
    );
    simnet.transferSTX(
      1n,
      accounts.wallet_2.address,
      accounts.wallet_1.address
    );

    const newSTXBalances = simnet.getAssetsMap().get("STX");
    expect(newSTXBalances?.get(accounts.wallet_1.address)).toBe(139999999999n);

    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 8000),
      alice
    );
    expect(response.value).toBe(true);

    simnet.mineEmptyBlocks(5);

    response = txOk(proposalVoting.vote(139999999999n, true, proposal1), alice);

    simnet.mineEmptyBlocks(100);

    const pd = await rov(proposalVoting.getProposalData(proposal1));
    expect(pd?.votesAgainst).toBe(0n);
    expect(pd?.votesFor).toBe(139999999999n);

    const response1 = txOk(proposalVoting.conclude(proposal1), bob);
    expect(response1.value).toBe(true);
  });

  test("proposal-voting - voting power determined by balance at height of proposal", async () => {
    constructDao();

    const aliceB = BigInt(accounts.wallet_1.balance);
    simnet.transferSTX(aliceB - 100n, bob, alice); // 1M stx

    let newSTXBalances = simnet.getAssetsMap().get("STX");
    expect(newSTXBalances?.get(accounts.wallet_1.address)).toBe(100n);

    const proposal1 = simnet.deployer + "." + "bdp000-core-team-sunset-height";
    let response = txOk(
      coreProposals.corePropose(proposal1, simnet.blockHeight + 5, 100, 8000),
      alice
    );
    expect(response.value).toBe(true);

    simnet.mineEmptyBlocks(5);

    simnet.transferSTX(100n, alice, bob); // 1M stx
    newSTXBalances = simnet.getAssetsMap().get("STX");
    expect(newSTXBalances?.get(accounts.wallet_1.address)).toBe(200n);

    const err = txErr(proposalVoting.vote(101, true, proposal1), alice);
    expect(err.value).toBe(errors.proposalVoting.errInsufficientVotingCapacity);

    const resp = txOk(proposalVoting.vote(100n, true, proposal1), alice);
    expect(resp.value).toBe(true);

    const pd = await rov(proposalVoting.getProposalData(proposal1));
    expect(pd?.votesAgainst).toBe(0n);
    expect(pd?.votesFor).toBe(100n);

    simnet.mineEmptyBlocks(100);
    const response1 = txOk(proposalVoting.conclude(proposal1), bob);
    expect(response1.value).toBe(true);
  });
});
