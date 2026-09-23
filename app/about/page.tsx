import type { Metadata } from "next";
import Image from "next/image";

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
      </section>

      <SiteFooter />
    </main>
  );
}
