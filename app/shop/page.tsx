import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { ShopCollection } from "@/components/shop-collection";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CatalogueUnavailable } from "@/components/catalogue-unavailable";
import { CloudBackdrop } from "@/components/cloud-backdrop";
import { getCatalogue, hasFrontdeskReads } from "@/lib/frontdesk";
import { filterByConcern, findConcern } from "@/lib/concerns";

import { applyFilters, applySort, toList } from "@/lib/shop-filters";
import { breadcrumbSchema, siteUrl } from "@/lib/structured-data";

const baseMetadata: Metadata = {
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

/**
 * A catalogue that failed to load leaves this page with nothing to offer. Left
 * indexable, a crawl during an outage banks "Ahumma sells nothing" against the
 * shop's most valuable URL, and that result outlives the outage by however long
 * it takes to be recrawled. noindex asks the crawler to come back instead.
 */
type SearchParams = Promise<{
  concern?: string;
  size?: string | string[];
  type?: string | string[];
  price?: string | string[];
  sort?: string;
}>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const [{ unavailable }, { concern: concernId }] = await Promise.all([
    getCatalogue(),
    searchParams,
  ]);
  const concern = findConcern(concernId);

  // A filtered view is a slice of /shop, not a page of its own — without this
  // every concern would compete with the collection for the same terms.
  const scoped: Metadata = concern
    ? {
        ...baseMetadata,
        title: `${concern.label} — Shop all`,
        alternates: { canonical: "/shop" },
      }
    : baseMetadata;

  return unavailable
    ? { ...scoped, robots: { index: false, follow: true } }
    : scoped;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [catalogue, query] = await Promise.all([getCatalogue(), searchParams]);
  const { products, unavailable } = catalogue;
  const concernId = query.concern;
  const concern = findConcern(concernId);
  // Facets are built from the concern-scoped set, so a count next to an option
  // is the number of products that option would actually leave on screen.
  const inConcern = filterByConcern(products, concern);
  const filters = {
    size: toList(query.size),
    type: toList(query.type),
    price: toList(query.price),
  };
  const shown = applySort(applyFilters(inConcern, filters), query.sort);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ahumma products",
    numberOfItems: shown.length,
    itemListElement: shown.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${siteUrl()}/products/${product.slug}`,
    })),
  };

  return (
    <main className="shop-page shop-page--sky">
      <CloudBackdrop fixed />
      <StructuredData data={itemList} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Ahumma", path: "/" },
          { name: "Shop all", path: "/shop" },
        ])}
      />

      <AnnouncementBar />
      <SiteHeader />

      <header className="collection-head collection-head--intro">
        <h1>Find what&apos;s right for your skin.</h1>
        <p>
          Explore rich body butters and African black soap, made in Nigeria for
          Black and brown skin.
        </p>
      </header>

      <ShopCollection products={products} unavailable={unavailable} />

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

      <SiteFooter />
    </main>
  );
}
