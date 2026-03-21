'use client';

import { useState, useCallback } from 'react';
import { Lock, Crown, Volume2, VolumeX, Heart } from 'lucide-react';
import { Video, getCreator } from '@/lib/mock-data';
import ActionSidebar from './ActionSidebar';
import VideoInfo from './VideoInfo';

interface Props {
  video: Video;
  onProfileClick: (creatorId: string) => void;
}

export default function VideoCard({ video, onProfileClick }: Props) {
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const creator = getCreator(video.creatorId);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap < 300) {
      // Double tap — like
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 600);
    } else {
      // Single tap — pause/resume
      setTimeout(() => {
        if (Date.now() - now >= 300) {
          setPaused(p => !p);
        }
      }, 300);
    }
    setLastTap(now);
  }, [lastTap]);

  return (
    <div className="video-card overflow-hidden" style={{ background: video.gradient }}>
      {/* Tap area */}
      <div
        className="absolute inset-0 z-[5]"
        onClick={handleTap}
        role="button"
        tabIndex={0}
        aria-label={paused ? 'Resume video' : 'Pause video'}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            setPaused(p => !p);
          }
        }}
      />

      {/* Paused indicator */}
      {paused && (
        <div className="absolute inset-0 z-[6] flex items-center justify-center pointer-events-none">
          <div className="w-[60px] h-[60px] rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-[4px]" />
          </div>
        </div>
      )}

      {/* Double-tap heart animation */}
      {showHeart && (
        <div className="absolute inset-0 z-[6] flex items-center justify-center pointer-events-none">
          <Heart size={80} fill="#EF4444" color="#EF4444" className="animate-heart-pop" />
        </div>
      )}

      {/* Premium badge */}
      {video.isPremium && (
        <div
          className="absolute top-[60px] left-md z-10 flex items-center gap-[4px] px-sm py-[3px] rounded-full"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}
        >
          <Crown size={11} color="black" strokeWidth={2.5} />
          <span className="text-[11px] font-bold text-black">PREMIUM</span>
        </div>
      )}

      {/* Mute toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
        className="absolute top-[60px] right-md z-10 w-[36px] h-[36px] rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <VolumeX size={16} color="white" /> : <Volume2 size={16} color="white" />}
      </button>

      {/* Premium paywall overlay */}
      {video.isPremium && (
        <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center" style={{ backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.5)' }}>
          <Lock size={48} color="white" className="mb-lg" />
          <p className="text-white text-[16px] font-semibold mb-md">Subscribe to unlock</p>
          <button
            className="px-xl py-md rounded-[8px] text-[14px] font-bold text-black flex items-center gap-sm"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}
            aria-label={`Subscribe to ${creator?.username} for $${creator?.subscriptionPrice}/mo`}
          >
            <Crown size={16} />
            Subscribe — ${creator?.subscriptionPrice}/mo
          </button>
        </div>
      )}

      {/* Action sidebar */}
      <ActionSidebar video={video} onProfileClick={onProfileClick} />

      {/* Video info */}
      <VideoInfo video={video} onProfileClick={onProfileClick} />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] z-10" style={{ background: 'rgba(255,255,255,0.2)' }}>
        <div className="h-full bg-accent-primary animate-progress" style={{ animationDuration: `${video.duration}s` }} />
      </div>
    </div>
  );
}
