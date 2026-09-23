import type { Metadata } from "next";
import Image from "next/image";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ConsultationForm } from "@/components/consultation-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Skin consultation",
  description:
    "Tell Ahumma what your skin needs and receive thoughtful body-care guidance rooted in ritual.",
  alternates: { canonical: "/consultation" },
};

export default function ConsultationPage() {
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
      </header>
      <section
        className="consultation-section"
        aria-labelledby="consultation-heading"
      >
        <div className="consultation-section__intro">
          <Image
            className="consultation-section__image"
            src="/images/skin-closeup.jpg"
            alt="Close-up of skin after an Ahumma ritual"
            width={1333}
            height={2000}
          />
          <h2 id="consultation-heading">A little about you.</h2>
          <p>There are no wrong answers. Share only what feels useful.</p>
        </div>
        <ConsultationForm />
      </section>
      <SiteFooter />
    </main>
  );
}
