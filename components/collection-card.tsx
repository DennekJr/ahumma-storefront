"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Plus } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatMoney, resolveSummaryPrice } from "@/lib/format";
import type { ProductSummary } from "@/lib/store-types";

/**
 * The collection-grid card.
 *
 * Follows the Aritzia anatomy — full-bleed image, then name, save, price — with
 * two deliberate omissions. Colour swatches are absent because every Ahumma
 * product has a single variant, and a swatch row of one is noise. A price range
 * is shown only when variants actually differ.
 *
 * Quick-add stays because a four-product range is a browse-and-buy page, not a
 * filter-down-from-182 page; making the shopper open a product to add it costs
 * more than it clarifies.
 */
export function CollectionCard({
  product,
  index,
  priority = false,
}: {
  product: ProductSummary;
  index: number;
  priority?: boolean;
}) {
  const { addItem, currency } = useCart();
  const displayPrice = resolveSummaryPrice(product, currency);
  const alternatePrices = Object.entries(product.pricesFrom ?? {}).map(
    ([priceCurrency, priceMinor]) => ({
      currency: priceCurrency,
      priceMinor,
      compareAtMinor: product.compareAtFrom?.[priceCurrency] ?? null,
    }),
  );

  function quickAdd() {
    if (!product.previewVariantRef || !product.coverUrl) return;
    addItem({
      variantRef: product.previewVariantRef,
      productRef: product.ref,
      slug: product.slug,
      name: product.name,
      variantName: "Standard",
      imageUrl: product.coverUrl,
      priceMinor: product.priceMinorFrom,
      currency: product.currency,
      prices: alternatePrices,
      quantity: 1,
      needsDelivery: true,
    });
  }

  return (
    <article
      className="collection-card"
      style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
    >
      <Link
        className="collection-card__image"
        href={`/products/${product.slug}`}
        aria-label={`View ${product.name}`}
      >
        {product.coverUrl ? (
          <Image
            src={product.coverUrl}
            alt={product.name}
            fill
            sizes="(max-width: 700px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <span className="product-image-placeholder">Ahumma</span>
        )}
        {product.soldOut ? (
          <span className="collection-card__badge">Sold out</span>
        ) : product.preorderable ? (
          <span className="collection-card__badge">Preorder</span>
        ) : null}
      </Link>

      <div className="collection-card__meta">
        <Link href={`/products/${product.slug}`}>{product.name}</Link>
        {product.previewVariantRef && !product.soldOut ? (
          <button type="button" onClick={quickAdd} aria-label={`Add ${product.name} to bag`}>
            <Plus size={15} />
          </button>
        ) : (
          <span className="collection-card__save" aria-hidden="true">
            <Bookmark size={15} />
          </span>
        )}
      </div>
      <p className="collection-card__price">
        {formatMoney(displayPrice.priceMinor, displayPrice.currency)}
      </p>
    </article>
  );
}
