"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { FileText } from "lucide-react";
import { DialogShell } from "@/components/dialog-shell";
import {
  SLA_BRAND_COMMITMENTS,
  SLA_ESCALATION,
  SLA_PARTNER_COMMITMENTS,
  SLA_PURPOSE,
  SLA_REVIEW,
  SLA_TURNAROUND,
} from "@/lib/partner-network";

type Props = {
  onClose: () => void;
};

/**
 * The full Service Level Agreement, opened from the consent checkbox.
 *
 * The agreement is also laid out as a section further up the page, but someone
 * who has scrolled to the form and is being asked to accept it should not have
 * to go hunting for what they are accepting. Both renderings read the same
 * constants, so there is no second copy of the terms to fall out of date.
 */
export function PartnerSlaDialog({ onClose }: Props) {
  return (
    <DialogShell
      labelledBy="sla-dialog-title"
      onClose={onClose}
      panelClassName="partner-dialog__panel--sla"
    >
      <div className="sla-doc">
        <span className="eyebrow">Service level agreement</span>
        <h2 id="sla-dialog-title">What we owe each other.</h2>
        <p className="sla-doc__purpose">{SLA_PURPOSE}</p>

        <h3>1. Ahumma&apos;s commitments to partners</h3>
        <dl>
          {SLA_BRAND_COMMITMENTS.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>

        <h3>2. Your commitments to Ahumma</h3>
        <dl>
          {SLA_PARTNER_COMMITMENTS.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>

        <h3>3. Response &amp; turnaround summary</h3>
        <table className="sla-doc__table">
          <tbody>
            {SLA_TURNAROUND.map((row) => (
              <tr key={row.service}>
                <th scope="row">{row.service}</th>
                <td>{row.commitment}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>4. Escalation process</h3>
        <ol className="sla-doc__steps">
          {SLA_ESCALATION.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <h3>5. Review &amp; amendments</h3>
        <p className="sla-doc__review">{SLA_REVIEW}</p>
      </div>

      <button
        className="partner-dialog__dismiss"
        type="button"
        onClick={onClose}
        data-autofocus
      >
        Close
      </button>
    </DialogShell>
  );
}

/**
 * The page shows the turnaround table and escalation steps; the commitments in
 * full open from here, in the same dialog the application form uses.
 */
export function PartnerSlaOpener() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="partner-sla-read"
        type="button"
        onClick={() => setOpen(true)}
      >
        <FileText size={15} aria-hidden="true" /> Read the full agreement
      </button>
      {/* Portalled: inside its section the overlay shared that section's
          stacking context and sat under the floating Apply button. */}
      {open
        ? createPortal(
            <PartnerSlaDialog onClose={() => setOpen(false)} />,
            document.body,
          )
        : null}
    </>
  );
}
