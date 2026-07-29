import type { Feature } from "@/components/ui/FeatureCard";
import {
  BeakerIcon,
  ShieldCheckIcon,
  SnowflakeIcon,
  TruckIcon,
} from "@/components/icons";

/**
 * The Adhira difference — the four commitments behind every consignment.
 * Used on the home page and the Why Us page.
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
