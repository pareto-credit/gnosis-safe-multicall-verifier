# gnosis-safe-multicall-verifier

Generate Gnosis Safe multicall tx data indipendently of the Gnosis Safe app.
This data can be used to verify the integrity of multicall transactions, the output should be equal to the one provided 
by the Gnosis Safe app (In 'Advanced details' > 'data' field) and most importantly equal to the one that one will sign in a hardware wallet that support clear-sign (Eg Keystone, Grid+).

## Installation
1. Install Node.js https://nodejs.org/en/download
2. Install bun https://bun.sh/docs/installation#installing
3. Install dependencies with
```bash
bun install
```

## Usage
1. Update `multicall.json` with the multicall data you want to verify, following the format:
```json
{
  "transactions": [
    {
      "to": "0x1234",
      "methodSig": "transfer(address,uint256)",
      "value": 0,
      "args": [
        "0x98765",
        "100000000"
      ]
    },
    {
      "to": "0x5678",
      "methodSig": "approve(address,uint256)",
      "value": 0,
      "args": [
        "0x54321",
        "200000000"
      ]
    }
  ]
}
```

2. Run the script with
```bash
bun run index.js
```