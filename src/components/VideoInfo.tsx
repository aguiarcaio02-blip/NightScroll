'use client';

import { Music, BadgeCheck } from 'lucide-react';
import { Video, getCreator } from '@/lib/mock-data';

interface Props {
  video: Video;
  onProfileClick: (creatorId: string) => void;
}

export default function VideoInfo({ video, onProfileClick }: Props) {
  const creator = getCreator(video.creatorId);
  if (!creator) return null;

  const captionParts = video.caption.split(/(#\w+)/g);

  return (
    <div
      className="absolute bottom-0 left-0 right-[80px] z-10 pb-[20px] pl-lg pr-md"
      style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}
    >
      {/* Creator info row */}
      <div className="flex items-center gap-sm mb-sm">
        <button
          onClick={() => onProfileClick(creator.id)}
          className="flex items-center gap-sm min-h-[44px]"
          aria-label={`View ${creator.username}'s profile`}
        >
          <div className="w-[32px] h-[32px] rounded-full bg-bg-tertiary flex items-center justify-center text-[14px] shrink-0">
            {creator.avatar}
          </div>
          <span className="text-[15px] font-bold text-white">@{creator.username}</span>
          {creator.verified && (
            <BadgeCheck size={14} className="text-accent-primary shrink-0" fill="#D946EF" color="#0A0A0A" />
          )}
        </button>
        <button
          className="ml-sm px-md py-[4px] rounded-full text-[12px] font-semibold border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white transition-colors min-h-[28px]"
          aria-label={`Follow ${creator.username}`}
        >
          Follow
        </button>
      </div>

      {/* Caption */}
      <p className="text-[13px] text-white leading-[1.4] mb-sm line-clamp-2">
        {captionParts.map((part, i) =>
          part.startsWith('#') ? (
            <span key={i} className="text-accent-primary">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>

      {/* Sound row */}
      <div className="flex items-center gap-[6px] overflow-hidden">
        <Music size={12} className="text-text-secondary shrink-0" />
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
            <span className="text-[12px] text-text-secondary mr-[40px]">{video.sound}</span>
            <span className="text-[12px] text-text-secondary mr-[40px]">{video.sound}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
