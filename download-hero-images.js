const https = require("https");
const fs = require("fs");
const path = require("path");

const images = {
  // Image 1 - Fashion model in street style
  "hero-fashion-1.jpg":
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",

  // Image 2 - Fashion collection display
  "hero-fashion-2.jpg":
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80",

  // Image 3 - Modern fashion portrait
  "hero-fashion-3.jpg":
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",

  // Image 4 - Street style fashion
  "hero-fashion-4.jpg":
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1920&q=80",

  // Image 5 - Luxury fashion accessories
  "hero-fashion-5.jpg":
    "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1920&q=80",
};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    // Save to public/img-hero/ folder
    const filepath = path.join(__dirname, "public", "img-hero", filename);

    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Already exists: img-hero/${filename}`);
      resolve();
      return;
    }

    https
      .get(url, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          https
            .get(response.headers.location, (redirectResponse) => {
              if (redirectResponse.statusCode === 200) {
                const fileStream = fs.createWriteStream(filepath);
                redirectResponse.pipe(fileStream);
                fileStream.on("finish", () => {
                  fileStream.close();
                  console.log(`✅ Downloaded: img-hero/${filename}`);
                  resolve();
                });
              } else {
                reject(`Failed to download ${filename}`);
              }
            })
            .on("error", reject);
          return;
        }

        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(filepath);
          response.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            console.log(`✅ Downloaded: img-hero/${filename}`);
            resolve();
          });
        } else {
          reject(
            `Failed to download ${filename}: Status ${response.statusCode}`,
          );
        }
      })
      .on("error", (err) => {
        reject(`Error downloading ${filename}: ${err.message}`);
      });
  });
};

async function downloadAll() {
  console.log("📥 Downloading 5 hero background images...\n");
  console.log("📁 Saving to: public/img-hero/\n");

  // Create directory if it doesn't exist
  const heroDir = path.join(__dirname, "public", "img-hero");
  if (!fs.existsSync(heroDir)) {
    fs.mkdirSync(heroDir, { recursive: true });
    console.log("📁 Created folder: public/img-hero/\n");
  }

  let success = 0;
  let failed = 0;

  for (const [filename, url] of Object.entries(images)) {
    try {
      await downloadImage(url, filename);
      success++;
      // Small delay between downloads
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      failed++;
      console.error(`❌ ${error}`);
    }
  }

  console.log("\n✨ Download Complete!");
  console.log(`   ✅ Downloaded: ${success}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log("\n📁 Files location: public/img-hero/");
  console.log("   - hero-fashion-1.jpg");
  console.log("   - hero-fashion-2.jpg");
  console.log("   - hero-fashion-3.jpg");
  console.log("   - hero-fashion-4.jpg");
  console.log("   - hero-fashion-5.jpg");
}

downloadAll();
