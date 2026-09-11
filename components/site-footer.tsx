import Image from "next/image";
import Link from "next/link";
import { CircleSignup } from "@/components/circle-signup";
import { ScrollLink } from "@/components/scroll-link";

export function SiteFooter() {
  return (
    <>
      <section className="footer-signup" aria-labelledby="footer-signup-title">
        <h2 id="footer-signup-title">Subscribe to get 10% off.</h2>
        <CircleSignup
          className="footer-signup__form"
          buttonLabel="Subscribe"
          showArrow={false}
        />
        <p className="footer-signup__privacy">
          By subscribing, you agree to Ahumma&apos;s{" "}
          <a
            href="https://ahumma.com/privacy-policy/"
            target="_blank"
            rel="noreferrer"
          >
            privacy policy
          </a>
          . We&apos;ll always treat your information responsibly.
        </p>
      </section>

      <footer className="site-footer">
        <div
          className="footer-wordmark"
          aria-label="At the edge of everything beautiful is you."
        >
          <span>At the edge of everything</span>
          <span>beautiful is you.</span>
        </div>

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
              <ScrollLink href="/#story">Our Story</ScrollLink>
              <ScrollLink href="/#philosophy">Our Philosophy</ScrollLink>
              <ScrollLink href="/#heritage">African Heritage</ScrollLink>
              <ScrollLink href="/#ingredients">Ingredients</ScrollLink>
              <ScrollLink href="/#ritual">Rituals</ScrollLink>
              <ScrollLink href="/#journal">Journal</ScrollLink>
              <Link href="/faq">FAQs</Link>
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
