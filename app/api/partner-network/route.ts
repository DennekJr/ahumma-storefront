import { NextResponse } from "next/server";
import {
  CATEGORY_IDS,
  CONDUCT_AGREED_VALUE,
  DISCLOSURE_AGREED_VALUE,
  PARTNER_FIELDS,
  PARTNER_FORM_SLUG,
} from "@/lib/partner-network";

/**
 * Partner Network applications.
 *
 * The keyed Store API has no form-submit endpoint — it reads form schemas but
 * cannot write to them — so this posts to the public storefront submit route,
 * the same one the hosted form page uses. Server-side keeps it consistent with
 * every other FrontDesk call in this app and avoids the browser needing a
 * registered origin.
 */
const SUBMIT_URL = `https://api.frontdesk.africa/v1/storefront/by-handle/ahumma/forms/${PARTNER_FORM_SLUG}/submit`;

type Body = Record<string, unknown>;

function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new ApplicationError(`${field} is required`);
  }

  return value.trim();
}

class ApplicationError extends Error {}

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
  const body = (await request.json().catch(() => null)) as Body | null;

  if (!body) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  // Bots fill hidden fields; humans never see this one.
  if (typeof body.honeypot === "string" && body.honeypot.trim()) {
    return NextResponse.json({ submitted: true });
  }

  try {
    const fullName = requiredString(body.fullName, "Your name");
    const email = requiredString(body.email, "Email");
    const phone = requiredString(body.phone, "Phone number");
    const primaryPlatform = requiredString(
      body.primaryPlatform,
      "Primary platform, handle and follower count",
    );
    const platformLinks = requiredString(
      body.platformLinks,
      "Links to your top 2 platforms",
    );
    const contentLinks = requiredString(
      body.contentLinks,
      "Links to 2 pieces of content",
    );
    const motivation = requiredString(
      body.motivation,
      "Why you want to join",
    );
    const monthlyCommitment = requiredString(
      body.monthlyCommitment,
      "Your monthly content commitment",
    );

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      throw new ApplicationError("Enter a valid email address");
    }

    const categories = Array.isArray(body.categories)
      ? body.categories.filter(
          (id): id is string =>
            typeof id === "string" && CATEGORY_IDS.includes(id),
        )
      : [];

    if (!categories.length) {
      throw new ApplicationError("Choose at least one content category");
    }

    if (body.disclosureAgreement !== true) {
      throw new ApplicationError(
        "You must agree to disclose gifted and paid partnerships",
      );
    }

    if (body.codeOfConduct !== true) {
      throw new ApplicationError(
        "You must agree to the Partner Code of Conduct",
      );
    }

    // FrontDesk types this field as a number, so anything but digits is
    // rejected upstream. Strip formatting rather than fail the applicant.
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phoneDigits) {
      throw new ApplicationError("Enter a valid phone number");
    }

    const otherBrands =
      body.otherBrands === "yes" || body.otherBrands === "no"
        ? body.otherBrands
        : null;

    const answers: Record<string, unknown> = {
      [PARTNER_FIELDS.fullName]: fullName,
      [PARTNER_FIELDS.email]: email,
      [PARTNER_FIELDS.phone]: phoneDigits,
      [PARTNER_FIELDS.categories]: categories,
      [PARTNER_FIELDS.primaryPlatform]: primaryPlatform,
      [PARTNER_FIELDS.platformLinks]: platformLinks,
      [PARTNER_FIELDS.contentLinks]: contentLinks,
      [PARTNER_FIELDS.motivation]: motivation,
      [PARTNER_FIELDS.monthlyCommitment]: monthlyCommitment,
      [PARTNER_FIELDS.disclosureAgreement]: DISCLOSURE_AGREED_VALUE,
      [PARTNER_FIELDS.codeOfConduct]: CONDUCT_AGREED_VALUE,
      ...(otherBrands ? { [PARTNER_FIELDS.otherBrands]: otherBrands } : {}),
    };

    const response = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: siteOrigin(),
      },
      body: JSON.stringify({
        answers,
        honeypot: "",
        ...(typeof body.elapsedMs === "number" && Number.isFinite(body.elapsedMs)
          ? { elapsedMs: Math.max(0, Math.round(body.elapsedMs)) }
          : {}),
        _amb: null,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    const result = (await response.json().catch(() => null)) as {
      status?: boolean;
      message?: string;
      data?: { thankYouMessage?: string | null } | null;
    } | null;

    if (!response.ok || result?.status === false) {
      return NextResponse.json(
        {
          message:
            result?.message ?? "FrontDesk could not record your application",
        },
        { status: response.ok ? 502 : response.status },
      );
    }

    return NextResponse.json({
      submitted: true,
      thankYouMessage: result?.data?.thankYouMessage ?? null,
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "We couldn't send your application. Please try again." },
      { status: 502 },
    );
  }
}
