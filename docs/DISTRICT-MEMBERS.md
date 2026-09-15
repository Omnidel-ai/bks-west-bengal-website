# BKS District Members (all West Bengal districts)

Reusable public member directory + Bengali admin management for **every**
district in `content/presence/districts.ts`.

This is **not** farmer mobilization registration
(`bks_people_mobilization_registrations`) and **not** district leadership
applications (`bks_district_leadership_applications`).

## Schema

| Item | Value |
|---|---|
| Members table | `public.bks_district_members` |
| Presence status overrides | `public.bks_district_presence` |
| Storage bucket | `district-members` |
| Target project ref | `lhnorkjfldywnrqqunqn` |

District catalog / names / slugs remain in `content/presence/districts.ts`.
Public map status priority:
1. ≥1 published, non-archived member → **Active** (automatic green)
2. else `bks_district_presence` override
3. else static default in `districts.ts`

## Data script rule

- UI language (bn / hi / en) localizes labels and messages.
- Canonical member field values use **English/Latin script** (names, village, etc.).
- Existing seeded Paschim Medinipur bios are grandfathered; do not mass-rewrite.

## Admin

- Route: `/admin/district-members`
- Auth: `BKS_ADMIN_KEY` + `x-admin-key`
- District selector for all 23 districts
- Presence status control (separate from members)
- Member CRUD / photo / publish scoped to the selected district

## Public

- Routes: `/presence/west-bengal/[district]`
- Map statuses are data-driven (`district.status`)
- Selected ≠ Active (selection stroke; Active green preserved)
- Fallback: static members when DB empty/error for that district

Do **not** drop, truncate, or alter unrelated tables.
