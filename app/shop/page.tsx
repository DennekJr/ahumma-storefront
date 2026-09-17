import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { CatalogueUnavailable } from "@/components/catalogue-unavailable";
import { getCatalogue, getCollections, hasFrontdeskReads } from "@/lib/frontdesk";
import { breadcrumbSchema, siteUrl } from "@/lib/structured-data";

const baseMetadata: Metadata = {
  title: "Shop all",
  description:
    "Every Ahumma essential — whipped body butters, Ara liquid African black soap and Baby Bloom for delicate skin. Premium body care for Black and brown skin, made in Nigeria.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Ahumma — Shop all",
    description: "Whipped body butters and liquid African black soap, made in Nigeria.",
  },
};

/**
 * A catalogue that failed to load leaves this page with nothing to offer. Left
 * indexable, a crawl during an outage banks "Ahumma sells nothing" against the
 * shop's most valuable URL, and that result outlives the outage by however long
 * it takes to be recrawled. noindex asks the crawler to come back instead.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { unavailable } = await getCatalogue();

  return unavailable
    ? { ...baseMetadata, robots: { index: false, follow: true } }
    : baseMetadata;
}

export default async function ShopPage() {
  const [catalogue, collections] = await Promise.all([
    getCatalogue(),
    getCollections(),
  ]);
  const { products, unavailable } = catalogue;

  // A product belongs under its collection; anything the merchant has not
  // grouped is part of the core body-care range.
  const collectedRefs = new Set(
    collections.flatMap((collection) => collection.productRefs),
  );
  const bodyCare = products.filter((product) => !collectedRefs.has(product.ref));

  const groups = [
    {
      key: "body-care",
      title: "Body care",
      description:
        "The everyday ritual — whipped body butters and liquid African black soap.",
      products: bodyCare,
    },
    ...collections.map((collection) => ({
      key: collection.slug,
      title: collection.name,
      description: collection.description ?? "",
      products: products.filter((product) =>
        collection.productRefs.includes(product.ref),
      ),
    })),
  ].filter((group) => group.products.length || group.key !== "body-care");

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ahumma products",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${siteUrl()}/products/${product.slug}`,
    })),
  };

  return (
    <main className="shop-page">
      <StructuredData data={itemList} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Ahumma", path: "/" },
          { name: "Shop all", path: "/shop" },
        ])}
      />

      <div className="announcement-bar">
        <span>Complimentary Lagos delivery on orders over ₦60,000</span>
        <span className="announcement-desktop">Made in Lagos · Shipping worldwide</span>
      </div>
      <SiteHeader />

      <header className="shop-hero">
        <span className="eyebrow">The collection</span>
        <h1>
          Everything we
          <br />
          make.
        </h1>
        <p>
          Fewer, intentional products. Each formula is made to work deeply, feel
          beautiful and earn its place in your ritual.
        </p>
      </header>

      {!hasFrontdeskReads ? (
        <div className="api-preview-note shop-preview-note">
          <Sparkles size={15} />
          <span>
            <strong>Store preview</strong> — Ahumma&apos;s current collection is
            shown while the Frontdesk keys are pending.
          </span>
        </div>
      ) : null}

      {unavailable ? <CatalogueUnavailable /> : null}

      {(unavailable ? [] : groups).map((group) => (
        <section className="shop-group" id={group.key} key={group.key}>
          <div className="shop-group__heading">
            <h2>{group.title}</h2>
            {group.description ? <p>{group.description}</p> : null}
          </div>

          {group.products.length ? (
            <div className="product-grid">
              {group.products.map((product, index) => (
                <ProductCard product={product} index={index} key={product.ref} />
              ))}
            </div>
          ) : (
            <div className="shop-group__empty">
              <span className="eyebrow">Coming soon</span>
              <p>
                {group.title} is on its way. Join the Ahumma Circle and you&apos;ll
                hear first.
              </p>
            </div>
          )}
        </section>
      ))}

      <section className="shop-closing">
        <span className="eyebrow eyebrow--light">Ahumma</span>
        <p>
          At the edge of
          <br />
          everything beautiful is you.
        </p>
        <Link href="/faq">
          Read the FAQs <ArrowRight size={16} />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
