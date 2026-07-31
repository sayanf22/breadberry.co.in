import type { ComponentType, SVGProps } from "react";

export type ClientLogoProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

/* 1. Taj Hotels — Official Crown & Monogram */
export function TajLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 240 50"
      fill="currentColor"
      aria-label="Taj Hotels"
      className={className}
      {...props}
    >
      {/* Crown emblem */}
      <path d="M 20,8 L 26,22 L 35,10 L 44,22 L 50,8 L 44,30 L 26,30 Z" />
      <path d="M 22,34 H 48 V 37 H 22 Z" />
      {/* Text TAJ HOTELS */}
      <text x="64" y="28" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" letterSpacing="3">
        TAJ
      </text>
      <text x="64" y="41" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="600" letterSpacing="2.5">
        HOTELS PALACES RESORTS
      </text>
    </svg>
  );
}

/* 2. Theobroma Patisserie — Official Italic Wordmark & Subtitle */
export function TheobromaLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 280 50"
      fill="currentColor"
      aria-label="Theobroma"
      className={className}
      {...props}
    >
      <text x="10" y="32" fontFamily="Georgia, serif" fontSize="26" fontStyle="italic" fontWeight="600" letterSpacing="0.5">
        theobroma
      </text>
      <text x="168" y="18" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="bold" letterSpacing="1.5">
        PATISSERIE
      </text>
    </svg>
  );
}

/* 3. JW Marriott — Official Griffin Emblem & Typography */
export function JwMarriottLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 270 50"
      fill="currentColor"
      aria-label="JW Marriott"
      className={className}
      {...props}
    >
      {/* Griffin emblem */}
      <path d="M 16,30 C 10,20 16,10 26,10 C 31,15 26,25 21,30 Z M 21,30 C 26,30 31,35 26,42 H 16 C 13,35 18,30 21,30 Z" />
      <text x="42" y="27" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" letterSpacing="2">
        JW MARRIOTT
      </text>
      <text x="42" y="40" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="500" letterSpacing="3">
        HOTELS & RESORTS
      </text>
    </svg>
  );
}

/* 4. Blue Tokai Coffee Roasters — Official Peacock Feather Motif & Wordmark */
export function BlueTokaiLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 260 50"
      fill="currentColor"
      aria-label="Blue Tokai"
      className={className}
      {...props}
    >
      {/* Peacock Feather / Bean emblem */}
      <path
        d="M 14,25 C 14,12 28,8 32,25 C 32,38 18,42 14,25 Z M 20,20 C 22,26 27,30 27,30"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="23" cy="19" r="2.5" fill="currentColor" />
      <text x="44" y="27" fontFamily="system-ui, sans-serif" fontSize="19" fontWeight="800" letterSpacing="1.5">
        BLUE TOKAI
      </text>
      <text x="44" y="40" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2">
        COFFEE ROASTERS
      </text>
    </svg>
  );
}

/* 5. The Oberoi Group — Official Concentric Sun Crest & Typography */
export function OberoiLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 240 50"
      fill="currentColor"
      aria-label="Oberoi"
      className={className}
      {...props}
    >
      {/* Oberoi Sun symbol */}
      <circle cx="24" cy="25" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="25" r="5" />
      <text x="46" y="30" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" letterSpacing="2.5">
        Oberoi
      </text>
      <text x="46" y="41" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="600" letterSpacing="2">
        HOTELS & RESORTS
      </text>
    </svg>
  );
}

/* 6. PAUL French Bakery — Official Boxed Monogram & Subtitle */
export function PaulLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 250 50"
      fill="currentColor"
      aria-label="PAUL"
      className={className}
      {...props}
    >
      <rect x="8" y="10" width="234" height="30" fill="none" stroke="currentColor" strokeWidth="2" rx="3" />
      <text x="125" y="32" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" letterSpacing="5">
        PAUL
      </text>
      <text x="125" y="45" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7.5" fontStyle="italic" letterSpacing="1">
        Maison de Qualité depuis 1889
      </text>
    </svg>
  );
}

/* 7. Hyatt Hotels — Official High-Contrast Serif Wordmark */
export function HyattLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 220 50"
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

/* 8. PizzaExpress — Official Filigree Round Badge & Wordmark */
export function PizzaExpressLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 230 50"
      fill="currentColor"
      aria-label="Pizza Express"
      className={className}
      {...props}
    >
      <path d="M 20,12 A 12 12 0 1 0 20 36 A 12 12 0 1 0 20 12 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M 20,17 L 20,31 M 13,24 L 27,24" stroke="currentColor" strokeWidth="2" />
      <text x="42" y="30" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" letterSpacing="1">
        PizzaExpress
      </text>
    </svg>
  );
}

/* 9. Fortune Park Lakecity — Official ITC Hotel Group 5-Star Crest */
export function FortuneLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 270 50"
      fill="currentColor"
      aria-label="Fortune Park Lakecity"
      className={className}
      {...props}
    >
      {/* ITC Fortune Star */}
      <polygon points="18,8 22,19 33,19 25,25 28,36 18,29 8,36 11,25 3,19 14,19" />
      <text x="42" y="26" fontFamily="Georgia, serif" fontSize="19" fontWeight="bold" letterSpacing="1.5">
        FORTUNE
      </text>
      <text x="42" y="39" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="600" letterSpacing="1">
        PARK LAKECITY · ITC HOTEL
      </text>
    </svg>
  );
}

/* 10. Merwans Cake Stop — Official Italic Serif Typography */
export function MerwansLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 230 50"
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

/* 11. Bastian Mumbai — Official Seafood Crab Emblem & Typography */
export function BastianLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 270 50"
      fill="currentColor"
      aria-label="Bastian"
      className={className}
      {...props}
    >
      {/* Crab / Seafood Emblem */}
      <path d="M 16,18 Q 22,12 28,18 Q 34,24 22,30 Q 10,24 16,18 Z" />
      <text x="40" y="30" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" letterSpacing="3">
        BASTIAN
      </text>
      <text x="40" y="42" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2">
        MUMBAI · SEAFOOD & BAR
      </text>
    </svg>
  );
}

/* 12. Parsi Dairy Farm — Official Milk Urn Emblem & Serif Wordmark */
export function ParsiDairyLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 250 50"
      fill="currentColor"
      aria-label="Parsi Dairy Farm"
      className={className}
      {...props}
    >
      {/* Milk Urn Emblem */}
      <path d="M 15,12 H 25 V 16 L 28,32 H 12 L 15,16 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="36" y="26" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" letterSpacing="1">
        Parsi Dairy Farm
      </text>
      <text x="36" y="39" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="1.5">
        PURE DAIRY SINCE 1916
      </text>
    </svg>
  );
}

/* 13. Olive Bar & Kitchen — Official Olive Leaf Branch & Wordmark */
export function OliveLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 240 50"
      fill="currentColor"
      aria-label="Olive Bar & Cafe"
      className={className}
      {...props}
    >
      {/* Olive Leaf Branch */}
      <circle cx="16" cy="22" r="5" fill="currentColor" />
      <path d="M 16,27 Q 24,14 30,30" stroke="currentColor" strokeWidth="2" fill="none" />
      <text x="38" y="28" fontFamily="Georgia, serif" fontSize="22" fontWeight="normal" letterSpacing="2">
        olive
      </text>
      <text x="38" y="40" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2">
        BAR & KITCHEN
      </text>
    </svg>
  );
}

/* 14. Milky Mist Dairy — Official Bold Serif Wordmark */
export function MilkyMistLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 220 50"
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

/* 15. Mainland China — Official Pagoda Emblem & Fine Dining Subtitle */
export function MainlandChinaLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 260 50"
      fill="currentColor"
      aria-label="Mainland China"
      className={className}
      {...props}
    >
      {/* Pagoda Emblem */}
      <path d="M 15,10 L 27,10 L 23,17 L 29,17 L 25,25 L 31,25 L 11,33 Z" />
      <text x="38" y="26" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" letterSpacing="1.5">
        MAINLAND CHINA
      </text>
      <text x="38" y="39" fontFamily="system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2">
        FINE CHINESE DINING
      </text>
    </svg>
  );
}

/* 16. Mapro Foods — Official Sans-Serif Lowercase Typography */
export function MaproLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 170 50"
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

/* 17. Mizu Japanese Dining — Official Water Wave Symbol & Serif Typography */
export function MizuLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 180 50"
      fill="currentColor"
      aria-label="Mizu"
      className={className}
      {...props}
    >
      {/* Water Wave Symbol */}
      <path d="M 12,25 Q 18,17 25,25 Q 32,33 38,25" stroke="currentColor" strokeWidth="3" fill="none" />
      <text x="46" y="31" fontFamily="Georgia, serif" fontSize="24" fontWeight="bold" letterSpacing="3">
        MIZU
      </text>
    </svg>
  );
}

/* 18. EVE Culinary — Official Spaced Serif Monogram */
export function EveLogo({ className = "h-10 w-auto", ...props }: ClientLogoProps) {
  return (
    <svg
      viewBox="0 0 150 50"
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
