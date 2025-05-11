import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import fs from "fs";

// Load wallet keypair
const keypairFile = "C:/Users/LENOVO/.config/solana/id.json";
const keypairData = JSON.parse(fs.readFileSync(keypairFile));
const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));f566

// Connect to Solana Devnet
const connection = new Connection(clusterApiUrl("devnet"));

// Initialize Metaplex instance with wallet
const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));

// Pinata IPFS link (must be full)
const metadataUri = "https://gateway.pinata.cloud/ipfs/bafkreia7d7v3fotlkwlfyskbpry4af4t35juk47wzixt6blecdnaaowbum";

async function mintNFT() {
  console.log("Minting NFT...");

  const { nft } = await metaplex.nfts().create({
    uri: metadataUri,
    name: "Yendo Genesis",
    symbol: "YENDO",
    sellerFeeBasisPoints: 500, // 5% creator royalties
  });

  console.log("NFT Minted! Mint Address:", nft.address.toBase58());
}

mintNFT().catch(console.error);