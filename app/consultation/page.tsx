import type { Metadata } from "next";

import { AnnouncementBar } from "@/components/announcement-bar";
import { ConsultationDialog } from "@/components/consultation-dialog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { findConcern } from "@/lib/concerns";

export const metadata: Metadata = {
  title: "Skin consultation",
  description:
    "Tell Ahumma what your skin needs and receive thoughtful body-care guidance rooted in ritual.",
  alternates: { canonical: "/consultation" },
};

export default async function ConsultationPage({
  searchParams,
}: {
  searchParams: Promise<{ concern?: string }>;
}) {
  const query = await searchParams;
  const concern = findConcern(query.concern);

  return (
    <main className="consultation-page">
      <AnnouncementBar />
      <SiteHeader />
      <header className="consultation-hero">
        <h1>Find your ritual.</h1>
        <p>
          Tell us a little about your skin, your routine and what care should
          feel like. We&apos;ll help you explore the Ahumma essentials that fit.
        </p>
        <ConsultationDialog
          initialConcerns={concern?.consultationLabels}
          showConcerns
        />
      </header>
      <ol className="consultation-steps" aria-label="How the consultation works">
        <li>
          <span>01</span>
          <h2>Tell us about your skin</h2>
          <p>A few questions on your skin, your routine and how care should feel.</p>
        </li>
        <li>
          <span>02</span>
          <h2>We suggest a ritual</h2>
          <p>We read every answer and come back with the Ahumma ritual that fits.</p>
        </li>
        <li>
          <span>03</span>
          <h2>Make it yours</h2>
          <p>Shop the suggestion, or reply with anything you&apos;d like to ask.</p>
        </li>
      </ol>
      <SiteFooter />
    </main>
  );
}
