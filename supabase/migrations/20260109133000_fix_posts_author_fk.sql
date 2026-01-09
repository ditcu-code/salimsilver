-- Resize posts author_id relationship
-- Change reference from auth.users to public.users to allow PostgREST embedding

DO $$ 
BEGIN
  -- Drop the existing constraint if it exists (try standard name)
  IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'posts_author_id_fkey') THEN
    ALTER TABLE public.posts DROP CONSTRAINT posts_author_id_fkey;
  END IF;

  -- Add the new constraint referencing public.users
  ALTER TABLE public.posts
  ADD CONSTRAINT posts_author_id_fkey
  FOREIGN KEY (author_id)
  REFERENCES public.users(id)
  ON DELETE SET NULL;
  
  -- Re-create the index if needed (it already exists usually as idx_posts_author_id)
  -- create index if not exists idx_posts_author_id on public.posts(author_id);
END $$;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
