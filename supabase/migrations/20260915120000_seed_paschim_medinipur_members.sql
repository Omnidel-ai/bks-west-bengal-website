-- Seed existing Paschim Medinipur public members into bks_district_members.
-- Additive + idempotent on (district_id, slug). Safe to re-run.
-- Source of truth for these rows: content/presence/districts.ts (static fallback).
-- Photos remain site-static under /assets/presence/* (no bucket move).
-- Do NOT invent designation/village/phone/category — leave null when unknown.

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
