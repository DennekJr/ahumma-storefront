"use client";

import { useEffect, useState } from "react";
import { CollectionCard } from "@/components/collection-card";
import {
  getSavedProducts,
  SAVED_PRODUCTS_CHANGE_EVENT,
} from "@/lib/saved-products";
import type { ProductSummary } from "@/lib/store-types";

export function SavedProductsSection({
  products,
}: {
  products: ProductSummary[];
}) {
  const [savedProducts, setSavedProducts] = useState<ProductSummary[]>([]);

  useEffect(() => {
    const syncSaved = () => setSavedProducts(getSavedProducts(products));
    syncSaved();
    window.addEventListener(SAVED_PRODUCTS_CHANGE_EVENT, syncSaved);
    window.addEventListener("storage", syncSaved);
    return () => {
      window.removeEventListener(SAVED_PRODUCTS_CHANGE_EVENT, syncSaved);
      window.removeEventListener("storage", syncSaved);
    };
  }, [products]);

  if (!savedProducts.length) return null;

  return (
    <section className="saved-products" aria-labelledby="saved-products-title">
      <h2 id="saved-products-title">Saved for later</h2>
      <div className="collection-grid">
        {savedProducts.map((product, index) => (
          <CollectionCard product={product} index={index} key={product.ref} />
        ))}
      </div>
    </section>
  );
}
