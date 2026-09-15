import "server-only";

import { getStaticFallbackMember, getStaticFallbackMembers } from "@/lib/district-members/static-fallback";
import {
  DISTRICT_MEMBER_STORAGE_BUCKET,
  PUBLIC_MEMBER_COLUMNS,
  type DistrictMemberRow,
  type PublicMemberView,
} from "@/lib/district-members/types";
import {
  getSupabaseAnonClient,
  isSupabaseConfigured,
} from "@/lib/server/supabase";

function resolvePhotoUrl(photoPath: string | null | undefined): string | undefined {
  if (!photoPath) return undefined;
  if (photoPath.startsWith("/")) {
    // Site-static assets only (e.g. /assets/presence/...).
    return photoPath.startsWith("/assets/") ? photoPath : undefined;
  }
  if (photoPath.startsWith("http://") || photoPath.startsWith("https://")) {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    if (!base) return undefined;
    const allowedPrefix = `${base}/storage/v1/object/public/${DISTRICT_MEMBER_STORAGE_BUCKET}/`;
    return photoPath.startsWith(allowedPrefix) ? photoPath : undefined;
  }
  // Reject path traversal in storage-relative keys.
  if (
    photoPath.includes("..") ||
    photoPath.includes("\\") ||
    photoPath.startsWith("/")
  ) {
    return undefined;
  }
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return undefined;
  return `${base}/storage/v1/object/public/${DISTRICT_MEMBER_STORAGE_BUCKET}/${photoPath}`;
}

function rowToPublicView(row: Pick<
  DistrictMemberRow,
  | "id"
  | "district_id"
  | "slug"
  | "full_name"
  | "photo_path"
  | "designation"
  | "village"
  | "block"
  | "area"
  | "bio"
  | "category"
  | "display_order"
>): PublicMemberView {
  const bio = row.bio?.trim() || undefined;
  return {
    id: row.id,
    slug: row.slug,
    districtId: row.district_id,
    name: row.full_name,
    photo: resolvePhotoUrl(row.photo_path),
    designation: row.designation ?? undefined,
    village: row.village ?? undefined,
    block: row.block ?? undefined,
    area: row.area ?? undefined,
    bio,
    publicBackground: bio
      ? { bn: bio, en: bio, hi: bio }
      : undefined,
    source: "database",
  };
}

/**
 * Public directory loader.
 * Prefer DB published rows when present; otherwise keep static fallback so
 * existing Paschim Medinipur members never disappear.
 */
export async function getPublicMembersForDistrict(
  districtId: string,
): Promise<PublicMemberView[]> {
  const fallback = getStaticFallbackMembers(districtId);

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  try {
    const supabase = getSupabaseAnonClient();
    const { data, error } = await supabase
      .from("bks_district_members")
      .select(PUBLIC_MEMBER_COLUMNS)
      .eq("district_id", districtId)
      .eq("is_published", true)
      .eq("is_archived", false)
      .order("display_order", { ascending: true })
      .order("full_name", { ascending: true })
      .limit(500);

    if (error) {
      console.error("[district-members] public list failed:", error.message);
      return fallback;
    }

    if (!data || data.length === 0) {
      return fallback;
    }

    return data.map((row) => rowToPublicView(row as DistrictMemberRow));
  } catch (err) {
    console.error(
      "[district-members] public list unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return fallback;
  }
}

export async function getPublicMember(
  districtId: string,
  slug: string,
): Promise<PublicMemberView | null> {
  const members = await getPublicMembersForDistrict(districtId);
  const fromList = members.find((m) => m.slug === slug);
  if (fromList) return fromList;
  return getStaticFallbackMember(districtId, slug);
}

export { resolvePhotoUrl };
