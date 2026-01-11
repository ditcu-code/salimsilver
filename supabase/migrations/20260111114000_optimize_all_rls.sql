-- Optimize RLS policies to prevent per-row evaluation of auth functions
-- Replaces usage of `auth.uid()` and `auth.role()` with `(select auth.uid())` and `(select auth.role())`

-- 1. Fix public.admins "Admins can view own admin data"
-- Detected from: 20260109140000_fix_admin_policy_recursion.sql
DROP POLICY IF EXISTS "Admins can view own admin data" ON public.admins;

CREATE POLICY "Admins can view own admin data" ON public.admins
    FOR SELECT TO authenticated
    USING (id = (select auth.uid()));

-- 2. Fix storage.objects policies for 'blog' bucket
-- Detected from: 20251216000000_consolidated_schema.sql
DROP POLICY IF EXISTS "Admin Upload" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Delete" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;

CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog' AND (select auth.role()) = 'authenticated' );

CREATE POLICY "Admin Update Delete"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'blog' AND (select auth.role()) = 'authenticated' );

CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'blog' AND (select auth.role()) = 'authenticated' );
