begin;

create type public.vendor_application_status as enum ('pending', 'approved', 'rejected');

create table public.vendor_applications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  business_name text not null,
  category_id uuid not null references public.categories (id) on delete restrict,
  description text not null,
  experience integer not null,
  address text not null,
  city text not null,
  state text not null,
  country text not null default 'India',
  pincode text not null,
  instagram text,
  facebook text,
  website text,
  logo_url text not null,
  status public.vendor_application_status not null default 'pending',
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles (id) on delete set null,
  rejection_reason text,
  constraint vendor_applications_email_format check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  constraint vendor_applications_experience_nonnegative check (experience >= 0),
  constraint vendor_applications_required_text check (
    btrim(full_name) <> '' and btrim(phone) <> '' and btrim(business_name) <> ''
    and btrim(description) <> '' and btrim(address) <> '' and btrim(city) <> ''
    and btrim(state) <> '' and btrim(country) <> '' and btrim(pincode) <> '' and btrim(logo_url) <> ''
  ),
  constraint vendor_applications_rejection_reason check (
    status <> 'rejected' or (rejection_reason is not null and btrim(rejection_reason) <> '')
  )
);

create index vendor_applications_status_submitted_idx
  on public.vendor_applications (status, submitted_at desc);

create table public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  application_id uuid references public.vendor_applications (id) on delete cascade,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index admin_notifications_unread_idx
  on public.admin_notifications (created_at desc) where not is_read;

alter table public.vendors alter column profile_id drop not null;
alter table public.vendors add column application_id uuid unique
  references public.vendor_applications (id) on delete set null;
alter table public.vendors add column pincode text;
alter table public.vendors add column logo_url text;

create function private.notify_vendor_application()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.admin_notifications (title, application_id)
  values ('New Vendor Registration Request', new.id);
  return new;
end;
$$;

create trigger vendor_application_notify_admin
after insert on public.vendor_applications
for each row execute function private.notify_vendor_application();

create function public.review_vendor_application(
  target_application_id uuid,
  decision public.vendor_application_status,
  reason text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  application public.vendor_applications%rowtype;
  result_vendor_id uuid;
begin
  if decision not in ('approved', 'rejected') then
    raise exception 'Decision must be approved or rejected';
  end if;
  if decision = 'rejected' and (reason is null or btrim(reason) = '') then
    raise exception 'A rejection reason is required';
  end if;

  select * into application from public.vendor_applications
  where id = target_application_id and status = 'pending' for update;
  if not found then raise exception 'Pending vendor application not found'; end if;

  if decision = 'approved' then
    insert into public.vendors (
      profile_id, application_id, business_name, owner_name, description,
      category_id, address, city, state, country, pincode, experience,
      instagram, facebook, website, logo_url, is_verified
    ) values (
      application.profile_id, application.id, application.business_name,
      application.full_name, application.description, application.category_id,
      application.address, application.city, application.state, application.country,
      application.pincode, application.experience, application.instagram,
      application.facebook, application.website, application.logo_url, true
    )
    on conflict (application_id) do update set
      business_name = excluded.business_name, owner_name = excluded.owner_name,
      description = excluded.description, category_id = excluded.category_id,
      address = excluded.address, city = excluded.city, state = excluded.state,
      country = excluded.country, pincode = excluded.pincode,
      experience = excluded.experience, instagram = excluded.instagram,
      facebook = excluded.facebook, website = excluded.website,
      logo_url = excluded.logo_url, is_verified = true
    returning id into result_vendor_id;
  end if;

  update public.vendor_applications set
    status = decision,
    reviewed_at = now(),
    reviewed_by = auth.uid(),
    rejection_reason = case when decision = 'rejected' then btrim(reason) else null end
  where id = target_application_id;

  update public.admin_notifications set is_read = true
  where application_id = target_application_id;
  return result_vendor_id;
end;
$$;

alter table public.vendor_applications enable row level security;
alter table public.admin_notifications enable row level security;
grant select, insert on public.vendor_applications to anon, authenticated;
grant select, update on public.admin_notifications to anon, authenticated;
grant execute on function public.review_vendor_application(uuid, public.vendor_application_status, text) to anon, authenticated;

create policy "vendor_applications_submit" on public.vendor_applications
for insert to anon, authenticated with check (status = 'pending' and reviewed_at is null and reviewed_by is null);
create policy "vendor_applications_admin_stub_read" on public.vendor_applications
for select to anon, authenticated using (true);
create policy "admin_notifications_admin_stub_read" on public.admin_notifications
for select to anon, authenticated using (true);
create policy "admin_notifications_admin_stub_update" on public.admin_notifications
for update to anon, authenticated using (true) with check (true);

create or replace function private.vendor_is_public(target_vendor_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.vendors v
    left join public.profiles p on p.id = v.profile_id
    where v.id = target_vendor_id and v.is_verified
      and (v.profile_id is null or p.is_active)
  );
$$;

commit;
