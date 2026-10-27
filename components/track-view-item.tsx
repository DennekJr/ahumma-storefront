"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart-provider";
import { trackViewItem } from "@/lib/analytics";
import { resolvePrice } from "@/lib/format";
import type { ProductDetail } from "@/lib/store-types";

/**
 * Sends view_item once per product page view. Renders nothing.
 *
 * Price and currency are read together at the moment it fires, so the pair is
 * always consistent even if the shopper's saved currency has not loaded yet —
 * GA4 converts to the reporting currency either way.
 */
export function TrackViewItem({ product }: { product: ProductDetail }) {
  const { currency } = useCart();
  const sentFor = useRef<string | null>(null);

  useEffect(() => {
    if (sentFor.current === product.ref) return;
    sentFor.current = product.ref;

    const variant = product.variants[0];
    const price = variant
      ? resolvePrice(variant.priceMinor, variant.currency, variant.prices, currency)
      : { priceMinor: product.priceMinorFrom, currency: product.currency };

    trackViewItem(
      {
        productRef: product.ref,
        name: product.name,
        variantName: variant?.name,
        priceMinor: price.priceMinor,
      },
      price.currency,
    );
    // Once per product: a currency switch on the page is not a second view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.ref]);

  return null;
}
