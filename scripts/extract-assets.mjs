/**
 * Extracts image assets from the supplied design mockups into /public/assets.
 * Desktop mockup : 1024 x 1536
 * Mobile  mockup :  853 x 1844
 *
 * `feather()` and `knockout()` live in `./lib/image-ops.mjs` and are shared with
 * `build-hero-assets.mjs`. This script adds a lanczos upscale plus light sharpen
 * for small source regions.
 *
 * Re-run with `node scripts/extract-assets.mjs`.
 * Crop rectangles can be validated with `node scripts/analyse-regions.mjs`.
 */
import sharp from "sharp";
import path from "node:path";
import { mkdirSync } from "node:fs";
import { DESKTOP, SOURCE_LABEL } from "./sources.mjs";
import { feather, knockout } from "./lib/image-ops.mjs";

const OUT = path.resolve("public", "assets");

mkdirSync(OUT, { recursive: true });
console.log(`sources: ${SOURCE_LABEL}\n`);

/* ── Pipeline ─────────────────────────────────────────────────────────────── */

async function build(src, rect, name, opts = {}) {
  const { scale = 1, feather: edges, knockout: knock, trim = false } = opts;

  let buffer = await sharp(src).extract(rect).ensureAlpha().png().toBuffer();
  let note = "";

  if (knock) {
    const result = await knockout(buffer, knock === true ? undefined : knock);
    buffer = result.buffer;
    note = `  bg -${result.cleared}%`;

    if (trim && result.bbox) {
      const pad = typeof trim === "number" ? trim : 2;
      const box = {
        left: Math.max(0, result.bbox.left - pad),
        top: Math.max(0, result.bbox.top - pad),
        width: Math.min(
          rect.width - Math.max(0, result.bbox.left - pad),
          result.bbox.width + pad * 2
        ),
        height: Math.min(
          rect.height - Math.max(0, result.bbox.top - pad),
          result.bbox.height + pad * 2
        ),
      };
      buffer = await sharp(buffer).extract(box).png().toBuffer();
      note += `  trim ${box.width}x${box.height}`;
    }
  }

  if (scale !== 1) {
    const meta = await sharp(buffer).metadata();
    buffer = await sharp(buffer)
      .resize({
        width: Math.round(meta.width * scale),
        kernel: sharp.kernel.lanczos3,
      })
      .sharpen({ sigma: 0.5 })
      .png()
      .toBuffer();
  }

  if (edges) buffer = await feather(buffer, edges);

  /* `lossless` keeps every pixel of the source composition. It is reserved for
     the hero art, which is the largest thing on screen and the one place where
     WebP's lossy ringing shows around the pack lettering. */
  const encoder = name.endsWith(".webp")
    ? sharp(buffer).webp(
        opts.lossless
          ? { lossless: true, effort: 6, alphaQuality: 100 }
          : { quality: 88, effort: 6, alphaQuality: 100 }
      )
    : sharp(buffer).png({ compressionLevel: 9 });

  const info = await encoder.toFile(path.join(OUT, name));
  console.log(
    `wrote ${name.padEnd(26)} ${info.width}x${info.height}  ${String(
      Math.round(info.size / 1024)
    ).padStart(4)} KB${note}`
  );
}

/* ── Brand mark ────────────────────────────────────────────────────────────────
 * No longer cropped out of the mockup. The logo now comes from the supplied
 * artwork in `design/logo-source.png` and is built by
 * `scripts/build-logo-assets.mjs`, which also emits the favicons, PWA icons and
 * the Open Graph card. Re-running this extractor must not overwrite them.
 */

/* ── Hero visuals ──────────────────────────────────────────────────────────
 * No longer cut from the mockups. The hero artwork is supplied directly as
 * `../images/lookonpc.jpeg` and `../images/lookonphone.png`, and is built by
 * `scripts/build-hero-assets.mjs`, which knocks out the flat card behind the
 * composition instead of feathering a rectangle. Re-running this extractor must
 * not overwrite those files.
 */

/* No leaf cut-out is exported. Every text-free region of the mockup's foliage
 * is dense, low-contrast canopy that reads as mud behind copy, and the regions
 * with well-separated leaves overlap the mockup's own headline. The hero's
 * halo is drawn in CSS instead (`.hero-wash`), which also scales fluidly.
 */

/* ── Product range cards ──────────────────────────────────────────────────── */
const cards = [
  ["product-blueberry.webp", 78],
  ["product-raspberry.webp", 294],
  ["product-strawberry.webp", 510],
  ["product-passionfruit.webp", 725],
];
for (const [name, left] of cards) {
  await build(DESKTOP, { left, top: 1160, width: 196, height: 262 }, name, {
    scale: 2.2,
  });
}

console.log("\nAssets written to public/assets");
