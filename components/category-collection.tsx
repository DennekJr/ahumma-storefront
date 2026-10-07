"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CollectionCard } from "@/components/collection-card";
import { FilterBar } from "@/components/filter-bar";
import { useFilteredCollection } from "@/components/use-filtered-collection";
import type { ProductSummary } from "@/lib/store-types";

/**
 * Filter bar, grid and empty state for a category page.
 *
 * Filtering used to happen in the server render, which cannot see the
 * shopper's currency — so price bands and price sort were in naira for
 * everyone. It now runs here, through the same hook /shop uses.
 */
export function CategoryCollection({
  products,
  categorySlug,
}: {
  products: ProductSummary[];
  categorySlug: string;
}) {
  const { facets, shown, hasFilters } = useFilteredCollection(products);

  return (
    <>
      <FilterBar facets={facets} total={shown.length} clientFiltering />

      {shown.length ? (
        <div className="collection-body">
          <div className="collection-grid">
            {shown.map((product, index) => (
              <CollectionCard
                product={product}
                index={index}
                priority={index < 3}
                key={product.ref}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="collection-empty">
          <p>
            {hasFilters
              ? "Nothing matches those filters."
              : "New essentials are coming soon. Join the Ahumma Circle to hear first."}
          </p>
          <Link href={`/shop/${categorySlug}`}>
            {hasFilters ? "Clear the filters" : "See everything"}{" "}
            <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </>
  );
}

/**
 * The superscript count in a category heading. Reads through the same hook as
 * the grid, so the number beside the title is always the number of products
 * beneath it.
 */
export function CategoryCount({ products }: { products: ProductSummary[] }) {
  const { shown } = useFilteredCollection(products);
  return <sup>{shown.length}</sup>;
}
