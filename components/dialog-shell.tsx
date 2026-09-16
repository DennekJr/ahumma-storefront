"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type Props = {
  /** Id of the element naming the dialog, usually its heading. */
  labelledBy: string;
  onClose: () => void;
  /** Extra class on the panel, for dialogs that need their own shape. */
  panelClassName?: string;
  children: React.ReactNode;
};

/**
 * The shared shell behind every dialog on the site.
 *
 * A dialog takes the page over, so it carries the usual obligations: focus
 * moves in on open and returns to where it came from on close, Escape and the
 * backdrop both dismiss, and focus is kept inside while it is open. That logic
 * lives here once — duplicated per dialog it drifts, and a focus trap that has
 * drifted is invisible until someone navigating by keyboard is stuck in it.
 *
 * Children own the content; whichever element carries `data-autofocus` receives
 * focus on open.
 */
export function DialogShell({
  labelledBy,
  onClose,
  panelClassName,
  children,
}: Props) {
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
        className={`partner-dialog__panel${panelClassName ? ` ${panelClassName}` : ""}`}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
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
        {children}
      </div>
    </div>
  );
}
