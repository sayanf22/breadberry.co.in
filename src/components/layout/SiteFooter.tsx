import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { navLinks, site } from "@/lib/site";
import { categories } from "@/lib/products";

const contactRows = [
  { icon: PhoneIcon, label: site.phone, href: site.phoneHref },
  { icon: MailIcon, label: site.email, href: `mailto:${site.email}` },
  { icon: PinIcon, label: site.address },
  { icon: ClockIcon, label: site.hours },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line-soft bg-surface">
      <Container>
        <div className="grid gap-[clamp(2rem,4vw,3rem)] py-[clamp(2.5rem,5vw,4rem)] sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-[34ch] text-muted">
              Premium IQF berries and single-origin fruit purees, supplied in
              bulk to restaurants, cafés, bakeries and hotel groups.
            </p>
          </div>

          <nav aria-labelledby="footer-nav">
            <h2
              id="footer-nav"
              className="text-eyebrow font-sans font-semibold uppercase text-navy"
            >
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted transition-colors duration-300 hover:text-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-range">
            <h2
              id="footer-range"
              className="text-eyebrow font-sans font-semibold uppercase text-navy"
            >
              Range
            </h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={
                      category.id === "all"
                        ? "/products"
                        : `/products?category=${category.id}`
                    }
                    className="text-muted transition-colors duration-300 hover:text-blue"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/request-a-quote"
                  className="text-muted transition-colors duration-300 hover:text-blue"
                >
                  Bulk pricing
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-eyebrow font-sans font-semibold uppercase text-navy">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3">
              {contactRows.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex gap-3">
                  <Icon className="mt-[0.2rem] size-4 shrink-0 text-blue" />
                  {href ? (
                    <a
                      href={href}
                      className="text-muted transition-colors duration-300 hover:text-blue"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-muted">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-[0.75rem] text-muted-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>FSSAI licensed · HACCP compliant cold chain</p>
        </div>
      </Container>
    </footer>
  );
}
