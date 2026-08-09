import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/lib/site";

/** UI + body copy. Clean modern grotesque, variable weight. */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Display type. Editorial serif matching the supplied reference —
 * swap this single import to change every heading on the site.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    /* Brand + parent company + category + city: the four things people
       actually type. Both name spellings are covered by the description and
       the entity aliases in structured data. */
    default: `${site.name} by ${site.company} — ${site.tagline} Supplier in ${site.city}, India`,
    template: `%s · ${site.name} by ${site.company}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.company, url: site.url }],
  creator: site.company,
  publisher: site.company,
  category: "Food & Beverage Wholesale",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${site.name} by ${site.company}`,
    title: `${site.name} by ${site.company} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} by ${site.company} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} by ${site.company}`,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  /* Set GOOGLE_SITE_VERIFICATION to verify the property without a code change. */
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  manifest: "/manifest.json",
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    title: site.name,
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    /* favicon.ico carries 16/32/48 for legacy browsers and bookmark bars; the
       PNGs are what modern browsers and Android actually pick up. */
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      /* Tells Next the smooth scroll is intentional, silencing its warning. */
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        {/* Entity graph, once for the whole site. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-200 rounded-pill bg-navy px-5 py-2.5 text-[0.8125rem] font-medium text-white shadow-btn"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
