import Image from "next/image";
import Link from "next/link";

import { connection } from "next/server";

import { ProductCard } from "@/components/product-card";
import { ProductCarousel } from "@/components/product-carousel";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CloudBackdrop } from "@/components/cloud-backdrop";

import { ScrollLink } from "@/components/scroll-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { getProducts } from "@/lib/frontdesk";

import { organizationSchema } from "@/lib/structured-data";

export default async function HomePage() {
  await connection();
  const products = await getProducts();

  const topProducts = products.length
    ? Array.from({ length: 6 }, (_, index) => products[index % products.length])
    : [];
  const productHref = (...names: string[]) => {
    const match = products.find((product) =>
      names.some((name) => product.name.toLowerCase().includes(name)),
    );

    return match ? `/products/${match.slug}` : "/#shop";
  };
  const ritualProducts = [
    {
      names: ["ara"],
      displayName: "For Black skin.",
      displayImage: "/images/ara-ritual.jpg",
    },
    {
      names: ["dream whip", "dream"],
      displayName: "For brown skin.",
      displayImage: "/images/dream-ritual.jpg",
    },
    {
      names: ["sika", "sike"],
      displayName: "For every shade that knows its beauty.",
      displayImage: "/images/sika-ritual.jpg",
    },
  ].flatMap(({ names, displayName, displayImage }) => {
    const product = products.find((item) =>
      names.some((name) => item.name.toLowerCase().includes(name)),
    );

    return product ? [{ product, displayName, displayImage }] : [];
  });

  return (
    <main>
      <StructuredData data={organizationSchema()} />
      <AnnouncementBar />

      <section className="home-hero home-hero--editorial">
        <SiteHeader />
        <CloudBackdrop />
        <Image
          className="hero-layer"
          src="/images/hero-layer.webp"
          alt="Ahumma Sika body butter held beside glowing skin"
          fill
          priority
          sizes="(max-width: 780px) 92vw, 58vw"
        />

        <div className="hero-light-overlay" aria-hidden="true" />
        <div className="hero-copy">
          <h1>A New Ritual for Black and Brown Skin.</h1>
          <p className="hero-lede">
            Premium body care made in Nigeria, rooted in African beauty
            traditions and created for Black and brown skin everywhere.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="hero-link">
              Start your ritual
            </Link>
          </div>
        </div>
      </section>

      <section
        className="love-skin-section"
        id="love-your-skin"
        aria-labelledby="love-your-skin-title"
      >
        <div className="love-skin__image-panel">
          <video
            className="love-skin__video"
            src="/videos/explore-media.webm"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Ahumma body-care ritual"
          />
        </div>
        <div className="love-skin__content">
          <div className="love-skin__heading-row">
            <h2 id="love-your-skin-title">
              The ritual starts here, with care made for the skin you’re in.
            </h2>
          </div>
          <ProductCarousel>
            {topProducts.map((product, index) => (
              <ProductCard
                product={product}
                index={index}
                key={`${product.ref}-${index}`}
              />
            ))}
          </ProductCarousel>
        </div>
      </section>

      <section
        className="love-skin-section love-skin-section--reverse"
        id="love-your-skin-continued"
        aria-labelledby="love-your-skin-continued-title"
      >
        <div className="love-skin__image-panel">
          <video
            className="love-skin__video"
            src="/videos/ingredients-video.webm"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Ahumma body-care ritual"
          />
        </div>
        <div className="love-skin__content">
          <div className="love-skin__heading-row">
            <h2 id="love-your-skin-continued-title">
              Made from thoughtfully selected plant butters, nourishing oils and
              African beauty traditions.
            </h2>
          </div>
          <ProductCarousel
            viewAllLabel="Find what’s right for your skin"
            viewAllHref="/consultation"
          >
            {ritualProducts.map(
              ({ product, displayName, displayImage }, index) => (
                <ProductCard
                  product={product}
                  index={index}
                  displayName={displayName}
                  displayImage={displayImage}
                  hideStatus
                  hidePrice
                  hideAction
                  key={`continued-${product.ref}-${index}`}
                />
              ),
            )}
          </ProductCarousel>
        </div>
      </section>

      <section className="home-hero home-hero--editorial home-hero--belief">
        <SiteHeader />
        <Image
          className="hero-belief-image"
          src="/images/belief-bg-image.webp"
          alt="Ahumma Sika body butter being applied to skin"
          fill
          sizes="100vw"
        />

        <div className="hero-light-overlay" aria-hidden="true" />
        <div className="hero-copy">
          <h1>The care you should never have forgotten.</h1>
          <p className="hero-lede">
            Ahumma was born to remind Africans everywhere of something we should
            never have had to forget: you are enough, and you are beautiful by
            design.
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="hero-link">
              Start your ritual
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
