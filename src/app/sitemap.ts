import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/products", priority: 0.95, changeFrequency: "weekly" as const },
    {
      path: "/request-a-quote",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/why-us",
      priority: 0.75,
      changeFrequency: "monthly" as const,
    },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    {
      path: "/contact",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
  ];

  return [
    ...pages.map(({ path, priority, changeFrequency }) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...products.map((product) => ({
      url: `${site.url}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
