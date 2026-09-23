"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CircleSignup } from "@/components/circle-signup";
import { FooterSignupPopup } from "@/components/footer-signup-popup";
import { ScrollLink } from "@/components/scroll-link";

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <>
      <FooterSignupPopup footerRef={footerRef} />
      <footer ref={footerRef} className="site-footer">
        <div
          className="footer-wordmark"
          aria-label="At the edge of everything beautiful is you."
        >
          <span>At the edge of everything</span>
          <span>beautiful is you.</span>
        </div>

        <div className="footer-details">
          <section
            className="footer-newsletter"
            aria-labelledby="footer-newsletter-title"
          >
            <h2 id="footer-newsletter-title">Join the Ahumma Circle.</h2>
            <p>
              First access to new rituals, limited releases and stories from
              Ahumma.
            </p>
            <CircleSignup buttonLabel="Join us" />
          </section>
          <nav className="footer-utility-links" aria-label="Footer links">
            <div>
              <span>Shop</span>
              <Link href="/shop">Body Butters</Link>
              <Link href="/products/sika-body-butter">Sika</Link>
              <Link href="/products/ahumma-body-butter-duo">Dream Whip</Link>
              <Link href="/shop">Baby Bloom</Link>
              <Link href="/products/ahumma-ara-refined-african-black-soap">
                Ara Liquid African Black Soap
              </Link>
              <Link href="/shop">All Products</Link>
            </div>
            <div>
              <span>Discover</span>
              <ScrollLink href="/about#story">Our Story</ScrollLink>
              <ScrollLink href="/about#philosophy">Our Philosophy</ScrollLink>
              <ScrollLink href="/about#heritage">African Heritage</ScrollLink>
              <ScrollLink href="/about#ingredients">Ingredients</ScrollLink>
              <Link href="/shop">Rituals</Link>
              <Link href="/faq">FAQs</Link>
              <Link href="/consultation">Skin consultation</Link>
            </div>
            <div>
              <span>Help</span>
              <a
                href="https://ahumma.com/contact/"
                target="_blank"
                rel="noreferrer"
              >
                Contact
              </a>
              <a
                href="https://ahumma.com/delivery/"
                target="_blank"
                rel="noreferrer"
              >
                Shipping & Delivery
              </a>
              <a
                href="https://ahumma.com/return-cancellations/"
                target="_blank"
                rel="noreferrer"
              >
                Returns & Exchanges
              </a>
              <a
                href="https://ahumma.com/privacy-policy/"
                target="_blank"
                rel="noreferrer"
              >
                Privacy
              </a>
              <a
                href="https://ahumma.com/privacy-policy/"
                target="_blank"
                rel="noreferrer"
              >
                Terms
              </a>
            </div>
            <div>
              <span>Connect</span>
              <a
                href="https://www.instagram.com/ahummabeauty"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@ahummabeauty"
                target="_blank"
                rel="noreferrer"
              >
                TikTok
              </a>
              <a
                href="https://www.pinterest.com/ahummabeauty"
                target="_blank"
                rel="noreferrer"
              >
                Pinterest
              </a>
              <a
                href="https://x.com/ahummabeauty"
                target="_blank"
                rel="noreferrer"
              >
                X (Twitter)
              </a>
            </div>
          </nav>

          <div className="footer-legal">
            <Image
              src="/images/ahumma-logo.png"
              alt="Ahumma"
              width={190}
              height={53}
            />
            <span>Born in Nigeria. Made for the world.</span>
            <span>© {new Date().getFullYear()}. Powered by FrontDesk</span>
          </div>
        </div>
      </footer>
    </>
  );
}
