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

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M9 6.6c0-.8.9-1.3 1.6-.9l7.2 4.6c.6.4.6 1.3 0 1.7l-7.2 4.6c-.7.4-1.6-.1-1.6-.9V6.6Z" />
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
