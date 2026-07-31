import type { SVGProps } from "react";

export type ClientLogoProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

/* Taj Hotels Logo */
export function TajLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 140 40"
      fill="currentColor"
      aria-label="Taj Hotels"
      className={className}
      {...props}
    >
      {/* Crown emblem */}
      <path d="M 20,8 L 24,18 L 30,10 L 36,18 L 40,8 L 36,24 L 24,24 Z" />
      <path d="M 22,27 H 38 V 29 H 22 Z" />
      {/* Text TAJ HOTELS */}
      <text x="48" y="24" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" letterSpacing="3">
        TAJ
      </text>
      <text x="48" y="33" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="600" letterSpacing="2.5">
        HOTELS PALACES RESORTS
      </text>
    </svg>
  );
}

/* Theobroma Logo */
export function TheobromaLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 160 40"
      fill="currentColor"
      aria-label="Theobroma"
      className={className}
      {...props}
    >
      <text x="5" y="27" fontFamily="Georgia, serif" fontSize="22" fontStyle="italic" fontWeight="600" letterSpacing="0.5">
        theobroma
      </text>
      <text x="118" y="14" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="bold">
        PATISSERIE
      </text>
    </svg>
  );
}

/* JW Marriott Logo */
export function JwMarriottLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 180 40"
      fill="currentColor"
      aria-label="JW Marriott"
      className={className}
      {...props}
    >
      {/* Griffin emblem */}
      <path d="M 12,24 C 8,16 12,8 20,8 C 24,12 20,20 16,24 Z M 16,24 C 20,24 24,28 20,34 H 12 C 10,28 14,24 16,24 Z" />
      <text x="32" y="22" fontFamily="Georgia, serif" fontSize="16" fontWeight="bold" letterSpacing="2">
        JW MARRIOTT
      </text>
      <text x="32" y="32" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="500" letterSpacing="3">
        HOTELS & RESORTS
      </text>
    </svg>
  );
}

/* Blue Tokai Logo */
export function BlueTokaiLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 170 40"
      fill="currentColor"
      aria-label="Blue Tokai"
      className={className}
      {...props}
    >
      {/* Coffee bean / bird emblem */}
      <path d="M 15,10 C 25,10 28,20 20,30 C 12,30 10,18 15,10 Z M 17,14 C 18,20 22,24 22,24" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <text x="34" y="22" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="800" letterSpacing="1.5">
        BLUE TOKAI
      </text>
      <text x="34" y="32" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="600" letterSpacing="2">
        COFFEE ROASTERS
      </text>
    </svg>
  );
}

/* Oberoi Logo */
export function OberoiLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 140 40"
      fill="currentColor"
      aria-label="Oberoi"
      className={className}
      {...props}
    >
      {/* Sun/crest symbol */}
      <circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="4" />
      <text x="36" y="24" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" letterSpacing="2.5">
        Oberoi
      </text>
      <text x="36" y="32" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="600" letterSpacing="2">
        HOTELS & RESORTS
      </text>
    </svg>
  );
}

/* PAUL French Bakery Logo */
export function PaulLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="currentColor"
      aria-label="PAUL"
      className={className}
      {...props}
    >
      <rect x="5" y="8" width="110" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" rx="2" />
      <text x="60" y="26" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fontWeight="bold" letterSpacing="4">
        PAUL
      </text>
      <text x="60" y="36" textAnchor="middle" fontFamily="Georgia, serif" fontSize="6" fontStyle="italic" letterSpacing="1">
        Maison de Qualité depuis 1889
      </text>
    </svg>
  );
}

/* Hyatt Logo */
export function HyattLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 130 40"
      fill="currentColor"
      aria-label="Hyatt"
      className={className}
      {...props}
    >
      <text x="5" y="26" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" letterSpacing="3">
        HYATT
      </text>
      <text x="5" y="35" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="600" letterSpacing="3">
        HOTELS & RESORTS
      </text>
    </svg>
  );
}

/* PizzaExpress Logo */
export function PizzaExpressLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 160 40"
      fill="currentColor"
      aria-label="Pizza Express"
      className={className}
      {...props}
    >
      <path d="M 15,10 A 10 10 0 1 0 15 30 A 10 10 0 1 0 15 10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 15,14 L 15,26 M 9,20 L 21,20" stroke="currentColor" strokeWidth="1.5" />
      <text x="32" y="23" fontFamily="Georgia, serif" fontSize="16" fontWeight="bold" letterSpacing="1">
        PizzaExpress
      </text>
    </svg>
  );
}

/* Fortune Park Lakecity Logo */
export function FortuneLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 180 40"
      fill="currentColor"
      aria-label="Fortune Park Lakecity"
      className={className}
      {...props}
    >
      {/* ITC Fortune Star */}
      <polygon points="15,6 18,15 27,15 20,20 22,29 15,23 8,29 10,20 3,15 12,15" />
      <text x="32" y="20" fontFamily="Georgia, serif" fontSize="15" fontWeight="bold" letterSpacing="1.5">
        FORTUNE
      </text>
      <text x="32" y="30" fontFamily="system-ui, sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="1">
        PARK LAKECITY · ITC HOTEL
      </text>
    </svg>
  );
}

/* Merwans Bakery Logo */
export function MerwansLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 140 40"
      fill="currentColor"
      aria-label="Merwans"
      className={className}
      {...props}
    >
      <text x="5" y="24" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fontStyle="italic" letterSpacing="1">
        Merwans
      </text>
      <text x="5" y="33" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="2">
        CAKE STOP · SINCE 1930
      </text>
    </svg>
  );
}

/* Bastian Logo */
export function BastianLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 130 40"
      fill="currentColor"
      aria-label="Bastian"
      className={className}
      {...props}
    >
      {/* Crab / Seafood Emblem */}
      <path d="M 12,15 Q 16,10 20,15 Q 24,20 16,24 Q 8,20 12,15 Z" />
      <text x="28" y="24" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" letterSpacing="3">
        BASTIAN
      </text>
      <text x="28" y="33" fontFamily="system-ui, sans-serif" fontSize="6.5" fontWeight="600" letterSpacing="2">
        MUMBAI · SEAFOOD & BAR
      </text>
    </svg>
  );
}

/* Parsi Dairy Farm Logo */
export function ParsiDairyLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 160 40"
      fill="currentColor"
      aria-label="Parsi Dairy Farm"
      className={className}
      {...props}
    >
      {/* Milk Urn Emblem */}
      <path d="M 12,10 H 20 V 13 L 22,25 H 10 L 12,13 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="28" y="20" fontFamily="Georgia, serif" fontSize="14" fontWeight="bold" letterSpacing="1">
        Parsi Dairy Farm
      </text>
      <text x="28" y="30" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="600" letterSpacing="1.5">
        PURE DAIRY SINCE 1916
      </text>
    </svg>
  );
}

/* Olive Bar & Cafe Logo */
export function OliveLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 160 40"
      fill="currentColor"
      aria-label="Olive Bar & Cafe"
      className={className}
      {...props}
    >
      {/* Olive Leaf Branch */}
      <circle cx="12" cy="18" r="4" fill="currentColor" />
      <path d="M 12,22 Q 18,12 22,24" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <text x="28" y="22" fontFamily="Georgia, serif" fontSize="18" fontWeight="normal" letterSpacing="2">
        olive
      </text>
      <text x="28" y="32" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="600" letterSpacing="2">
        BAR & KITCHEN
      </text>
    </svg>
  );
}

/* Milky Mist Logo */
export function MilkyMistLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 140 40"
      fill="currentColor"
      aria-label="Milky Mist"
      className={className}
      {...props}
    >
      <text x="5" y="22" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" letterSpacing="1">
        Milky Mist
      </text>
      <text x="5" y="31" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="2">
        PREMIUM DAIRY
      </text>
    </svg>
  );
}

/* Mainland China Logo */
export function MainlandChinaLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 170 40"
      fill="currentColor"
      aria-label="Mainland China"
      className={className}
      {...props}
    >
      {/* Pagoda Emblem */}
      <path d="M 12,8 L 22,8 L 19,14 L 24,14 L 21,20 L 26,20 L 10,26 Z" />
      <text x="30" y="21" fontFamily="Georgia, serif" fontSize="15" fontWeight="bold" letterSpacing="1.5">
        MAINLAND CHINA
      </text>
      <text x="30" y="31" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="600" letterSpacing="2">
        FINE CHINESE DINING
      </text>
    </svg>
  );
}

/* Mapro Logo */
export function MaproLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="currentColor"
      aria-label="Mapro"
      className={className}
      {...props}
    >
      <text x="5" y="25" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="900" letterSpacing="1">
        mapro
      </text>
    </svg>
  );
}

/* Mizu Japanese Dining Logo */
export function MizuLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="currentColor"
      aria-label="Mizu"
      className={className}
      {...props}
    >
      {/* Water Wave Symbol */}
      <path d="M 10,20 Q 15,14 20,20 Q 25,26 30,20" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <text x="36" y="24" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" letterSpacing="3">
        MIZU
      </text>
    </svg>
  );
}

/* EVE Logo */
export function EveLogo({ className = "h-7 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 100 40"
      fill="currentColor"
      aria-label="EVE"
      className={className}
      {...props}
    >
      <text x="5" y="26" fontFamily="Georgia, serif" fontSize="24" fontWeight="300" letterSpacing="5">
        E V E
      </text>
    </svg>
  );
}

export const clientLogoMap: Record<string, (props: ClientLogoProps) => JSX.Element> = {
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
