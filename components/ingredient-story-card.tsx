import Link from "next/link";
import type { ProductSummary } from "@/lib/store-types";

type IngredientStoryCardProps = {
  name: string;
  body: string;
  productMatches: string[];
  products: ProductSummary[];
};

export function IngredientStoryCard({
  name,
  body,
  productMatches,
  products,
}: IngredientStoryCardProps) {
  const matchedProducts = products.filter((product) => {
    const productText = `${product.name} ${product.slug}`.toLowerCase();
    return productMatches.some((match) => productText.includes(match));
  });

  return (
    <article>
      <h3>{name}</h3>
      <p>{body}</p>
      {matchedProducts.length ? (
        <div className="ingredient-story-card__products">
          <span>Found in</span>
          {matchedProducts.map((product) => (
            <Link key={product.ref} href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}
