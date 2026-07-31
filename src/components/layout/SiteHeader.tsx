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
    <header className="sticky top-0 z-100 w-full">
      {/* Full-width white bar attached 100% to left and right edges, with rounded bottom-left and bottom-right corners */}
      <div
        className={cn(
          "w-full rounded-b-[2rem] border-b border-navy/10 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-soft)] sm:rounded-b-[2.5rem] lg:rounded-b-[3rem]",
          scrolled
            ? "bg-white/92 shadow-[0_8px_30px_-6px_rgb(11_44_79/0.12)] backdrop-blur-xl"
            : "bg-white shadow-[0_4px_20px_-4px_rgb(11_44_79/0.06)]"
        )}
      >
        <Container>
          <div className="flex h-[4.5rem] items-center justify-between gap-4 sm:h-[5rem] lg:h-[5.5rem]">
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
                            ? "font-medium text-navy"
                            : "text-muted hover:text-navy"
                        )}
                      >
                        {link.label}
                        {/* Lime underline indicator */}
                        <span
                          aria-hidden
                          className={cn(
                            "mt-1.5 block h-[2px] w-full origin-center rounded-full bg-lime-soft transition-transform duration-500 ease-[var(--ease-out-soft)]",
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
              <div className="hidden lg:block">
                <ButtonLink
                  href="/request-a-quote"
                  variant="accent"
                  size="md"
                  className="shadow-[0_4px_16px_rgba(11,44,79,0.12),0_2px_6px_rgba(195,255,171,0.5)] hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(11,44,79,0.18),0_4px_10px_rgba(195,255,171,0.7)]"
                >
                  Request a Quote
                </ButtonLink>
              </div>

              <a
                href={site.phoneHref}
                aria-label={`Call ${site.name} on ${site.phone}`}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-white shadow-md transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-navy-deep hover:shadow-lg active:translate-y-0 lg:size-12"
              >
                <PhoneIcon className="size-[1.05rem] lg:size-[1.15rem]" />
              </a>

              <MobileNav pathname={pathname} />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
