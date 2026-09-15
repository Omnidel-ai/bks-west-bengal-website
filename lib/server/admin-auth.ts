import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Shared BKS admin key gate (sibling pattern from west-bengal-website).
 * Browser may hold the key in sessionStorage and send it as `x-admin-key`.
 * The expected value lives only in process.env.BKS_ADMIN_KEY.
 *
 * Replaceable later with Supabase Auth without rewriting admin UI —
 * swap this helper's implementation at the API boundary.
 */

function keyMatches(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export type AdminAuthResult =
  | { ok: true }
  | { ok: false; response: NextResponse };

export function assertAdminKey(req: NextRequest): AdminAuthResult {
  const expected = process.env.BKS_ADMIN_KEY;
  if (!expected) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Admin panel is not configured", code: "NOT_CONFIGURED" },
        { status: 500 },
      ),
    };
  }

  const provided = req.headers.get("x-admin-key") ?? "";
  if (!provided || !keyMatches(provided, expected)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Unauthorized", code: "UNAUTHORIZED" },
        { status: 401 },
      ),
    };
  }

  return { ok: true };
}
