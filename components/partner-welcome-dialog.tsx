"use client";

import { ArrowRight, Check, Send } from "lucide-react";
import { DialogShell } from "@/components/dialog-shell";
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
 * DialogShell supplies the focus trap, Escape and backdrop dismissal.
 */
export function PartnerWelcomeDialog({ communityUrl, onClose }: Props) {
  return (
    <DialogShell labelledBy="partner-dialog-title" onClose={onClose}>
      <span className="partner-dialog__tick" aria-hidden="true">
        <Check size={26} />
      </span>

      <h2 id="partner-dialog-title">Thanks for applying.</h2>

      <p className="partner-dialog__lede">
        We&apos;ve got your application and the team is reviewing it now —
        you&apos;ll hear back within a few days with next steps.
      </p>

      {communityUrl ? (
        <>
          <p className="partner-dialog__message">
            In the meantime, follow us on{" "}
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>{" "}
            and{" "}
            <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer">
              TikTok
            </a>
            . The partner community itself lives on <strong>Telegram</strong>,
            where briefs, prompts and monthly sessions happen.
          </p>
          <a
            className="partner-dialog__cta"
            href={communityUrl}
            target="_blank"
            rel="noreferrer"
            data-autofocus
          >
            <Send size={15} /> Join the community on Telegram
            <ArrowRight size={17} />
          </a>
        </>
      ) : (
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
      )}

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
    </DialogShell>
  );
}
