import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/frontdesk";
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
  const { category: categorySlug } = await params;
  const category = CATEGORY_MATCHERS[categorySlug];

  if (!category) {
    notFound();
  }

  const products = await getProducts();
  const categoryProducts = products.filter(category.matches);

  return (
    <main className="shop-page">
      <AnnouncementBar />
      <SiteHeader />
      <header className="shop-hero">
        <h1>{category.title}</h1>
        <p>{category.description}</p>
      </header>
      <section className="shop-group shop-category-page">
        <div className="shop-group__heading">
          <Link href="/shop" className="underlined-link">
            <ArrowLeft size={16} /> All essentials
          </Link>
        </div>
        {categoryProducts.length ? (
          <div className="product-grid">
            {categoryProducts.map((product, index) => (
              <ProductCard product={product} index={index} key={product.ref} />
            ))}
          </div>
        ) : (
          <div className="shop-group__empty">
            <p>
              New essentials are coming soon. Join the Ahumma Circle to hear
              first.
            </p>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
