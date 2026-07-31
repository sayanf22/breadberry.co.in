/**
 * Renders JSON-LD into the server HTML.
 *
 * Google only reads structured data that is present in the markup the server
 * returns, so this stays a plain server component — never injected after load.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered from our own typed builders, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
