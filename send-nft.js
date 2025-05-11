import {
  getOrCreateAssociatedTokenAccount,
  transfer,
} from "@solana/spl-token";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Keypair,
} from "@solana/web3.js";
import fs from "fs";

// Connect to Solana Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Load sender wallet from id.json
const fromWallet = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync("id.json")))
);

// Define NFT mint address (your NFT)
const mintPublicKey = new PublicKey("4nw2HTnezxThGjuZNb9YgUixRJYA46LayNaTepSAbhxp");

// Replace with the receiver wallet address (can be your test wallet)
const toWallet = new PublicKey("DdnPfantCWfHg6VaaexRAAqa23YrnTfBrcEm6M25Q4PJ"); // Example from your screenshot

(async () => {
  // Get sender's NFT token account
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    mintPublicKey,
    fromWallet.publicKey
  );

  // Get or create receiver's token account
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet, // still uses fromWallet to pay for fees
    mintPublicKey,
    toWallet
  );

  // Send the NFT (amount = 1)
  const signature = await transfer(
    connection,
    fromWallet,
    fromTokenAccount.address,
    toTokenAccount.address,
    fromWallet.publicKey,
    1 // Send 1 NFT
  );

  console.log("NFT sent! Signature:", signature);
})();