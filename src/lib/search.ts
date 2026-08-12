import { products } from "@/lib/products";
import { portfolio, catalogueHref } from "@/lib/portfolio";
import { navLinks, site } from "@/lib/site";

export type SearchResult = {
  title: string;
  description: string;
  href: string;
  /** Shown as a small badge and used only as a ranking tie-breaker. */
  group: "Page" | "Product" | "Category";
};

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

/**
 * Crude singular form so "berries" matches "berry" and "purees" matches
 * "puree". Deliberately simple — a real stemmer would be overkill for a
 * catalogue this size and would introduce false matches.
 */
function stem(word: string) {
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 3 && word.endsWith("es")) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s")) return word.slice(0, -1);
  return word;
}

function tokenise(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map(stem);
}

/**
 * The searchable text per entry. Product blurbs are folded in so a query like
 * "garnish" or "salad" can still find the right line, but they only ever
 * contribute a low weight so they cannot outrank a title match.
 */
const ENTRIES = INDEX.map((item, order) => {
  const product = products.find((p) => `/products/${p.slug}` === item.href);
  const bodyTokens = tokenise(
    `${item.title} ${item.description} ${product?.blurb ?? ""}`
  );
  return {
    item,
    order,
    titleTokens: tokenise(item.title),
    bodyTokens,
    /** Joined form, used only for whole-phrase containment. */
    haystack: bodyTokens.join(" "),
  };
});

/** Group order used only to break score ties. */
const GROUP_TIE: Record<SearchResult["group"], number> = {
  Product: 0,
  Category: 1,
  Page: 2,
};

/**
 * Relevance score. Returns 0 when nothing in the entry relates to the query,
 * which is what lets the caller tell a real match from a filler suggestion.
 */
function score(query: string, entry: (typeof ENTRIES)[number]) {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  const title = entry.item.title.toLowerCase();
  let total = 0;

  // Whole-query matches against the title are the strongest signal.
  if (title === q) total += 120;
  else if (title.startsWith(q)) total += 70;
  else if (title.includes(q)) total += 45;

  // Whole query appearing anywhere in the indexed text.
  if (total === 0 && entry.haystack.includes(q)) total += 18;

  /* Word-level matching, so multi-word and partial queries work: "frozen
     berry" finds "Blueberry IQF Frozen", and "berry" finds "Blueberry"
     because the token is checked for containment, not just prefix. */
  for (const word of tokenise(q)) {
    const exact = entry.titleTokens.includes(word);
    const prefix = !exact && entry.titleTokens.some((t) => t.startsWith(word));
    const inside =
      !exact && !prefix && entry.titleTokens.some((t) => t.includes(word));

    if (exact) total += 16;
    else if (prefix) total += 11;
    else if (inside) total += 7;
    /* Body matching is token-aware rather than a raw substring test. A plain
       `includes` let "berries" match the About page purely because its copy
       contains "Breadberry", which is not a result anyone wants. */
    else if (
      entry.bodyTokens.some((t) => t === word || t.startsWith(word))
    ) {
      total += 4;
    }
  }

  /*
   * Only nudge pages and categories once they have actually matched. Applying
   * this unconditionally made every page score above zero for every query, so
   * irrelevant pages crowded out the products the visitor was looking for.
   */
  if (total > 0) {
    if (entry.item.group === "Page") total += 6;
    else if (entry.item.group === "Category") total += 3;
  }

  return total;
}

export type RankedResult = SearchResult & {
  /** False for filler suggestions added when a query has few real matches. */
  matched: boolean;
};

/**
 * Ranked results, best match first, always non-empty.
 *
 * Results are returned in relevance order rather than grouped by type — the
 * grouped rendering it replaced always drew Pages and Categories first, which
 * pushed a genuinely matching product below the fold.
 */
export function search(query: string, limit = 8): RankedResult[] {
  const q = query.trim();

  if (!q) {
    return [...PAGES, ...CATEGORY_RESULTS]
      .slice(0, limit)
      .map((item) => ({ ...item, matched: false }));
  }

  const matched = ENTRIES.map((entry) => ({ entry, s: score(q, entry) }))
    .filter((r) => r.s > 0)
    .sort(
      (a, b) =>
        b.s - a.s ||
        GROUP_TIE[a.entry.item.group] - GROUP_TIE[b.entry.item.group] ||
        a.entry.order - b.entry.order
    )
    .map((r) => ({ ...r.entry.item, matched: true }));

  if (matched.length >= limit) return matched.slice(0, limit);

  /* Sparse result set: top up with general suggestions so the panel still
     offers somewhere to go instead of showing an empty state. */
  const already = new Set(matched.map((m) => m.href));
  const filler = [...PAGES, ...CATEGORY_RESULTS]
    .filter((item) => !already.has(item.href))
    .map((item) => ({ ...item, matched: false }));

  return [...matched, ...filler].slice(0, limit);
}
