import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { getCollections, getProducts } from "@/lib/frontdesk";
import { breadcrumbSchema, siteUrl } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Shop all",
  description:
    "Every Ahumma essential — whipped body butters, Ara liquid African black soap and Baby Bloom for delicate skin. Premium body care for Black and brown skin, made in Nigeria.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Ahumma — Shop all",
    description:
      "Whipped body butters and liquid African black soap, made in Nigeria.",
  },
};

export default async function ShopPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);

  // A product belongs under its collection; anything the merchant has not
  // grouped is part of the core body-care range.
  const collectedRefs = new Set(
    collections.flatMap((collection) => collection.productRefs),
  );
  const bodyCare = products.filter(
    (product) => !collectedRefs.has(product.ref),
  );

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

      <AnnouncementBar />
      <SiteHeader />

      <header className="shop-hero">
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

      {groups.map((group) => (
        <section className="shop-group" id={group.key} key={group.key}>
          <div className="shop-group__heading">
            <h2>{group.title}</h2>
            {group.description ? <p>{group.description}</p> : null}
          </div>

          {group.products.length ? (
            <div className="product-grid">
              {group.products.map((product, index) => (
                <ProductCard
                  product={product}
                  index={index}
                  key={product.ref}
                />
              ))}
            </div>
          ) : (
            <div className="shop-group__empty">
              <p>
                {group.title} is on its way. Join the Ahumma Circle and
                you&apos;ll hear first.
              </p>
            </div>
          )}
        </section>
      ))}

      <section className="shop-closing">
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
