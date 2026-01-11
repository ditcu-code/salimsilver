-- Add views column to posts table
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Create RPC function to increment views atomically
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$;

-- Grant execute permission to public (or authenticated depending on needs, stick to public for read counters often)
GRANT EXECUTE ON FUNCTION increment_post_views(UUID) TO public;
GRANT EXECUTE ON FUNCTION increment_post_views(UUID) TO anon;
GRANT EXECUTE ON FUNCTION increment_post_views(UUID) TO authenticated;
