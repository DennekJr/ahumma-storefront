import type { Metadata } from "next";

import Image from "next/image";
import { Check } from "lucide-react";
import { AboutCommunityGallery } from "@/components/about-community-section";
import { SiteFooter } from "@/components/site-footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { PartnerApplicationDialog } from "@/components/partner-application-dialog";
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
        <h1>Be the voice of the ritual.</h1>
        <p>
          Create with Ahumma, earn commission, and grow alongside a Nigerian
          body-care brand made for melanin-rich skin.
        </p>
        <PartnerApplicationDialog />
      </header>

      <section className="partner-community-gallery">
        <AboutCommunityGallery />
      </section>

      <section className="partner-goals" aria-labelledby="goals-heading">
        <div className="partner-section-heading">
          <h2 id="goals-heading">What you get from growing with Ahumma.</h2>
        </div>
        <div className="partner-goal-grid">
          {PARTNER_GOALS.map((goal) => (
            <article key={goal.title}>
              <h3>{goal.title}</h3>
              <p>{goal.body}</p>
            </article>
          ))}
          {PARTNER_BENEFITS.map((benefit) => (
            <article key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
            </article>
          ))}
          <article>
            <h3>Bring someone with you</h3>
            <p>
              Refer a creator, and once they reach Standard Partner you earn 1%
              of what they sell for the following three months. The boost only
              starts once they have proven themselves at Standard, and it stacks
              with every creator you bring who gets there.
            </p>
          </article>
        </div>
      </section>

      <section className="partner-tiers" aria-labelledby="tiers-heading">
        <div className="partner-section-heading">
          <h2 id="tiers-heading">
            Everyone starts as a Founding Partner.
            <br />
            Move up through consistent, quality content and sales through your
            code.
            <br />
            Reviews happen monthly.
          </h2>
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
                  To move up: {tier.progression}
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
        <div className="partner-section-heading partner-quality-heading">
          <h2 id="quality-heading">What makes content count.</h2>
        </div>
        <div className="partner-quality-layout">
          <div className="partner-quality-visual">
            <div className="partner-quality-media">
              <Image
                src="/images/skin-closeup.jpg"
                alt="A woman enjoying an Ahumma body-care ritual"
                fill
                sizes="(max-width: 900px) 92vw, 40vw"
              />
            </div>
          </div>
          <div className="partner-quality-content">
            <ul className="partner-quality-list">
              {QUALITY_CONTENT.map((item) => (
                <li key={item.body}>
                  <div className="partner-quality-list__image">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 600px) 88vw, (max-width: 900px) 44vw, 25vw"
                    />
                  </div>
                  <span className="partner-quality-list__number">
                    {item.number}
                  </span>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="partner-onboarding"
        aria-labelledby="onboarding-heading"
      >
        <div className="partner-onboarding-layout">
          <div className="partner-onboarding-content">
            <div className="partner-section-heading partner-onboarding-heading">
              <h2 id="onboarding-heading">Your first steps.</h2>
            </div>
            <ol className="partner-steps">
              {ONBOARDING_STEPS.map((step, index) => (
                <li key={step.title}>
                  <div>
                    <h3>
                      <span className="partner-step__number">
                        {String(index + 1).padStart(2, "0")}
                      </span>{" "}
                      {step.title}
                    </h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="partner-onboarding-visual">
            <Image
              src="/images/sika-ritual.jpg"
              alt="A woman holding Sika body butter"
              fill
              sizes="(max-width: 900px) 92vw, 40vw"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
