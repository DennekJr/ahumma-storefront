"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { ConsultationForm } from "@/components/consultation-form";
import { CONCERNS } from "@/lib/concerns";

export function ConsultationDialog({
  initialConcerns,
  showConcerns = false,
}: {
  initialConcerns?: string[];
  /** Concern tiles under the button, each opening the form with it ticked. */
  showConcerns?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [concerns, setConcerns] = useState(initialConcerns ?? []);

  function openDialog(next?: string[]) {
    if (next) setConcerns(next);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        className="partner-apply consultation-dialog__trigger"
        type="button"
        onClick={() => openDialog()}
      >
        Start my ritual
      </button>
      {showConcerns ? (
        <nav className="concern-rail consultation-concerns" aria-label="Start with a concern">
          <p>Or start with what your skin needs</p>
          <ul>
            {CONCERNS.map((concern) => (
              <li key={concern.id}>
                <button
                  type="button"
                  className="concern-tile"
                  onClick={() => openDialog(concern.consultationLabels)}
                >
                  <span className="concern-tile__image">
                    <Image
                      src={concern.image}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 38vw, 13vw"
                    />
                    <span className="concern-tile__label">{concern.label}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
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
          {/* The form reads its concerns once, so a different tile remounts it. */}
          <ConsultationForm key={concerns.join("|")} initialConcerns={concerns} />
        </div>
      </dialog>
    </>
  );
}
