import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { assertAdminKey } from "@/lib/server/admin-auth";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/server/supabase";
import { isMemberId } from "@/lib/district-members/schema";
import {
  ADMIN_MEMBER_COLUMNS,
  DISTRICT_MEMBER_STORAGE_BUCKET,
  PHASE1_DISTRICT_ID,
} from "@/lib/district-members/types";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export async function POST(req: NextRequest, ctx: Ctx) {
  const auth = assertAdminKey(req);
  if (!auth.ok) return auth.response;

  if (!isSupabaseAdminConfigured()) {
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

  const { id } = await ctx.params;
  if (!id || !isMemberId(id)) {
    return NextResponse.json(
      { error: "Invalid id", messageBn: "অবৈধ সদস্য আইডি।", code: "BAD_ID" },
      { status: 400 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form", messageBn: "ছবি পাঠানো যায়নি।" },
      { status: 400 },
    );
  }

  const file = form.get("photo");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Photo required", messageBn: "একটি ছবি নির্বাচন করুন।" },
      { status: 400 },
    );
  }

  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json(
      {
        error: "Photo too large",
        messageBn: "ছবির আকার ৫ মেগাবাইটের মধ্যে রাখুন।",
      },
      { status: 400 },
    );
  }

  const ext = ALLOWED.get(file.type);
  if (!ext) {
    return NextResponse.json(
      {
        error: "Unsupported image type",
        messageBn: "শুধু JPG, PNG বা WEBP ছবি ব্যবহার করুন।",
      },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data: existing, error: findError } = await supabase
      .from("bks_district_members")
      .select("id, district_id")
      .eq("id", id)
      .eq("district_id", PHASE1_DISTRICT_ID)
      .maybeSingle();

    if (findError || !existing) {
      return NextResponse.json(
        { error: "Not found", messageBn: "সদস্য পাওয়া যায়নি।", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const objectPath = `${PHASE1_DISTRICT_ID}/${id}-${randomUUID()}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(DISTRICT_MEMBER_STORAGE_BUCKET)
      .upload(objectPath, bytes, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error(
        "[api/admin/district-members/photo] upload failed:",
        uploadError.message,
      );
      return NextResponse.json(
        {
          error: "Could not upload photo",
          messageBn: "ছবি আপলোড করা যায়নি।",
          code: "UPLOAD_FAILED",
        },
        { status: 502 },
      );
    }

    const { data, error } = await supabase
      .from("bks_district_members")
      .update({ photo_path: objectPath })
      .eq("id", id)
      .eq("district_id", PHASE1_DISTRICT_ID)
      .select(ADMIN_MEMBER_COLUMNS)
      .single();

    if (error) {
      console.error(
        "[api/admin/district-members/photo] path update failed:",
        error.message,
      );
      return NextResponse.json(
        {
          error: "Could not save photo path",
          messageBn: "ছবির তথ্য সংরক্ষণ করা যায়নি।",
          code: "WRITE_FAILED",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ item: data, photo_path: objectPath });
  } catch (err) {
    console.error(
      "[api/admin/district-members/photo] unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      {
        error: "Could not upload photo",
        messageBn: "ছবি আপলোড করা যায়নি।",
        code: "UPLOAD_FAILED",
      },
      { status: 502 },
    );
  }
}
