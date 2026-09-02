"use client";

import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatMoney } from "@/lib/format";
import type { ProductDetail } from "@/lib/store-types";

export function ProductPurchase({ product }: { product: ProductDetail }) {
  const available = product.variants.filter((variant) => !variant.soldOut);
  const [variantRef, setVariantRef] = useState((available[0] ?? product.variants[0])?.ref ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const variant = useMemo(
    () => product.variants.find((item) => item.ref === variantRef),
    [product.variants, variantRef],
  );
  const maxQuantity = variant?.availableQty ?? product.preorderRemaining ?? null;
  const canAdd = Boolean(variant && (!variant.soldOut || product.preorderable));

  function addToBag() {
    if (!variant || !canAdd) return;
    const imageUrl = variant.media?.[0] ?? product.media?.[0] ?? product.coverUrl ?? "/images/ahumma-logo.png";
    addItem({
      variantRef: variant.ref,
      productRef: product.ref,
      slug: product.slug,
      name: product.name,
      variantName: variant.name,
      imageUrl,
      priceMinor: variant.priceMinor,
      currency: variant.currency,
      quantity,
      needsDelivery: product.needsDelivery,
      maxQuantity,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  if (!variant) {
    return <p className="product-unavailable">This formulation is not currently available.</p>;
  }

  return (
    <div className="purchase-panel">
      <div className="purchase-price">
        <strong>{formatMoney(variant.priceMinor, variant.currency)}</strong>
        {variant.compareAtMinor && variant.compareAtMinor > variant.priceMinor ? (
          <s>{formatMoney(variant.compareAtMinor, variant.currency)}</s>
        ) : null}
      </div>

      {product.variants.length > 1 ? (
        <fieldset className="variant-fieldset">
          <legend>Choose an option</legend>
          <div className="variant-grid">
            {product.variants.map((item) => (
              <button
                type="button"
                key={item.ref}
                className={item.ref === variantRef ? "is-selected" : ""}
                onClick={() => { setVariantRef(item.ref); setQuantity(1); }}
                aria-pressed={item.ref === variantRef}
              >
                {item.swatchHex ? <span style={{ backgroundColor: item.swatchHex }} /> : null}
                <b>{item.name}</b>
                <small>{item.soldOut && !product.preorderable ? "Sold out" : formatMoney(item.priceMinor, item.currency)}</small>
              </button>
            ))}
          </div>
        </fieldset>
      ) : (
        <div className="single-variant"><span>Size</span><strong>{variant.name}</strong></div>
      )}

      <div className="purchase-actions">
        <div className="purchase-quantity" aria-label="Quantity">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
            <Minus size={15} />
          </button>
          <span>{quantity}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => maxQuantity ? Math.min(maxQuantity, value + 1) : value + 1)}>
            <Plus size={15} />
          </button>
        </div>
        <button type="button" className="add-to-bag" onClick={addToBag} disabled={!canAdd}>
          {added ? <><Check size={17} /> Added to bag</> : canAdd ? <><ShoppingBag size={17} /> {product.preorderable ? "Preorder" : "Add to bag"}</> : "Sold out"}
        </button>
      </div>

      {product.preorderable ? (
        <p className="preorder-note"><span /> {product.preorderEtaText ?? "Available for small-batch preorder."}</p>
      ) : null}
      <div className="purchase-assurances">
        <span>Secure Frontdesk checkout</span>
        <span>Worldwide shipping</span>
        <span>Made in Lagos</span>
      </div>
    </div>
  );
}
