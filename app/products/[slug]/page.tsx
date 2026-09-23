import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Leaf, PackageCheck } from "lucide-react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CollectionCard } from "@/components/collection-card";
import { EditorialRow } from "@/components/editorial-row";
import { ProductDescriptionBlocks } from "@/components/product-description-blocks";
import { ProductIngredientStory } from "@/components/product-ingredient-story";
import { ProductPurchase } from "@/components/product-purchase";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { getProduct, getProducts } from "@/lib/frontdesk";
import { nextEditorialProduct } from "@/lib/concerns";
import {
  getProductIngredients,
  getRitualPairings,
} from "@/lib/product-merchandising";
import { buildDetailRows } from "@/lib/product-details";
import { breadcrumbSchema, productSchema } from "@/lib/structured-data";

type ProductPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description:
      product.description ??
      product.info?.longDescription ??
      "Considered body care by Ahumma.",
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: product.coverUrl ? { images: [product.coverUrl] } : undefined,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, products] = await Promise.all([
    getProduct(slug),
    getProducts(),
  ]);
  if (!product) notFound();

  const media = (
    product.media?.length
      ? product.media
      : product.coverUrl
        ? [product.coverUrl]
        : []
  ).slice(0, 4);
  const info = product.info;
  const ritualPairings = getRitualPairings(product, products);
  const detailRows = buildDetailRows(info);
  // The break row cross-sells: it shows a different product with editorial art,
  // never the one being viewed, whose own gallery is already above.
  const editorialPick = nextEditorialProduct(products, product.ref);
  const descriptionParagraphs = (product.description ?? "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const descriptionBlocks = info?.descriptionBlocks ?? [];

  return (
    <main className="product-page">
      <StructuredData data={productSchema(product)} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Ahumma", path: "/" },
          { name: info?.infoCategory ?? "Body care", path: "/#shop" },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
      <AnnouncementBar />
      <SiteHeader />

      <section className="product-intro">
        <div
          className={`product-gallery product-gallery--${Math.min(media.length, 4)}`}
        >
          {media.map((image, index) => (
            <div
              className={`product-gallery__item product-gallery__item--${index + 1}`}
              key={`${image}-${index}`}
            >
              <Image
                src={image}
                alt={
                  index === 0
                    ? product.name
                    : `${product.name}, view ${index + 1}`
                }
                fill
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="(max-width: 850px) 100vw, 50vw"
              />
              {index === 0 ? (
                <span>
                  {product.preorderable
                    ? "Small-batch preorder"
                    : "Ahumma essential"}
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <aside className="product-summary">
          <h1>{product.name}</h1>
          {descriptionParagraphs.length ? (
            <div className="product-lede">
              {descriptionParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          <ProductPurchase product={product} />
          {info?.highlights?.length ? (
            <ul className="product-summary__highlights">
              {info.highlights.slice(0, 3).map((highlight) => (
                <li key={highlight}>
                  <Check size={15} /> {highlight}
                </li>
              ))}
            </ul>
          ) : null}
        </aside>
      </section>

      <section className="product-story">
        <div className="product-story__heading">
          <h2>
            {product.slug.includes("dream")
              ? "To your most desirable dreams."
              : product.slug.includes("sika")
                ? "An ode to you."
                : "Lathered to cater to your skin."}
          </h2>
        </div>
        <div className="product-story__body">
          <p>{info?.longDescription ?? product.description}</p>

          {descriptionBlocks.length ? (
            <ProductDescriptionBlocks blocks={descriptionBlocks} />
          ) : null}
        </div>
      </section>

      {editorialPick ? (
        <div className="product-editorial">
          <EditorialRow product={editorialPick} />
        </div>
      ) : null}

      <section className="product-details-grid">
        <article>
          <Leaf size={22} strokeWidth={1.4} />

          <h3>Make room for the ritual.</h3>
          <p>
            {info?.careInstructions ??
              "Apply generously to clean skin and take your time."}
          </p>
        </article>
        <article>
          <PackageCheck size={22} strokeWidth={1.4} />

          <h3>Rooted in Lagos.</h3>
          <p>
            {info?.sustainabilityText ??
              "Considered body care made with high-performing African botanicals."}
          </p>
        </article>
        {detailRows.length ? (
          <dl>
            {detailRows.map((row) => (
              <div key={`${row.label}-${row.value}`}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </section>

      <ProductIngredientStory ingredients={getProductIngredients(product)} />

      {ritualPairings.length ? (
        <section className="shop-section related-products">
          <div className="section-heading related-products__heading">
            <div>
              <h2>Build the ritual.</h2>
              <p>{ritualPairings[0].reason}</p>
            </div>
          </div>
          <div className="collection-grid">
            {ritualPairings.map(({ product: pairedProduct }, index) => (
              <CollectionCard
                product={pairedProduct}
                index={index}
                key={pairedProduct.ref}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="product-closing">
        <p>
          A ritual worth returning to.
          <br />
          Care for body and self.
        </p>
        <Link href="/shop">Shop the full collection</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
