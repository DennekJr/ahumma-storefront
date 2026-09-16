import "server-only";

import { demoProducts, demoProductSummaries } from "@/lib/demo-products";
import type {
  DeliveryZone,
  ProductCollection,
  ProductDetail,
  ProductSummary,
  StoreCheckoutRequest,
} from "@/lib/store-types";
import type { CheckoutSession } from "@/lib/types";

const API_BASE =
  process.env.FRONTDESK_API_BASE_URL ?? "https://api.frontdesk.africa/v1";

function isConfiguredKey(value: string | undefined, prefix: string) {
  return Boolean(value?.startsWith(prefix) && !value.includes("replace_me"));
}

const previewOnly = process.env.FRONTDESK_PREVIEW_ONLY === "true";

/** Live catalogue reads. The publishable key is all the store endpoints need. */
export const hasFrontdeskReads = Boolean(
  !previewOnly &&
  isConfiguredKey(process.env.FRONTDESK_PUBLISHABLE_KEY, "fd_pk_"),
);

/** Opening a checkout. Only the secret key can take payments. */
export const hasFrontdeskCheckout = Boolean(
  hasFrontdeskReads &&
  isConfiguredKey(process.env.FRONTDESK_SECRET_KEY, "fd_sk_"),
);

export class FrontdeskApiError extends Error {
  status: number;
  code?: string;
  requestId?: string;
  details?: unknown;

  constructor(
    message: string,
    status: number,
    options?: { code?: string; requestId?: string; details?: unknown },
  ) {
    super(message);
    this.name = "FrontdeskApiError";
    this.status = status;
    this.code = options?.code;
    this.requestId = options?.requestId;
    this.details = options?.details;
  }
}

function toHttpOrigin(value: string | undefined) {
  if (!value?.trim()) return null;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.origin
      : null;
  } catch {
    return null;
  }
}

function siteOrigin() {
  return (
    toHttpOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:6543"
  );
}

function checkoutReturnUrl(requestOrigin: string) {
  const origin = toHttpOrigin(requestOrigin) ?? siteOrigin();
  return new URL("/checkout/complete", origin).toString();
}

/**
 * fetch rejects with a bare TypeError when the network is unavailable. Wrapping
 * it gives callers something they can branch on instead of an unhandled crash.
 */
async function requestWithNetworkGuard(url: string, init: RequestInit) {
  try {
    return await fetch(url, init);
  } catch (error) {
    throw new FrontdeskApiError("Could not reach FrontDesk.", 503, {
      code: "NETWORK_ERROR",
      details: error,
    });
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const apiError = payload?.error;
    throw new FrontdeskApiError(
      apiError?.message ?? "FrontDesk could not complete this request.",
      response.status,
      {
        code: apiError?.code,
        requestId: apiError?.requestId,
        details: apiError?.details,
      },
    );
  }

  return payload as T;
}

async function publicRequest<T>(path: string): Promise<T> {
  const key = process.env.FRONTDESK_PUBLISHABLE_KEY;
  if (!key) {
    throw new FrontdeskApiError(
      "FrontDesk publishable key is not configured.",
      503,
      {
        code: "NOT_CONFIGURED",
      },
    );
  }

  const response = await requestWithNetworkGuard(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${key}`,
      Origin: siteOrigin(),
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (response.status === 403 && process.env.FRONTDESK_SECRET_KEY) {
    const payload = await response
      .clone()
      .json()
      .catch(() => null);
    if (payload?.error?.code === "ORIGIN_NOT_ALLOWED") {
      // Server-rendered reads can safely use the secret key without exposing it
      // to the browser. This keeps local preview working before its origin is
      // added to the publishable key's allowlist.
      return secretRequest<T>(path);
    }
  }

  return parseResponse<T>(response);
}

async function secretRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const key = process.env.FRONTDESK_SECRET_KEY;
  if (!key) {
    throw new FrontdeskApiError(
      "FrontDesk secret key is not configured.",
      503,
      {
        code: "NOT_CONFIGURED",
      },
    );
  }

  const response = await requestWithNetworkGuard(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  return parseResponse<T>(response);
}

export async function getCheckout(ref: string): Promise<CheckoutSession> {
  return secretRequest<CheckoutSession>(
    `/store/checkouts/${encodeURIComponent(ref)}`,
  );
}

export type Catalogue = {
  products: ProductSummary[];
  /**
   * The catalogue could not be loaded, as distinct from being empty. Callers
   * that render a storefront must tell the two apart: "nothing here" reads to a
   * shopper as sold out, when in fact the shop never heard back from Frontdesk.
   */
  unavailable: boolean;
};

export async function getCatalogue(): Promise<Catalogue> {
  if (!hasFrontdeskReads) {
    return { products: demoProductSummaries, unavailable: false };
  }

  try {
    return {
      products: await publicRequest<ProductSummary[]>("/store/products"),
      unavailable: false,
    };
  } catch (error) {
    // The preview remains usable while a newly issued key is being configured.
    if (error instanceof FrontdeskApiError && error.code === "NOT_CONFIGURED") {
      return { products: demoProductSummaries, unavailable: false };
    }

    // A dropped connection should not take the page down with it. Demo data is
    // not a substitute either — its slugs and prices would be wrong for a live
    // store — so the page renders nothing and says why.
    if (error instanceof FrontdeskApiError && error.code === "NETWORK_ERROR") {
      console.error("FrontDesk unreachable while loading products", error);
      return { products: [], unavailable: true };
    }

    throw error;
  }
}

/** The product list alone, for callers with nothing to show a shopper. */
export async function getProducts(): Promise<ProductSummary[]> {
  return (await getCatalogue()).products;
}

export async function getProduct(slug: string): Promise<ProductDetail | null> {
  if (!hasFrontdeskReads) {
    return demoProducts.find((product) => product.slug === slug) ?? null;
  }

  try {
    return await publicRequest<ProductDetail>(
      `/store/products/${encodeURIComponent(slug)}`,
    );
  } catch (error) {
    if (error instanceof FrontdeskApiError && error.status === 404) return null;
    throw error;
  }
}

/**
 * Merchant-curated groupings, used to lay out the shop page. An empty
 * collection is still returned: the shop shows it as coming soon rather than
 * hiding a group the merchant has deliberately created.
 */
export async function getCollections(): Promise<ProductCollection[]> {
  if (!hasFrontdeskReads) return [];

  try {
    return await publicRequest<ProductCollection[]>("/store/collections");
  } catch {
    // The shop still works without collections — everything falls into one grid.
    return [];
  }
}

export async function getDeliveryZones(): Promise<DeliveryZone[]> {
  if (!hasFrontdeskReads) return [];
  return publicRequest<DeliveryZone[]>("/store/delivery-zones");
}

export async function createStoreCheckout(
  request: StoreCheckoutRequest,
  idempotencyKey: string,
  requestOrigin: string,
): Promise<CheckoutSession> {
  if (!hasFrontdeskCheckout) {
    throw new FrontdeskApiError(
      "Live checkout will be available as soon as the Frontdesk secret key is added.",
      503,
      { code: "NOT_CONFIGURED" },
    );
  }

  return secretRequest<CheckoutSession>("/store/checkouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      items: request.items,
      contact: {
        name: request.contact.name,
        email: request.contact.email,
        ...(request.contact.phone ? { phone: request.contact.phone } : {}),
      },
      returnUrl: checkoutReturnUrl(requestOrigin),
      ...(request.currency ? { currency: request.currency } : {}),
      ...(request.deliveryZoneRef
        ? { deliveryZoneRef: request.deliveryZoneRef }
        : {}),
    }),
  });
}
