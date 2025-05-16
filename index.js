require("dotenv").config(); // << THIS MUST BE FIRST
console.log("PINATA_API_KEY:", process.env.PINATA_API_KEY); // Debugging log
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const { Connection, clusterApiUrl, Keypair, PublicKey } = require("@solana/web3.js");
const { Metaplex, keypairIdentity } = require("@metaplex-foundation/js");

const program = new Command();
const WALLET_PATH = "C:/Users/LENOVO/.config/solana/id.json";
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

function loadWalletKeypair() {
  const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(WALLET_PATH)));
  return Keypair.fromSecretKey(secretKey);
}

// --- PLACE THIS FUNCTION HERE ---
async function uploadToPinata(imagePath) {
  const form = new FormData();
  form.append("file", fs.createReadStream(imagePath));

  const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {
    headers: {
      ...form.getHeaders(),
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_KEY,
    },
  });

  const cid = response.data.IpfsHash;
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}
// --------------------------------

program
  .command("mint-real-nft")
  .description("Upload image & mint a real NFT")
  .requiredOption("--image <path>", "Path to the image file")
  .action(async (options) => {
    try {
      console.log("Loaded Pinata API keys:", PINATA_API_KEY && PINATA_SECRET_KEY ? "OK" : "Missing");
      console.log("Starting mint-real-nft...");

      const filePath = options.image;
      const wallet = loadWalletKeypair();
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

      const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet));

      console.log("Uploading image to Pinata...");
      const uri = await uploadToPinata(filePath);
      console.log("Metadata URI:", uri);

      const { nft } = await metaplex.nfts().create({
        uri,
        name: "Yendo NFT",
        symbol: "YND",
        sellerFeeBasisPoints: 500,
      });

      console.log("NFT Minted Successfully! Mint Address:", nft.address.toBase58());
    } catch (error) {
      console.error("Error in mint-real-nft:", error.message);
    }
  });

program.parse(process.argv);