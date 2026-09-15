-- Additive district Presence status overrides (Active / Indicated / Upcoming).
-- Static content/presence/districts.ts remains the district catalog.
-- Rows here override status only; missing rows use static defaults.
-- Do NOT auto-activate all districts.

create table if not exists public.bks_district_presence (
  district_id text primary key,
  status text not null
    check (status in ('active', 'indicated', 'upcoming')),
  updated_at timestamptz not null default now(),
  updated_by text
);

alter table public.bks_district_presence enable row level security;

drop policy if exists "public_select_bks_district_presence"
  on public.bks_district_presence;
create policy "public_select_bks_district_presence"
on public.bks_district_presence
for select
to anon, authenticated
using (true);

-- No anon/authenticated write policies — admin uses service role.

-- Seed current production Presence states (idempotent).
insert into public.bks_district_presence (district_id, status, updated_by)
values
  ('paschim-medinipur', 'active', 'generalize-seed'),
  ('north-24-parganas', 'indicated', 'generalize-seed')
on conflict (district_id) do nothing;
