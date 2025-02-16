const { Keypair } = require("@solana/web3.js");

// Generate a new keypair
const keypair = Keypair.generate();

// Print the full secret key (private key)
console.log("Full Secret Key:", Array.from(keypair.secretKey).join(","));

// Print the public key
console.log("Public Key:", keypair.publicKey.toBase58());