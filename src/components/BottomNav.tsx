'use client';

import { Home, Search, Bell, User, Plus } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'discover', icon: Search, label: 'Discover' },
  { id: 'create', icon: Plus, label: '' },
  { id: 'inbox', icon: Bell, label: 'Inbox' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export default function BottomNav({ isFeed }: { isFeed?: boolean }) {
  const { activeTab, setActiveTab, unreadNotifCount, refreshNotifCount } = useApp();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // Reset unread count when opening inbox
    if (tabId === 'inbox') {
      // Count will reset after InboxPage marks them as read and refreshes
      setTimeout(() => refreshNotifCount(), 1000);
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-[60px] lg:hidden"
      style={{
        background: isFeed
          ? 'linear-gradient(transparent, rgba(0,0,0,0.95))'
          : '#0A0A0A',
        borderTop: isFeed ? 'none' : '1px solid #222222',
      }}
    >
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        const Icon = tab.icon;

        if (tab.id === 'create') {
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="flex flex-col items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Create new content"
            >
              <div
                className="flex items-center justify-center rounded-[8px] w-[40px] h-[28px]"
                style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}
              >
                <Plus size={20} strokeWidth={3} color="white" />
              </div>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className="flex flex-col items-center justify-center gap-[2px] min-w-[44px] min-h-[44px] relative"
            aria-label={tab.label}
          >
            <div className="relative">
              <Icon
                size={22}
                color={active ? '#FFFFFF' : '#888888'}
                fill={active && tab.id === 'home' ? '#FFFFFF' : 'none'}
                strokeWidth={active ? 2.5 : 2}
              />
              {tab.id === 'inbox' && unreadNotifCount > 0 && (
                <span className="absolute -top-[6px] -right-[10px] min-w-[16px] h-[16px] px-[4px] rounded-full bg-[#EF4444] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white leading-none">
                    {unreadNotifCount > 99 ? '99+' : unreadNotifCount}
                  </span>
                </span>
              )}
            </div>
            <span
              className="text-[10px]"
              style={{
                color: active ? '#FFFFFF' : '#888888',
                fontWeight: active ? 600 : 400,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
