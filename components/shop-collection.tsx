"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { CollectionCard } from "@/components/collection-card";
import { ConcernRail } from "@/components/concern-rail";
import { FilterBar } from "@/components/filter-bar";
import { SavedProductsSection } from "@/components/saved-products-section";
import { ALL_CONCERN, findConcern, filterByConcern } from "@/lib/concerns";
import { applyFilters, applySort, buildFacets } from "@/lib/shop-filters";
import type { ProductSummary } from "@/lib/store-types";

export function ShopCollection({
  products,
  concernImages,
  unavailable,
}: {
  products: ProductSummary[];
  concernImages: Record<string, string | null>;
  unavailable: boolean;
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const concernId = params.get("concern") ?? ALL_CONCERN;
  const concern = findConcern(concernId);
  const filters = {
    size: params.get("size")?.split(",").filter(Boolean) ?? [],
    type: params.get("type")?.split(",").filter(Boolean) ?? [],
    price: params.get("price")?.split(",").filter(Boolean) ?? [],
  };
  const concernProducts = filterByConcern(products, concern);
  const facets = buildFacets(concernProducts);
  const shown = applySort(
    applyFilters(concernProducts, filters),
    params.get("sort") ?? undefined,
  );
  const title = concern?.label ?? "Everything we make";

  function updateQuery(next: URLSearchParams) {
    const query = next.toString();
    window.history.pushState(
      null,
      "",
      query ? `${pathname}?${query}` : pathname,
    );
  }

  function selectConcern(id: string) {
    const next = new URLSearchParams(params.toString());
    if (id === ALL_CONCERN) next.delete("concern");
    else next.set("concern", id);
    updateQuery(next);
  }

  if (unavailable) return null;

  return (
    <>
      <ConcernRail
        selected={concernId}
        concernImages={concernImages}
        onSelectAction={selectConcern}
      />
      <header className="collection-subhead">
        <h2>{title}</h2>
      </header>
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
            {concern ||
            filters.size.length ||
            filters.type.length ||
            filters.price.length
              ? "Nothing matches those filters."
              : "Nothing in this edit yet."}
          </p>
          <Link href="/shop">
            See everything <ArrowRight size={15} />
          </Link>
        </div>
      )}
      <SavedProductsSection products={products} />
    </>
  );
}
