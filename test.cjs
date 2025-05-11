const { uploadNFTImage } = require("./uploadImage");

async function testUpload() {
    try {
        const imageUrl = await uploadNFTImage("./path/to/your/image.png");
        console.log("Uploaded image URL:", imageUrl);
    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

testUpload();