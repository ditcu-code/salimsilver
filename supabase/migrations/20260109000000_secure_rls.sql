-- Create admins table
CREATE TABLE IF NOT EXISTS public.admins (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Allow admins to read the admins table (to check their own status)
CREATE POLICY "Admins can view admins" ON public.admins
    FOR SELECT
    TO authenticated
    USING (auth.uid() IN (SELECT id FROM public.admins));

-- Update Collections Policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.collections;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.collections;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.collections;

CREATE POLICY "Admins can insert collections" ON public.collections
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can update collections" ON public.collections
    FOR UPDATE TO authenticated
    USING (auth.uid() IN (SELECT id FROM public.admins))
    WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can delete collections" ON public.collections
    FOR DELETE TO authenticated
    USING (auth.uid() IN (SELECT id FROM public.admins));

-- Update Jewelry Policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.jewelry;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.jewelry;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.jewelry;

CREATE POLICY "Admins can insert jewelry" ON public.jewelry
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can update jewelry" ON public.jewelry
    FOR UPDATE TO authenticated
    USING (auth.uid() IN (SELECT id FROM public.admins))
    WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can delete jewelry" ON public.jewelry
    FOR DELETE TO authenticated
    USING (auth.uid() IN (SELECT id FROM public.admins));

-- Update Jewelry Images Policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.jewelry_images;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.jewelry_images;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.jewelry_images;

CREATE POLICY "Admins can insert jewelry_images" ON public.jewelry_images
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can update jewelry_images" ON public.jewelry_images
    FOR UPDATE TO authenticated
    USING (auth.uid() IN (SELECT id FROM public.admins))
    WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can delete jewelry_images" ON public.jewelry_images
    FOR DELETE TO authenticated
    USING (auth.uid() IN (SELECT id FROM public.admins));

-- Update Posts Policies (Optimized section from previous migration)
DROP POLICY IF EXISTS "Admin can insert posts" ON public.posts;
DROP POLICY IF EXISTS "Admin can update posts" ON public.posts;
DROP POLICY IF EXISTS "Admin can delete posts" ON public.posts;

CREATE POLICY "Admins can insert posts" ON public.posts
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can update posts" ON public.posts
    FOR UPDATE TO authenticated
    USING (auth.uid() IN (SELECT id FROM public.admins))
    WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can delete posts" ON public.posts
    FOR DELETE TO authenticated
    USING (auth.uid() IN (SELECT id FROM public.admins));
