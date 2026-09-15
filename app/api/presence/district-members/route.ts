import { NextRequest, NextResponse } from "next/server";
import { isKnownDistrictId } from "@/lib/district-members/catalog";
import { getPublicMembersForDistrict } from "@/lib/district-members/public";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public read-only member list for Presence explorer soft-navigation.
 * Returns published, non-archived members for one known district.
 */
export async function GET(req: NextRequest) {
  const districtId = (req.nextUrl.searchParams.get("district_id") || "").trim();
  if (!isKnownDistrictId(districtId)) {
    return NextResponse.json(
      { error: "Unknown district", code: "BAD_DISTRICT" },
      { status: 400 },
    );
  }

  try {
    const items = await getPublicMembersForDistrict(districtId);
    return NextResponse.json(
      { district_id: districtId, items },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (err) {
    console.error(
      "[api/presence/district-members] failed:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      { error: "Could not load members", code: "READ_FAILED" },
      { status: 502 },
    );
  }
}
