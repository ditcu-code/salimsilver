-- Create posts table with new columns
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  cover_image_url text,
  meta_title text,
  meta_description text,
  published boolean default false,
  published_at timestamptz,
  tags text[] default '{}',
  featured boolean default false,
  author_id uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table posts enable row level security;

-- Policies for posts
create policy "Public can view published posts"
  on posts for select
  using (published = true);

create policy "Admin can view all posts"
  on posts for select
  using (auth.role() = 'authenticated');

create policy "Admin can insert posts"
  on posts for insert
  with check (auth.role() = 'authenticated');

create policy "Admin can update posts"
  on posts for update
  using (auth.role() = 'authenticated');

create policy "Admin can delete posts"
  on posts for delete
  using (auth.role() = 'authenticated');

-- Create blog bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog', 'blog', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog' );

CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Update Delete"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'blog' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'blog' AND auth.role() = 'authenticated' );

-- Seed Data with Tags and Featured flag
INSERT INTO public.posts (
  slug,
  title,
  excerpt,
  content,
  cover_image_url,
  meta_title,
  meta_description,
  published,
  published_at,
  tags,
  featured
) VALUES (
  'art-of-javanese-silver',
  'The Art of Javanese Silver Crafting',
  'Discover the intricate process behind our handmade silver jewelry, passed down through generations in Kotagede.',
  '<h2>A Legacy of Craftsmanship</h2><p>In the heart of Kotagede, the ancient capital of the Mataram Kingdom, the rhythmic tapping of small hammers against silver has echoed for centuries. This is where <strong>Salim Silver</strong> finds its roots.</p><p>Javanese silver crafting is distinct for its focus on <em>filigree</em> (intricate metalwork) and deep relief carving. Unlike mass-produced jewelry, each piece tells a story of patience and precision.</p><h3>The Process</h3><ul><li><strong>Purification:</strong> We start with high-purity silver granules.</li><li><strong>Alloying:</strong> Mixing with copper to create durable Sterling Silver (925).</li><li><strong>Formation:</strong> Drawing silver into fine wires for filigree or sheets for carving.</li><li><strong>Assembly:</strong> Each element is soldered by hand using traditional techniques.</li></ul><p>When you wear a piece of Javanese silver, you are wearing a piece of history, preserved by the hands of our master artisans.</p>',
  'https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog/hand-carved-silver-rings-couple-salimsilver.webp',
  'The Art of Javanese Silver Crafting | Salim Silver',
  'Learn about the traditional techniques of Javanese silver making.',
  true,
  NOW(),
  ARRAY['Culture', 'Craftsmanship'],
  true
) ON CONFLICT (slug) DO UPDATE SET
  tags = EXCLUDED.tags,
  featured = EXCLUDED.featured;
