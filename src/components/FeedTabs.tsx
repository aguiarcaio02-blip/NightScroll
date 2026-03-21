'use client';

import { useApp } from '@/lib/AppContext';

const tabs = [
  { id: 'following', label: 'Following' },
  { id: 'foryou', label: 'For You' },
  { id: 'trending', label: 'Trending' },
];

export default function FeedTabs() {
  const { feedTab, setFeedTab } = useApp();

  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center pt-[52px] pb-md pointer-events-none">
      <div className="flex items-center gap-xl relative pointer-events-auto">
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
