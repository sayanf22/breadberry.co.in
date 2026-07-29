/** Tiny class-name joiner — keeps JSX readable without extra dependencies. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
