begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
      and is_active
  );
$$;

create function private.owns_vendor(target_vendor_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.vendors v
    join public.profiles p on p.id = v.profile_id
    where v.id = target_vendor_id
      and v.profile_id = (select auth.uid())
      and p.is_active
  );
$$;

create function private.vendor_is_public(target_vendor_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.vendors v
    join public.profiles p on p.id = v.profile_id
    where v.id = target_vendor_id
      and v.is_verified
      and p.is_active
  );
$$;

create function private.protect_profile_privileged_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is not null
     and not (select private.is_admin())
     and (
       new.id is distinct from old.id
       or new.email is distinct from old.email
       or new.role is distinct from old.role
       or new.is_active is distinct from old.is_active
     ) then
    raise exception 'Only administrators may update protected profile fields';
  end if;

  return new;
end;
$$;

create function private.protect_vendor_privileged_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is not null
     and not (select private.is_admin())
     and (
       new.profile_id is distinct from old.profile_id
       or new.id is distinct from old.id
       or new.is_verified is distinct from old.is_verified
       or new.is_featured is distinct from old.is_featured
       or new.subscription_status is distinct from old.subscription_status
     ) then
    raise exception 'Only administrators may update protected vendor fields';
  end if;

  return new;
end;
$$;

revoke all on all functions in schema private from public;
grant usage on schema private to anon, authenticated;
grant execute on function private.is_admin() to anon, authenticated;
grant execute on function private.owns_vendor(uuid) to anon, authenticated;
grant execute on function private.vendor_is_public(uuid) to anon, authenticated;

create trigger profiles_protect_privileged_fields
before update on public.profiles
for each row execute function private.protect_profile_privileged_fields();

create trigger vendors_protect_privileged_fields
before update on public.vendors
for each row execute function private.protect_vendor_privileged_fields();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.vendors enable row level security;
alter table public.vendor_services enable row level security;
alter table public.favorites enable row level security;
alter table public.subscriptions enable row level security;
alter table public.reviews enable row level security;

revoke all on public.profiles, public.categories, public.vendors,
  public.vendor_services, public.favorites, public.subscriptions, public.reviews
  from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.categories, public.vendors, public.vendor_services, public.reviews
  to anon;
grant select, insert, update, delete on public.profiles, public.categories,
  public.vendors, public.vendor_services, public.favorites, public.subscriptions,
  public.reviews
  to authenticated;

create policy "profiles_select_own_or_admin"
on public.profiles for select
to authenticated
using (
  id = (select auth.uid())
  or (select private.is_admin())
);

create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (
  id = (select auth.uid())
  and email = (select auth.jwt() ->> 'email')
  and role in ('public_user', 'vendor')
  and is_active
);

create policy "profiles_update_own_or_admin"
on public.profiles for update
to authenticated
using (
  id = (select auth.uid())
  or (select private.is_admin())
)
with check (
  id = (select auth.uid())
  or (select private.is_admin())
);

create policy "profiles_delete_admin"
on public.profiles for delete
to authenticated
using ((select private.is_admin()));

create policy "categories_public_read"
on public.categories for select
to anon, authenticated
using (true);

create policy "categories_admin_insert"
on public.categories for insert
to authenticated
with check ((select private.is_admin()));

create policy "categories_admin_update"
on public.categories for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "categories_admin_delete"
on public.categories for delete
to authenticated
using ((select private.is_admin()));

create policy "vendors_public_owner_admin_read"
on public.vendors for select
to anon, authenticated
using (
  (select private.vendor_is_public(id))
  or profile_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "vendors_vendor_or_admin_insert"
on public.vendors for insert
to authenticated
with check (
  (
    profile_id = (select auth.uid())
    and exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid())
        and p.role = 'vendor'
        and p.is_active
    )
    and not is_verified
    and not is_featured
    and subscription_status = 'pending'
  )
  or (select private.is_admin())
);

create policy "vendors_owner_or_admin_update"
on public.vendors for update
to authenticated
using (
  (select private.owns_vendor(id))
  or (select private.is_admin())
)
with check (
  (
    profile_id = (select auth.uid())
    and exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid()) and p.is_active
    )
  )
  or (select private.is_admin())
);

create policy "vendors_owner_or_admin_delete"
on public.vendors for delete
to authenticated
using (
  (select private.owns_vendor(id))
  or (select private.is_admin())
);

create policy "vendor_services_public_owner_admin_read"
on public.vendor_services for select
to anon, authenticated
using (
  (is_active and (select private.vendor_is_public(vendor_id)))
  or (select private.owns_vendor(vendor_id))
  or (select private.is_admin())
);

create policy "vendor_services_owner_or_admin_insert"
on public.vendor_services for insert
to authenticated
with check (
  (select private.owns_vendor(vendor_id))
  or (select private.is_admin())
);

create policy "vendor_services_owner_or_admin_update"
on public.vendor_services for update
to authenticated
using (
  (select private.owns_vendor(vendor_id))
  or (select private.is_admin())
)
with check (
  (select private.owns_vendor(vendor_id))
  or (select private.is_admin())
);

create policy "vendor_services_owner_or_admin_delete"
on public.vendor_services for delete
to authenticated
using (
  (select private.owns_vendor(vendor_id))
  or (select private.is_admin())
);

create policy "favorites_owner_or_admin_read"
on public.favorites for select
to authenticated
using (
  profile_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "favorites_owner_insert"
on public.favorites for insert
to authenticated
with check (
  profile_id = (select auth.uid())
  and exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.is_active
  )
  and (select private.vendor_is_public(vendor_id))
);

create policy "favorites_owner_or_admin_delete"
on public.favorites for delete
to authenticated
using (
  profile_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "subscriptions_owner_or_admin_read"
on public.subscriptions for select
to authenticated
using (
  (select private.owns_vendor(vendor_id))
  or (select private.is_admin())
);

create policy "subscriptions_admin_insert"
on public.subscriptions for insert
to authenticated
with check ((select private.is_admin()));

create policy "subscriptions_admin_update"
on public.subscriptions for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "subscriptions_admin_delete"
on public.subscriptions for delete
to authenticated
using ((select private.is_admin()));

create policy "reviews_public_read"
on public.reviews for select
to anon, authenticated
using ((select private.vendor_is_public(vendor_id)) or (select private.is_admin()));

create policy "reviews_user_insert"
on public.reviews for insert
to authenticated
with check (
  profile_id = (select auth.uid())
  and exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.is_active
  )
  and (select private.vendor_is_public(vendor_id))
  and not (select private.owns_vendor(vendor_id))
);

create policy "reviews_owner_or_admin_update"
on public.reviews for update
to authenticated
using (
  profile_id = (select auth.uid())
  or (select private.is_admin())
)
with check (
  profile_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "reviews_owner_or_admin_delete"
on public.reviews for delete
to authenticated
using (
  profile_id = (select auth.uid())
  or (select private.is_admin())
);

commit;
