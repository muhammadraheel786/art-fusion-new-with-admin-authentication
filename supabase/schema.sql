-- Run this in Supabase SQL Editor to set up the database

-- Paintings table
create table if not exists paintings (
  id bigint primary key generated always as identity,
  title text not null,
  description text default '',
  price text default 'Price on request',
  image text not null,
  category text default 'Landscape',
  featured boolean default false,
  created_at timestamptz default now()
);

-- Ratings: users can rate paintings (persists for all users)
create table if not exists ratings (
  id bigint primary key generated always as identity,
  painting_id bigint not null references paintings(id) on delete cascade,
  user_id text not null,
  rating decimal(2,1) not null check (rating >= 1 and rating <= 5),
  created_at timestamptz default now(),
  unique(painting_id, user_id)
);

create index if not exists idx_ratings_painting on ratings(painting_id);

-- RLS policies
alter table paintings enable row level security;
alter table ratings enable row level security;

-- Paintings: public read, authenticated write (admin)
create policy "Anyone can read paintings"
  on paintings for select using (true);

create policy "Authenticated users can manage paintings"
  on paintings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Ratings: anyone can read and insert/update (for anonymous rating)
create policy "Anyone can read ratings"
  on ratings for select using (true);

create policy "Anyone can insert ratings"
  on ratings for insert with check (true);

create policy "Anyone can update ratings"
  on ratings for update using (true);

-- Storage bucket for painting images (create in Supabase Dashboard > Storage)
-- Bucket name: paintings, Public bucket

-- Seed data from existing paintings (optional - run after tables exist)
-- Insert from your paintings.json if needed
