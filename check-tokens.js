import {
    Connection,
    clusterApiUrl,
    Keypair,
    PublicKey
  } from "@solana/web3.js";
  import fs from "fs";
  
  // Load wallet from id.json
  const fromWallet = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync("id.json")))
  );
  
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
  (async () => {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      fromWallet.publicKey,
      { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
    );
  
    console.log("Tokens owned by", fromWallet.publicKey.toBase58());
    tokenAccounts.value.forEach((accountInfo) => {
      const amount = accountInfo.account.data.parsed.info.tokenAmount.uiAmount;
      const mint = accountInfo.account.data.parsed.info.mint;
      if (amount > 0) {
        console.log(`- Mint: ${mint}, Amount: ${amount}`);
      }
    });
  })();