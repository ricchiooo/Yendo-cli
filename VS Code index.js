  program
  .command('balance')
  .description('Check wallet balance')
  .action(async () => {
    console.log('Checking Wallet balance...');
    try {
      // Replace with your wallet public key
      const walletAddress = new PublicKey('CryX4FRYdYB4SyUZ3qyxBKG3g68mFG6qZrbzha38Piwc');
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const balance = await connection.getBalance(walletAddress);
      console.logconsole.log(`Wallet balance: ${balance / 1e9} SOL`);
    } catch (error) {
      console.error('Error fetching balance:', error.message);
    }
  });