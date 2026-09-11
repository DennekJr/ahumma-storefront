"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Clock3,
  RefreshCw,
} from "lucide-react";
import type { CheckoutSession } from "@/lib/types";

type ViewState = "checking" | "open" | "paid" | "failed";

function viewState(session: CheckoutSession): ViewState {
  if (["completed", "paid", "successful", "success"].includes(session.status)) return "paid";
  if (["expired", "cancelled", "canceled", "failed"].includes(session.status)) return "failed";
  return "open";
}

export function CheckoutStatus({ checkoutRef }: { checkoutRef?: string }) {
  const [state, setState] = useState<ViewState>(checkoutRef ? "checking" : "failed");
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [message, setMessage] = useState(
    checkoutRef ? "We’re confirming your payment with FrontDesk." : "No checkout reference was included in this link.",
  );
  const pollCount = useRef(0);

  const check = useCallback(async () => {
    if (!checkoutRef) return;
    try {
      const response = await fetch(`/api/checkout/${encodeURIComponent(checkoutRef)}`, {
        cache: "no-store",
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error?.message ?? "We could not verify this payment.");
      const nextSession = payload as CheckoutSession;
      const next = viewState(nextSession);
      setSession(nextSession);
      setState(next);

      if (next === "paid") {
        setMessage("Your order is confirmed. A receipt and the next steps are on their way to your email.");
      } else if (next === "failed") {
        setMessage("This checkout has expired or was cancelled. No payment was confirmed.");
      } else {
        setMessage("The payment is still processing. You can keep this page open while we check again.");
      }
    } catch (error) {
      setState("failed");
      setMessage(error instanceof Error ? error.message : "We could not verify this payment.");
    }
  }, [checkoutRef]);

  useEffect(() => {
    void check();
  }, [check]);

  useEffect(() => {
    if (state !== "open" || pollCount.current >= 20) return;
    const timer = window.setTimeout(() => {
      pollCount.current += 1;
      void check();
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [check, state, session]);

  const title = state === "paid"
    ? "Thank you."
    : state === "failed"
      ? "Let’s check that."
      : state === "open"
        ? "Still working."
        : "One moment.";

  return (
    <div className="status-card" aria-live="polite">
      <div className={`status-icon ${state === "failed" ? "error" : state === "paid" ? "" : "pending"}`}>
        {state === "paid" ? <Check size={34} /> : state === "failed" ? <CircleAlert size={31} /> : state === "open" ? <Clock3 size={30} /> : <span className="spinner" />}
      </div>
      <h1>{title}</h1>
      <p>{message}</p>
      {(session?.orderRef || checkoutRef) && (
        <div className="status-reference">
          {session?.orderRef ? `Order ${session.orderRef}` : `Checkout ${checkoutRef}`}
        </div>
      )}
      <div className="status-actions">
        {(state === "failed" || state === "open") && checkoutRef ? (
          <button type="button" onClick={() => { setState("checking"); void check(); }}>
            <RefreshCw size={15} /> Check again
          </button>
        ) : null}
        <Link href="/shop" className="filled">Continue shopping <ArrowRight size={15} /></Link>
      </div>
    </div>
  );
}
