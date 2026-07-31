"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { ProductCard } from "@/components/products/ProductCard";
import { categories, products, type ProductCategory } from "@/lib/products";

type TabId = "all" | ProductCategory;

function isTabId(value: string | null): value is TabId {
  return !!value && categories.some((category) => category.id === value);
}

/**
 * Tab state is local, not `useSearchParams`.
 *
 * Reading search params here would opt the whole catalogue out of static
 * rendering, so all 77 cards would arrive only after hydration — invisible to
 * crawlers and slower to first paint. Instead the full grid is server
 * rendered, and `?category=` is synced from the URL on mount and kept in
 * history so deep links and back/forward still work.
 */
export function ProductFilter() {
  const [active, setActive] = useState<TabId>("all");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const listRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const fromUrl = () => {
      const value = new URLSearchParams(window.location.search).get("category");
      setActive(isTabId(value) ? value : "all");
    };
    fromUrl();
    window.addEventListener("popstate", fromUrl);
    return () => window.removeEventListener("popstate", fromUrl);
  }, []);

  const measure = useCallback(() => {
    const tab = tabRefs.current[active];
    if (!tab) return;
    setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
  }, [active]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* Keep the selected option visible in the compact, horizontally scrollable
     mobile control without shifting the page vertically. */
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab) return;

    const frame = requestAnimationFrame(() => {
      const left = tab.offsetLeft;
      const right = left + tab.offsetWidth;
      let target = list.scrollLeft;

      if (left < list.scrollLeft + 4) target = Math.max(0, left - 4);
      else if (right > list.scrollLeft + list.clientWidth - 4)
        target = right - list.clientWidth + 4;
      else return;

      list.scrollTo({
        left: target,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [active]);

  const select = (id: TabId) => {
    if (id === active) return;
    setActive(id);
    const url =
      id === "all" ? "/products#range" : `/products?category=${id}#range`;
    window.history.pushState({ category: id }, "", url);
  };

  // Roving arrow-key navigation between tabs.
  const onKeyDown = (event: KeyboardEvent) => {
    const order = categories.map((category) => category.id);
    const index = order.indexOf(active);
    let next = index;

    if (event.key === "ArrowRight") next = (index + 1) % order.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + order.length) % order.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = order.length - 1;
    else return;

    event.preventDefault();
    const id = order[next];
    select(id);
    tabRefs.current[id]?.focus();
  };

  const visible =
    active === "all"
      ? products
      : products.filter((product) => product.category === active);

  /* "All Products" reads as a catalogue rather than one long run of cards, so
     it is split into labelled range sections in tab order. A single selected
     range needs no heading — the tab already names it. */
  const showHeadings = active === "all";

  const ranges = (
    showHeadings
      ? categories.filter((category) => category.id !== "all")
      : categories.filter((category) => category.id === active)
  ).map((category) => ({
    ...category,
    items: showHeadings
      ? products.filter((product) => product.category === category.id)
      : visible,
  }));

  /* Offsets stay derived rather than accumulated in place, so the first four
     cards on screen keep image priority without mutating during render. */
  const groups = ranges.map((range, index) => ({
    ...range,
    offset: ranges
      .slice(0, index)
      .reduce((total, previous) => total + previous.items.length, 0),
  }));

  return (
    <>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Filter products by range"
        onKeyDown={onKeyDown}
        className="no-scrollbar relative flex w-full max-w-full gap-1 overflow-x-auto rounded-[1rem] border border-line-soft bg-white p-1 shadow-soft sm:w-fit"
      >
        {/* One restrained brand-green indicator connects every option. */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-1 top-1 left-0 rounded-[0.75rem] bg-[#c3ffab] transition-[transform,width,opacity] duration-500 ease-[var(--ease-out-soft)]"
          style={{
            width: `${indicator.width}px`,
            transform: `translateX(${indicator.left}px)`,
            opacity: indicator.width ? 1 : 0,
          }}
        />

        {categories.map((category) => {
          const selected = category.id === active;
          const count =
            category.id === "all"
              ? products.length
              : products.filter((product) => product.category === category.id)
                  .length;

          return (
            <button
              key={category.id}
              ref={(node) => {
                tabRefs.current[category.id] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${category.id}`}
              aria-selected={selected}
              aria-controls="product-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(category.id)}
              className={cn(
                "relative z-10 flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-[0.75rem] px-3.5 py-2.5 text-[0.8125rem] font-medium transition-[color,background-color] duration-400 sm:px-4",
                selected
                  ? "text-navy"
                  : "text-muted hover:bg-lime-soft hover:text-navy"
              )}
            >
              <span>{category.label}</span>
              <span
                className={cn(
                  "ml-2 rounded-pill px-1.5 py-0.5 text-[0.625rem] tabular-nums transition-colors duration-400",
                  selected
                    ? "bg-navy/10 text-navy"
                    : "bg-surface text-muted-soft"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="product-panel"
        aria-labelledby={`tab-${active}`}
        className="mt-[clamp(1.75rem,3.5vw,2.5rem)]"
      >
        {/* The keyed wrapper remounts on selection. Cards then enter in a
            short sequence rather than the whole panel flashing at once. */}
        <div key={`ranges-${active}`}>
          {groups.map((group, groupIndex) => (
            <section
              key={group.id}
              id={`range-${group.id}`}
              aria-labelledby={showHeadings ? `range-heading-${group.id}` : undefined}
              className={cn(
                "scroll-mt-28",
                groupIndex > 0 && "mt-[clamp(2.25rem,4.5vw,3.5rem)]"
              )}
            >
              {showHeadings && (
                <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1.5 border-t border-line-soft pt-[clamp(0.875rem,1.6vw,1.125rem)]">
                  <h2
                    id={`range-heading-${group.id}`}
                    className="flex items-center gap-2.5 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-navy"
                  >
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full bg-[#c3ffab]"
                    />
                    {group.label}
                  </h2>
                  <p className="text-[0.75rem] tabular-nums text-muted-soft">
                    {group.items.length} lines
                  </p>
                </div>
              )}

              <div
                className={cn(
                  "grid grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.25rem)] lg:grid-cols-3 xl:grid-cols-4",
                  showHeadings && "mt-[clamp(1rem,2vw,1.5rem)]"
                )}
              >
                {group.items.map((product, index) => (
                  <div
                    key={product.slug}
                    className="product-grid-item h-full"
                    style={
                      {
                        "--product-index": Math.min(index, 12),
                      } as CSSProperties
                    }
                  >
                    <ProductCard
                      product={product}
                      priority={group.offset + index < 4}
                      sizes="(min-width: 1280px) 19rem, (min-width: 1024px) 26vw, 46vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p
          key={`count-${active}`}
          className="product-count-enter mt-8 text-[0.8125rem] text-muted-soft"
          aria-live="polite"
        >
          Showing {visible.length} of {products.length} products
        </p>
      </div>
    </>
  );
}
