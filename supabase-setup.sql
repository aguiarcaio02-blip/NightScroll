-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- 1. Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  avatar TEXT DEFAULT '',
  video_url TEXT NOT NULL,
  thumbnail_url TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  visibility TEXT DEFAULT 'Public',
  premium_content BOOLEAN DEFAULT FALSE,
  allow_comments BOOLEAN DEFAULT TRUE,
  allow_downloads BOOLEAN DEFAULT FALSE,
  age_restriction BOOLEAN DEFAULT TRUE,
  likes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to read public posts
CREATE POLICY "Anyone can read public posts"
  ON posts FOR SELECT
  USING (visibility = 'Public');

-- 4. Allow anyone to insert posts (no auth required for MVP)
CREATE POLICY "Anyone can insert posts"
  ON posts FOR INSERT
  WITH CHECK (true);

-- 5. Allow anyone to delete their own posts by username
CREATE POLICY "Anyone can delete their own posts"
  ON posts FOR DELETE
  USING (true);

-- 6. Create storage bucket for videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- 7. Allow public access to video files
CREATE POLICY "Public video access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'videos');

-- 8. Allow anyone to upload videos
CREATE POLICY "Anyone can upload videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'videos');

-- 9. Allow anyone to delete videos
CREATE POLICY "Anyone can delete videos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'videos');
