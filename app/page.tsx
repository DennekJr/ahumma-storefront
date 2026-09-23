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

/** The Ahumma story reads long beside the philosophy, so it is held back for
 *  now. Flip to true to restore it above the philosophy section. */
const SHOW_STORY_SECTION = true;

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

      <section
        className="love-skin-section ritual-gallery-section"
        aria-labelledby="ritual-gallery-title"
      >
        <div className="ritual-gallery-section__copy">
          <h2 id="ritual-gallery-title">Care that feels like yours.</h2>
          <Link href="/consultation">Find your ritual</Link>
        </div>
        <div className="ritual-gallery-section__gallery">
          <Link
            href={productHref("ara")}
            className="ritual-gallery-section__item"
          >
            <Image
              src="/images/ara-ritual.jpg"
              alt="Ahumma Ara body-care ritual"
              fill
              sizes="(max-width: 780px) 100vw, 25vw"
            />
            <span>For Black skin.</span>
          </Link>
          <Link
            href={productHref("dream whip", "dream")}
            className="ritual-gallery-section__item"
          >
            <Image
              src="/images/dream-ritual.jpg"
              alt="Ahumma Dream Whip body-care ritual"
              fill
              sizes="(max-width: 780px) 100vw, 25vw"
            />
            <span>For brown skin.</span>
          </Link>
          <Link
            href={productHref("sika", "sike")}
            className="ritual-gallery-section__item"
          >
            <Image
              src="/images/sika-ritual.jpg"
              alt="Ahumma Sika body-care ritual"
              fill
              sizes="(max-width: 780px) 100vw, 25vw"
            />
            <span>For every shade that knows its beauty.</span>
          </Link>
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
            <i />
            From Lagos to New York, London, Paris and beyond, Ahumma is for
            anyone who sees beauty in African heritage, beautiful ingredients
            and the simple pleasure of caring for their skin.
            <i />
            There is beauty in where we come from. There is beauty in who we
            are. And there is beauty in becoming more of ourselves.
          </p>
          <div className="global-section__actions">
            <Link className="global-section__cta" href="/about">
              About us
            </Link>
            <Link className="global-section__cta" href="/consultation">
              Find your ritual
            </Link>
          </div>
        </div>
      </section>

      <section
        className="testimonial-section"
        aria-labelledby="testimonial-title"
      >
        <div className="testimonial-section__intro">
          <h2 id="testimonial-title">Loved by our customers</h2>
        </div>
        <div className="testimonial-grid">
          <article className="testimonial-card testimonial-card--blue">
            <p>“A beautiful ritual I look forward to every day.”</p>
            <span>Adaeze · Lagos</span>
          </article>
          <article className="testimonial-card testimonial-card--cream">
            <p>
              “Thoughtful body care that makes my skin feel deeply nourished.”
            </p>
            <span>Amara · London</span>
          </article>
          <article className="testimonial-card testimonial-card--lilac">
            <p>
              “The texture, the scent and the feeling are all so considered.”
            </p>
            <span>Chidinma · Abuja</span>
          </article>
          <article className="testimonial-card testimonial-card--green">
            <p>“Finally, body care that feels made with my skin in mind.”</p>
            <span>Yasmin · Manchester</span>
          </article>
          <article className="testimonial-card testimonial-card--yellow">
            <p>“A small moment of care that changes how I feel.”</p>
            <span>Funmi · Lagos</span>
          </article>
          <article className="testimonial-card testimonial-card--pink">
            <p>“Beautiful products for a ritual that feels entirely my own.”</p>
            <span>Nia · New York</span>
          </article>
          <article className="testimonial-card testimonial-card--orange">
            <p>“My skin has never felt so soft, calm and cared for.”</p>
            <span>Tomi · Toronto</span>
          </article>
          <article className="testimonial-card testimonial-card--teal">
            <p>
              “Every product turns an everyday routine into something special.”
            </p>
            <span>Zainab · Accra</span>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
