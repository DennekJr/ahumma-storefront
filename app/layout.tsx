import type { Metadata } from "next";
import { CartProvider } from "@/components/cart-provider";
import { hasFrontdeskKeys } from "@/lib/frontdesk";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ahumma — Plant-powered body care",
    template: "%s — Ahumma",
  },
  description:
    "Considered body care made in Lagos with African botanicals for softer, nourished and radiant skin.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:6543"),
  openGraph: {
    title: "Ahumma — At the edge of everything beautiful is you",
    description: "Plant-powered body care, made in Lagos.",
    images: ["/images/skin-closeup.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <CartProvider checkoutEnabled={hasFrontdeskKeys}>{children}</CartProvider>
      </body>
    </html>
  );
}
