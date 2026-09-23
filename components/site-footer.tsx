import Image from "next/image";
import Link from "next/link";
import { SOCIALS } from "@/lib/socials";
import { ScrollLink } from "@/components/scroll-link";
import { ArrowRight, AtSign } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-invitation">
        <span className="eyebrow eyebrow--light">Stay close</span>
        <h2>A slower ritual,<br />sent occasionally.</h2>
        <p>Notes on African botanicals, body care and the quiet art of tending to yourself.</p>
        <a className="footer-social" href={SOCIALS.instagram} target="_blank" rel="noreferrer">
          Follow @ahummabeauty <AtSign size={16} />
        </a>
      </div>
      <div className="footer-directory">
        <div className="footer-logo">
          <Image src="/images/ahumma-logo.png" alt="Ahumma" width={190} height={53} />
          <p>Born in Nigeria. Made for the world.</p>
        </div>
        <div className="footer-links-column">
          <span>Explore</span>
          <Link href="/shop">Shop all</Link>
          <ScrollLink href="/#made-for">Made for your skin</ScrollLink>
          <ScrollLink href="/#ritual">Our ritual</ScrollLink>
        </div>
        <div className="footer-links-column">
          <span>Care</span>
          <Link href="/faq">FAQs</Link>
          <Link href="/partner-network">Partner Network</Link>
          <Link href="/faq#shipping">Delivery</Link>
          <Link href="/faq#shipping">Returns</Link>
          <Link href="/faq#shipping">Contact</Link>
        </div>
        <Link className="footer-shop-link" href="/shop">
          Find your ritual <ArrowRight size={18} />
        </Link>
      </div>
      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Ahumma Limited</span>
        <div>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
