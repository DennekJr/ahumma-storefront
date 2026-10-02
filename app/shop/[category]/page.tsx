import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/components/announcement-bar";
import {
  CategoryCollection,
  CategoryCount,
} from "@/components/category-collection";
import { ConcernRail } from "@/components/concern-rail";
import { SavedProductsSection } from "@/components/saved-products-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/frontdesk";
import { ALL_CONCERN, randomConcernImages } from "@/lib/concerns";
import type { ProductSummary } from "@/lib/store-types";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [{ category: categorySlug }, products] = await Promise.all([
    params,
    getProducts(),
  ]);
  const category = CATEGORY_MATCHERS[categorySlug];

  if (!category) notFound();

  const categoryProducts = products.filter(category.matches);

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
          <CategoryCount products={categoryProducts} />
        </h1>
        <p>{category.description}</p>
      </header>

      <ConcernRail
        selected={ALL_CONCERN}
        concernImages={randomConcernImages(products)}
      />
      <CategoryCollection
        products={categoryProducts}
        categorySlug={categorySlug}
      />

      <SavedProductsSection products={products} />
      <SiteFooter />
    </main>
  );
}
