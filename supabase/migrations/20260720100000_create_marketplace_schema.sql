begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create type public.app_role as enum ('public_user', 'vendor', 'admin');
create type public.subscription_status as enum (
  'pending',
  'active',
  'expired',
  'cancelled'
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null,
  phone text,
  role public.app_role not null default 'public_user',
  profile_image text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_not_blank check (btrim(email) <> ''),
  constraint profiles_email_format check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  constraint profiles_full_name_not_blank check (btrim(full_name) <> '')
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_name_not_blank check (btrim(name) <> '')
);

create unique index categories_name_unique_ci_idx
  on public.categories (lower(name));

create table public.vendors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles (id) on delete cascade,
  business_name text not null,
  owner_name text not null,
  description text,
  category_id uuid not null references public.categories (id) on delete restrict,
  address text,
  city text not null,
  state text not null,
  country text not null default 'India',
  experience integer,
  instagram text,
  facebook text,
  website text,
  is_verified boolean not null default false,
  is_featured boolean not null default false,
  subscription_status public.subscription_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint vendors_business_name_not_blank check (btrim(business_name) <> ''),
  constraint vendors_owner_name_not_blank check (btrim(owner_name) <> ''),
  constraint vendors_city_not_blank check (btrim(city) <> ''),
  constraint vendors_state_not_blank check (btrim(state) <> ''),
  constraint vendors_country_not_blank check (btrim(country) <> ''),
  constraint vendors_experience_nonnegative check (experience is null or experience >= 0)
);

create table public.vendor_services (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors (id) on delete cascade,
  title text not null,
  description text,
  price numeric(12, 2),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint vendor_services_title_not_blank check (btrim(title) <> ''),
  constraint vendor_services_price_nonnegative check (price is null or price >= 0)
);

create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  vendor_id uuid not null references public.vendors (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint favorites_profile_vendor_unique unique (profile_id, vendor_id)
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors (id) on delete cascade,
  plan_name text not null,
  status public.subscription_status not null default 'pending',
  start_date date not null,
  end_date date not null,
  created_at timestamptz not null default now(),
  constraint subscriptions_plan_name_not_blank check (btrim(plan_name) <> ''),
  constraint subscriptions_date_order check (end_date >= start_date)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  rating smallint not null,
  review text not null,
  created_at timestamptz not null default now(),
  constraint reviews_rating_range check (rating between 1 and 5),
  constraint reviews_review_not_blank check (btrim(review) <> ''),
  constraint reviews_profile_vendor_unique unique (profile_id, vendor_id)
);

create index profiles_role_idx on public.profiles (role);
create index profiles_active_idx on public.profiles (is_active) where is_active;
create index vendors_category_idx on public.vendors (category_id);
create index vendors_location_idx on public.vendors (country, state, city);
create index vendors_public_listing_idx
  on public.vendors (is_featured desc, created_at desc)
  where is_verified;
create index vendor_services_vendor_active_idx
  on public.vendor_services (vendor_id, is_active);
create index favorites_vendor_idx on public.favorites (vendor_id);
create index subscriptions_vendor_created_idx
  on public.subscriptions (vendor_id, created_at desc);
create unique index subscriptions_one_active_per_vendor_idx
  on public.subscriptions (vendor_id)
  where status = 'active';
create index reviews_vendor_created_idx
  on public.reviews (vendor_id, created_at desc);

create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function private.set_updated_at();

create trigger categories_set_updated_at
before update on public.categories
for each row execute function private.set_updated_at();

create trigger vendors_set_updated_at
before update on public.vendors
for each row execute function private.set_updated_at();

create trigger vendor_services_set_updated_at
before update on public.vendor_services
for each row execute function private.set_updated_at();

insert into public.categories (name)
values
  ('Photographer'),
  ('Decorator'),
  ('Makeup Artist'),
  ('Mehendi Artist'),
  ('DJ'),
  ('Wedding Hall'),
  ('Caterer'),
  ('Bridal Wear'),
  ('Jewellery'),
  ('Invitation Cards'),
  ('Travel'),
  ('Pandit'),
  ('Choreographer'),
  ('Car Rental');

commit;
