# Bitcoin DAO

A DAO for exploring payment gateways and resource providers

See also;

- [stxeco-launcher](https://github.com/radicleart/stxeco-launcher)
- [ai-flow](https://github.com/radicleart/ai-flow)
- [bitcoin-dao](https://github.com/radicleart/bitcoin-dao)

Note: this is experimental code - use at your own risk

## Extensions

Bitcoin DAO will launch with the following additional features;

- bde000-governance-token
- bde001-proposal-voting
- bde002-proposal-submission
- bde003-core-proposals
- bde004-core-execute
- bde006-treasury
- bde020-resource-manager

## Clarigen

Project uses [Clarigen](https://www.clarigen.dev/docs/documentation). To keep the test framerwork up to date with clarity run;

```bash
npx clarigen --watch
```

## Running containers

Two scripts wrap the clarinet tools for starting and stopping docker containers

```bash
bin/up.sh
bin/down.sh
```

## License

MIT license, all good as long as the copyright and permission notice are included.
