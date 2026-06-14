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

  const page = await context.newPage();
  try {
    await page.goto(`file://${filePath}`, { waitUntil: 'domcontentloaded' });

    const hasCanvas = await page.waitForSelector('canvas', { timeout: 1500 })
      .then(() => true, () => false);

    if (hasCanvas) {
      // Two RAFs is enough for canvas-driven animations to draw a non-trivial
      // frame; static compositions converge on the first paint.
      await page.evaluate(
        () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
      );
      await page.locator('canvas').screenshot({ path: thumbPath, type: 'png' });
      console.log(`✓ ${piece.title}`);
      success++;
    } else {
      console.log(`✗ ${piece.title} (no canvas)`);
      failed.push(piece.file);
    }
  } catch (err) {
    console.log(`✗ ${piece.title} (${err.message})`);
    failed.push(piece.file);
  } finally {
    await page.close();
  }
}

await browser.close();

console.log(`\nDone: ${success}/${pieces.length} thumbnails generated`);
if (failed.length > 0) {
  console.log('Failed:', failed.join(', '));
}
