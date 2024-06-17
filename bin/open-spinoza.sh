#!/bin/bash

# List of URLs to open in the browser, e.g., pointing to different containers
urls=(
  "http://45.79.149.203:3999/v2/info" # api node
  "http://45.79.149.203:3999/extended/v1/contract/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-bootstrap-signers" # pox-4
  "http://45.79.149.203:3999/extended/v1/contract/ST000000000000000000002AMW42H.pox-4" # pox-4
  "http://45.79.149.203:3020/transactions?chain=testnet&api=http://45.79.149.203:3999" # stacks explorer
  "http://45.79.149.203:8083" # bitcoin explorer
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
