import type { ComponentType, SVGProps } from "react";
import {
  BowlIcon,
  CheeseIcon,
  FishIcon,
  LeafIcon,
  SnowflakeIcon,
} from "@/components/icons";
import type { ProductCategory } from "@/lib/products";

export type PortfolioCategory = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** One per category — each drives its own light card tint. */
  tone: "berry" | "green" | "amber" | "blue" | "teal";
  /** True where the site carries product-level detail for the category. */
  hasCatalogue?: boolean;
  /**
   * Filter tab this category opens in the catalogue. Kept as a real
   * `ProductCategory` so a renamed tab cannot silently break the link.
   */
  catalogueCategory?: ProductCategory;
};

/** Deep-links a portfolio card to its filtered slice of the catalogue. */
export function catalogueHref(category: PortfolioCategory) {
  return category.catalogueCategory
    ? `/products?category=${category.catalogueCategory}#range`
    : "/products";
}

/**
 * The curated selection sourced and supplied by Adhira Enterprises.
 * Frozen berries and purees are the Breadberry Co. signature line.
 */
export const portfolio: PortfolioCategory[] = [
  {
    slug: "frozen-berries-purees",
    name: "Premium Frozen Berries & Purees",
    summary:
      "Hand-selected fruit held under rigorous cold-chain protocols, for high-end confectionery and designer cakes.",
    detail:
      "Flavour depth, vibrant colour and nutritional integrity preserved from harvest to your walk-in. This is the Breadberry Co. signature range.",
    icon: SnowflakeIcon,
    tone: "berry",
    hasCatalogue: true,
    catalogueCategory: "iqf",
  },
  {
    slug: "fresh-imported-vegetables",
    name: "Fresh Imported Vegetables",
    summary:
      "Crisp, vibrant, globally sourced produce so your salads and garnishes are always world-class.",
    detail:
      "Sourced to order and moved quickly, because a garnish is only as good as the day it arrived.",
    icon: LeafIcon,
    tone: "green",
    hasCatalogue: true,
    catalogueCategory: "fresh",
  },
  {
    slug: "artisanal-cheeses",
    name: "Artisanal Cheeses",
    summary:
      "A diverse selection of gourmet cheeses for charcuterie boards, savoury bakes and specialty dishes.",
    detail:
      "Provenance verified label by label, so what reaches your board is what the menu claims.",
    icon: CheeseIcon,
    tone: "amber",
  },
  {
    slug: "asian-dry-groceries",
    name: "Specialty Asian Dry Groceries",
    summary:
      "Authentic Thai and Japanese staples, essential for precision cooking and true flavour profiling.",
    detail:
      "The pantry lines that decide whether a dish reads as authentic or approximate.",
    icon: BowlIcon,
    tone: "blue",
    hasCatalogue: true,
    catalogueCategory: "japanese",
  },
  {
    slug: "frozen-seafood",
    name: "Frozen Seafood",
    summary:
      "High-grade seafood frozen at the peak of freshness, for dependable texture and taste.",
    detail:
      "Frozen once, at peak, and never allowed to break temperature on the way to you.",
    icon: FishIcon,
    tone: "teal",
    hasCatalogue: true,
    catalogueCategory: "seafood",
  },
];
