'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, UserPlus, DollarSign, Crown, AtSign, Bell, User } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import { fetchNotifications, markNotificationsRead, SupabaseNotification } from '@/lib/supabase-posts';

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  like: { icon: Heart, color: '#EF4444' },
  comment: { icon: MessageCircle, color: '#22C55E' },
  follow: { icon: UserPlus, color: '#3B82F6' },
  tip: { icon: DollarSign, color: '#F59E0B' },
  subscription: { icon: Crown, color: '#F59E0B' },
  mention: { icon: AtSign, color: '#D946EF' },
  system: { icon: Bell, color: '#888888' },
};

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}

function groupByTime(items: SupabaseNotification[]) {
  const now = Date.now();
  const today: SupabaseNotification[] = [];
  const thisWeek: SupabaseNotification[] = [];
  const earlier: SupabaseNotification[] = [];

  items.forEach(n => {
    const age = now - new Date(n.created_at).getTime();
    if (age < 86400000) {
      today.push(n);
    } else if (age < 604800000) {
      thisWeek.push(n);
    } else {
      earlier.push(n);
    }
  });

  return { today, thisWeek, earlier };
}

export default function InboxPage() {
  const { setActiveTab, currentUser } = useApp();
  const [notifications, setNotifications] = useState<SupabaseNotification[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications on mount and mark as read
  useEffect(() => {
    if (!currentUser) return;

    fetchNotifications(currentUser.username)
      .then(data => {
        setNotifications(data);
        // Mark all as read after viewing
        markNotificationsRead(currentUser.username).catch(() => {});
      })
      .catch(e => console.error('Failed to fetch notifications:', e))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const groups = groupByTime(notifications);

  const renderNotification = (n: SupabaseNotification) => {
    const config = typeConfig[n.type] || typeConfig.system;
    const Icon = config.icon;

    return (
      <div
        key={n.id}
        className="flex items-center gap-md px-lg py-md hover:bg-bg-hover transition-colors cursor-pointer"
        style={{ opacity: n.read ? 0.7 : 1 }}
      >
        {/* Avatar with badge */}
        <div className="relative shrink-0">
          <div className="w-[40px] h-[40px] rounded-full bg-bg-tertiary flex items-center justify-center text-[18px] overflow-hidden">
            {n.actor_avatar && n.actor_avatar.startsWith('data:') ? (
              <img src={n.actor_avatar} alt="" className="w-full h-full object-cover" />
            ) : n.actor_avatar ? (
              n.actor_avatar
            ) : (
              <User size={18} className="text-text-muted" />
            )}
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
            <span className="font-bold">@{n.actor_username}</span>{' '}
            <span className="text-text-secondary">{n.text}</span>
          </p>
          <p className="text-[11px] text-text-faint mt-[2px]">{timeAgo(n.created_at)}</p>
        </div>

        {/* Unread dot */}
        {!n.read && (
          <div className="w-[8px] h-[8px] rounded-full bg-accent-primary shrink-0" />
        )}
      </div>
    );
  };

  const renderGroup = (label: string, items: SupabaseNotification[]) => {
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
        <div className="flex items-center gap-sm">
          <h1 className="text-[20px] font-bold text-white">Notifications</h1>
          {unreadCount > 0 && (
            <span className="px-[6px] py-[1px] rounded-full bg-accent-primary text-[11px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={() => setActiveTab('messages')}
          className="px-md py-[4px] rounded-full bg-bg-tertiary border border-border-default text-[13px] text-text-secondary min-h-[32px]"
        >
          Messages
        </button>
      </div>

      <div className="pb-[80px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center pt-[120px]">
            <p className="text-text-muted text-[14px]">Loading...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-[120px]">
            <Bell size={48} className="text-text-faint mb-lg" />
            <p className="text-[16px] font-bold text-white mb-sm">No notifications yet</p>
            <p className="text-[13px] text-text-muted">When someone likes or comments on your videos, it&apos;ll show up here</p>
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
