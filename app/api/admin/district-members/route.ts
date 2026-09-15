import { NextRequest, NextResponse } from "next/server";
import { assertAdminKey } from "@/lib/server/admin-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/server/supabase";
import { isKnownDistrictId } from "@/lib/district-members/catalog";
import { validateMemberCreate } from "@/lib/district-members/schema";
import {
  ADMIN_MEMBER_COLUMNS,
  DEFAULT_DISTRICT_ID,
} from "@/lib/district-members/types";

export const runtime = "nodejs";

function notConfigured() {
  return NextResponse.json(
    {
      error: "Database admin is not configured yet",
      code: "DB_NOT_CONFIGURED",
      messageBn:
        "ডাটাবেস এখনো সংযুক্ত নয়। মাইগ্রেশন প্রয়োগ ও পরিবেশ ভেরিয়েবল সেট করার পর আবার চেষ্টা করুন।",
    },
    { status: 503 },
  );
}

export async function GET(req: NextRequest) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;
  if (!isSupabaseAdminConfigured()) return notConfigured();

  const districtId =
    req.nextUrl.searchParams.get("district_id") || DEFAULT_DISTRICT_ID;
  if (!isKnownDistrictId(districtId)) {
    return NextResponse.json(
      {
        error: "Unsupported district",
        code: "BAD_DISTRICT",
        messageBn: "জেলা নির্বাচন সঠিক নয়।",
      },
      { status: 400 },
    );
  }

  const q = (req.nextUrl.searchParams.get("q") || "").trim().toLowerCase();
  const status = req.nextUrl.searchParams.get("status") || "all";

  try {
    const supabase = getSupabaseAdminClient();
    let query = supabase
      .from("bks_district_members")
      .select(ADMIN_MEMBER_COLUMNS)
      .eq("district_id", districtId)
      .eq("is_archived", false)
      .order("display_order", { ascending: true })
      .order("full_name", { ascending: true })
      .limit(500);

    if (status === "published") query = query.eq("is_published", true);
    if (status === "draft") query = query.eq("is_published", false);

    const { data, error } = await query;
    if (error) {
      console.error("[api/admin/district-members] list failed:", error.message);
      return NextResponse.json(
        { error: "Could not load members", code: "READ_FAILED" },
        { status: 502 },
      );
    }

    let items = data ?? [];
    if (q) {
      items = items.filter((row) => {
        const hay = [row.full_name, row.village, row.area, row.block, row.designation]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    const total = items.length;
    const published = items.filter((r) => r.is_published).length;
    const draft = total - published;

    return NextResponse.json({
      items,
      counts: { total, published, draft },
      district_id: districtId,
    });
  } catch (err) {
    console.error(
      "[api/admin/district-members] unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      { error: "Could not load members", code: "READ_FAILED" },
      { status: 502 },
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;
  if (!isSupabaseAdminConfigured()) return notConfigured();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", messageBn: "অবৈধ তথ্য পাঠানো হয়েছে।" },
      { status: 400 },
    );
  }

  const parsed = validateMemberCreate(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.messageEn, messageBn: parsed.messageBn, code: "VALIDATION" },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("bks_district_members")
      .insert({
        ...parsed.value,
        photo_path: null,
      })
      .select(ADMIN_MEMBER_COLUMNS)
      .single();

    if (error) {
      console.error("[api/admin/district-members] create failed:", error.message);
      const conflict = error.code === "23505";
      return NextResponse.json(
        {
          error: conflict ? "Member slug already exists" : "Could not save member",
          messageBn: conflict
            ? "এই নাম/স্লাগ ইতিমধ্যে আছে।"
            : "সদস্যের তথ্য সংরক্ষণ করা যায়নি।",
          code: conflict ? "CONFLICT" : "WRITE_FAILED",
        },
        { status: conflict ? 409 : 502 },
      );
    }

    return NextResponse.json({ item: data }, { status: 201 });
  } catch (err) {
    console.error(
      "[api/admin/district-members] create unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      {
        error: "Could not save member",
        messageBn: "সদস্যের তথ্য সংরক্ষণ করা যায়নি।",
        code: "WRITE_FAILED",
      },
      { status: 502 },
    );
  }
}
