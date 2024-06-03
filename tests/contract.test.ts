import { test, expect, describe } from "vitest";
import { bitcoinDao } from "./helpers";
import { rov } from "@clarigen/test";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;

/*
  The test below is an example. Learn more in the clarinet-sdk readme:
  https://github.com/hirosystems/clarinet/blob/develop/components/clarinet-sdk/README.md
*/

describe("BitcoinDAO tests", () => {

  test("get-withdrawal-request includes status", async () => {
    const ext = await rov(bitcoinDao.isExtension(address1));
    expect(ext).toBeFalsy()
  });

});
