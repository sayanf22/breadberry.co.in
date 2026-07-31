import type { ComponentType, SVGProps } from "react";

export type ClientLogoProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

/* ─────────────────────────────────────────────────────────────────────────────
   1. TAJ HOTELS — Official TAJ wordmark with kite/diamond motif
   Real logo: stylised kite/arrow mark + "TAJ" large serif + "HOTELS • PALACES • RESORTS • SAFARIS"
───────────────────────────────────────────────────────────────────────────── */
export function TajLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 280 60" fill="currentColor" aria-label="Taj Hotels" className={className} {...props}>
      {/* Iconic TAJ kite/diamond icon — 4-pointed star / kite mark */}
      <g transform="translate(14,30)">
        {/* Four kite quadrants forming the Taj emblem */}
        <polygon points="0,-18  10,-2  0,2" />
        <polygon points="0,-18 -10,-2  0,2" />
        <polygon points="0,18  10,2   0,-2" />
        <polygon points="0,18 -10,2   0,-2" />
        <polygon points="-18,0  -2,-10  2,0" />
        <polygon points="-18,0  -2,10   2,0" />
        <polygon points=" 18,0   2,-10 -2,0" />
        <polygon points=" 18,0   2,10  -2,0" />
      </g>
      {/* TAJ wordmark */}
      <text x="44" y="34" fontFamily="Georgia, 'Times New Roman', serif" fontSize="26" fontWeight="bold" letterSpacing="6">TAJ</text>
      {/* Sub-line */}
      <text x="44" y="48" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="7" fontWeight="400" letterSpacing="2.5">HOTELS · PALACES · RESORTS · SAFARIS</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. THEOBROMA — Official italic serif wordmark + "PATISSERIE" tag
   Real logo: lowercase "theobroma" in italic humanist serif, + "PATISSERIE" in caps below/beside
───────────────────────────────────────────────────────────────────────────── */
export function TheobromaLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 310 56" fill="currentColor" aria-label="Theobroma" className={className} {...props}>
      <text
        x="10" y="36"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="30"
        fontStyle="italic"
        fontWeight="400"
        letterSpacing="0.5"
      >theobroma</text>
      <text
        x="14" y="50"
        fontFamily="'Arial', 'Helvetica', sans-serif"
        fontSize="9"
        fontWeight="700"
        letterSpacing="5"
      >PATISSERIE</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. JW MARRIOTT — Official griffin silhouette + bold sans-serif wordmark
   Real logo: Griffin facing right (wings up) + "JW MARRIOTT" bold sans + "HOTELS & RESORTS" small
───────────────────────────────────────────────────────────────────────────── */
export function JwMarriottLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 300 60" fill="currentColor" aria-label="JW Marriott" className={className} {...props}>
      {/* Griffin emblem — stylised silhouette */}
      <g transform="translate(8,6) scale(0.9)">
        {/* Body */}
        <path d="M 20,42 C 8,42 4,32 4,24 C 4,14 12,8 20,8 C 24,8 28,10 30,13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        {/* Wing upper */}
        <path d="M 20,15 L 38,6 L 36,18 L 28,16 Z" />
        {/* Wing lower */}
        <path d="M 22,22 L 40,18 L 36,28 L 26,26 Z" />
        {/* Head/beak */}
        <path d="M 20,8 C 18,4 22,2 24,4 L 22,9 Z" />
        {/* Tail */}
        <path d="M 20,38 L 14,50 M 20,38 L 8,48" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Talons */}
        <path d="M 18,44 L 14,50 L 16,50 L 20,46" />
      </g>
      {/* Wordmark */}
      <text x="52" y="30" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="20" fontWeight="900" letterSpacing="2">JW MARRIOTT</text>
      <text x="52" y="45" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="8.5" fontWeight="400" letterSpacing="3.5">HOTELS &amp; RESORTS</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. BLUE TOKAI — Official peacock-in-circle emblem + bold sans wordmark
   Real logo: Solid circle with stylized peacock silhouette inside + "BLUE TOKAI" bold + "COFFEE ROASTERS"
───────────────────────────────────────────────────────────────────────────── */
export function BlueTokaiLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 290 60" fill="currentColor" aria-label="Blue Tokai" className={className} {...props}>
      {/* Circle badge */}
      <circle cx="28" cy="30" r="25" />
      {/* Peacock silhouette inside circle (white = cut out via clip or overlay) */}
      <circle cx="28" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="0"/>
      {/* Peacock body in white (inverted) */}
      <g fill="white">
        {/* Tail fan - multiple feather lines */}
        <path d="M 28,36 L 14,18 M 28,36 L 19,15 M 28,36 L 25,13 M 28,36 L 31,13 M 28,36 L 37,15 M 28,36 L 42,18" stroke="white" strokeWidth="1.2" fill="none"/>
        {/* Tail dots */}
        <circle cx="14" cy="17" r="2"/>
        <circle cx="19" cy="14" r="2"/>
        <circle cx="25" cy="12" r="2"/>
        <circle cx="31" cy="12" r="2"/>
        <circle cx="37" cy="14" r="2"/>
        <circle cx="42" cy="17" r="2"/>
        {/* Body */}
        <ellipse cx="28" cy="36" rx="5" ry="8"/>
        {/* Neck & head */}
        <ellipse cx="28" cy="26" rx="2.5" ry="4"/>
        <circle cx="28" cy="22" r="3"/>
        {/* Crest */}
        <path d="M 26,20 L 24,14 M 28,19 L 28,13 M 30,20 L 32,14" stroke="white" strokeWidth="1" fill="none"/>
        <circle cx="24" cy="14" r="1.5"/>
        <circle cx="28" cy="13" r="1.5"/>
        <circle cx="32" cy="14" r="1.5"/>
      </g>
      {/* Wordmark */}
      <text x="62" y="27" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="18" fontWeight="900" letterSpacing="1">BLUE TOKAI</text>
      <text x="62" y="44" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="9" fontWeight="500" letterSpacing="2.5">COFFEE ROASTERS</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. OBEROI HOTELS — Official "Oberoi Sun" circular emblem + elegant serif wordmark
   Real logo: Concentric rays sun burst + "Oberoi" elegant mixed-case serif + "HOTELS & RESORTS"
   Updated 2019 with the Oberoi Sun symbol
───────────────────────────────────────────────────────────────────────────── */
export function OberoiLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 270 60" fill="currentColor" aria-label="Oberoi" className={className} {...props}>
      {/* Oberoi Sun: central disc + radiating rays */}
      <g transform="translate(30,30)">
        {/* Central filled circle */}
        <circle cx="0" cy="0" r="7"/>
        {/* 12 radial rays */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = Math.cos(rad) * 10;
          const y1 = Math.sin(rad) * 10;
          const x2 = Math.cos(rad) * 20;
          const y2 = Math.sin(rad) * 20;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>;
        })}
        {/* Outer ring */}
        <circle cx="0" cy="0" r="24" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      </g>
      {/* Wordmark */}
      <text x="66" y="30" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="bold" letterSpacing="1">Oberoi</text>
      <text x="66" y="44" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="8" fontWeight="600" letterSpacing="2.5">HOTELS &amp; RESORTS</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. PAUL BAKERY — Official bordered rectangular logotype
   Real logo: "PAUL" bold serif in thin rectangular border + "MAISON DE QUALITÉ" italic + "FONDÉE EN 1889"
───────────────────────────────────────────────────────────────────────────── */
export function PaulLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 270 60" fill="currentColor" aria-label="PAUL" className={className} {...props}>
      {/* Outer thin rectangle */}
      <rect x="4" y="4" width="262" height="52" fill="none" stroke="currentColor" strokeWidth="1.5" rx="2"/>
      {/* Inner thin rectangle */}
      <rect x="9" y="9" width="252" height="42" fill="none" stroke="currentColor" strokeWidth="0.7" rx="1"/>
      {/* PAUL text centered */}
      <text x="135" y="32" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="700" letterSpacing="8">PAUL</text>
      {/* Tagline */}
      <text x="135" y="44" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="7.5" fontStyle="italic" letterSpacing="1.5">Maison de Qualité · Fondée en 1889</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   7. HYATT — Official sans-serif wordmark with distinctive "A" arc
   Real logo: "HYATT" in clean bold sans-serif with a red arched crossbar on the "A"
   Rendered here in monochrome with a subtle arch detail on the A
───────────────────────────────────────────────────────────────────────────── */
export function HyattLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 230 56" fill="currentColor" aria-label="Hyatt" className={className} {...props}>
      {/* H */}
      <text x="10" y="36" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="30" fontWeight="700" letterSpacing="4">HYATT</text>
      {/* Distinctive arc over the A — approximated by drawing an arc over the 3rd letter A */}
      {/* The A in HYATT starts around x=104. Arc sits at crossbar level */}
      <path
        d="M 119,22 Q 127,17 135,22"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. PIZZAEXPRESS — Official Art Nouveau filigree circular badge + logotype
   Real logo: Ornate circular badge with swirling Art Nouveau flourishes + "PizzaExpress" script inside
───────────────────────────────────────────────────────────────────────────── */
export function PizzaExpressLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 280 60" fill="currentColor" aria-label="Pizza Express" className={className} {...props}>
      {/* Circular badge with Art Nouveau ornamentation */}
      <g transform="translate(30,30)">
        {/* Outer ring */}
        <circle cx="0" cy="0" r="26" fill="none" stroke="currentColor" strokeWidth="2"/>
        {/* Inner ring */}
        <circle cx="0" cy="0" r="22" fill="none" stroke="currentColor" strokeWidth="0.8"/>
        {/* Art Nouveau swirl ornaments at cardinal points */}
        <path d="M 0,-22 Q -6,-16 -4,-10 Q 0,-14 4,-10 Q 6,-16 0,-22 Z" />
        <path d="M 0,22 Q 6,16 4,10 Q 0,14 -4,10 Q -6,16 0,22 Z" />
        <path d="M -22,0 Q -16,6 -10,4 Q -14,0 -10,-4 Q -16,-6 -22,0 Z" />
        <path d="M 22,0 Q 16,-6 10,-4 Q 14,0 10,4 Q 16,6 22,0 Z" />
        {/* Small flourishes at 45° */}
        <circle cx="0" cy="-12" r="2"/>
        <circle cx="0" cy="12" r="2"/>
        <circle cx="-12" cy="0" r="2"/>
        <circle cx="12" cy="0" r="2"/>
      </g>
      {/* Wordmark */}
      <text x="68" y="26" fontFamily="Georgia, 'Times New Roman', serif" fontSize="18" fontWeight="700" letterSpacing="0.5" fontStyle="italic">Pizza</text>
      <text x="68" y="46" fontFamily="Georgia, 'Times New Roman', serif" fontSize="18" fontWeight="700" letterSpacing="0.5" fontStyle="italic">Express</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   9. FORTUNE HOTELS (ITC) — Official wordmark: elegant "Fortune" script + sub-label
   Real logo: "Fortune" in elegant italic serif or refined script + "HOTELS" sub-text
───────────────────────────────────────────────────────────────────────────── */
export function FortuneLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 280 56" fill="currentColor" aria-label="Fortune Park Lakecity" className={className} {...props}>
      {/* Decorative horizontal rules */}
      <line x1="10" y1="14" x2="270" y2="14" stroke="currentColor" strokeWidth="1"/>
      <line x1="10" y1="44" x2="270" y2="44" strokeWidth="1" stroke="currentColor"/>
      {/* Fortune wordmark */}
      <text x="140" y="35" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="22" fontWeight="700" fontStyle="italic" letterSpacing="2">Fortune</text>
      {/* Sub-label above */}
      <text x="140" y="11" textAnchor="middle" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="6.5" fontWeight="600" letterSpacing="3">HOTELS · RESORTS · SAFARIS</text>
      {/* Sub-label below */}
      <text x="140" y="52" textAnchor="middle" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="6.5" fontWeight="400" letterSpacing="2">AN ITC HOTELS BRAND</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   10. MERWANS — Official italic serif wordmark for heritage Mumbai bakery
   Real logo: "Merwans" in bold italic serif + "CONFECTIONERS" subtitle
───────────────────────────────────────────────────────────────────────────── */
export function MerwansLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 270 56" fill="currentColor" aria-label="Merwans" className={className} {...props}>
      <text x="10" y="34" fontFamily="Georgia, 'Times New Roman', serif" fontSize="28" fontWeight="700" fontStyle="italic" letterSpacing="1">Merwans</text>
      <text x="12" y="49" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="3.5">CONFECTIONERS</text>
      {/* Small "Est. 1914" detail */}
      <text x="192" y="49" fontFamily="Georgia, serif" fontSize="7.5" fontStyle="italic" letterSpacing="0.5">Est. 1930</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   11. BASTIAN — Official minimalist all-caps sans-serif wordmark
   Real logo: "BASTIAN" clean, wide-tracked bold sans-serif wordmark — understated luxury
───────────────────────────────────────────────────────────────────────────── */
export function BastianLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 260 56" fill="currentColor" aria-label="Bastian" className={className} {...props}>
      {/* Thin decorative rule above */}
      <line x1="10" y1="16" x2="250" y2="16" stroke="currentColor" strokeWidth="0.8"/>
      <text x="130" y="36" textAnchor="middle" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="22" fontWeight="400" letterSpacing="10">BASTIAN</text>
      {/* Thin decorative rule below */}
      <line x1="10" y1="42" x2="250" y2="42" stroke="currentColor" strokeWidth="0.8"/>
      <text x="130" y="52" textAnchor="middle" fontFamily="'Arial Narrow', Arial, sans-serif" fontSize="7" fontWeight="400" letterSpacing="3">MUMBAI</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   12. PARSI DAIRY FARM — Bold Indian heritage wordmark, rebranded 2023
   Real logo: Bold "PARSI DAIRY FARM" in vibrant red/bold style (rebranded by Please See agency)
   Rendered here in monochrome with strong bold condensed typography
───────────────────────────────────────────────────────────────────────────── */
export function ParsiDairyLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 280 56" fill="currentColor" aria-label="Parsi Dairy Farm" className={className} {...props}>
      {/* Heritage milk drop motif */}
      <path d="M 24,10 C 24,10 16,20 16,28 C 16,34 19.5,38 24,38 C 28.5,38 32,34 32,28 C 32,20 24,10 24,10 Z"/>
      {/* Wordmark */}
      <text x="44" y="24" fontFamily="'Arial Black', 'Arial Bold', 'Helvetica', sans-serif" fontSize="13" fontWeight="900" letterSpacing="1">PARSI DAIRY</text>
      <text x="44" y="41" fontFamily="'Arial Black', 'Arial Bold', 'Helvetica', sans-serif" fontSize="13" fontWeight="900" letterSpacing="1">FARM</text>
      {/* Tagline */}
      <text x="44" y="52" fontFamily="'Arial', sans-serif" fontSize="7" fontWeight="400" letterSpacing="1.5">ESTABLISHED 1916</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   13. OLIVE BAR & KITCHEN — Minimalist clean wordmark in lowercase
   Real logo: "olive" in clean minimalist lowercase + "BAR & KITCHEN" beneath
───────────────────────────────────────────────────────────────────────────── */
export function OliveLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 56" fill="currentColor" aria-label="Olive Bar &amp; Cafe" className={className} {...props}>
      <text x="10" y="34" fontFamily="'Gill Sans', 'Optima', 'Futura', 'Trebuchet MS', sans-serif" fontSize="28" fontWeight="300" letterSpacing="4">olive</text>
      <text x="12" y="48" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="8" fontWeight="600" letterSpacing="4">BAR &amp; KITCHEN</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   14. MILKY MIST — Bold modern wordmark dairy brand
   Real logo: "Milky Mist" in bold rounded/modern sans with clean sub-tagline
───────────────────────────────────────────────────────────────────────────── */
export function MilkyMistLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 240 56" fill="currentColor" aria-label="Milky Mist" className={className} {...props}>
      {/* Stylized milk droplet icon */}
      <path d="M 18,8 C 18,8 10,18 10,26 C 10,31.5 13.5,35 18,35 C 22.5,35 26,31.5 26,26 C 26,18 18,8 18,8 Z"/>
      <text x="36" y="30" fontFamily="'Arial Rounded MT Bold', 'Arial', sans-serif" fontSize="22" fontWeight="700" letterSpacing="0.5">Milky Mist</text>
      <text x="36" y="44" fontFamily="'Arial', sans-serif" fontSize="8" fontWeight="500" letterSpacing="2">DAIRY PRODUCTS</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   15. MAINLAND CHINA — Official fine-dining Chinese restaurant wordmark
   Real logo: "Mainland China" in elegant mixed-case serif with Chinese-inspired horizontal styling
───────────────────────────────────────────────────────────────────────────── */
export function MainlandChinaLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 290 56" fill="currentColor" aria-label="Mainland China" className={className} {...props}>
      {/* Decorative horizontal rules */}
      <line x1="10" y1="12" x2="280" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="10" y1="14.5" x2="280" y2="14.5" stroke="currentColor" strokeWidth="0.5"/>
      <text x="10" y="33" fontFamily="Georgia, 'Times New Roman', serif" fontSize="19" fontWeight="600" letterSpacing="1">Mainland China</text>
      <line x1="10" y1="40" x2="280" y2="40" stroke="currentColor" strokeWidth="0.5"/>
      <line x1="10" y1="42.5" x2="280" y2="42.5" stroke="currentColor" strokeWidth="1.5"/>
      <text x="10" y="52" fontFamily="'Arial Narrow', sans-serif" fontSize="8" fontWeight="400" letterSpacing="2.5">FINE CHINESE DINING</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   16. MAPRO FOODS — Official bold lowercase wordmark
   Real logo: "mapro" in bold rounded sans-serif — clean & fruit-fresh branding
───────────────────────────────────────────────────────────────────────────── */
export function MaproLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 200 56" fill="currentColor" aria-label="Mapro" className={className} {...props}>
      <text x="10" y="38" fontFamily="'Arial Black', 'Futura', 'Impact', sans-serif" fontSize="32" fontWeight="900" letterSpacing="1">mapro</text>
      <text x="12" y="50" fontFamily="'Arial', sans-serif" fontSize="7.5" fontWeight="500" letterSpacing="2">FOODS</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   17. MIZU IZAKAYA — Japanese-inspired minimalist wordmark
   Real logo: "MIZU" or "mizu" clean minimal sans — Japanese aesthetic
   "Mizu" means water in Japanese — wave-inspired minimal branding
───────────────────────────────────────────────────────────────────────────── */
export function MizuLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 200 56" fill="currentColor" aria-label="Mizu" className={className} {...props}>
      {/* Wave motif — Japanese inspired, minimal */}
      <path d="M 10,24 Q 22,14 34,24 Q 46,34 58,24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 10,30 Q 22,20 34,30 Q 46,40 58,30" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
      {/* Wordmark */}
      <text x="68" y="36" fontFamily="'Arial', 'Helvetica', sans-serif" fontSize="26" fontWeight="300" letterSpacing="6">MIZU</text>
      <text x="68" y="49" fontFamily="'Arial', sans-serif" fontSize="7" fontWeight="400" letterSpacing="3">IZAKAYA</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   18. EVE — Minimalist serif wordmark, understated luxury restaurant
   Real logo: "EVE" spaced elegant serif or sans — refined, understated European feel
───────────────────────────────────────────────────────────────────────────── */
export function EveLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg viewBox="0 0 180 56" fill="currentColor" aria-label="EVE" className={className} {...props}>
      {/* Top thin rule */}
      <line x1="14" y1="12" x2="166" y2="12" stroke="currentColor" strokeWidth="0.8"/>
      {/* EVE wordmark — wide-tracked serif */}
      <text x="90" y="36" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="26" fontWeight="400" letterSpacing="10">EVE</text>
      {/* Bottom thin rule */}
      <line x1="14" y1="42" x2="166" y2="42" stroke="currentColor" strokeWidth="0.8"/>
      <text x="90" y="52" textAnchor="middle" fontFamily="'Arial Narrow', sans-serif" fontSize="7" fontWeight="400" letterSpacing="3">MUMBAI</text>
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
