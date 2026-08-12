import { products } from "@/lib/products";
import { portfolio, catalogueHref } from "@/lib/portfolio";
import { navLinks, site } from "@/lib/site";

export type SearchResult = {
  title: string;
  description: string;
  href: string;
  /** Groups results in the UI and slightly weights ranking. */
  group: "Page" | "Product" | "Category";
};

/**
 * Every searchable item on the site, built once at module load. Products
 * dominate the index (77 lines), so pages and categories carry a small score
 * boost — otherwise a query like "about" would be buried under partial product
 * matches that happen to share letters.
 */
const PAGES: SearchResult[] = navLinks
  .filter((link) => link.href !== "/")
  .map((link) => ({
    title: link.label,
    description:
      link.href === "/products"
        ? `Browse ${products.length} frozen, chilled and fresh lines.`
        : link.href === "/why-us"
          ? "Cold-chain control, verified provenance and consistent supply."
          : link.href === "/about"
            ? `${site.name} is the signature brand of ${site.company}.`
            : `Talk to ${site.contact} about your order.`,
    href: link.href,
    group: "Page" as const,
  }));

const CATEGORY_RESULTS: SearchResult[] = portfolio.map((category) => ({
  title: category.name,
  description: category.summary,
  href: catalogueHref(category),
  group: "Category" as const,
}));

const PRODUCT_RESULTS: SearchResult[] = products.map((product) => ({
  title: product.name,
  description: `${product.categoryLabel} · ${product.form}`,
  href: `/products/${product.slug}`,
  group: "Product" as const,
}));

const INDEX: SearchResult[] = [...PAGES, ...CATEGORY_RESULTS, ...PRODUCT_RESULTS];

/** Lower-cased, punctuation-stripped tokens for fuzzy matching. */
function tokens(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

const ENTRIES = INDEX.map((item) => ({
  item,
  haystack: tokens(`${item.title} ${item.description}`).join(" "),
  titleTokens: tokens(item.title),
}));

/**
 * Scores how well `query` matches an entry. Returns 0 for no relationship at
 * all — the caller falls back to showing top results rather than "no
 * matches", per the requirement that search always surfaces something useful.
 */
function score(query: string, entry: (typeof ENTRIES)[number]) {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  let total = 0;

  // Exact or prefix match on the title — the strongest signal.
  const title = entry.item.title.toLowerCase();
  if (title === q) total += 100;
  else if (title.startsWith(q)) total += 60;
  else if (title.includes(q)) total += 35;

  // Whole-word match anywhere in title or description.
  if (entry.haystack.includes(q)) total += 20;

  // Per-query-word matching, so "frozen berry" matches "Blueberry IQF Frozen".
  const queryWords = tokens(q);
  for (const word of queryWords) {
    if (entry.titleTokens.some((t) => t.startsWith(word))) total += 12;
    else if (entry.haystack.includes(word)) total += 5;
  }

  // Small boost so pages and categories don't get buried under products.
  if (entry.item.group === "Page") total += 8;
  if (entry.item.group === "Category") total += 4;

  return total;
}

/**
 * Always returns results. If the query has no real match, this falls back to
 * the most relevant general entries (pages first, then categories) instead of
 * an empty state — search should never look broken.
 */
export function search(query: string, limit = 8): SearchResult[] {
  const q = query.trim();

  if (!q) {
    return [...PAGES, ...CATEGORY_RESULTS].slice(0, limit);
  }

  const ranked = ENTRIES.map((entry) => ({ entry, s: score(q, entry) }))
    .sort((a, b) => b.s - a.s);

  const matched = ranked.filter((r) => r.s > 0).map((r) => r.entry.item);

  if (matched.length >= limit) return matched.slice(0, limit);

  // Fewer than `limit` real matches: top up with the best general fallbacks
  // (pages and categories) so the panel is never sparse or empty.
  const already = new Set(matched.map((m) => m.href));
  const fallback = [...PAGES, ...CATEGORY_RESULTS].filter(
    (item) => !already.has(item.href)
  );

  return [...matched, ...fallback].slice(0, limit);
}
