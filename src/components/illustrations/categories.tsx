import type { ReactElement, SVGProps } from "react";
import type { ProductCategory } from "@/lib/products";

/**
 * Category illustrations — one flat scene per range.
 *
 * Drawn on a 64×64 canvas with a consistent 2px navy outline so all six tiles
 * look like one set. Colours come from the site palette. Fills are opaque and
 * shapes are large enough to read clearly at 56px tile-size on a phone.
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
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── IQF Berries ─────────────────────────────────────────────────────────── */
export function BerriesIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* snow crystal top-right */}
      <g stroke={ink} strokeWidth={1.6} strokeLinecap="round">
        <line x1="50" y1="7" x2="50" y2="17" />
        <line x1="45" y1="9.3" x2="55" y2="14.7" />
        <line x1="55" y1="9.3" x2="45" y2="14.7" />
      </g>

      {/* large strawberry */}
      <path
        d="M28 54c-5-7-9-17-6-25 2-6 8-10 13-10 5 0 9 3.5 10.5 8.5 2.5 8.5-2 21-7.5 26.5"
        fill="#d94a5a"
        {...L}
      />
      <path
        d="M28 54c-5.5-7-9-17-6-25"
        fill="none"
        stroke="#f28090"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* seeds */}
      <ellipse cx="33" cy="36" rx="1.2" ry="1.6" fill={cream} transform="rotate(-10 33 36)" />
      <ellipse cx="39" cy="38" rx="1.2" ry="1.6" fill={cream} transform="rotate(10 39 38)" />
      <ellipse cx="35" cy="46" rx="1.2" ry="1.6" fill={cream} />
      {/* hull */}
      <path d="M35 19c-1.5-5.5 1-9.5 6-11-.8 5-3 8.5-6 11Z" fill={lime} {...L} strokeWidth={1.8} />

      {/* blueberry cluster */}
      <circle cx="17" cy="38" r="7" fill="#5b7ec8" {...L} />
      <circle cx="17" cy="38" r="7" fill="url(#bblue)" />
      <defs>
        <radialGradient id="bblue" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#7fa0e0" />
          <stop offset="100%" stopColor="#5b7ec8" />
        </radialGradient>
      </defs>
      {/* berry sheen */}
      <path d="M13.5 34.5c1.5-1.5 4-2 5.5-.5" stroke="#9bbce8" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx="14" cy="32" r="1.6" fill="#4a6db5" {...L} strokeWidth={1.2} />
      <circle cx="22" cy="33" r="1.6" fill="#4a6db5" {...L} strokeWidth={1.2} />
    </svg>
  );
}

/* ── Fruit Purees ────────────────────────────────────────────────────────── */
export function PureeIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* bowl lower */}
      <path
        d="M10 38c0 10.5 9.5 18 22 18s22-7.5 22-18"
        fill="#fdefd0"
        {...L}
      />
      <path d="M10 38h44" {...L} />
      {/* puree surface inside */}
      <ellipse cx="32" cy="38" rx="18" ry="5" fill="#f5a634" opacity="0.9" />
      {/* swirl */}
      <path
        d="M32 38c-3-2-6-2-7 1"
        stroke="#c77b10"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />

      {/* fruit halves scattered above */}
      {/* passion-fruit half */}
      <circle cx="23" cy="24" r="8" fill="#f5a634" {...L} />
      <circle cx="23" cy="24" r="8" fill="url(#pfill)" />
      <defs>
        <radialGradient id="pfill" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#f8c060" />
          <stop offset="100%" stopColor="#f5a634" />
        </radialGradient>
      </defs>
      <circle cx="23" cy="24" r="5" fill="#c77b10" opacity="0.2" />
      {/* seeds */}
      {[[-1.5, -2], [1.5, -2.5], [0, 1], [-2.2, 1], [2.2, 1]].map(([dx, dy], i) => (
        <ellipse key={i} cx={23 + dx} cy={24 + dy} rx="0.9" ry="1.3" fill="#7a4a0a" transform={`rotate(${i * 36} ${23 + dx} ${24 + dy})`} />
      ))}

      {/* raspberry right */}
      <circle cx="44" cy="21" r="6.5" fill="#c03050" {...L} />
      <path
        d="M40 20c1-3 3.5-4 7-3.5"
        stroke="#e06080"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      {/* drupelets */}
      {[[0, -2], [2.5, -1.5], [-2.5, -1.5], [0, 1.5], [2.5, 1]].map(([dx, dy], i) => (
        <circle key={i} cx={44 + dx} cy={21 + dy} r="1.5" fill="#e06080" {...L} strokeWidth={1} />
      ))}
    </svg>
  );
}

/* ── Fresh Produce ───────────────────────────────────────────────────────── */
export function FreshIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* thick asparagus spear, left */}
      <rect x="10" y="16" width="5.5" height="36" rx="2.75" fill="#7fc050" {...L} />
      <path
        d="M12.75 16c-3-5 1-10 4-10-1 4-2.5 7-4 10Z"
        fill={lime}
        {...L}
        strokeWidth={1.6}
      />

      {/* tomato, centre */}
      <circle cx="34" cy="40" r="14" fill="#e03a4e" {...L} />
      <circle cx="34" cy="40" r="14" fill="url(#tomfill)" />
      <defs>
        <radialGradient id="tomfill" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#ee6070" />
          <stop offset="100%" stopColor="#d02840" />
        </radialGradient>
      </defs>
      {/* stem */}
      <path d="M34 26c0-4.5 3-7 6.5-7-1.5 3.5-4 5.5-6.5 7Z" fill="#5a9a30" {...L} strokeWidth={1.8} />
      <line x1="34" y1="26" x2="34" y2="24" {...L} />
      {/* sheen */}
      <path d="M26 34c2.5-3.5 7-4.5 10-3" stroke="#f07080" strokeWidth={2} strokeLinecap="round" fill="none" opacity="0.8" />

      {/* leafy green, top right */}
      <path
        d="M48 12c3 5 2 12-3 17-3-5-2-13 3-17Z"
        fill="#7fc050"
        {...L}
        strokeWidth={1.6}
      />
      <path d="M45 29c2-5 3-11 3-17" stroke={lime} strokeWidth={1.6} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ── Bakery & Japanese ───────────────────────────────────────────────────── */
export function BakeryIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* maki roll — three concentric rings */}
      <circle cx="25" cy="38" r="18" fill="#1a3b2a" {...L} />
      <circle cx="25" cy="38" r="13" fill={cream} {...L} />
      <circle cx="25" cy="38" r="6.5" fill="#d03050" {...L} />
      {/* wasabi dot */}
      <circle cx="20.5" cy="33.5" r="2.5" fill={lime} {...L} />

      {/* gyoza dumpling — right side */}
      <path
        d="M42 26c7 0 14 3.5 14 9.5S49 45 42 45c-7 0-13-4-13-9.5S35 26 42 26Z"
        fill="#f8e8c0"
        {...L}
      />
      {/* pleats */}
      <path d="M36 31l3 8M42 30l1 9M47 31l-2 8" stroke={ink} strokeWidth={1.7} strokeLinecap="round" />
      {/* golden fry line */}
      <path
        d="M32.5 42c2.5 2.5 6 3.5 9.5 3.5"
        stroke="#c8880a"
        strokeWidth={2.5}
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
      {/* fish body */}
      <path
        d="M10 34c6-12 20-17 30-12 5 2.5 8.5 7 9.5 12-1 5-4.5 9.5-9.5 12-10 5-24 2-30-12Z"
        fill="#f5917a"
        {...L}
      />
      <path
        d="M10 34c6-12 20-17 30-12"
        fill="none"
        stroke="#f8b0a0"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* tail */}
      <path
        d="M10 34c-3.5-4-6.5-5.5-9-5 1 3.5 1.5 6.5 0 10 2.5-.5 5.5-2 9-5Z"
        fill="#e87060"
        {...L}
      />
      {/* dorsal fin */}
      <path
        d="M28 22c4 3.5 6 8 6 12"
        fill="none"
        stroke="#e87060"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {/* eye */}
      <circle cx="44" cy="30" r="2.5" fill={cream} {...L} />
      <circle cx="44" cy="30" r="1.2" fill={ink} />
      {/* scales suggestion */}
      <path d="M25 30c2 2 4 2.5 6 1.5M30 36c2 2 4 2.5 6 1.5" stroke={cream} strokeWidth={1.5} strokeLinecap="round" fill="none" opacity="0.75" />

      {/* cold-wave */}
      <path
        d="M6 55c5-3 8-3 12 0s7 3 12 0 7-3 12 0 7-3 12-3"
        stroke={lime}
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ── All Products (crate) ────────────────────────────────────────────────── */
export function AllRangesIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* crate body */}
      <path
        d="M9 34h46l-3.5 20a4 4 0 0 1-4 3.5H16.5a4 4 0 0 1-4-3.5L9 34Z"
        fill={cream}
        {...L}
      />
      {/* slat lines */}
      <line x1="23" y1="36" x2="21" y2="54.5" {...L} strokeWidth={1.8} />
      <line x1="32" y1="36" x2="32" y2="55" {...L} strokeWidth={1.8} />
      <line x1="41" y1="36" x2="43" y2="54.5" {...L} strokeWidth={1.8} />
      {/* lime rim */}
      <rect x="7" y="28" width="50" height="7.5" rx="3.75" fill={lime} {...L} />

      {/* produce peeking over rim */}
      {/* strawberry */}
      <circle cx="20" cy="25" r="7" fill="#d94a5a" {...L} />
      <path d="M20 18c-1.5-4.5 1-8 5-9-.5 4-2 7-5 9Z" fill="#7fc050" {...L} strokeWidth={1.8} />
      {/* blueberry */}
      <circle cx="32" cy="22" r="6" fill="#5b7ec8" {...L} />
      <circle cx="29" cy="19.5" r="2.2" fill="#4a6db5" {...L} strokeWidth={1.2} />
      {/* lemon */}
      <ellipse cx="44" cy="23" rx="7" ry="5.5" fill="#f8d050" {...L} />
      <path d="M37 23c1.5-2 4-3.5 7-3.5" stroke="#f0b020" strokeWidth={1.6} strokeLinecap="round" fill="none" />
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
