require("dotenv").config();
const { Connection, PublicKey, LAMPORTS_PER_SOL } = require("@solana/web3.js");

// Load wallet address from .env
const WALLET_ADDRESS = process.env.PUBLIC_KEY;

if (!WALLET_ADDRESS) {
  console.error("Error: PUBLIC_KEY is missing in .env file.");
  process.exit(1);
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

async function requestAirdrop() {
  try {
    const publicKey = new PublicKey(WALLET_ADDRESS);
    console.log(`Requesting 1 SOL airdrop to: ${publicKey.toBase58()}`);

    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      1 * LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(airdropSignature, "confirmed");

    console.log("Airdrop successful!");
  } catch (error) {
    console.error("Airdrop failed:", error);
  }
}

requestAirdrop();