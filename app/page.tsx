import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { connection } from "next/server";
import { ProductCard } from "@/components/product-card";
import { ProductCarousel } from "@/components/product-carousel";
import { AnnouncementBar } from "@/components/announcement-bar";

import { ScrollLink } from "@/components/scroll-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { getProducts } from "@/lib/frontdesk";
import { INGREDIENT_STORY, WHY_AHUMMA } from "@/lib/homepage";
import { organizationSchema } from "@/lib/structured-data";

/** The Ahumma story reads long beside the philosophy, so it is held back for
 *  now. Flip to true to restore it above the philosophy section. */
const SHOW_STORY_SECTION = false;

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

  return (
    <main>
      <StructuredData data={organizationSchema()} />
      <AnnouncementBar />

      <section className="home-hero">
        <SiteHeader />
        <Image
          className="hero-sky"
          src="/images/hero-ahumma.avif"
          alt="Ahumma body care ritual"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="hero-light-overlay" aria-hidden="true" />
        <div className="hero-copy">
          <h1>
            We create beautiful, natural body care rooted in African heritage
          </h1>
          <Link href="/shop" className="hero-link">
            Shop now
          </Link>
        </div>
      </section>

      {SHOW_STORY_SECTION ? (
        <section className="story-section" id="story">
          <div className="story-copy">
            <h2>
              We started
              <br />
              with a belief.
            </h2>
          </div>
          <div className="story-body">
            <p>
              Ahumma was born to remind Africans everywhere of something we
              should never have had to forget: you are enough, and you are
              beautiful by design.
            </p>
            <p>
              For too long, beauty has been something to achieve — to alter,
              correct or become. We wanted something different. A brand that
              celebrates Black and brown skin as it is, draws from the richness
              of African ingredients and beauty traditions, and makes caring for
              yourself feel less like a chore and more like a ritual.
            </p>
            <p className="story-body__close">
              So we created Ahumma. Beautiful, thoughtfully made body care for
              skin that deserves to be nourished, softened, enjoyed and
              celebrated.
            </p>
          </div>
        </section>
      ) : null}

      <section className="philosophy-section" id="philosophy">
        <div className="philosophy-heading">
          <h2>
            Ahumma is a Nigerian-born premium body-care brand for Black and
            brown skin, created from a simple belief: you are enough, and you
            are beautiful by design.
          </h2>
        </div>
        <div className="philosophy-copy">
          <p>
            Ahumma was created with Black and brown skin at the heart of the
            brand. From the richness of deep melanin to every shade in between,
            our products celebrate the skin you&apos;re in — not ask you to
            become something else.
          </p>
        </div>
        <div className="philosophy-image-grid">
          <Link
            href={productHref("ara")}
            className="philosophy-image-grid__item"
          >
            <Image
              src="/images/ara-ritual.jpg"
              alt="Ahumma Ara body-care ritual"
              fill
              sizes="(max-width: 780px) 100vw, 33vw"
            />
            <span className="philosophy-image-grid__label">
              For Black skin. <ArrowRight size={17} />
            </span>
          </Link>
          <Link
            href={productHref("dream whip", "dream")}
            className="philosophy-image-grid__item"
          >
            <Image
              src="/images/dream-ritual.jpg"
              alt="Ahumma Dream Whip body-care ritual"
              fill
              sizes="(max-width: 780px) 100vw, 33vw"
            />
            <span className="philosophy-image-grid__label">
              For brown skin. <ArrowRight size={17} />
            </span>
          </Link>
          <Link
            href={productHref("sika", "sike")}
            className="philosophy-image-grid__item"
          >
            <Image
              src="/images/sika-ritual.jpg"
              alt="Ahumma Sika body-care ritual"
              fill
              sizes="(max-width: 780px) 100vw, 33vw"
            />
            <span className="philosophy-image-grid__label">
              For every shade that knows its beauty. <ArrowRight size={17} />
            </span>
          </Link>
        </div>
      </section>

      <section
        className="love-skin-section"
        id="love-your-skin"
        aria-labelledby="love-your-skin-title"
      >
        <div className="love-skin__content">
          <h2 id="love-your-skin-title">Explore some of our top products</h2>
          <ProductCarousel>
            {topProducts.map((product, index) => (
              <ProductCard
                product={product}
                index={index}
                showIndex={false}
                key={`${product.ref}-${index}`}
              />
            ))}
          </ProductCarousel>
        </div>
      </section>

      <section className="why-section">
        <div className="section-heading">
          <div>
            <h2>
              Care should
              <br />
              feel this good.
            </h2>
          </div>
        </div>
        <div className="why-grid">
          {WHY_AHUMMA.map((reason) => (
            <article key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ingredient-section">
        <div className="section-heading">
          <div>
            <h2>
              Good things grow from
              <br />
              the right ingredients.
            </h2>
          </div>
          <p>Every ingredient has a role. Every formula has a reason.</p>
        </div>
        <div className="ingredient-grid">
          {INGREDIENT_STORY.map((ingredient) => (
            <article key={ingredient.name}>
              <h3>{ingredient.name}</h3>
              <p>{ingredient.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="global-section">
        <div className="global-copy">
          <h2>
            Born in Nigeria.
            <br />
            Made for the world.
          </h2>
        </div>
        <div className="global-body">
          <p>
            Ahumma began in Nigeria, but it was never meant to belong to Nigeria
            alone. We are building a new generation of African beauty brands —
            brands that carry our heritage confidently while speaking to a
            global customer.
          </p>
          <p>
            From Lagos to New York, London, Paris and beyond, Ahumma is for
            anyone who sees beauty in African heritage, beautiful ingredients
            and the simple pleasure of caring for their skin.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
