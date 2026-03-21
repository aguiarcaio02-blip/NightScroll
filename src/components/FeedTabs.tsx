'use client';

import { useApp } from '@/lib/AppContext';
import { creators } from '@/lib/mock-data';

const tabs = [
  { id: 'following', label: 'Following' },
  { id: 'foryou', label: 'For You' },
  { id: 'trending', label: 'Trending' },
];

export default function FeedTabs() {
  const { feedTab, setFeedTab } = useApp();
  const hasLive = creators.some(c => c.isLive);

  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center pt-[52px] pb-md">
      <div className="flex items-center gap-xl relative">
        {hasLive && (
          <div className="absolute -left-[60px] top-1/2 -translate-y-1/2 flex items-center gap-[4px]">
            <span className="w-[8px] h-[8px] bg-[#EF4444] rounded-full animate-pulse" />
            <span className="text-[11px] text-[#EF4444] font-bold">LIVE</span>
          </div>
        )}
        {tabs.map((tab) => {
          const active = feedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFeedTab(tab.id)}
              className="flex flex-col items-center gap-[4px] min-w-[44px] min-h-[44px] justify-center"
              aria-label={`${tab.label} feed`}
            >
              <span
                className="text-[15px] transition-all duration-200"
                style={{
                  color: active ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                  fontWeight: active ? 700 : 400,
                }}
              >
                {tab.label}
              </span>
              <div
                className="h-[2px] w-[24px] rounded-full transition-all duration-200"
                style={{
                  background: active ? '#FFFFFF' : 'transparent',
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
