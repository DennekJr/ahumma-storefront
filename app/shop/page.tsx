import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CollectionCard } from "@/components/collection-card";
import { ConcernRail } from "@/components/concern-rail";
import { EditorialRow } from "@/components/editorial-row";
import { FilterBar } from "@/components/filter-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CatalogueUnavailable } from "@/components/catalogue-unavailable";
import { CloudBackdrop } from "@/components/cloud-backdrop";
import { getCatalogue, hasFrontdeskReads } from "@/lib/frontdesk";
import {
  ALL_CONCERN,
  filterByConcern,
  findConcern,
  firstEditorialProduct,
} from "@/lib/concerns";
import {
  applyFilters,
  applySort,
  buildFacets,
  toList,
} from "@/lib/shop-filters";
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

/** Closes a short last row with brand imagery instead of empty cells. */
function CollectionFiller() {
  return (
    <Link
      className="collection-filler"
      href="/consultation"
      aria-label="Find your Ahumma ritual"
    >
      <span>
        At the edge of everything beautiful is you
        <ArrowRight size={16} />
      </span>
    </Link>
  );
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
  const facets = buildFacets(inConcern, filters);
  const shown = applySort(applyFilters(inConcern, filters), query.sort);

  // The grid runs three-up, broken after the first row by a pair of editorial
  // images. With four products that leaves a single card on the last row, so
  // the remaining span is filled with editorial art rather than whitespace.
  const breakAfter = shown.length > 3 ? 3 : shown.length;
  const leading = shown.slice(0, breakAfter);
  const trailing = shown.slice(breakAfter);
  const breakProduct = firstEditorialProduct(shown);
  // Whichever grid ends on a short row gets the filler, so a narrow result
  // (one product under a concern) never leaves dead cells beside it.
  const shortGrid = trailing.length
    ? trailing.length % 3 && "tail"
    : leading.length % 3 && "lead";

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

      <header className="collection-head">
        <nav className="collection-crumbs" aria-label="Breadcrumb">
          <Link href="/">Ahumma</Link>
          <span aria-hidden="true">—</span>
          <Link href="/shop">Shop all</Link>
        </nav>
        <h1>
          {concern ? concern.label : "Everything we make"}
          {unavailable ? null : <sup>{shown.length}</sup>}
        </h1>
        <p>
          Fewer, intentional products. Each formula is made to work deeply, feel
          beautiful and earn its place in your ritual.
        </p>
      </header>

      {unavailable ? null : (
        <>
          <ConcernRail
            selected={concernId ?? ALL_CONCERN}
            products={products}
          />
          <FilterBar facets={facets} total={shown.length} />
        </>
      )}

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

      {unavailable ? null : shown.length ? (
        <div className="collection-body">
          <div className="collection-grid">
            {leading.map((product, index) => (
              <CollectionCard
                product={product}
                index={index}
                priority={index < 3}
                key={product.ref}
              />
            ))}
            {shortGrid === "lead" ? <CollectionFiller /> : null}
          </div>

          <EditorialRow product={breakProduct} />

          {trailing.length ? (
            <div className="collection-grid collection-grid--tail">
              {trailing.map((product, index) => (
                <CollectionCard
                  product={product}
                  index={index}
                  key={product.ref}
                />
              ))}
              {shortGrid === "tail" ? <CollectionFiller /> : null}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="collection-empty">
          <p>
            {filters.size.length || filters.type.length || filters.price.length
              ? "Nothing matches those filters."
              : "Nothing in this edit yet."}
          </p>
          <Link href={concern ? `/shop?concern=${concern.id}` : "/shop"}>
            {filters.size.length || filters.type.length || filters.price.length
              ? "Clear the filters"
              : "See everything"}{" "}
            <ArrowRight size={15} />
          </Link>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
