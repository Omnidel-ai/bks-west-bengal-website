import {
  districts,
  type District,
  type DistrictStatus,
} from "@/content/presence/districts";

/** Canonical district ids/slugs from the Presence source of truth. */
export const KNOWN_DISTRICT_IDS = districts.map((d) => d.id) as readonly string[];

const KNOWN = new Set(KNOWN_DISTRICT_IDS);

export function isKnownDistrictId(id: string): boolean {
  return KNOWN.has(id);
}

export function getDistrictCatalog(): District[] {
  return districts;
}

export function getStaticDistrictStatus(districtId: string): DistrictStatus | null {
  return districts.find((d) => d.id === districtId)?.status ?? null;
}

export type { District, DistrictStatus };
