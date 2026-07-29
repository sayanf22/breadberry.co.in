/**
 * Reads the exact colour out of an image so a supplied swatch never has to be
 * matched by eye.
 *
 *   node scripts/sample-colour.mjs design/swatch-green.png
 *
 * Prints the centre pixel, the most common colour, and the average, plus the
 * hue — then paste the hex into --color-leaf-200 in src/app/globals.css.
 */
import sharp from "sharp";
import path from "node:path";

const target = process.argv[2];
if (!target) {
  console.error("usage: node scripts/sample-colour.mjs <image>");
  process.exit(1);
}

const hex = (r, g, b) =>
  "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

function hue(r, g, b) {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const d = max - min;
  if (!d) return 0;
  let h;
  if (max === R) h = 60 * (((G - B) / d) % 6);
  else if (max === G) h = 60 * ((B - R) / d + 2);
  else h = 60 * ((R - G) / d + 4);
  return Math.round((h + 360) % 360);
}

const { data, info } = await sharp(path.resolve(target))
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

// Centre pixel
const cx = Math.floor(width / 2);
const cy = Math.floor(height / 2);
const ci = (cy * width + cx) * channels;
const centre = [data[ci], data[ci + 1], data[ci + 2]];

// Most common colour and average
const counts = new Map();
let rs = 0;
let gs = 0;
let bs = 0;
const total = width * height;

for (let i = 0; i < data.length; i += channels) {
  const key = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];
  counts.set(key, (counts.get(key) ?? 0) + 1);
  rs += data[i];
  gs += data[i + 1];
  bs += data[i + 2];
}

let bestKey = 0;
let bestCount = -1;
for (const [key, count] of counts) {
  if (count > bestCount) {
    bestCount = count;
    bestKey = key;
  }
}
const common = [(bestKey >> 16) & 255, (bestKey >> 8) & 255, bestKey & 255];
const avg = [rs / total, gs / total, bs / total].map(Math.round);

const report = (label, [r, g, b], extra = "") =>
  console.log(
    `${label.padEnd(14)}${hex(r, g, b)}   rgb(${r}, ${g}, ${b})   hue ${String(
      hue(r, g, b)
    ).padStart(3)}°${extra}`
  );

console.log(`${target}  ${width}x${height}\n`);
report("centre", centre);
report(
  "most common",
  common,
  `   ${((bestCount / total) * 100).toFixed(1)}% of pixels`
);
report("average", avg);
