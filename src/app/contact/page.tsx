import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { CoverageSection } from "@/components/seo/CoverageSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import {
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Contact ${site.contact} — ${site.company}, ${site.city}`,
  description: `Call or WhatsApp ${site.contact} on ${site.phone} for frozen berries, purees, imported vegetables and seafood. ${site.company} supplies kitchens in ${site.city} and across India. ${site.hours}.`,
  path: "/contact",
  keywords: [
    `${site.company} contact number`,
    "Adira Enterprises contact",
    "frozen berries supplier contact Mumbai",
    "food ingredient supplier near me Mumbai",
    "wholesale frozen fruit enquiry India",
  ],
});

const channels = [
  {
    icon: PhoneIcon,
    label: `Call ${site.contact}`,
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: WhatsAppIcon,
    label: "Message on WhatsApp",
    value: site.phone,
    href: site.whatsappHref,
  },
  {
    icon: MailIcon,
    label: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  { icon: PinIcon, label: "Cold store", value: site.address },
  { icon: ClockIcon, label: "Opening hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner with us"
        title="Let’s talk about your kitchen"
        description="Your culinary and baking vision deserves the finest canvas. Whether you need a sample box, a standing weekly delivery or help matching an ingredient to a recipe, we’re a message away."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-[clamp(2.5rem,6vw,4.5rem)]">
        <Container>
          <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[1fr_1.35fr]">
            <div className="flex flex-col gap-4">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="rounded-card border border-line-soft bg-white p-[clamp(1.125rem,2.2vw,1.5rem)] shadow-soft transition-[box-shadow,border-color,transform] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-[#c3ffab] hover:shadow-card"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-lime-soft text-navy">
                    <Icon className="size-[1.2rem]" />
                  </span>
                  <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.14em] text-muted-soft">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1.5 block text-[0.9375rem] font-medium text-navy underline-offset-4 transition-colors duration-300 hover:underline hover:decoration-[#c3ffab] hover:decoration-2"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-[0.9375rem] font-medium text-navy">
                      {value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-panel border border-line-soft bg-white p-[clamp(1.25rem,3vw,2.5rem)] shadow-soft">
              <h2 className="text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-tight">
                Send us a message
              </h2>
              <p className="mt-2.5 text-muted">
                Fields marked with an asterisk are required.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CoverageSection />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
