import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_TIMESTAMP_AGE_SECONDS = 5 * 60;
const MAX_BODY_BYTES = 256 * 1024;

const KNOWN_EVENTS = new Set([
  "ping",
  "checkout.completed",
  "checkout.expired",
  "order.updated",
  "form.submitted",
  "customer.linked",
  "product.deleted",
  "order.deleted",
]);

type FrontdeskWebhookPayload = {
  id?: unknown;
  type?: unknown;
  data?: unknown;
};

function signaturesMatch(
  rawBody: string,
  timestamp: string,
  providedSignature: string,
  secret: string,
) {
  const expectedSignature = `sha256=${createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex")}`;
  const expected = Buffer.from(expectedSignature, "utf8");
  const provided = Buffer.from(providedSignature.trim(), "utf8");

  return expected.length === provided.length && timingSafeEqual(expected, provided);
}

function errorResponse(status: number, code: string, message: string) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function POST(request: Request) {
  const secret = process.env.FRONTDESK_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return errorResponse(
      503,
      "WEBHOOK_NOT_CONFIGURED",
      "Frontdesk webhook verification is not configured.",
    );
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return errorResponse(413, "PAYLOAD_TOO_LARGE", "Webhook payload is too large.");
  }

  const signature = request.headers.get("x-fd-signature");
  const timestamp = request.headers.get("x-fd-timestamp");
  const webhookId = request.headers.get("x-fd-webhook-id");

  if (!signature || !timestamp || !webhookId) {
    return errorResponse(
      400,
      "MISSING_WEBHOOK_HEADERS",
      "Required Frontdesk webhook headers are missing.",
    );
  }

  const timestampSeconds = Number(timestamp);
  if (
    !Number.isInteger(timestampSeconds) ||
    Math.abs(Math.floor(Date.now() / 1000) - timestampSeconds) >
      MAX_TIMESTAMP_AGE_SECONDS
  ) {
    return errorResponse(401, "STALE_WEBHOOK", "Webhook timestamp is invalid or stale.");
  }

  const rawBody = await request.text();
  if (!signaturesMatch(rawBody, timestamp, signature, secret)) {
    return errorResponse(401, "INVALID_SIGNATURE", "Webhook signature is invalid.");
  }

  let payload: FrontdeskWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as FrontdeskWebhookPayload;
  } catch {
    return errorResponse(400, "INVALID_JSON", "Webhook body must be valid JSON.");
  }

  if (
    typeof payload.id !== "string" ||
    typeof payload.type !== "string" ||
    payload.id !== webhookId
  ) {
    return errorResponse(
      400,
      "INVALID_EVENT",
      "Webhook id and event type must match the signed delivery.",
    );
  }

  // This receiver deliberately performs no fulfilment side effects. Frontdesk
  // remains the source of truth, so duplicate retries are safe to acknowledge.
  console.info("Frontdesk webhook received", {
    id: payload.id,
    type: payload.type,
    known: KNOWN_EVENTS.has(payload.type),
  });

  return NextResponse.json({ received: true });
}
