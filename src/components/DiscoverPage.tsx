'use client';

import { useState } from 'react';
import { Search, X, TrendingUp, Star, Play, Crown } from 'lucide-react';
import { creators, videos, trendingTags, formatCount } from '@/lib/mock-data';

const filterPills = ['All', 'Creators', 'Videos', 'Premium'];

interface Props {
  onProfileClick: (creatorId: string) => void;
}

export default function DiscoverPage({ onProfileClick }: Props) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-bg-primary">
      {/* Search bar */}
      <div className="sticky top-0 z-20 bg-bg-primary px-lg pt-lg pb-sm">
        <div className="relative">
          <Search size={18} className="absolute left-md top-1/2 -translate-y-1/2 text-text-faint" />
          <input
            type="text"
            placeholder="Search creators, tags, videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-bg-tertiary rounded-[8px] pl-[40px] pr-[40px] py-md text-[14px] text-white placeholder:text-text-faint outline-none focus:ring-1 focus:ring-accent-primary h-[44px]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-md top-1/2 -translate-y-1/2"
              aria-label="Clear search"
            >
              <X size={18} className="text-text-faint" />
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex gap-sm mt-md overflow-x-auto pb-sm">
          {filterPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setActiveFilter(pill)}
              className="px-lg py-[6px] rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors min-h-[32px]"
              style={{
                background: activeFilter === pill ? '#D946EF' : '#1A1A1A',
                color: 'white',
                border: activeFilter === pill ? 'none' : '1px solid #333',
              }}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      <div className="px-lg pb-[80px]">
        {creators.length === 0 && videos.length === 0 && trendingTags.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-[80px]">
            <Search size={48} className="text-text-faint mb-lg" />
            <p className="text-[16px] font-bold text-white mb-sm">Nothing to explore yet</p>
            <p className="text-[13px] text-text-muted text-center">Be the first creator on the platform!</p>
          </div>
        )}

        {/* Trending Tags */}
        {trendingTags.length > 0 && (
        <div className="mb-2xl">
          <div className="flex items-center gap-sm mb-md">
            <TrendingUp size={16} className="text-accent-primary" />
            <h2 className="text-[16px] font-bold text-white">Trending Now</h2>
          </div>
          <div className="flex gap-sm overflow-x-auto pb-sm">
            {trendingTags.map((tag) => (
              <button
                key={tag.tag}
                className="bg-bg-tertiary border border-border-subtle rounded-[8px] px-lg py-sm shrink-0 hover:bg-bg-hover transition-colors"
              >
                <p className="text-accent-primary text-[13px] font-semibold">{tag.tag}</p>
                <p className="text-text-faint text-[11px]">{formatCount(tag.views)} views</p>
              </button>
            ))}
          </div>
        </div>
        )}

        {/* Top Creators */}
        {creators.length > 0 && (
        <div className="mb-2xl">
          <div className="flex items-center gap-sm mb-md">
            <Star size={16} className="text-accent-gold" />
            <h2 className="text-[16px] font-bold text-white">Top Creators</h2>
          </div>
          <div className="flex gap-lg overflow-x-auto pb-sm">
            {creators.map((creator) => (
              <button
                key={creator.id}
                onClick={() => onProfileClick(creator.id)}
                className="flex flex-col items-center shrink-0 min-w-[72px]"
              >
                <div className="p-[2px] rounded-full" style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}>
                  <div className="w-[56px] h-[56px] rounded-full bg-bg-primary p-[2px]">
                    <div className="w-full h-full rounded-full bg-bg-tertiary flex items-center justify-center text-[24px]">
                      {creator.avatar}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-white font-medium mt-[4px] max-w-[72px] truncate">
                  {creator.displayName}
                </p>
                <p className="text-[10px] text-text-muted">{formatCount(creator.followers)}</p>
              </button>
            ))}
          </div>
        </div>
        )}

        {/* Explore Grid */}
        {videos.length > 0 && (
        <div>
          <h2 className="text-[16px] font-bold text-white mb-md">Explore</h2>
          <div className="grid grid-cols-3 gap-[2px]">
            {videos.map((video) => {
              const creator = creators.find(c => c.id === video.creatorId);
              return (
                <div
                  key={video.id}
                  className="relative aspect-[9/16] rounded-[4px] overflow-hidden cursor-pointer group"
                  style={{ background: video.gradient }}
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                  {/* Premium badge */}
                  {video.isPremium && (
                    <div className="absolute top-[4px] right-[4px]">
                      <Crown size={12} className="text-accent-gold" fill="#F59E0B" />
                    </div>
                  )}

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-[4px] bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center gap-[4px]">
                      {creator && (
                        <div className="w-[16px] h-[16px] rounded-full bg-bg-tertiary flex items-center justify-center text-[8px] shrink-0">
                          {creator.avatar}
                        </div>
                      )}
                      <span className="text-[10px] text-white truncate">{creator?.username}</span>
                    </div>
                    <div className="flex items-center gap-[2px] mt-[2px]">
                      <Play size={8} color="white" fill="white" />
                      <span className="text-[10px] text-white">{formatCount(video.views)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
