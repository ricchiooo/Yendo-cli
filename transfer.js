require("dotenv").config();
const { Connection, PublicKey, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } = require("@solana/web3.js");

// Load wallet from .env file
const secretKey = Uint8Array.from(process.env.SECRET_KEY.split(",").map(num => Number(num.trim())));
const senderKeypair = Keypair.fromSecretKey(secretKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Function to transfer SOL
async function transferSOL(recipientAddress, amount) {
    try {
        const recipientPublicKey = new PublicKey(recipientAddress);

        console.log("Sending " + amount + " SOL to " + recipientPublicKey.toBase58() + "...");

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: senderKeypair.publicKey,
                toPubkey: recipientPublicKey,
                lamports: amount * 1_000_000_000, // Convert SOL to lamports
            })
        );

        const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
        console.log("Transfer successful! Transaction Signature: " + signature);
        
    } catch (error) {
        console.error(" Transfer failed:", error);
    }
}

// Get recipient from command line arguments
const recipientAddress = process.argv[2];
const amount = parseFloat(process.argv[3]);

if (!recipientAddress || isNaN(amount)) {
    console.error(" Usage: node transfer.js <recipient_address> <amount>");
    process.exit(1);
}

// Execute transfer
transferSOL(recipientAddress, amount);