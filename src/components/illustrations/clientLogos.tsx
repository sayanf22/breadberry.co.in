import type { ComponentType, SVGProps } from "react";

export type ClientLogoProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

/* Taj Hotels Logo */
export function TajLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 220 50"
      fill="currentColor"
      aria-label="Taj Hotels"
      className={className}
      {...props}
    >
      {/* Crown emblem */}
      <path d="M 22,10 L 27,22 L 35,12 L 43,22 L 48,10 L 43,30 L 27,30 Z" />
      <path d="M 24,34 H 46 V 37 H 24 Z" />
      {/* Text TAJ HOTELS */}
      <text x="60" y="28" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" letterSpacing="3">
        TAJ
      </text>
      <text x="60" y="41" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2.5">
        HOTELS PALACES RESORTS
      </text>
    </svg>
  );
}

/* Theobroma Logo — Fixed viewBox to prevent text clipping */
export function TheobromaLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 270 50"
      fill="currentColor"
      aria-label="Theobroma"
      className={className}
      {...props}
    >
      <text x="10" y="32" fontFamily="Georgia, serif" fontSize="26" fontStyle="italic" fontWeight="600" letterSpacing="0.5">
        theobroma
      </text>
      <text x="160" y="18" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" letterSpacing="1">
        PATISSERIE
      </text>
    </svg>
  );
}

/* JW Marriott Logo */
export function JwMarriottLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 260 50"
      fill="currentColor"
      aria-label="JW Marriott"
      className={className}
      {...props}
    >
      {/* Griffin emblem */}
      <path d="M 16,30 C 10,20 16,10 26,10 C 31,15 26,25 21,30 Z M 21,30 C 26,30 31,35 26,42 H 16 C 13,35 18,30 21,30 Z" />
      <text x="40" y="27" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" letterSpacing="2">
        JW MARRIOTT
      </text>
      <text x="40" y="40" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="500" letterSpacing="3">
        HOTELS & RESORTS
      </text>
    </svg>
  );
}

/* Blue Tokai Logo */
export function BlueTokaiLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 250 50"
      fill="currentColor"
      aria-label="Blue Tokai"
      className={className}
      {...props}
    >
      {/* Coffee bean / bird emblem */}
      <path d="M 18,12 C 30,12 34,25 24,38 C 14,38 12,22 18,12 Z M 20,18 C 22,25 27,30 27,30" stroke="currentColor" strokeWidth="2" fill="none" />
      <text x="42" y="27" fontFamily="system-ui, sans-serif" fontSize="19" fontWeight="800" letterSpacing="1.5">
        BLUE TOKAI
      </text>
      <text x="42" y="40" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2">
        COFFEE ROASTERS
      </text>
    </svg>
  );
}

/* Oberoi Logo */
export function OberoiLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 230 50"
      fill="currentColor"
      aria-label="Oberoi"
      className={className}
      {...props}
    >
      {/* Sun/crest symbol */}
      <circle cx="24" cy="25" r="11" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="25" r="5" />
      <text x="44" y="30" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" letterSpacing="2.5">
        Oberoi
      </text>
      <text x="44" y="41" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="600" letterSpacing="2">
        HOTELS & RESORTS
      </text>
    </svg>
  );
}

/* PAUL French Bakery Logo */
export function PaulLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 240 50"
      fill="currentColor"
      aria-label="PAUL"
      className={className}
      {...props}
    >
      <rect x="8" y="10" width="224" height="30" fill="none" stroke="currentColor" strokeWidth="2" rx="3" />
      <text x="120" y="32" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" letterSpacing="5">
        PAUL
      </text>
      <text x="120" y="45" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7.5" fontStyle="italic" letterSpacing="1">
        Maison de Qualité depuis 1889
      </text>
    </svg>
  );
}

/* Hyatt Logo */
export function HyattLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 210 50"
      fill="currentColor"
      aria-label="Hyatt"
      className={className}
      {...props}
    >
      <text x="10" y="32" fontFamily="Georgia, serif" fontSize="26" fontWeight="bold" letterSpacing="3">
        HYATT
      </text>
      <text x="10" y="44" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="3">
        HOTELS & RESORTS
      </text>
    </svg>
  );
}

/* PizzaExpress Logo */
export function PizzaExpressLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 220 50"
      fill="currentColor"
      aria-label="Pizza Express"
      className={className}
      {...props}
    >
      <path d="M 20,12 A 12 12 0 1 0 20 36 A 12 12 0 1 0 20 12 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 20,17 L 20,31 M 13,24 L 27,24" stroke="currentColor" strokeWidth="2" />
      <text x="40" y="30" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" letterSpacing="1">
        PizzaExpress
      </text>
    </svg>
  );
}

/* Fortune Park Lakecity Logo */
export function FortuneLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 260 50"
      fill="currentColor"
      aria-label="Fortune Park Lakecity"
      className={className}
      {...props}
    >
      {/* ITC Fortune Star */}
      <polygon points="18,8 22,19 33,19 25,25 28,36 18,29 8,36 11,25 3,19 14,19" />
      <text x="40" y="26" fontFamily="Georgia, serif" fontSize="19" fontWeight="bold" letterSpacing="1.5">
        FORTUNE
      </text>
      <text x="40" y="39" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1">
        PARK LAKECITY · ITC HOTEL
      </text>
    </svg>
  );
}

/* Merwans Bakery Logo */
export function MerwansLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 220 50"
      fill="currentColor"
      aria-label="Merwans"
      className={className}
      {...props}
    >
      <text x="10" y="30" fontFamily="Georgia, serif" fontSize="25" fontWeight="bold" fontStyle="italic" letterSpacing="1">
        Merwans
      </text>
      <text x="10" y="42" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="2">
        CAKE STOP · SINCE 1930
      </text>
    </svg>
  );
}

/* Bastian Logo — Fixed viewBox to prevent text clipping */
export function BastianLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 260 50"
      fill="currentColor"
      aria-label="Bastian"
      className={className}
      {...props}
    >
      {/* Crab / Seafood Emblem */}
      <path d="M 16,18 Q 22,12 28,18 Q 34,24 22,30 Q 10,24 16,18 Z" />
      <text x="38" y="30" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" letterSpacing="3">
        BASTIAN
      </text>
      <text x="38" y="42" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2">
        MUMBAI · SEAFOOD & BAR
      </text>
    </svg>
  );
}

/* Parsi Dairy Farm Logo */
export function ParsiDairyLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 240 50"
      fill="currentColor"
      aria-label="Parsi Dairy Farm"
      className={className}
      {...props}
    >
      {/* Milk Urn Emblem */}
      <path d="M 15,12 H 25 V 16 L 28,32 H 12 L 15,16 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="34" y="26" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" letterSpacing="1">
        Parsi Dairy Farm
      </text>
      <text x="34" y="39" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="1.5">
        PURE DAIRY SINCE 1916
      </text>
    </svg>
  );
}

/* Olive Bar & Cafe Logo */
export function OliveLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 230 50"
      fill="currentColor"
      aria-label="Olive Bar & Cafe"
      className={className}
      {...props}
    >
      {/* Olive Leaf Branch */}
      <circle cx="16" cy="22" r="5" fill="currentColor" />
      <path d="M 16,27 Q 24,14 30,30" stroke="currentColor" strokeWidth="2" fill="none" />
      <text x="36" y="28" fontFamily="Georgia, serif" fontSize="22" fontWeight="normal" letterSpacing="2">
        olive
      </text>
      <text x="36" y="40" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2">
        BAR & KITCHEN
      </text>
    </svg>
  );
}

/* Milky Mist Logo */
export function MilkyMistLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 210 50"
      fill="currentColor"
      aria-label="Milky Mist"
      className={className}
      {...props}
    >
      <text x="10" y="28" fontFamily="Georgia, serif" fontSize="23" fontWeight="bold" letterSpacing="1">
        Milky Mist
      </text>
      <text x="10" y="40" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="700" letterSpacing="2">
        PREMIUM DAIRY
      </text>
    </svg>
  );
}

/* Mainland China Logo */
export function MainlandChinaLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 250 50"
      fill="currentColor"
      aria-label="Mainland China"
      className={className}
      {...props}
    >
      {/* Pagoda Emblem */}
      <path d="M 15,10 L 27,10 L 23,17 L 29,17 L 25,25 L 31,25 L 11,33 Z" />
      <text x="36" y="26" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" letterSpacing="1.5">
        MAINLAND CHINA
      </text>
      <text x="36" y="39" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2">
        FINE CHINESE DINING
      </text>
    </svg>
  );
}

/* Mapro Logo */
export function MaproLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 160 50"
      fill="currentColor"
      aria-label="Mapro"
      className={className}
      {...props}
    >
      <text x="10" y="33" fontFamily="system-ui, sans-serif" fontSize="28" fontWeight="900" letterSpacing="1">
        mapro
      </text>
    </svg>
  );
}

/* Mizu Japanese Dining Logo */
export function MizuLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 170 50"
      fill="currentColor"
      aria-label="Mizu"
      className={className}
      {...props}
    >
      {/* Water Wave Symbol */}
      <path d="M 12,25 Q 18,17 25,25 Q 32,33 38,25" stroke="currentColor" strokeWidth="3" fill="none" />
      <text x="44" y="31" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" letterSpacing="3">
        MIZU
      </text>
    </svg>
  );
}

/* EVE Logo */
export function EveLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 140 50"
      fill="currentColor"
      aria-label="EVE"
      className={className}
      {...props}
    >
      <text x="10" y="34" fontFamily="Georgia, serif" fontSize="30" fontWeight="300" letterSpacing="6">
        E V E
      </text>
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
