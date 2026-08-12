"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/cn";
import { search } from "@/lib/search";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@/components/icons";

const noopSubscribe = () => () => {};

/**
 * Site-wide search, triggered from the header icon. Results update as you
 * type and always show something — see `search()` in `@/lib/search`, which
 * falls back to top pages and categories rather than rendering an empty state
 * when a query has no direct match.
 */
export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const dialogId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  const results = search(query);

  const close = () => {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  };

  /*
   * Reset the highlighted row whenever the query or open state changes. This
   * is React's documented "adjust state during render" pattern for derived
   * state — comparing against a state snapshot rather than a ref, so it stays
   * compatible with the React Compiler's rule against mutating refs in render.
   */
  const [snapshot, setSnapshot] = useState({ query, open });
  if (snapshot.query !== query || snapshot.open !== open) {
    setSnapshot({ query, open });
    if (activeIndex !== 0) setActiveIndex(0);
  }

  // Scroll lock + focus + Escape-to-close while open.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60);

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  // Global "/" shortcut to open search, ignored while typing elsewhere.
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (event.key === "/" && !typing && !open) {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const onListKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      const target = results[activeIndex];
      if (target) {
        window.location.href = target.href;
        close();
      }
    }
  };

  const panel = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the site"
      inert={!open}
      className={cn(
        "fixed inset-0 z-200 flex items-start justify-center bg-navy-deep/60 px-4 pt-[max(5rem,10vh)] backdrop-blur-sm transition-[opacity,visibility] duration-300 ease-[var(--ease-out-soft)]",
        open ? "visible opacity-100" : "invisible opacity-0"
      )}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        id={dialogId}
        className="panel-enter w-full max-w-[36rem] overflow-hidden rounded-panel bg-white shadow-lift"
      >
        <div className="flex items-center gap-3 border-b border-line-soft px-5 py-4">
          <SearchIcon className="size-5 shrink-0 text-muted-soft" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onListKeyDown}
            placeholder="Search products, pages…"
            aria-label="Search"
            aria-controls={`${dialogId}-results`}
            aria-activedescendant={
              results[activeIndex] ? `${dialogId}-opt-${activeIndex}` : undefined
            }
            role="combobox"
            aria-expanded={open}
            autoComplete="off"
            className="w-full bg-transparent text-[0.9375rem] text-navy placeholder:text-muted-soft focus:outline-none"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="grid size-8 shrink-0 place-items-center rounded-full text-muted transition-colors duration-300 hover:bg-surface hover:text-navy"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        <div
          ref={listRef}
          id={`${dialogId}-results`}
          role="listbox"
          className="max-h-[24rem] overflow-y-auto no-scrollbar px-2 py-2"
        >
          {results.map((result, index) => {
            const active = index === activeIndex;
            /* Label the point where real matches end and general suggestions
               begin, so filler never looks like a bad match. */
            const showSuggestionDivider =
              !result.matched && (index === 0 || results[index - 1]?.matched);

            return (
              <div key={result.href}>
                {showSuggestionDivider && (
                  <p className="px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-soft">
                    {query.trim() ? "You might also want" : "Jump to"}
                  </p>
                )}
                <Link
                  id={`${dialogId}-opt-${index}`}
                  role="option"
                  aria-selected={active}
                  href={result.href}
                  onClick={close}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200",
                    active ? "bg-lime-mist" : "hover:bg-surface"
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.875rem] font-medium text-navy">
                      {result.title}
                    </span>
                    <span className="block truncate text-[0.75rem] text-muted">
                      {result.description}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-pill bg-surface px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-soft">
                    {result.group}
                  </span>
                  <ArrowRightIcon className="size-4 shrink-0 text-muted-soft" />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="border-t border-line-soft px-5 py-2.5 text-[0.6875rem] text-muted-soft">
          <kbd className="rounded border border-line px-1.5 py-0.5">↑</kbd>{" "}
          <kbd className="rounded border border-line px-1.5 py-0.5">↓</kbd> to
          navigate ·{" "}
          <kbd className="rounded border border-line px-1.5 py-0.5">Enter</kbd>{" "}
          to select ·{" "}
          <kbd className="rounded border border-line px-1.5 py-0.5">Esc</kbd> to
          close
        </p>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="grid size-11 shrink-0 place-items-center rounded-full text-navy transition-colors duration-300 hover:bg-surface lg:size-12"
      >
        <SearchIcon className="size-[1.15rem] lg:size-[1.25rem]" />
      </button>

      {isClient && createPortal(panel, document.body)}
    </>
  );
}
