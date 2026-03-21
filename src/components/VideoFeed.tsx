'use client';

import { Video as VideoIcon } from 'lucide-react';
import { videos } from '@/lib/mock-data';
import { useApp } from '@/lib/AppContext';
import VideoCard from './VideoCard';
import FeedTabs from './FeedTabs';

interface Props {
  onProfileClick: (creatorId: string) => void;
}

export default function VideoFeed({ onProfileClick }: Props) {
  const { userVideos } = useApp();

  // Combine user posts with mock videos — user posts first
  const allVideos = [...userVideos, ...videos];

  return (
    <div className="relative h-full">
      <FeedTabs />
      <div className="feed-container">
        {allVideos.length > 0 ? (
          allVideos.map((video) => (
            <VideoCard key={video.id} video={video} onProfileClick={onProfileClick} />
          ))
        ) : (
          <div className="video-card flex flex-col items-center justify-center bg-bg-primary">
            <VideoIcon size={48} className="text-text-faint mb-lg" />
            <p className="text-[18px] font-bold text-white mb-sm">No videos yet</p>
            <p className="text-[14px] text-text-muted text-center px-xl">
              Be the first to post! Tap the + button to create content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
