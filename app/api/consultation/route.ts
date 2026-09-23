import { NextResponse } from "next/server";
import { SKIN_CONCERNS } from "@/lib/consultation";

type ConsultationBody = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  concerns?: unknown;
  routine?: unknown;
  products?: unknown;
  texture?: unknown;
  fragrance?: unknown;
  goal?: unknown;
  region?: unknown;
  referral?: unknown;
  marketingConsent?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function siteOrigin() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:6543")
      .origin;
  } catch {
    return "http://localhost:6543";
  }
}

export async function POST(request: Request) {
  const body = (await request
    .json()
    .catch(() => null)) as ConsultationBody | null;
  if (!body)
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });

  const firstName = text(body.firstName);
  const lastName = text(body.lastName);
  const email = text(body.email);
  const concerns = Array.isArray(body.concerns)
    ? body.concerns.filter(
        (concern): concern is string =>
          typeof concern === "string" &&
          SKIN_CONCERNS.some((option) => option === concern),
      )
    : [];

  if (!firstName || !lastName || !email || !concerns.length) {
    return NextResponse.json(
      { message: "Add your name, email and at least one care concern." },
      { status: 400 },
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const destination = process.env.FRONTDESK_CONSULTATION_FORM_URL?.trim();
  if (!destination) {
    return NextResponse.json(
      { message: "Consultation delivery is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(destination, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: siteOrigin(),
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        concerns,
        routine: text(body.routine),
        products: text(body.products),
        texture: text(body.texture),
        fragrance: text(body.fragrance),
        goal: text(body.goal),
        region: text(body.region),
        referral: text(body.referral),
        marketingConsent: body.marketingConsent === true,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "We couldn't send your consultation. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ submitted: true });
  } catch {
    return NextResponse.json(
      {
        message:
          "We couldn't reach the consultation service. Please try again.",
      },
      { status: 502 },
    );
  }
}
