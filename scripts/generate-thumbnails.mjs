import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const thumbnailsDir = join(rootDir, 'thumbnails');

const pieces = JSON.parse(readFileSync(join(rootDir, 'pieces.json'), 'utf-8'));

if (!existsSync(thumbnailsDir)) {
  mkdirSync(thumbnailsDir, { recursive: true });
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 }
});

let success = 0;
let failed = [];

for (const piece of pieces) {
  const filePath = join(rootDir, piece.file);
  const thumbPath = join(thumbnailsDir, piece.file.replace('.html', '.png'));

  try {
    const page = await context.newPage();

    await page.goto(`file://${filePath}`, { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('canvas', { timeout: 5000 }).catch(() => null);

    await page.waitForTimeout(1500);

    const thumbData = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return null;
      if (window.thumbnail) return window.thumbnail;
      return canvas.toDataURL('image/png');
    });

    if (thumbData) {
      const base64Data = thumbData.replace(/^data:image\/png;base64,/, '');
      writeFileSync(thumbPath, Buffer.from(base64Data, 'base64'));
      console.log(`✓ ${piece.title}`);
      success++;
    } else {
      console.log(`✗ ${piece.title} (no canvas)`);
      failed.push(piece.file);
    }

    await page.close();
  } catch (err) {
    console.log(`✗ ${piece.title} (${err.message})`);
    failed.push(piece.file);
  }
}

await browser.close();

console.log(`\nDone: ${success}/${pieces.length} thumbnails generated`);
if (failed.length > 0) {
  console.log('Failed:', failed.join(', '));
}