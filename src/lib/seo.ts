import type { Metadata } from "next";
import { site, social } from "@/lib/site";
import type { Product } from "@/lib/products";

/**
 * Advanced SEO helpers & JSON-LD Entity Graph Builders.
 *
 * Provides full Schema.org structured data, canonical URL resolutions,
 * OpenGraph/Twitter cards, and commercial long-tail keyword indexing for Google.
 */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

/** Canonical absolute URL for a route. */
export function canonical(path: string) {
  return path === "/" ? `${site.url}/` : `${site.url}${path}`;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = canonical(path);

  const defaultKeywords = [
    "frozen berries supplier Mumbai",
    "IQF frozen berries wholesale India",
    "fruit puree supplier for bakeries",
    "imported fresh vegetables Mumbai",
    "HORECA food supplier India",
    "Adhira Enterprises Mumbai",
    "Adira Enterprises food supplier",
    "Breadberry Co",
    "premium food importer Mumbai India",
  ];

  const mergedKeywords = keywords
    ? Array.from(new Set([...keywords, ...defaultKeywords]))
    : defaultKeywords;

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: `${site.name} by ${site.company}`,
      title: `${title} · ${site.name}`,
      description,
      url,
      locale: "en_IN",
      /* Purpose-built 1200x630 card. The bare logo used to be declared at
         these dimensions, which made every share preview letterbox badly. */
      images: [
        {
          url: `${site.url}/og.jpg`,
          width: 1200,
          height: 630,
          alt: `${site.name} by ${site.company}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [`${site.url}/og.jpg`],
    },
  };
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "G/3, Bhagwanti Niwas, T H Kataria Marg, Mahim",
  addressLocality: site.city,
  postalCode: "400016",
  addressRegion: site.region,
  addressCountry: site.country,
};

/**
 * Comprehensive Organization & LocalBusiness Knowledge Graph Entity.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Wholesaler", "FoodEstablishment"],
    "@id": ORG_ID,
    name: `${site.name} by ${site.company}`,
    legalName: site.company,
    alternateName: [site.name, site.company, ...site.alternateNames],
    description: site.description,
    url: site.url,
    logo: `${site.url}/assets/logo-mark.png`,
    image: `${site.url}/og.jpg`,
    telephone: site.phone,
    email: site.email,
    foundingDate: site.founded,
    founder: { "@type": "Person", name: site.founder },
    address: postalAddress,
    openingHours: site.openingHours,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "₹₹ (Trade & Wholesale B2B Rates)",
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        name: site.contact,
        telephone: site.phone,
        email: site.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wholesale Gourmet Food Categories",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "IQF Frozen Berries",
          description: "Whole frozen strawberries, blueberries, raspberries, blackberries, cranberries, mix berries",
        },
        {
          "@type": "OfferCatalog",
          name: "Fruit Purees",
          description: "Patisserie and beverage fruit purees: strawberry, blueberry, raspberry, passionfruit, acai",
        },
        {
          "@type": "OfferCatalog",
          name: "Fresh Produce & Speciality Greens",
          description: "Chilled farm supply: avocados, asparagus, fresh berries, heirloom tomatoes, mushrooms, leafy greens",
        },
        {
          "@type": "OfferCatalog",
          name: "Bakery & Japanese Staples",
          description: "Nori, bao buns, fillo & kataifi pastry sheets, gyoza skins, panko, edamame",
        },
        {
          "@type": "OfferCatalog",
          name: "Frozen Seafood",
          description: "Norwegian salmon, Atlantic smoked salmon, hamachi fillet, tuna saku, black cod, Chilean seabass, tobikko roe",
        },
      ],
    },
    sameAs: social.map((profile) => profile.href),
    knowsAbout: [
      "IQF frozen berries wholesale",
      "fruit purees for patisserie and gelaterias",
      "imported fresh vegetables Mumbai",
      "artisanal cheese and dairy",
      "Asian dry groceries & sushi ingredients",
      "frozen seafood supplier Mumbai",
      "cold chain foodservice distribution",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: `${site.name} by ${site.company}`,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

/**
 * Product entity for structured data. Deliberately omits `offers`,
 * `aggregateRating` and `review` because:
 *
 * 1. Prices are quoted per enquiry (not displayed on the page), so Google's
 *    requirement that structured data must match visible content cannot be met.
 * 2. There are no published reviews or ratings on the site.
 *
 * Without `offers`, this is a valid Product entity that provides name, image,
 * brand, category and description to Google without triggering the "missing
 * lowPrice/highPrice/review/aggregateRating" warnings in Search Console.
 *
 * If public pricing or a review system is added later, re-introduce `offers`
 * with real `lowPrice`/`highPrice` and `review`/`aggregateRating` fields.
 */
export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.blurb,
    image: `${site.url}${product.image}`,
    category: product.categoryLabel,
    brand: { "@type": "Brand", name: site.name },
    url: canonical(`/products/${product.slug}`),
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function itemListSchema(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.company} wholesale catalogue`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: canonical(`/products/${product.slug}`),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
