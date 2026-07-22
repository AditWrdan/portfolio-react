-- Run this once in the Supabase SQL Editor.
-- Replace every occurrence of ADMIN_EMAIL below with the email you'll use
-- to create the dashboard's admin user (Authentication -> Users -> Add user).

create extension if not exists "pgcrypto";

-- ============ TABLES ============

create table about (
  id smallint primary key default 1 check (id = 1),
  bio text not null default '',
  photo_url text,
  updated_at timestamptz not null default now()
);

create table skill_categories (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  stack text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  description text not null,
  highlights text[] default '{}',
  note text,
  stack text[] not null default '{}',
  link_label text,
  href text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table experience (
  id uuid primary key default gen_random_uuid(),
  logo text not null,
  logo_image_url text,
  period text not null,
  role text not null,
  company text not null,
  description text not null,
  highlights text[] default '{}',
  tag text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table education (
  id uuid primary key default gen_random_uuid(),
  logo text not null,
  logo_image_url text,
  period text not null,
  school text not null,
  field text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ ROW LEVEL SECURITY ============

alter table about enable row level security;
alter table skill_categories enable row level security;
alter table projects enable row level security;
alter table experience enable row level security;
alter table education enable row level security;

create policy "public read about" on about for select using (true);
create policy "public read skill_categories" on skill_categories for select using (true);
create policy "public read projects" on projects for select using (true);
create policy "public read experience" on experience for select using (true);
create policy "public read education" on education for select using (true);

create policy "admin write about" on about for all
  using (auth.jwt() ->> 'email' = 'ADMIN_EMAIL')
  with check (auth.jwt() ->> 'email' = 'ADMIN_EMAIL');
create policy "admin write skill_categories" on skill_categories for all
  using (auth.jwt() ->> 'email' = 'ADMIN_EMAIL')
  with check (auth.jwt() ->> 'email' = 'ADMIN_EMAIL');
create policy "admin write projects" on projects for all
  using (auth.jwt() ->> 'email' = 'ADMIN_EMAIL')
  with check (auth.jwt() ->> 'email' = 'ADMIN_EMAIL');
create policy "admin write experience" on experience for all
  using (auth.jwt() ->> 'email' = 'ADMIN_EMAIL')
  with check (auth.jwt() ->> 'email' = 'ADMIN_EMAIL');
create policy "admin write education" on education for all
  using (auth.jwt() ->> 'email' = 'ADMIN_EMAIL')
  with check (auth.jwt() ->> 'email' = 'ADMIN_EMAIL');

-- ============ STORAGE ============

insert into storage.buckets (id, name, public) values ('portfolio-images', 'portfolio-images', true);

create policy "public read portfolio-images" on storage.objects for select
  using (bucket_id = 'portfolio-images');

create policy "admin insert portfolio-images" on storage.objects for insert
  with check (bucket_id = 'portfolio-images' and auth.jwt() ->> 'email' = 'ADMIN_EMAIL');
create policy "admin update portfolio-images" on storage.objects for update
  using (bucket_id = 'portfolio-images' and auth.jwt() ->> 'email' = 'ADMIN_EMAIL');
create policy "admin delete portfolio-images" on storage.objects for delete
  using (bucket_id = 'portfolio-images' and auth.jwt() ->> 'email' = 'ADMIN_EMAIL');
