import "server-only";

import {
  districts,
  type District,
  type DistrictStatus,
} from "@/content/presence/districts";
import { isKnownDistrictId } from "@/lib/district-members/catalog";
import {
  getSupabaseAnonClient,
  isSupabaseConfigured,
} from "@/lib/server/supabase";

const VALID: ReadonlySet<DistrictStatus> = new Set([
  "active",
  "indicated",
  "upcoming",
]);

export function isDistrictStatus(value: string): value is DistrictStatus {
  return VALID.has(value as DistrictStatus);
}

/**
 * Public Presence statuses for the map/explorer.
 *
 * Priority:
 * 1. Any district with ≥1 published, non-archived member → Active (green)
 * 2. Else `bks_district_presence` override when present
 * 3. Else static `districts.ts` default
 *
 * Member presence does not rewrite DB presence rows — visual only.
 */
export async function getDistrictsWithPresenceStatus(): Promise<District[]> {
  const base = districts.map((d) => ({ ...d }));
  if (!isSupabaseConfigured()) return base;

  try {
    const supabase = getSupabaseAnonClient();

    const [{ data: presenceRows, error: presenceError }, { data: memberRows, error: memberError }] =
      await Promise.all([
        supabase.from("bks_district_presence").select("district_id, status").limit(50),
        supabase
          .from("bks_district_members")
          .select("district_id")
          .eq("is_published", true)
          .eq("is_archived", false)
          .limit(500),
      ]);

    if (presenceError) {
      console.error(
        "[district-presence] status list failed:",
        presenceError.message,
      );
    }
    if (memberError) {
      console.error(
        "[district-presence] member districts failed:",
        memberError.message,
      );
    }

    const overrides = new Map<string, DistrictStatus>();
    for (const row of presenceRows ?? []) {
      if (
        row?.district_id &&
        isKnownDistrictId(row.district_id) &&
        isDistrictStatus(row.status)
      ) {
        overrides.set(row.district_id, row.status);
      }
    }

    const withPublishedMembers = new Set<string>();
    for (const row of memberRows ?? []) {
      if (row?.district_id && isKnownDistrictId(row.district_id)) {
        withPublishedMembers.add(row.district_id);
      }
    }

    return base.map((d) => {
      if (withPublishedMembers.has(d.id)) {
        return { ...d, status: "active" as const };
      }
      const status = overrides.get(d.id);
      return status ? { ...d, status } : d;
    });
  } catch (err) {
    console.error(
      "[district-presence] unexpected:",
      err instanceof Error ? err.message : "unknown",
    );
    return base;
  }
}
