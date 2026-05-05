const https = require("https");
const fs = require("fs");
const path = require("path");

const images = {
  "hero-fashion.jpg":
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
  "hoodie-black.jpg":
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
  "sneakers-white.jpg":
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
  "jacket-denim.jpg":
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
  "sunglasses-gold.jpg":
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
  "shirt-linen.jpg":
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
  "dress-satin.jpg":
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
  "boots-leather.jpg":
    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
  "watch-minimal.jpg":
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
  "coat-wool.jpg":
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
  "pants-cargo.jpg":
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
  "beanie-knit.jpg":
    "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80",
  "sneakers-run.jpg":
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  "category-men.jpg":
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
  "category-women.jpg":
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
  "category-shoes.jpg":
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
  "category-accessories.jpg":
    "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80",
};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, "public", "images", filename);

    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(filepath);
          response.pipe(fileStream);

          fileStream.on("finish", () => {
            fileStream.close();
            console.log(`✅ Downloaded: ${filename}`);
            resolve();
          });
        } else {
          reject(`Failed to download ${filename}: ${response.statusCode}`);
        }
      })
      .on("error", (err) => {
        reject(`Error downloading ${filename}: ${err.message}`);
      });
  });
};

async function downloadAll() {
  console.log("📥 Starting download of placeholder images...\n");

  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, "public", "images");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  for (const [filename, url] of Object.entries(images)) {
    try {
      await downloadImage(url, filename);
    } catch (error) {
      console.error(`❌ ${error}`);
    }
  }

  console.log("\n✨ All images downloaded successfully!");
}

downloadAll();
