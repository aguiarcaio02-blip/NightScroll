'use client';

import { videos } from '@/lib/mock-data';
import VideoCard from './VideoCard';
import FeedTabs from './FeedTabs';

interface Props {
  onProfileClick: (creatorId: string) => void;
}

export default function VideoFeed({ onProfileClick }: Props) {
  return (
    <div className="relative h-full">
      <FeedTabs />
      <div className="feed-container">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onProfileClick={onProfileClick} />
        ))}
      </div>
    </div>
  );
}
