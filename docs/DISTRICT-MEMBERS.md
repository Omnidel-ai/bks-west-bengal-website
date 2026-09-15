# BKS District Members (Paschim Medinipur Phase 1)

Isolated public member directory + Bengali admin management for
**পশ্চিম মেদিনীপুর / `paschim-medinipur`**.

This is **not** farmer mobilization registration
(`bks_people_mobilization_registrations`) and **not** district leadership
applications (`bks_district_leadership_applications`).

## Migration to apply later (NOT applied yet)

| Item | Value |
|---|---|
| Migration file | `supabase/migrations/20260915103000_bks_district_members.sql` |
| Paste mirror | `supabase-bks-district-members.sql` |
| Target project ref | `lhnorkjfldywnrqqunqn` |
| Target URL | `https://lhnorkjfldywnrqqunqn.supabase.co` |
| Forbidden | KarmYog Vatika and every other Supabase project |

### Apply checklist (human / authorized only)

1. Confirm project ref is `lhnorkjfldywnrqqunqn`.
2. Open Supabase SQL Editor for that project.
3. Paste contents of `supabase-bks-district-members.sql` (or run the migration file).
4. Confirm table `public.bks_district_members` exists with RLS enabled.
5. Confirm storage bucket `district-members` exists and is public-read.
6. Set Vercel / `.env.local` env vars (below).
7. Optionally promote existing static members via `/admin/district-members` — do **not** insert fake production people.

Do **not** drop, truncate, or alter unrelated tables.

## Environment

```bash
NEXT_PUBLIC_SUPABASE_URL=https://lhnorkjfldywnrqqunqn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
BKS_ADMIN_KEY=
```

- `BKS_ADMIN_KEY` is server-only. Browser sends it only as `x-admin-key` to admin APIs.
- Never put `BKS_ADMIN_KEY` or the service-role key in `NEXT_PUBLIC_*`.

## Public fallback (temporary)

Until the migration is applied **and** at least one published row exists for
`paschim-medinipur`, the public Presence UI continues to show the three
static members from `content/presence/districts.ts`:

- Buddhadeb Patra
- Rajib Lochan Dey
- Apurba Bera

That static list is a **temporary compatibility layer**, not the long-term
source of truth.

## Admin

- Route: `/admin/district-members`
- Auth: same sibling pattern — `BKS_ADMIN_KEY` + `x-admin-key`
- Phase 1 district writes: `paschim-medinipur` only
