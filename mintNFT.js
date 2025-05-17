import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import fs from "fs";

const keypairFile = "C:/Users/LENOVO/.config/solana/id.json";
const secretKeyArray = JSON.parse(fs.readFileSync(keypairFile, "utf8"));
const keypair = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));

const connection = new Connection(clusterApiUrl("devnet"), { commitment: "confirmed" });

const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));

const metadataUri = "https://gateway.pinata.cloud/ipfs/bafkreia7d7v3fotlkwlfyskbpry4af4t35juk47wzixt6blecdnaaowbum";

async function mintNFT() {
  console.log("Minting NFT...");
  await new Promise((resolve) => setTimeout(resolve, 2000)); // wait a bit

  const { nft } = await metaplex.nfts().create({
    uri: metadataUri,
    name: "Yendo Genesis",
    symbol: "YENDO",
    sellerFeeBasisPoints: 500,
  });

  console.log("NFT Minted! Mint Address:", nft.address.toBase58());
}

mintNFT().catch((error) => {
  console.error("Error during mint:", error);
});