const { program } = require('commander');
const { Connection, PublicKey } = require('@solana/web3.js');
const OpenAI = require('openai');

// Initialize Solana connection
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Replace with your OpenAI API Key
const openai = new OpenAI({
  apiKey: 'your_openai_api_key_here',
});

const WALLET_ADDRESS = new PublicKey('CryX4FRYdYB4SyUZ3qyxBKG3g68mFG6qZrbzha38Piwc');

// Command: Check AI-powered transaction recommendation
program
  .command('recommend')
  .description('Get AI-powered transaction recommendations')
  .action(async () => {
    console.log('Fetching transaction history...');

    try {
      // Fetch wallet balance
      const balance = await connection.getBalance(WALLET_ADDRESS);
      const balanceInSOL = balance / 1e9;

      // Fetch recent transactions (using confirmed signatures)
      const signatures = await connection.getSignaturesForAddress(WALLET_ADDRESS, { limit: 5 });
      const transactions = [];

      for (const sig of signatures) {
        const tx = await connection.getTransaction(sig.signature, { commitment: 'confirmed' });
        if (tx) transactions.push(tx);
      }

      // Format transactions for AI
      const transactionHistory = transactions.map(tx => ({
        signature: tx.transaction.signatures[0],
        blockTime: tx.blockTime,
        fee: tx.meta.fee / 1e9,
        recentBalances: tx.meta.postBalances.map(b => b / 1e9),
      }));

      // Prepare OpenAI prompt
      const prompt = `I have a Solana wallet with a balance of ${balanceInSOL} SOL. Here are my last few transactions: ${JSON.stringify(transactionHistory)}. What are your recommendations for optimizing my transactions?`;

      // Call OpenAI for recommendation
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      });

      // Display AI recommendation
      console.log('AI Recommendation:', response.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching recommendation:', error.message);
    }
  });

program.parse();