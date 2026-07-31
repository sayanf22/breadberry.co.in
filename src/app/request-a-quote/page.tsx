import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import {
  CheckIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell us your volumes and delivery city and we'll return bulk pricing, pack sizes and the next available dispatch slot within one working day.",
};

const promises = [
  "Pricing back within one working day",
  "Pack sizes from 1 kg to full pallet",
  "Samples available for first orders",
  "Any line across our five categories",
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Bulk enquiries"
        title="Request a Quote"
        description={`Share a few details about your kitchen and volumes. A member of the ${site.company} supply team will come back with pricing, availability and dispatch dates.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
      />

      <section className="py-[clamp(2.5rem,6vw,4.5rem)]">
        <Container>
          <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[1.55fr_1fr]">
            <div className="rounded-panel border border-line-soft bg-white p-[clamp(1.25rem,3vw,2.5rem)] shadow-soft">
              <QuoteForm />
            </div>

            <aside className="flex flex-col gap-5">
              <div className="rounded-panel bg-surface p-[clamp(1.25rem,2.5vw,1.75rem)]">
                <h2 className="font-sans text-[1.0625rem] font-semibold leading-snug text-navy">
                  What happens next
                </h2>
                <ul className="mt-4 space-y-3">
                  {promises.map((line) => (
                    <li key={line} className="flex gap-3 text-muted">
                      <CheckIcon className="mt-0.5 size-5 shrink-0 rounded-full bg-lime-soft p-1 text-navy" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-panel border border-line-soft bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-soft">
                <h2 className="font-sans text-[1.0625rem] font-semibold leading-snug text-navy">
                  Prefer to talk?
                </h2>
                <ul className="mt-4 space-y-3.5">
                  <li>
                    <a
                      href={site.whatsappHref}
                      className="flex min-h-11 items-center gap-3 text-muted transition-colors duration-300 hover:text-navy"
                    >
                      <WhatsAppIcon className="size-4 shrink-0 text-navy" />
                      WhatsApp {site.contact}
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.phoneHref}
                      className="flex min-h-11 items-center gap-3 text-muted transition-colors duration-300 hover:text-navy"
                    >
                      <PhoneIcon className="size-4 shrink-0 text-navy" />
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="flex min-h-11 items-center gap-3 text-muted transition-colors duration-300 hover:text-navy"
                    >
                      <MailIcon className="size-4 shrink-0 text-navy" />
                      {site.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-muted">
                    <ClockIcon className="size-4 shrink-0 text-navy" />
                    {site.hours}
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
