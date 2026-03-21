'use client';

import { X, Heart, Send } from 'lucide-react';
import { useState } from 'react';
import { comments } from '@/lib/mock-data';
import { useApp } from '@/lib/AppContext';

export default function CommentsDrawer() {
  const { commentsOpen, setCommentsOpen } = useApp();
  const [newComment, setNewComment] = useState('');

  if (!commentsOpen) return null;

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
          <h3 className="text-[15px] font-bold text-white">{comments.length} Comments</h3>
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
          {comments.map((comment) => (
            <div key={comment.id} className="mb-xl">
              <div className="flex gap-sm">
                <div className="w-[32px] h-[32px] rounded-full bg-bg-hover flex items-center justify-center text-[14px] shrink-0">
                  {comment.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-sm">
                    <span className="text-[13px] font-semibold text-text-secondary">{comment.username}</span>
                    <span className="text-[11px] text-text-faint">{comment.timestamp}</span>
                  </div>
                  <p className="text-[13px] text-white leading-[1.4] mt-[2px]">{comment.text}</p>
                  <div className="flex items-center gap-lg mt-[4px]">
                    <button className="flex items-center gap-[4px] text-text-muted" aria-label="Like comment">
                      <Heart size={12} />
                      <span className="text-[11px]">{comment.likes}</span>
                    </button>
                    <button className="text-[11px] text-text-muted" aria-label="Reply to comment">Reply</button>
                  </div>

                  {/* Nested replies */}
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-sm mt-md ml-md border-l border-border-subtle pl-md">
                      <div className="w-[24px] h-[24px] rounded-full bg-bg-hover flex items-center justify-center text-[11px] shrink-0">
                        {reply.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-sm">
                          <span className="text-[12px] font-semibold text-text-secondary">{reply.username}</span>
                          <span className="text-[11px] text-text-faint">{reply.timestamp}</span>
                        </div>
                        <p className="text-[12px] text-white leading-[1.4] mt-[2px]">{reply.text}</p>
                        <button className="flex items-center gap-[4px] text-text-muted mt-[2px]" aria-label="Like reply">
                          <Heart size={10} />
                          <span className="text-[10px]">{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-sm px-lg py-md border-t border-border-subtle shrink-0">
          <div className="w-[28px] h-[28px] rounded-full bg-accent-primary flex items-center justify-center text-[12px] shrink-0">
            😎
          </div>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-bg-hover rounded-full px-lg py-sm text-[13px] text-white placeholder:text-text-faint outline-none focus:ring-1 focus:ring-accent-primary"
          />
          <button
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors"
            style={{ background: newComment ? '#D946EF' : '#333333' }}
            aria-label="Send comment"
          >
            <Send size={16} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
