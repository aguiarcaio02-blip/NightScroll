'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2, DollarSign, MoreHorizontal, Plus } from 'lucide-react';
import { Video, getCreator, formatCount } from '@/lib/mock-data';
import { useApp } from '@/lib/AppContext';

interface Props {
  video: Video;
  onProfileClick: (creatorId: string) => void;
}

export default function ActionSidebar({ video, onProfileClick }: Props) {
  const creator = getCreator(video.creatorId);
  const { setCommentsOpen, setShareOpen, openTip } = useApp();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
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
      label: formatCount(video.comments),
      onClick: () => setCommentsOpen(true),
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
    {
      icon: <MoreHorizontal size={20} color="white" strokeWidth={2} />,
      label: '',
      onClick: () => {},
      ariaLabel: 'More options',
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
        <div className="w-[44px] h-[44px] rounded-full bg-bg-tertiary border-2 border-white flex items-center justify-center text-[20px]">
          {creator?.avatar}
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
    </div>
  );
}
