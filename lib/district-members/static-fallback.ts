import { members } from "@/content/presence/districts";
import type { PublicMemberView } from "@/lib/district-members/types";

/**
 * Temporary compatibility layer for existing Paschim Medinipur members.
 * Long-term source of truth is public.bks_district_members after migration apply.
 */
export function getStaticFallbackMembers(districtId: string): PublicMemberView[] {
  return members
    .filter((m) => m.districtId === districtId)
    .map((m) => ({
      id: m.id,
      slug: m.slug,
      districtId: m.districtId,
      name: m.name,
      photo: m.photo,
      bio: m.publicBackground?.bn || m.publicBackground?.en,
      publicBackground: m.publicBackground,
      source: "static-fallback" as const,
    }));
}

export function getStaticFallbackMember(
  districtId: string,
  slug: string,
): PublicMemberView | null {
  return (
    getStaticFallbackMembers(districtId).find((m) => m.slug === slug) ?? null
  );
}
