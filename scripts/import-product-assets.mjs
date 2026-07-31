/**
 * Normalises the supplied product photography into card/detail pack shots.
 *
 * Source: the archives in ../images, extracted to ../images/extracted.
 * Output: public/assets/products/<slug>.webp
 *
 * Every product image is rendered at one portrait size that satisfies both
 * crops used on the site (196/232 on cards, 196/262 on the detail page), so
 * a single request serves both and Next can resize down from there.
 *
 *   node scripts/import-product-assets.mjs
 */
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve("..", "images", "extracted");
const OUT_DIR = path.resolve("public", "assets", "products");

/** Tall enough for the 196/262 detail crop at 2x on a phone. */
const WIDTH = 780;
const HEIGHT = 1040;

/** Folder name in the archives -> catalogue category id. */
const FOLDER_CATEGORY = {
  "Breadberry Frozen Products": "frozen",
  "Fresh Imported Vegetable & Fruits": "fresh",
  "Frozen Bakery & Japanese Products": "pantry",
  "Frozen Seafood": "seafood",
};

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[_&]+/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function collect() {
  const folders = await readdir(SOURCE_DIR, { withFileTypes: true });
  const items = [];

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;
    const category = FOLDER_CATEGORY[folder.name];
    if (!category) {
      console.warn(`Skipping unmapped folder: ${folder.name}`);
      continue;
    }

    const dir = path.join(SOURCE_DIR, folder.name);
    for (const file of await readdir(dir)) {
      if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
      items.push({
        source: path.join(dir, file),
        file,
        category,
        folder: folder.name,
        slug: toSlug(file),
      });
    }
  }

  return items.sort((a, b) => a.slug.localeCompare(b.slug));
}

const items = await collect();
await mkdir(OUT_DIR, { recursive: true });

const seen = new Map();
const manifest = [];
let bytes = 0;

for (const item of items) {
  if (seen.has(item.slug)) {
    throw new Error(
      `Duplicate slug "${item.slug}" from ${item.file} and ${seen.get(item.slug)}`
    );
  }
  seen.set(item.slug, item.file);

  const outPath = path.join(OUT_DIR, `${item.slug}.webp`);

  await sharp(await readFile(item.source))
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .webp({ quality: 74, effort: 6 })
    .toFile(outPath);

  const { size } = await stat(outPath);
  bytes += size;
  manifest.push({
    slug: item.slug,
    file: item.file,
    folder: item.folder,
    category: item.category,
    image: `/assets/products/${item.slug}.webp`,
    kb: Math.round(size / 102.4) / 10,
  });
}

// Kept outside public/ so the manifest is never served to visitors.
await writeFile(
  path.resolve("scripts", "product-assets.manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);

const byCategory = manifest.reduce((acc, entry) => {
  acc[entry.category] = (acc[entry.category] ?? 0) + 1;
  return acc;
}, {});

console.log(`Wrote ${manifest.length} pack shots to ${OUT_DIR}`);
console.log(`Total: ${(bytes / 1024 / 1024).toFixed(2)} MB`);
console.log(
  `Average: ${Math.round(bytes / manifest.length / 1024)} KB per image`
);
console.table(byCategory);
