import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

/**
 * The questions buyers actually ask before a first order.
 *
 * Written as real answers, not keyword filler: these are the phrases chefs and
 * procurement managers search, and assistants quote answers like these directly.
 */
export const supplyFaqs = [
  {
    question: "What is the minimum order for frozen berries or purees?",
    answer: `Minimums depend on the range and your delivery city. Most kitchens start with a trial box before moving to a standing weekly or fortnightly delivery. Message ${site.contact} on ${site.phone} with the lines you need and we will confirm the minimum for your city.`,
  },
  {
    question: "Do you deliver outside Mumbai?",
    answer: `Yes. We are based in ${site.city} and ship to professional kitchens across India, including Pune, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad and Goa. Lead times vary by region, so ask us for a delivery schedule for your city.`,
  },
  {
    question: "How is the cold chain maintained in transit?",
    answer:
      "Frozen lines are held at −18 °C or below and moved in insulated, temperature-logged transport. Fresh produce travels chilled at 2 – 6 °C and is never frozen. Consignments are scheduled around your prep days so stock is not left waiting.",
  },
  {
    question: "Can you supply documentation for audits?",
    answer:
      "Yes. Origin and batch documentation is issued on request for every consignment, which is what most hotel and QSR audits ask for.",
  },
  {
    question: "What pack sizes do you supply?",
    answer:
      "Pack sizes are quoted per enquiry rather than published, because trade packs differ by range and by supplier lot. Tell us your monthly volume and we will quote the format that works out cheapest per kilo.",
  },
  {
    question: "Are you the same company as Adira Enterprises?",
    answer: `${site.name} is the signature brand of ${site.company}, the registered parent company. “Adira Enterprises” is a common spelling variant of the company name. The same team supplies Breadberry frozen berries, fruit purees and specialist food-service ingredients.`,
  },
];

export function FaqSection({
  items = supplyFaqs,
  heading = "Questions buyers ask first",
}: {
  items?: { question: string; answer: string }[];
  heading?: string;
}) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="py-[clamp(2.5rem,6vw,4.5rem)]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Before you order"
            title={<span id="faq-heading">{heading}</span>}
            description="Straight answers on minimums, delivery, cold chain and paperwork."
          />
        </Reveal>

        <dl className="mt-[clamp(1.75rem,3.5vw,2.5rem)] grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-0 lg:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              <div className="border-t border-line-soft py-[clamp(1.125rem,2vw,1.5rem)]">
                <dt className="flex gap-3 font-sans text-[1rem] font-semibold leading-snug text-navy">
                  <span
                    aria-hidden
                    className="mt-2 size-2 shrink-0 rounded-full bg-[#c3ffab]"
                  />
                  {item.question}
                </dt>
                <dd className="mt-2.5 pl-5 text-[0.9375rem] leading-relaxed text-muted">
                  {item.answer}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
