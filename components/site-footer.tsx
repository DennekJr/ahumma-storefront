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
        <section
          className="footer-newsletter"
          aria-labelledby="footer-newsletter-title"
        >
          <div className="footer-testimonial">
            <blockquote>
              <svg
                className="footer-testimonial__quote-mark"
                viewBox="0 0 48 40"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M0 40V23.5C0 8.5 7.7 1.3 23.2 0v8.7C15.4 10 11.5 14.2 10.3 21H20v19H0Zm28 0V23.5C28 8.5 35.7 1.3 51.2 0v8.7C43.4 10 39.5 14.2 38.3 21H48v19H28Z" />
              </svg>
              <p>
                “My skin has never felt this cared for. Ahumma has made body
                care feel like a ritual I look forward to.”
              </p>
            </blockquote>
            <div className="footer-testimonial__image">
              <Image
                src="/images/dream-whip.jpg"
                alt="Ahumma Dream Whip body butter"
                fill
                sizes="(max-width: 780px) 100vw, 50vw"
              />
            </div>
          </div>
          <h2 id="footer-newsletter-title">Join the Ahumma Circle.</h2>
          <p>
            First access to new rituals, limited releases and stories from
            Ahumma.
          </p>
          <CircleSignup buttonLabel="Join us" showArrow={false} />
        </section>

        <div className="footer-details">
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
