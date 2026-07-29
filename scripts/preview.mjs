/**
 * Prints a coarse ASCII rendering of an asset so crops and background
 * knockouts can be verified without opening an image viewer.
 *
 *   node scripts/preview.mjs public/assets/logo.webp [cols]
 *
 * Left panel  = luminance (# dark … space light)
 * Right panel = alpha     (# opaque, · semi, space transparent)
 */
import sharp from "sharp";
import path from "node:path";

const args = process.argv.slice(2);
const rectArg = args.find((a) => a.startsWith("--rect="));
const positional = args.filter((a) => !a.startsWith("--"));
const [target, colsArg] = positional;

if (!target) {
  console.error(
    "usage: node scripts/preview.mjs <file> [cols] [--rect=left,top,w,h]"
  );
  process.exit(1);
}

const cols = Number(colsArg) || 72;
const file = path.resolve(target);

let pipeline = sharp(file);
if (rectArg) {
  const [left, top, width, height] = rectArg
    .slice("--rect=".length)
    .split(",")
    .map(Number);
  pipeline = pipeline.extract({ left, top, width, height });
}

const staged = await pipeline.ensureAlpha().png().toBuffer();
const meta = await sharp(staged).metadata();
const rows = Math.max(4, Math.round((cols * meta.height) / meta.width / 2.1));

const { data, info } = await sharp(staged)
  .resize(cols, rows, { fit: "fill" })
  .raw()
  .toBuffer({ resolveWithObject: true });

const shades = "@%#*+=-:. ";
const lumaLines = [];
const alphaLines = [];

for (let y = 0; y < info.height; y++) {
  let l = "";
  let a = "";
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    const alpha = info.channels === 4 ? data[i + 3] : 255;
    const luma = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;

    l += alpha < 40 ? " " : shades[Math.min(9, Math.floor(luma * 9.99))];
    a += alpha > 215 ? "#" : alpha > 60 ? "·" : " ";
  }
  lumaLines.push(l);
  alphaLines.push(a);
}

let opaqueTop = Infinity;
let opaqueBottom = -1;
let opaqueLeft = Infinity;
let opaqueRight = -1;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    const alpha = info.channels === 4 ? data[i + 3] : 255;
    if (alpha > 128) {
      opaqueTop = Math.min(opaqueTop, y);
      opaqueBottom = Math.max(opaqueBottom, y);
      opaqueLeft = Math.min(opaqueLeft, x);
      opaqueRight = Math.max(opaqueRight, x);
    }
  }
}

console.log(
  `${target}  ${meta.width}x${meta.height}  ${meta.format}  hasAlpha=${meta.hasAlpha}`
);
console.log(
  `opaque bbox (in ${cols}x${rows} preview): x ${opaqueLeft}-${opaqueRight}, y ${opaqueTop}-${opaqueBottom}\n`
);
const ruler = Array.from({ length: cols }, (_, i) =>
  i % 10 === 0 ? String((i / 10) % 10) : "."
).join("");

console.log("LUMINANCE  (@ dark … space light)");
console.log(ruler);
lumaLines.forEach((line, y) => console.log(line + " " + y));

console.log("\nALPHA  (# opaque, · semi, space transparent)");
console.log(ruler);
alphaLines.forEach((line, y) => console.log(line + " " + y));
