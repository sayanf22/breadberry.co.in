/**
 * Verifies the catalogue against the supplied photography.
 *
 * The client's instruction is that product names match the supplied image
 * names exactly, so this asserts, for every product:
 *   - a pack shot exists for its slug
 *   - its name equals the source file name (extension and trailing "_" only)
 *   - no pack shot is left unused
 *
 *   node scripts/check-product-names.mjs
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const manifest = JSON.parse(
  await readFile(path.resolve("scripts", "product-assets.manifest.json"), "utf8")
);

/** Reads name/slug pairs straight from the source, no bundler needed. */
const source = await readFile(path.resolve("src", "lib", "products.ts"), "utf8");
const entries = [
  ...source.matchAll(/slug:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)"/g),
].map(([, slug, name]) => ({ slug, name }));

const expected = new Map(
  manifest.map((item) => [
    item.slug,
    item.file.replace(/\.[a-z0-9]+$/i, "").replace(/[_\s]+$/, ""),
  ])
);

const problems = [];

for (const { slug, name } of entries) {
  const want = expected.get(slug);
  if (!want) {
    problems.push(`No supplied image for slug "${slug}" (name: ${name})`);
    continue;
  }
  if (name !== want) {
    problems.push(`Name mismatch for ${slug}:\n    is:     ${name}\n    should: ${want}`);
  }
}

const covered = new Set(entries.map((entry) => entry.slug));
for (const slug of expected.keys()) {
  if (!covered.has(slug)) problems.push(`Image not used by any product: ${slug}`);
}

if (problems.length > 0) {
  console.error(`${problems.length} problem(s) found:\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(
  `All ${entries.length} product names match their supplied image names.`
);
