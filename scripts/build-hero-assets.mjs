/**
 * Builds the home hero artwork from the supplied compositions:
 *
 *   ../images/lookonpc.jpeg    -> public/assets/hero-desktop-5.webp
 *   ../images/lookonphone.png  -> public/assets/hero-mobile-5.webp
 *
 * Approach: keep the artwork's own pale backdrop, trim only the margin that
 * carries nothing, then feather every visible edge so the backdrop dissolves
 * into the page wash. The background is deliberately NOT knocked out — these
 * compositions have soft shadows and translucent foliage that a flood fill
 * cannot separate cleanly, and feathering preserves them intact.
 *
 * Measured extent of the composition (saturation + luminance, see tmp-bounds):
 *   lookonpc.jpeg     x  94..1307 of 1310,  y  50..789 of 816   (near full bleed)
 *   lookonphone.png   x   0..767  of 768,   y  80..1375 of 1376 (full bleed)
 *
 * Because the desktop frame is essentially full, its crop is limited to the
 * genuinely empty margin. Cropping harder cuts the packs, which is what made an
 * earlier revision look sliced in half.
 *
 *   node scripts/build-hero-assets.mjs
 */
import path from "node:path";
import { mkdirSync, existsSync } from "node:fs";
import sharp from "sharp";
import { feather } from "./lib/image-ops.mjs";

const OUT = path.resolve("public", "assets");
mkdirSync(OUT, { recursive: true });

const SRC = path.resolve("..", "images");

/**
 * q95 with a lossless alpha channel. Measured against true lossless on this
 * artwork: 931 KB -> 236 KB desktop, 584 KB -> 123 KB phone, with no visible
 * difference. The hero is the largest paint on the page, so the weight matters.
 */
const ENCODE = { quality: 95, effort: 6, alphaQuality: 100 };

const jobs = [
  {
    source: path.join(SRC, "lookonpc.jpeg"),
    name: "hero-desktop-5.webp",
    /* Only the empty margin comes off: ~6% at the left, ~5% at the top and ~2%
       at the bottom. Everything inside that is composition. */
    crop: { left: 0.06, top: 0.05, width: 0.94, height: 0.93 },
    /* All four edges are visible in the layout, so all four dissolve. The left
       ramp is the widest because that edge meets the headline column. */
    edges: { left: 0.16, right: 0.06, top: 0.12, bottom: 0.12 },
    maxWidth: 1240,
  },
  {
    source: path.join(SRC, "lookonphone.png"),
    name: "hero-mobile-5.webp",
    /* Full width is kept — the composition bleeds to both sides. Vertically the
       products sit between y 500 and y 1030, so the tall foliage band above and
       the sparse trailing berries below are dropped. This is what brings the
       packs and tubs up to size on a phone without cutting them. */
    crop: { left: 0, top: 0.276, width: 1, height: 0.487 },
    edges: { left: 0.07, right: 0.07, top: 0.12, bottom: 0.1 },
    maxWidth: 768,
  },
];

const missing = jobs.filter((job) => !existsSync(job.source));
if (missing.length) {
  console.error(
    "Missing source artwork:\n" +
      missing.map((job) => `  - ${job.source}`).join("\n")
  );
  process.exit(1);
}

for (const { source, name, crop, edges, maxWidth } of jobs) {
  const meta = await sharp(source).metadata();

  /* 1. Trim the empty margin. */
  const left = Math.round(meta.width * crop.left);
  const top = Math.round(meta.height * crop.top);
  const width = Math.min(Math.round(meta.width * crop.width), meta.width - left);
  const height = Math.min(
    Math.round(meta.height * crop.height),
    meta.height - top
  );

  let buffer = await sharp(source)
    .extract({ left, top, width, height })
    .ensureAlpha()
    .png()
    .toBuffer();

  /* 2. Fade every edge so the artwork's own backdrop blends into the page. */
  buffer = await feather(buffer, edges);

  /* 3. Ship no more pixels than the layout paints — `images.unoptimized` is on,
        so the file is served exactly as written. */
  const cropped = await sharp(buffer).metadata();
  if (cropped.width > maxWidth) {
    buffer = await sharp(buffer)
      .resize({ width: maxWidth, kernel: sharp.kernel.lanczos3 })
      .png()
      .toBuffer();
  }

  const info = await sharp(buffer).webp(ENCODE).toFile(path.join(OUT, name));

  console.log(
    `${path.basename(source).padEnd(20)} -> ${name.padEnd(22)} ` +
      `${meta.width}x${meta.height} -> crop ${width}x${height} -> ` +
      `${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`
  );
}

console.log("\nHero artwork written to public/assets");
