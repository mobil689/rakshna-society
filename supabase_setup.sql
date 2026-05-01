-- ============================================
-- Rakshna Society - Supabase Database Setup
-- ============================================
-- Run this ENTIRE script in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query → Paste → Run)
-- ============================================

-- 1. Comments Table
-- Stores user comments on blog posts
create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  blog_slug text not null,
  display_name text not null,
  content text not null check (char_length(content) between 1 and 2000),
  created_at timestamptz default now() not null
);

-- 2. Likes Table
-- Tracks which users liked which blog posts (replaces localStorage)
create table if not exists public.likes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  blog_slug text not null,
  created_at timestamptz default now() not null,
  unique(user_id, blog_slug)  -- one like per user per post, prevents spam
);

-- 3. Create indexes for faster queries
create index if not exists idx_comments_blog_slug on public.comments(blog_slug);
create index if not exists idx_comments_created_at on public.comments(created_at desc);
create index if not exists idx_likes_blog_slug on public.likes(blog_slug);
create index if not exists idx_likes_user_blog on public.likes(user_id, blog_slug);

-- 4. Enable Row Level Security (RLS)
alter table public.comments enable row level security;
alter table public.likes enable row level security;

-- 5. RLS Policies for Comments
-- Anyone can READ comments (public blog)
create policy "Comments are viewable by everyone"
  on public.comments for select
  using (true);

-- Only authenticated users can INSERT comments (must be their own user_id)
create policy "Authenticated users can comment"
  on public.comments for insert
  with check (auth.uid() = user_id);

-- Users can only DELETE their own comments
create policy "Users can delete own comments"
  on public.comments for delete
  using (auth.uid() = user_id);

-- 6. RLS Policies for Likes
-- Anyone can READ likes (to show counts)
create policy "Likes are viewable by everyone"
  on public.likes for select
  using (true);

-- Only authenticated users can INSERT likes (must be their own user_id)
create policy "Authenticated users can like"
  on public.likes for insert
  with check (auth.uid() = user_id);

-- Users can only DELETE their own likes (unlike)
create policy "Users can unlike"
  on public.likes for delete
  using (auth.uid() = user_id);

-- ============================================
-- Done! Your database is now ready.
-- ============================================
