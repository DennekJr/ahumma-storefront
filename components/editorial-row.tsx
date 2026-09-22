import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { editorialFor } from "@/lib/concerns";
import type { ProductSummary } from "@/lib/store-types";

/**
 * The break in the grid.
 *
 * Aritzia interrupts its 4-up rows with a pair of double-width cards — a
 * close-up and a full-length shot of the same product on a tinted backdrop —
 * which is what keeps a long grid worth scrolling. The same device does more
 * work here, not less: with four products the page needs something other than
 * product tiles to give it depth, and these are the model and texture shots
 * Frontdesk does not hold.
 *
 * Renders nothing when a product has no editorial imagery, so the grid closes
 * up rather than showing a gap.
 */
export function EditorialRow({ product }: { product: ProductSummary | undefined }) {
  const art = editorialFor(product);
  if (!art || !product) return null;

  return (
    <section
      className="editorial-row"
      aria-label={`${product.name} in detail`}
    >
      <Link className="editorial-row__figure" href={`/products/${product.slug}`}>
        <Image
          src={art.portrait}
          alt={art.alt}
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
        />
      </Link>
      <Link
        className="editorial-row__figure editorial-row__figure--wide"
        href={`/products/${product.slug}`}
      >
        <Image
          src={art.wide}
          alt=""
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        <span className="editorial-row__caption">
          <small>{product.name}</small>
          Read the ritual <ArrowRight size={15} />
        </span>
      </Link>
    </section>
  );
}
