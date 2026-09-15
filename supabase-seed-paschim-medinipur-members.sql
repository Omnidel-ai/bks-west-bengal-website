-- Paste-mirror of supabase/migrations/20260915120000_seed_paschim_medinipur_members.sql
-- Idempotent seed for the three existing Paschim Medinipur members.
-- Photos stay at /assets/presence/* — do not move/rename existing assets.

insert into public.bks_district_members (
  district_id,
  slug,
  full_name,
  photo_path,
  designation,
  village,
  block,
  area,
  bio,
  category,
  display_order,
  is_published,
  is_archived,
  created_by,
  updated_by
)
values
  (
    'paschim-medinipur',
    'buddhadeb-patra',
    'Buddhadeb Patra',
    '/assets/presence/buddhadeb-patra.jpg',
    null,
    null,
    null,
    null,
    'পশ্চিম মেদিনীপুরের BKS উপস্থিতির সঙ্গে যুক্ত।',
    null,
    10,
    true,
    false,
    'cutover-seed',
    'cutover-seed'
  ),
  (
    'paschim-medinipur',
    'rajib-lochan-dey',
    'Rajib Lochan Dey',
    '/assets/presence/rajib-lochan-dey.jpg',
    null,
    null,
    null,
    null,
    'পশ্চিম মেদিনীপুরের BKS উপস্থিতির সঙ্গে যুক্ত।',
    null,
    20,
    true,
    false,
    'cutover-seed',
    'cutover-seed'
  ),
  (
    'paschim-medinipur',
    'apurba-bera',
    'Apurba Bera',
    '/assets/presence/apurba-bera.jpg',
    null,
    null,
    null,
    null,
    'পশ্চিম মেদিনীপুরের BKS উপস্থিতির সঙ্গে যুক্ত।',
    null,
    30,
    true,
    false,
    'cutover-seed',
    'cutover-seed'
  )
on conflict (district_id, slug) do nothing;
