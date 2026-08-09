/**
 * Builds the home hero artwork from the supplied compositions:
 *
 *   ../images/lookonpc.jpeg    -> public/assets/hero-desktop-4.webp
 *   ../images/lookonphone.png  -> public/assets/hero-mobile-4.webp
 *
 * Both arrive on a flat near-white card. Rather than fading a rectangle, the
 * surround is removed with a border-seeded flood fill, so the packs, tubs and
 * berries sit on transparency and blend against any page background. Only the
 * edges where the artwork is genuinely clipped get a light feather, so nothing
 * reads as sliced off.
 *
 *   node scripts/build-hero-assets.mjs
 */
import path from "node:path";
import { mkdirSync, existsSync } from "node:fs";
import sharp from "sharp";
import { feather, knockout } from "./lib/image-ops.mjs";

const OUT = path.resolve("public", "assets");
mkdirSync(OUT, { recursive: true });

const SRC = path.resolve("..", "images");

/**
 * Measured on this artwork (see `git log` for the analysis run):
 *
 *   encoder            desktop   mobile
 *   lossless             931 KB   584 KB
 *   nearLossless q60     682 KB   408 KB
 *   lossy q95            236 KB   155 KB
 *
 * q95 with `alphaQuality: 100` is visually indistinguishable from lossless on
 * this photographic content while keeping the hero — which is the largest
 * paint on the page and on the critical path — roughly a quarter of the weight.
 * The alpha ramp itself is stored losslessly, so the knockout edge stays clean.
 * Flip this one object to `{ lossless: true }` if byte-exact output is ever
 * required.
 */
const ENCODE = { quality: 95, effort: 6, alphaQuality: 100 };

const jobs = [
  {
    source: path.join(SRC, "lookonpc.jpeg"),
    name: "hero-desktop-4.webp",
    /* Composition fills the frame (74–97% opaque throughout), so it is kept
       whole. Anchored right in the layout, so only the left edge has to
       dissolve into the page. */
    edges: { left: 0.06 },
    maxWidth: 1310,
  },
  {
    source: path.join(SRC, "lookonphone.png"),
    name: "hero-mobile-4.webp",
    /* The supplied frame is 1350px tall once trimmed, but the top fifth and
       bottom quarter are sparse trailing foliage (18–35% coverage, little
       colour) while the packs, tubs and berries all sit between. Keeping the
       full height would push the page's trust badges far below the fold, so
       the band that holds the whole product composition is kept and only the
       thin decorative tails are dropped. Nothing of the product is cut. */
    band: { top: 0.207, height: 0.541 },
    edges: { top: 0.07, bottom: 0.05 },
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

for (const { source, name, edges, band, maxWidth } of jobs) {
  const original = await sharp(source).metadata();

  /* 1. Remove the flat card behind the composition. */
  const cut = await knockout(
    await sharp(source).ensureAlpha().png().toBuffer(),
    { luma: 236, spread: 22, softness: 1 }
  );

  /* 2. Crop to the artwork, keeping a little clear space so any feather has
        somewhere to fall off and the edge never looks shaved. */
  let buffer = cut.buffer;
  if (cut.bbox) {
    const pad = 8;
    buffer = await sharp(buffer)
      .extract({
        left: Math.max(0, cut.bbox.left - pad),
        top: Math.max(0, cut.bbox.top - pad),
        width: Math.min(
          original.width - Math.max(0, cut.bbox.left - pad),
          cut.bbox.width + pad * 2
        ),
        height: Math.min(
          original.height - Math.max(0, cut.bbox.top - pad),
          cut.bbox.height + pad * 2
        ),
      })
      .png()
      .toBuffer();
  }

  /* 3. Optionally keep only the meaningful vertical band. */
  if (band) {
    const meta = await sharp(buffer).metadata();
    const top = Math.round(meta.height * band.top);
    const height = Math.min(
      Math.round(meta.height * band.height),
      meta.height - top
    );
    buffer = await sharp(buffer)
      .extract({ left: 0, top, width: meta.width, height })
      .png()
      .toBuffer();
  }

  /* 4. Soften only the clipped edges. */
  if (edges && Object.keys(edges).length) {
    buffer = await feather(buffer, edges);
  }

  /* 5. Ship no more pixels than the layout paints. `images.unoptimized` is on,
        so the file is served verbatim. */
  const beforeResize = await sharp(buffer).metadata();
  if (beforeResize.width > maxWidth) {
    buffer = await sharp(buffer)
      .resize({ width: maxWidth, kernel: sharp.kernel.lanczos3 })
      .png()
      .toBuffer();
  }

  const info = await sharp(buffer).webp(ENCODE).toFile(path.join(OUT, name));

  console.log(
    `${path.basename(source).padEnd(20)} -> ${name.padEnd(22)} ` +
      `${original.width}x${original.height} -> ${info.width}x${info.height}  ` +
      `bg -${cut.cleared}%  ${Math.round(info.size / 1024)} KB`
  );
}

console.log("\nHero artwork written to public/assets");
