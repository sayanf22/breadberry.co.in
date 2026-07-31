import type { Metadata } from "next";
import { site, social } from "@/lib/site";
import { servedRegions } from "@/lib/coverage";
import type { Product } from "@/lib/products";

/**
 * SEO helpers.
 *
 * One builder for page metadata and one set of JSON-LD builders, so every page
 * ships a unique title, a unique description, a self-referencing canonical and
 * a connected entity graph without repeating the same object six times.
 *
 * Structured data is rendered server-side and only describes content that is
 * visible on the page, per Google's structured data guidelines. Products carry
 * no `offers`: pack sizes and pricing are quoted per enquiry, and inventing a
 * price to chase a rich result would breach those guidelines.
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

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} · ${site.name}`,
      description,
      url,
    },
  };
}

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: site.city,
  addressRegion: site.region,
  addressCountry: site.country,
};

/**
 * The brand entity. `alternateName` carries the spellings people search for —
 * including "Adira Enterprises" — so either spelling resolves to this site.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "Wholesaler"],
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
    priceRange: "Trade / wholesale — quoted per enquiry",
    areaServed: [
      { "@type": "Country", name: "India" },
      ...servedRegions.map((name) => ({ "@type": "State", name })),
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        name: site.contact,
        telephone: site.phone,
        email: site.email,
        areaServed: "IN",
        availableLanguage: ["en", "hi", "mr"],
      },
    ],
    sameAs: social.map((profile) => profile.href),
    knowsAbout: [
      "IQF frozen berries",
      "fruit purees for patisserie",
      "imported fresh vegetables",
      "artisanal cheese",
      "Asian dry groceries",
      "frozen seafood",
      "cold chain distribution",
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

/** Product entity. No `offers` — see the note at the top of this file. */
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
    seller: { "@id": ORG_ID },
  };
}

export function itemListSchema(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.company} catalogue`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: canonical(`/products/${product.slug}`),
    })),
  };
}

/**
 * FAQ entities. Google retired FAQ rich results in May 2026, so this earns no
 * stars — it is kept because the answers are genuinely useful, and because
 * assistants and AI Overviews still read them.
 */
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
