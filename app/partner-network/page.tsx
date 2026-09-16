import type { Metadata } from "next";

import { ArrowRight, Check } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { PartnerApplicationForm } from "@/components/partner-application-form";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import {
  ONBOARDING_STEPS,
  PARTNER_BENEFITS,
  PARTNER_GOALS,
  PARTNER_TIERS,
  QUALITY_CONTENT,
} from "@/lib/partner-network";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Creator Partner Network",
  description:
    "Ahumma's Creator Partner Network: earn 3–7% commission creating content for a Nigerian-born body-care brand for Black and brown skin, across Nigeria and the United States.",
  alternates: { canonical: "/partner-network" },
  openGraph: {
    title: "Ahumma — Creator Partner Network",
    description:
      "Turn the content you already make into a way to earn, alongside a brand built for Black and brown skin.",
  },
};

export default function PartnerNetworkPage() {
  return (
    <main className="partner-page">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Ahumma", path: "/" },
          { name: "Creator Partner Network", path: "/partner-network" },
        ])}
      />

      <AnnouncementBar />
      <SiteHeader />

      <header className="partner-hero">
        <h1>
          Be the voice
          <br />
          of the ritual.
        </h1>
        <p>
          A community of trusted, paid creators growing with Ahumma as it moves
          from a Nigerian favourite to a globally recognised, melanin-first
          body-care name.
        </p>
        <a className="partner-apply" href="#apply">
          Apply to join <ArrowRight size={17} />
        </a>
      </header>

      <section className="partner-goals" aria-labelledby="goals-heading">
        <div className="partner-section-heading">
          <h2 id="goals-heading">Three things at once.</h2>
        </div>
        <div className="partner-goal-grid">
          {PARTNER_GOALS.map((goal) => (
            <article key={goal.title}>
              <h3>{goal.title}</h3>
              <p>{goal.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-tiers" aria-labelledby="tiers-heading">
        <div className="partner-section-heading">
          <h2 id="tiers-heading">
            Everyone starts
            <br />
            in the same place.
          </h2>
          <p>
            You grow from there on consistency, content quality and what your
            code sells. Reviews happen monthly.
          </p>
        </div>

        <div className="partner-tier-grid">
          {PARTNER_TIERS.map((tier) => (
            <article className="partner-tier" key={tier.name}>
              <div className="partner-tier__head">
                <span className="partner-tier__commission">
                  {tier.commission}
                </span>
                <h3>{tier.name}</h3>
                <p className="partner-tier__status">{tier.status}</p>
              </div>

              <dl className="partner-tier__requirements">
                <div>
                  <dt>Content</dt>
                  <dd>{tier.content}</dd>
                </div>
                <div>
                  <dt>Sales</dt>
                  <dd>{tier.sales}</dd>
                </div>
              </dl>

              <ul className="partner-tier__includes">
                {tier.includes.map((item) => (
                  <li key={item}>
                    <Check size={15} /> {item}
                  </li>
                ))}
              </ul>

              {tier.progression ? (
                <p className="partner-tier__next">
                  <strong>To move up:</strong> {tier.progression}
                </p>
              ) : (
                <p className="partner-tier__next partner-tier__next--top">
                  The top of the network.
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="partner-quality" aria-labelledby="quality-heading">
        <div className="partner-section-heading">
          <h2 id="quality-heading">What counts as quality.</h2>
        </div>
        <ul className="partner-quality-list">
          {QUALITY_CONTENT.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="partner-referral" aria-labelledby="referral-heading">
        <div>
          <h2 id="referral-heading">Bring someone with you.</h2>
        </div>
        <p>
          Refer a creator, and once they reach Standard Partner you earn
          <strong> 1% of what they sell</strong> for the following three months.
          The boost only starts once they have proven themselves at Standard,
          and it stacks with every creator you bring who gets there.
        </p>
      </section>

      <section
        className="partner-onboarding"
        aria-labelledby="onboarding-heading"
      >
        <div className="partner-section-heading">
          <h2 id="onboarding-heading">
            From application
            <br />
            to first post.
          </h2>
        </div>
        <ol className="partner-steps">
          {ONBOARDING_STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="partner-step__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="partner-benefits" aria-labelledby="benefits-heading">
        <div className="partner-section-heading">
          <h2 id="benefits-heading">More than a commission.</h2>
        </div>
        <div className="partner-benefit-grid">
          {PARTNER_BENEFITS.map((benefit) => (
            <article key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="partner-apply-section"
        id="apply"
        aria-labelledby="apply-heading"
      >
        <div className="partner-section-heading">
          <h2 id="apply-heading">Tell us about your work.</h2>
          <p>
            Applications are reviewed by the Partner Network Manager. Everyone
            starts as a Founding Partner.
          </p>
        </div>
        <PartnerApplicationForm />
      </section>

      <SiteFooter />
    </main>
  );
}
