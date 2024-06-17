#!/bin/bash

# List of URLs to open in the browser, e.g., pointing to different containers
urls=(
  "https://devnet-stacks.stx.eco/v2/info" # api node
  "https://devnet-stacks.stx.eco/extended/v1/contract/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-bootstrap-signers" # pox-4
  "https://devnet-stacks.stx.eco/extended/v1/contract/ST000000000000000000002AMW42H.pox-4" # pox-4
  "https://devnet-stacks-explorer.stx.eco/transactions?chain=testnet&api=https://devnet-stacks-explorer.stx.eco" # stacks explorer
  "https://devnet-bitcoin-explorer.stx.eco" # bitcoin explorer
  # Add more URLs as needed
)

# Function to open URLs in the default browser
open_url() {
  local url=$1
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "$url"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    open "$url"
  elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    start "$url"
  else
    echo "Unsupported OS: $OSTYPE"
  fi
}

# Loop through the URLs and open each one in a new browser tab
for url in "${urls[@]}"; do
  echo "Opening $url"
  open_url "$url"
done
