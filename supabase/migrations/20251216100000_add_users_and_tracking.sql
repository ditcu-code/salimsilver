-- Create public.users table to sync with auth.users
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text not null,
  avatar_url text,
  email text,
  role text default 'customer',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.users enable row level security;

-- Policies for public.users
create policy "Public profiles are viewable by everyone."
  on public.users for select
  using ( true );

create policy "Users can insert their own profile."
  on public.users for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.users for update
  using ( auth.uid() = id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, full_name, avatar_url, email, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$;

-- Trigger to call handle_new_user
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Add created_by column to existing tables
do $$
begin
  -- Collections
  if not exists (select 1 from information_schema.columns where table_name = 'collections' and column_name = 'created_by') then
    alter table public.collections add column created_by uuid references auth.users(id) on delete set null;
  end if;

  -- Jewelry
  if not exists (select 1 from information_schema.columns where table_name = 'jewelry' and column_name = 'created_by') then
    alter table public.jewelry add column created_by uuid references auth.users(id) on delete set null;
  end if;

  -- Jewelry Images
  if not exists (select 1 from information_schema.columns where table_name = 'jewelry_images' and column_name = 'created_by') then
    alter table public.jewelry_images add column created_by uuid references auth.users(id) on delete set null;
  end if;
end $$;
