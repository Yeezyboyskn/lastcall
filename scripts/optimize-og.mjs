#!/usr/bin/env node
// Image optimization script for og.png
// Run: node scripts/optimize-og.mjs
// Requires: npm install sharp --save-dev

import sharp from "sharp";
import { resolve } from "path";

const inputPath = resolve("public/og.png");
const outputPath = resolve("public/og-optimized.png");
const outputWebPPath = resolve("public/og.webp");

async function optimize() {
  try {
    console.log("Optimizing og.png...");

    const metadata = await sharp(inputPath).metadata();
    console.log(`Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);

    // Resize to 1200x630 (ideal OG size) and compress
    await sharp(inputPath)
      .resize(1200, 630, { fit: "cover", position: "center" })
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(outputPath);

    // Also create WebP version
    await sharp(inputPath)
      .resize(1200, 630, { fit: "cover", position: "center" })
      .webp({ quality: 80 })
      .toFile(outputWebPPath);

    const optimizedMeta = await sharp(outputPath).metadata();
    const webpMeta = await sharp(outputWebPPath).metadata();

    const originalSize = (await sharp(inputPath).stats()).size;
    const optimizedSize = (await sharp(outputPath).stats()).size;
    const webpSize = (await sharp(outputWebPPath).stats()).size;

    console.log(`✅ PNG optimized: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${((1 - optimizedSize / originalSize) * 100).toFixed(1)}% reduction)`);
    console.log(`✅ WebP created: ${(webpSize / 1024).toFixed(1)}KB`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📁 Output: ${outputWebPPath}`);

    // Show usage in HTML
    console.log(`
To use in HTML, update pages/index.html:
  <meta property="og:image" content="https://lastcall-event.vercel.app/og-optimized.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/png" />
`);
  } catch (error) {
    console.error("❌ Optimization failed:", error.message);
    process.exit(1);
  }
}

optimize();