import type { Metadata } from "next";
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

      <section className="why-section">
        <div className="section-heading">
          <div>
            <h1>
              Care should
              <br />
              feel this good.
            </h1>
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

      <SiteFooter />
    </main>
  );
}
