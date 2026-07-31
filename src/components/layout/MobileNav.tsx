"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

const noopSubscribe = () => () => {};
import { cn } from "@/lib/cn";
import { navLinks, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "@/components/icons";

export function MobileNav({ pathname }: { pathname: string }) {
  /**
   * The route the sheet was opened on. Navigating changes `pathname`, which
   * closes the sheet without needing a state-sync effect.
   */
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  const sheetId = useId();
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  /**
   * Portals need a DOM target. This is the SSR-safe way to detect the client
   * without a mount flag set from an effect.
   */
  const isClient = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  // Scroll lock, Escape to dismiss, and a focus loop inside the sheet.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedOn(null);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = sheetRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(
      () => sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus(),
      260
    );

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const bar =
    "absolute left-0 h-[2px] w-full rounded-full bg-current transition-[top,bottom,transform,opacity] duration-500 ease-[var(--ease-out-soft)]";

  /**
   * The sheet is rendered into <body>. It cannot live inside the header:
   * the header applies `backdrop-filter` when scrolled, which makes it the
   * containing block for fixed-position descendants and collapses the sheet
   * into the header's own 4rem box.
   */
  const sheet = (
    <div
      id={sheetId}
      ref={sheetRef}
      role="dialog"
      aria-modal={open}
      aria-label="Site menu"
      inert={!open}
      className={cn(
        "fixed inset-0 z-90 flex flex-col overflow-y-auto bg-white pt-[4.25rem] transition-[opacity,visibility] duration-400 ease-[var(--ease-out-soft)] sm:pt-[4.75rem] lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
      <div aria-hidden className="hero-wash pointer-events-none absolute inset-0" />

      <nav
        aria-label="Mobile"
        className="relative px-[clamp(1.125rem,4vw,2.75rem)] pt-4"
      >
        <ul>
          {navLinks.map((link, index) => {
            const active = isActive(link.href);
            return (
              <li
                key={link.href}
                className={cn(
                  "border-b border-line-soft transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] [transition-delay:var(--d)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                )}
                style={{ "--d": `${open ? 120 + index * 55 : 0}ms` } as CSSProperties}
              >
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className="w-5 shrink-0 text-[0.6875rem] font-medium tabular-nums tracking-[0.14em] text-muted-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[1.625rem] leading-tight transition-colors duration-300",
                      active ? "text-blue" : "text-navy group-hover:text-blue"
                    )}
                  >
                    {link.label}
                  </span>
                  <ArrowRightIcon
                    className={cn(
                      "ml-auto size-[1.15rem] self-center transition-[transform,opacity] duration-400 ease-[var(--ease-out-soft)]",
                      active
                        ? "text-blue opacity-100"
                        : "text-muted-soft opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cn(
          "relative mt-auto px-[clamp(1.125rem,4vw,2.75rem)] pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)] [transition-delay:var(--d)]",
          open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
        style={{ "--d": `${open ? 120 + navLinks.length * 55 : 0}ms` } as CSSProperties}
      >
        <ButtonLink
          href="/request-a-quote"
          variant="accent"
          size="lg"
          withArrow
          className="w-full"
        >
          Request a Quote
        </ButtonLink>

        <dl className="mt-7 grid gap-3 text-[0.8125rem]">
          <div className="flex items-center gap-3">
            <dt className="sr-only">Phone</dt>
            <PhoneIcon className="size-4 shrink-0 text-blue" />
            <dd>
              <a
                href={site.phoneHref}
                className="text-muted transition-colors duration-300 hover:text-navy"
              >
                {site.phone}
              </a>
            </dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="sr-only">Email</dt>
            <MailIcon className="size-4 shrink-0 text-blue" />
            <dd>
              <a
                href={`mailto:${site.email}`}
                className="text-muted transition-colors duration-300 hover:text-navy"
              >
                {site.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpenedOn(open ? null : pathname)}
        aria-expanded={open}
        aria-controls={sheetId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative grid size-11 shrink-0 place-items-center rounded-full text-navy transition-colors duration-300 hover:bg-surface lg:hidden"
      >
        {/* Three bars that morph into a cross */}
        <span aria-hidden className="relative block h-[0.875rem] w-[1.375rem]">
          <span
            className={cn(
              bar,
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 rotate-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-current transition-[transform,opacity] duration-300 ease-[var(--ease-out-soft)]",
              open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
            )}
          />
          <span
            className={cn(
              bar,
              open
                ? "bottom-1/2 translate-y-1/2 -rotate-45"
                : "bottom-0 rotate-0"
            )}
          />
        </span>
      </button>

      {isClient && createPortal(sheet, document.body)}
    </>
  );
}
