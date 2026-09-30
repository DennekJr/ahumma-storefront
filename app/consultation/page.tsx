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
        <ConsultationDialog initialConcerns={concern?.consultationLabels} />
      </header>
      <SiteFooter />
    </main>
  );
}
