#!/bin/bash

docker rm -f stacks-explorer.bitcoin-dao.devnet
docker rm -f bitcoin-explorer.bitcoin-dao.devnet
docker rm -f stacks-node.bitcoin-dao.devnet
sleep 2
docker rm -f stacks-signer-2.bitcoin-dao.devnet
docker rm -f stacks-signer-1.bitcoin-dao.devnet
sleep 2
docker rm -f stacks-api.bitcoin-dao.devnet
docker rm -f postgres.bitcoin-dao.devnet
docker rm -f bitcoin-node.bitcoin-dao.devnet
sleep 2

docker network rm bitcoin-dao.devnet

echo "removed clarinet devnet conntainers and network."