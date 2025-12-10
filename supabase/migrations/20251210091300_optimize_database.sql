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
