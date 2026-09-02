import { NextRequest, NextResponse } from "next/server";
import { createStoreCheckout, FrontdeskApiError } from "@/lib/frontdesk";
import type { StoreCheckoutRequest } from "@/lib/store-types";

function validateCheckout(body: unknown): body is StoreCheckoutRequest {
  if (!body || typeof body !== "object") return false;
  const value = body as Partial<StoreCheckoutRequest>;
  if (!Array.isArray(value.items) || value.items.length === 0) return false;
  if (!value.contact?.name || !value.contact?.email) return false;
  return value.items.every(
    (item) =>
      item &&
      typeof item.variantRef === "string" &&
      item.variantRef.length <= 160 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      item.quantity <= 25,
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!validateCheckout(body)) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "Add at least one valid item and enter your name and email." } },
      { status: 400 },
    );
  }

  const suppliedKey = request.headers.get("Idempotency-Key");
  const idempotencyKey = suppliedKey && suppliedKey.length >= 8 && suppliedKey.length <= 200
    ? suppliedKey
    : crypto.randomUUID();

  try {
    const checkout = await createStoreCheckout(
      body,
      idempotencyKey,
      request.nextUrl.origin,
    );
    return NextResponse.json(checkout, { status: 201 });
  } catch (error) {
    if (error instanceof FrontdeskApiError) {
      return NextResponse.json(
        {
          error: {
            code: error.code ?? "FRONTDESK_ERROR",
            message: error.message,
            requestId: error.requestId,
            details: error.details,
          },
        },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { error: { code: "INTERNAL", message: "Checkout could not be started. Please try again." } },
      { status: 500 },
    );
  }
}
