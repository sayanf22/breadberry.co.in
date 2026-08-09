/**
 * Extracts image assets from the supplied design mockups into /public/assets.
 * Desktop mockup : 1024 x 1536
 * Mobile  mockup :  853 x 1844
 *
 * Three techniques are used:
 *   feather()  – fades a cut edge to transparent so a crop that slices the
 *                artwork's gradient blends into the page with no seam.
 *   knockout() – flood-fills the flat background inwards from the border and
 *                turns it transparent, leaving interior whites (such as the
 *                logo's lettering) untouched.
 *   scale      – lanczos upscale + light sharpen for small source regions.
 *
 * Re-run with `node scripts/extract-assets.mjs`.
 * Crop rectangles can be validated with `node scripts/analyse-regions.mjs`.
 */
import sharp from "sharp";
import path from "node:path";
import { mkdirSync } from "node:fs";
import { DESKTOP, MOBILE, SOURCE_LABEL } from "./sources.mjs";

const OUT = path.resolve("public", "assets");

mkdirSync(OUT, { recursive: true });
console.log(`sources: ${SOURCE_LABEL}\n`);

/* ── Edge feathering ──────────────────────────────────────────────────────── */

function ramp(w, h, axis, start, end) {
  const horizontal = axis === "x";
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="${horizontal ? 1 : 0}" y2="${horizontal ? 0 : 1}">
          <stop offset="0" stop-color="#fff" stop-opacity="${start > 0 ? 0 : 1}"/>
          ${start > 0 ? `<stop offset="${start}" stop-color="#fff" stop-opacity="1"/>` : ""}
          ${end < 1 ? `<stop offset="${end}" stop-color="#fff" stop-opacity="1"/>` : ""}
          <stop offset="1" stop-color="#fff" stop-opacity="${end < 1 ? 0 : 1}"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
    </svg>`
  );
}

async function feather(buffer, { left = 0, right = 0, top = 0, bottom = 0 }) {
  const { width: w, height: h } = await sharp(buffer).metadata();
  let out = buffer;

  if (left || right) {
    out = await sharp(out)
      .composite([{ input: ramp(w, h, "x", left, 1 - right), blend: "dest-in" }])
      .png()
      .toBuffer();
  }
  if (top || bottom) {
    out = await sharp(out)
      .composite([{ input: ramp(w, h, "y", top, 1 - bottom), blend: "dest-in" }])
      .png()
      .toBuffer();
  }
  return out;
}

/* ── Background knockout ──────────────────────────────────────────────────── */

/** Softens a single-channel mask so the knockout edge is not aliased. */
function boxBlur(mask, w, h, radius = 1) {
  const r = Math.max(1, Math.round(radius));
  const horizontal = Buffer.alloc(w * h);
  const output = Buffer.alloc(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let n = 0;
      for (let k = -r; k <= r; k++) {
        const xx = x + k;
        if (xx < 0 || xx >= w) continue;
        sum += mask[y * w + xx];
        n++;
      }
      horizontal[y * w + x] = Math.round(sum / n);
    }
  }

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let sum = 0;
      let n = 0;
      for (let k = -r; k <= r; k++) {
        const yy = y + k;
        if (yy < 0 || yy >= h) continue;
        sum += horizontal[yy * w + x];
        n++;
      }
      output[y * w + x] = Math.round(sum / n);
    }
  }

  return output;
}

/**
 * Turns the flat surround transparent using a scanline flood fill seeded from
 * the image border. Because it only travels through connected background,
 * white pixels enclosed by artwork (the logo's lettering) are preserved.
 */
async function knockout(buffer, { luma = 234, spread = 26, softness = 0.9 } = {}) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels } = info;
  const isBackground = (px) => {
    const i = px * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return min >= luma && max - min <= spread;
  };

  const removed = new Uint8Array(w * h);
  const stack = [];

  for (let x = 0; x < w; x++) {
    stack.push(x, (h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    stack.push(y * w, y * w + w - 1);
  }

  while (stack.length) {
    const px = stack.pop();
    if (removed[px] || !isBackground(px)) continue;
    removed[px] = 1;

    const x = px % w;
    const y = (px - x) / w;
    if (x > 0) stack.push(px - 1);
    if (x < w - 1) stack.push(px + 1);
    if (y > 0) stack.push(px - w);
    if (y < h - 1) stack.push(px + w);
  }

  // Grayscale mask: 0 where the background was removed, 255 where kept.
  const mask = Buffer.alloc(w * h);
  let cleared = 0;
  for (let px = 0; px < w * h; px++) {
    if (removed[px]) cleared++;
    mask[px] = removed[px] ? 0 : 255;
  }

  // Bounding box of what survived, so the caller can crop tight. Doing this
  // here (rather than sharp's trim) avoids dark artwork being mistaken for
  // the transparent-black trim reference colour.
  let minX = w;
  let maxX = -1;
  let minY = h;
  let maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (removed[y * w + x]) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  // Separable box blur, applied in JS. Running the mask through sharp's blur
  // returns a 3-channel buffer, which silently shears when re-read as 1.
  const softMask = boxBlur(mask, w, h, softness);

  const rgb = Buffer.alloc(w * h * 3);
  for (let px = 0; px < w * h; px++) {
    const s = px * channels;
    const d = px * 3;
    rgb[d] = data[s];
    rgb[d + 1] = data[s + 1];
    rgb[d + 2] = data[s + 2];
  }

  const out = await sharp(rgb, { raw: { width: w, height: h, channels: 3 } })
    .joinChannel(softMask, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toBuffer();

  return {
    buffer: out,
    cleared: ((cleared / (w * h)) * 100).toFixed(1),
    bbox:
      maxX < 0
        ? null
        : { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 },
  };
}

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

  const encoder = name.endsWith(".webp")
    ? sharp(buffer).webp({ quality: 88, effort: 6, alphaQuality: 100 })
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

/* ── Hero visual, desktop ─────────────────────────────────────────────────── */
await build(
  DESKTOP,
  { left: 434, top: 118, width: 590, height: 668 },
  "hero-desktop.webp",
  { scale: 1.6, feather: { left: 0.17, top: 0.05, bottom: 0.09 } }
);

/* ── Hero visual, mobile ──────────────────────────────────────────────────── */
await build(
  MOBILE,
  { left: 4, top: 744, width: 845, height: 726 },
  "hero-mobile.webp",
  {
    scale: 1.25,
    feather: { left: 0.035, right: 0.035, top: 0.045, bottom: 0.07 },
  }
);

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
