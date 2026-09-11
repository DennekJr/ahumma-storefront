"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollLink } from "@/components/scroll-link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { STORE_CURRENCIES } from "@/lib/format";

export function SiteHeader({ light = false }: { light?: boolean }) {
  const { itemCount, openCart, currency, setCurrency } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`site-header ${light ? "site-header--light" : ""}`}>
      <button type="button" className="mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
        <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <ScrollLink href="/#concerns" onClick={() => setMenuOpen(false)}>By concern</ScrollLink>
        <ScrollLink href="/#ritual" onClick={() => setMenuOpen(false)}>The ritual</ScrollLink>
      </nav>
      <Link href="/" className="wordmark" aria-label="Ahumma home">
        <Image src="/images/ahumma-logo.png" alt="Ahumma" width={158} height={44} loading="eager" />
      </Link>
      <div className="header-actions">
        <div className="currency-switcher" aria-label="Shopping currency">
          {STORE_CURRENCIES.map((option) => (
            <button
              type="button"
              key={option}
              className={currency === option ? "is-active" : ""}
              aria-pressed={currency === option}
              aria-label={`Show prices in ${option}`}
              onClick={() => setCurrency(option)}
            >
              <span className="currency-long">{option}</span>
              <span className="currency-symbol" aria-hidden="true">
                {option === "NGN" ? "₦" : "$"}
              </span>
            </button>
          ))}
        </div>
        <button type="button" className="header-cart" onClick={openCart} aria-label={`Open shopping bag with ${itemCount} items`}>
          <span>Bag</span>
          <ShoppingBag size={18} strokeWidth={1.6} />
          <small>{itemCount}</small>
        </button>
      </div>
    </header>
  );
}
