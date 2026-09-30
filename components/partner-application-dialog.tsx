"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { PartnerApplicationForm } from "@/components/partner-application-form";

export function PartnerApplicationDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        className="partner-apply"
        type="button"
        onClick={() => dialogRef.current?.showModal()}
      >
        Apply to become a partner
      </button>
      <dialog
        className="partner-application-dialog"
        id="apply"
        ref={dialogRef}
        aria-labelledby="partner-application-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className="partner-application-dialog__content">
          <div className="partner-application-dialog__heading">
            <div>
              <h2 id="partner-application-title">Tell us about your work.</h2>
              <p>
                The Partner Network Manager reviews every application. All new
                partners begin as Founding Partners.
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
