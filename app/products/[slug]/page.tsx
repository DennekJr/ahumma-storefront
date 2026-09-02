import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Leaf, PackageCheck } from "lucide-react";
import { ProductPurchase } from "@/components/product-purchase";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProduct } from "@/lib/frontdesk";

type ProductPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description ?? product.info?.longDescription ?? "Considered body care by Ahumma.",
    openGraph: product.coverUrl ? { images: [product.coverUrl] } : undefined,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const media = (product.media?.length ? product.media : product.coverUrl ? [product.coverUrl] : []).slice(0, 4);
  const info = product.info;

  return (
    <main className="product-page">
      <div className="announcement-bar">
        <span>Complimentary Lagos delivery on orders over ₦60,000</span>
        <span className="announcement-desktop">Made in Lagos · Shipping worldwide</span>
      </div>
      <SiteHeader />

      <div className="product-breadcrumb">
        <Link href="/#shop"><ArrowLeft size={15} /> The collection</Link>
        <span>/</span>
        <span>{info?.infoCategory ?? "Body care"}</span>
      </div>

      <section className="product-intro">
        <div className={`product-gallery product-gallery--${Math.min(media.length, 4)}`}>
          {media.map((image, index) => (
            <div className={`product-gallery__item product-gallery__item--${index + 1}`} key={`${image}-${index}`}>
              <Image src={image} alt={index === 0 ? product.name : `${product.name}, view ${index + 1}`} fill loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} sizes="(max-width: 850px) 100vw, 38vw" />
              {index === 0 ? <span>{product.preorderable ? "Small-batch preorder" : "Ahumma essential"}</span> : null}
            </div>
          ))}
        </div>

        <aside className="product-summary">
          <span className="eyebrow">{info?.infoCategory ?? "Ahumma body care"}</span>
          <h1>{product.name}</h1>
          <p className="product-lede">{product.description}</p>
          <ProductPurchase product={product} />
        </aside>
      </section>

      <section className="product-story">
        <div className="product-story__heading">
          <span className="eyebrow">The formulation</span>
          <h2>{product.slug.includes("dream") ? "To your most desirable dreams." : product.slug.includes("sika") ? "An ode to you." : "Lathered to cater to your skin."}</h2>
        </div>
        <div className="product-story__body">
          <p>{info?.longDescription ?? product.description}</p>
          {info?.highlights?.length ? (
            <div className="highlight-list">
              {info.highlights.map((highlight) => <span key={highlight}><Check size={15} /> {highlight}</span>)}
            </div>
          ) : null}
        </div>
      </section>

      <section className="product-details-grid">
        <article>
          <Leaf size={22} strokeWidth={1.4} />
          <span className="eyebrow">How to use</span>
          <h3>Make room for the ritual.</h3>
          <p>{info?.careInstructions ?? "Apply generously to clean skin and take your time."}</p>
        </article>
        <article>
          <PackageCheck size={22} strokeWidth={1.4} />
          <span className="eyebrow">Made with care</span>
          <h3>Rooted in Lagos.</h3>
          <p>{info?.sustainabilityText ?? "Considered body care made with high-performing African botanicals."}</p>
        </article>
        <dl>
          {info?.weightValue ? <div><dt>Net weight</dt><dd>{info.weightValue} {info.weightUnit}</dd></div> : null}
          {info?.countryOfOrigin ? <div><dt>Origin</dt><dd>{info.countryOfOrigin}</dd></div> : null}
          {info?.manufacturer ? <div><dt>Made by</dt><dd>{info.manufacturer}</dd></div> : null}
          {info?.sku ? <div><dt>SKU</dt><dd>{info.sku}</dd></div> : null}
        </dl>
      </section>

      <section className="product-closing">
        <span className="eyebrow eyebrow--light">Ahumma</span>
        <p>Care for the body.<br />A return to the self.</p>
        <Link href="/#shop">Explore every essential <ArrowLeft size={16} /></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
