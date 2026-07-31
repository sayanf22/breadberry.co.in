import type { ComponentType, SVGProps } from "react";
import type { Feature } from "@/components/ui/FeatureCard";
import {
  BeakerIcon,
  GlobeIcon,
  ShieldCheckIcon,
  SnowflakeIcon,
  SparkleIcon,
  TruckIcon,
  UsersIcon,
} from "@/components/icons";

/**
 * The Adhira difference — the four commitments behind every consignment.
 * Used as cards on the Why Us page.
 */
export const differenceFeatures: Feature[] = [
  {
    icon: SnowflakeIcon,
    title: "Rigorous cold-chain control",
    body: "Frozen berries and purees are held at the temperature their flavour, colour and nutrition depend on — from source to your kitchen door.",
    tone: "blue",
  },
  {
    icon: ShieldCheckIcon,
    title: "Verified provenance",
    body: "Specialty gourmet labels are checked for authenticity, so what reaches your board is exactly what your menu claims.",
    tone: "green",
  },
  {
    icon: BeakerIcon,
    title: "Uncompromising hygiene",
    body: "Supplying 5-star kitchens and cake studios demands meticulous food handling. Our protocols are built around that, not bolted on.",
    tone: "berry",
  },
  {
    icon: TruckIcon,
    title: "Consistency you can plan around",
    body: "Reliable, repeatable access to every line we carry, so your prep list is never rewritten by a delivery window.",
    tone: "blue",
  },
];

export type Commitment = {
  tag: string;
  title: string;
  body: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: "blue" | "green" | "berry" | "amber" | "teal";
  /** Card width — mixed widths stop the row reading as a grid. */
  size: "sm" | "md" | "lg";
  /** Vertical stagger step (0–2). Held in data so both marquee copies match. */
  offset: 0 | 1 | 2;
};

/** Scrolling commitment row on the home page. */
export const commitments: Commitment[] = [
  {
    tag: "Cold chain",
    title: "Temperature, held",
    body: "Frozen fruit purees need delicate, unbroken temperature control. That requirement shapes how we store, load and deliver — not the other way round.",
    icon: SnowflakeIcon,
    tone: "blue",
    size: "lg",
    offset: 0,
  },
  {
    tag: "Provenance",
    title: "Labels, verified",
    body: "Specialty gourmet products are only worth what their provenance can prove.",
    icon: ShieldCheckIcon,
    tone: "green",
    size: "sm",
    offset: 2,
  },
  {
    tag: "Hygiene",
    title: "Handling, respected",
    body: "Supplying fine kitchens takes more than logistics. It demands a deep respect for meticulous food handling at every touchpoint.",
    icon: BeakerIcon,
    tone: "berry",
    size: "md",
    offset: 1,
  },
  {
    tag: "Sourcing",
    title: "Sourced globally",
    body: "We buy from the origins that do each ingredient best, then hold them to one standard.",
    icon: GlobeIcon,
    tone: "teal",
    size: "sm",
    offset: 0,
  },
  {
    tag: "Range",
    title: "Continually developed",
    body: "Through Breadberry Co. we keep extending into specialised culinary and baking avenues, so your menu is never limited by what we stock.",
    icon: SparkleIcon,
    tone: "amber",
    size: "md",
    offset: 2,
  },
  {
    tag: "Supply",
    title: "1 kg to full pallet",
    body: "Trial a line before you scale it. Pack sizes flex to the way your kitchen actually orders.",
    icon: TruckIcon,
    tone: "blue",
    size: "sm",
    offset: 1,
  },
  {
    tag: "Partnership",
    title: "Built around your prep",
    body: "Deliveries are scheduled to your prep days. Cold chain is our problem, never something you inherit.",
    icon: UsersIcon,
    tone: "green",
    size: "md",
    offset: 0,
  },
  {
    tag: "Standard",
    title: "One grade only",
    body: "If a lot does not meet grade it does not ship. There is no second tier.",
    icon: ShieldCheckIcon,
    tone: "teal",
    size: "sm",
    offset: 2,
  },
];

export type Proof = {
  /** Headline claim, set in the display serif. */
  title: string;
  note: string;
  href: string;
  cta: string;
  /** Bento footprint — `lg` takes the wider column. */
  size: "lg" | "sm";
};

/** Green highlight cards under the commitment row. */
export const proofPoints: Proof[] = [
  {
    title: "1000+ kitchens served",
    note: "Hotels, fine-dining restaurants, confectioneries, bakeries and cafés across Mumbai.",
    href: "/about",
    cta: "About us",
    size: "lg",
  },
  {
    title: "Five curated categories",
    note: "One sourcing standard applied across every line we carry.",
    href: "/products",
    cta: "See the selection",
    size: "sm",
  },
  {
    title: "Mumbai, since 2020",
    note: "Founded to bridge world-class ingredients and the city's finest kitchens.",
    href: "/about",
    cta: "About Adhira",
    size: "sm",
  },
  {
    title: "Quoted in one working day",
    note: "Tell us the lines and volumes. Pricing, pack sizes and dispatch dates come back fast.",
    href: "/request-a-quote",
    cta: "Request a quote",
    size: "lg",
  },
];
