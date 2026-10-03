import { GA_MEASUREMENT_ID } from "@/lib/google-analytics";
import type { CheckoutSession } from "@/lib/types";

/**
 * GA4 ecommerce events: view_item, add_to_cart, begin_checkout, purchase.
 *
 * Every call site in the app is one line into this module, so the tracking
 * rules live in one place and the components that trigger them stay readable.
 *
 * Money is sent in major units (₦26,200, not 2,620,000 kobo) in the currency
 * the shopper is actually using. The store sells in naira and dollars, so a
 * dollar checkout is reported in USD — reporting it as NGN would overstate the
 * order roughly a thousandfold. GA4 converts everything to the property's
 * reporting currency itself.
 */

export type GaItem = {
  item_id: string;
  item_name: string;
  item_brand: string;
  item_category: string;
  item_variant?: string;
  price: number;
  quantity: number;
  index?: number;
};

/** The minimum a line needs to become a GA4 item. */
export type TrackableLine = {
  productRef: string;
  name: string;
  variantName?: string;
  priceMinor: number;
  quantity: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const toMajor = (minor: number) => Math.round(minor) / 100;

function categoryOf(name: string) {
  const value = name.toLowerCase();
  if (/\bara\b/.test(value) || value.includes("soap")) return "Liquid African black soap";
  if (value.includes("baby")) return "Baby care";
  return "Body butter";
}

/** Frontdesk names a product's only variant "Default"; that is not a variant. */
function variantOf(name?: string) {
  if (!name) return undefined;
  return ["default", "standard"].includes(name.trim().toLowerCase()) ? undefined : name;
}

export function toGaItem(line: TrackableLine, index?: number): GaItem {
  return {
    item_id: line.productRef,
    item_name: line.name,
    item_brand: "Ahumma",
    item_category: categoryOf(line.name),
    ...(variantOf(line.variantName) ? { item_variant: variantOf(line.variantName) } : {}),
    price: toMajor(line.priceMinor),
    quantity: line.quantity,
    ...(index !== undefined ? { index } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* Delivery                                                            */
/* ------------------------------------------------------------------ */

/**
 * Hands events to gtag once it exists.
 *
 * The GA4 snippet loads after hydration, and a component's effect can run
 * before it — a product page fires view_item on mount. Calling gtag before the
 * snippet defines it would throw, and pushing a plain array onto dataLayer
 * would be ignored (gtag commands must be `arguments` objects). So events wait
 * here and are flushed through the real gtag. If GA never loads — an ad
 * blocker, most often — the queue is dropped after 15s rather than growing.
 */
const pending: unknown[][] = [];
let flushTimer: number | undefined;

function send(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }

  pending.push(args);
  if (flushTimer !== undefined) return;

  const startedAt = Date.now();
  flushTimer = window.setInterval(() => {
    const gtag = window.gtag;
    if (typeof gtag === "function") {
      pending.splice(0).forEach((queued) => gtag(...queued));
    } else if (Date.now() - startedAt < 15_000) {
      return;
    } else {
      pending.length = 0;
    }
    window.clearInterval(flushTimer);
    flushTimer = undefined;
  }, 200);
}

/**
 * DebugView switch. Visiting any page with ?ga_debug=1 marks every ecommerce
 * event for the rest of that tab's session, through the hosted payment page
 * and back, so the whole funnel can be watched in GA4 → Admin → DebugView on
 * the live site, from any device. ?ga_debug=0 turns it off.
 */
const DEBUG_KEY = "ahumma-ga4-debug";

function debugEnabled() {
  try {
    const flag = new URLSearchParams(window.location.search).get("ga_debug");
    if (flag === "1") window.sessionStorage.setItem(DEBUG_KEY, "1");
    if (flag === "0") window.sessionStorage.removeItem(DEBUG_KEY);
    return window.sessionStorage.getItem(DEBUG_KEY) === "1";
  } catch {
    return false;
  }
}

function event(name: string, params: Record<string, unknown>, forceDebug = false) {
  send("event", name, {
    send_to: GA_MEASUREMENT_ID,
    ...params,
    // GA4 treats the presence of debug_mode as "on", so it is only ever sent as true.
    ...(forceDebug || debugEnabled() ? { debug_mode: true } : {}),
  });
}

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

export function trackViewItem(line: Omit<TrackableLine, "quantity">, currency: string) {
  event("view_item", {
    currency,
    value: toMajor(line.priceMinor),
    items: [toGaItem({ ...line, quantity: 1 })],
  });
}

/** `line.quantity` is how many were just added, not the line's new total. */
export function trackAddToCart(line: TrackableLine, currency: string) {
  event("add_to_cart", {
    currency,
    value: toMajor(line.priceMinor * line.quantity),
    items: [toGaItem(line)],
  });
}

/** value is the item subtotal; GA4 specifies shipping and tax stay out of it. */
export function trackBeginCheckout(lines: TrackableLine[], currency: string) {
  event("begin_checkout", {
    currency,
    value: toMajor(lines.reduce((sum, line) => sum + line.priceMinor * line.quantity, 0)),
    items: lines.map((line, index) => toGaItem(line, index)),
  });
}

/* ------------------------------------------------------------------ */
/* Purchase                                                            */
/* ------------------------------------------------------------------ */

/**
 * What the shopper was buying, saved against the checkout reference the
 * moment Frontdesk opens the checkout.
 *
 * Frontdesk's checkout lookup returns a status and an order reference but no
 * line items or totals, so the confirmation page cannot learn what was bought
 * from it. The cart is gone by then too — the buyer left for the hosted
 * payment page. This snapshot is what the purchase event is built from, and
 * it is only ever used once the checkout has been verified as paid.
 *
 * localStorage rather than sessionStorage: a buyer who pays by bank transfer
 * and returns later from an email link opens a new tab.
 */
type CheckoutSnapshot = {
  currency: string;
  lines: TrackableLine[];
  shippingMinor: number;
  savedAt: number;
};

const SNAPSHOT_PREFIX = "ahumma-ga4-checkout:";
const SNAPSHOT_TTL = 14 * 24 * 60 * 60 * 1000;
const PURCHASED_KEY = "ahumma-ga4-purchased";

export function rememberCheckout(
  checkoutRef: string,
  snapshot: Omit<CheckoutSnapshot, "savedAt">,
) {
  try {
    // Abandoned checkouts leave snapshots behind; clear out the stale ones.
    for (let i = window.localStorage.length - 1; i >= 0; i -= 1) {
      const key = window.localStorage.key(i);
      if (!key?.startsWith(SNAPSHOT_PREFIX)) continue;
      const saved = JSON.parse(window.localStorage.getItem(key) ?? "null") as CheckoutSnapshot | null;
      if (!saved || Date.now() - saved.savedAt > SNAPSHOT_TTL) window.localStorage.removeItem(key);
    }
    window.localStorage.setItem(
      SNAPSHOT_PREFIX + checkoutRef,
      JSON.stringify({ ...snapshot, savedAt: Date.now() }),
    );
  } catch {
    // Storage full or blocked: the purchase simply cannot be attributed.
  }
}

function alreadyTracked(transactionId: string) {
  try {
    const ids = JSON.parse(window.localStorage.getItem(PURCHASED_KEY) ?? "[]") as string[];
    return ids.includes(transactionId);
  } catch {
    return false;
  }
}

function markTracked(transactionId: string) {
  try {
    const ids = JSON.parse(window.localStorage.getItem(PURCHASED_KEY) ?? "[]") as string[];
    window.localStorage.setItem(PURCHASED_KEY, JSON.stringify([...ids, transactionId].slice(-50)));
  } catch {
    // Without storage a refresh could resend; GA4 also de-duplicates by transaction_id.
  }
}

export type PurchaseOutcome = "sent" | "duplicate" | "no-snapshot";

/**
 * Sends purchase for a checkout that has been VERIFIED as paid.
 *
 * Callers must only pass a session that came back from the server's own
 * lookup with the secret key — never the ?checkout= on the return URL, which
 * Frontdesk's docs are explicit is not proof of payment. Fires at most once
 * per order: a refresh of the confirmation page sends nothing.
 */
export function trackPurchase(session: CheckoutSession, checkoutRef: string): PurchaseOutcome {
  const transactionId = session.orderRef || checkoutRef;
  if (alreadyTracked(transactionId)) return "duplicate";

  let snapshot: CheckoutSnapshot | null = null;
  try {
    snapshot = JSON.parse(
      window.localStorage.getItem(SNAPSHOT_PREFIX + checkoutRef) ?? "null",
    ) as CheckoutSnapshot | null;
  } catch {
    snapshot = null;
  }

  // Paid on another device or browser: the order is real, but there is no
  // record here of what was in it. Sending purchase without items or value
  // would add a zero-revenue order to the reports, so nothing is sent.
  if (!snapshot) return "no-snapshot";

  event(
    "purchase",
    {
      transaction_id: transactionId,
      // The verified session's currency is what was actually charged.
      currency: session.currency || snapshot.currency,
      value: toMajor(snapshot.lines.reduce((sum, line) => sum + line.priceMinor * line.quantity, 0)),
      shipping: toMajor(snapshot.shippingMinor),
      items: snapshot.lines.map((line, index) => toGaItem(line, index)),
    },
    // A sandbox checkout (fd_sk_test_ key) never touches real revenue reports.
    session.mode === "test",
  );

  markTracked(transactionId);
  try {
    window.localStorage.removeItem(SNAPSHOT_PREFIX + checkoutRef);
  } catch {
    // Expires with the TTL sweep instead.
  }
  return "sent";
}
