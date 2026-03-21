'use client';

import { Home, Search, PlusCircle, Bell, User, MessageCircle, Settings } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'discover', icon: Search, label: 'Discover' },
  { id: 'create', icon: PlusCircle, label: 'Create' },
  { id: 'inbox', icon: Bell, label: 'Notifications' },
  { id: 'messages', icon: MessageCircle, label: 'Messages' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export default function Sidebar() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] flex-col bg-bg-secondary border-r border-border-subtle z-50">
      <div className="p-xl pt-3xl">
        <h1 className="text-xl font-bold gradient-text">NightScroll</h1>
      </div>

      <nav className="flex flex-col gap-sm px-md mt-md">
        {navItems.map((item) => {
          const active = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex items-center gap-lg px-lg py-md rounded-[8px] transition-colors duration-150 min-h-[44px]"
              style={{
                background: active ? '#2A2A2A' : 'transparent',
              }}
              aria-label={item.label}
            >
              <Icon
                size={22}
                color={active ? '#FFFFFF' : '#888888'}
                strokeWidth={active ? 2.5 : 2}
              />
              <span
                className="text-[15px]"
                style={{
                  color: active ? '#FFFFFF' : '#888888',
                  fontWeight: active ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-xl">
        <button
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-lg px-lg py-md rounded-[8px] transition-colors duration-150 w-full hover:bg-bg-hover"
          aria-label="Settings"
        >
          <Settings size={20} color="#888888" />
          <span className="text-[14px] text-text-muted">Settings</span>
        </button>
      </div>
    </aside>
  );
}
