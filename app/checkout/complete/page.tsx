import type { Metadata } from "next";
import { CheckoutStatus } from "@/components/checkout-status";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Your checkout",
  robots: { index: false, follow: false },
};

type CompletePageProps = {
  searchParams: Promise<{ checkout?: string | string[] }>;
};

export default async function CheckoutCompletePage({ searchParams }: CompletePageProps) {
  const query = await searchParams;
  const checkoutRef = Array.isArray(query.checkout) ? query.checkout[0] : query.checkout;

  return (
    <main className="status-page">
      <SiteHeader light />
      <div className="status-shell">
        <CheckoutStatus checkoutRef={checkoutRef} />
      </div>
    </main>
  );
}
