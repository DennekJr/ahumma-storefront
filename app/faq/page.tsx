import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { FAQ_GROUPS, FAQ_INTRO } from "@/lib/faq";
import { breadcrumbSchema, faqPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about Ahumma's whipped body butters, Ara liquid African black soap, ingredients, melanin-rich skin, shipping across Nigeria and the United States, and how to use each ritual.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Ahumma — Frequently asked questions",
    description:
      "What Ahumma is, what is in our body butters and African black soap, and how to use them.",
  },
};

export default function FaqPage() {
  return (
    <main className="faq-page">
      <StructuredData data={faqPageSchema()} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Ahumma", path: "/" },
          { name: "Frequently asked questions", path: "/faq" },
        ])}
      />

      <AnnouncementBar />
      <SiteHeader />

      <header className="faq-hero">
        <span className="eyebrow">Ahumma answered</span>
        <h1>
          Everything you
          <br />
          wanted to ask.
        </h1>
        <p>{FAQ_INTRO}</p>
      </header>

      <nav className="faq-contents" aria-label="Jump to a section">
        {FAQ_GROUPS.map((group) => (
          <a key={group.id} href={`#${group.id}`}>
            {group.title}
          </a>
        ))}
      </nav>

      <div className="faq-body">
        {FAQ_GROUPS.map((group) => (
          <section
            className="faq-group"
            id={group.id}
            key={group.id}
            aria-labelledby={`${group.id}-heading`}
          >
            <div className="faq-group__heading">
              <h2 id={`${group.id}-heading`}>{group.title}</h2>
            </div>

            <div className="faq-group__entries">
              {group.entries.map((entry) => (
                <details className="faq-entry" key={entry.question}>
                  <summary>
                    <h3>{entry.question}</h3>
                    <span className="faq-entry__marker" aria-hidden="true" />
                  </summary>
                  <div className="faq-entry__answer">
                    {entry.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {entry.points?.length ? (
                      <ul>
                        {entry.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    ) : null}
                    {entry.steps?.length ? (
                      <ol>
                        {entry.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    ) : null}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="faq-closing">
        <span className="eyebrow eyebrow--light">Still wondering</span>
        <p>
          At the edge of
          <br />
          everything beautiful is you.
        </p>
        <Link href="/shop">
          Shop Ahumma <ArrowRight size={16} />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
