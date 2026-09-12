"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Check, X } from "lucide-react";

type Props = {
  message: string;
  communityUrl: string | null;
  onClose: () => void;
};

/**
 * Shown once an application is accepted, to hand the new partner the community
 * invite while they are still on the page.
 *
 * A dialog takes the page over, so it carries the usual obligations: focus
 * moves in on open and returns to where it came from on close, Escape and the
 * backdrop both dismiss, and focus is kept inside while it is open.
 */
export function PartnerWelcomeDialog({ message, communityUrl, onClose }: Props) {
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

        <h2 id="partner-dialog-title">You&apos;re in.</h2>
        <p className="partner-dialog__message">{message}</p>

        {communityUrl ? (
          <>
            <p className="partner-dialog__lede">
              One last step. The partner community is where briefs, prompts and
              monthly sessions live — join it now so you don&apos;t miss the
              welcome.
            </p>
            <a
              className="partner-dialog__cta"
              href={communityUrl}
              target="_blank"
              rel="noreferrer"
              data-autofocus
            >
              Join the partner community <ArrowRight size={17} />
            </a>
            <button
              className="partner-dialog__dismiss"
              type="button"
              onClick={onClose}
            >
              I&apos;ll join later
            </button>
          </>
        ) : (
          <>
            <p className="partner-dialog__lede">
              The Partner Network Manager will be in touch with your community
              invite and next steps.
            </p>
            <button
              className="partner-dialog__cta"
              type="button"
              onClick={onClose}
              data-autofocus
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
