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

const gradients = [
  'linear-gradient(180deg, #1a0533 0%, #0d001a 50%, #0A0A0A 100%)',
  'linear-gradient(180deg, #330d1a 0%, #1a0011 50%, #0A0A0A 100%)',
  'linear-gradient(180deg, #0d1a33 0%, #000d1a 50%, #0A0A0A 100%)',
  'linear-gradient(180deg, #1a330d 0%, #0d1a00 50%, #0A0A0A 100%)',
  'linear-gradient(180deg, #33200d 0%, #1a1100 50%, #0A0A0A 100%)',
  'linear-gradient(180deg, #2d0d33 0%, #190019 50%, #0A0A0A 100%)',
  'linear-gradient(180deg, #0d3333 0%, #001a1a 50%, #0A0A0A 100%)',
  'linear-gradient(180deg, #33330d 0%, #1a1a00 50%, #0A0A0A 100%)',
];

export const creators: Creator[] = [
  {
    id: '1', username: 'luna_midnight', displayName: 'Luna', avatar: '🌙',
    bio: 'Night owl creator ✨ Premium content daily', verified: true, isLive: false, online: true,
    followers: 1250000, following: 342, likes: 8900000, subscriptionPrice: 9.99,
    tiers: [
      { name: 'Bronze', price: 5, color: '#CD7F32', perks: ['Access to premium posts', 'Monthly shoutout'] },
      { name: 'Silver', price: 10, color: '#C0C0C0', perks: ['All Bronze perks', 'Exclusive DMs', 'Behind the scenes'] },
      { name: 'Gold', price: 25, color: '#FFD700', perks: ['All Silver perks', 'Custom content requests', '1-on-1 video calls'] },
    ]
  },
  {
    id: '2', username: 'velvet_rose', displayName: 'Velvet Rose', avatar: '🌹',
    bio: 'Artist & model 🎨 DMs open for collabs', verified: true, isLive: true, online: true,
    followers: 890000, following: 215, likes: 5400000, subscriptionPrice: 14.99,
    tiers: [
      { name: 'Bronze', price: 7, color: '#CD7F32', perks: ['Premium gallery access'] },
      { name: 'Silver', price: 15, color: '#C0C0C0', perks: ['All Bronze perks', 'Weekly exclusives'] },
      { name: 'Gold', price: 30, color: '#FFD700', perks: ['All Silver perks', 'Priority DMs'] },
    ]
  },
  {
    id: '3', username: 'blaze_x', displayName: 'Blaze', avatar: '🔥',
    bio: 'Fitness & lifestyle creator 💪', verified: true, isLive: false, online: false,
    followers: 2100000, following: 89, likes: 15000000, subscriptionPrice: 4.99,
    tiers: []
  },
  {
    id: '4', username: 'scarlet_dreams', displayName: 'Scarlet', avatar: '💋',
    bio: 'Living the dream one night at a time 🌃', verified: false, isLive: false, online: true,
    followers: 456000, following: 567, likes: 2300000, subscriptionPrice: null,
    tiers: []
  },
  {
    id: '5', username: 'noir_queen', displayName: 'Noir Queen', avatar: '👑',
    bio: 'Elegance meets edge. Premium content creator.', verified: true, isLive: false, online: false,
    followers: 3400000, following: 156, likes: 22000000, subscriptionPrice: 19.99,
    tiers: [
      { name: 'Silver', price: 10, color: '#C0C0C0', perks: ['Exclusive content', 'DM access'] },
      { name: 'Gold', price: 25, color: '#FFD700', perks: ['All Silver perks', 'Custom requests', 'Video calls'] },
    ]
  },
  {
    id: '6', username: 'midnight_ace', displayName: 'Ace', avatar: '♠️',
    bio: 'Late night vibes only 🎶', verified: false, isLive: false, online: true,
    followers: 123000, following: 890, likes: 670000, subscriptionPrice: null,
    tiers: []
  },
  {
    id: '7', username: 'ember_glow', displayName: 'Ember', avatar: '✨',
    bio: 'Dancing through the night 💃', verified: true, isLive: true, online: true,
    followers: 780000, following: 234, likes: 4500000, subscriptionPrice: 7.99,
    tiers: []
  },
  {
    id: '8', username: 'shadow_fx', displayName: 'Shadow', avatar: '🖤',
    bio: 'Dark aesthetic photographer', verified: false, isLive: false, online: false,
    followers: 345000, following: 432, likes: 1800000, subscriptionPrice: null,
    tiers: []
  },
];

export const videos: Video[] = [
  { id: 'v1', creatorId: '1', caption: 'Late night vibes hitting different tonight ✨', hashtags: ['latenight', 'vibes', 'exclusive'], sound: 'Original Sound — Luna', likes: 124500, comments: 3420, shares: 890, views: 1500000, isPremium: false, gradient: gradients[0], duration: 15 },
  { id: 'v2', creatorId: '2', caption: 'New photoshoot drop 🔥 Who wants to see more?', hashtags: ['photoshoot', 'model', 'premium'], sound: 'Midnight Jazz — LoFi Beats', likes: 89000, comments: 2100, shares: 567, views: 980000, isPremium: true, gradient: gradients[1], duration: 12 },
  { id: 'v3', creatorId: '3', caption: 'Morning workout routine 💪 No excuses', hashtags: ['fitness', 'workout', 'fyp'], sound: 'Beast Mode — GymBeats', likes: 234000, comments: 5600, shares: 12000, views: 3200000, isPremium: false, gradient: gradients[2], duration: 20 },
  { id: 'v4', creatorId: '5', caption: 'Behind the scenes of yesterday\'s shoot 👑', hashtags: ['bts', 'exclusive', 'premium'], sound: 'Original Sound — Noir Queen', likes: 456000, comments: 8900, shares: 23000, views: 5600000, isPremium: true, gradient: gradients[3], duration: 18 },
  { id: 'v5', creatorId: '4', caption: 'City lights and late nights 🌃', hashtags: ['nightlife', 'city', 'trending'], sound: 'Neon Dreams — SynthWave', likes: 67000, comments: 1200, shares: 345, views: 780000, isPremium: false, gradient: gradients[4], duration: 10 },
  { id: 'v6', creatorId: '7', caption: 'Dance with me tonight 💃', hashtags: ['dance', 'fyp', 'trending'], sound: 'Midnight Groove — DJ Shadow', likes: 178000, comments: 4500, shares: 8900, views: 2100000, isPremium: false, gradient: gradients[5], duration: 14 },
  { id: 'v7', creatorId: '6', caption: 'Acoustic session at 2am 🎶', hashtags: ['music', 'acoustic', 'latenight'], sound: 'Original Sound — Ace', likes: 34000, comments: 890, shares: 234, views: 450000, isPremium: false, gradient: gradients[6], duration: 25 },
  { id: 'v8', creatorId: '8', caption: 'Dark aesthetic series pt.3 🖤', hashtags: ['aesthetic', 'dark', 'photography'], sound: 'Shadows — Ambient', likes: 56000, comments: 1500, shares: 678, views: 670000, isPremium: false, gradient: gradients[7], duration: 8 },
];

export const comments: Comment[] = [
  { id: 'c1', userId: '4', username: 'scarlet_dreams', avatar: '💋', text: 'This is absolutely stunning! 🔥🔥', likes: 234, timestamp: '2h ago', replies: [
    { id: 'c1r1', userId: '1', username: 'luna_midnight', avatar: '🌙', text: 'Thank you babe! 💕', likes: 89, timestamp: '1h ago', replies: [] },
  ]},
  { id: 'c2', userId: '6', username: 'midnight_ace', avatar: '♠️', text: 'The vibe is immaculate', likes: 156, timestamp: '3h ago', replies: [] },
  { id: 'c3', userId: '3', username: 'blaze_x', avatar: '🔥', text: 'Keep it up! 💪', likes: 445, timestamp: '5h ago', replies: [
    { id: 'c3r1', userId: '7', username: 'ember_glow', avatar: '✨', text: 'Agreed! Amazing content', likes: 23, timestamp: '4h ago', replies: [] },
    { id: 'c3r2', userId: '8', username: 'shadow_fx', avatar: '🖤', text: 'Love the aesthetic', likes: 12, timestamp: '3h ago', replies: [] },
  ]},
  { id: 'c4', userId: '5', username: 'noir_queen', avatar: '👑', text: 'Collab when? 👀', likes: 890, timestamp: '6h ago', replies: [] },
  { id: 'c5', userId: '2', username: 'velvet_rose', avatar: '🌹', text: 'Obsessed with this whole mood', likes: 67, timestamp: '8h ago', replies: [] },
  { id: 'c6', userId: '7', username: 'ember_glow', avatar: '✨', text: 'Can\'t stop watching this on repeat!', likes: 345, timestamp: '10h ago', replies: [] },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'like', username: 'luna_midnight', avatar: '🌙', text: 'liked your video', timestamp: '2m ago', read: false },
  { id: 'n2', type: 'comment', username: 'blaze_x', avatar: '🔥', text: 'commented: "🔥🔥"', timestamp: '15m ago', read: false },
  { id: 'n3', type: 'follow', username: 'scarlet_dreams', avatar: '💋', text: 'started following you', timestamp: '1h ago', read: false },
  { id: 'n4', type: 'tip', username: 'velvet_rose', avatar: '🌹', text: 'sent you a $10 tip', timestamp: '2h ago', read: true },
  { id: 'n5', type: 'subscription', username: 'noir_queen', avatar: '👑', text: 'subscribed to your premium', timestamp: '3h ago', read: true },
  { id: 'n6', type: 'mention', username: 'ember_glow', avatar: '✨', text: 'mentioned you in a comment', timestamp: '5h ago', read: true },
  { id: 'n7', type: 'system', username: 'NightScroll', avatar: '🌙', text: 'Your video reached 10K views!', timestamp: '1d ago', read: true },
  { id: 'n8', type: 'like', username: 'midnight_ace', avatar: '♠️', text: 'liked your video', timestamp: '1d ago', read: true },
  { id: 'n9', type: 'follow', username: 'shadow_fx', avatar: '🖤', text: 'started following you', timestamp: '2d ago', read: true },
  { id: 'n10', type: 'comment', username: 'luna_midnight', avatar: '🌙', text: 'commented: "Love this!"', timestamp: '3d ago', read: true },
];

export const conversations: Conversation[] = [
  { id: 'conv1', user: creators[0], lastMessage: 'Hey, loved your latest video! 💕', timestamp: '2m ago', unread: 3 },
  { id: 'conv2', user: creators[1], lastMessage: 'When are we doing that collab?', timestamp: '1h ago', unread: 0 },
  { id: 'conv3', user: creators[2], lastMessage: 'Thanks for the tip! 🙏', timestamp: '3h ago', unread: 1 },
  { id: 'conv4', user: creators[4], lastMessage: 'See you at the event tonight', timestamp: '1d ago', unread: 0 },
  { id: 'conv5', user: creators[6], lastMessage: 'That sound is fire 🔥', timestamp: '2d ago', unread: 0 },
];

export const chatMessages: Message[] = [
  { id: 'm1', senderId: '1', text: 'Hey! I saw your latest post, it was amazing 😍', timestamp: '10:30 PM', isMine: false },
  { id: 'm2', senderId: 'me', text: 'Thank you so much! That means a lot coming from you', timestamp: '10:32 PM', isMine: true },
  { id: 'm3', senderId: '1', text: 'We should definitely collab sometime!', timestamp: '10:33 PM', isMine: false },
  { id: 'm4', senderId: 'me', text: 'I would love that! DM me your ideas', timestamp: '10:35 PM', isMine: true },
  { id: 'm5', senderId: '1', text: 'How about a joint live stream next week?', timestamp: '10:36 PM', isMine: false },
  { id: 'm6', senderId: 'me', text: 'Perfect! Let\'s plan it out 🎉', timestamp: '10:38 PM', isMine: true },
  { id: 'm7', senderId: '1', text: 'Loved your latest video! 💕', timestamp: '10:40 PM', isMine: false },
];

export const trendingTags = [
  { tag: '#latenight', views: 24000 },
  { tag: '#exclusive', views: 18500 },
  { tag: '#fyp', views: 156000 },
  { tag: '#trending', views: 89000 },
  { tag: '#premium', views: 12000 },
  { tag: '#nightlife', views: 34000 },
  { tag: '#dance', views: 67000 },
  { tag: '#aesthetic', views: 45000 },
];

export function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

export function getCreator(id: string): Creator | undefined {
  return creators.find(c => c.id === id);
}
