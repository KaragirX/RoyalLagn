begin;

alter table public.vendors
  add column if not exists contact_email text,
  add column if not exists contact_phone text,
  add column if not exists tags text[] not null default '{}',
  add column if not exists preferences jsonb not null default
    '{"search_visibility":true,"direct_messages":true,"marketing_updates":false}'::jsonb,
  add column if not exists profile_views bigint not null default 0;

create table if not exists public.vendor_portfolio_albums (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 80),
  description text,
  display_order integer not null default 0,
  is_visible boolean not null default true,
  media_count integer not null default 0 check (media_count between 0 and 25),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists vendor_albums_title_unique_ci_idx
  on public.vendor_portfolio_albums(vendor_id, lower(btrim(title)));

create table if not exists public.vendor_portfolio_media (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  album_id uuid not null references public.vendor_portfolio_albums(id) on delete cascade,
  secure_url text not null,
  public_id text not null unique,
  resource_type text not null check (resource_type in ('image', 'video')),
  format text,
  width integer,
  height integer,
  duration numeric,
  bytes bigint,
  thumbnail_url text,
  display_order integer not null default 0,
  is_cover boolean not null default false,
  upload_status text not null default 'completed'
    check (upload_status in ('processing', 'completed', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vendor_portfolio_albums
  add column if not exists cover_media_id uuid
  references public.vendor_portfolio_media(id) on delete set null;

create table if not exists public.vendor_availability (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  available_date date not null,
  status text not null default 'available'
    check (status in ('available', 'tentative', 'booked', 'blocked')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (vendor_id, available_date)
);

create table if not exists public.vendor_enquiries (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  customer_id uuid references public.profiles(id) on delete set null,
  customer_name text not null,
  customer_email text,
  customer_phone text,
  event_date date,
  event_type text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'quoted', 'booked', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vendor_notifications (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  title text not null,
  body text,
  kind text not null default 'general',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists vendor_albums_order_idx
  on public.vendor_portfolio_albums(vendor_id, display_order, created_at);
create index if not exists vendor_albums_created_idx
  on public.vendor_portfolio_albums(vendor_id, created_at desc);
create index if not exists vendor_media_order_idx
  on public.vendor_portfolio_media(album_id, display_order, created_at);
create index if not exists vendor_media_vendor_idx
  on public.vendor_portfolio_media(vendor_id, created_at desc);
create index if not exists vendor_media_created_idx
  on public.vendor_portfolio_media(album_id, created_at desc);
create index if not exists vendor_availability_date_idx
  on public.vendor_availability(vendor_id, available_date);
create index if not exists vendor_enquiries_status_idx
  on public.vendor_enquiries(vendor_id, status, created_at desc);
create index if not exists vendor_notifications_unread_idx
  on public.vendor_notifications(vendor_id, created_at desc) where not is_read;

create or replace function private.workspace_vendor_owned(target_vendor_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.vendors v
    where v.id = target_vendor_id
      and (v.profile_id = auth.uid() or private.is_admin())
  );
$$;

create or replace function private.portfolio_vendor_is_public(target_vendor_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1
    from public.vendors v
    left join public.profiles p on p.id = v.profile_id
    where v.id = target_vendor_id
      and v.is_verified
      and v.subscription_status = 'active'
      and (v.profile_id is null or p.is_active)
  );
$$;

create or replace function private.validate_portfolio_media()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  album_vendor uuid;
  current_count integer;
begin
  select a.vendor_id into album_vendor
  from public.vendor_portfolio_albums a
  where a.id = new.album_id
  for update;
  if album_vendor is null or album_vendor <> new.vendor_id then
    raise exception 'Portfolio album does not belong to this vendor';
  end if;
  if tg_op = 'INSERT' or new.album_id is distinct from old.album_id then
    select count(*) into current_count
    from public.vendor_portfolio_media m
    where m.album_id = new.album_id;
    if current_count >= 25 then
      raise exception 'Album media limit reached';
    end if;
  end if;
  return new;
end;
$$;

create or replace function private.sync_portfolio_album()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  old_album uuid;
  new_album uuid;
begin
  old_album := case when tg_op in ('DELETE', 'UPDATE') then old.album_id else null end;
  new_album := case when tg_op in ('INSERT', 'UPDATE') then new.album_id else null end;

  if old_album is not null then
    update public.vendor_portfolio_albums a set
      media_count = (select count(*) from public.vendor_portfolio_media m where m.album_id = old_album),
      cover_media_id = case
        when a.cover_media_id = old.id
          and (tg_op = 'DELETE' or new.album_id is distinct from old.album_id) then
          (select m.id from public.vendor_portfolio_media m
           where m.album_id = old_album order by m.display_order, m.created_at limit 1)
        else a.cover_media_id
      end,
      updated_at = now()
    where a.id = old_album;
  end if;
  if new_album is not null and new_album is distinct from old_album then
    update public.vendor_portfolio_albums set
      media_count = (select count(*) from public.vendor_portfolio_media m where m.album_id = new_album),
      updated_at = now()
    where id = new_album;
  elsif tg_op = 'INSERT' then
    update public.vendor_portfolio_albums set
      media_count = (select count(*) from public.vendor_portfolio_media m where m.album_id = new_album),
      updated_at = now()
    where id = new_album;
  end if;
  if tg_op in ('INSERT', 'UPDATE') and new.is_cover then
    update public.vendor_portfolio_albums
    set cover_media_id = new.id, updated_at = now()
    where id = new.album_id;
    update public.vendor_portfolio_media
    set is_cover = false, updated_at = now()
    where album_id = new.album_id and id <> new.id and is_cover;
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

revoke all on function private.workspace_vendor_owned(uuid) from public;
revoke all on function private.portfolio_vendor_is_public(uuid) from public;
revoke all on function private.validate_portfolio_media() from public, anon, authenticated;
revoke all on function private.sync_portfolio_album() from public, anon, authenticated;
grant execute on function private.workspace_vendor_owned(uuid) to authenticated;
grant execute on function private.portfolio_vendor_is_public(uuid) to anon, authenticated;

create trigger vendor_media_validate
before insert or update of album_id, vendor_id on public.vendor_portfolio_media
for each row execute function private.validate_portfolio_media();

create trigger vendor_media_sync_album
after insert or delete or update of album_id, is_cover on public.vendor_portfolio_media
for each row execute function private.sync_portfolio_album();

alter table public.vendor_portfolio_albums enable row level security;
alter table public.vendor_portfolio_media enable row level security;
alter table public.vendor_availability enable row level security;
alter table public.vendor_enquiries enable row level security;
alter table public.vendor_notifications enable row level security;

grant select, insert, update, delete on
  public.vendor_portfolio_albums,
  public.vendor_portfolio_media,
  public.vendor_availability,
  public.vendor_enquiries,
  public.vendor_notifications
to authenticated;
grant select on public.vendor_portfolio_albums, public.vendor_portfolio_media to anon;

create policy "albums_public_read" on public.vendor_portfolio_albums
for select using (is_visible and private.portfolio_vendor_is_public(vendor_id));
create policy "albums_owner_manage" on public.vendor_portfolio_albums
for all to authenticated using (private.workspace_vendor_owned(vendor_id))
with check (private.workspace_vendor_owned(vendor_id));

create policy "media_public_read" on public.vendor_portfolio_media
for select using (
  upload_status = 'completed'
  and private.portfolio_vendor_is_public(vendor_id)
  and exists (
    select 1 from public.vendor_portfolio_albums a
    where a.id = album_id and a.vendor_id = vendor_id and a.is_visible
  )
);
create policy "media_owner_manage" on public.vendor_portfolio_media
for all to authenticated using (private.workspace_vendor_owned(vendor_id))
with check (
  private.workspace_vendor_owned(vendor_id)
  and exists (
    select 1 from public.vendor_portfolio_albums a
    where a.id = album_id and a.vendor_id = vendor_id
  )
);

create policy "availability_public_read" on public.vendor_availability
for select using (private.vendor_is_public(vendor_id));
create policy "availability_owner_manage" on public.vendor_availability
for all to authenticated using (private.workspace_vendor_owned(vendor_id))
with check (private.workspace_vendor_owned(vendor_id));

create policy "enquiries_owner_read" on public.vendor_enquiries
for select to authenticated using (
  private.workspace_vendor_owned(vendor_id) or customer_id = auth.uid()
);
create policy "enquiries_customer_create" on public.vendor_enquiries
for insert to authenticated with check (customer_id = auth.uid());
create policy "enquiries_owner_update" on public.vendor_enquiries
for update to authenticated using (private.workspace_vendor_owned(vendor_id))
with check (private.workspace_vendor_owned(vendor_id));

create policy "notifications_owner_manage" on public.vendor_notifications
for all to authenticated using (private.workspace_vendor_owned(vendor_id))
with check (private.workspace_vendor_owned(vendor_id));

-- Preserve old flat portfolio records when an earlier deployment has that table.
-- The general album is created now; application code can safely attach legacy
-- records after reading their historical column shape.
insert into public.vendor_portfolio_albums (vendor_id, title, description)
select v.id, 'General Portfolio', 'Portfolio items imported from the previous gallery.'
from public.vendors v
where to_regclass('public.vendor_portfolio') is not null
  and not exists (
    select 1 from public.vendor_portfolio_albums a
    where a.vendor_id = v.id and a.title = 'General Portfolio'
  );

do $$
declare
  url_column text;
  type_expression text := '''image''';
  public_id_expression text := '''legacy/'' || p.id::text';
begin
  if to_regclass('public.vendor_portfolio') is null
    or not exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'vendor_portfolio' and column_name = 'vendor_id'
    )
  then
    return;
  end if;

  select column_name into url_column
  from information_schema.columns
  where table_schema = 'public' and table_name = 'vendor_portfolio'
    and column_name in ('secure_url', 'media_url', 'image_url', 'url')
  order by array_position(array['secure_url', 'media_url', 'image_url', 'url'], column_name)
  limit 1;
  if url_column is null then return; end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'vendor_portfolio' and column_name = 'resource_type'
  ) then
    type_expression := 'case when p.resource_type = ''video'' then ''video'' else ''image'' end';
  elsif exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'vendor_portfolio' and column_name = 'media_type'
  ) then
    type_expression := 'case when p.media_type = ''video'' then ''video'' else ''image'' end';
  end if;
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'vendor_portfolio' and column_name = 'public_id'
  ) then
    public_id_expression := 'coalesce(nullif(p.public_id, ''''), ''legacy/'' || p.id::text)';
  end if;

  execute format(
    'insert into public.vendor_portfolio_albums
      (vendor_id, title, description, display_order)
     select r.vendor_id,
       case when r.batch_no = 0 then ''General Portfolio''
            else ''General Portfolio '' || (r.batch_no + 1)::text end,
       ''Portfolio items imported from the previous gallery.'',
       r.batch_no
     from (
       select p.vendor_id,
         ((row_number() over (partition by p.vendor_id order by p.id) - 1) / 25)::integer batch_no
       from public.vendor_portfolio p
       where p.%I is not null
     ) r
     group by r.vendor_id, r.batch_no
     on conflict do nothing',
    url_column
  );

  execute format(
    'insert into public.vendor_portfolio_media
      (vendor_id, album_id, secure_url, public_id, resource_type, display_order)
     select p.vendor_id, a.id, p.%I, %s, %s, p.item_order
     from (
       select source.*,
         ((row_number() over (partition by source.vendor_id order by source.id) - 1) / 25)::integer batch_no,
         ((row_number() over (partition by source.vendor_id order by source.id) - 1) %% 25)::integer item_order
       from public.vendor_portfolio source
       where source.%I is not null
     ) p
     join public.vendor_portfolio_albums a
       on a.vendor_id = p.vendor_id
      and a.title = case when p.batch_no = 0 then ''General Portfolio''
                         else ''General Portfolio '' || (p.batch_no + 1)::text end
     on conflict (public_id) do nothing',
    url_column, public_id_expression, type_expression, url_column
  );
end;
$$;

update public.vendor_portfolio_albums a set
  media_count = (select count(*) from public.vendor_portfolio_media m where m.album_id = a.id),
  cover_media_id = coalesce(
    a.cover_media_id,
    (select m.id from public.vendor_portfolio_media m
     where m.album_id = a.id order by m.is_cover desc, m.display_order, m.created_at limit 1)
  );

commit;
