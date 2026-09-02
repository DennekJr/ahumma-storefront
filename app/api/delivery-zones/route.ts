import { NextResponse } from "next/server";
import { FrontdeskApiError, getDeliveryZones } from "@/lib/frontdesk";

export async function GET() {
  try {
    return NextResponse.json(await getDeliveryZones());
  } catch (error) {
    if (error instanceof FrontdeskApiError) {
      return NextResponse.json(
        {
          error: {
            code: error.code ?? "FRONTDESK_ERROR",
            message: error.message,
            requestId: error.requestId,
          },
        },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { error: { code: "INTERNAL", message: "Delivery options could not be loaded." } },
      { status: 500 },
    );
  }
}
