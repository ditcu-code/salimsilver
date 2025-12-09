-- Allow public access to view files in catalog bucket
create policy "Give public access to catalog files" on "storage"."objects"
as permissive for select to public using (bucket_id = 'catalog');

-- Allow authenticated users to upload files to catalog bucket
create policy "Allow authenticated uploads to catalog" on "storage"."objects"
as permissive for insert to authenticated with check (bucket_id = 'catalog');

-- Allow authenticated users to update files in catalog bucket
create policy "Allow authenticated updates to catalog" on "storage"."objects"
as permissive for update to authenticated using (bucket_id = 'catalog');

-- Allow authenticated users to delete files in catalog bucket
create policy "Allow authenticated deletes to catalog" on "storage"."objects"
as permissive for delete to authenticated using (bucket_id = 'catalog');
