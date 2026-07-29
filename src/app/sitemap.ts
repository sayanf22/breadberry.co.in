import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/why-us", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/request-a-quote", priority: 0.8 },
  ];

  return [
    ...pages.map(({ path, priority }) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      priority,
    })),
    ...products.map((product) => ({
      url: `${site.url}/products/${product.slug}`,
      lastModified: now,
      priority: 0.5,
    })),
  ];
}
