function showHelp() {
    console.log(`
    Available Commands:
    - balance <publicKey>: Check the balance of a wallet.
    - transfer <recipientPublicKey> <amount> --from <senderKeypairPath>: Send SOL from one wallet to another.
    - help: Show this help menu.
    `);
}

module.exports = showHelp; 
