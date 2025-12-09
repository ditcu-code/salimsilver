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
