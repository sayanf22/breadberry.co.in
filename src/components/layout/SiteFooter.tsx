import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import {
  ClockIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/icons";
import { navLinks, site, social } from "@/lib/site";
import { portfolio } from "@/lib/portfolio";

const socialIcons = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
} as const;

const contactRows = [
  { icon: PinIcon, label: site.address },
  { icon: MailIcon, label: site.email, href: `mailto:${site.email}` },
  { icon: PhoneIcon, label: site.phone, href: site.phoneHref },
  { icon: ClockIcon, label: site.hours },
];

/** Column heading — same treatment across all four columns. */
function ColumnTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-cream"
    >
      {children}
    </h2>
  );
}

/** Divider-separated link list, as in the reference footer. */
function LinkList({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <ul className="mt-5">
      {items.map((item) => (
        <li key={item.label} className="border-b border-white/8">
          {/* py-3 keeps the row at ~44px for touch. */}
          <Link
            href={item.href}
            className="block py-3 text-[0.8125rem] text-cream/60 transition-colors duration-300 hover:text-mint"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      {/* Dark block, full-bleed with a large radius on all four corners */}
      <div className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,2.75rem)] bg-night pb-[clamp(2rem,4vw,3rem)] pt-[clamp(2.5rem,5vw,4rem)]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(42% 55% at 8% 0%, rgb(50 105 28 / .16) 0%, transparent 70%)",
          }}
        />

        <Container>
          <div className="grid gap-[clamp(2rem,4vw,3rem)] sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.4fr]">
            {/* About */}
            <div>
              <Image
                src="/assets/logo-mark.webp"
                alt={site.name}
                width={481}
                height={276}
                sizes="128px"
                className="h-[2.75rem] w-auto"
              />
              <p className="mt-5 max-w-[38ch] text-[0.8125rem] leading-relaxed text-cream/60">
                <span className="font-medium text-mint">{site.name}</span> is a
                signature brand of{" "}
                <span className="font-medium text-cream/85">{site.company}</span>
                , supplying premium global ingredients to 5-star hotels,
                fine-dining restaurants, confectioneries and artisanal bakers
                across {site.city}.
              </p>
              {/* /55 not /40: 40% lands at 3.59:1 on the black, under AA. */}
              <p className="mt-4 text-[0.75rem] text-cream/55">
                Serving {site.clientsServed} kitchens since {site.founded}
              </p>
            </div>

            {/* Quick links */}
            <nav aria-labelledby="footer-nav">
              <ColumnTitle id="footer-nav">Quick links</ColumnTitle>
              <LinkList
                items={[
                  ...navLinks,
                  { label: "Request a Quote", href: "/request-a-quote" },
                ]}
              />
            </nav>

            {/* Selection */}
            <nav aria-labelledby="footer-range">
              <ColumnTitle id="footer-range">Our selection</ColumnTitle>
              <LinkList
                items={portfolio.map((category) => ({
                  label: category.name,
                  href: category.hasCatalogue ? "/products#range" : "/products",
                }))}
              />
            </nav>

            {/* Contact */}
            <div>
              <ColumnTitle>Contact us</ColumnTitle>
              <ul className="mt-5 space-y-4">
                {contactRows.map(({ icon: Icon, label, href }) => (
                  <li key={label} className="flex gap-3">
                    <Icon className="mt-[0.15rem] size-4 shrink-0 text-mint" />
                    {href ? (
                      <a
                        href={href}
                        className="text-[0.8125rem] leading-relaxed text-cream/60 transition-colors duration-300 hover:text-mint"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="text-[0.8125rem] leading-relaxed text-cream/60">
                        {label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Legal row sits on the page background, outside the dark block */}
      <Container>
        <div className="flex flex-col items-center gap-4 py-[clamp(1.5rem,3vw,2.25rem)]">
          {social.length > 0 && (
            <ul className="flex items-center gap-2">
              {social.map(({ label, href }) => {
                const Icon = socialIcons[label as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${site.name} on ${label}`}
                      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-[color,border-color,transform] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-green-deep/45 hover:text-green-deep"
                    >
                      <Icon className="size-[1.05rem]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="text-center text-[0.75rem] text-muted-soft">
            © {new Date().getFullYear()} {site.company}. All rights reserved. ·{" "}
            {site.city}, India
          </p>
        </div>
      </Container>
    </footer>
  );
}
