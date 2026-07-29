"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { navLinks, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { PhoneIcon } from "@/components/icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // z-100 keeps the header (and its menu trigger) above the mobile
        // sheet, which is portalled to <body> at z-90.
        "sticky top-0 z-100 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-out-soft)]",
        scrolled
          ? "bg-white/85 shadow-[0_1px_0_rgb(11_44_79/0.06),0_14px_30px_-26px_rgb(11_44_79/0.4)] backdrop-blur-xl"
          : "bg-white"
      )}
    >
      <Container>
        <div className="flex h-[4.25rem] items-center justify-between gap-4 sm:h-[4.75rem] lg:h-[5.5rem]">
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative inline-flex flex-col items-center px-3.5 py-2 text-[0.875rem] transition-colors duration-300",
                        active
                          ? "font-medium text-green-deep"
                          : "text-muted hover:text-green-deep"
                      )}
                    >
                      {link.label}
                      {/* Green rule: held open on the active item, wiping out
                          from the centre on hover. */}
                      <span
                        aria-hidden
                        className={cn(
                          "mt-1.5 block h-[2px] w-full origin-center rounded-full bg-gradient-to-r from-green-deep via-green-deep to-green transition-transform duration-500 ease-[var(--ease-out-soft)]",
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/*
              Shown only once the viewport can hold it without crowding.
              The `hidden` must live on a wrapper, not on the button: Button's
              base classes include `inline-flex`, which Tailwind emits after
              `.hidden`, so the two collide and `hidden` loses.
            */}
            <div className="hidden lg:block">
              <ButtonLink href="/request-a-quote" variant="accent" size="md">
                Request a Quote
              </ButtonLink>
            </div>

            <a
              href={site.phoneHref}
              aria-label={`Call ${site.name} on ${site.phone}`}
              /* size-11 = 44px, the minimum comfortable touch target. */
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-navy transition-[color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-green-deep/45 hover:text-green-deep hover:shadow-soft lg:size-12"
            >
              <PhoneIcon className="size-[1.05rem] lg:size-[1.15rem]" />
            </a>

            <MobileNav pathname={pathname} />
          </div>
        </div>
      </Container>
    </header>
  );
}
