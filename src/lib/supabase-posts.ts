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

// --- LIKES ---

export interface SupabaseLike {
  id: string;
  post_id: string;
  username: string;
  created_at: string;
}

// Toggle like: if already liked, remove it; otherwise add it
export async function toggleLike(postId: string, username: string, actorAvatar?: string): Promise<{ liked: boolean; count: number }> {
  // Check if already liked
  const { data: existing } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('username', username)
    .maybeSingle();

  if (existing) {
    // Unlike
    await supabase.from('likes').delete().eq('id', existing.id);
  } else {
    // Like
    await supabase.from('likes').insert({ post_id: postId, username });
  }

  // Get updated count
  const { count } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  // Update the count on the posts table
  await supabase.from('posts').update({ likes: count || 0 }).eq('id', postId);

  // Send notification on like (not unlike)
  if (!existing) {
    const { data: post } = await supabase.from('posts').select('username').eq('id', postId).single();
    if (post && post.username !== username) {
      await supabase.from('notifications').insert({
        recipient_username: post.username,
        actor_username: username,
        actor_avatar: actorAvatar || '',
        type: 'like',
        post_id: postId,
        text: 'liked your video',
      });
    }
  }

  return { liked: !existing, count: count || 0 };
}

// Check if a user has liked a post
export async function hasUserLiked(postId: string, username: string): Promise<boolean> {
  const { data } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('username', username)
    .maybeSingle();
  return !!data;
}

// Get like count for a post
export async function getLikeCount(postId: string): Promise<number> {
  const { count } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);
  return count || 0;
}

// --- COMMENTS ---

export interface SupabaseComment {
  id: string;
  post_id: string;
  username: string;
  avatar: string;
  text: string;
  created_at: string;
}

// Add a comment to a post
export async function addComment(postId: string, username: string, avatar: string, text: string): Promise<{ comment: SupabaseComment; totalCount: number }> {
  const { data, error } = await supabase
    .from('comments')
    .insert({ post_id: postId, username, avatar, text })
    .select()
    .single();

  if (error) throw new Error(`Add comment failed: ${error.message}`);

  // Get actual count from DB
  const { count } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  const totalCount = count || 0;
  await supabase.from('posts').update({ comments_count: totalCount }).eq('id', postId);

  // Send notification to post owner
  const { data: post } = await supabase.from('posts').select('username').eq('id', postId).single();
  if (post && post.username !== username) {
    await supabase.from('notifications').insert({
      recipient_username: post.username,
      actor_username: username,
      actor_avatar: avatar,
      type: 'comment',
      post_id: postId,
      text: `commented: "${text.slice(0, 50)}"`,
    });
  }

  return { comment: data, totalCount };
}

// Fetch comments for a post
export async function fetchComments(postId: string): Promise<SupabaseComment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Fetch comments failed: ${error.message}`);
  return data || [];
}

// Delete a comment
export async function deleteComment(commentId: string, postId: string): Promise<void> {
  await supabase.from('comments').delete().eq('id', commentId);

  // Update count
  const { count } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  await supabase.from('posts').update({ comments_count: count || 0 }).eq('id', postId);
}

// --- NOTIFICATIONS ---

export interface SupabaseNotification {
  id: string;
  recipient_username: string;
  actor_username: string;
  actor_avatar: string;
  type: string;
  post_id: string | null;
  text: string;
  read: boolean;
  created_at: string;
}

// Send a notification (skips if actor is the recipient)
export async function sendNotification(params: {
  recipientUsername: string;
  actorUsername: string;
  actorAvatar: string;
  type: string;
  postId: string;
  text: string;
}): Promise<void> {
  // Don't notify yourself
  if (params.recipientUsername === params.actorUsername) return;

  await supabase.from('notifications').insert({
    recipient_username: params.recipientUsername,
    actor_username: params.actorUsername,
    actor_avatar: params.actorAvatar,
    type: params.type,
    post_id: params.postId,
    text: params.text,
  });
}

// Fetch notifications for a user
export async function fetchNotifications(username: string): Promise<SupabaseNotification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('recipient_username', username)
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) throw new Error(`Fetch notifications failed: ${error.message}`);
  return data || [];
}

// Mark all notifications as read
export async function markNotificationsRead(username: string): Promise<void> {
  await supabase
    .from('notifications')
    .update({ read: true })
    .eq('recipient_username', username)
    .eq('read', false);
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
