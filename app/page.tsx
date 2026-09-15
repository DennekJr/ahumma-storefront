import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { connection } from "next/server";
import { ProductCard } from "@/components/product-card";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CircleSignup } from "@/components/circle-signup";
import { ScrollLink } from "@/components/scroll-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { getProducts } from "@/lib/frontdesk";
import {
  CIRCLE_BENEFITS,
  INGREDIENT_STORY,
  RITUAL_CATEGORIES,
  RITUAL_PRODUCTS,
  WHY_AHUMMA,
} from "@/lib/homepage";
import { organizationSchema } from "@/lib/structured-data";

/** The Ahumma story reads long beside the philosophy, so it is held back for
 *  now. Flip to true to restore it above the philosophy section. */
const SHOW_STORY_SECTION = false;

export default async function HomePage() {
  await connection();
  const products = await getProducts();
  const featuredProducts = products.slice(0, 3);
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
        <div className="philosophy-image-grid">
          <div className="philosophy-image-grid__item">
            <Image
              src="/images/ara-ritual.jpg"
              alt="Ahumma Ara body-care ritual"
              fill
              sizes="(max-width: 780px) 100vw, 33vw"
            />
          </div>
          <div className="philosophy-image-grid__item">
            <Image
              src="/images/dream-ritual.jpg"
              alt="Ahumma Dream Whip body-care ritual"
              fill
              sizes="(max-width: 780px) 100vw, 33vw"
            />
          </div>
          <div className="philosophy-image-grid__item">
            <Image
              src="/images/sika-ritual.jpg"
              alt="Ahumma Sika body-care ritual"
              fill
              sizes="(max-width: 780px) 100vw, 33vw"
            />
          </div>
        </div>
      </section>

      <section
        className="love-skin-section"
        id="love-your-skin"
        aria-labelledby="love-your-skin-title"
      >
        <Image
          className="love-skin__image"
          src="/images/love-your-skin.jpg"
          alt="A woman enjoying an Ahumma body-care ritual"
          fill
          sizes="100vw"
        />
        <div className="love-skin__overlay" aria-hidden="true" />
        <div className="love-skin__content">
          <h2 id="love-your-skin-title">Love your skin</h2>
          <p className="love-skin__lead">
            Your skin tells your story — nourish it, honor it, and let it glow.
          </p>
          <p className="love-skin__body">
            Rich, whipped body butters made with shea, mango and cocoa to deeply
            nourish Black and brown skin. Not to correct it, not to change it —
            to care for it. Every application is five quiet minutes that belong
            entirely to you.
          </p>
          <ScrollLink href="#shop" className="love-skin__cta">
            Shop now <ArrowRight size={17} />
          </ScrollLink>
        </div>
      </section>

      <section className="ritual-intro-section">
        <div className="section-heading">
          <div>
            <h2>
              A little care
              <br />
              goes a long way.
            </h2>
          </div>
          <p>
            Two ways into the ritual, and four beautiful ways to care for your
            skin.
          </p>
        </div>

        <div className="ritual-category-grid">
          {RITUAL_CATEGORIES.map((category) => (
            <article className="ritual-category" key={category.title}>
              <h3>{category.title}</h3>
              <p className="ritual-category__tagline">{category.tagline}</p>
              <p>{category.body}</p>
            </article>
          ))}
        </div>

        <div className="ritual-product-list">
          {RITUAL_PRODUCTS.map((product) => (
            <Link
              className="ritual-product"
              href={productHref(...product.match)}
              key={product.name}
            >
              <span className="ritual-product__name">{product.name}</span>
              <span className="ritual-product__tagline">{product.tagline}</span>
              <span className="ritual-product__body">{product.body}</span>
              <span className="ritual-product__cta">
                Shop {product.name} <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading shop-heading">
          <div>
            <h2>
              Care you&apos;ll
              <br />
              return to.
            </h2>
          </div>
          <p>
            A considered collection. Each formula is made to work deeply, feel
            beautiful and earn its place in your daily ritual.
          </p>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <ProductCard product={product} index={index} key={product.ref} />
          ))}
        </div>

        {products.length > featuredProducts.length ? (
          <div className="shop-view-more-row">
            <Link href="/shop" className="shop-view-more">
              View all products <ArrowRight size={17} />
            </Link>
          </div>
        ) : null}
      </section>

      <section className="made-for-section" id="made-for">
        <div className="made-for-intro">
          <h2>
            Your skin. Your ritual.
            <br />
            Your beauty.
          </h2>
          <p className="made-for-lede">
            Ahumma was created with Black and brown skin at the heart of the
            brand. From the richness of deep melanin to every shade in between,
            our products celebrate the skin you&apos;re in — not ask you to
            become something else.
          </p>
        </div>
        <div className="made-for-grid">
          <Link
            href={productHref("ara")}
            className="made-for-card made-for-card--wide"
          >
            <Image
              src="/images/ara-ritual.jpg"
              alt="Ahumma body-care ritual"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <span>
              <small>01</small> For Black skin <ArrowRight size={17} />
            </span>
          </Link>
          <Link
            href={productHref("dream whip", "dream")}
            className="made-for-card"
          >
            <Image
              src="/images/dream-ritual.jpg"
              alt="Dream Whip body butter ritual"
              fill
              sizes="(max-width: 800px) 100vw, 25vw"
            />
            <span>
              <small>02</small> For brown skin <ArrowRight size={17} />
            </span>
          </Link>
          <Link href={productHref("sika", "sike")} className="made-for-card">
            <Image
              src="/images/sika-ritual.jpg"
              alt="Sika body butter ritual"
              fill
              sizes="(max-width: 800px) 100vw, 25vw"
            />
            <span>
              <small>03</small> For every shade that knows its beauty{" "}
              <ArrowRight size={17} />
            </span>
          </Link>
        </div>
      </section>

      <section className="ritual-section" id="ritual">
        <div className="ritual-image">
          <Image
            src="/images/skin-closeup.jpg"
            alt="Healthy, luminous skin"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <span className="image-caption">Ahumma / Lagos, Nigeria</span>
        </div>
        <div className="ritual-copy">
          <h2>
            Make a ritual
            <br />
            of coming back.
          </h2>
          <p>
            Begin with a gentle cleanse. Press moisture into damp skin. Take
            your time. Our formulas are concentrated, sensorial and made to meet
            your body where it is.
          </p>
          <div className="ritual-steps">
            <div>
              <span>01</span>
              <strong>Cleanse</strong>
              <small>Clarify without stripping</small>
            </div>
            <div>
              <span>02</span>
              <strong>Nourish</strong>
              <small>Seal in lasting comfort</small>
            </div>
            <div>
              <span>03</span>
              <strong>Glow</strong>
              <small>Return to your radiance</small>
            </div>
          </div>
          <ScrollLink href="#shop" className="light-link">
            Build your ritual <ArrowRight size={17} />
          </ScrollLink>
        </div>
      </section>

      <section className="made-section">
        <div className="made-copy">
          <h2>
            African botanicals.
            <br />
            Modern formulation.
            <br />
            Made in Lagos.
          </h2>
        </div>
        <div className="made-principles">
          <p>
            We choose hardworking plant oils and butters for what they do, not
            only where they come from.
          </p>
          <div className="principle-list">
            <span>Shea butter</span>
            <span>Jojoba oil</span>
            <span>Cocoa pod ash</span>
            <span>Mango butter</span>
          </div>
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

      <section className="circle-section" id="circle">
        <div className="circle-copy">
          <h2>
            Caring for yourself
            <br />
            is not indulgence.
          </h2>
          <p>It&apos;s necessary. Come closer for:</p>
          <ul className="circle-benefits">
            {CIRCLE_BENEFITS.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
        <div className="circle-signup">
          <p className="circle-signup__lede">
            Join the Ahumma Circle for first access to new rituals, limited
            releases, stories and everything we&apos;re creating next.
          </p>
          <CircleSignup />
        </div>
      </section>

      <section className="closing-quote">
        <p>
          “Your skin tells your story—nourish it, honour it, and let it glow.”
        </p>
        <span>Ahumma</span>
      </section>

      <SiteFooter />
    </main>
  );
}
