/**
 * Instant navigation feedback. Next.js shows this component immediately when a
 * route transition begins, before the destination page has finished loading.
 *
 * In development this replaces the white flash while Turbopack compiles the
 * target page. In production it rarely appears because all pages are static,
 * but it catches any edge case where the client-side router suspends briefly.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated pulse dot — brand-green so it reads as intentional. */}
        <span className="relative flex size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime-soft opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-lime-soft" />
        </span>
        <p className="text-[0.8125rem] text-muted-soft">Loading…</p>
      </div>
    </div>
  );
}
