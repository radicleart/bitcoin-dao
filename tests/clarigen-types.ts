import type {
  TypedAbiArg,
  TypedAbiFunction,
  TypedAbiMap,
  TypedAbiVariable,
  Response,
} from "@clarigen/core";

export const contracts = {
  bde000GovernanceToken: {
    functions: {
      bdgMintManyIter: {
        name: "bdg-mint-many-iter",
        access: "private",
        args: [
          {
            name: "item",
            type: {
              tuple: [
                { name: "amount", type: "uint128" },
                { name: "recipient", type: "principal" },
              ],
            },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          item: TypedAbiArg<
            {
              amount: number | bigint;
              recipient: string;
            },
            "item"
          >,
        ],
        Response<boolean, bigint>
      >,
      bdgBurn: {
        name: "bdg-burn",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "owner", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          owner: TypedAbiArg<string, "owner">,
        ],
        Response<boolean, bigint>
      >,
      bdgLock: {
        name: "bdg-lock",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "owner", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          owner: TypedAbiArg<string, "owner">,
        ],
        Response<boolean, bigint>
      >,
      bdgMint: {
        name: "bdg-mint",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      bdgMintMany: {
        name: "bdg-mint-many",
        access: "public",
        args: [
          {
            name: "recipients",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "amount", type: "uint128" },
                    { name: "recipient", type: "principal" },
                  ],
                },
                length: 200,
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                list: {
                  type: { response: { ok: "bool", error: "uint128" } },
                  length: 200,
                },
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          recipients: TypedAbiArg<
            {
              amount: number | bigint;
              recipient: string;
            }[],
            "recipients"
          >,
        ],
        Response<Response<boolean, bigint>[], bigint>
      >,
      bdgTransfer: {
        name: "bdg-transfer",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      bdgUnlock: {
        name: "bdg-unlock",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "owner", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          owner: TypedAbiArg<string, "owner">,
        ],
        Response<boolean, bigint>
      >,
      callback: {
        name: "callback",
        access: "public",
        args: [
          { name: "sender", type: "principal" },
          { name: "memo", type: { buffer: { length: 34 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          sender: TypedAbiArg<string, "sender">,
          memo: TypedAbiArg<Uint8Array, "memo">,
        ],
        Response<boolean, null>
      >,
      isDaoOrExtension: {
        name: "is-dao-or-extension",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      setDecimals: {
        name: "set-decimals",
        access: "public",
        args: [{ name: "new-decimals", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newDecimals: TypedAbiArg<number | bigint, "newDecimals">],
        Response<boolean, bigint>
      >,
      setName: {
        name: "set-name",
        access: "public",
        args: [{ name: "new-name", type: { "string-ascii": { length: 32 } } }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newName: TypedAbiArg<string, "newName">],
        Response<boolean, bigint>
      >,
      setSymbol: {
        name: "set-symbol",
        access: "public",
        args: [
          { name: "new-symbol", type: { "string-ascii": { length: 10 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newSymbol: TypedAbiArg<string, "newSymbol">],
        Response<boolean, bigint>
      >,
      setTokenUri: {
        name: "set-token-uri",
        access: "public",
        args: [
          {
            name: "new-uri",
            type: { optional: { "string-utf8": { length: 256 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newUri: TypedAbiArg<string | null, "newUri">],
        Response<boolean, bigint>
      >,
      transfer: {
        name: "transfer",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
          { name: "recipient", type: "principal" },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<string, "recipient">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
        ],
        Response<boolean, bigint>
      >,
      bdgGetBalance: {
        name: "bdg-get-balance",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [who: TypedAbiArg<string, "who">],
        Response<bigint, null>
      >,
      bdgGetLocked: {
        name: "bdg-get-locked",
        access: "read_only",
        args: [{ name: "owner", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [owner: TypedAbiArg<string, "owner">],
        Response<bigint, null>
      >,
      bdgHasPercentageBalance: {
        name: "bdg-has-percentage-balance",
        access: "read_only",
        args: [
          { name: "who", type: "principal" },
          { name: "factor", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          who: TypedAbiArg<string, "who">,
          factor: TypedAbiArg<number | bigint, "factor">,
        ],
        Response<boolean, null>
      >,
      getBalance: {
        name: "get-balance",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [who: TypedAbiArg<string, "who">],
        Response<bigint, null>
      >,
      getDecimals: {
        name: "get-decimals",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getName: {
        name: "get-name",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 32 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getSymbol: {
        name: "get-symbol",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 10 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getTokenUri: {
        name: "get-token-uri",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: {
              ok: { optional: { "string-utf8": { length: 256 } } },
              error: "none",
            },
          },
        },
      } as TypedAbiFunction<[], Response<string | null, null>>,
      getTotalSupply: {
        name: "get-total-supply",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
    },
    maps: {},
    variables: {
      errNotTokenOwner: {
        name: "err-not-token-owner",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errUnauthorised: {
        name: "err-unauthorised",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      tokenDecimals: {
        name: "token-decimals",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      tokenName: {
        name: "token-name",
        type: {
          "string-ascii": {
            length: 32,
          },
        },
        access: "variable",
      } as TypedAbiVariable<string>,
      tokenSymbol: {
        name: "token-symbol",
        type: {
          "string-ascii": {
            length: 10,
          },
        },
        access: "variable",
      } as TypedAbiVariable<string>,
      tokenUri: {
        name: "token-uri",
        type: {
          optional: {
            "string-utf8": {
              length: 256,
            },
          },
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      errNotTokenOwner: {
        isOk: false,
        value: 4n,
      },
      errUnauthorised: {
        isOk: false,
        value: 3_000n,
      },
      tokenDecimals: 6n,
      tokenName: "Bitcoin DAO Governance Token",
      tokenSymbol: "BDG",
      tokenUri: null,
    },
    non_fungible_tokens: [],
    fungible_tokens: [{ name: "bdg-token" }, { name: "bdg-token-locked" }],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bde000-governance-token",
  },
  bde001ProposalVoting: {
    functions: {
      isGovernanceToken: {
        name: "is-governance-token",
        access: "private",
        args: [{ name: "governance-token", type: "trait_reference" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [governanceToken: TypedAbiArg<string, "governanceToken">],
        Response<boolean, bigint>
      >,
      addProposal: {
        name: "add-proposal",
        access: "public",
        args: [
          { name: "proposal", type: "trait_reference" },
          {
            name: "data",
            type: {
              tuple: [
                { name: "end-block-height", type: "uint128" },
                { name: "proposer", type: "principal" },
                { name: "start-block-height", type: "uint128" },
              ],
            },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          proposal: TypedAbiArg<string, "proposal">,
          data: TypedAbiArg<
            {
              endBlockHeight: number | bigint;
              proposer: string;
              startBlockHeight: number | bigint;
            },
            "data"
          >,
        ],
        Response<boolean, bigint>
      >,
      callback: {
        name: "callback",
        access: "public",
        args: [
          { name: "sender", type: "principal" },
          { name: "memo", type: { buffer: { length: 34 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          sender: TypedAbiArg<string, "sender">,
          memo: TypedAbiArg<Uint8Array, "memo">,
        ],
        Response<boolean, null>
      >,
      conclude: {
        name: "conclude",
        access: "public",
        args: [{ name: "proposal", type: "trait_reference" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [proposal: TypedAbiArg<string, "proposal">],
        Response<boolean, bigint>
      >,
      isDaoOrExtension: {
        name: "is-dao-or-extension",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      reclaimAndVote: {
        name: "reclaim-and-vote",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "for", type: "bool" },
          { name: "proposal", type: "principal" },
          { name: "reclaim-from", type: "trait_reference" },
          { name: "governance-token", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          _for: TypedAbiArg<boolean, "_for">,
          proposal: TypedAbiArg<string, "proposal">,
          reclaimFrom: TypedAbiArg<string, "reclaimFrom">,
          governanceToken: TypedAbiArg<string, "governanceToken">,
        ],
        Response<boolean, bigint>
      >,
      reclaimVotes: {
        name: "reclaim-votes",
        access: "public",
        args: [
          { name: "proposal", type: "trait_reference" },
          { name: "governance-token", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          proposal: TypedAbiArg<string, "proposal">,
          governanceToken: TypedAbiArg<string, "governanceToken">,
        ],
        Response<boolean, bigint>
      >,
      setGovernanceToken: {
        name: "set-governance-token",
        access: "public",
        args: [{ name: "governance-token", type: "trait_reference" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [governanceToken: TypedAbiArg<string, "governanceToken">],
        Response<boolean, bigint>
      >,
      vote: {
        name: "vote",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "for", type: "bool" },
          { name: "proposal", type: "principal" },
          { name: "governance-token", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          _for: TypedAbiArg<boolean, "_for">,
          proposal: TypedAbiArg<string, "proposal">,
          governanceToken: TypedAbiArg<string, "governanceToken">,
        ],
        Response<boolean, bigint>
      >,
      getCurrentTotalVotes: {
        name: "get-current-total-votes",
        access: "read_only",
        args: [
          { name: "proposal", type: "principal" },
          { name: "voter", type: "principal" },
          { name: "governance-token", type: "principal" },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          proposal: TypedAbiArg<string, "proposal">,
          voter: TypedAbiArg<string, "voter">,
          governanceToken: TypedAbiArg<string, "governanceToken">,
        ],
        bigint
      >,
      getGovernanceToken: {
        name: "get-governance-token",
        access: "read_only",
        args: [],
        outputs: { type: "principal" },
      } as TypedAbiFunction<[], string>,
      getProposalData: {
        name: "get-proposal-data",
        access: "read_only",
        args: [{ name: "proposal", type: "principal" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "concluded", type: "bool" },
                { name: "end-block-height", type: "uint128" },
                { name: "passed", type: "bool" },
                { name: "proposer", type: "principal" },
                { name: "start-block-height", type: "uint128" },
                { name: "votes-against", type: "uint128" },
                { name: "votes-for", type: "uint128" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [proposal: TypedAbiArg<string, "proposal">],
        {
          concluded: boolean;
          endBlockHeight: bigint;
          passed: boolean;
          proposer: string;
          startBlockHeight: bigint;
          votesAgainst: bigint;
          votesFor: bigint;
        } | null
      >,
    },
    maps: {
      memberTotalVotes: {
        name: "member-total-votes",
        key: {
          tuple: [
            { name: "governance-token", type: "principal" },
            { name: "proposal", type: "principal" },
            { name: "voter", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          governanceToken: string;
          proposal: string;
          voter: string;
        },
        bigint
      >,
      proposals: {
        name: "proposals",
        key: "principal",
        value: {
          tuple: [
            { name: "concluded", type: "bool" },
            { name: "end-block-height", type: "uint128" },
            { name: "passed", type: "bool" },
            { name: "proposer", type: "principal" },
            { name: "start-block-height", type: "uint128" },
            { name: "votes-against", type: "uint128" },
            { name: "votes-for", type: "uint128" },
          ],
        },
      } as TypedAbiMap<
        string,
        {
          concluded: boolean;
          endBlockHeight: bigint;
          passed: boolean;
          proposer: string;
          startBlockHeight: bigint;
          votesAgainst: bigint;
          votesFor: bigint;
        }
      >,
    },
    variables: {
      errDisabled: {
        name: "err-disabled",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errEndBlockHeightNotReached: {
        name: "err-end-block-height-not-reached",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errNoVotesToReturn: {
        name: "err-no-votes-to-return",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errNotGovernanceToken: {
        name: "err-not-governance-token",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errProposalAlreadyConcluded: {
        name: "err-proposal-already-concluded",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errProposalAlreadyExecuted: {
        name: "err-proposal-already-executed",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errProposalAlreadyExists: {
        name: "err-proposal-already-exists",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errProposalInactive: {
        name: "err-proposal-inactive",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errProposalNotConcluded: {
        name: "err-proposal-not-concluded",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errUnauthorised: {
        name: "err-unauthorised",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errUnknownProposal: {
        name: "err-unknown-proposal",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      governanceTokenPrincipal: {
        name: "governance-token-principal",
        type: "principal",
        access: "variable",
      } as TypedAbiVariable<string>,
    },
    constants: {
      errDisabled: {
        isOk: false,
        value: 3_110n,
      },
      errEndBlockHeightNotReached: {
        isOk: false,
        value: 3_109n,
      },
      errNoVotesToReturn: {
        isOk: false,
        value: 3_108n,
      },
      errNotGovernanceToken: {
        isOk: false,
        value: 3_101n,
      },
      errProposalAlreadyConcluded: {
        isOk: false,
        value: 3_105n,
      },
      errProposalAlreadyExecuted: {
        isOk: false,
        value: 3_102n,
      },
      errProposalAlreadyExists: {
        isOk: false,
        value: 3_103n,
      },
      errProposalInactive: {
        isOk: false,
        value: 3_106n,
      },
      errProposalNotConcluded: {
        isOk: false,
        value: 3_107n,
      },
      errUnauthorised: {
        isOk: false,
        value: 3_100n,
      },
      errUnknownProposal: {
        isOk: false,
        value: 3_104n,
      },
      governanceTokenPrincipal:
        "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde000-governance-token",
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bde001-proposal-voting",
  },
  bde002ProposalSubmission: {
    functions: {
      isGovernanceToken: {
        name: "is-governance-token",
        access: "private",
        args: [{ name: "governance-token", type: "trait_reference" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [governanceToken: TypedAbiArg<string, "governanceToken">],
        Response<boolean, bigint>
      >,
      setParametersIter: {
        name: "set-parameters-iter",
        access: "private",
        args: [
          {
            name: "item",
            type: {
              tuple: [
                { name: "parameter", type: { "string-ascii": { length: 34 } } },
                { name: "value", type: "uint128" },
              ],
            },
          },
          {
            name: "previous",
            type: { response: { ok: "bool", error: "uint128" } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          item: TypedAbiArg<
            {
              parameter: string;
              value: number | bigint;
            },
            "item"
          >,
          previous: TypedAbiArg<Response<boolean, number | bigint>, "previous">,
        ],
        Response<boolean, bigint>
      >,
      callback: {
        name: "callback",
        access: "public",
        args: [
          { name: "sender", type: "principal" },
          { name: "memo", type: { buffer: { length: 34 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          sender: TypedAbiArg<string, "sender">,
          memo: TypedAbiArg<Uint8Array, "memo">,
        ],
        Response<boolean, null>
      >,
      isDaoOrExtension: {
        name: "is-dao-or-extension",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      propose: {
        name: "propose",
        access: "public",
        args: [
          { name: "proposal", type: "trait_reference" },
          { name: "start-block-height", type: "uint128" },
          { name: "governance-token", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          proposal: TypedAbiArg<string, "proposal">,
          startBlockHeight: TypedAbiArg<number | bigint, "startBlockHeight">,
          governanceToken: TypedAbiArg<string, "governanceToken">,
        ],
        Response<boolean, bigint>
      >,
      setGovernanceToken: {
        name: "set-governance-token",
        access: "public",
        args: [{ name: "governance-token", type: "trait_reference" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [governanceToken: TypedAbiArg<string, "governanceToken">],
        Response<boolean, bigint>
      >,
      setParameter: {
        name: "set-parameter",
        access: "public",
        args: [
          { name: "parameter", type: { "string-ascii": { length: 34 } } },
          { name: "value", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          parameter: TypedAbiArg<string, "parameter">,
          value: TypedAbiArg<number | bigint, "value">,
        ],
        Response<boolean, bigint>
      >,
      setParameters: {
        name: "set-parameters",
        access: "public",
        args: [
          {
            name: "parameter-list",
            type: {
              list: {
                type: {
                  tuple: [
                    {
                      name: "parameter",
                      type: { "string-ascii": { length: 34 } },
                    },
                    { name: "value", type: "uint128" },
                  ],
                },
                length: 200,
              },
            },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          parameterList: TypedAbiArg<
            {
              parameter: string;
              value: number | bigint;
            }[],
            "parameterList"
          >,
        ],
        Response<boolean, bigint>
      >,
      getGovernanceToken: {
        name: "get-governance-token",
        access: "read_only",
        args: [],
        outputs: { type: "principal" },
      } as TypedAbiFunction<[], string>,
      getParameter: {
        name: "get-parameter",
        access: "read_only",
        args: [{ name: "parameter", type: { "string-ascii": { length: 34 } } }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [parameter: TypedAbiArg<string, "parameter">],
        Response<bigint, bigint>
      >,
    },
    maps: {
      parameters: {
        name: "parameters",
        key: { "string-ascii": { length: 34 } },
        value: "uint128",
      } as TypedAbiMap<string, bigint>,
    },
    variables: {
      errInsufficientBalance: {
        name: "err-insufficient-balance",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errNotGovernanceToken: {
        name: "err-not-governance-token",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errProposalMaximumStartDelay: {
        name: "err-proposal-maximum-start-delay",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errProposalMinimumStartDelay: {
        name: "err-proposal-minimum-start-delay",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errUnauthorised: {
        name: "err-unauthorised",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errUnknownParameter: {
        name: "err-unknown-parameter",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      governanceTokenPrincipal: {
        name: "governance-token-principal",
        type: "principal",
        access: "variable",
      } as TypedAbiVariable<string>,
    },
    constants: {
      errInsufficientBalance: {
        isOk: false,
        value: 3_102n,
      },
      errNotGovernanceToken: {
        isOk: false,
        value: 3_101n,
      },
      errProposalMaximumStartDelay: {
        isOk: false,
        value: 3_105n,
      },
      errProposalMinimumStartDelay: {
        isOk: false,
        value: 3_104n,
      },
      errUnauthorised: {
        isOk: false,
        value: 3_100n,
      },
      errUnknownParameter: {
        isOk: false,
        value: 3_103n,
      },
      governanceTokenPrincipal:
        "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde000-governance-token",
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bde002-proposal-submission",
  },
  bde003CoreProposals: {
    functions: {
      callback: {
        name: "callback",
        access: "public",
        args: [
          { name: "sender", type: "principal" },
          { name: "memo", type: { buffer: { length: 34 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          sender: TypedAbiArg<string, "sender">,
          memo: TypedAbiArg<Uint8Array, "memo">,
        ],
        Response<boolean, null>
      >,
      corePropose: {
        name: "core-propose",
        access: "public",
        args: [{ name: "proposal", type: "trait_reference" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [proposal: TypedAbiArg<string, "proposal">],
        Response<boolean, bigint>
      >,
      isDaoOrExtension: {
        name: "is-dao-or-extension",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      setCoreProposalDuration: {
        name: "set-core-proposal-duration",
        access: "public",
        args: [{ name: "duration", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [duration: TypedAbiArg<number | bigint, "duration">],
        Response<boolean, bigint>
      >,
      setCoreTeamMember: {
        name: "set-core-team-member",
        access: "public",
        args: [
          { name: "who", type: "principal" },
          { name: "member", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          who: TypedAbiArg<string, "who">,
          member: TypedAbiArg<boolean, "member">,
        ],
        Response<boolean, bigint>
      >,
      setCoreTeamSunsetHeight: {
        name: "set-core-team-sunset-height",
        access: "public",
        args: [{ name: "height", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [height: TypedAbiArg<number | bigint, "height">],
        Response<boolean, bigint>
      >,
      isCoreTeamMember: {
        name: "is-core-team-member",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {
      coreTeam: {
        name: "core-team",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
    },
    variables: {
      errNotCoreTeamMember: {
        name: "err-not-core-team-member",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errSunsetHeightInPast: {
        name: "err-sunset-height-in-past",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errSunsetHeightReached: {
        name: "err-sunset-height-reached",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errUnauthorised: {
        name: "err-unauthorised",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      coreProposalDuration: {
        name: "core-proposal-duration",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      coreTeamSunsetHeight: {
        name: "core-team-sunset-height",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      coreProposalDuration: 144n,
      coreTeamSunsetHeight: 0n,
      errNotCoreTeamMember: {
        isOk: false,
        value: 3_301n,
      },
      errSunsetHeightInPast: {
        isOk: false,
        value: 3_303n,
      },
      errSunsetHeightReached: {
        isOk: false,
        value: 3_302n,
      },
      errUnauthorised: {
        isOk: false,
        value: 3_300n,
      },
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bde003-core-proposals",
  },
  bde004CoreExecute: {
    functions: {
      callback: {
        name: "callback",
        access: "public",
        args: [
          { name: "sender", type: "principal" },
          { name: "memo", type: { buffer: { length: 34 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          sender: TypedAbiArg<string, "sender">,
          memo: TypedAbiArg<Uint8Array, "memo">,
        ],
        Response<boolean, null>
      >,
      executiveAction: {
        name: "executive-action",
        access: "public",
        args: [{ name: "proposal", type: "trait_reference" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [proposal: TypedAbiArg<string, "proposal">],
        Response<bigint, bigint>
      >,
      isDaoOrExtension: {
        name: "is-dao-or-extension",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      setExecutiveTeamMember: {
        name: "set-executive-team-member",
        access: "public",
        args: [
          { name: "who", type: "principal" },
          { name: "member", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          who: TypedAbiArg<string, "who">,
          member: TypedAbiArg<boolean, "member">,
        ],
        Response<boolean, bigint>
      >,
      setExecutiveTeamSunsetHeight: {
        name: "set-executive-team-sunset-height",
        access: "public",
        args: [{ name: "height", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [height: TypedAbiArg<number | bigint, "height">],
        Response<boolean, bigint>
      >,
      setSignalsRequired: {
        name: "set-signals-required",
        access: "public",
        args: [{ name: "new-requirement", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newRequirement: TypedAbiArg<number | bigint, "newRequirement">],
        Response<boolean, bigint>
      >,
      getSignals: {
        name: "get-signals",
        access: "read_only",
        args: [{ name: "proposal", type: "principal" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [proposal: TypedAbiArg<string, "proposal">],
        bigint
      >,
      getSignalsRequired: {
        name: "get-signals-required",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      hasSignalled: {
        name: "has-signalled",
        access: "read_only",
        args: [
          { name: "proposal", type: "principal" },
          { name: "who", type: "principal" },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [
          proposal: TypedAbiArg<string, "proposal">,
          who: TypedAbiArg<string, "who">,
        ],
        boolean
      >,
      isExecutiveTeamMember: {
        name: "is-executive-team-member",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {
      executiveActionSignalCount: {
        name: "executive-action-signal-count",
        key: "principal",
        value: "uint128",
      } as TypedAbiMap<string, bigint>,
      executiveActionSignals: {
        name: "executive-action-signals",
        key: {
          tuple: [
            { name: "proposal", type: "principal" },
            { name: "team-member", type: "principal" },
          ],
        },
        value: "bool",
      } as TypedAbiMap<
        {
          proposal: string;
          teamMember: string;
        },
        boolean
      >,
      executiveTeam: {
        name: "executive-team",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
    },
    variables: {
      errAlreadyExecuted: {
        name: "err-already-executed",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errNotExecutiveTeamMember: {
        name: "err-not-executive-team-member",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errSunsetHeightInPast: {
        name: "err-sunset-height-in-past",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errSunsetHeightReached: {
        name: "err-sunset-height-reached",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errUnauthorised: {
        name: "err-unauthorised",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      executiveSignalsRequired: {
        name: "executive-signals-required",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      executiveTeamSunsetHeight: {
        name: "executive-team-sunset-height",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      errAlreadyExecuted: {
        isOk: false,
        value: 3_402n,
      },
      errNotExecutiveTeamMember: {
        isOk: false,
        value: 3_401n,
      },
      errSunsetHeightInPast: {
        isOk: false,
        value: 3_404n,
      },
      errSunsetHeightReached: {
        isOk: false,
        value: 3_403n,
      },
      errUnauthorised: {
        isOk: false,
        value: 3_400n,
      },
      executiveSignalsRequired: 1n,
      executiveTeamSunsetHeight: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bde004-core-execute",
  },
  bde006Treasury: {
    functions: {
      sip009TransferManyIter: {
        name: "sip009-transfer-many-iter",
        access: "private",
        args: [
          {
            name: "data",
            type: {
              tuple: [
                { name: "recipient", type: "principal" },
                { name: "token-id", type: "uint128" },
              ],
            },
          },
          { name: "asset", type: "trait_reference" },
        ],
        outputs: { type: "trait_reference" },
      } as TypedAbiFunction<
        [
          data: TypedAbiArg<
            {
              recipient: string;
              tokenId: number | bigint;
            },
            "data"
          >,
          asset: TypedAbiArg<string, "asset">,
        ],
        string
      >,
      sip010TransferManyIter: {
        name: "sip010-transfer-many-iter",
        access: "private",
        args: [
          {
            name: "data",
            type: {
              tuple: [
                { name: "amount", type: "uint128" },
                {
                  name: "memo",
                  type: { optional: { buffer: { length: 34 } } },
                },
                { name: "recipient", type: "principal" },
              ],
            },
          },
          { name: "asset", type: "trait_reference" },
        ],
        outputs: { type: "trait_reference" },
      } as TypedAbiFunction<
        [
          data: TypedAbiArg<
            {
              amount: number | bigint;
              memo: Uint8Array | null;
              recipient: string;
            },
            "data"
          >,
          asset: TypedAbiArg<string, "asset">,
        ],
        string
      >,
      stxTransferManyIter: {
        name: "stx-transfer-many-iter",
        access: "private",
        args: [
          {
            name: "data",
            type: {
              tuple: [
                { name: "amount", type: "uint128" },
                {
                  name: "memo",
                  type: { optional: { buffer: { length: 34 } } },
                },
                { name: "recipient", type: "principal" },
              ],
            },
          },
          {
            name: "previous-result",
            type: { response: { ok: "bool", error: "uint128" } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          data: TypedAbiArg<
            {
              amount: number | bigint;
              memo: Uint8Array | null;
              recipient: string;
            },
            "data"
          >,
          previousResult: TypedAbiArg<
            Response<boolean, number | bigint>,
            "previousResult"
          >,
        ],
        Response<boolean, bigint>
      >,
      callback: {
        name: "callback",
        access: "public",
        args: [
          { name: "sender", type: "principal" },
          { name: "memo", type: { buffer: { length: 34 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          sender: TypedAbiArg<string, "sender">,
          memo: TypedAbiArg<Uint8Array, "memo">,
        ],
        Response<boolean, null>
      >,
      isDaoOrExtension: {
        name: "is-dao-or-extension",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      sip009Transfer: {
        name: "sip009-transfer",
        access: "public",
        args: [
          { name: "token-id", type: "uint128" },
          { name: "recipient", type: "principal" },
          { name: "asset", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          tokenId: TypedAbiArg<number | bigint, "tokenId">,
          recipient: TypedAbiArg<string, "recipient">,
          asset: TypedAbiArg<string, "asset">,
        ],
        Response<boolean, bigint>
      >,
      sip009TransferMany: {
        name: "sip009-transfer-many",
        access: "public",
        args: [
          {
            name: "data",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "recipient", type: "principal" },
                    { name: "token-id", type: "uint128" },
                  ],
                },
                length: 200,
              },
            },
          },
          { name: "asset", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          data: TypedAbiArg<
            {
              recipient: string;
              tokenId: number | bigint;
            }[],
            "data"
          >,
          asset: TypedAbiArg<string, "asset">,
        ],
        Response<boolean, null>
      >,
      sip010Transfer: {
        name: "sip010-transfer",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
          { name: "asset", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
          asset: TypedAbiArg<string, "asset">,
        ],
        Response<boolean, bigint>
      >,
      sip010TransferMany: {
        name: "sip010-transfer-many",
        access: "public",
        args: [
          {
            name: "data",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "amount", type: "uint128" },
                    {
                      name: "memo",
                      type: { optional: { buffer: { length: 34 } } },
                    },
                    { name: "recipient", type: "principal" },
                  ],
                },
                length: 200,
              },
            },
          },
          { name: "asset", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          data: TypedAbiArg<
            {
              amount: number | bigint;
              memo: Uint8Array | null;
              recipient: string;
            }[],
            "data"
          >,
          asset: TypedAbiArg<string, "asset">,
        ],
        Response<boolean, null>
      >,
      sip013Transfer: {
        name: "sip013-transfer",
        access: "public",
        args: [
          { name: "token-id", type: "uint128" },
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
          { name: "asset", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          tokenId: TypedAbiArg<number | bigint, "tokenId">,
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
          asset: TypedAbiArg<string, "asset">,
        ],
        Response<boolean, bigint>
      >,
      sip013TransferMany: {
        name: "sip013-transfer-many",
        access: "public",
        args: [
          {
            name: "transfers",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "amount", type: "uint128" },
                    { name: "recipient", type: "principal" },
                    { name: "sender", type: "principal" },
                    { name: "token-id", type: "uint128" },
                  ],
                },
                length: 200,
              },
            },
          },
          { name: "asset", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          transfers: TypedAbiArg<
            {
              amount: number | bigint;
              recipient: string;
              sender: string;
              tokenId: number | bigint;
            }[],
            "transfers"
          >,
          asset: TypedAbiArg<string, "asset">,
        ],
        Response<boolean, bigint>
      >,
      sip013TransferManyMemo: {
        name: "sip013-transfer-many-memo",
        access: "public",
        args: [
          {
            name: "transfers",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "amount", type: "uint128" },
                    { name: "memo", type: { buffer: { length: 34 } } },
                    { name: "recipient", type: "principal" },
                    { name: "sender", type: "principal" },
                    { name: "token-id", type: "uint128" },
                  ],
                },
                length: 200,
              },
            },
          },
          { name: "asset", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          transfers: TypedAbiArg<
            {
              amount: number | bigint;
              memo: Uint8Array;
              recipient: string;
              sender: string;
              tokenId: number | bigint;
            }[],
            "transfers"
          >,
          asset: TypedAbiArg<string, "asset">,
        ],
        Response<boolean, bigint>
      >,
      stxTransfer: {
        name: "stx-transfer",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
        ],
        Response<boolean, bigint>
      >,
      stxTransferMany: {
        name: "stx-transfer-many",
        access: "public",
        args: [
          {
            name: "transfers",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "amount", type: "uint128" },
                    {
                      name: "memo",
                      type: { optional: { buffer: { length: 34 } } },
                    },
                    { name: "recipient", type: "principal" },
                  ],
                },
                length: 200,
              },
            },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          transfers: TypedAbiArg<
            {
              amount: number | bigint;
              memo: Uint8Array | null;
              recipient: string;
            }[],
            "transfers"
          >,
        ],
        Response<boolean, bigint>
      >,
    },
    maps: {},
    variables: {
      errUnauthorised: {
        name: "err-unauthorised",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
    },
    constants: {
      errUnauthorised: {
        isOk: false,
        value: 3_000n,
      },
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bde006-treasury",
  },
  bde020ResourceManager: {
    functions: {
      getOrCreateUser: {
        name: "get-or-create-user",
        access: "private",
        args: [{ name: "address", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [address: TypedAbiArg<string, "address">],
        Response<bigint, bigint>
      >,
      addResource: {
        name: "add-resource",
        access: "public",
        args: [
          { name: "name", type: { "string-utf8": { length: 50 } } },
          { name: "description", type: { "string-utf8": { length: 255 } } },
          { name: "price", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          name: TypedAbiArg<string, "name">,
          description: TypedAbiArg<string, "description">,
          price: TypedAbiArg<number | bigint, "price">,
        ],
        Response<bigint, bigint>
      >,
      callback: {
        name: "callback",
        access: "public",
        args: [
          { name: "sender", type: "principal" },
          { name: "memo", type: { buffer: { length: 34 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          sender: TypedAbiArg<string, "sender">,
          memo: TypedAbiArg<Uint8Array, "memo">,
        ],
        Response<boolean, null>
      >,
      isDaoOrExtension: {
        name: "is-dao-or-extension",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      payInvoice: {
        name: "pay-invoice",
        access: "public",
        args: [
          { name: "resourceIndex", type: "uint128" },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          resourceIndex: TypedAbiArg<number | bigint, "resourceIndex">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
        ],
        Response<bigint, bigint>
      >,
      payInvoiceByResourceName: {
        name: "pay-invoice-by-resource-name",
        access: "public",
        args: [
          { name: "name", type: { "string-utf8": { length: 50 } } },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          name: TypedAbiArg<string, "name">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
        ],
        Response<bigint, bigint>
      >,
      toggleResource: {
        name: "toggle-resource",
        access: "public",
        args: [{ name: "index", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [index: TypedAbiArg<number | bigint, "index">],
        Response<boolean, bigint>
      >,
      toggleResourceByName: {
        name: "toggle-resource-by-name",
        access: "public",
        args: [{ name: "name", type: { "string-utf8": { length: 50 } } }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [name: TypedAbiArg<string, "name">],
        Response<boolean, bigint>
      >,
      getInvoice: {
        name: "get-invoice",
        access: "read_only",
        args: [{ name: "index", type: "uint128" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "amount", type: "uint128" },
                { name: "createdAt", type: "uint128" },
                { name: "resourceIndex", type: "uint128" },
                {
                  name: "resourceName",
                  type: { "string-utf8": { length: 50 } },
                },
                { name: "userIndex", type: "uint128" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [index: TypedAbiArg<number | bigint, "index">],
        {
          amount: bigint;
          createdAt: bigint;
          resourceIndex: bigint;
          resourceName: string;
          userIndex: bigint;
        } | null
      >,
      getRecentPayment: {
        name: "get-recent-payment",
        access: "read_only",
        args: [
          { name: "resourceIndex", type: "uint128" },
          { name: "userIndex", type: "uint128" },
        ],
        outputs: { type: { optional: "uint128" } },
      } as TypedAbiFunction<
        [
          resourceIndex: TypedAbiArg<number | bigint, "resourceIndex">,
          userIndex: TypedAbiArg<number | bigint, "userIndex">,
        ],
        bigint | null
      >,
      getRecentPaymentData: {
        name: "get-recent-payment-data",
        access: "read_only",
        args: [
          { name: "resourceIndex", type: "uint128" },
          { name: "userIndex", type: "uint128" },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "amount", type: "uint128" },
                { name: "createdAt", type: "uint128" },
                { name: "resourceIndex", type: "uint128" },
                {
                  name: "resourceName",
                  type: { "string-utf8": { length: 50 } },
                },
                { name: "userIndex", type: "uint128" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          resourceIndex: TypedAbiArg<number | bigint, "resourceIndex">,
          userIndex: TypedAbiArg<number | bigint, "userIndex">,
        ],
        {
          amount: bigint;
          createdAt: bigint;
          resourceIndex: bigint;
          resourceName: string;
          userIndex: bigint;
        } | null
      >,
      getRecentPaymentDataByAddress: {
        name: "get-recent-payment-data-by-address",
        access: "read_only",
        args: [
          { name: "name", type: { "string-utf8": { length: 50 } } },
          { name: "user", type: "principal" },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "amount", type: "uint128" },
                { name: "createdAt", type: "uint128" },
                { name: "resourceIndex", type: "uint128" },
                {
                  name: "resourceName",
                  type: { "string-utf8": { length: 50 } },
                },
                { name: "userIndex", type: "uint128" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [name: TypedAbiArg<string, "name">, user: TypedAbiArg<string, "user">],
        {
          amount: bigint;
          createdAt: bigint;
          resourceIndex: bigint;
          resourceName: string;
          userIndex: bigint;
        } | null
      >,
      getResource: {
        name: "get-resource",
        access: "read_only",
        args: [{ name: "index", type: "uint128" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "createdAt", type: "uint128" },
                {
                  name: "description",
                  type: { "string-utf8": { length: 255 } },
                },
                { name: "enabled", type: "bool" },
                { name: "name", type: { "string-utf8": { length: 50 } } },
                { name: "price", type: "uint128" },
                { name: "totalSpent", type: "uint128" },
                { name: "totalUsed", type: "uint128" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [index: TypedAbiArg<number | bigint, "index">],
        {
          createdAt: bigint;
          description: string;
          enabled: boolean;
          name: string;
          price: bigint;
          totalSpent: bigint;
          totalUsed: bigint;
        } | null
      >,
      getResourceByName: {
        name: "get-resource-by-name",
        access: "read_only",
        args: [{ name: "name", type: { "string-utf8": { length: 50 } } }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "createdAt", type: "uint128" },
                {
                  name: "description",
                  type: { "string-utf8": { length: 255 } },
                },
                { name: "enabled", type: "bool" },
                { name: "name", type: { "string-utf8": { length: 50 } } },
                { name: "price", type: "uint128" },
                { name: "totalSpent", type: "uint128" },
                { name: "totalUsed", type: "uint128" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [name: TypedAbiArg<string, "name">],
        {
          createdAt: bigint;
          description: string;
          enabled: boolean;
          name: string;
          price: bigint;
          totalSpent: bigint;
          totalUsed: bigint;
        } | null
      >,
      getResourceIndex: {
        name: "get-resource-index",
        access: "read_only",
        args: [{ name: "name", type: { "string-utf8": { length: 50 } } }],
        outputs: { type: { optional: "uint128" } },
      } as TypedAbiFunction<[name: TypedAbiArg<string, "name">], bigint | null>,
      getTotalInvoices: {
        name: "get-total-invoices",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getTotalResources: {
        name: "get-total-resources",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getTotalRevenue: {
        name: "get-total-revenue",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getTotalUsers: {
        name: "get-total-users",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getUserData: {
        name: "get-user-data",
        access: "read_only",
        args: [{ name: "index", type: "uint128" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "address", type: "principal" },
                { name: "totalSpent", type: "uint128" },
                { name: "totalUsed", type: "uint128" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [index: TypedAbiArg<number | bigint, "index">],
        {
          address: string;
          totalSpent: bigint;
          totalUsed: bigint;
        } | null
      >,
      getUserDataByAddress: {
        name: "get-user-data-by-address",
        access: "read_only",
        args: [{ name: "user", type: "principal" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "address", type: "principal" },
                { name: "totalSpent", type: "uint128" },
                { name: "totalUsed", type: "uint128" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [user: TypedAbiArg<string, "user">],
        {
          address: string;
          totalSpent: bigint;
          totalUsed: bigint;
        } | null
      >,
      getUserIndex: {
        name: "get-user-index",
        access: "read_only",
        args: [{ name: "user", type: "principal" }],
        outputs: { type: { optional: "uint128" } },
      } as TypedAbiFunction<[user: TypedAbiArg<string, "user">], bigint | null>,
    },
    maps: {
      invoiceData: {
        name: "InvoiceData",
        key: "uint128",
        value: {
          tuple: [
            { name: "amount", type: "uint128" },
            { name: "createdAt", type: "uint128" },
            { name: "resourceIndex", type: "uint128" },
            { name: "resourceName", type: { "string-utf8": { length: 50 } } },
            { name: "userIndex", type: "uint128" },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          amount: bigint;
          createdAt: bigint;
          resourceIndex: bigint;
          resourceName: string;
          userIndex: bigint;
        }
      >,
      recentPayments: {
        name: "RecentPayments",
        key: {
          tuple: [
            { name: "resourceIndex", type: "uint128" },
            { name: "userIndex", type: "uint128" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          resourceIndex: number | bigint;
          userIndex: number | bigint;
        },
        bigint
      >,
      resourceData: {
        name: "ResourceData",
        key: "uint128",
        value: {
          tuple: [
            { name: "createdAt", type: "uint128" },
            { name: "description", type: { "string-utf8": { length: 255 } } },
            { name: "enabled", type: "bool" },
            { name: "name", type: { "string-utf8": { length: 50 } } },
            { name: "price", type: "uint128" },
            { name: "totalSpent", type: "uint128" },
            { name: "totalUsed", type: "uint128" },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          createdAt: bigint;
          description: string;
          enabled: boolean;
          name: string;
          price: bigint;
          totalSpent: bigint;
          totalUsed: bigint;
        }
      >,
      resourceIndexes: {
        name: "ResourceIndexes",
        key: { "string-utf8": { length: 50 } },
        value: "uint128",
      } as TypedAbiMap<string, bigint>,
      userData: {
        name: "UserData",
        key: "uint128",
        value: {
          tuple: [
            { name: "address", type: "principal" },
            { name: "totalSpent", type: "uint128" },
            { name: "totalUsed", type: "uint128" },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          address: string;
          totalSpent: bigint;
          totalUsed: bigint;
        }
      >,
      userIndexes: {
        name: "UserIndexes",
        key: "principal",
        value: "uint128",
      } as TypedAbiMap<string, bigint>,
    },
    variables: {
      DEPLOYER: {
        name: "DEPLOYER",
        type: "principal",
        access: "constant",
      } as TypedAbiVariable<string>,
      ERR_DELETING_RESOURCE_DATA: {
        name: "ERR_DELETING_RESOURCE_DATA",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_PARAMS: {
        name: "ERR_INVALID_PARAMS",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVOICE_ALREADY_PAID: {
        name: "ERR_INVOICE_ALREADY_PAID",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVOICE_NOT_FOUND: {
        name: "ERR_INVOICE_NOT_FOUND",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NAME_ALREADY_USED: {
        name: "ERR_NAME_ALREADY_USED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_RECENT_PAYMENT_NOT_FOUND: {
        name: "ERR_RECENT_PAYMENT_NOT_FOUND",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_RESOURCE_NOT_ENABLED: {
        name: "ERR_RESOURCE_NOT_ENABLED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_RESOURCE_NOT_FOUND: {
        name: "ERR_RESOURCE_NOT_FOUND",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SAVING_INVOICE_DATA: {
        name: "ERR_SAVING_INVOICE_DATA",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SAVING_RESOURCE_DATA: {
        name: "ERR_SAVING_RESOURCE_DATA",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SAVING_USER_DATA: {
        name: "ERR_SAVING_USER_DATA",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_UNAUTHORIZED: {
        name: "ERR_UNAUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_USER_ALREADY_EXISTS: {
        name: "ERR_USER_ALREADY_EXISTS",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_USER_NOT_FOUND: {
        name: "ERR_USER_NOT_FOUND",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      oNE_8: {
        name: "ONE_8",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      SELF: {
        name: "SELF",
        type: "principal",
        access: "constant",
      } as TypedAbiVariable<string>,
      invoiceCount: {
        name: "invoiceCount",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      resourceCount: {
        name: "resourceCount",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      totalRevenue: {
        name: "totalRevenue",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      userCount: {
        name: "userCount",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      DEPLOYER: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      ERR_DELETING_RESOURCE_DATA: {
        isOk: false,
        value: 1_004n,
      },
      ERR_INVALID_PARAMS: {
        isOk: false,
        value: 1_001n,
      },
      ERR_INVOICE_ALREADY_PAID: {
        isOk: false,
        value: 1_010n,
      },
      ERR_INVOICE_NOT_FOUND: {
        isOk: false,
        value: 1_012n,
      },
      ERR_NAME_ALREADY_USED: {
        isOk: false,
        value: 1_002n,
      },
      ERR_RECENT_PAYMENT_NOT_FOUND: {
        isOk: false,
        value: 1_013n,
      },
      ERR_RESOURCE_NOT_ENABLED: {
        isOk: false,
        value: 1_006n,
      },
      ERR_RESOURCE_NOT_FOUND: {
        isOk: false,
        value: 1_005n,
      },
      ERR_SAVING_INVOICE_DATA: {
        isOk: false,
        value: 1_011n,
      },
      ERR_SAVING_RESOURCE_DATA: {
        isOk: false,
        value: 1_003n,
      },
      ERR_SAVING_USER_DATA: {
        isOk: false,
        value: 1_008n,
      },
      ERR_UNAUTHORIZED: {
        isOk: false,
        value: 1_000n,
      },
      ERR_USER_ALREADY_EXISTS: {
        isOk: false,
        value: 1_007n,
      },
      ERR_USER_NOT_FOUND: {
        isOk: false,
        value: 1_009n,
      },
      oNE_8: 100_000_000n,
      SELF: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde020ResourceManager-vars",
      invoiceCount: 0n,
      resourceCount: 0n,
      totalRevenue: 0n,
      userCount: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bde020-resource-manager",
  },
  bdp000AddResource: {
    functions: {
      execute: {
        name: "execute",
        access: "public",
        args: [{ name: "sender", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [sender: TypedAbiArg<string, "sender">],
        Response<boolean, bigint>
      >,
    },
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bdp000-add-resource",
  },
  bdp000Bootstrap: {
    functions: {
      execute: {
        name: "execute",
        access: "public",
        args: [{ name: "sender", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [sender: TypedAbiArg<string, "sender">],
        Response<boolean, bigint>
      >,
    },
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bdp000-bootstrap",
  },
  bdp000CoreTeamSunsetHeight: {
    functions: {
      execute: {
        name: "execute",
        access: "public",
        args: [{ name: "sender", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [sender: TypedAbiArg<string, "sender">],
        Response<boolean, bigint>
      >,
    },
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bdp000-core-team-sunset-height",
  },
  bdp000ExecutiveTeamSunsetHeight: {
    functions: {
      execute: {
        name: "execute",
        access: "public",
        args: [{ name: "sender", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [sender: TypedAbiArg<string, "sender">],
        Response<boolean, bigint>
      >,
    },
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bdp000-executive-team-sunset-height",
  },
  bitcoinDao: {
    functions: {
      isSelfOrExtension: {
        name: "is-self-or-extension",
        access: "private",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      setExtensionsIter: {
        name: "set-extensions-iter",
        access: "private",
        args: [
          {
            name: "item",
            type: {
              tuple: [
                { name: "enabled", type: "bool" },
                { name: "extension", type: "principal" },
              ],
            },
          },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [
          item: TypedAbiArg<
            {
              enabled: boolean;
              extension: string;
            },
            "item"
          >,
        ],
        boolean
      >,
      construct: {
        name: "construct",
        access: "public",
        args: [{ name: "proposal", type: "trait_reference" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [proposal: TypedAbiArg<string, "proposal">],
        Response<boolean, bigint>
      >,
      execute: {
        name: "execute",
        access: "public",
        args: [
          { name: "proposal", type: "trait_reference" },
          { name: "sender", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          proposal: TypedAbiArg<string, "proposal">,
          sender: TypedAbiArg<string, "sender">,
        ],
        Response<boolean, bigint>
      >,
      requestExtensionCallback: {
        name: "request-extension-callback",
        access: "public",
        args: [
          { name: "extension", type: "trait_reference" },
          { name: "memo", type: { buffer: { length: 34 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          extension: TypedAbiArg<string, "extension">,
          memo: TypedAbiArg<Uint8Array, "memo">,
        ],
        Response<boolean, bigint>
      >,
      setExtension: {
        name: "set-extension",
        access: "public",
        args: [
          { name: "extension", type: "principal" },
          { name: "enabled", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          extension: TypedAbiArg<string, "extension">,
          enabled: TypedAbiArg<boolean, "enabled">,
        ],
        Response<boolean, bigint>
      >,
      setExtensions: {
        name: "set-extensions",
        access: "public",
        args: [
          {
            name: "extension-list",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "enabled", type: "bool" },
                    { name: "extension", type: "principal" },
                  ],
                },
                length: 200,
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: { list: { type: "bool", length: 200 } },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          extensionList: TypedAbiArg<
            {
              enabled: boolean;
              extension: string;
            }[],
            "extensionList"
          >,
        ],
        Response<boolean[], bigint>
      >,
      executedAt: {
        name: "executed-at",
        access: "read_only",
        args: [{ name: "proposal", type: "trait_reference" }],
        outputs: { type: { optional: "uint128" } },
      } as TypedAbiFunction<
        [proposal: TypedAbiArg<string, "proposal">],
        bigint | null
      >,
      isExtension: {
        name: "is-extension",
        access: "read_only",
        args: [{ name: "extension", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [extension: TypedAbiArg<string, "extension">],
        boolean
      >,
    },
    maps: {
      executedProposals: {
        name: "executed-proposals",
        key: "principal",
        value: "uint128",
      } as TypedAbiMap<string, bigint>,
      extensions: {
        name: "extensions",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
    },
    variables: {
      errAlreadyExecuted: {
        name: "err-already-executed",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errInvalidExtension: {
        name: "err-invalid-extension",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      errUnauthorised: {
        name: "err-unauthorised",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      executive: {
        name: "executive",
        type: "principal",
        access: "variable",
      } as TypedAbiVariable<string>,
    },
    constants: {
      errAlreadyExecuted: {
        isOk: false,
        value: 1_001n,
      },
      errInvalidExtension: {
        isOk: false,
        value: 1_002n,
      },
      errUnauthorised: {
        isOk: false,
        value: 1_000n,
      },
      executive: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "bitcoin-dao",
  },
  extensionTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "extension-trait",
  },
  governanceTokenTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "governance-token-trait",
  },
  ownableTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "ownable-trait",
  },
  paymentGatewayTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "payment-gateway-trait",
  },
  proposalTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "proposal-trait",
  },
  resourceProviderTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "resource-provider-trait",
  },
  sip010FtTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch25",
    clarity_version: "Clarity2",
    contractName: "sip010-ft-trait",
  },
} as const;

export const accounts = {
  deployer: {
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    balance: "100000000000000",
  },
  wallet_1: {
    address: "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5",
    balance: "100000000000000",
  },
  wallet_2: {
    address: "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
    balance: "100000000000000",
  },
  wallet_3: {
    address: "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC",
    balance: "100000000000000",
  },
  wallet_4: {
    address: "ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND",
    balance: "100000000000000",
  },
  wallet_5: {
    address: "ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB",
    balance: "100000000000000",
  },
  wallet_6: {
    address: "ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0",
    balance: "100000000000000",
  },
  wallet_7: {
    address: "ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ",
    balance: "100000000000000",
  },
  wallet_8: {
    address: "ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP",
    balance: "100000000000000",
  },
  wallet_9: {
    address: "STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6",
    balance: "100000000000000",
  },
} as const;

export const identifiers = {
  bde000GovernanceToken:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde000-governance-token",
  bde001ProposalVoting:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde001-proposal-voting",
  bde002ProposalSubmission:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde002-proposal-submission",
  bde003CoreProposals:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde003-core-proposals",
  bde004CoreExecute:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde004-core-execute",
  bde006Treasury: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde006-treasury",
  bde020ResourceManager:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde020-resource-manager",
  bdp000AddResource:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-add-resource",
  bdp000Bootstrap: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-bootstrap",
  bdp000CoreTeamSunsetHeight:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-core-team-sunset-height",
  bdp000ExecutiveTeamSunsetHeight:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-executive-team-sunset-height",
  bitcoinDao: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoin-dao",
  extensionTrait: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.extension-trait",
  governanceTokenTrait:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.governance-token-trait",
  ownableTrait: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ownable-trait",
  paymentGatewayTrait:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.payment-gateway-trait",
  proposalTrait: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.proposal-trait",
  resourceProviderTrait:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.resource-provider-trait",
  sip010FtTrait: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip010-ft-trait",
} as const;

export const simnet = {
  accounts,
  contracts,
  identifiers,
} as const;

export const deployments = {
  bde000GovernanceToken: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde000-governance-token",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde000-governance-token",
    testnet: null,
    mainnet: null,
  },
  bde001ProposalVoting: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde001-proposal-voting",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde001-proposal-voting",
    testnet: null,
    mainnet: null,
  },
  bde002ProposalSubmission: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde002-proposal-submission",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde002-proposal-submission",
    testnet: null,
    mainnet: null,
  },
  bde003CoreProposals: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde003-core-proposals",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde003-core-proposals",
    testnet: null,
    mainnet: null,
  },
  bde004CoreExecute: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde004-core-execute",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde004-core-execute",
    testnet: null,
    mainnet: null,
  },
  bde006Treasury: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde006-treasury",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde006-treasury",
    testnet: null,
    mainnet: null,
  },
  bde020ResourceManager: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde020-resource-manager",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde020-resource-manager",
    testnet: null,
    mainnet: null,
  },
  bdp000AddResource: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-add-resource",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-add-resource",
    testnet: null,
    mainnet: null,
  },
  bdp000Bootstrap: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-bootstrap",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-bootstrap",
    testnet: null,
    mainnet: null,
  },
  bdp000CoreTeamSunsetHeight: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-core-team-sunset-height",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-core-team-sunset-height",
    testnet: null,
    mainnet: null,
  },
  bdp000ExecutiveTeamSunsetHeight: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-executive-team-sunset-height",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bdp000-executive-team-sunset-height",
    testnet: null,
    mainnet: null,
  },
  bitcoinDao: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoin-dao",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoin-dao",
    testnet: null,
    mainnet: null,
  },
  extensionTrait: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.extension-trait",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.extension-trait",
    testnet: null,
    mainnet: null,
  },
  governanceTokenTrait: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.governance-token-trait",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.governance-token-trait",
    testnet: null,
    mainnet: null,
  },
  ownableTrait: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ownable-trait",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ownable-trait",
    testnet: null,
    mainnet: null,
  },
  paymentGatewayTrait: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.payment-gateway-trait",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.payment-gateway-trait",
    testnet: null,
    mainnet: null,
  },
  proposalTrait: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.proposal-trait",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.proposal-trait",
    testnet: null,
    mainnet: null,
  },
  resourceProviderTrait: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.resource-provider-trait",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.resource-provider-trait",
    testnet: null,
    mainnet: null,
  },
  sip010FtTrait: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip010-ft-trait",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip010-ft-trait",
    testnet: null,
    mainnet: null,
  },
} as const;

export const project = {
  contracts,
  deployments,
} as const;
