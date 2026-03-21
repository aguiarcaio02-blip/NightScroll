'use client';

import { Heart, MessageCircle, UserPlus, DollarSign, Crown, AtSign, Bell } from 'lucide-react';
import { notifications } from '@/lib/mock-data';
import { useApp } from '@/lib/AppContext';

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  like: { icon: Heart, color: '#EF4444' },
  comment: { icon: MessageCircle, color: '#22C55E' },
  follow: { icon: UserPlus, color: '#3B82F6' },
  tip: { icon: DollarSign, color: '#F59E0B' },
  subscription: { icon: Crown, color: '#F59E0B' },
  mention: { icon: AtSign, color: '#D946EF' },
  system: { icon: Bell, color: '#888888' },
};

function groupByTime(items: typeof notifications) {
  const today: typeof notifications = [];
  const thisWeek: typeof notifications = [];
  const earlier: typeof notifications = [];

  items.forEach(n => {
    if (n.timestamp.includes('m ago') || n.timestamp.includes('h ago')) {
      today.push(n);
    } else if (n.timestamp.includes('1d')) {
      thisWeek.push(n);
    } else {
      earlier.push(n);
    }
  });

  return { today, thisWeek, earlier };
}

export default function InboxPage() {
  const { setActiveTab } = useApp();
  const groups = groupByTime(notifications);

  const renderNotification = (n: typeof notifications[0]) => {
    const config = typeConfig[n.type];
    const Icon = config.icon;

    return (
      <div
        key={n.id}
        className="flex items-center gap-md px-lg py-md hover:bg-bg-hover transition-colors cursor-pointer"
        style={{ opacity: n.read ? 0.7 : 1 }}
      >
        {/* Avatar with badge */}
        <div className="relative shrink-0">
          <div className="w-[40px] h-[40px] rounded-full bg-bg-tertiary flex items-center justify-center text-[18px]">
            {n.avatar}
          </div>
          <div
            className="absolute -bottom-[2px] -right-[2px] w-[18px] h-[18px] rounded-full flex items-center justify-center"
            style={{ background: config.color, border: '2px solid #0A0A0A' }}
          >
            <Icon size={10} color="white" fill={n.type === 'like' ? 'white' : 'none'} />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-white leading-[1.4]">
            <span className="font-bold">@{n.username}</span>{' '}
            <span className="text-text-secondary">{n.text}</span>
          </p>
          <p className="text-[11px] text-text-faint mt-[2px]">{n.timestamp}</p>
        </div>

        {/* Follow back button for follow notifications */}
        {n.type === 'follow' && (
          <button className="px-md py-[4px] rounded-full text-[12px] font-semibold text-white shrink-0 min-h-[28px]" style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}>
            Follow
          </button>
        )}

        {/* Unread dot */}
        {!n.read && (
          <div className="w-[8px] h-[8px] rounded-full bg-accent-primary shrink-0" />
        )}
      </div>
    );
  };

  const renderGroup = (label: string, items: typeof notifications) => {
    if (items.length === 0) return null;
    return (
      <div key={label}>
        <p className="px-lg py-sm text-[13px] font-semibold text-text-muted border-b border-border-subtle">
          {label}
        </p>
        {items.map(renderNotification)}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-bg-primary">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-bg-primary px-lg pt-lg pb-md border-b border-border-subtle flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-white">Notifications</h1>
        <button
          onClick={() => setActiveTab('messages')}
          className="px-md py-[4px] rounded-full bg-bg-tertiary border border-border-default text-[13px] text-text-secondary min-h-[32px]"
        >
          Messages
        </button>
      </div>

      <div className="pb-[80px]">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-[120px]">
            <Bell size={48} className="text-text-faint mb-lg" />
            <p className="text-[16px] font-bold text-white mb-sm">No notifications yet</p>
            <p className="text-[13px] text-text-muted">When you get likes, follows, and tips they'll show up here</p>
          </div>
        ) : (
          <>
            {renderGroup('Today', groups.today)}
            {renderGroup('This Week', groups.thisWeek)}
            {renderGroup('Earlier', groups.earlier)}
          </>
        )}
      </div>
    </div>
  );
}
