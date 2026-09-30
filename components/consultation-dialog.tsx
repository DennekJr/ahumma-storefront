"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { ConsultationForm } from "@/components/consultation-form";

export function ConsultationDialog({
  initialConcerns,
}: {
  initialConcerns?: string[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        className="partner-apply consultation-dialog__trigger"
        type="button"
        onClick={() => dialogRef.current?.showModal()}
      >
        Start my ritual
      </button>
      <dialog
        className="partner-application-dialog consultation-dialog"
        ref={dialogRef}
        aria-labelledby="consultation-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className="partner-application-dialog__content">
          <div className="partner-application-dialog__heading">
            <div>
              <h2 id="consultation-dialog-title">A little about you.</h2>
              <p>Share what feels useful. There are no wrong answers.</p>
            </div>
            <button
              className="partner-application-dialog__close"
              type="button"
              onClick={closeDialog}
              aria-label="Close consultation form"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <ConsultationForm initialConcerns={initialConcerns} />
        </div>
      </dialog>
    </>
  );
}
