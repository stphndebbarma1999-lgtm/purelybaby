-- PurelyBaby initial schema: profiles, catalog, banners, content, cart, orders.
-- Run via scripts/run-migrations.mjs against the Supabase Postgres instance.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "profiles: update own (not is_admin)" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id and is_admin = (select is_admin from public.profiles p where p.id = auth.uid()));

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  icon_url text not null default '',
  bg text not null default 'mint',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "categories: public read" on public.categories
  for select using (true);
create policy "categories: admin write" on public.categories
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  image_url text not null default '',
  images text[] not null default '{}',
  colors jsonb not null default '[]',
  price numeric(10, 2) not null,
  original_price numeric(10, 2),
  rating numeric(2, 1) not null default 0,
  review_count int not null default 0,
  badge text,
  category_id uuid references public.categories(id) on delete set null,
  is_best_seller boolean not null default false,
  is_new_arrival boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "products: public read active" on public.products
  for select using (is_active or public.is_admin());
create policy "products: admin write" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  rating int not null default 5,
  avatar_url text not null default '',
  is_published boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "testimonials: public read published" on public.testimonials
  for select using (is_published or public.is_admin());
create policy "testimonials: admin write" on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- banners (sliding hero banner, desktop + mobile images)
-- ---------------------------------------------------------------------------
create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  subtitle text not null default '',
  cta_label text not null default '',
  href text not null default '/shop',
  desktop_image_url text not null default '',
  mobile_image_url text not null default '',
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.banners enable row level security;

create policy "banners: public read active" on public.banners
  for select using (is_active or public.is_admin());
create policy "banners: admin write" on public.banners
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- content_blocks (key/value JSON for logo, announcement bar, newsletter, etc.)
-- ---------------------------------------------------------------------------
create table if not exists public.content_blocks (
  key text primary key,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.content_blocks enable row level security;

create policy "content_blocks: public read" on public.content_blocks
  for select using (true);
create policy "content_blocks: admin write" on public.content_blocks
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- carts / cart_items
-- ---------------------------------------------------------------------------
create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.carts enable row level security;

create policy "carts: own" on public.carts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity int not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (cart_id, product_id)
);

alter table public.cart_items enable row level security;

create policy "cart_items: own" on public.cart_items
  for all using (
    exists (select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- orders / order_items
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'cancelled', 'fulfilled')),
  payment_method text not null default 'razorpay',
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  subtotal numeric(10, 2) not null,
  total numeric(10, 2) not null,
  shipping_address jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "orders: own read" on public.orders
  for select using (auth.uid() = user_id or public.is_admin());
create policy "orders: own insert" on public.orders
  for insert with check (auth.uid() = user_id);
create policy "orders: admin update" on public.orders
  for update using (public.is_admin()) with check (public.is_admin());

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  title text not null,
  price numeric(10, 2) not null,
  quantity int not null default 1
);

alter table public.order_items enable row level security;

create policy "order_items: own read" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())
    )
  );
create policy "order_items: own insert" on public.order_items
  for insert with check (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- storage: public "media" bucket for product/category/banner/logo images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media: public read" on storage.objects
  for select using (bucket_id = 'media');
create policy "media: admin write" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());
create policy "media: admin update" on storage.objects
  for update using (bucket_id = 'media' and public.is_admin());
create policy "media: admin delete" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());
