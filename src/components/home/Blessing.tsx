import { Container } from "@/components/ui/Container";
import { GanapatiIcon } from "@/components/icons";

/**
 * Quiet blessing line. Deliberately understated — small type, muted colour and
 * a hairline rule either side, so it reads as a sincere personal note rather
 * than a banner competing with the hero.
 */
export function Blessing() {
  return (
    <Container>
      <p className="flex items-center justify-center gap-3 pb-[clamp(1rem,2.5vw,1.75rem)] pt-[clamp(0.25rem,1vw,0.75rem)]">
        <span
          aria-hidden
          className="h-px w-8 shrink-0 bg-gradient-to-r from-transparent to-line sm:w-12"
        />
        <GanapatiIcon className="size-5 shrink-0 text-[#d4a017] drop-shadow-[0_1px_2px_rgba(180,130,0,0.3)] sm:size-6" />
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
