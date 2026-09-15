/** Phase 1: Paschim Medinipur only for admin writes. */
export const PHASE1_DISTRICT_ID = "paschim-medinipur" as const;

export const DISTRICT_MEMBER_STORAGE_BUCKET = "district-members";

export const PUBLIC_MEMBER_COLUMNS =
  "id, district_id, slug, full_name, photo_path, designation, village, block, area, bio, category, display_order" as const;

export const ADMIN_MEMBER_COLUMNS =
  `${PUBLIC_MEMBER_COLUMNS}, is_published, is_archived, created_at, updated_at, created_by, updated_by` as const;

export type DistrictMemberRow = {
  id: string;
  district_id: string;
  slug: string;
  full_name: string;
  photo_path: string | null;
  designation: string | null;
  village: string | null;
  block: string | null;
  area: string | null;
  bio: string | null;
  category: string | null;
  display_order: number;
  is_published: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  updated_by: string | null;
};

/** Shape used by public Presence UI (compatible with existing Member cards). */
export type PublicMemberView = {
  id: string;
  slug: string;
  districtId: string;
  name: string;
  photo?: string;
  designation?: string;
  village?: string;
  block?: string;
  area?: string;
  bio?: string;
  publicBackground?: { bn: string; en: string; hi: string };
  source: "database" | "static-fallback";
};

export type MemberWriteInput = {
  district_id: string;
  full_name: string;
  slug?: string;
  designation?: string | null;
  village?: string | null;
  block?: string | null;
  area?: string | null;
  bio?: string | null;
  category?: string | null;
  display_order?: number;
  is_published?: boolean;
  is_archived?: boolean;
};
