#!/bin/bash

# List of URLs to open in the browser, e.g., pointing to different containers
urls=(
  "http://localhost:8000/transactions?chain=testnet&api=http://localhost:3999"

  "http://localhost:8000/txid/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bitcoin-dao?chain=testnet&api=http://localhost:3999"
  "http://localhost:8000/txid/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde001-proposal-voting?chain=testnet&api=http://localhost:3999"
  "http://localhost:8000/txid/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde002-proposal-submission?chain=testnet&api=http://localhost:3999"
  "http://localhost:8000/txid/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde003-core-proposals?chain=testnet&api=http://localhost:3999"
  "http://localhost:8000/txid/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.bde004-core-execute?chain=testnet&api=http://localhost:3999"

  #"http://localhost:8000/txid/ST000000000000000000002AMW42H.pox-4?chain=testnet&api=http://localhost:3999"
  #"http://localhost:8000/txid/ST000000000000000000002AMW42H.signers-1-12?chain=testnet&api=http://localhost:3999"
  #"http://localhost:8000/txid/ST000000000000000000002AMW42H.bns?chain=testnet&api=http://localhost:3999"

  "http://localhost:8001" # bitcoin explorer
  "http://localhost:3999/v2/info" # api node
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
