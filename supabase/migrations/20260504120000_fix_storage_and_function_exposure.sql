-- Public buckets can serve known object URLs without broad SELECT policies.
-- Removing these policies prevents clients from listing every object in each bucket.
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Give public access to catalog files" on storage.objects;
drop policy if exists "Public Access Models Bucket" on storage.objects;

-- Keep model management available to signed-in Pinten users without allowing
-- unauthenticated bucket listing.
drop policy if exists "Allow authenticated uploads to models" on storage.objects;
drop policy if exists "Allow authenticated updates to models" on storage.objects;
drop policy if exists "Allow authenticated deletes to models" on storage.objects;

create policy "Allow authenticated uploads to models"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'models');

create policy "Allow authenticated updates to models"
on storage.objects
for update
to authenticated
using (bucket_id = 'models')
with check (bucket_id = 'models');

create policy "Allow authenticated deletes to models"
on storage.objects
for delete
to authenticated
using (bucket_id = 'models');

-- Tighten the public RPC surface. These functions are still available to
-- triggers, cron-owned execution, and backend service-role code where needed.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.recalculate_jewelry_prices() from public, anon, authenticated;

create or replace function public.increment_post_views(post_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.posts
  set views = coalesce(views, 0) + 1
  where id = post_id
    and published = true;
end;
$$;

revoke execute on function public.increment_post_views(uuid) from public, anon, authenticated;
grant execute on function public.increment_post_views(uuid) to service_role;
grant execute on function public.recalculate_jewelry_prices() to service_role;
grant execute on function public.handle_new_user() to service_role;

-- Prevent future public-schema functions created by postgres from becoming
-- API-callable by default. Explicitly grant EXECUTE for intended public RPCs.
alter default privileges for role postgres in schema public revoke execute on functions from public;
alter default privileges for role postgres in schema public revoke execute on functions from anon, authenticated;
