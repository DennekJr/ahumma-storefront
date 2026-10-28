import type { Metadata } from "next";
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
import { CatalogueUnavailable } from "@/components/catalogue-unavailable";
import { getCatalogue } from "@/lib/frontdesk";
import { INGREDIENT_STORY } from "@/lib/homepage";

import { organizationSchema, websiteSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: "Ahumma | Body Butters & African Black Soap" },
  description:
    "Discover Ahumma, Nigerian-born body care for Black and brown skin. Shop whipped body butters and liquid African black soap rooted in African beauty traditions.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  await connection();
  const { products, unavailable } = await getCatalogue();

  return (
    <main>
      <StructuredData data={organizationSchema()} />
      <StructuredData data={websiteSchema()} />
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
        className="ritual-shelf"
        id="love-your-skin"
        aria-labelledby="ritual-shelf-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">Shop the ritual</span>
            <h2 id="ritual-shelf-title">
              The ritual starts here, with care made for the skin you’re in.
            </h2>
          </div>
          <p>
            Whipped body butters and liquid African black soap, made in Nigeria
            for Black and brown skin.
          </p>
        </div>

        <div className="ritual-shelf__body">
          <div className="ritual-shelf__film">
            <video
              src="/videos/explore-media.webm"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Ahumma body-care ritual"
            />
          </div>
          {unavailable ? (
            <CatalogueUnavailable variant="compact" />
          ) : (
            <ProductCarousel>
              {products.map((product, index) => (
                <ProductCard
                  product={product}
                  index={index}
                  key={product.ref}
                />
              ))}
            </ProductCarousel>
          )}
        </div>
      </section>

      <section
        className="ingredients-film"
        id="ingredients"
        aria-labelledby="ingredients-film-title"
      >
        <video
          className="ingredients-film__video"
          src="/videos/ingredients-video.webm"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="ingredients-film__copy">
          <span className="eyebrow">Our ingredients</span>
          <h2 id="ingredients-film-title">
            Made from thoughtfully selected plant butters, nourishing oils and
            African beauty traditions.
          </h2>
          <ul className="ingredients-film__list">
            {INGREDIENT_STORY.map((ingredient) => (
              <li key={ingredient.name}>{ingredient.name}</li>
            ))}
          </ul>
          <Link className="ingredients-film__cta" href="/consultation">
            Find what’s right for your skin
          </Link>
        </div>
      </section>

      <section className="home-hero home-hero--editorial home-hero--belief">
        <SiteHeader />
        <Image
          className="hero-belief-image"
          src="/images/skincare_couple_left_2.webp"
          alt="A woman holding Ahumma Sika body butter"
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
            <Link href="/about" className="hero-link">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
