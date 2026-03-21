export interface Creator {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  verified: boolean;
  isLive: boolean;
  online: boolean;
  followers: number;
  following: number;
  likes: number;
  subscriptionPrice: number | null;
  tiers: SubscriptionTier[];
}

export interface SubscriptionTier {
  name: string;
  price: number;
  color: string;
  perks: string[];
}

export interface Video {
  id: string;
  creatorId: string;
  caption: string;
  hashtags: string[];
  sound: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isPremium: boolean;
  gradient: string;
  duration: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
  replies: Comment[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'tip' | 'subscription' | 'mention' | 'system';
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface Conversation {
  id: string;
  user: Creator;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export const creators: Creator[] = [];

export const videos: Video[] = [];

export const comments: Comment[] = [];

export const notifications: Notification[] = [];

export const conversations: Conversation[] = [];

export const chatMessages: Message[] = [];

export const trendingTags: { tag: string; views: number }[] = [];

export function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

export function getCreator(id: string): Creator | undefined {
  return creators.find(c => c.id === id);
}
