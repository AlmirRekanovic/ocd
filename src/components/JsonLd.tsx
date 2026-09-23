/**
 * Renders a JSON-LD structured-data block.
 *
 * Server component on purpose: the script has to be in the HTML Google
 * receives on the first request, not injected later by React on the client.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // The content is built from our own constants, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
