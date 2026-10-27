"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { PartnerApplicationForm } from "@/components/partner-application-form";

export function PartnerApplicationDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // True while an inner dialog (the SLA, the welcome note) owns Escape.
  const innerDialogOwnsEscape = useRef(false);
  const [scrolledPastTrigger, setScrolledPastTrigger] = useState(false);

  // The hero button is the only way in, so once it scrolls out of view a
  // copy follows the reader down the page.
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(([entry]) => {
      setScrolledPastTrigger(
        !entry.isIntersecting && entry.boundingClientRect.top < 0,
      );
    });
    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        ref={triggerRef}
        className="partner-apply"
        type="button"
        onClick={openDialog}
      >
        Apply to become a partner
      </button>
      <button
        className="partner-apply-float"
        type="button"
        onClick={openDialog}
        data-visible={scrolledPastTrigger}
        aria-hidden={!scrolledPastTrigger}
        tabIndex={scrolledPastTrigger ? 0 : -1}
      >
        Apply now <ArrowRight size={16} aria-hidden="true" />
      </button>
      <dialog
        className="partner-application-dialog"
        id="apply"
        ref={dialogRef}
        aria-labelledby="partner-application-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        // The SLA and welcome dialogs render inside this one and close on
        // Escape themselves. Without this, the same key press would also
        // close the application and lose what was typed.
        onKeyDownCapture={(event) => {
          innerDialogOwnsEscape.current =
            event.key === "Escape" &&
            Boolean(dialogRef.current?.querySelector(".partner-dialog"));
        }}
        onCancel={(event) => {
          if (innerDialogOwnsEscape.current) event.preventDefault();
          innerDialogOwnsEscape.current = false;
        }}
      >
        <div className="partner-application-dialog__content">
          <div className="partner-application-dialog__heading">
            <div>
              <h2 id="partner-application-title">Tell us about your work.</h2>
              <p>
                <span>
                  The Partner Network Manager reviews every application.
                </span>
                <span>All new partners begin as Founding Partners.</span>
              </p>
            </div>
            <button
              className="partner-application-dialog__close"
              type="button"
              onClick={closeDialog}
              aria-label="Close application form"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <PartnerApplicationForm />
        </div>
      </dialog>
    </>
  );
}
