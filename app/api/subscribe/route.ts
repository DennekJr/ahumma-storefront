import { NextResponse } from "next/server";

/**
 * Ahumma Circle sign-ups.
 *
 * The keyed Store API has no subscribe endpoint, so this posts to the public
 * storefront one — the same route the hosted storefront uses. Server-side keeps
 * it consistent with the rest of the app and means the browser never needs a
 * registered origin.
 */
function storefrontId() {
  return (
    process.env.FRONTDESK_STOREFRONT_ID?.trim() ||
    "019fce07-c7bd-766d-9b67-8dab0bbcfc3e"
  );
}

function siteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // Fall through when deployment configuration is malformed.
    }
  }

  return "http://localhost:6543";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    name?: unknown;
    honeypot?: unknown;
  } | null;

  if (!body) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  // Bots fill hidden fields; humans never see this one.
  if (typeof body.honeypot === "string" && body.honeypot.trim()) {
    return NextResponse.json({ subscribed: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://api.frontdesk.africa/v1/storefront/${encodeURIComponent(storefrontId())}/subscribe`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: siteOrigin(),
        },
        body: JSON.stringify({ email, ...(name ? { name } : {}) }),
        signal: AbortSignal.timeout(12_000),
      },
    );
    const result = (await response.json().catch(() => null)) as {
      status?: boolean;
      message?: string;
    } | null;

    if (!response.ok || result?.status === false) {
      return NextResponse.json(
        { message: result?.message ?? "We couldn't add you just now." },
        { status: response.ok ? 502 : response.status },
      );
    }

    return NextResponse.json({ subscribed: true });
  } catch {
    return NextResponse.json(
      { message: "We couldn't reach our list just now. Please try again." },
      { status: 503 },
    );
  }
}
