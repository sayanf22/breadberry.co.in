import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ChevronRightIcon } from "@/components/icons";

export type Crumb = { label: string; href?: string };

/** Compact page header that reuses the hero's ambient wash and type scale. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line-soft">
      <div aria-hidden className="hero-wash absolute inset-0 -z-10" />

      <Container>
        <div className="pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(1.75rem,4vw,3rem)]">
          {crumbs && crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-muted">
                {crumbs.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <ChevronRightIcon
                        className="size-3 text-muted-soft"
                        aria-hidden
                      />
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors duration-300 hover:text-blue"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-navy">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="hero-item" style={{ "--d": "0ms" } as React.CSSProperties}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>

          <h1
            className="hero-item mt-4 max-w-[24ch] text-h1"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            {title}
          </h1>

          {description && (
            <p
              className="hero-item text-lead mt-5 max-w-[58ch] text-muted"
              style={{ "--d": "160ms" } as React.CSSProperties}
            >
              {description}
            </p>
          )}

          {children && (
            <div
              className="hero-item mt-8"
              style={{ "--d": "240ms" } as React.CSSProperties}
            >
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
