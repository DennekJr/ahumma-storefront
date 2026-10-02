import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { applyFilters, applySort, buildFacets } from "@/lib/shop-filters";
import type { ProductSummary } from "@/lib/store-types";

/**
 * Filtered and sorted view of a product set, as the URL and the shopper's
 * currency describe it.
 *
 * This runs in the browser because the currency does: it lives in
 * localStorage, so a server render cannot know a shopper has switched to
 * dollars, and any price filter or price sort it applied would be in naira.
 * Every collection view reads through here, so a header count, a filter bar
 * and the grid beneath them cannot disagree about what is on screen.
 */
export function useFilteredCollection(products: ProductSummary[]) {
  const params = useSearchParams();
  const { currency } = useCart();

  const filters = {
    size: params.get("size")?.split(",").filter(Boolean) ?? [],
    type: params.get("type")?.split(",").filter(Boolean) ?? [],
    price: params.get("price")?.split(",").filter(Boolean) ?? [],
  };

  const facets = buildFacets(products, currency);
  const shown = applySort(
    applyFilters(products, filters, currency),
    params.get("sort") ?? undefined,
    currency,
  );

  return {
    facets,
    shown,
    filters,
    hasFilters: Boolean(
      filters.size.length || filters.type.length || filters.price.length,
    ),
  };
}
