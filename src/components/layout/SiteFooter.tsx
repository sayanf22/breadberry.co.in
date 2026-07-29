import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { navLinks, site } from "@/lib/site";
import { portfolio } from "@/lib/portfolio";

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
            <p className="mt-5 max-w-[36ch] text-muted">
              A signature brand of {site.company} — premium frozen berries and
              fruit purees for {site.city}&rsquo;s hotels, restaurants,
              confectioneries and artisanal bakers.
            </p>
            <p className="mt-4 text-[0.75rem] text-muted-soft">
              Serving {site.clientsServed} kitchens since {site.founded}
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
                    className="text-muted transition-colors duration-300 hover:text-green-deep"
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
              Selection
            </h2>
            <ul className="mt-4 space-y-2.5">
              {portfolio.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={category.hasCatalogue ? "/products#range" : "/products"}
                    className="text-muted transition-colors duration-300 hover:text-green-deep"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-eyebrow font-sans font-semibold uppercase text-navy">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3">
              {contactRows.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex gap-3">
                  <Icon className="mt-[0.2rem] size-4 shrink-0 text-green-deep" />
                  {href ? (
                    <a
                      href={href}
                      className="text-muted transition-colors duration-300 hover:text-green-deep"
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
            © {new Date().getFullYear()} {site.company}. {site.name} is a
            signature brand of {site.company}.
          </p>
          <p>{site.city}, India · Rigorous cold-chain protocols</p>
        </div>
      </Container>
    </footer>
  );
}
