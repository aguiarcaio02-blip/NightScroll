'use client';

import { useMemo } from 'react';
import { Video as VideoIcon } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import VideoCard from './VideoCard';
import FeedTabs from './FeedTabs';
import AdCard from './AdCard';

const AD_INTERVAL = 3; // Show an ad every 3 videos

interface Props {
  onProfileClick: (creatorId: string) => void;
}

export default function VideoFeed({ onProfileClick }: Props) {
  const { feedVideos } = useApp();

  // Build feed items with ads inserted every AD_INTERVAL videos
  const feedItems = useMemo(() => {
    if (feedVideos.length === 0) return [];

    const items: { type: 'video' | 'ad'; video?: typeof feedVideos[0]; key: string }[] = [];
    let videoCount = 0;

    for (const video of feedVideos) {
      items.push({ type: 'video', video, key: video.id });
      videoCount++;

      if (videoCount % AD_INTERVAL === 0) {
        items.push({ type: 'ad', key: `ad-after-${videoCount}` });
      }
    }

    return items;
  }, [feedVideos]);

  return (
    <div className="relative h-full">
      <FeedTabs />
      <div className="feed-container">
        {feedItems.length > 0 ? (
          feedItems.map((item) =>
            item.type === 'video' && item.video ? (
              <VideoCard key={item.key} video={item.video} onProfileClick={onProfileClick} />
            ) : (
              <AdCard key={item.key} />
            )
          )
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
