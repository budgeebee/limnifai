import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const thumbnailsDir = join(rootDir, 'thumbnails');

const allPieces = JSON.parse(readFileSync(join(rootDir, 'pieces.json'), 'utf-8'));

// Optional: pass piece filenames (e.g. `node generate-thumbnails.mjs veil littoral`)
// to regenerate only those, instead of churning the whole collection.
const requested = process.argv.slice(2).map(a => a.replace(/\.html$/, ''));
const pieces = requested.length
  ? allPieces.filter(p => requested.includes(p.file.replace(/\.html$/, '')))
  : allPieces;

if (requested.length && pieces.length !== requested.length) {
  const found = new Set(pieces.map(p => p.file.replace(/\.html$/, '')));
  const missing = requested.filter(r => !found.has(r));
  if (missing.length) console.log(`⚠ not in pieces.json: ${missing.join(', ')}`);
}

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
      console.log(`✓ ${piece.title} (canvas)`);
      success++;
    } else {
      // DOM-based piece (no <canvas>): the piece IS the page, so capture the
      // viewport instead of skipping it. The gallery renders a thumbnail for
      // every entry in pieces.json, so a missing file is a broken card.
      await page.evaluate(
        () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
      );
      await page.screenshot({ path: thumbPath, type: 'png' });
      console.log(`✓ ${piece.title} (viewport)`);
      success++;
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
