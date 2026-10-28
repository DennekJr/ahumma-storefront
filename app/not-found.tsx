import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CollectionCard } from "@/components/collection-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCatalogue } from "@/lib/frontdesk";

// A dead link still lands on a full page: the menu, the range and the footer
// are all a tap away instead of one button on a blank screen.
export default async function NotFound() {
  await connection();
  const { products } = await getCatalogue();

  return (
    <main className="not-found-page">
      <AnnouncementBar />
      <SiteHeader />
      <section className="not-found-message">
        <span>404</span>
        <h1>This ritual moved.</h1>
        <p>
          The page may have changed, or this formulation is no longer part of
          the collection.
        </p>
        <Link href="/shop">
          Return to the collection <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
      {products.length ? (
        <section
          className="not-found-products"
          aria-labelledby="not-found-products-title"
        >
          <h2 id="not-found-products-title">Still on the shelf.</h2>
          <div className="collection-grid">
            {products.slice(0, 4).map((product, index) => (
              <CollectionCard product={product} index={index} key={product.ref} />
            ))}
          </div>
        </section>
      ) : null}
      <SiteFooter />
    </main>
  );
}
