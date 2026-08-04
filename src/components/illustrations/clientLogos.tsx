import type { ComponentType, SVGProps } from "react";

export type ClientLogoProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

/* ─────────────────────────────────────────────────────────────────────────────
   Unified 240x60 Vector Client Logos
   All logos share identical 240x60 viewBox, cap-heights, baseline alignment,
   and single-color monochrome rendering (`currentColor`).
───────────────────────────────────────────────────────────────────────────── */

/* 1. TAJ HOTELS */
export function TajLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Taj Hotels" className={className} {...props}>
      <g transform="translate(22,30)">
        <polygon points="0,-16  9,-2  0,2" />
        <polygon points="0,-16 -9,-2  0,2" />
        <polygon points="0,16   9,2   0,-2" />
        <polygon points="0,16  -9,2   0,-2" />
        <polygon points="-16,0 -2,-9  2,0" />
        <polygon points="-16,0 -2,9   2,0" />
        <polygon points=" 16,0  2,-9 -2,0" />
        <polygon points=" 16,0  2,9  -2,0" />
      </g>
      <text x="48" y="32" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="bold" letterSpacing="5">TAJ</text>
      <text x="48" y="45" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="6.5" fontWeight="600" letterSpacing="2">HOTELS · PALACES · RESORTS · SAFARIS</text>
    </svg>
  );
}

/* 2. THEOBROMA */
export function TheobromaLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Theobroma" className={className} {...props}>
      <text x="12" y="34" fontFamily="Georgia, 'Times New Roman', serif" fontSize="26" fontStyle="italic" fontWeight="400" letterSpacing="0.5">theobroma</text>
      <text x="14" y="48" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="8" fontWeight="700" letterSpacing="4.5">PATISSERIE</text>
    </svg>
  );
}

/* 3. JW MARRIOTT */
export function JwMarriottLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="JW Marriott" className={className} {...props}>
      <g transform="translate(10,8) scale(0.85)">
        <path d="M 20,42 C 8,42 4,32 4,24 C 4,14 12,8 20,8 C 24,8 28,10 30,13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 20,15 L 38,6 L 36,18 L 28,16 Z" />
        <path d="M 22,22 L 40,18 L 36,28 L 26,26 Z" />
        <path d="M 20,8 C 18,4 22,2 24,4 L 22,9 Z" />
        <path d="M 20,38 L 14,50 M 20,38 L 8,48" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 18,44 L 14,50 L 16,50 L 20,46" />
      </g>
      <text x="50" y="31" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="17" fontWeight="900" letterSpacing="1.5">JW MARRIOTT</text>
      <text x="50" y="44" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="7.5" fontWeight="400" letterSpacing="2.5">HOTELS &amp; RESORTS</text>
    </svg>
  );
}

/* 4. BLUE TOKAI */
export function BlueTokaiLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Blue Tokai" className={className} {...props}>
      <g transform="translate(24,30)">
        <circle cx="0" cy="0" r="21" />
        {/* Cutout details using masking/opacity */}
        <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <ellipse cx="0" cy="4" rx="4" ry="7" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="0" cy="-6" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M -8,-8 L -13,-14 M -4,-11 L -7,-17 M 0,-12 L 0,-18 M 4,-11 L 7,-17 M 8,-8 L 13,-14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
      </g>
      <text x="54" y="30" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="17" fontWeight="900" letterSpacing="1">BLUE TOKAI</text>
      <text x="54" y="44" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="8" fontWeight="600" letterSpacing="2.5">COFFEE ROASTERS</text>
    </svg>
  );
}

/* 5. OBEROI HOTELS */
export function OberoiLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Oberoi" className={className} {...props}>
      <g transform="translate(26,30)">
        <circle cx="0" cy="0" r="6"/>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 9;
          const y1 = Math.sin(rad) * 9;
          const x2 = Math.cos(rad) * 17;
          const y2 = Math.sin(rad) * 17;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>;
        })}
        <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      </g>
      <text x="56" y="31" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="bold" letterSpacing="1">Oberoi</text>
      <text x="56" y="45" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="2.5">HOTELS &amp; RESORTS</text>
    </svg>
  );
}

/* 6. PAUL BAKERY */
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

/* 7. HYATT */
export function HyattLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Hyatt" className={className} {...props}>
      <text x="120" y="38" textAnchor="middle" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="28" fontWeight="700" letterSpacing="5">HYATT</text>
      <path d="M 125,23 Q 131,18 137,23" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* 8. PIZZAEXPRESS */
export function PizzaExpressLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Pizza Express" className={className} {...props}>
      <g transform="translate(26,30)">
        <circle cx="0" cy="0" r="21" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="0" cy="0" r="17" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        <circle cx="0" cy="-9" r="1.5"/>
        <circle cx="0" cy="9" r="1.5"/>
        <circle cx="-9" cy="0" r="1.5"/>
        <circle cx="9" cy="0" r="1.5"/>
      </g>
      <text x="56" y="27" fontFamily="Georgia, 'Times New Roman', serif" fontSize="16" fontWeight="700" letterSpacing="0.5" fontStyle="italic">Pizza</text>
      <text x="56" y="44" fontFamily="Georgia, 'Times New Roman', serif" fontSize="16" fontWeight="700" letterSpacing="0.5" fontStyle="italic">Express</text>
    </svg>
  );
}

/* 9. FORTUNE HOTELS */
export function FortuneLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Fortune Park Lakecity" className={className} {...props}>
      <line x1="20" y1="12" x2="220" y2="12" stroke="currentColor" strokeWidth="0.8"/>
      <text x="120" y="32" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="19" fontWeight="700" fontStyle="italic" letterSpacing="2">Fortune</text>
      <text x="120" y="44" textAnchor="middle" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="6.5" fontWeight="400" letterSpacing="2">AN ITC HOTELS BRAND</text>
      <line x1="20" y1="49" x2="220" y2="49" stroke="currentColor" strokeWidth="0.8"/>
    </svg>
  );
}

/* 10. MERWANS */
export function MerwansLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Merwans" className={className} {...props}>
      <text x="14" y="34" fontFamily="Georgia, 'Times New Roman', serif" fontSize="26" fontWeight="700" fontStyle="italic" letterSpacing="1">Merwans</text>
      <text x="16" y="48" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="8" fontWeight="700" letterSpacing="3.5">CONFECTIONERS</text>
    </svg>
  );
}

/* 11. BASTIAN */
export function BastianLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Bastian" className={className} {...props}>
      <line x1="20" y1="14" x2="220" y2="14" stroke="currentColor" strokeWidth="0.8"/>
      <text x="120" y="34" textAnchor="middle" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="20" fontWeight="600" letterSpacing="8">BASTIAN</text>
      <line x1="20" y1="42" x2="220" y2="42" stroke="currentColor" strokeWidth="0.8"/>
      <text x="120" y="52" textAnchor="middle" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="6.5" fontWeight="400" letterSpacing="3">MUMBAI</text>
    </svg>
  );
}

/* 12. PARSI DAIRY FARM */
export function ParsiDairyLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Parsi Dairy Farm" className={className} {...props}>
      <path d="M 22,12 C 22,12 15,21 15,28 C 15,33 18,37 22,37 C 26,37 29,33 29,28 C 29,21 22,12 22,12 Z"/>
      <text x="42" y="24" fontFamily="'Arial Black', 'Arial Bold', sans-serif" fontSize="12" fontWeight="900" letterSpacing="1">PARSI DAIRY</text>
      <text x="42" y="39" fontFamily="'Arial Black', 'Arial Bold', sans-serif" fontSize="12" fontWeight="900" letterSpacing="1">FARM</text>
      <text x="42" y="49" fontFamily="'Arial', sans-serif" fontSize="6.5" fontWeight="400" letterSpacing="1.5">ESTABLISHED 1916</text>
    </svg>
  );
}

/* 13. OLIVE BAR & KITCHEN */
export function OliveLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Olive Bar &amp; Cafe" className={className} {...props}>
      <text x="14" y="34" fontFamily="'Gill Sans', 'Optima', 'Futura', sans-serif" fontSize="28" fontWeight="300" letterSpacing="4">olive</text>
      <text x="16" y="48" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="8" fontWeight="600" letterSpacing="4">BAR &amp; KITCHEN</text>
    </svg>
  );
}

/* 14. MILKY MIST */
export function MilkyMistLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Milky Mist" className={className} {...props}>
      <path d="M 18,12 C 18,12 11,21 11,28 C 11,33 14,36 18,36 C 22,36 25,33 25,28 C 25,21 18,12 18,12 Z"/>
      <text x="36" y="31" fontFamily="'Arial Rounded MT Bold', 'Arial', sans-serif" fontSize="21" fontWeight="700" letterSpacing="0.5">Milky Mist</text>
      <text x="36" y="44" fontFamily="'Arial', sans-serif" fontSize="7.5" fontWeight="500" letterSpacing="2">DAIRY PRODUCTS</text>
    </svg>
  );
}

/* 15. MAINLAND CHINA */
export function MainlandChinaLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Mainland China" className={className} {...props}>
      <line x1="12" y1="12" x2="228" y2="12" stroke="currentColor" strokeWidth="1"/>
      <text x="120" y="31" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="19" fontWeight="600" letterSpacing="1.5">Mainland China</text>
      <line x1="12" y1="39" x2="228" y2="39" stroke="currentColor" strokeWidth="1"/>
      <text x="120" y="50" textAnchor="middle" fontFamily="'Arial Narrow', sans-serif" fontSize="7" fontWeight="400" letterSpacing="2.5">FINE CHINESE DINING</text>
    </svg>
  );
}

/* 16. MAPRO FOODS */
export function MaproLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Mapro" className={className} {...props}>
      <text x="120" y="36" textAnchor="middle" fontFamily="'Arial Black', 'Futura', sans-serif" fontSize="28" fontWeight="900" letterSpacing="1">mapro</text>
      <text x="120" y="49" textAnchor="middle" fontFamily="'Arial', sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="3">FOODS</text>
    </svg>
  );
}

/* 17. MIZU IZAKAYA */
export function MizuLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="Mizu" className={className} {...props}>
      <path d="M 12,24 Q 22,14 32,24 Q 42,34 52,24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 12,30 Q 22,20 32,30 Q 42,40 52,30" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      <text x="60" y="32" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="23" fontWeight="300" letterSpacing="5">MIZU</text>
      <text x="60" y="45" fontFamily="'Arial', sans-serif" fontSize="7" fontWeight="400" letterSpacing="3">IZAKAYA</text>
    </svg>
  );
}

/* 18. EVE */
export function EveLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" aria-label="EVE" className={className} {...props}>
      <line x1="20" y1="14" x2="220" y2="14" stroke="currentColor" strokeWidth="0.8"/>
      <text x="120" y="35" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="400" letterSpacing="10">EVE</text>
      <line x1="20" y1="42" x2="220" y2="42" stroke="currentColor" strokeWidth="0.8"/>
      <text x="120" y="52" textAnchor="middle" fontFamily="'Arial Narrow', sans-serif" fontSize="6.5" fontWeight="400" letterSpacing="3">MUMBAI</text>
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
