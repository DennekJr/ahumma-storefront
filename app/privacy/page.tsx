import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/structured-data";
import {
  PRIVACY_CLOSING,
  PRIVACY_META,
  PRIVACY_SECTIONS,
} from "@/lib/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Ahumma Limited collects, uses, shares, stores and protects personal information, and the privacy rights available to customers in Nigeria, the United States and Canada.",
  alternates: { canonical: "/privacy" },
};

/** Anchor ids are stable across edits so a cited link keeps working. */
function sectionId(n: number) {
  return `section-${n}`;
}

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Ahumma", path: "/" },
          { name: "Privacy policy", path: "/privacy" },
        ])}
      />

      <div className="announcement-bar">
        <span>Complimentary Lagos delivery on orders over ₦60,000</span>
        <span className="announcement-desktop">
          Made in Lagos · Shipping worldwide
        </span>
      </div>
      <SiteHeader />

      <header className="legal-head">
        <nav className="collection-crumbs" aria-label="Breadcrumb">
          <Link href="/">Ahumma</Link>
          <span aria-hidden="true">—</span>
          <span className="is-current">Privacy policy</span>
        </nav>
        <h1>Privacy policy</h1>
        <dl className="legal-meta">
          <div>
            <dt>Effective</dt>
            <dd>{PRIVACY_META.effectiveDate}</dd>
          </div>
          <div>
            <dt>Last updated</dt>
            <dd>{PRIVACY_META.lastUpdated}</dd>
          </div>
          <div>
            <dt>Controller</dt>
            <dd>
              {PRIVACY_META.company} · No. {PRIVACY_META.registrationNumber}
            </dd>
          </div>
          <div>
            <dt>Privacy contact</dt>
            <dd>
              <a href={`mailto:${PRIVACY_META.email}`}>{PRIVACY_META.email}</a>
            </dd>
          </div>
        </dl>
      </header>

      <div className="legal-body">
        {/* Thirty-five sections is a document, not a page; it needs a way in. */}
        <nav className="legal-toc" aria-label="Sections">
          <span className="eyebrow">Contents</span>
          <ol>
            {PRIVACY_SECTIONS.map((section) => (
              <li key={section.n}>
                <a href={`#${sectionId(section.n)}`}>
                  <span>{section.n}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="legal-content">
          {PRIVACY_SECTIONS.map((section) => (
            <section
              key={section.n}
              id={sectionId(section.n)}
              aria-labelledby={`${sectionId(section.n)}-heading`}
            >
              <h2 id={`${sectionId(section.n)}-heading`}>
                <span aria-hidden="true">{section.n}</span>
                {section.title}
              </h2>
              {section.blocks.map((block, index) => {
                if (block.t === "h3") {
                  return (
                    <h3 key={index}>
                      <span aria-hidden="true">{block.n}</span> {block.v}
                    </h3>
                  );
                }

                if (block.t === "ul") {
                  return (
                    <ul key={index}>
                      {block.v.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                // Contact blocks carry deliberate line breaks from the source.
                return (
                  <p key={index}>
                    {block.v.split("\n").map((line, i) => (
                      <span key={line} className="legal-line">
                        {i > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </p>
                );
              })}
            </section>
          ))}

          <section className="legal-closing">
            <h2>{PRIVACY_CLOSING.title}</h2>
            {PRIVACY_CLOSING.blocks.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="legal-closing__signoff">{PRIVACY_CLOSING.signoff}</p>
          </section>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
