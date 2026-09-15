import {
  PHASE1_DISTRICT_ID,
  type MemberWriteInput,
} from "@/lib/district-members/types";

export type ValidationResult =
  | { ok: true; value: MemberWriteInput }
  | { ok: false; messageBn: string; messageEn: string };

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Reject path-injection / non-row ids before storage or update. */
export function isMemberId(id: string): boolean {
  return UUID_RE.test(id);
}

function asOptionalString(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function rejectClientPhotoPath(raw: Record<string, unknown>): ValidationResult | null {
  if ("photo_path" in raw) {
    return {
      ok: false,
      messageBn: "ছবির পথ সরাসরি পাঠানো যায় না। ছবি আপলোড ব্যবহার করুন।",
      messageEn: "photo_path cannot be set directly. Use the photo upload API.",
    };
  }
  return null;
}

function slugifyName(name: string): string {
  const ascii = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  if (ascii) return ascii;
  return `member-${Date.now().toString(36)}`;
}

export function validateMemberCreate(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      messageBn: "অবৈধ তথ্য পাঠানো হয়েছে।",
      messageEn: "Invalid payload.",
    };
  }

  const raw = body as Record<string, unknown>;
  const photoReject = rejectClientPhotoPath(raw);
  if (photoReject) return photoReject;

  const district_id =
    typeof raw.district_id === "string" ? raw.district_id.trim() : "";
  if (district_id !== PHASE1_DISTRICT_ID) {
    return {
      ok: false,
      messageBn: "এই পর্যায়ে শুধু পশ্চিম মেদিনীপুরের সদস্য যোগ করা যায়।",
      messageEn: "Phase 1 allows only Paschim Medinipur members.",
    };
  }

  const full_name =
    typeof raw.full_name === "string" ? raw.full_name.trim() : "";
  if (!full_name) {
    return {
      ok: false,
      messageBn: "নামটি লিখুন।",
      messageEn: "Name is required.",
    };
  }
  if (full_name.length > 120) {
    return {
      ok: false,
      messageBn: "নামটি খুব দীর্ঘ।",
      messageEn: "Name is too long.",
    };
  }

  const slugRaw =
    typeof raw.slug === "string" && raw.slug.trim()
      ? raw.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-")
      : slugifyName(full_name);

  const display_order =
    typeof raw.display_order === "number" && Number.isFinite(raw.display_order)
      ? Math.round(raw.display_order)
      : 100;

  return {
    ok: true,
    value: {
      district_id,
      full_name,
      slug: slugRaw || slugifyName(full_name),
      designation: asOptionalString(raw.designation) ?? null,
      village: asOptionalString(raw.village) ?? null,
      block: asOptionalString(raw.block) ?? null,
      area: asOptionalString(raw.area) ?? null,
      bio: asOptionalString(raw.bio) ?? null,
      category: asOptionalString(raw.category) ?? null,
      display_order,
      is_published: Boolean(raw.is_published),
      is_archived: false,
    },
  };
}

export function validateMemberPatch(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      messageBn: "অবৈধ তথ্য পাঠানো হয়েছে।",
      messageEn: "Invalid payload.",
    };
  }

  const raw = body as Record<string, unknown>;
  const photoReject = rejectClientPhotoPath(raw);
  if (photoReject) return photoReject;

  const value: MemberWriteInput = {
    district_id: PHASE1_DISTRICT_ID,
    full_name: "",
  };

  if ("full_name" in raw) {
    const full_name =
      typeof raw.full_name === "string" ? raw.full_name.trim() : "";
    if (!full_name) {
      return {
        ok: false,
        messageBn: "নামটি লিখুন।",
        messageEn: "Name is required.",
      };
    }
    value.full_name = full_name;
  }

  if ("district_id" in raw) {
    const district_id =
      typeof raw.district_id === "string" ? raw.district_id.trim() : "";
    if (district_id !== PHASE1_DISTRICT_ID) {
      return {
        ok: false,
        messageBn: "এই পর্যায়ে শুধু পশ্চিম মেদিনীপুরের সদস্য সম্পাদনা করা যায়।",
        messageEn: "Phase 1 allows only Paschim Medinipur members.",
      };
    }
    value.district_id = district_id;
  }

  if ("slug" in raw && typeof raw.slug === "string" && raw.slug.trim()) {
    value.slug = raw.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  }
  if ("designation" in raw) value.designation = asOptionalString(raw.designation) ?? null;
  if ("village" in raw) value.village = asOptionalString(raw.village) ?? null;
  if ("block" in raw) value.block = asOptionalString(raw.block) ?? null;
  if ("area" in raw) value.area = asOptionalString(raw.area) ?? null;
  if ("bio" in raw) value.bio = asOptionalString(raw.bio) ?? null;
  if ("category" in raw) value.category = asOptionalString(raw.category) ?? null;
  if (
    "display_order" in raw &&
    typeof raw.display_order === "number" &&
    Number.isFinite(raw.display_order)
  ) {
    value.display_order = Math.round(raw.display_order);
  }
  if ("is_published" in raw) value.is_published = Boolean(raw.is_published);
  if ("is_archived" in raw) value.is_archived = Boolean(raw.is_archived);

  return { ok: true, value };
}

export { slugifyName };
