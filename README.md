# Yendo CLI

*Yendo* is an AI-powered command-line tool that allows users to mint SPL tokens and NFTs on the Solana blockchain. Built for developers and crypto-native creators, it simplifies on-chain operations and enhances Devnet interaction through smart automation and improved UX.

---

## Features

- Mint SPL tokens with metadata  
- Mint NFTs using image & metadata hosting  
- Send NFTs and tokens across wallets  
- Built-in Devnet support with real-time CLI feedback  
- Optional AI-generated NFT metadata  

---

## Tech Stack

- Node.js  
- @solana/web3.js  
- Commander.js  
- nft.storage  
- fs & console utilities  

---

## Usage

1. Clone the repo  
2. Run npm install  
3. Use commands like:

```bash
node index.js mint-token
node index.js mint-nft --image="./demo.png"