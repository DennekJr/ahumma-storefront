"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Pause, Play, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatMoney, resolveSummaryPrice } from "@/lib/format";
import { isNew } from "@/lib/shop-filters";
import type { ProductSummary } from "@/lib/store-types";

/**
 * The collection-grid card, following the reference's anatomy: media, then
 * name, save, price, then the variant row.
 *
 * Video plays muted and looping with a pause control, exactly as the reference
 * does. Frontdesk currently returns only stills, so the control appears when a
 * product's cover is a video file and stays out of the way otherwise — the
 * behaviour is here waiting for the footage rather than added after it lands.
 *
 * The variant row renders whatever variants exist, overflowing to "+N" past
 * five. Today every product has one variant, so it renders nothing; that is a
 * property of the catalogue, not a missing feature.
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const displayPrice = resolveSummaryPrice(product, currency);
  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(product.coverUrl ?? "");
  const variants = product.variantCount ?? 0;
  const showNew = isNew(product);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }
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
        {!product.coverUrl ? (
          <span className="product-image-placeholder">Ahumma</span>
        ) : isVideo ? (
          <video
            ref={videoRef}
            src={product.coverUrl}
            muted
            loop
            playsInline
            autoPlay
            aria-label={product.name}
          />
        ) : (
          <Image
            src={product.coverUrl}
            alt={product.name}
            fill
            sizes="(max-width: 700px) 50vw, 33vw"
            priority={priority}
          />
        )}
        {product.soldOut ? (
          <span className="collection-card__badge">Sold out</span>
        ) : product.preorderable ? (
          <span className="collection-card__badge">Preorder</span>
        ) : showNew ? (
          <span className="collection-card__badge collection-card__badge--new">New</span>
        ) : null}
      </Link>

      {isVideo ? (
        <button
          type="button"
          className="collection-card__playback"
          onClick={toggleVideo}
          aria-label={paused ? `Play ${product.name} video` : `Pause ${product.name} video`}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
        </button>
      ) : null}

      <div className="collection-card__meta">
        <Link href={`/products/${product.slug}`}>{product.name}</Link>
        <span className="collection-card__actions">
          {product.previewVariantRef && !product.soldOut ? (
            <button type="button" onClick={quickAdd} aria-label={`Add ${product.name} to bag`}>
              <Plus size={15} />
            </button>
          ) : null}
          <Link
            href={`/products/${product.slug}`}
            className="collection-card__save"
            aria-label={`View ${product.name}`}
          >
            <Bookmark size={15} />
          </Link>
        </span>
      </div>
      <p className="collection-card__price">
        {formatMoney(displayPrice.priceMinor, displayPrice.currency)}
      </p>
      {variants > 1 ? (
        <p className="collection-card__variants">
          <span>{Math.min(variants, 5)} sizes</span>
          {variants > 5 ? <em>+{variants - 5}</em> : null}
        </p>
      ) : null}
    </article>
  );
}
