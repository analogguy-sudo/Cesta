-- Cesta im Schichterfassung-Projekt (pltjkedvinvllmlivbsn).
-- Alle Tabellen tragen das Präfix cesta_, damit nichts mit Schichterfassung, Analoge Welt oder Pacos Weg kollidiert.
-- Ein Haushalt teilt Sortiment, Einkaufsliste und Vorrat; Mitglieder kommen nur per Einladungscode hinzu.
-- Im Supabase SQL Editor ausführen; mehrfaches Ausführen schadet nicht.

create table if not exists public.cesta_households (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Zuhause',
  created_at timestamptz not null default now()
);

create table if not exists public.cesta_members (
  household_id uuid not null references public.cesta_households on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (household_id, user_id)
);

create table if not exists public.cesta_categories (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.cesta_households on delete cascade,
  sort integer not null default 0,
  de text not null,
  es text not null default ''
);

create table if not exists public.cesta_products (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.cesta_households on delete cascade,
  category_id uuid references public.cesta_categories on delete set null,
  de text not null,
  es text not null default '',
  emoji text not null default '🛒',
  on_list boolean not null default false,
  list_qty integer not null default 1 check (list_qty > 0),
  done boolean not null default false,
  stock_qty integer not null default 0 check (stock_qty >= 0),
  unit text not null default 'pack',
  threshold integer not null default 0 check (threshold >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.cesta_invites (
  code text primary key,
  household_id uuid not null references public.cesta_households on delete cascade,
  created_by uuid not null references auth.users on delete cascade,
  expires_at timestamptz not null default now() + interval '7 days'
);

create index if not exists cesta_members_user_idx on public.cesta_members (user_id);
create index if not exists cesta_categories_household_idx on public.cesta_categories (household_id);
create index if not exists cesta_products_household_idx on public.cesta_products (household_id);

-- Mitgliedschaft prüfen, ohne dass die Regel von cesta_members sich selbst aufruft.
create or replace function public.cesta_is_member(h uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from cesta_members where household_id = h and user_id = auth.uid());
$$;

-- Liefert den Haushalt des angemeldeten Nutzers; legt beim ersten Aufruf einen leeren an.
create or replace function public.cesta_my_household() returns uuid
language plpgsql security definer set search_path = public as $$
declare h uuid;
begin
  if auth.uid() is null then raise exception 'nicht angemeldet'; end if;
  select household_id into h from cesta_members where user_id = auth.uid() order by joined_at limit 1;
  if h is null then
    insert into cesta_households default values returning id into h;
    insert into cesta_members (household_id, user_id) values (h, auth.uid());
  end if;
  return h;
end $$;

-- Einmaliger Code, 7 Tage gültig.
create or replace function public.cesta_create_invite() returns text
language plpgsql security definer set search_path = public as $$
declare h uuid := cesta_my_household(); c text;
begin
  delete from cesta_invites where expires_at < now();
  c := upper(substr(md5(gen_random_uuid()::text), 1, 8));
  insert into cesta_invites (code, household_id, created_by) values (c, h, auth.uid());
  return c;
end $$;

-- Tritt einem Haushalt bei und verlässt dabei den bisherigen; ein verwaister Haushalt wird gelöscht.
create or replace function public.cesta_join(invite_code text) returns uuid
language plpgsql security definer set search_path = public as $$
declare h uuid;
begin
  if auth.uid() is null then raise exception 'nicht angemeldet'; end if;
  select household_id into h from cesta_invites
    where code = upper(trim(invite_code)) and expires_at > now();
  if h is null then raise exception 'Code ungültig oder abgelaufen'; end if;
  delete from cesta_members where user_id = auth.uid() and household_id <> h;
  delete from cesta_households x where not exists (select 1 from cesta_members m where m.household_id = x.id);
  insert into cesta_members (household_id, user_id) values (h, auth.uid()) on conflict do nothing;
  delete from cesta_invites where code = upper(trim(invite_code));
  return h;
end $$;

-- Nur E-Mail-Adressen der Mitglieder des eigenen Haushalts.
create or replace function public.cesta_member_emails() returns table (email text)
language sql stable security definer set search_path = public as $$
  select u.email::text from cesta_members m join auth.users u on u.id = m.user_id
  where m.household_id in (select household_id from cesta_members where user_id = auth.uid())
  order by m.joined_at;
$$;

revoke all on function public.cesta_is_member(uuid), public.cesta_my_household(), public.cesta_create_invite(),
  public.cesta_join(text), public.cesta_member_emails() from public, anon;
grant execute on function public.cesta_is_member(uuid), public.cesta_my_household(), public.cesta_create_invite(),
  public.cesta_join(text), public.cesta_member_emails() to authenticated;

alter table public.cesta_households enable row level security;
alter table public.cesta_members enable row level security;
alter table public.cesta_categories enable row level security;
alter table public.cesta_products enable row level security;
alter table public.cesta_invites enable row level security; -- ohne Regeln: nur über die Funktionen erreichbar

drop policy if exists "Cesta: eigener Haushalt" on public.cesta_households;
create policy "Cesta: eigener Haushalt" on public.cesta_households for select to authenticated
  using (public.cesta_is_member(id));
drop policy if exists "Cesta: Haushalt umbenennen" on public.cesta_households;
create policy "Cesta: Haushalt umbenennen" on public.cesta_households for update to authenticated
  using (public.cesta_is_member(id)) with check (public.cesta_is_member(id));

drop policy if exists "Cesta: Mitglieder sehen" on public.cesta_members;
create policy "Cesta: Mitglieder sehen" on public.cesta_members for select to authenticated
  using (public.cesta_is_member(household_id));

drop policy if exists "Cesta: Kategorien des Haushalts" on public.cesta_categories;
create policy "Cesta: Kategorien des Haushalts" on public.cesta_categories for all to authenticated
  using (public.cesta_is_member(household_id)) with check (public.cesta_is_member(household_id));

drop policy if exists "Cesta: Produkte des Haushalts" on public.cesta_products;
create policy "Cesta: Produkte des Haushalts" on public.cesta_products for all to authenticated
  using (public.cesta_is_member(household_id)) with check (public.cesta_is_member(household_id));

revoke all on public.cesta_households, public.cesta_members, public.cesta_categories,
  public.cesta_products, public.cesta_invites from anon;

-- Live-Abgleich zwischen den Geräten des Haushalts.
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'cesta_products') then
    alter publication supabase_realtime add table public.cesta_products;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'cesta_categories') then
    alter publication supabase_realtime add table public.cesta_categories;
  end if;
end $$;
