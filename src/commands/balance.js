const { Connection, PublicKey, clusterApiUrl } = require("@solana/web3.js");

async function checkBalance(publicKey) {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const wallet = new PublicKey(publicKey);
    const balance = await connection.getBalance(wallet); 
