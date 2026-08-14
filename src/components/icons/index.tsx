import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
};

export function SnowflakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2v20M4.2 6.5l15.6 9M19.8 6.5l-15.6 9" />
      <path d="M12 6.4l2.4-2.3M12 6.4L9.6 4.1M12 17.6l2.4 2.3M12 17.6l-2.4 2.3" />
      <path d="M6.9 9.3 3.7 8.6M6.9 9.3l-.8-3.2M17.1 14.7l3.2.7M17.1 14.7l.8 3.2" />
      <path d="M17.1 9.3l3.2-.7M17.1 9.3l.8-3.2M6.9 14.7l-3.2.7M6.9 14.7l-.8 3.2" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20c0-8 5.2-13.4 16-14 .6 8.8-4.4 15-12 15H4Z" />
      <path d="M9 15c2.4-3.4 5.2-5.6 8.6-7" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 6.8h11.2v8.4H2z" />
      <path d="M13.2 9.6h4l3 3.1v2.5h-7z" />
      <circle cx="6.4" cy="17.6" r="1.9" />
      <circle cx="16.6" cy="17.6" r="1.9" />
      <path d="M8.3 17.6h6.4M2 15.2h1.9" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.8 4.8 5.6v5.6c0 4.6 3 7.9 7.2 10 4.2-2.1 7.2-5.4 7.2-10V5.6L12 2.8Z" />
      <path d="m9.2 11.8 2 2 3.6-3.9" />
    </svg>
  );
}

export function BeakerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3h6v4.4l4 9.1A2.5 2.5 0 0 1 16.7 20H7.3A2.5 2.5 0 0 1 5 16.5l4-9.1Z" />
      <path d="M6.3 13.5h11.4M9 3h6" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.4 3.6 5.4 3.6 9S14.4 18.6 12 21c-2.4-2.4-3.6-5.4-3.6-9S9.6 5.4 12 3Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13.2 5.8 19.5 12l-6.3 6.2" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 5.5 16 12l-6.5 6.5" />
    </svg>
  );
}

/**
 * Ganapati / Ganesha silhouette — a solid, recognizable form with the
 * distinctive elephant head, crown, large ears, trunk curving left, and a
 * rounded body. Designed to be legible and unmistakable even at 16–24px.
 * Rendered as a filled shape (not stroked) so it stays visible at small sizes.
 */
export function GanapatiIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      aria-hidden
      focusable="false"
      {...props}
    >
      {/* Om/Aum symbol simplified as the Ganapati marker */}
      <path d="M12 2c-.6 0-1.1.3-1.4.7L9.4 4.5c-.4.5-.4 1.2 0 1.7l.3.4C8.3 7.4 7.2 8.8 7.2 10.5c0 1.2.5 2.2 1.3 3-.5.5-.8 1.1-.8 1.8 0 1.5 1.2 2.7 2.7 2.7.5 0 1-.1 1.4-.4l.2.1v2.1c0 1.2.5 2.2 1.5 2.2s1.5-1 1.5-2.2v-2.1c.8-.3 1.5-.8 2-1.5.3.1.6.2 1 .2 1.5 0 2.7-1.2 2.7-2.7 0-.9-.4-1.6-1-2.2.5-.7.8-1.6.8-2.5 0-2.5-2-4.5-4.5-4.5-.4 0-.8.1-1.2.2l.1-.4c.3-.5.2-1.1-.1-1.5L13.4 2.7c-.3-.4-.8-.7-1.4-.7Zm0 6.5c1.4 0 2.5 1.1 2.5 2.5 0 .8-.4 1.5-1 2l-1.5 1.2-1.5-1.2c-.6-.5-1-1.2-1-2 0-1.4 1.1-2.5 2.5-2.5Z" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="M20 20l-4.3-4.3" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.2 3.5h2.9l1.5 3.7-1.9 1.3a10.6 10.6 0 0 0 4.8 4.8l1.3-1.9 3.7 1.5v2.9a2 2 0 0 1-2.2 2A14.6 14.6 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 6.2h17v11.6h-17z" />
      <path d="m3.9 6.8 8.1 6 8.1-6" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2V12l3.4 2" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.9} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.9} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function CheeseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.4 13.2 4.6a1 1 0 0 1 1.1 0L21 9v8.4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7Z" />
      <path d="M3 11.4h18" />
      <circle cx="8" cy="15" r="1.1" />
      <circle cx="14.6" cy="14.4" r="1.1" />
      <circle cx="18" cy="16.4" r="0.9" />
    </svg>
  );
}

export function BowlIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.2 10.8h17.6a8.8 8.8 0 0 1-8.8 8.4 8.8 8.8 0 0 1-8.8-8.4Z" />
      <path d="M8.4 7.6c0-1.5 1.2-2.2 1.2-3.4M12 7.6c0-2 1.5-2.6 1.5-4M15.6 7.6c0-1.3 1-1.9 1-2.9" />
    </svg>
  );
}

export function FishIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.4 12c2.6-3.9 5.8-5.8 9.4-5.8 3.4 0 6 1.9 7.8 5.8-1.8 3.9-4.4 5.8-7.8 5.8-3.6 0-6.8-1.9-9.4-5.8Z" />
      <path d="M3.4 12c-.7-1.1-1-2.2-1-3.4 1.6.3 2.9.9 3.9 1.8M3.4 12c-.7 1.1-1 2.2-1 3.4 1.6-.3 2.9-.9 3.9-1.8" />
      <circle cx="16.4" cy="10.9" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2l1.7 4.6 4.6 1.7-4.6 1.7L12 15.8l-1.7-4.6-4.6-1.7 4.6-1.7L12 3.2Z" />
      <path d="M18.4 15.2l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9.4" cy="8.4" r="3.2" />
      <path d="M3.4 19.4a6 6 0 0 1 12 0" />
      <path d="M16.2 5.6a3.2 3.2 0 0 1 0 6.2M17.6 14.2a6 6 0 0 1 3 5.2" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.8" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.1" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="3.2" />
      <path d="M7.6 10.4v6.2M7.6 7.8v.1" />
      <path d="M11.6 16.6v-6.2M11.6 12.9c0-1.4.9-2.5 2.3-2.5s2.3 1.1 2.3 2.5v3.7" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="M12.03 2.5a9.4 9.4 0 0 0-8.05 14.2L2.5 21.5l4.94-1.44A9.4 9.4 0 1 0 12.03 2.5Zm0 1.8a7.6 7.6 0 0 1 0 15.2 7.6 7.6 0 0 1-3.9-1.07l-.35-.21-2.6.76.77-2.55-.22-.36a7.6 7.6 0 0 1 6.3-11.77Z" />
      <path d="M9.2 7.6c.18 0 .36 0 .52.01.17.01.4-.06.62.48l.76 1.85c.06.14.1.3-.02.47l-.42.55c-.1.13-.2.2-.1.4a7.2 7.2 0 0 0 3.4 3.32c.2.1.3.06.42-.04l.6-.63c.14-.15.28-.13.44-.06l1.8.86c.5.24.42.47.4.65-.03.18-.6 1.36-2 1.36-1.4 0-4.02-1.2-5.6-3.6-1.06-1.6-1.28-2.7-1.28-3.5 0-1.3.9-2 1.06-2.1a.9.9 0 0 1 .4-.1Z" />
    </svg>
  );
}
