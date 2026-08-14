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
      <div className="flex flex-col items-center gap-1.5 pb-[clamp(1rem,2.5vw,1.75rem)] pt-[clamp(0.5rem,1.5vw,1rem)]">
        <span className="text-center text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted-soft sm:text-[0.75rem]">
          With blessings of Ganapati Bappa
        </span>
        <Image
          src="/assets/ganapati-icon.webp"
          alt="Ganapati Bappa"
          width={96}
          height={96}
          sizes="48px"
          className="size-10 sm:size-12"
        />
      </div>
    </Container>
  );
}
