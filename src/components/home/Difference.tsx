import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { differenceFeatures } from "@/lib/features";
import { site } from "@/lib/site";

export function Difference() {
  return (
    <section
      aria-labelledby="difference-heading"
      className="pb-[clamp(3rem,7vw,5.5rem)]"
    >
      <Container>
        <Reveal className="rounded-panel bg-surface px-[clamp(1.125rem,3.5vw,3rem)] py-[clamp(2rem,5vw,3.5rem)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div>
              <Eyebrow>The {site.company.split(" ")[0]} difference</Eyebrow>
              <h2
                id="difference-heading"
                className="mt-3 max-w-[24ch] text-h2"
              >
                Trust is built on consistency
              </h2>
            </div>
            <p className="text-muted lg:max-w-[40ch] lg:text-right">
              We treat your ingredients with the same care and exactness you
              apply to your final presentation.
            </p>
          </div>

          <div className="mt-[clamp(1.75rem,3.5vw,2.75rem)] grid gap-[clamp(0.75rem,1.6vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
            {differenceFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 80} className="h-full">
                <FeatureCard feature={feature} index={index} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
