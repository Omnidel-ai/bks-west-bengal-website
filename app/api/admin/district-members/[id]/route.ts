import { NextRequest, NextResponse } from "next/server";
import { assertAdminKey } from "@/lib/server/admin-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/server/supabase";
import { isMemberId, validateMemberPatch } from "@/lib/district-members/schema";
import { ADMIN_MEMBER_COLUMNS } from "@/lib/district-members/types";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

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

function badId() {
  return NextResponse.json(
    { error: "Invalid id", messageBn: "অবৈধ সদস্য আইডি।", code: "BAD_ID" },
    { status: 400 },
  );
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;
  if (!isSupabaseAdminConfigured()) return notConfigured();

  const { id } = await ctx.params;
  if (!id || !isMemberId(id)) return badId();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", messageBn: "অবৈধ তথ্য পাঠানো হয়েছে।" },
      { status: 400 },
    );
  }

  const parsed = validateMemberPatch(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.messageEn, messageBn: parsed.messageBn, code: "VALIDATION" },
      { status: 400 },
    );
  }

  const patch: Record<string, unknown> = {};
  const v = parsed.value;
  if (v.full_name) patch.full_name = v.full_name;
  if (v.slug) patch.slug = v.slug;
  if ("designation" in v) patch.designation = v.designation;
  if ("village" in v) patch.village = v.village;
  if ("block" in v) patch.block = v.block;
  if ("area" in v) patch.area = v.area;
  if ("bio" in v) patch.bio = v.bio;
  if ("category" in v) patch.category = v.category;
  if (typeof v.display_order === "number") patch.display_order = v.display_order;
  if (typeof v.is_published === "boolean") patch.is_published = v.is_published;
  if (typeof v.is_archived === "boolean") patch.is_archived = v.is_archived;

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { error: "No changes", messageBn: "কোনো পরিবর্তন নেই।" },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("bks_district_members")
      .update(patch)
      .eq("id", id)
      .select(ADMIN_MEMBER_COLUMNS)
      .maybeSingle();

    if (error) {
      console.error("[api/admin/district-members/id] patch failed:", error.message);
      return NextResponse.json(
        {
          error: "Could not update member",
          messageBn: "সদস্যের তথ্য হালনাগাদ করা যায়নি।",
          code: "WRITE_FAILED",
        },
        { status: 502 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Not found", messageBn: "সদস্য পাওয়া যায়নি।", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    return NextResponse.json({ item: data });
  } catch (err) {
    console.error(
      "[api/admin/district-members/id] unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      {
        error: "Could not update member",
        messageBn: "সদস্যের তথ্য হালনাগাদ করা যায়নি।",
        code: "WRITE_FAILED",
      },
      { status: 502 },
    );
  }
}

/** Soft-archive (preferred over hard delete). */
export async function DELETE(req: NextRequest, ctx: Ctx) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;
  if (!isSupabaseAdminConfigured()) return notConfigured();

  const { id } = await ctx.params;
  if (!id || !isMemberId(id)) return badId();

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("bks_district_members")
      .update({ is_archived: true, is_published: false })
      .eq("id", id)
      .select(ADMIN_MEMBER_COLUMNS)
      .maybeSingle();

    if (error) {
      console.error("[api/admin/district-members/id] archive failed:", error.message);
      return NextResponse.json(
        {
          error: "Could not archive member",
          messageBn: "সদস্য সংরক্ষণাগারে সরানো যায়নি।",
          code: "WRITE_FAILED",
        },
        { status: 502 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Not found", messageBn: "সদস্য পাওয়া যায়নি।", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    return NextResponse.json({ item: data, archived: true });
  } catch (err) {
    console.error(
      "[api/admin/district-members/id] archive unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      {
        error: "Could not archive member",
        messageBn: "সদস্য সংরক্ষণাগারে সরানো যায়নি।",
        code: "WRITE_FAILED",
      },
      { status: 502 },
    );
  }
}
