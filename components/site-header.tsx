"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/components/cart-provider";
import { STORE_CURRENCIES } from "@/lib/format";

export function SiteHeader({ light = false }: { light?: boolean }) {
  const { itemCount, openCart, currency, setCurrency } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const menuWasOpenRef = useRef(false);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      if (menuWasOpenRef.current) menuTriggerRef.current?.focus();
      menuWasOpenRef.current = false;
      return;
    }

    menuWasOpenRef.current = true;
    menuCloseRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const drawer =
        menuCloseRef.current?.closest<HTMLElement>("[role=dialog]");
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button, a, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const hero = header?.closest<HTMLElement>(".home-hero");

    if (!header || !hero) return;

    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = gsap.matchMedia();
    mediaQuery.add("(prefers-reduced-motion: no-preference)", () => {
      const wordmark = header.querySelector<HTMLElement>(".wordmark");

      const rootStyles = getComputedStyle(document.documentElement);
      const ink = rootStyles.getPropertyValue("--ink").trim();
      const line = rootStyles.getPropertyValue("--line").trim();

      const context = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            start: "top top",
            end: "+=40",
            scrub: true,
          },
        });

        timeline.to(document.documentElement, {
          "--header-height": "3.2rem",
          "--header-top": "0px",
          ease: "none",
        });

        timeline.fromTo(
          header,
          {
            backgroundColor: "transparent",
            color: ink,
            borderColor: line,
          },
          {
            backgroundColor: "rgba(250, 248, 243, 0.94)",
            color: ink,
            borderColor: line,
            ease: "none",
          },
          0,
        );

        if (wordmark) {
          timeline.fromTo(
            wordmark,
            { scale: 1 },
            { scale: 0.8, ease: "none" },
            0,
          );
        }
      }, header);

      return () => context.revert();
    });

    return () => mediaQuery.revert();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header ${light ? "site-header--light" : ""}`}
      >
        <button
          ref={menuTriggerRef}
          type="button"
          className="header-menu"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          MENU
        </button>
        <Link
          href="/"
          className="wordmark"
          aria-label="Ahumma home"
          onClick={(event) => {
            if (pathname !== "/") return;
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            src="/images/ahumma-logo.png"
            alt="Ahumma"
            width={158}
            height={44}
            loading="eager"
          />
        </Link>
        <div className="header-actions">
          <button
            type="button"
            className="header-cart"
            onClick={openCart}
            aria-label={`Open shopping bag with ${itemCount} items`}
          >
            <span className="header-cart__visual">
              <svg
                className="header-cart__icon"
                viewBox="0 0 148 146"
                aria-hidden="true"
              >
                <path
                  d="M35.989 5.89692C36.3226 5.85693 37.113 5.8352 37.4563 5.83467C43.902 5.82467 50.3605 5.84337 56.8051 5.84163L96.5967 5.83274L116.007 5.82703C119.001 5.82606 124.585 5.66886 127.294 6.10721C130.208 6.60438 132.903 7.9724 135.024 10.0311C137.321 12.2773 138.822 15.2122 139.298 18.3895C139.759 21.3131 139.569 26.7584 139.575 29.8877L139.573 51.0456L139.572 105.234C139.572 114.051 139.409 123.445 139.574 132.209L95.7412 132.208L43.3912 132.193C31.4095 132.194 18.9064 132.004 6.97656 132.225C7.6132 129.774 9.29926 125.312 10.1233 122.8L15.3183 106.482C16.7407 102.147 18.0963 97.4304 19.4847 93.0635L29.583 61.1017L34.147 46.8862C34.2835 46.4734 34.4336 46.0471 34.5906 45.6421C35.7506 42.6485 36.6483 39.5026 37.4734 36.4014C36.4158 36.25 35.2821 36.1113 34.2443 35.8765C27.9258 34.4473 22.9924 29.0341 22.3903 22.5455C21.9897 18.4222 23.2568 14.3101 25.9087 11.1272C28.5871 7.92534 31.8389 6.27173 35.989 5.89692ZM13.9468 126.799C19.7817 126.595 26.6493 126.776 32.5633 126.777L68.7331 126.778L86.8771 126.769C88.4184 126.767 94.1463 126.666 95.4662 126.878C95.9301 124.463 96.8703 121.818 97.6143 119.445C104.767 96.6324 111.985 73.848 119.251 51.0697C120.722 46.458 122.888 40.9879 123.983 36.3441C117.941 36.6328 110.4 36.3853 104.231 36.3836L65.7632 36.381L49.3342 36.3964C48.0859 36.3989 43.3921 36.5125 42.5429 36.3052C42.291 39.2819 40.2428 44.3167 39.3295 47.2499C35.7809 58.6465 32.1883 70.0338 28.574 81.4108C26.9467 86.533 25.2965 91.672 23.6792 96.8125L17.2533 116.564C16.3011 119.446 15.3135 124.196 13.9468 126.799ZM122.715 11.3267C121.276 11.4972 120.844 11.7133 119.555 12.3829C112.524 16.0359 112.766 26.7523 120.11 29.8511C120.511 30.0203 121.078 30.5309 121.51 30.7106C122.831 31.0555 124.541 30.9642 125.909 30.9591C128.655 30.9568 131.462 30.927 134.203 30.9531C133.973 27.208 134.353 23.346 134.07 19.5943C133.89 17.2138 132.694 14.8908 130.924 13.2926C128.588 11.1836 125.656 11.2099 122.715 11.3267ZM112.4 11.1919C106.263 11.5609 98.0119 11.3336 91.7128 11.334L54.4818 11.3228L42.1266 11.3069C40.0552 11.3019 37.4509 11.1968 35.4104 11.4376C30.2408 12.0476 26.0607 18.9811 27.9654 23.8108C28.6641 25.5823 29.8288 27.4703 31.3147 28.7135C31.8775 29.1806 32.504 29.5648 33.1754 29.855C36.0982 31.4286 39.802 30.9698 43.0967 30.9698L55.7854 30.9638L93.6694 30.9564L106.171 30.9548C108.227 30.9549 110.803 30.8845 112.83 30.9819C108.65 24.5359 107.451 20.203 111.468 13.0162C111.708 12.5869 112.885 11.3347 112.801 11.1716L112.4 11.1919ZM129.694 35.94C128.993 37.442 128.738 39.0976 128.182 40.6542C126.767 44.6168 125.636 48.6352 124.305 52.6248C123.819 54.0844 123.473 55.7759 122.981 57.2582L108.248 102.924L103.129 119.011C102.276 121.698 101.487 123.866 100.674 126.643C100.713 126.706 100.784 126.839 100.835 126.875C102.144 126.7 104.204 126.756 105.567 126.76L112.846 126.779C119.805 126.783 127.319 126.617 134.21 126.764C134.057 124.821 134.141 122.168 134.146 120.178L134.156 109.594C134.162 85.6388 134.158 61.6838 134.157 37.7287C134.157 37.2374 134.303 36.1799 134.026 35.879C132.85 35.8881 130.801 35.8391 129.694 35.94Z"
                  fill="currentColor"
                />
              </svg>
              <span className="header-cart__count" aria-hidden="true">
                {itemCount < 9 ? itemCount : "*"}
              </span>
            </span>
            <span className="header-cart__label">BAG</span>
          </button>
        </div>
      </header>
      <button
        type="button"
        className={`menu-backdrop ${menuOpen ? "is-visible" : ""}`}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        id="site-menu"
        className={`menu-drawer ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="menu-drawer__header">
          <button
            ref={menuCloseRef}
            type="button"
            className="menu-drawer__close"
            onClick={() => setMenuOpen(false)}
          >
            CLOSE
          </button>
          <span>MENU</span>
        </div>
        <nav className="menu-drawer__nav" aria-label="Primary navigation">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <span>Home</span>
          </Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>
            <span>Shop</span>
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            <span>About</span>
          </Link>
          <Link href="/faq" onClick={() => setMenuOpen(false)}>
            <span>FAQs</span>
          </Link>
        </nav>
        <div className="menu-drawer__currency" aria-label="Shopping currency">
          <div
            className={`menu-drawer__currency-options ${
              currency === STORE_CURRENCIES[1] ? "is-second" : ""
            }`}
          >
            {STORE_CURRENCIES.map((option) => (
              <button
                type="button"
                key={option}
                className={currency === option ? "is-active" : ""}
                aria-pressed={currency === option}
                aria-label={`Show prices in ${option}`}
                onClick={() => setCurrency(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
