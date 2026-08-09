/**
 * Turns the supplied logo artwork into every asset the site serves:
 * transparent logo (webp + png), favicons, PWA icons, Apple touch icon and the
 * Open Graph card.
 *
 * The white background is removed with a border-seeded flood fill rather than a
 * global "near-white is transparent" threshold. That distinction matters here:
 * the wordmark is white script type sitting inside the purple banner, and a
 * global threshold would punch holes straight through it. Only white that is
 * reachable from the canvas edge is treated as background.
 *
 *   node scripts/build-logo-assets.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "design/logo-source.png";
const PUBLIC = "public";
const ASSETS = join(PUBLIC, "assets");
const ICONS = join(PUBLIC, "icons");

/* Background detection. A pixel counts as background-white when every channel
   is at or above this level; the feather ramp below softens the cut so the
   artwork keeps its anti-aliased edge instead of going jagged. */
const WHITE = 232;
const FEATHER_FLOOR = 196;
const PAD = 6;

/** Flood fill inwards from the canvas edge, marking reachable white pixels. */
function backgroundMask(data, width, height, channels) {
  const total = width * height;
  const isWhite = new Uint8Array(total);

  for (let i = 0; i < total; i++) {
    const p = i * channels;
    if (data[p] >= WHITE && data[p + 1] >= WHITE && data[p + 2] >= WHITE) {
      isWhite[i] = 1;
    }
  }

  const mask = new Uint8Array(total);
  /* Plain array as a stack: the fill is one pass over a 1.6MP image, so an
     explicit stack is both faster and safer than recursion here. */
  const stack = [];

  const seed = (index) => {
    if (isWhite[index] && !mask[index]) {
      mask[index] = 1;
      stack.push(index);
    }
  };

  for (let x = 0; x < width; x++) {
    seed(x);
    seed((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    seed(y * width);
    seed(y * width + width - 1);
  }

  while (stack.length) {
    const index = stack.pop();
    const x = index % width;
    const y = (index - x) / width;

    if (x > 0) seed(index - 1);
    if (x < width - 1) seed(index + 1);
    if (y > 0) seed(index - width);
    if (y < height - 1) seed(index + width);
  }

  return mask;
}

/** RGB(A) buffer in, straight-alpha RGBA buffer out with the backdrop cut. */
function knockout(data, width, height, channels) {
  const mask = backgroundMask(data, width, height, channels);
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const src = i * channels;
    const dst = i * 4;
    const r = data[src];
    const g = data[src + 1];
    const b = data[src + 2];

    out[dst] = r;
    out[dst + 1] = g;
    out[dst + 2] = b;

    if (mask[i]) {
      out[dst + 3] = 0;
      continue;
    }

    /* Kept pixels touching the background get a partial alpha scaled by how
       light they are, which removes the white halo along the cut edge. */
    const x = i % width;
    const y = (i - x) / width;
    const touchesBg =
      (x > 0 && mask[i - 1]) ||
      (x < width - 1 && mask[i + 1]) ||
      (y > 0 && mask[i - width]) ||
      (y < height - 1 && mask[i + width]);

    if (!touchesBg) {
      out[dst + 3] = 255;
      continue;
    }

    const lightest = Math.max(r, g, b);
    if (lightest <= FEATHER_FLOOR) {
      out[dst + 3] = 255;
    } else {
      const ramp = (lightest - FEATHER_FLOOR) / (255 - FEATHER_FLOOR);
      out[dst + 3] = Math.round(255 * (1 - ramp * 0.85));
    }
  }

  return out;
}

/** Minimal ICO container wrapping PNG payloads, which sharp cannot emit. */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

/* ── Knock out the backdrop, then trim to the artwork ─────────────────────── */

await mkdir(ASSETS, { recursive: true });
await mkdir(ICONS, { recursive: true });

const source = sharp(await readFile(SRC));
const { width, height, channels } = await source
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ info }) => info);

const raw = await source.raw().toBuffer();

const cut = sharp(knockout(raw, width, height, channels), {
  raw: { width, height, channels: 4 },
})
  .trim({ threshold: 0 })
  .extend({
    top: PAD,
    bottom: PAD,
    left: PAD,
    right: PAD,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

const master = await cut.png().toBuffer();
const shape = await sharp(master).metadata();
console.log(`source ${width}x${height} → trimmed ${shape.width}x${shape.height}`);

/* ── Site logo. Two widths so the header stays crisp on retina ───────────── */

/**
 * `images.unoptimized` is on — the project ships pre-sized static assets and
 * Next serves `src` verbatim, so `sizes` cannot shrink the download. The header
 * mark paints at 96 CSS px at most, so 384px covers a 3x phone and a 2x desktop
 * with headroom. A 960px master would put 128KB on the critical path for a
 * 96px image.
 */
const LOGO_W = 384;

await sharp(master)
  .resize({ width: LOGO_W, withoutEnlargement: true })
  .webp({ quality: 90, effort: 6 })
  .toFile(join(ASSETS, "logo-mark.webp"));

const logoShape = await sharp(join(ASSETS, "logo-mark.webp")).metadata();
console.log(`logo-mark.webp ${logoShape.width}x${logoShape.height}`);

/* The PNG is not rendered in the page — it is the asset crawlers fetch for the
   Organization `logo` property. Half width and a tuned palette keep it under
   100KB; the berries are photographic, so a full-width PNG runs to ~900KB. */
await sharp(master)
  .resize({ width: 512, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true, quality: 92, effort: 10 })
  .toFile(join(ASSETS, "logo-mark.png"));

/* ── Square icon. The artwork is wide, so it is letterboxed into a square
      canvas with breathing room, otherwise it renders as a thin sliver ───── */

const squareTransparent = async (size, padRatio = 0.08) => {
  const inner = Math.round(size * (1 - padRatio * 2));
  const art = await sharp(master)
    .resize({ width: inner, height: inner, fit: "inside" })
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: art, gravity: "center" }])
    .png()
    .toBuffer();
};

const squareOnWhite = async (size, padRatio = 0.1) => {
  const inner = Math.round(size * (1 - padRatio * 2));
  const art = await sharp(master)
    .resize({ width: inner, height: inner, fit: "inside" })
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: art, gravity: "center" }])
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
};

for (const size of [192, 512]) {
  const plate = await squareTransparent(size);
  await writeFile(
    join(ICONS, `icon-${size}.png`),
    await sharp(plate).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer()
  );
}

/* Maskable icons are cropped to a circle by Android, so the safe zone is the
   middle 80% — the artwork is inset further and sits on an opaque plate. */
await writeFile(join(ICONS, "maskable-512.png"), await squareOnWhite(512, 0.19));

/* Apple ignores transparency and composites on black, so this one is flattened. */
await writeFile(join(ICONS, "apple-touch-icon.png"), await squareOnWhite(180));

/* ── Favicons ─────────────────────────────────────────────────────────────── */

const faviconSizes = [16, 32, 48];
const faviconPngs = [];

for (const size of faviconSizes) {
  /* Small favicons drop the padding: at 16px every pixel of artwork counts. */
  const data = await squareTransparent(size, size <= 32 ? 0.02 : 0.05);
  faviconPngs.push({ size, data });
  await writeFile(join(ICONS, `favicon-${size}.png`), data);
}

await writeFile(join(PUBLIC, "favicon.ico"), ico(faviconPngs));

/* ── Open Graph card ──────────────────────────────────────────────────────── */

const OG_W = 1200;
const OG_H = 630;

const ogArt = await sharp(master)
  .resize({ width: 760, height: 420, fit: "inside" })
  .toBuffer();

const ogBackdrop = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
     <defs>
       <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0" stop-color="#ffffff"/>
         <stop offset="0.55" stop-color="#f6f8fb"/>
         <stop offset="1" stop-color="#eef8e8"/>
       </linearGradient>
     </defs>
     <rect width="${OG_W}" height="${OG_H}" fill="url(#bg)"/>
     <rect y="${OG_H - 10}" width="${OG_W}" height="10" fill="#0b2c4f"/>
   </svg>`
);

await sharp(ogBackdrop)
  .composite([
    { input: ogArt, gravity: "north", top: 74, left: (OG_W - 760) / 2 },
    {
      input: Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="120">
           <text x="${OG_W / 2}" y="46" text-anchor="middle"
                 font-family="Georgia, 'Times New Roman', serif" font-size="34"
                 fill="#0b2c4f">Premium Frozen Berries &amp; Purees</text>
           <text x="${OG_W / 2}" y="88" text-anchor="middle"
                 font-family="Helvetica, Arial, sans-serif" font-size="21"
                 letter-spacing="2.4" fill="#5c7386">
             BY ADHIRA ENTERPRISES · MUMBAI, INDIA
           </text>
         </svg>`
      ),
      top: OG_H - 150,
      left: 0,
    },
  ])
  .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
  .toFile(join(PUBLIC, "og.jpg"));

console.log("logo, icons, favicon.ico and og.jpg written");
