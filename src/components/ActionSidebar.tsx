'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Share2, DollarSign, MoreHorizontal, Plus, User, Trash2, Flag, EyeOff } from 'lucide-react';
import { Video, getCreator, formatCount } from '@/lib/mock-data';
import { useApp } from '@/lib/AppContext';
import { toggleLike, hasUserLiked } from '@/lib/supabase-posts';

interface Props {
  video: Video;
  onProfileClick: (creatorId: string) => void;
}

export default function ActionSidebar({ video, onProfileClick }: Props) {
  const creator = getCreator(video.creatorId);
  const { setCommentsOpen, setShareOpen, openTip, currentUser, deletePost, myPosts, allPosts, setCurrentVideoId } = useApp();
  const supabasePost = allPosts.find(p => p.id === video.id);
  const avatarSrc = creator?.avatar || supabasePost?.avatar || currentUser?.avatar || '';
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [commentCount, setCommentCount] = useState(video.comments);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [liking, setLiking] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isOwnVideo = myPosts.some(p => p.id === video.id);

  // Check if user already liked this post on mount
  useEffect(() => {
    if (!currentUser || !supabasePost) return;
    hasUserLiked(video.id, currentUser.username).then(setLiked).catch(() => {});
  }, [video.id, currentUser, supabasePost]);

  // Sync counts when video data changes
  useEffect(() => {
    setLikeCount(video.likes);
    setCommentCount(video.comments);
  }, [video.likes, video.comments]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setConfirmDelete(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const handleLike = async () => {
    if (!currentUser || !supabasePost || liking) return;
    setLiking(true);

    // Optimistic update
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikeCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      const result = await toggleLike(video.id, currentUser.username);
      setLiked(result.liked);
      setLikeCount(result.count);
    } catch {
      // Revert on error
      setLiked(wasLiked);
      setLikeCount(prev => wasLiked ? prev + 1 : prev - 1);
    } finally {
      setLiking(false);
    }
  };

  const handleDelete = () => {
    deletePost(video.id);
    setMenuOpen(false);
    setConfirmDelete(false);
  };

  const handleOpenComments = () => {
    setCurrentVideoId(video.id);
    setCommentsOpen(true);
  };

  const actions = [
    {
      icon: <Heart size={28} fill={liked ? '#EF4444' : 'none'} color={liked ? '#EF4444' : 'white'} strokeWidth={2} />,
      label: formatCount(likeCount),
      onClick: handleLike,
      ariaLabel: liked ? 'Unlike' : 'Like',
    },
    {
      icon: <MessageCircle size={28} color="white" strokeWidth={2} />,
      label: formatCount(commentCount),
      onClick: handleOpenComments,
      ariaLabel: 'View comments',
    },
    {
      icon: <Bookmark size={24} fill={saved ? '#F59E0B' : 'none'} color={saved ? '#F59E0B' : 'white'} strokeWidth={2} />,
      label: 'Save',
      onClick: () => setSaved(!saved),
      ariaLabel: saved ? 'Unsave' : 'Save',
    },
    {
      icon: <Share2 size={24} color="white" strokeWidth={2} />,
      label: formatCount(video.shares),
      onClick: () => setShareOpen(true),
      ariaLabel: 'Share',
    },
    {
      icon: <DollarSign size={24} color="#22C55E" strokeWidth={2} />,
      label: 'Tip',
      onClick: () => openTip(video.creatorId),
      ariaLabel: 'Send tip',
    },
  ];

  return (
    <div className="absolute right-[10px] bottom-[120px] z-10 flex flex-col items-center gap-xl">
      {/* Creator Avatar */}
      <button
        onClick={() => creator && onProfileClick(creator.id)}
        className="relative mb-sm min-w-[44px] min-h-[44px]"
        aria-label={`View ${creator?.username}'s profile`}
      >
        <div className="w-[44px] h-[44px] rounded-full bg-bg-tertiary border-2 border-white flex items-center justify-center text-[20px] overflow-hidden">
          {avatarSrc && avatarSrc.startsWith('data:') ? (
            <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
          ) : avatarSrc ? (
            avatarSrc
          ) : (
            <User size={20} className="text-text-muted" />
          )}
        </div>
        <div
          className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}
        >
          <Plus size={12} color="white" strokeWidth={3} />
        </div>
      </button>

      {/* Action Buttons */}
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={action.onClick}
          className="flex flex-col items-center gap-[2px] min-w-[44px] min-h-[44px] justify-center"
          aria-label={action.ariaLabel}
        >
          {action.icon}
          {action.label && (
            <span className="text-[11px] text-white font-medium">{action.label}</span>
          )}
        </button>
      ))}

      {/* More options button */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => { setMenuOpen(!menuOpen); setConfirmDelete(false); }}
          className="flex flex-col items-center gap-[2px] min-w-[44px] min-h-[44px] justify-center"
          aria-label="More options"
        >
          <MoreHorizontal size={20} color="white" strokeWidth={2} />
        </button>

        {menuOpen && (
          <div
            className="absolute bottom-[48px] right-0 w-[180px] rounded-[12px] overflow-hidden shadow-lg z-50"
            style={{ background: '#1A1A1A', border: '1px solid #333' }}
          >
            {confirmDelete ? (
              <div className="p-md">
                <p className="text-[13px] text-white mb-md text-center">Delete this video?</p>
                <div className="flex gap-sm">
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="flex-1 py-sm rounded-[8px] text-[13px] font-semibold text-white bg-bg-tertiary border border-border-default"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 py-sm rounded-[8px] text-[13px] font-semibold text-white bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <>
                {isOwnVideo && (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="w-full flex items-center gap-md px-lg py-md hover:bg-white/5 transition-colors"
                  >
                    <Trash2 size={16} color="#EF4444" />
                    <span className="text-[14px] text-red-400">Delete video</span>
                  </button>
                )}
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-md px-lg py-md hover:bg-white/5 transition-colors"
                >
                  <EyeOff size={16} color="white" />
                  <span className="text-[14px] text-white">Not interested</span>
                </button>
                {!isOwnVideo && (
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full flex items-center gap-md px-lg py-md hover:bg-white/5 transition-colors"
                  >
                    <Flag size={16} color="white" />
                    <span className="text-[14px] text-white">Report</span>
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
