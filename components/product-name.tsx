/**
 * A product name with its pack size ("Dream Whip (250g)") set smaller and
 * quieter than the name, so the size reads as a detail rather than part of
 * the title. Names without a trailing "(…)" render unchanged.
 */
export function ProductName({ name }: { name: string }) {
  const match = name.match(/^(.*\S)\s*(\([^()]+\))$/);
  if (!match) return <>{name}</>;

  return (
    <>
      {match[1]} <span className="product-name__size">{match[2]}</span>
    </>
  );
}
