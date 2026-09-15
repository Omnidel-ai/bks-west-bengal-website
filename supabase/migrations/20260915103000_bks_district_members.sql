-- BKS West Bengal — district public member directory
-- Additive only. Do NOT apply until explicitly authorized.
-- Target project (later): lhnorkjfldywnrqqunqn (BKS production Supabase)
-- Do NOT use KarmYog Vatika or any other Supabase project.
--
-- Separated from:
--   public.bks_people_mobilization_registrations
--   public.bks_district_leadership_applications

create table if not exists public.bks_district_members (
  id uuid primary key default gen_random_uuid(),
  district_id text not null,
  slug text not null,
  full_name text not null,
  photo_path text,
  designation text,
  village text,
  block text,
  area text,
  bio text,
  category text,
  display_order integer not null default 100,
  is_published boolean not null default false,
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text,
  constraint bks_district_members_district_slug_unique unique (district_id, slug)
);

create index if not exists bks_district_members_public_list_idx
  on public.bks_district_members (district_id, is_published, is_archived, display_order);

create or replace function public.bks_district_members_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bks_district_members_updated_at on public.bks_district_members;
create trigger bks_district_members_updated_at
before update on public.bks_district_members
for each row
execute function public.bks_district_members_set_updated_at();

alter table public.bks_district_members enable row level security;

-- Public may read only published, non-archived rows.
drop policy if exists "public_select_published_bks_district_members" on public.bks_district_members;
create policy "public_select_published_bks_district_members"
on public.bks_district_members
for select
to anon, authenticated
using (is_published = true and is_archived = false);

-- No anon/authenticated insert/update/delete policies.
-- Admin mutations use the service-role key behind BKS_ADMIN_KEY API gates.

-- Storage bucket for profile photos (public read; writes via service role).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'district-members',
  'district-members',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public_read_district_member_photos" on storage.objects;
create policy "public_read_district_member_photos"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'district-members');
