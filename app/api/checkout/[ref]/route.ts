import { NextResponse } from "next/server";
import { FrontdeskApiError, getCheckout } from "@/lib/frontdesk";

type RouteContext = { params: Promise<{ ref: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { ref } = await params;
  if (!ref || ref.length > 160) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "Invalid checkout reference." } },
      { status: 400 },
    );
  }

  try {
    const checkout = await getCheckout(ref);
    return NextResponse.json(checkout);
  } catch (error) {
    if (error instanceof FrontdeskApiError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message, requestId: error.requestId } },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { error: { code: "INTERNAL", message: "Could not verify this checkout." } },
      { status: 500 },
    );
  }
}
