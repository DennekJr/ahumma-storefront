import type { Metadata } from "next";

import { AboutCommunitySection } from "@/components/about-community-section";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteFooter } from "@/components/site-footer";
import { IngredientStoryCard } from "@/components/ingredient-story-card";
import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/frontdesk";
import { INGREDIENT_STORY, WHY_AHUMMA } from "@/lib/homepage";

export const metadata: Metadata = {
  title: "About Ahumma",
  description:
    "Meet Ahumma: body care rooted in African beauty traditions, made in Nigeria for Africans everywhere.",
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
          Body care rooted in Africa.
          <br />
          Made for the world.
        </h1>
        <p>
          Ahumma is for Africans everywhere, with premium body care inspired by
          our roots and the belief that you are enough, just as you are. Our
          rich body butters bring that care into your everyday ritual.
        </p>
      </section>

      <section className="why-section" id="why">
        <div className="why-grid">
          {WHY_AHUMMA.map((reason) => (
            <article key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-belief-section" id="story">
        <video
          className="about-belief-section__video"
          src="/videos/explore-media.webm"
          poster="/images/love-your-skin.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="about-belief-section__copy">
          <h2>We started with a belief.</h2>
          <p>
            Ahumma was born from a desire to remind Africans around the world of
            something we should never have had to forget:
          </p>
          <p className="about-mantra">
            You are enough.
            <br />
            You are beautiful by design.
          </p>
          <p>
            For too long, beauty has been presented as something to achieve—to
            alter, correct or become. We wanted to create something different: a
            brand that celebrates Black and brown skin as it is, drawing from
            African ingredients and beauty traditions.
          </p>
          <p id="philosophy">
            Ahumma is a Nigerian-born premium body-care brand for Black and
            brown skin. We believe care should feel like a ritual, not a
            correction: thoughtful body care that nourishes, softens and
            celebrates you.
          </p>
        </div>
      </section>

      <section className="ingredient-section" id="ingredients">
        <div className="section-heading">
          <div>
            <h2>Every ingredient has a reason.</h2>
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

      <section className="about-audience-section" id="black-brown-skin">
        <div className="about-audience-section__media">
          <video
            src="/videos/ingredients-video.webm"
            poster="/images/sika-texture.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>
        <div className="about-audience-section__copy">
          <h2>Made for Black & brown skin.</h2>
          <p>
            Ahumma was created with Black and brown skin at the heart of the
            brand. Our products are made to celebrate the skin you’re in—not ask
            you to become something else.
          </p>
          <p>
            We believe beautiful body care should feel good on your skin, look
            beautiful on your shelf and make you feel good using it.
          </p>
          <p>
            Our inspiration comes from the ingredients, stories and beauty
            traditions that surround us.
          </p>
          <p>
            We are building a modern African body-care brand for people in
            Lagos, New York, London, Paris and everywhere in between—one that
            carries its heritage confidently and feels at home in the world.
          </p>
        </div>
      </section>

      <AboutCommunitySection />
      <SiteFooter />
    </main>
  );
}
