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
      <p>
        {body}
        {matchedProducts.length ? (
          <>
            <br />
            Found in
            <br />
            {matchedProducts.map((product, index) => (
              <span key={product.ref}>
                {index > 0 ? ", " : null}
                <Link
                  className="ingredient-story-card__product-link"
                  href={`/products/${product.slug}`}
                >
                  {product.name}
                </Link>
              </span>
            ))}
          </>
        ) : null}
      </p>
    </article>
  );
}
