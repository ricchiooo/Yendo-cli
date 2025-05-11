// get-public-key.js

const fs = require('fs');
const { Keypair } = require('@solana/web3.js');

// Load secret key from id.json and create a Keypair
const secret = JSON.parse(fs.readFileSync('id.json'));
const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));

// Print public key
console.log("Your wallet public key:", keypair.publicKey.toBase58());