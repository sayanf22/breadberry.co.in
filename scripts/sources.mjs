/**
 * Resolves the design mockups used to cut the site's image assets.
 *
 * `design/` inside the repo is authoritative so a fresh clone can re-run the
 * asset pipeline. The original delivery folder is kept as a fallback.
 */
import path from "node:path";
import { existsSync } from "node:fs";

const CANDIDATES = [
  {
    label: "design/",
    desktop: path.resolve("design", "reference-desktop.png"),
    mobile: path.resolve("design", "reference-mobile.png"),
  },
  {
    label: "../images/ (original delivery)",
    desktop: path.resolve(
      "..",
      "images",
      "file_00000000e5fc8207a293adb42d49dbb5.png"
    ),
    mobile: path.resolve(
      "..",
      "images",
      "ChatGPT Image Jul 29, 2026, 04_41_08 PM.png"
    ),
  },
];

const found = CANDIDATES.find(
  (candidate) => existsSync(candidate.desktop) && existsSync(candidate.mobile)
);

if (!found) {
  console.error(
    "Could not find the design mockups. Expected:\n" +
      CANDIDATES.map((c) => `  - ${c.desktop}`).join("\n")
  );
  process.exit(1);
}

/** Desktop mockup — 1024 x 1536 */
export const DESKTOP = found.desktop;
/** Mobile mockup — 853 x 1844 */
export const MOBILE = found.mobile;
export const SOURCE_LABEL = found.label;
