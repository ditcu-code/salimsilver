-- Fix infinite recursion in admins table RLS policy
-- Previous policy was recursively checking the admins table
-- New policy strictly checks current auth.uid against the row id

DROP POLICY IF EXISTS "Admins can view admins" ON public.admins;

CREATE POLICY "Admins can view own admin data" ON public.admins
    FOR SELECT TO authenticated
    USING (id = auth.uid());
