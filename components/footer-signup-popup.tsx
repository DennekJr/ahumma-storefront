"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { CircleSignup } from "@/components/circle-signup";

export function FooterSignupPopup({
  footerRef,
}: {
  footerRef: RefObject<HTMLElement | null>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const suppressionKey = "ahumma-footer-signup-suppressed";
  const sessionKey = "ahumma-footer-signup-shown";

  useEffect(() => {
    setSuppressed(window.localStorage.getItem(suppressionKey) === "true");
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !suppressed &&
          window.sessionStorage.getItem(sessionKey) !== "true"
        ) {
          window.sessionStorage.setItem(sessionKey, "true");
          setIsOpen(true);
        }
      },
      { threshold: 0 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [footerRef, suppressed]);

  useEffect(() => {
    if (!isOpen) {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = closeRef.current?.closest<HTMLElement>("[role=dialog]");
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, input, [href], select, textarea, [tabindex]:not([tabindex="-1"])',
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
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function close() {
    window.sessionStorage.setItem(sessionKey, "true");
    setIsOpen(false);
  }

  function suppress() {
    window.localStorage.setItem(suppressionKey, "true");
    window.sessionStorage.setItem(sessionKey, "true");
    setSuppressed(true);
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div className="footer-signup-popup" role="presentation">
      <button
        type="button"
        className="footer-signup-popup__backdrop"
        aria-label="Close signup offer"
        onClick={close}
      />
      <div
        className="footer-signup-popup__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="footer-signup-popup-title"
      >
        <div className="footer-signup-popup__image">
          <Image
            src="/images/newsletter-image.jpg"
            alt="Ahumma newsletter"
            fill
            sizes="(max-width: 780px) 100vw, 50vw"
          />
        </div>
        <div className="footer-signup-popup__content">
          <button
            ref={closeRef}
            type="button"
            className="footer-signup-popup__close"
            aria-label="Close signup offer"
            onClick={close}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m5 5 14 14M19 5 5 19" />
            </svg>
          </button>
          <Image
            className="footer-signup-popup__brand"
            src="/images/ahumma-logo.png"
            alt="Ahumma"
            width={190}
            height={53}
          />
          <h2 id="footer-signup-popup-title">Join the Ahumma Circle.</h2>
          <p className="footer-signup-popup__lede">
            First access to new rituals, limited releases and stories from
            Ahumma.
          </p>
          <CircleSignup
            className="footer-signup-popup__form"
            buttonLabel="JOIN US"
            showArrow={false}
            onSuccess={suppress}
          />
          <button
            type="button"
            className="footer-signup-popup__suppress"
            onClick={suppress}
          >
            Don&apos;t show again
          </button>
        </div>
      </div>
    </div>
  );
}
