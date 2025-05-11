const fs = require("fs");
const pinataSDK = require("@pinata/sdk");
const path = require("path");

// Initialize Pinata with full Secret Key
const pinata = new pinataSDK(
  "184f7d46cf10e7d5dad6",
  "8997d3e6bb558c576f7f08d6099b9de038557df84e847ca0dd50def386df3baa"
);

console.log("Pinata initialized!");

async function uploadToPinata(imagePath) {
  try {
    console.log("Checking file:", imagePath);

    if (!fs.existsSync(imagePath)) {
      console.error("Error: Image file not found at:", imagePath);
      process.exit(1);
    }

    console.log("File found:", imagePath);

    const readableStreamForFile = fs.createReadStream(imagePath);
    const options = { pinataMetadata: { name: path.basename(imagePath) } };

    console.log("Uploading to Pinata...");

    const response = await pinata.pinFileToIPFS(readableStreamForFile, options);

    const imageUrl = https://gateway.pinata.cloud/ipfs/${response.IpfsHash};

    console.log("Image uploaded successfully!");
    console.log("Image URL:", imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to Pinata:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
    process.exit(1);
  }
}

// Example usage
uploadToPinata("./nft_image.jpeg");