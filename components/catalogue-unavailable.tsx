import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

type Props = {
  /** `compact` sits inside a section that already has a heading. */
  variant?: "full" | "compact";
};

/**
 * Shown when the catalogue could not be loaded.
 *
 * The wording matters: a shopper who sees an empty shop concludes the products
 * are sold out or discontinued. This says the fault is ours and temporary, and
 * gives somewhere to go that does not depend on Frontdesk being reachable.
 */
export function CatalogueUnavailable({ variant = "full" }: Props) {
  return (
    <div
      className={`catalogue-unavailable${variant === "compact" ? " catalogue-unavailable--compact" : ""}`}
      role="status"
    >
      <span className="catalogue-unavailable__icon" aria-hidden="true">
        <RefreshCw size={variant === "compact" ? 16 : 20} />
      </span>
      <div>
        <span className="eyebrow">Momentarily out of reach</span>
        <p className="catalogue-unavailable__lede">
          We can&apos;t load the collection right now — that&apos;s on our side,
          not yours. Nothing has sold out.
        </p>
        <div className="catalogue-unavailable__actions">
          <a href="/shop">
            Try again <RefreshCw size={14} />
          </a>
          <Link href="/faq">
            Read the FAQs <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
