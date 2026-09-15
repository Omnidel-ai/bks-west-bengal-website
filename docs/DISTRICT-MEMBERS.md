# BKS District Members (Paschim Medinipur Phase 1)

Isolated public member directory + Bengali admin management for
**পশ্চিম মেদিনীপুর / `paschim-medinipur`**.

This is **not** farmer mobilization registration
(`bks_people_mobilization_registrations`) and **not** district leadership
applications (`bks_district_leadership_applications`).

## Schema migration

| Item | Value |
|---|---|
| Migration file | `supabase/migrations/20260915103000_bks_district_members.sql` |
| Paste mirror | `supabase-bks-district-members.sql` |
| Target project ref | `lhnorkjfldywnrqqunqn` |
| Target URL | `https://lhnorkjfldywnrqqunqn.supabase.co` |
| Forbidden | KarmYog Vatika and every other Supabase project |

## Cutover seed (existing three members)

| Item | Value |
|---|---|
| Seed file | `supabase/migrations/20260915120000_seed_paschim_medinipur_members.sql` |
| Paste mirror | `supabase-seed-paschim-medinipur-members.sql` |
| Identity | unique `(district_id, slug)` + `on conflict do nothing` |
| Photos | Keep `/assets/presence/*.jpg` (no bucket move) |

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
