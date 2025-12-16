-- Fix handle_new_user function to handle missing metadata gracefully
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, full_name, avatar_url, email, role)
  values (
    new.id,
    -- Fallback to metadata full_name, then email username, then 'New User'
    coalesce(
        new.raw_user_meta_data->>'full_name', 
        split_part(new.email, '@', 1),
        'New User'
    ),
    new.raw_user_meta_data->>'avatar_url',
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$;
