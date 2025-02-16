const { Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction } = require("@solana/web3.js");
const fs = require("fs");

async function transferSOL(senderKeypairPath, recipientPublicKey, amount) {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Load sender's keypair
    const senderKeypair = Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(fs.readFileSync(senderKeypairPath, "utf-8")))
    );

    const recipient = new PublicKey(recipientPublicKey);
    const amountInLamports = amount * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey: recipient,
            lamports: amountInLamports,
        })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

    console.log(Transaction successful! Signature: ${signature});
}

module.exports = transferSOL; 
