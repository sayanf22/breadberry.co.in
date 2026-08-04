import type { ComponentType, SVGProps } from "react";

export type ClientLogoProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

/* ─────────────────────────────────────────────────────────────────────────────
   Unified 240x60 Vector Client Logos (Matched to Official Brands)
   All logos share identical 240x60 viewBox, cap-heights, baseline alignment,
   and single-color monochrome rendering (`currentColor`).
───────────────────────────────────────────────────────────────────────────── */

/* 1. TAJ HOTELS — Crest directly above the elegant serif text */
export function TajLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Taj Hotels" className={className} {...props}>
      {/* Official circular sunburst star crest on top */}
      <g transform="translate(120,16) scale(0.65)">
        <polygon points="0,-18 9,-2 0,2" />
        <polygon points="0,-18 -9,-2 0,2" />
        <polygon points="0,18 9,2 0,-2" />
        <polygon points="0,18 -9,2 0,-2" />
        <polygon points="-18,0 -2,-9 2,0" />
        <polygon points="-18,0 -2,9 2,0" />
        <polygon points="18,0 2,-9 -2,0" />
        <polygon points="18,0 2,9 -2,0" />
        <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <text x="120" y="38" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="18" fontWeight="bold" letterSpacing="4">TAJ</text>
      <text x="120" y="49" textAnchor="middle" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="6" fontWeight="600" letterSpacing="1.5">HOTELS · PALACES · RESORTS · SAFARIS</text>
    </svg>
  );
}

/* 2. THEOBROMA — lowercase elegant hand-written script/cursive style */
export function TheobromaLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Theobroma" className={className} {...props}>
      <text x="120" y="32" textAnchor="middle" fontFamily="'Brush Script MT', cursive, Georgia, serif" fontSize="29" fontStyle="italic" fontWeight="500" letterSpacing="0.5">theobroma</text>
      <text x="120" y="46" textAnchor="middle" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="8" fontWeight="700" letterSpacing="4">PATISSERIE</text>
    </svg>
  );
}

/* 3. JW MARRIOTT — Griffin logo directly above the bold sans-serif text */
export function JwMarriottLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="JW Marriott" className={className} {...props}>
      {/* Griffin emblem centered on top */}
      <g transform="translate(120,3) scale(0.48)">
        <g transform="translate(-20,0)">
          <path d="M 20,42 C 8,42 4,32 4,24 C 4,14 12,8 20,8 C 24,8 28,10 30,13" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 20,15 L 38,6 L 36,18 L 28,16 Z" />
          <path d="M 22,22 L 40,18 L 36,28 L 26,26 Z" />
          <path d="M 20,8 C 18,4 22,2 24,4 L 22,9 Z" />
          <path d="M 20,38 L 14,50 M 20,38 L 8,48" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M 18,44 L 14,50 L 16,50 L 20,46" />
        </g>
      </g>
      <text x="120" y="38" textAnchor="middle" fontFamily="'Arial Black', 'Arial Bold', sans-serif" fontSize="13.5" fontWeight="900" letterSpacing="1.8">JW MARRIOTT</text>
      <text x="120" y="49" textAnchor="middle" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="6.5" fontWeight="400" letterSpacing="2.5">HOTELS &amp; RESORTS</text>
    </svg>
  );
}

/* 4. BLUE TOKAI — Peacock badge side-by-side with wordmark */
export function BlueTokaiLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Blue Tokai" className={className} {...props}>
      <defs>
        <mask id="blue-tokai-peacock-mask">
          <rect x="0" y="0" width="240" height="60" fill="white" />
          <g fill="black" stroke="black" strokeLinecap="round">
            <path d="M 28,36 L 14,18 M 28,36 L 19,15 M 28,36 L 25,13 M 28,36 L 31,13 M 28,36 L 37,15 M 28,36 L 42,18" strokeWidth="1.5" />
            <circle cx="14" cy="17" r="2.2" />
            <circle cx="19" cy="14" r="2.2" />
            <circle cx="25" cy="12" r="2.2" />
            <circle cx="31" cy="12" r="2.2" />
            <circle cx="37" cy="14" r="2.2" />
            <circle cx="42" cy="17" r="2.2" />
            <ellipse cx="28" cy="36" rx="5" ry="8" />
            <ellipse cx="28" cy="26" rx="2.5" ry="4" />
            <circle cx="28" cy="22" r="3" />
            <path d="M 26,20 L 24,14 M 28,19 L 28,13 M 30,20 L 32,14" strokeWidth="1" />
            <circle cx="24" cy="14" r="1.5" />
            <circle cx="28" cy="13" r="1.5" />
            <circle cx="32" cy="14" r="1.5" />
          </g>
        </mask>
      </defs>
      <circle cx="28" cy="30" r="21" mask="url(#blue-tokai-peacock-mask)" />
      <text x="56" y="29" fontFamily="'Arial Black', 'Arial Bold', sans-serif" fontSize="17" fontWeight="900" letterSpacing="0.8">BLUE TOKAI</text>
      <text x="56" y="43" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="8" fontWeight="700" letterSpacing="2">COFFEE ROASTERS</text>
    </svg>
  );
}

/* 5. OBEROI HOTELS — Multi-petaled sunburst directly above the script wordmark */
export function OberoiLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Oberoi" className={className} {...props}>
      {/* Oberoi Sun crest centered on top */}
      <g transform="translate(120,15) scale(0.6)">
        <circle cx="0" cy="0" r="5"/>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 8;
          const y1 = Math.sin(rad) * 8;
          const x2 = Math.cos(rad) * 16;
          const y2 = Math.sin(rad) * 16;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>;
        })}
        <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      </g>
      <text x="120" y="38" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="19" fontWeight="bold" letterSpacing="1">Oberoi</text>
      <text x="120" y="49" textAnchor="middle" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="7" fontWeight="600" letterSpacing="2.5">HOTELS &amp; RESORTS</text>
    </svg>
  );
}

/* 6. PAUL BAKERY — Roman Serif inside double border (Monochrome Cutout) */
export function PaulLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="PAUL" className={className} {...props}>
      <rect x="10" y="8" width="220" height="44" fill="none" stroke="currentColor" strokeWidth="1.5" rx="2"/>
      <rect x="14" y="12" width="212" height="36" fill="none" stroke="currentColor" strokeWidth="0.6" rx="1"/>
      <text x="120" y="31" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="19" fontWeight="700" letterSpacing="6">PAUL</text>
      <text x="120" y="41" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="6.5" fontStyle="italic" letterSpacing="1">Maison de Qualité · Fondée en 1889</text>
    </svg>
  );
}

/* 7. HYATT — Wordmark with arched crossbar running directly through the text */
export function HyattLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Hyatt" className={className} {...props}>
      <text x="120" y="38" textAnchor="middle" fontFamily="'Arial Black', 'Arial Bold', sans-serif" fontSize="28" fontWeight="900" letterSpacing="5">HYATT</text>
      {/* Swoosh/arc integrated directly into the wordmark */}
      <path d="M 75,32 Q 120,20 165,32" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85"/>
    </svg>
  );
}

/* 8. PIZZAEXPRESS — Stacked wordmark with ornate circular filigree on the left */
export function PizzaExpressLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="PizzaExpress" className={className} {...props}>
      <g transform="translate(24,30) scale(0.95)">
        <circle cx="0" cy="0" r="21" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="0" cy="0" r="17" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        {/* Symmetrical filigree swirls */}
        <path d="M 0,-17 C -5,-12 -3,-8 0,-11 C 3,-8 5,-12 0,-17 Z" />
        <path d="M 0,17 C 5,12 3,8 0,11 C -3,8 -5,12 0,17 Z" />
        <path d="M -17,0 C -12,5 -8,3 -11,0 C -8,-3 -12,-5 -17,0 Z" />
        <path d="M 17,0 C 12,-5 8,-3 11,0 C 8,3 12,5 17,0 Z" />
      </g>
      <text x="56" y="36" fontFamily="Georgia, 'Times New Roman', serif" fontSize="24" fontWeight="bold" fontStyle="italic" letterSpacing="-0.3">PizzaExpress</text>
    </svg>
  );
}

/* 9. FORTUNE HOTELS — precise letter alignment to prevent O badge overlap across browsers */
export function FortuneLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Fortune Hotels" className={className} {...props}>
      <defs>
        {/* Mask for the O badge to create a clean wave cutout */}
        <mask id="fortune-o-mask">
          <circle cx="77" cy="24" r="10" fill="white" />
          <path d="M 65,24 Q 77,14 89,24 Q 77,34 65,24" fill="black" />
        </mask>
      </defs>
      <g fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="900" letterSpacing="0">
        <text x="48" y="32">F</text>
        {/* Circle representing the O */}
        <circle cx="77" cy="24" r="10" mask="url(#fortune-o-mask)" />
        <text x="94" y="32">R</text>
        <text x="115" y="32">T</text>
        <text x="134" y="32">U</text>
        <text x="156" y="32">N</text>
        <text x="178" y="32">E</text>
      </g>
      <line x1="45" y1="41" x2="195" y2="41" stroke="currentColor" strokeWidth="0.8"/>
      <text x="120" y="50" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="6" fontWeight="600" letterSpacing="0.8">Member ITC Hotels' Group</text>
    </svg>
  );
}

/* 10. MERWANS — Custom script/cursive wordmark with underline detail */
export function MerwansLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Merwans" className={className} {...props}>
      <text x="120" y="32" textAnchor="middle" fontFamily="'Brush Script MT', cursive, Georgia, serif" fontSize="30" fontStyle="italic" fontWeight="600" letterSpacing="0.5">Merwans</text>
      <text x="120" y="45" textAnchor="middle" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="7" fontWeight="800" letterSpacing="3">CONFECTIONERS</text>
    </svg>
  );
}

/* 11. BASTIAN — Elegant script/cursive wordmark */
export function BastianLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Bastian" className={className} {...props}>
      <text x="120" y="34" textAnchor="middle" fontFamily="'Brush Script MT', cursive, Georgia, serif" fontSize="36" fontStyle="italic" fontWeight="500">Bastian</text>
    </svg>
  );
}

/* 12. PARSI DAIRY FARM — Standing cow silhouette on left + bold condensed text */
export function ParsiDairyLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Parsi Dairy Farm" className={className} {...props}>
      {/* Standing Cow Silhouette */}
      <g transform="translate(12,18) scale(0.65)">
        <path d="M 5,18 C 10,18 12,14 14,14 C 18,14 26,11 32,12 C 34,12 36,15 37,17 L 39,17 C 41,17 41,13 40,11 C 39,9 38,7 34,6 C 30,5 24,5 18,6 C 14,7 9,9 6,11 C 4,12 2,12 1,14 C 0,15 0,17 2,17 M 6,18 L 6,29 M 9,18 L 9,29 M 31,18 L 31,29 M 34,18 L 34,29 M 38,11 L 39,13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
      <text x="60" y="27" fontFamily="'Arial Black', sans-serif" fontSize="13" fontWeight="950" letterSpacing="0.5">PARSI DAIRY</text>
      <text x="60" y="40" fontFamily="'Arial Black', sans-serif" fontSize="13" fontWeight="950" letterSpacing="0.5">FARM</text>
      <text x="60" y="50" fontFamily="'Arial', sans-serif" fontSize="6.5" fontWeight="500" letterSpacing="1">ESTABLISHED 1916</text>
    </svg>
  );
}

/* 13. OLIVE BAR & KITCHEN — Stylized leaf icon above lowercase clean sans-serif */
export function OliveLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Olive Bar &amp; Cafe" className={className} {...props}>
      {/* Hand-drawn leaf outline centered on top */}
      <g transform="translate(120,12) scale(0.7)">
        <path d="M 0,-6 C -4,-2 -2,4 0,2 C 2,4 4,-2 0,-6 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M -6,0 C -3,2 0,0 0,0" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      </g>
      <text x="120" y="38" textAnchor="middle" fontFamily="'Gill Sans', 'Optima', 'Futura', sans-serif" fontSize="25" fontWeight="300" letterSpacing="3">olive</text>
      <text x="120" y="49" textAnchor="middle" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="3.5">BAR &amp; KITCHEN</text>
    </svg>
  );
}

/* 14. MILKY MIST — Custom curved organic friendly wordmark */
export function MilkyMistLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Milky Mist" className={className} {...props}>
      <path d="M 18,12 C 18,12 11,21 11,28 C 11,33 14,36 18,36 C 22,36 25,33 25,28 C 25,21 18,12 18,12 Z"/>
      <text x="36" y="31" fontFamily="'Arial Rounded MT Bold', 'Arial', sans-serif" fontSize="21" fontWeight="700" letterSpacing="0.5">Milky Mist</text>
      <text x="36" y="44" fontFamily="'Arial', sans-serif" fontSize="7.5" fontWeight="500" letterSpacing="2">DAIRY PRODUCTS</text>
    </svg>
  );
}

/* 15. MAINLAND CHINA — Crown/gateway icon directly above uppercase wordmark */
export function MainlandChinaLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Mainland China" className={className} {...props}>
      {/* 3-pronged crown/gateway icon centered on top */}
      <path d="M 112,14 L 112,8 L 116,10 L 120,6 L 124,10 L 128,8 L 128,14 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <text x="120" y="33" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="17" fontWeight="bold" letterSpacing="2">MAINLAND CHINA</text>
      <line x1="40" y1="41" x2="200" y2="41" stroke="currentColor" strokeWidth="0.8"/>
      <text x="120" y="50" textAnchor="middle" fontFamily="'Arial Narrow', sans-serif" fontSize="7" fontWeight="600" letterSpacing="2">FINE CHINESE DINING</text>
    </svg>
  );
}

/* 16. MAPRO FOODS — Bold rounded lowercase centered inside oval border */
export function MaproLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Mapro" className={className} {...props}>
      <rect x="25" y="8" width="190" height="44" rx="22" ry="22" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      {/* macron bar over the o */}
      <line x1="152" y1="16" x2="162" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="120" y="37" textAnchor="middle" fontFamily="'Arial Black', 'Futura', sans-serif" fontSize="27" fontWeight="950" letterSpacing="0.8">mapro</text>
    </svg>
  );
}

/* 17. MIZU IZAKAYA — Kanji '水' icon above modern sans-serif */
export function MizuLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Mizu" className={className} {...props}>
      {/* Kanji 水 (Water) custom calligraphic path */}
      <g transform="translate(120,12) scale(0.8)">
        {/* vertical line with hook */}
        <path d="M 0,-8 L 0,8 C 0,10 -1,11 -3,11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        {/* left brush strokes */}
        <path d="M -8,-2 C -3,-2 -3,2 -6,3 M -9,4 C -4,4 -2,6 -5,8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        {/* right brush stroke */}
        <path d="M 0,-4 Q 6,-3 8,1 L 10,7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </g>
      <text x="120" y="36" textAnchor="middle" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="20" fontWeight="300" letterSpacing="5">MIZU</text>
      <text x="120" y="47" textAnchor="middle" fontFamily="'Arial', sans-serif" fontSize="7" fontWeight="400" letterSpacing="2">IZAKAYA</text>
    </svg>
  );
}

/* 18. EVE — Lowercase brush script handwriting wordmark */
export function EveLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="EVE" className={className} {...props}>
      <text x="120" y="38" textAnchor="middle" fontFamily="'Brush Script MT', cursive, Georgia, serif" fontSize="42" fontStyle="italic" fontWeight="400">eve</text>
    </svg>
  );
}

export const clientLogoMap: Record<string, ComponentType<ClientLogoProps>> = {
  "Taj Hotels": TajLogo,
  Theobroma: TheobromaLogo,
  "JW Marriott": JwMarriottLogo,
  "Blue Tokai": BlueTokaiLogo,
  Oberoi: OberoiLogo,
  PAUL: PaulLogo,
  Hyatt: HyattLogo,
  "Pizza Express": PizzaExpressLogo,
  "Fortune Park Lakecity": FortuneLogo,
  Merwans: MerwansLogo,
  Bastian: BastianLogo,
  "Parsi Dairy Farm": ParsiDairyLogo,
  "Olive Bar & Cafe": OliveLogo,
  "Milky Mist": MilkyMistLogo,
  "Mainland China": MainlandChinaLogo,
  Mapro: MaproLogo,
  Mizu: MizuLogo,
  EVE: EveLogo,
};
