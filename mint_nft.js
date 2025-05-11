const connection = new web3.Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);
const { programs } = require('@metaplex/js');
const fetch = require('node-fetch');  // To fetch the media URI

const connection = new Connection('https://api.devnet.solana.com');

async function downloadNFT(nftMintAddress) {
  // Step 1: Fetch metadata for the NFT
  const nftPublicKey = new PublicKey(nftMintAddress);
  const metadata = await programs.metadata.Metadata.getPDA(nftPublicKey);
  const metadataAccount = await connection.getAccountInfo(metadata);
  
  // Step 2: Parse the metadata to get the URI of the media
  const decodedMetadata = programs.metadata.MetadataData.deserialize(metadataAccount.data);
  const mediaURI = decodedMetadata.data.uri;  // URI to the media file (e.g., image, video, etc.)

  console.log('NFT Metadata URI:', mediaURI);

  // Step 3: Download the media (image or other file)
  const mediaResponse = await fetch(mediaURI);
  const mediaBuffer = await mediaResponse.buffer();

  // Save the media file locally
  const fs = require('fs');
  fs.writeFileSync('nft_image.png', mediaBuffer);  // You can change the file name based on the media type (e.g., .jpg, .mp4)

  console.log('NFT media downloaded as nft_image.png');
}

// Replace this with the actual mint address of the NFT you want to download
const nftMintAddress = 'your-nft-mint-address-here';  // Example: 'GZ4QwkpL4pdYgEdnKMgZtGHjSz6vjbg48w6JEdR2poaS'
downloadNFT(nftMintAddress).catch((error) => {
  console.error('Error downloading NFT:', error);
});