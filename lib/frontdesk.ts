import "server-only";

import { demoProducts, demoProductSummaries } from "@/lib/demo-products";
import type {
  DeliveryZone,
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

export const hasFrontdeskKeys = Boolean(
  process.env.FRONTDESK_PREVIEW_ONLY !== "true" &&
  isConfiguredKey(process.env.FRONTDESK_PUBLISHABLE_KEY, "fd_pk_") &&
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
    throw new FrontdeskApiError("FrontDesk publishable key is not configured.", 503, {
      code: "NOT_CONFIGURED",
    });
  }

  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${key}`,
      Origin: siteOrigin(),
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (response.status === 403 && process.env.FRONTDESK_SECRET_KEY) {
    const payload = await response.clone().json().catch(() => null);
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
    throw new FrontdeskApiError("FrontDesk secret key is not configured.", 503, {
      code: "NOT_CONFIGURED",
    });
  }

  const response = await fetch(`${API_BASE}${path}`, {
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

export async function getProducts(): Promise<ProductSummary[]> {
  if (!hasFrontdeskKeys) return demoProductSummaries;

  try {
    return await publicRequest<ProductSummary[]>("/store/products");
  } catch (error) {
    // The preview remains usable while a newly issued key is being configured.
    if (error instanceof FrontdeskApiError && error.code === "NOT_CONFIGURED") {
      return demoProductSummaries;
    }
    throw error;
  }
}

export async function getProduct(slug: string): Promise<ProductDetail | null> {
  if (!hasFrontdeskKeys) {
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

export async function getDeliveryZones(): Promise<DeliveryZone[]> {
  if (!hasFrontdeskKeys) return [];
  return publicRequest<DeliveryZone[]>("/store/delivery-zones");
}

export async function createStoreCheckout(
  request: StoreCheckoutRequest,
  idempotencyKey: string,
  requestOrigin: string,
): Promise<CheckoutSession> {
  if (!hasFrontdeskKeys) {
    throw new FrontdeskApiError(
      "Live checkout will be available as soon as the Frontdesk API keys are added.",
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
