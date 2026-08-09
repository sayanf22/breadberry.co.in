/**
 * Renders JSON-LD into the server HTML.
 *
 * Google only reads structured data that is present in the markup the server
 * returns, so this stays a plain server component — never injected after load.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  /* JSON-LD is non-interactive server markup. Escape `<` so structured values
     can never terminate the script, and key by content so a development HMR
     update replaces the script instead of reconciling stale innerHTML. */
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      key={json}
      type="application/ld+json"
      suppressHydrationWarning
      // Built from typed server data; React does not need to hydrate it.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
