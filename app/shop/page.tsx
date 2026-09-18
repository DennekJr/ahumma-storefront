import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CollectionCard } from "@/components/collection-card";
import { ConcernRail } from "@/components/concern-rail";
import { EditorialRow } from "@/components/editorial-row";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { CatalogueUnavailable } from "@/components/catalogue-unavailable";
import { getCatalogue, hasFrontdeskReads } from "@/lib/frontdesk";
import {
  ALL_CONCERN,
  filterByConcern,
  findConcern,
  firstEditorialProduct,
} from "@/lib/concerns";
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
type SearchParams = Promise<{ concern?: string }>;

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

  return unavailable ? { ...scoped, robots: { index: false, follow: true } } : scoped;
}

/** Closes a short last row with brand imagery instead of empty cells. */
function CollectionFiller() {
  return (
    <Link className="collection-filler" href="/#ritual" aria-label="The Ahumma ritual">
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
  const [catalogue, { concern: concernId }] = await Promise.all([
    getCatalogue(),
    searchParams,
  ]);
  const { products, unavailable } = catalogue;
  const concern = findConcern(concernId);
  const shown = filterByConcern(products, concern);

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

      {unavailable ? null : <ConcernRail selected={concernId ?? ALL_CONCERN} products={products} />}

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
          <p>Nothing in this edit yet.</p>
          <Link href="/shop">See everything <ArrowRight size={15} /></Link>
        </div>
      )}

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
