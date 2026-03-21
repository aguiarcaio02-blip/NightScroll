'use client';

import { X, Heart, Send, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/AppContext';
import { fetchComments, addComment, sendNotification, SupabaseComment } from '@/lib/supabase-posts';

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

export default function CommentsDrawer() {
  const { commentsOpen, setCommentsOpen, currentVideoId, currentUser, updatePostCounts, allPosts } = useApp();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<SupabaseComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // Fetch comments when drawer opens for a video
  useEffect(() => {
    if (!commentsOpen || !currentVideoId) return;
    setLoading(true);
    fetchComments(currentVideoId)
      .then(setComments)
      .catch(e => console.error('Failed to fetch comments:', e))
      .finally(() => setLoading(false));
  }, [commentsOpen, currentVideoId]);

  // Reset when closed
  useEffect(() => {
    if (!commentsOpen) {
      setNewComment('');
      setComments([]);
    }
  }, [commentsOpen]);

  if (!commentsOpen) return null;

  const handleSend = async () => {
    if (!newComment.trim() || !currentVideoId || !currentUser || sending) return;
    setSending(true);

    // Save values before any state changes
    const commentText = newComment.trim();
    const videoId = currentVideoId;
    const username = currentUser.username;
    const avatar = currentUser.avatar || '';
    const post = allPosts.find(p => p.id === videoId);

    try {
      const { comment, totalCount } = await addComment(
        videoId,
        username,
        avatar,
        commentText
      );
      setComments(prev => [...prev, comment]);
      setNewComment('');
      updatePostCounts(videoId, post?.likes ?? 0, totalCount);

      // Send notification to post owner
      if (post && post.username !== username) {
        try {
          await sendNotification({
            recipientUsername: post.username,
            actorUsername: username,
            actorAvatar: avatar,
            type: 'comment',
            postId: videoId,
            text: `commented: "${commentText.slice(0, 50)}"`,
          });
        } catch (notifErr) {
          console.error('Notification failed:', notifErr);
        }
      }
    } catch (e) {
      console.error('Failed to send comment:', e);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 z-[60]" onClick={() => setCommentsOpen(false)}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Drawer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60vh] bg-bg-tertiary rounded-t-[16px] animate-slide-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-lg py-md border-b border-border-subtle shrink-0">
          <h3 className="text-[15px] font-bold text-white">
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </h3>
          <button
            onClick={() => setCommentsOpen(false)}
            className="w-[36px] h-[36px] flex items-center justify-center rounded-full hover:bg-bg-hover"
            aria-label="Close comments"
          >
            <X size={20} color="white" />
          </button>
        </div>

        {/* Comment list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-lg py-md">
          {loading ? (
            <div className="flex items-center justify-center py-xl">
              <p className="text-text-muted text-[14px]">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-xl">
              <p className="text-text-muted text-[14px]">No comments yet</p>
              <p className="text-text-faint text-[12px] mt-sm">Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="mb-xl">
                <div className="flex gap-sm">
                  <div className="w-[32px] h-[32px] rounded-full bg-bg-hover flex items-center justify-center text-[14px] shrink-0 overflow-hidden">
                    {comment.avatar && comment.avatar.startsWith('data:') ? (
                      <img src={comment.avatar} alt="" className="w-full h-full object-cover" />
                    ) : comment.avatar ? (
                      comment.avatar
                    ) : (
                      <User size={14} className="text-text-muted" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-sm">
                      <span className="text-[13px] font-semibold text-text-secondary">@{comment.username}</span>
                      <span className="text-[11px] text-text-faint">{timeAgo(comment.created_at)}</span>
                    </div>
                    <p className="text-[13px] text-white leading-[1.4] mt-[2px]">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-sm px-lg py-md border-t border-border-subtle shrink-0">
          <div className="w-[28px] h-[28px] rounded-full bg-bg-hover flex items-center justify-center text-[12px] shrink-0 overflow-hidden">
            {currentUser?.avatar && currentUser.avatar.startsWith('data:') ? (
              <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
            ) : currentUser?.avatar ? (
              currentUser.avatar
            ) : (
              <User size={12} className="text-text-muted" />
            )}
          </div>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-bg-hover rounded-full px-lg py-sm text-[13px] text-white placeholder:text-text-faint outline-none focus:ring-1 focus:ring-accent-primary"
          />
          <button
            onClick={handleSend}
            disabled={!newComment.trim() || sending}
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
            style={{ background: newComment.trim() ? '#D946EF' : '#333333' }}
            aria-label="Send comment"
          >
            <Send size={16} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
