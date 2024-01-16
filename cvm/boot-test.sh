#!/bin/zsh
# clarity-cli and jq required.
cd "$(dirname "$0")"
deployer=$(cat initial-allocations.json | jq ".[0].principal" -r)
deploy_order=(
	# traits
	"traits/extension-trait.clar" "traits/governance-token-trait.clar" "traits/ownable-trait.clar" "traits/proposal-trait.clar" "traits/sip010-ft-trait.clar"
	# ExecutorDAO
	"bitcoin-dao.clar"
	# Extensions
	"extensions/bde000-governance-token.clar" "extensions/bde001-proposal-voting.clar" "extensions/bde002-proposal-submission.clar" "extensions/bde003-emergency-proposals.clar" "extensions/bde004-emergency-execute.clar" "extensions/bde005-dev-fund.clar"
	# Proposals
	"proposals/bdp000-bootstrap.clar" "proposals/bdp001-dev-fund.clar" "proposals/bdp002-kill-emergency-execute.clar"
	)
vmstate="vmstate.db"

rm -rf "$vmstate"
clarity-cli initialize --testnet initial-allocations.json "$vmstate"
for contract in "${deploy_order[@]}"; do
	echo "LAUNCH $contract"
	clarity-cli launch "$deployer.$(basename $contract .clar)" "../contracts/$contract" "$vmstate"
done
echo "BOOTSTRAP"
result=$(clarity-cli execute "$vmstate" "$deployer.bitcoin-dao" "construct" "$deployer" "'$deployer.bdp000-bootstrap")
if [[ $(echo $result | jq ".success") == "true" ]]; then
	echo "OK"
else
	echo "FAILED"
	exit 1
fi
rm -rf "$vmstate"
