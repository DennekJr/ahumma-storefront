/**
 * Renders a JSON-LD block. Next.js does not escape the contents of a script
 * tag, so the payload is serialised here and `<` is escaped to keep a stray
 * value from closing the tag early.
 */
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
