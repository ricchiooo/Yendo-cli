Yendo NFT Minting Project

This project demonstrates how to mint an NFT on the Solana Devnet using the Metaplex JavaScript SDK.

---

## Overview

This script connects to the Solana Devnet, loads a wallet keypair, and mints an NFT using metadata hosted on IPFS. It prints the minted NFT's public address upon success.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- Solana CLI installed and configured
- A funded Solana wallet keypair JSON file (default location: ~/.config/solana/id.json)
- Internet connection to access Solana Devnet and IPFS

---

## Setup

1. Clone or download this repository.
2. Ensure your wallet keypair JSON file is saved locally. This project expects it to be at:

./keypair.json

3. Install dependencies:

```bash
npm install

4. Add "type": "module" to your package.json to avoid module warnings:

{
  "type": "module"
}


5. Make sure your wallet has Devnet SOL. You can airdrop SOL using:

solana airdrop 2




---

Minting the NFT

To mint your NFT:

node mintNFT.js

You should see output similar to:

Minting NFT...
NFT Minted! Mint Address: FmQ3RAwWmfWJ4d1ZuFJMzgL24AyxZ4XZ3CbihJSez84H

This indicates the NFT was successfully minted on the Solana Devnet.


---

Testing

You can verify the minted NFT using any of the following methods:

1. Solana Explorer
Go to https://explorer.solana.com, switch to Devnet, and paste the mint address in the search bar.


2. Metaplex SDK (Advanced Testing)
You can run a script using findNftByMint from the Metaplex SDK to programmatically verify NFT metadata.




---

Demo Screenshot

A demo image of the successful minting process is included in this repo:

File: yendo-genesis-mint.jpg

This image shows the CLI output at the moment the NFT was minted.


---

License

This project is for educational and hackathon purposes only. MIT license applies.