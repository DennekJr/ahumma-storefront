import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CollectionCard } from "@/components/collection-card";
import { ConcernRail } from "@/components/concern-rail";
import { EditorialRow } from "@/components/editorial-row";
import { FilterBar } from "@/components/filter-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/frontdesk";
import { ALL_CONCERN, firstEditorialProduct } from "@/lib/concerns";
import {
  applyFilters,
  applySort,
  buildFacets,
  toList,
} from "@/lib/shop-filters";
import type { ProductSummary } from "@/lib/store-types";

type SearchParams = Promise<{
  size?: string | string[];
  type?: string | string[];
  price?: string | string[];
  sort?: string;
}>;

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: SearchParams;
};

type Category = {
  title: string;
  description: string;
  matches: (product: ProductSummary) => boolean;
};

const CATEGORY_MATCHERS: Record<string, Category> = {
  bodycare: {
    title: "Body Butters",
    description: "Whipped body care made for everyday nourishment and glow.",
    matches: (product) => {
      const value = `${product.name} ${product.slug}`.toLowerCase();
      return value.includes("butter") && !value.includes("sika");
    },
  },
  sika: {
    title: "Sika",
    description: "Rich, nourishing care for skin that deserves softness.",
    matches: (product) =>
      `${product.name} ${product.slug}`.toLowerCase().includes("sika"),
  },
  "dream-whip": {
    title: "Dream Whip",
    description: "A beautifully whipped ritual for deeply cared-for skin.",
    matches: (product) =>
      `${product.name} ${product.slug}`.toLowerCase().includes("dream"),
  },
  "baby-bloom": {
    title: "Baby Bloom",
    description: "Gentle body care for delicate skin and tender rituals.",
    matches: (product) =>
      `${product.name} ${product.slug}`.toLowerCase().includes("baby"),
  },
  "ara-liquid-african-black-soap": {
    title: "Ara Liquid African Black Soap",
    description: "A cleansing ritual rooted in African beauty traditions.",
    matches: (product) => {
      const value = `${product.name} ${product.slug}`.toLowerCase();
      return value.includes("ara") || value.includes("black-soap");
    },
  },
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = CATEGORY_MATCHERS[categorySlug];
  return category
    ? { title: category.title, description: category.description }
    : { title: "Shop" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const [{ category: categorySlug }, query, products] = await Promise.all([
    params,
    searchParams,
    getProducts(),
  ]);
  const category = CATEGORY_MATCHERS[categorySlug];

  if (!category) notFound();

  const categoryProducts = products.filter(category.matches);
  const filters = {
    size: toList(query.size),
    type: toList(query.type),
    price: toList(query.price),
  };
  const facets = buildFacets(categoryProducts, filters);
  const shown = applySort(applyFilters(categoryProducts, filters), query.sort);
  const editorialProduct = firstEditorialProduct(shown);

  return (
    <main className="shop-page shop-page--sky">
      <AnnouncementBar />
      <SiteHeader />

      <header className="collection-head">
        <nav className="collection-crumbs" aria-label="Breadcrumb">
          <Link href="/">Ahumma</Link>
          <span aria-hidden="true">—</span>
          <Link href="/shop">Shop all</Link>
          <span aria-hidden="true">—</span>
          <span>{category.title}</span>
        </nav>
        <h1>
          {category.title}
          <sup>{shown.length}</sup>
        </h1>
        <p>{category.description}</p>
      </header>

      <ConcernRail selected={ALL_CONCERN} products={categoryProducts} />
      <FilterBar facets={facets} total={shown.length} />

      {shown.length ? (
        <div className="collection-body">
          <div className="collection-grid">
            {shown.map((product, index) => (
              <CollectionCard
                product={product}
                index={index}
                priority={index < 3}
                key={product.ref}
              />
            ))}
          </div>
          <EditorialRow product={editorialProduct} />
        </div>
      ) : (
        <div className="collection-empty">
          <p>
            {filters.size.length || filters.type.length || filters.price.length
              ? "Nothing matches those filters."
              : "New essentials are coming soon. Join the Ahumma Circle to hear first."}
          </p>
          <Link href={`/shop/${categorySlug}`}>
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
