"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { categoryArt } from "@/components/illustrations/categories";
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
  const listRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const sync = () => {
      const value = new URLSearchParams(window.location.search).get("category");
      setActive(isTabId(value) ? value : "all");
    };

    /* Defer the first sync past the current React commit so setActive never
       fires during the Router render that mounts this component. */
    const timer = setTimeout(sync, 0);
    window.addEventListener("popstate", sync);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  /* Keep the selected tile visible in the horizontally scrollable rail without
     shifting the page vertically. */
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
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {/* Range rail on the brand green, so the white tiles read as cards
            lifted off a coloured band rather than outlines on white. */}
        <div className="rounded-[1.5rem] bg-lime-soft p-2 shadow-[inset_0_1px_4px_rgb(11_44_79_/_0.1)] sm:p-3">
          <div
            ref={listRef}
            role="tablist"
            aria-label="Filter products by range"
            onKeyDown={onKeyDown}
            /* Scrolls on phones, then spreads to fill the band from `sm` so no
               dead space is left at the end of the row. */
            className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto sm:grid sm:grid-cols-3 sm:gap-2.5 sm:overflow-visible lg:grid-cols-6"
          >
            {categories.map((category) => {
              const selected = category.id === active;
              const { Art, tone } = categoryArt[category.id];

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
                    "group/tile flex w-[5.5rem] shrink-0 snap-start flex-col items-center gap-2 rounded-[1rem] border bg-white p-1.5 pb-2 transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-soft)] sm:w-full sm:p-2 sm:pb-2.5",
                    selected
                      ? "-translate-y-0.5 border-navy shadow-card"
                      : "border-white/70 shadow-soft hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-card"
                  )}
                >
                  {/* Square illustration panel, matching the reference
                      proportions — the artwork fills the tile. */}
                  <span
                    className={cn(
                      "grid aspect-square w-full place-items-center overflow-hidden rounded-[0.75rem]",
                      tone
                    )}
                  >
                    <Art className="size-[78%] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/tile:scale-105" />
                  </span>

                  <span
                    className={cn(
                      "flex min-h-[2.25rem] items-start px-0.5 text-center text-[0.6875rem] font-semibold leading-tight transition-colors duration-400 sm:text-[0.75rem]",
                      selected ? "text-navy" : "text-navy/70"
                    )}
                  >
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The only running total on the page — the per-range counts sit in
            their own headings, so nothing repeats it under the grid. */}
        <p
          key={`count-${active}`}
          className="product-count-enter text-[0.8125rem] tabular-nums text-muted-soft sm:text-right"
          aria-live="polite"
        >
          {visible.length} products
        </p>
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
      </div>
    </>
  );
}
