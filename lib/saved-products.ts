import type { ProductSummary } from "@/lib/store-types";

const SAVED_PRODUCT_PREFIX = "ahumma-saved-";
export const SAVED_PRODUCTS_CHANGE_EVENT = "ahumma:saved-products-change";

export function isProductSaved(productRef: string) {
  return window.localStorage.getItem(`${SAVED_PRODUCT_PREFIX}${productRef}`) === "true";
}

export function setProductSaved(productRef: string, saved: boolean) {
  const key = `${SAVED_PRODUCT_PREFIX}${productRef}`;
  if (saved) window.localStorage.setItem(key, "true");
  else window.localStorage.removeItem(key);
  window.dispatchEvent(new Event(SAVED_PRODUCTS_CHANGE_EVENT));
}

export function getSavedProducts(products: ProductSummary[]) {
  return products.filter((product) => isProductSaved(product.ref));
}
