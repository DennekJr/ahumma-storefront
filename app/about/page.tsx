import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteFooter } from "@/components/site-footer";
import { IngredientStoryCard } from "@/components/ingredient-story-card";
import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/frontdesk";
import { INGREDIENT_STORY, WHY_AHUMMA } from "@/lib/homepage";

export const metadata: Metadata = {
  title: "About Ahumma",
  description:
    "Discover Ahumma's approach to natural body care, sensory rituals, African heritage and beautiful simplicity.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const products = await getProducts();
  const productHref = (...names: string[]) => {
    const match = products.find((product) =>
      names.some((name) => product.name.toLowerCase().includes(name)),
    );

    return match ? `/products/${match.slug}` : "/shop";
  };

  return (
    <main className="about-page">
      <AnnouncementBar />
      <SiteHeader />

      <section className="faq-hero about-intro">
        <h1>
          Care should
          <br />
          feel this good.
        </h1>
        <p>
          Ahumma is Nigerian-born body care for Black and brown skin, built on a
          simple belief: you are enough, and you are beautiful by design.
        </p>
      </section>

      <section className="story-section" id="story">
        <div className="story-copy">
          <h2>We started with a belief.</h2>
        </div>
        <div className="story-body">
          <p>
            Ahumma was born to remind Africans around the world of something we
            should never have had to forget:
          </p>
          <p>
            You are enough.
            <br />
            You are beautiful by design.
          </p>
          <p>
            We make thoughtful body care that celebrates Black and brown skin as
            it is, draws from African ingredients and beauty traditions, and
            turns everyday care into a ritual.
          </p>
        </div>
      </section>

      <section className="about-belief-section" id="philosophy">
        <div className="about-belief-section__image">
          <Image
            src="/images/love-your-skin.jpg"
            alt="A woman enjoying a quiet body-care ritual"
            fill
            sizes="(max-width: 780px) 100vw, 50vw"
          />
        </div>
        <div className="about-belief-section__copy">
          <p>
            Ahumma is a Nigerian-born premium body-care brand for Black and
            brown skin, created from a simple belief: you are enough, and you
            are beautiful by design.
          </p>
          <p>
            Care should feel like a ritual, not a correction. Beautiful,
            thoughtful body care for skin that deserves to be nourished,
            softened and celebrated.
          </p>
        </div>
      </section>

      <section className="philosophy-image-grid" aria-label="Ahumma rituals">
        <Link href={productHref("ara")} className="philosophy-image-grid__item">
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
      </section>

      <section className="about-visual-break" aria-label="Ahumma ritual">
        <Image
          src="/images/hero-woman.png"
          alt="A person taking a quiet moment for their ritual"
          width={1411}
          height={1800}
        />
        <p>African heritage. Modern ritual. Beautiful skin.</p>
      </section>

      <section className="story-section about-difference-section" id="heritage">
        <div className="story-copy">
          <h2>
            Rooted in Africa.
            <br />
            Made for everywhere.
          </h2>
        </div>
        <div className="story-body">
          <p>
            Ahumma is proudly Nigerian.
            <br />
            <br />
            Our inspiration comes from the ingredients, rituals and beauty
            traditions around us — from shea and mango butter to the enduring
            tradition of African black soap.
            <br />
            <br />
            Our ambition is global: to build a modern African body-care brand
            that feels at home in Lagos, New York, London, Paris and everywhere
            in between.
          </p>
          <p className="story-body__close">
            African heritage.
            <br />
            Modern ritual.
            <br />
            Beautiful skin.
          </p>
        </div>
      </section>

      <section className="why-section" id="why">
        <div className="section-heading">
          <div>
            <h2>
              Why care should
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

      <section className="ingredient-section" id="ingredients">
        <div className="section-heading">
          <div>
            <h2>
              Good things grow from
              <br />
              the right ingredients.
            </h2>
          </div>
          <p>
            Every ingredient has a role.
            <br />
            Every formula has a reason.
          </p>
        </div>
        <div className="ingredient-grid">
          {INGREDIENT_STORY.map((ingredient) => (
            <IngredientStoryCard
              key={ingredient.name}
              {...ingredient}
              products={products}
            />
          ))}
        </div>
        <div className="about-cta-row">
          <Link href="/shop" className="underlined-link">
            Explore the collection <ArrowRight size={16} />
          </Link>
          <Link href="/consultation" className="underlined-link">
            Find your ritual <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
