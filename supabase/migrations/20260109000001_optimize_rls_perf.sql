-- Optimize RLS policies to prevent per-row evaluation of auth.uid()
-- Replaces usage of `auth.uid()` with `(select auth.uid())`

-- Admins Table
DROP POLICY IF EXISTS "Admins can view admins" ON public.admins;
CREATE POLICY "Admins can view admins" ON public.admins
    FOR SELECT TO authenticated
    USING ((select auth.uid()) IN (SELECT id FROM public.admins));

-- Collections
DROP POLICY IF EXISTS "Admins can insert collections" ON public.collections;
DROP POLICY IF EXISTS "Admins can update collections" ON public.collections;
DROP POLICY IF EXISTS "Admins can delete collections" ON public.collections;

CREATE POLICY "Admins can insert collections" ON public.collections
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can update collections" ON public.collections
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) IN (SELECT id FROM public.admins))
    WITH CHECK ((select auth.uid()) IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can delete collections" ON public.collections
    FOR DELETE TO authenticated
    USING ((select auth.uid()) IN (SELECT id FROM public.admins));

-- Jewelry
DROP POLICY IF EXISTS "Admins can insert jewelry" ON public.jewelry;
DROP POLICY IF EXISTS "Admins can update jewelry" ON public.jewelry;
DROP POLICY IF EXISTS "Admins can delete jewelry" ON public.jewelry;

CREATE POLICY "Admins can insert jewelry" ON public.jewelry
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can update jewelry" ON public.jewelry
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) IN (SELECT id FROM public.admins))
    WITH CHECK ((select auth.uid()) IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can delete jewelry" ON public.jewelry
    FOR DELETE TO authenticated
    USING ((select auth.uid()) IN (SELECT id FROM public.admins));

-- Jewelry Images
DROP POLICY IF EXISTS "Admins can insert jewelry_images" ON public.jewelry_images;
DROP POLICY IF EXISTS "Admins can update jewelry_images" ON public.jewelry_images;
DROP POLICY IF EXISTS "Admins can delete jewelry_images" ON public.jewelry_images;

CREATE POLICY "Admins can insert jewelry_images" ON public.jewelry_images
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can update jewelry_images" ON public.jewelry_images
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) IN (SELECT id FROM public.admins))
    WITH CHECK ((select auth.uid()) IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can delete jewelry_images" ON public.jewelry_images
    FOR DELETE TO authenticated
    USING ((select auth.uid()) IN (SELECT id FROM public.admins));

-- Posts
DROP POLICY IF EXISTS "Admins can insert posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.posts;

CREATE POLICY "Admins can insert posts" ON public.posts
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can update posts" ON public.posts
    FOR UPDATE TO authenticated
    USING ((select auth.uid()) IN (SELECT id FROM public.admins))
    WITH CHECK ((select auth.uid()) IN (SELECT id FROM public.admins));

CREATE POLICY "Admins can delete posts" ON public.posts
    FOR DELETE TO authenticated
    USING ((select auth.uid()) IN (SELECT id FROM public.admins));
