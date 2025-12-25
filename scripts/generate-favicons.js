import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const sourceImage = join(publicDir, '2.png');
const outputDir = publicDir;

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Favicon sizes to generate
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 }, // iOS
  { name: 'android-chrome-192x192.png', size: 192 }, // Android
  { name: 'android-chrome-512x512.png', size: 512 }, // Android
];

async function generateFavicons() {
  try {
    console.log('Generating favicons from 2.png...');
    
    if (!existsSync(sourceImage)) {
      throw new Error(`Source image not found: ${sourceImage}`);
    }

    // Generate all sizes
    for (const { name, size } of sizes) {
      const outputPath = join(outputDir, name);
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Also create favicon.ico (16x16 and 32x32 combined)
    const favicon16 = await sharp(sourceImage)
      .resize(16, 16, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();
    
    const favicon32 = await sharp(sourceImage)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toBuffer();

    // For ICO format, we'll just copy the 32x32 PNG as favicon.ico
    // (Most modern browsers accept PNG as .ico)
    await sharp(favicon32)
      .toFile(join(outputDir, 'favicon.ico'));
    
    console.log('✓ Generated favicon.ico');
    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

