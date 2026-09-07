import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/frontdesk";
import { siteUrl } from "@/lib/structured-data";

/**
 * Generated from the live catalogue so new products appear without a code
 * change. Product `updatedAt` becomes `lastModified`, which is the signal
 * crawlers use to decide what to re-fetch.
 *
 * Revalidated hourly rather than built once: the catalogue changes on
 * FrontDesk's schedule, not on deploys.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.8 },
  ];

  // A catalogue read failure must not take the whole sitemap down; the static
  // routes are still worth serving.
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${base}/products/${product.slug}`,
    ...(product.updatedAt
      ? { lastModified: new Date(product.updatedAt) }
      : {}),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
