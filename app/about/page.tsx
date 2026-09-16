import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { INGREDIENT_STORY, WHY_AHUMMA } from "@/lib/homepage";

export const metadata: Metadata = {
  title: "About Ahumma",
  description:
    "Discover Ahumma's approach to natural body care, sensory rituals, African heritage and beautiful simplicity.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
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
          Ahumma is a Nigerian-born premium body-care brand for Black and brown
          skin, created from a simple belief: you are enough, and you are
          beautiful by design.
        </p>
      </section>

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
            Ahumma was born from a desire to remind Africans around the world of
            something we should never have had to forget:
          </p>
          <p className="about-mantra">
            You are enough.
            <br />
            You are beautiful by design.
          </p>
          <p>
            For too long, beauty has been presented as something to achieve —
            something to alter, correct or become.
          </p>
          <p>We wanted to create something different.</p>
          <p>
            A brand that celebrates Black and brown skin as it is.
            <br />A brand that draws from the richness of African ingredients
            and beauty traditions.
            <br />A brand that makes caring for yourself feel less like a chore
            and more like a ritual.
          </p>
          <p>So we created Ahumma.</p>
          <p className="story-body__close">
            Beautiful, thoughtfully made body care for skin that deserves to be
            nourished, softened, enjoyed and celebrated.
          </p>
        </div>
      </section>

      <section
        className="global-section about-philosophy-section"
        id="philosophy"
      >
        <div className="global-copy">
          <h2>
            We don't believe
            <br />
            in fixing you.
          </h2>
        </div>
        <div className="global-body">
          <p>
            We believe in caring for you.
            <i />
            Your skin doesn't need to become something else to be beautiful.
            <br />
            It needs care.
            <i />
            The small ritual after a shower.
            <br />
            The scoop of butter between your palms.
            <br />
            The first lather of soap.
            <br />
            The scent that stays on your skin.
            <br />
            The five quiet minutes that belong entirely to you.
            <i />
            Ahumma is about making space for those moments.
            <br />
            Not correction.
            <br />
            Not perfection.
            <br />
            Just care.
            <i />
            That is Ahumma.
          </p>
        </div>
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
            Our inspiration comes from the ingredients, rituals, stories and
            beauty traditions that surround us — from shea and mango butter to
            the enduring tradition of African black soap.
            <br />
            <br />
            But our ambition is global.
            <br />
            <br />
            We are building a modern African beauty and body-care brand for
            people in Lagos, New York, London, Paris and everywhere in between.
            <br />
            <br />A brand that allows African heritage to feel not distant or
            nostalgic, but beautiful, modern and entirely at home in the world.
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
            <article key={ingredient.name}>
              <h3>{ingredient.name}</h3>
              <p>{ingredient.body}</p>
            </article>
          ))}
        </div>
        <Link href="/shop" className="underlined-link">
          Explore our ingredients <ArrowRight size={16} />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
