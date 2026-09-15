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
 * Merge static district catalog with optional DB overrides.
 * Static `districts.ts` remains the list source of truth; DB only overrides status.
 */
export async function getDistrictsWithPresenceStatus(): Promise<District[]> {
  const base = districts.map((d) => ({ ...d }));
  if (!isSupabaseConfigured()) return base;

  try {
    const supabase = getSupabaseAnonClient();
    const { data, error } = await supabase
      .from("bks_district_presence")
      .select("district_id, status")
      .limit(50);

    if (error || !data?.length) {
      if (error) {
        console.error(
          "[district-presence] status list failed:",
          error.message,
        );
      }
      return base;
    }

    const overrides = new Map<string, DistrictStatus>();
    for (const row of data) {
      if (
        row?.district_id &&
        isKnownDistrictId(row.district_id) &&
        isDistrictStatus(row.status)
      ) {
        overrides.set(row.district_id, row.status);
      }
    }

    return base.map((d) => {
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
