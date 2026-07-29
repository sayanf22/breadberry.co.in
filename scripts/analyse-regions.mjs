/**
 * Diagnostic helper. Scores candidate crop rectangles so assets can be cut
 * without eyeballing the mockups:
 *   leaf%  – green-dominant pixels (foliage)
 *   ink%   – dark navy pixels (headline text bleeding into the crop)
 *   pale%  – near-white pixels (empty background)
 */
import sharp from "sharp";
import { DESKTOP, MOBILE } from "./sources.mjs";

const FILES = { desktop: DESKTOP, mobile: MOBILE };

async function score(which, rect) {
  const { data, info } = await sharp(FILES[which])
    .extract(rect)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const total = info.width * info.height;
  let leaf = 0;
  let ink = 0;
  let pale = 0;

  for (let i = 0; i < data.length; i += 3) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;

    if (g > r + 12 && g > b + 10 && luma < 225) leaf++;
    else if (luma < 120) ink++;
    else if (r > 236 && g > 236 && b > 236) pale++;
  }

  const pct = (n) => ((n / total) * 100).toFixed(1).padStart(5);
  return `${which.padEnd(7)} ${JSON.stringify(rect).padEnd(52)} leaf ${pct(
    leaf
  )}%  ink ${pct(ink)}%  pale ${pct(pale)}%`;
}

const candidates = [
  // Mobile mockup — leaf band right of the headline, below the h1
  ["mobile", { left: 660, top: 500, width: 193, height: 320 }],
  ["mobile", { left: 600, top: 560, width: 253, height: 300 }],
  ["mobile", { left: 560, top: 240, width: 293, height: 240 }],
  // Desktop mockup — inside the hero art panel (guaranteed text-free)
  ["desktop", { left: 820, top: 130, width: 204, height: 300 }],
  ["desktop", { left: 760, top: 120, width: 264, height: 340 }],
  ["desktop", { left: 850, top: 150, width: 174, height: 260 }],
  // Logo region sanity check
  ["mobile", { left: 24, top: 0, width: 224, height: 124 }],
];

for (const [which, rect] of candidates) {
  console.log(await score(which, rect));
}
