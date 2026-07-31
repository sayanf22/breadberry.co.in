import type { ReactElement, SVGProps } from "react";
import type { ProductCategory } from "@/lib/products";

/**
 * Category illustrations.
 *
 * Flat, hand-built SVG drawings rather than photography: the pack shots are
 * inconsistent at thumbnail size — the puree tub is white on cream and simply
 * disappeared — and a drawing per range reads instantly at 88px on a phone.
 *
 * Every drawing uses the site palette and a single navy outline weight, so the
 * six sit together as one set.
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

/** Shared outline treatment — keeps every drawing on the same weight. */
const line = {
  stroke: ink,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BerriesIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* Frozen mark */}
      <g {...line} strokeWidth={1.8}>
        <path d="M49 9v11M44 11.5l10 6M54 11.5l-10 6" />
      </g>

      {/* Blueberry */}
      <circle cx="19" cy="36" r="9.5" fill="#5b7fc4" {...line} />
      <path d="M15 33.5l4 4 4-4" stroke="#dbe6f8" strokeWidth={2} strokeLinecap="round" />

      {/* Strawberry */}
      <path
        d="M28 34c0-6 5-9.5 10-9.5S48 28 48 34c0 9-6 18-10 18s-10-9-10-18Z"
        fill="#e2495f"
        {...line}
      />
      <g fill={cream}>
        <ellipse cx="34" cy="35" rx="1.3" ry="1.8" />
        <ellipse cx="42" cy="35" rx="1.3" ry="1.8" />
        <ellipse cx="38" cy="42" rx="1.3" ry="1.8" />
      </g>

      {/* Hull */}
      <path d="M38 24.5c-1-4.5 2-8 7-8.5-.5 4.5-2.5 7.5-7 8.5Z" fill={lime} {...line} />
    </svg>
  );
}

export function PureeIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* Fruit half */}
      <circle cx="47" cy="18" r="7.5" fill="#f2b03a" {...line} />
      <circle cx="47" cy="18" r="3" fill="#8c4b12" opacity="0.55" />

      {/* Tub */}
      <path
        d="M20 28h24l-2.4 22.5a3.5 3.5 0 0 1-3.5 3.1H25.9a3.5 3.5 0 0 1-3.5-3.1L20 28Z"
        fill={cream}
        {...line}
      />
      {/* Puree fill */}
      <path d="M23 37h18l-1.7 14.6H24.7L23 37Z" fill="#f2b03a" opacity="0.9" />
      {/* Lid */}
      <rect x="17" y="22" width="30" height="6.5" rx="3.25" fill={lime} {...line} />
    </svg>
  );
}

export function FreshIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* Spear */}
      <path d="M46 20c4 6 3 15-2 22" stroke="#7fbf5a" strokeWidth={4} strokeLinecap="round" />
      <path d="M46 20c4 6 3 15-2 22" {...line} strokeWidth={1.6} opacity="0.5" />

      {/* Leaves */}
      <path
        d="M32 22c-8-2-14 2-15 9 7 2 13-1 15-9Z"
        fill={lime}
        {...line}
      />
      <path d="M17 31c5-3 10-5 15-9" {...line} strokeWidth={1.5} opacity="0.6" />

      {/* Tomato */}
      <circle cx="27" cy="42" r="11" fill="#e2495f" {...line} />
      <path
        d="M27 31c-1.5-3 0-5.5 3-6-0.3 2.6-1 4.4-3 6Z"
        fill="#7fbf5a"
        {...line}
        strokeWidth={1.6}
      />
      <path d="M22 39.5c1.5-2 3.5-3 5.5-3" stroke={cream} strokeWidth={2} strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function BakeryIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* Maki roll */}
      <circle cx="24" cy="38" r="12" fill="#1d4030" {...line} />
      <circle cx="24" cy="38" r="8" fill={cream} {...line} strokeWidth={1.6} />
      <circle cx="24" cy="38" r="3.4" fill="#e2495f" />
      <circle cx="21" cy="35" r="1.4" fill={lime} />

      {/* Folded pastry / gyoza */}
      <path
        d="M34 30c6-6 14-6 19-1-3 7-9 11-16 10l-3-9Z"
        fill="#f4e3bd"
        {...line}
      />
      <path d="M38 29.5l2 7M43 27.5l1.5 7.5M48 27.5l0.5 6.5" {...line} strokeWidth={1.5} opacity="0.7" />
    </svg>
  );
}

export function SeafoodIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* Fish */}
      <path
        d="M13 34c7-10 20-13 29-8 4 2 6.5 5 7.5 8-1 3-3.5 6-7.5 8-9 5-22 2-29-8Z"
        fill="#f2907a"
        {...line}
      />
      {/* Tail */}
      <path d="M13 34c-3.5-3.5-6-4.5-8.5-4.5 1 3 1 6 0 9 2.5 0 5-1 8.5-4.5Z" fill="#e2705a" {...line} />
      {/* Fin */}
      <path d="M28 26c3 2.5 4.5 5.5 4.5 8" {...line} strokeWidth={1.6} opacity="0.75" />
      <circle cx="43" cy="31" r="1.8" fill={ink} />

      {/* Cold water line */}
      <path d="M14 50c4-2.5 7-2.5 11 0s7 2.5 11 0 7-2.5 11 0" stroke={lime} strokeWidth={2.6} strokeLinecap="round" />
    </svg>
  );
}

export function AllRangesIllustration(props: Props) {
  return (
    <svg {...frame} {...props}>
      {/* Contents peeking over the rim */}
      <circle cx="24" cy="24" r="6.5" fill="#5b7fc4" {...line} />
      <circle cx="37" cy="22" r="7.5" fill="#e2495f" {...line} />
      <path d="M45 26c-1-5 1.5-9 6.5-10-0.5 5-2 8.5-6.5 10Z" fill={lime} {...line} />

      {/* Crate */}
      <path
        d="M12 33h40l-3 17.5a4 4 0 0 1-4 3.3H19a4 4 0 0 1-4-3.3L12 33Z"
        fill={cream}
        {...line}
      />
      <path d="M24 39.5l1.5 10M32 39.5v10M40 39.5l-1.5 10" {...line} strokeWidth={1.6} opacity="0.65" />
      <rect x="10" y="28" width="44" height="6" rx="3" fill={lime} {...line} />
    </svg>
  );
}

/** Drawing plus tile tint for every rail option, including "All products". */
export const categoryArt: Record<
  "all" | ProductCategory,
  { Art: (props: Props) => ReactElement; tone: string }
> = {
  all: { Art: AllRangesIllustration, tone: "bg-cream" },
  iqf: { Art: BerriesIllustration, tone: "bg-tint-raspberry" },
  puree: { Art: PureeIllustration, tone: "bg-tint-passion" },
  fresh: { Art: FreshIllustration, tone: "bg-tint-leaf" },
  japanese: { Art: BakeryIllustration, tone: "bg-tint-sand" },
  seafood: { Art: SeafoodIllustration, tone: "bg-tint-ocean" },
};
