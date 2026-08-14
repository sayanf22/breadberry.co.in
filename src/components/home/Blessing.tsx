import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * Quiet blessing line with the supplied Ganapati image. Deliberately
 * understated — small type, muted colour and hairline rules either side, so
 * it reads as a sincere personal note rather than a banner.
 */
export function Blessing() {
  return (
    <Container>
      <p className="flex items-center justify-center gap-3 pb-[clamp(1rem,2.5vw,1.75rem)] pt-[clamp(0.25rem,1vw,0.75rem)]">
        <span
          aria-hidden
          className="h-px w-8 shrink-0 bg-gradient-to-r from-transparent to-line sm:w-12"
        />
        <Image
          src="/assets/ganapati-icon.webp"
          alt=""
          width={96}
          height={96}
          sizes="24px"
          className="size-6 shrink-0 sm:size-7"
        />
        <span className="text-center text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted-soft sm:text-[0.75rem]">
          With blessings of Ganapati Bappa
        </span>
        <span
          aria-hidden
          className="h-px w-8 shrink-0 bg-gradient-to-l from-transparent to-line sm:w-12"
        />
      </p>
    </Container>
  );
}
