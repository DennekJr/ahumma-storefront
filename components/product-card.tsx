"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatMoney } from "@/lib/format";
import type { ProductSummary } from "@/lib/store-types";

export function ProductCard({ product, index }: { product: ProductSummary; index: number }) {
  const { addItem } = useCart();
  const status = product.preorderable ? "Small-batch preorder" : product.soldOut ? "Sold out" : "Available now";

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
      quantity: 1,
      needsDelivery: true,
    });
  }

  return (
    <article className="product-card" style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}>
      <Link className="product-card__image" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        {product.coverUrl ? (
          <Image src={product.coverUrl} alt={product.name} fill sizes="(max-width: 720px) 92vw, 33vw" />
        ) : (
          <span className="product-image-placeholder">Ahumma</span>
        )}
        <span className="product-card__status">{status}</span>
        <span className="product-card__index">0{index + 1}</span>
      </Link>
      <div className="product-card__details">
        <div>
          <Link href={`/products/${product.slug}`}><h3>{product.name}</h3></Link>
          <p>{product.previewTagline ?? "Considered care for the body"}</p>
        </div>
        <strong>{formatMoney(product.priceMinorFrom, product.currency)}</strong>
      </div>
      {product.previewVariantRef && !product.soldOut ? (
        <button type="button" className="product-card__action" onClick={quickAdd}>
          Add to bag <Plus size={16} />
        </button>
      ) : (
        <Link className="product-card__action" href={`/products/${product.slug}`}>
          Discover <ArrowRight size={16} />
        </Link>
      )}
    </article>
  );
}
