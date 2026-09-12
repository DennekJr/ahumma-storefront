"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { SOCIALS } from "@/lib/socials";

type Props = {
  communityUrl: string | null;
  onClose: () => void;
};

/**
 * Shown once an application is received. It confirms the application is under
 * review — not accepted — and hands over the community invite and the brand's
 * social profiles while the applicant is still on the page.
 *
 * A dialog takes the page over, so it carries the usual obligations: focus
 * moves in on open and returns to where it came from on close, Escape and the
 * backdrop both dismiss, and focus is kept inside while it is open.
 */
export function PartnerWelcomeDialog({ communityUrl, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [onClose]);

  return (
    <div className="partner-dialog" role="presentation" onClick={onClose}>
      <div
        className="partner-dialog__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="partner-dialog__close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <span className="partner-dialog__tick" aria-hidden="true">
          <Check size={26} />
        </span>

        <h2 id="partner-dialog-title">Thanks for applying.</h2>

        <p className="partner-dialog__lede">
          Hey! Thanks for applying to the Ahumma Creator Partner Network.
        </p>
        <p className="partner-dialog__message">
          We&apos;ve got your application, and our team is reviewing it now.
          You&apos;ll hear back from us within a few days with next steps.
        </p>
        <p className="partner-dialog__message">
          In the meantime, follow us on{" "}
          <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>{" "}
          and{" "}
          <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer">
            TikTok
          </a>{" "}
          to get a feel for the brand.
        </p>

        {communityUrl ? (
          <a
            className="partner-dialog__cta"
            href={communityUrl}
            target="_blank"
            rel="noreferrer"
            data-autofocus
          >
            Join the partner community <ArrowRight size={17} />
          </a>
        ) : null}

        <p className="partner-dialog__signoff">
          Talk soon,
          <br />
          The Ahumma Team
        </p>

        <button
          className="partner-dialog__dismiss"
          type="button"
          onClick={onClose}
          {...(communityUrl ? {} : { "data-autofocus": true })}
        >
          Close
        </button>
      </div>
    </div>
  );
}
