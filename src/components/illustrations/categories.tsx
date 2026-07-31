import type { ReactElement, SVGProps } from "react";
import type { ProductCategory } from "@/lib/products";

/**
 * Category illustrations — High-detail, vibrant vector artwork.
 *
 * Drawn on a 64×64 canvas with consistent navy outlines (#0b2c4f) and rich palette.
 * Crisp, recognizable food geometry designed for clean presentation.
 */
type Props = SVGProps<SVGSVGElement>;

const ink = "#0b2c4f";
const lime = "#c3ffab";
const cream = "#fdfbf5";

const frame = {
  viewBox: "0 0 64 64",
  fill: "none",
  "aria-hidden": true,
  focusable: false,
} as const;

const L: React.SVGAttributes<SVGElement> = {
  stroke: ink,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── IQF Berries ─────────────────────────────────────────────────────────── */
export function BerriesIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      <defs>
        <radialGradient id="strawHighDetail" cx="35%" cy="25%">
          <stop offset="0%" stopColor="#ff5e72" />
          <stop offset="60%" stopColor="#e02239" />
          <stop offset="100%" stopColor="#b01024" />
        </radialGradient>
        <radialGradient id="blueHighDetail" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#89b2ff" />
          <stop offset="50%" stopColor="#527de0" />
          <stop offset="100%" stopColor="#2e4ba1" />
        </radialGradient>
      </defs>

      {/* IQF Frost Snowflake (top right) */}
      <g stroke="#3a75c4" strokeWidth={1.8} strokeLinecap="round">
        <line x1="49" y1="5" x2="49" y2="17" />
        <line x1="43" y1="11" x2="55" y2="11" />
        <line x1="44.7" y1="6.7" x2="53.3" y2="15.3" />
        <line x1="53.3" y1="6.7" x2="44.7" y2="15.3" />
        <circle cx="49" cy="5" r="0.9" fill="#3a75c4" />
        <circle cx="49" cy="17" r="0.9" fill="#3a75c4" />
        <circle cx="43" cy="11" r="0.9" fill="#3a75c4" />
        <circle cx="55" cy="11" r="0.9" fill="#3a75c4" />
      </g>

      {/* Large ripe strawberry */}
      <path
        d="M23 54c-6-8-9.5-18-6-25.5C20 22 26 19 31.5 19c5.5 0 9.5 3 11 8 2.5 8.5-2 21-7.5 27C31.5 57.5 26 58 23 54Z"
        fill="url(#strawHighDetail)"
        {...L}
      />

      {/* Strawberry sheen highlight arc */}
      <path
        d="M20 29.5c2.5-4 7.5-6.5 11.5-6"
        stroke="#ff9ebb"
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Strawberry seeds */}
      <ellipse cx="27" cy="32" rx="1" ry="1.6" fill="#ffe49e" transform="rotate(-15 27 32)" />
      <ellipse cx="34" cy="34" rx="1" ry="1.6" fill="#ffe49e" transform="rotate(10 34 34)" />
      <ellipse cx="29" cy="41" rx="1" ry="1.6" fill="#ffe49e" transform="rotate(-5 29 41)" />
      <ellipse cx="35" cy="43" rx="1" ry="1.6" fill="#ffe49e" transform="rotate(12 35 43)" />
      <ellipse cx="26" cy="48" rx="0.9" ry="1.4" fill="#ffe49e" transform="rotate(-10 26 48)" />

      {/* Strawberry green hull leaves */}
      <path d="M31.5 19c-4-4-9-4-12-1c3.5 3.5 7.5 4 12 1Z" fill={lime} {...L} strokeWidth={1.6} />
      <path d="M31.5 19c4-4 9-4 12-1c-3.5 3.5-7.5 4-12 1Z" fill={lime} {...L} strokeWidth={1.6} />
      <path d="M31.5 19c-1-5.5 1-9.5 5.5-11c-.5 5-2.5 8.5-5.5 11Z" fill="#6cbd39" {...L} strokeWidth={1.6} />

      {/* Plump Blueberry (bottom left) */}
      <circle cx="15.5" cy="41" r="7.5" fill="url(#blueHighDetail)" {...L} />
      <path d="M12 37.5c1.8-1.8 4.5-2.2 6.5-.8" stroke="#d6e4ff" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <circle cx="12.5" cy="35" r="1.5" fill="#253b7d" stroke={ink} strokeWidth={1.1} />

      {/* Secondary Blueberry */}
      <circle cx="22.5" cy="47" r="5" fill="url(#blueHighDetail)" {...L} />
      <path d="M19.5 44.5c1.2-1.2 3.2-1.5 4.5-.5" stroke="#d6e4ff" strokeWidth={1.3} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ── Fruit Purees ────────────────────────────────────────────────────────── */
export function PureeIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      <defs>
        <radialGradient id="pureeSurfaceDetail" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#ffc03d" />
          <stop offset="60%" stopColor="#f5910f" />
          <stop offset="100%" stopColor="#d96c00" />
        </radialGradient>
        <radialGradient id="passionPulp" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#ffe17d" />
          <stop offset="100%" stopColor="#f79c14" />
        </radialGradient>
      </defs>

      {/* Ceramic Dessert Bowl Base */}
      <path
        d="M10 35c0 12 9.5 20.5 22 20.5s22-8.5 22-20.5H10Z"
        fill={cream}
        {...L}
        strokeWidth={2}
      />
      <path d="M8 35h48" {...L} strokeWidth={2.2} />

      {/* Silky Puree Liquid Surface */}
      <ellipse cx="32" cy="35" rx="21.5" ry="6" fill="url(#pureeSurfaceDetail)" />
      <ellipse cx="32" cy="35" rx="21.5" ry="6" fill="none" stroke={ink} strokeWidth={1.8} />

      {/* Puree Swirl Accent */}
      <path
        d="M23 35c3.5 3 9 3.5 13.5 0c4-3 8-2 10.5 1"
        stroke="#b85200"
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
      />

      {/* Cut Passionfruit Half (top left) */}
      <circle cx="21" cy="21" r="9" fill="#54250c" {...L} />
      <circle cx="21" cy="21" r="7.2" fill="url(#passionPulp)" />
      <circle cx="21" cy="21" r="5" fill="#e07b00" opacity="0.25" />
      {/* Seeds */}
      <circle cx="19" cy="19" r="1.2" fill="#3b1704" />
      <circle cx="23.5" cy="18.5" r="1.2" fill="#3b1704" />
      <circle cx="18.5" cy="23" r="1.2" fill="#3b1704" />
      <circle cx="23.5" cy="23" r="1.2" fill="#3b1704" />
      <circle cx="21" cy="24.5" r="1.2" fill="#3b1704" />

      {/* Fresh Raspberry (top right) */}
      <circle cx="44" cy="19" r="7.5" fill="#d92344" {...L} />
      <path d="M40 17.5c1.2-3.2 4.2-4.8 7.8-4.2" stroke="#ff859d" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      {/* Drupelets */}
      <circle cx="41.5" cy="17" r="1.7" fill="#ff4d6a" stroke={ink} strokeWidth={1} />
      <circle cx="46.5" cy="17" r="1.7" fill="#ff4d6a" stroke={ink} strokeWidth={1} />
      <circle cx="44" cy="21.5" r="1.7" fill="#ff4d6a" stroke={ink} strokeWidth={1} />

      {/* Puree Drop Accent */}
      <path
        d="M32 21c-1.5 2.5-3 4.5-3 6a3 3 0 0 0 6 0c0-1.5-1.5-3.5-3-6Z"
        fill="#f5910f"
        {...L}
        strokeWidth={1.4}
      />
    </svg>
  );
}

/* ── Fresh Produce ───────────────────────────────────────────────────────── */
export function FreshIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      <defs>
        <radialGradient id="tomDetail" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#ff5260" />
          <stop offset="60%" stopColor="#e01b2d" />
          <stop offset="100%" stopColor="#aa0d1b" />
        </radialGradient>
        <linearGradient id="cucDetail" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8ce647" />
          <stop offset="100%" stopColor="#519e1b" />
        </linearGradient>
        <radialGradient id="avoDetail" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#b4e643" />
          <stop offset="100%" stopColor="#55871b" />
        </radialGradient>
      </defs>

      {/* Fresh Avocado Half (left) */}
      <ellipse cx="18" cy="38" rx="8" ry="11" fill="url(#avoDetail)" transform="rotate(-15 18 38)" {...L} />
      <circle cx="17.5" cy="40" r="4.2" fill="#78481c" stroke={ink} strokeWidth={1.4} />
      <circle cx="16.5" cy="38.5" r="1" fill="#a66a2e" />

      {/* Crisp Cucumber Spear (center left) */}
      <rect x="25" y="16" width="6.5" height="37" rx="3.25" fill="url(#cucDetail)" {...L} />
      <path d="M28.25 20v28" stroke="#3b7813" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="2 4" />

      {/* Glossy Heirloom Tomato (center right) */}
      <circle cx="42" cy="38" r="14" fill="url(#tomDetail)" {...L} />
      {/* Tomato sheen arc */}
      <path d="M33 33c2.5-3.5 7-4.5 10.5-3" stroke="#ff9eaa" strokeWidth={2} strokeLinecap="round" fill="none" opacity="0.85" />
      {/* 5-point Star Calyx */}
      <path
        d="M42 24l1.5 3.5 3.5-1.5-2 3.2 3.5 1.8-3.7.8.8 3.7-3-2.5-3 2.5.8-3.7-3.7-.8 3.5-1.8-2-3.2 3.5 1.5Z"
        fill="#529e1b"
        {...L}
        strokeWidth={1.4}
      />
      <path d="M42 24c0-4 3-6.5 6-6" stroke={ink} strokeWidth={1.8} strokeLinecap="round" fill="none" />

      {/* Fresh Mint Leaf (top right) */}
      <path
        d="M51 10c3.5 5.5 2.5 13-3 18.5-3.5-5.5-2.5-14 3-18.5Z"
        fill="#6cc22e"
        {...L}
        strokeWidth={1.6}
      />
      <path d="M48 28.5c2.2-5.5 3.5-12 3-18.5" stroke={lime} strokeWidth={1.6} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ── Bakery & Japanese ───────────────────────────────────────────────────── */
export function BakeryIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      <defs>
        <radialGradient id="salmonDetail" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#ff9478" />
          <stop offset="100%" stopColor="#e64225" />
        </radialGradient>
        <linearGradient id="gyozaDetail" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff6e3" />
          <stop offset="100%" stopColor="#f5cd7a" />
        </linearGradient>
      </defs>

      {/* Maki Sushi Roll (left) */}
      <circle cx="23" cy="38" r="17.5" fill="#0e261a" {...L} strokeWidth={2} />
      <circle cx="23" cy="38" r="13" fill={cream} {...L} />
      <circle cx="23" cy="38" r="13" fill="none" stroke="#e3ddcf" strokeWidth={1.5} />

      {/* Rice texture grains */}
      <circle cx="14.5" cy="35" r="0.9" fill="#ccc4b0" />
      <circle cx="16" cy="44" r="0.9" fill="#ccc4b0" />
      <circle cx="30" cy="43" r="0.9" fill="#ccc4b0" />
      <circle cx="29" cy="32" r="0.9" fill="#ccc4b0" />

      {/* Salmon core */}
      <path d="M23 38m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" fill="url(#salmonDetail)" {...L} strokeWidth={1.6} />
      <path d="M19.5 36.5c2 1 5 1 7 0M19 39.5c2 1 5 1 7 0" stroke="#ffc7ba" strokeWidth={1.3} strokeLinecap="round" />

      {/* Avocado & Egg inserts */}
      <path d="M18 34c1.5-2 4-2.5 5-1Z" fill="#7cc22d" stroke={ink} strokeWidth={1} />
      <path d="M23 42c2 1.5 4.5 1 5-.5Z" fill="#ffd33b" stroke={ink} strokeWidth={1} />

      {/* Wasabi dollop */}
      <circle cx="17.5" cy="23.5" r="3.2" fill="#8bc34a" {...L} strokeWidth={1.5} />

      {/* Golden Gyoza Dumpling (right) */}
      <path
        d="M42 24c7.5 0 15 3.5 15 10s-7.5 11-15 11c-7.5 0-14-4.5-14-11S34.5 24 42 24Z"
        fill="url(#gyozaDetail)"
        {...L}
        strokeWidth={1.8}
      />
      {/* Pleat lines */}
      <path d="M35 30l3.5 7M42 29l1 8.5M48.5 30l-2.5 7.5M53 32l-4 6" stroke={ink} strokeWidth={1.8} strokeLinecap="round" />
      {/* Golden Fried edge */}
      <path
        d="M31.5 42.5c3 3 7.5 4 12 3.5c3.5-.5 7-2 9.5-4"
        stroke="#c97b0a"
        strokeWidth={2.8}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ── Frozen Seafood ──────────────────────────────────────────────────────── */
export function SeafoodIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      <defs>
        <radialGradient id="fishBodyDetail" cx="40%" cy="30%">
          <stop offset="0%" stopColor="#ffa08c" />
          <stop offset="60%" stopColor="#e85b40" />
          <stop offset="100%" stopColor="#b83820" />
        </radialGradient>
        <linearGradient id="finDetail" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffbba8" />
          <stop offset="100%" stopColor="#cc442b" />
        </linearGradient>
      </defs>

      {/* Fish Tail Fin */}
      <path
        d="M12 34c-4-5-7.5-6.5-10.5-6c1.2 4.5 1.8 7.5 0 12c3-.5 6.5-2 10.5-6Z"
        fill="url(#finDetail)"
        {...L}
      />
      <path d="M3 30.5c2.5 1 5 2.5 7.5 3.5M3 37.5c2.5-1 5-2.5 7.5-3.5" stroke={ink} strokeWidth={1.3} />

      {/* Dorsal Fin */}
      <path
        d="M26 21c4.5-5 10-6 13.5-3.5c-1 3.5-3.5 6.5-7.5 8"
        fill="url(#finDetail)"
        {...L}
        strokeWidth={1.7}
      />

      {/* Sleek Fish Body */}
      <path
        d="M12 34c6.5-13 21.5-17.5 32-12c5.5 2.8 9 7.5 10 12c-1 4.5-4.5 9.5-10 12.5-10.5 5.5-25.5 1-32-12.5Z"
        fill="url(#fishBodyDetail)"
        {...L}
        strokeWidth={2}
      />

      {/* Belly highlight curve */}
      <path
        d="M14 36c6 8 18.5 11.5 27 7.5"
        stroke="#ffccc2"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />

      {/* Gill Curve */}
      <path d="M40 26.5c-2.5 3.5-2.5 9.5 0 13" stroke={ink} strokeWidth={1.8} strokeLinecap="round" fill="none" />

      {/* Eye */}
      <circle cx="46" cy="30" r="2.8" fill={cream} stroke={ink} strokeWidth={1.6} />
      <circle cx="46.8" cy="29.5" r="1.3" fill={ink} />

      {/* Scale patterns */}
      <path d="M24 30c2.5 2 5 2 7.5 0M29 35c2.5 2 5 2 7.5 0M20 35c2.5 2 5 2 7.5 0" stroke={cream} strokeWidth={1.6} strokeLinecap="round" fill="none" opacity="0.85" />

      {/* Sub-zero Frozen Ocean Wave Line */}
      <path
        d="M5 55c5.5-3 9-3 13.5 0s9 3 13.5 0s9-3 13.5 0s8-3 13.5 0"
        stroke="#7ee8fa"
        strokeWidth={2.6}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ── All Products (Woven Produce Basket) ─────────────────────────────────── */
export function AllRangesIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      <defs>
        <linearGradient id="basketWoodDetail" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fffdf7" />
          <stop offset="100%" stopColor="#f0e2ca" />
        </linearGradient>
        <radialGradient id="allStrawDetail" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#ff5e72" />
          <stop offset="100%" stopColor="#d91834" />
        </radialGradient>
        <radialGradient id="allLemonDetail" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#fff275" />
          <stop offset="100%" stopColor="#eab308" />
        </radialGradient>
      </defs>

      {/* Strawberry (left) */}
      <circle cx="20" cy="24" r="7.5" fill="url(#allStrawDetail)" {...L} />
      <path d="M20 16.5c-1.5-4 1.5-7.5 5.5-8.5-.5 3.5-2.5 6.5-5.5 8.5Z" fill="#6cbd39" {...L} strokeWidth={1.5} />
      <circle cx="18" cy="23" r="0.7" fill="#ffe49e" />
      <circle cx="22" cy="24" r="0.7" fill="#ffe49e" />

      {/* Blueberry (center) */}
      <circle cx="32" cy="21" r="6.5" fill="#527de0" {...L} />
      <circle cx="29" cy="18.5" r="1.6" fill="#253b7d" stroke={ink} strokeWidth={1.1} />
      <path d="M30 19.5c1-1 2.5-1.2 3.5-.5" stroke="#d6e4ff" strokeWidth={1.3} strokeLinecap="round" fill="none" />

      {/* Lemon (right) */}
      <ellipse cx="44" cy="23" rx="7.5" ry="6" fill="url(#allLemonDetail)" transform="rotate(-10 44 23)" {...L} />
      <path d="M38 22.5c1.8-2 4.5-3 7.5-2.5" stroke="#fffcc2" strokeWidth={1.5} strokeLinecap="round" fill="none" />

      {/* Leaf (back right) */}
      <path d="M49 14c3 3 4 8 1 12c-3-3-4-8-1-12Z" fill={lime} {...L} strokeWidth={1.5} />

      {/* Wooden Produce Basket body */}
      <path
        d="M10 33h44l-3.5 20a4.5 4.5 0 0 1 -4.5 4H18a4.5 4.5 0 0 1 -4.5 -4L10 33Z"
        fill="url(#basketWoodDetail)"
        {...L}
        strokeWidth={2}
      />

      {/* Basket weave vertical lines */}
      <line x1="23" y1="35" x2="21" y2="55" {...L} strokeWidth={1.8} />
      <line x1="32" y1="35" x2="32" y2="56" {...L} strokeWidth={1.8} />
      <line x1="41" y1="35" x2="43" y2="55" {...L} strokeWidth={1.8} />

      {/* Soft Rim */}
      <rect x="7" y="27" width="50" height="8" rx="4" fill={lime} {...L} strokeWidth={2} />
    </svg>
  );
}

/** Drawing plus tile tint for every rail option, including "All products". */
export const categoryArt: Record<
  "all" | ProductCategory,
  { Art: (props: Props) => ReactElement; tone: string }
> = {
  all: { Art: AllRangesIllustration, tone: "bg-[#eef8e8]" },
  iqf: { Art: BerriesIllustration, tone: "bg-tint-raspberry" },
  puree: { Art: PureeIllustration, tone: "bg-tint-passion" },
  fresh: { Art: FreshIllustration, tone: "bg-tint-leaf" },
  japanese: { Art: BakeryIllustration, tone: "bg-tint-sand" },
  seafood: { Art: SeafoodIllustration, tone: "bg-tint-ocean" },
};
