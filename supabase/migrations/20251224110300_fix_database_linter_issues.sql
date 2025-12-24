-- Fix database linter issues

-- 1. Unindexed foreign keys
-- Add index for collections.created_by
create index if not exists idx_collections_created_by on public.collections(created_by);

-- Add index for jewelry.created_by
create index if not exists idx_jewelry_created_by on public.jewelry(created_by);

-- Add index for jewelry_images.created_by
create index if not exists idx_jewelry_images_created_by on public.jewelry_images(created_by);

-- 2. Unused indexes
-- Remove unused index on collections.cover_image_id
drop index if exists idx_collections_cover_image_id;

-- Remove unused index on posts.author_id
drop index if exists idx_posts_author_id;

-- 3. Fix Auth RLS Initialization Plan
-- Wrap auth.uid() in (select auth.uid()) to avoid re-evaluation for each row

-- Fix "Users can insert their own profile."
drop policy if exists "Users can insert their own profile." on public.users;

create policy "Users can insert their own profile."
  on public.users for insert
  with check ( (select auth.uid()) = id );

-- Fix "Users can update own profile."
drop policy if exists "Users can update own profile." on public.users;

create policy "Users can update own profile."
  on public.users for update
  using ( (select auth.uid()) = id );
