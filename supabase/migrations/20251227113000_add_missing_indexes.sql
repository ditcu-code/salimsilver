-- Add missing indexes for foreign keys (reinstating previously dropped indexes)

-- Reinstate index for collections.cover_image_id
create index if not exists idx_collections_cover_image_id on public.collections(cover_image_id);

-- Reinstate index for posts.author_id
create index if not exists idx_posts_author_id on public.posts(author_id);
