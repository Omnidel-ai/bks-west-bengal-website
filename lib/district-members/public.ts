import "server-only";

import { getStaticFallbackMember, getStaticFallbackMembers } from "@/lib/district-members/static-fallback";
import {
  DISTRICT_MEMBER_STORAGE_BUCKET,
  PUBLIC_MEMBER_COLUMNS,
  type DistrictMemberRow,
  type PresenceGalleryItem,
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

export type { PresenceGalleryItem };

/**
 * Derived Presence Gallery — published, non-archived members that already
 * have a resolvable photo. No duplicate storage; DB photos remain source of truth.
 */
export async function getPresenceGalleryItems(): Promise<PresenceGalleryItem[]> {
  const { districts } = await import("@/content/presence/districts");

  if (!isSupabaseConfigured()) {
    return districts.flatMap((d) =>
      getStaticFallbackMembers(d.id)
        .filter((m) => Boolean(m.photo))
        .map((m) => ({
          id: m.id,
          name: m.name,
          photo: m.photo as string,
          districtId: d.id,
          districtSlug: d.slug,
          districtOfficialName: d.officialName,
          memberSlug: m.slug,
        })),
    );
  }

  try {
    const supabase = getSupabaseAnonClient();
    const { data, error } = await supabase
      .from("bks_district_members")
      .select(PUBLIC_MEMBER_COLUMNS)
      .eq("is_published", true)
      .eq("is_archived", false)
      .not("photo_path", "is", null)
      .order("district_id", { ascending: true })
      .order("display_order", { ascending: true })
      .order("full_name", { ascending: true })
      .limit(500);

    if (error) {
      console.error("[district-members] gallery list failed:", error.message);
      return [];
    }

    const byId = new Map(districts.map((d) => [d.id, d]));
    const items: PresenceGalleryItem[] = [];
    for (const row of data ?? []) {
      const view = rowToPublicView(row as DistrictMemberRow);
      if (!view.photo) continue;
      const d = byId.get(view.districtId);
      if (!d) continue;
      items.push({
        id: view.id,
        name: view.name,
        photo: view.photo,
        districtId: d.id,
        districtSlug: d.slug,
        districtOfficialName: d.officialName,
        memberSlug: view.slug,
      });
    }
    return items;
  } catch (err) {
    console.error(
      "[district-members] gallery unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return [];
  }
}

export { resolvePhotoUrl };
