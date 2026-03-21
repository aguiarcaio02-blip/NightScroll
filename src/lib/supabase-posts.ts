import { supabase } from './supabase';

export interface SupabasePost {
  id: string;
  username: string;
  avatar: string;
  video_url: string;
  thumbnail_url: string;
  caption: string;
  tags: string[];
  visibility: string;
  premium_content: boolean;
  allow_comments: boolean;
  allow_downloads: boolean;
  age_restriction: boolean;
  likes: number;
  comments_count: number;
  shares: number;
  views: number;
  created_at: string;
}

// Upload video blob to Supabase Storage, return public URL
export async function uploadVideo(blob: Blob, postId: string): Promise<string> {
  const ext = blob.type.includes('mp4') ? 'mp4' : 'webm';
  const filePath = `${postId}.${ext}`;

  const { error } = await supabase.storage
    .from('videos')
    .upload(filePath, blob, {
      contentType: blob.type,
      upsert: true,
    });

  if (error) throw new Error(`Video upload failed: ${error.message}`);

  const { data } = supabase.storage.from('videos').getPublicUrl(filePath);
  return data.publicUrl;
}

// Upload thumbnail (base64 data URL) to Supabase Storage
export async function uploadThumbnail(dataUrl: string, postId: string): Promise<string> {
  // Convert data URL to blob
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const filePath = `thumbs/${postId}.jpg`;

  const { error } = await supabase.storage
    .from('videos')
    .upload(filePath, blob, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) throw new Error(`Thumbnail upload failed: ${error.message}`);

  const { data } = supabase.storage.from('videos').getPublicUrl(filePath);
  return data.publicUrl;
}

// Create a post in the database
export async function createPost(post: {
  username: string;
  avatar: string;
  video_url: string;
  thumbnail_url: string;
  caption: string;
  tags: string[];
  visibility: string;
  premium_content: boolean;
  allow_comments: boolean;
  allow_downloads: boolean;
  age_restriction: boolean;
}): Promise<SupabasePost> {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single();

  if (error) throw new Error(`Post creation failed: ${error.message}`);
  return data;
}

// Fetch all public posts (For You feed)
export async function fetchPosts(): Promise<SupabasePost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Fetch posts failed: ${error.message}`);
  return data || [];
}

// Fetch posts by a specific user
export async function fetchUserPosts(username: string): Promise<SupabasePost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('username', username)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Fetch user posts failed: ${error.message}`);
  return data || [];
}

// Delete a post and its video/thumbnail from storage
export async function deletePostById(postId: string): Promise<void> {
  // Delete from database
  const { error: dbError } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (dbError) throw new Error(`Delete post failed: ${dbError.message}`);

  // Try to delete video files from storage (both formats)
  await supabase.storage.from('videos').remove([
    `${postId}.webm`,
    `${postId}.mp4`,
    `thumbs/${postId}.jpg`,
  ]);
}
