-- Consolidated Migration File
-- Generated: 2025-12-16

-- Section 1: Initial Schema (from 20251208151700_remote_schema.sql)
drop extension if exists "pg_net";

create type "public"."jewelry_status" as enum ('available', 'sold', 'reserved', 'hidden');

create type "public"."material_type" as enum ('gold', 'silver', 'copper', 'brass');


  create table "public"."collections" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "slug" text not null,
    "title" text not null,
    "description" text,
    "cover_image_id" uuid,
    "featured" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."collections" enable row level security;


  create table "public"."jewelry" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "collection_id" uuid,
    "slug" text not null,
    "title" text not null,
    "description" text,
    "material" public.material_type,
    "material_purity" text,
    "weight_grams" numeric,
    "crafting_time_hours" integer,
    "production_year" integer,
    "status" public.jewelry_status default 'available'::public.jewelry_status,
    "variants" jsonb,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."jewelry" enable row level security;


  create table "public"."jewelry_images" (
    "id" uuid not null default extensions.uuid_generate_v4(),
    "jewelry_id" uuid,
    "src" text not null,
    "display_order" integer default 0,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."jewelry_images" enable row level security;

CREATE UNIQUE INDEX collections_pkey ON public.collections USING btree (id);

CREATE UNIQUE INDEX collections_slug_key ON public.collections USING btree (slug);

CREATE UNIQUE INDEX jewelry_images_pkey ON public.jewelry_images USING btree (id);

CREATE UNIQUE INDEX jewelry_pkey ON public.jewelry USING btree (id);

CREATE UNIQUE INDEX jewelry_slug_key ON public.jewelry USING btree (slug);

alter table "public"."collections" add constraint "collections_pkey" PRIMARY KEY using index "collections_pkey";

alter table "public"."jewelry" add constraint "jewelry_pkey" PRIMARY KEY using index "jewelry_pkey";

alter table "public"."jewelry_images" add constraint "jewelry_images_pkey" PRIMARY KEY using index "jewelry_images_pkey";

alter table "public"."collections" add constraint "collections_slug_key" UNIQUE using index "collections_slug_key";

alter table "public"."collections" add constraint "fk_collection_cover_image" FOREIGN KEY (cover_image_id) REFERENCES public.jewelry_images(id) ON DELETE SET NULL not valid;

alter table "public"."collections" validate constraint "fk_collection_cover_image";

alter table "public"."jewelry" add constraint "jewelry_collection_id_fkey" FOREIGN KEY (collection_id) REFERENCES public.collections(id) ON DELETE CASCADE not valid;

alter table "public"."jewelry" validate constraint "jewelry_collection_id_fkey";

alter table "public"."jewelry" add constraint "jewelry_slug_key" UNIQUE using index "jewelry_slug_key";

alter table "public"."jewelry_images" add constraint "jewelry_images_jewelry_id_fkey" FOREIGN KEY (jewelry_id) REFERENCES public.jewelry(id) ON DELETE CASCADE not valid;

alter table "public"."jewelry_images" validate constraint "jewelry_images_jewelry_id_fkey";

grant delete on table "public"."collections" to "anon";

grant insert on table "public"."collections" to "anon";

grant references on table "public"."collections" to "anon";

grant select on table "public"."collections" to "anon";

grant trigger on table "public"."collections" to "anon";

grant truncate on table "public"."collections" to "anon";

grant update on table "public"."collections" to "anon";

grant delete on table "public"."collections" to "authenticated";

grant insert on table "public"."collections" to "authenticated";

grant references on table "public"."collections" to "authenticated";

grant select on table "public"."collections" to "authenticated";

grant trigger on table "public"."collections" to "authenticated";

grant truncate on table "public"."collections" to "authenticated";

grant update on table "public"."collections" to "authenticated";

grant delete on table "public"."collections" to "service_role";

grant insert on table "public"."collections" to "service_role";

grant references on table "public"."collections" to "service_role";

grant select on table "public"."collections" to "service_role";

grant trigger on table "public"."collections" to "service_role";

grant truncate on table "public"."collections" to "service_role";

grant update on table "public"."collections" to "service_role";

grant delete on table "public"."jewelry" to "anon";

grant insert on table "public"."jewelry" to "anon";

grant references on table "public"."jewelry" to "anon";

grant select on table "public"."jewelry" to "anon";

grant trigger on table "public"."jewelry" to "anon";

grant truncate on table "public"."jewelry" to "anon";

grant update on table "public"."jewelry" to "anon";

grant delete on table "public"."jewelry" to "authenticated";

grant insert on table "public"."jewelry" to "authenticated";

grant references on table "public"."jewelry" to "authenticated";

grant select on table "public"."jewelry" to "authenticated";

grant trigger on table "public"."jewelry" to "authenticated";

grant truncate on table "public"."jewelry" to "authenticated";

grant update on table "public"."jewelry" to "authenticated";

grant delete on table "public"."jewelry" to "service_role";

grant insert on table "public"."jewelry" to "service_role";

grant references on table "public"."jewelry" to "service_role";

grant select on table "public"."jewelry" to "service_role";

grant trigger on table "public"."jewelry" to "service_role";

grant truncate on table "public"."jewelry" to "service_role";

grant update on table "public"."jewelry" to "service_role";

grant delete on table "public"."jewelry_images" to "anon";

grant insert on table "public"."jewelry_images" to "anon";

grant references on table "public"."jewelry_images" to "anon";

grant select on table "public"."jewelry_images" to "anon";

grant trigger on table "public"."jewelry_images" to "anon";

grant truncate on table "public"."jewelry_images" to "anon";

grant update on table "public"."jewelry_images" to "anon";

grant delete on table "public"."jewelry_images" to "authenticated";

grant insert on table "public"."jewelry_images" to "authenticated";

grant references on table "public"."jewelry_images" to "authenticated";

grant select on table "public"."jewelry_images" to "authenticated";

grant trigger on table "public"."jewelry_images" to "authenticated";

grant truncate on table "public"."jewelry_images" to "authenticated";

grant update on table "public"."jewelry_images" to "authenticated";

grant delete on table "public"."jewelry_images" to "service_role";

grant insert on table "public"."jewelry_images" to "service_role";

grant references on table "public"."jewelry_images" to "service_role";

grant select on table "public"."jewelry_images" to "service_role";

grant trigger on table "public"."jewelry_images" to "service_role";

grant truncate on table "public"."jewelry_images" to "service_role";

grant update on table "public"."jewelry_images" to "service_role";


  create policy "Allow public read access on collections"
  on "public"."collections"
  as permissive
  for select
  to public
using (true);



  create policy "Allow public read access on jewelry"
  on "public"."jewelry"
  as permissive
  for select
  to public
using (true);



  create policy "Allow public read access on jewelry_images"
  on "public"."jewelry_images"
  as permissive
  for select
  to public
using (true);


-- Section 2: Admin Policies (from 20251208160000_add_admin_policies.sql)
-- Allow authenticated users to insert, update, delete on collections
create policy "Enable insert for authenticated users only" on "public"."collections"
as permissive for insert to authenticated with check (true);

create policy "Enable update for authenticated users only" on "public"."collections"
as permissive for update to authenticated using (true) with check (true);

create policy "Enable delete for authenticated users only" on "public"."collections"
as permissive for delete to authenticated using (true);

-- Allow authenticated users to insert, update, delete on jewelry
create policy "Enable insert for authenticated users only" on "public"."jewelry"
as permissive for insert to authenticated with check (true);

create policy "Enable update for authenticated users only" on "public"."jewelry"
as permissive for update to authenticated using (true) with check (true);

create policy "Enable delete for authenticated users only" on "public"."jewelry"
as permissive for delete to authenticated using (true);

-- Allow authenticated users to insert, update, delete on jewelry_images
create policy "Enable insert for authenticated users only" on "public"."jewelry_images"
as permissive for insert to authenticated with check (true);

create policy "Enable update for authenticated users only" on "public"."jewelry_images"
as permissive for update to authenticated using (true) with check (true);

create policy "Enable delete for authenticated users only" on "public"."jewelry_images"
as permissive for delete to authenticated using (true);

-- Storage policies if needed (usually handled in dashboard, but good to note)
-- Assuming storage policies are already set or will be managed separately.

-- Section 3: Storage Policies (from 20251209070000_add_storage_policies.sql)
-- Allow public access to view files in catalog bucket
create policy "Give public access to catalog files" on "storage"."objects"
as permissive for select to public using (bucket_id = 'catalog');

-- Allow authenticated users to upload files to catalog bucket
create policy "Allow authenticated uploads to catalog" on "storage"."objects"
as permissive for insert to authenticated with check (bucket_id = 'catalog');

-- Allow authenticated users to update files in catalog bucket
create policy "Allow authenticated updates to catalog" on "storage"."objects"
as permissive for update to authenticated using (bucket_id = 'catalog');

-- Allow authenticated users to delete files in catalog bucket
create policy "Allow authenticated deletes to catalog" on "storage"."objects"
as permissive for delete to authenticated using (bucket_id = 'catalog');

-- Section 4: Blog (from 20251210000000_init_blog.sql)
-- Create posts table with new columns
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  cover_image_url text,
  meta_title text,
  meta_description text,
  published boolean default false,
  published_at timestamptz,
  tags text[] default '{}',
  featured boolean default false,
  author_id uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table posts enable row level security;

-- Policies for posts
create policy "Public can view published posts"
  on posts for select
  using (published = true);

create policy "Admin can view all posts"
  on posts for select
  using (auth.role() = 'authenticated');

create policy "Admin can insert posts"
  on posts for insert
  with check (auth.role() = 'authenticated');

create policy "Admin can update posts"
  on posts for update
  using (auth.role() = 'authenticated');

create policy "Admin can delete posts"
  on posts for delete
  using (auth.role() = 'authenticated');

-- Create blog bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog', 'blog', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog' );

CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Update Delete"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'blog' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'blog' AND auth.role() = 'authenticated' );

-- Seed Data with Tags and Featured flag
INSERT INTO public.posts (
  slug,
  title,
  excerpt,
  content,
  cover_image_url,
  meta_title,
  meta_description,
  published,
  published_at,
  tags,
  featured
) VALUES (
  'art-of-javanese-silver',
  'The Art of Javanese Silver Crafting',
  'Discover the intricate process behind our handmade silver jewelry, passed down through generations in Kotagede.',
  '<h2>A Legacy of Craftsmanship</h2><p>In the heart of Kotagede, the ancient capital of the Mataram Kingdom, the rhythmic tapping of small hammers against silver has echoed for centuries. This is where <strong>Salim Silver</strong> finds its roots.</p><p>Javanese silver crafting is distinct for its focus on <em>filigree</em> (intricate metalwork) and deep relief carving. Unlike mass-produced jewelry, each piece tells a story of patience and precision.</p><h3>The Process</h3><ul><li><strong>Purification:</strong> We start with high-purity silver granules.</li><li><strong>Alloying:</strong> Mixing with copper to create durable Sterling Silver (925).</li><li><strong>Formation:</strong> Drawing silver into fine wires for filigree or sheets for carving.</li><li><strong>Assembly:</strong> Each element is soldered by hand using traditional techniques.</li></ul><p>When you wear a piece of Javanese silver, you are wearing a piece of history, preserved by the hands of our master artisans.</p>',
  'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-rings-couple-salimsilver.webp',
  'The Art of Javanese Silver Crafting | Salim Silver',
  'Learn about the traditional techniques of Javanese silver making.',
  true,
  NOW(),
  ARRAY['Culture', 'Craftsmanship'],
  true
) ON CONFLICT (slug) DO UPDATE SET
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured;

-- Section 5: Optimization & Fixes (from 20251210091300_optimize_database.sql)
-- Fix RLS policies for posts table
drop policy if exists "Public can view published posts" on posts;
drop policy if exists "Admin can view all posts" on posts;
drop policy if exists "Admin can insert posts" on posts;
drop policy if exists "Admin can update posts" on posts;
drop policy if exists "Admin can delete posts" on posts;

create policy "View posts"
  on posts for select
  using (
    published = true
    or
    (select auth.role()) = 'authenticated'
  );

create policy "Admin can insert posts"
  on posts for insert
  to authenticated
  with check (true);

create policy "Admin can update posts"
  on posts for update
  to authenticated
  using (true)
  with check (true);

create policy "Admin can delete posts"
  on posts for delete
  to authenticated
  using (true);

-- Add missing indexes for foreign keys
create index if not exists idx_collections_cover_image_id on public.collections(cover_image_id);
create index if not exists idx_jewelry_collection_id on public.jewelry(collection_id);
create index if not exists idx_jewelry_images_jewelry_id on public.jewelry_images(jewelry_id);
create index if not exists idx_posts_author_id on public.posts(author_id);
