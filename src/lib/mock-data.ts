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
  videoUrl?: string;
  thumbnailUrl?: string;
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

export const creators: Creator[] = [
  {
    id: 'c1',
    username: 'jaylen',
    displayName: 'Jaylen Carter',
    avatar: '🎤',
    bio: 'Music producer & songwriter. Dropping heat daily 🔥',
    verified: true,
    isLive: false,
    online: true,
    followers: 245000,
    following: 312,
    likes: 1800000,
    subscriptionPrice: 4.99,
    tiers: [
      { name: 'Fan', price: 4.99, color: '#D946EF', perks: ['Early access to tracks', 'Behind the scenes'] },
      { name: 'VIP', price: 14.99, color: '#F59E0B', perks: ['Unreleased music', 'Monthly live sessions', 'DM access'] },
    ],
  },
  {
    id: 'c2',
    username: 'mia.creates',
    displayName: 'Mia Chen',
    avatar: '🎨',
    bio: 'Digital artist & illustrator ✨ Commissions open',
    verified: true,
    isLive: true,
    online: true,
    followers: 89000,
    following: 540,
    likes: 620000,
    subscriptionPrice: 9.99,
    tiers: [
      { name: 'Supporter', price: 9.99, color: '#D946EF', perks: ['Process videos', 'Wallpaper downloads'] },
    ],
  },
  {
    id: 'c3',
    username: 'fitwithdave',
    displayName: 'Dave Romano',
    avatar: '💪',
    bio: 'Certified personal trainer. Transform your body 🏋️',
    verified: false,
    isLive: false,
    online: false,
    followers: 34000,
    following: 189,
    likes: 290000,
    subscriptionPrice: null,
    tiers: [],
  },
  {
    id: 'c4',
    username: 'luna.vibes',
    displayName: 'Luna Park',
    avatar: '🌙',
    bio: 'Late night content. ASMR & chill vibes 🎧',
    verified: true,
    isLive: false,
    online: true,
    followers: 512000,
    following: 95,
    likes: 4200000,
    subscriptionPrice: 7.99,
    tiers: [
      { name: 'Night Owl', price: 7.99, color: '#8B5CF6', perks: ['Exclusive ASMR', 'Custom audio requests'] },
      { name: 'Inner Circle', price: 19.99, color: '#F59E0B', perks: ['All Night Owl perks', 'Private streams', '1-on-1 sessions'] },
    ],
  },
  {
    id: 'c5',
    username: 'chefmarco',
    displayName: 'Marco Silva',
    avatar: '👨‍🍳',
    bio: 'Pro chef cooking up magic. Recipes that slap 🍳',
    verified: false,
    isLive: false,
    online: true,
    followers: 67000,
    following: 220,
    likes: 430000,
    subscriptionPrice: null,
    tiers: [],
  },
  {
    id: 'c6',
    username: 'travelwithnova',
    displayName: 'Nova Williams',
    avatar: '✈️',
    bio: 'Full-time traveler. 42 countries and counting 🌍',
    verified: true,
    isLive: false,
    online: false,
    followers: 178000,
    following: 410,
    likes: 1100000,
    subscriptionPrice: 5.99,
    tiers: [
      { name: 'Explorer', price: 5.99, color: '#22C55E', perks: ['Travel guides', 'Hidden gem locations', 'Packing lists'] },
    ],
  },
];

export const videos: Video[] = [
  {
    id: 'v1',
    creatorId: 'c1',
    caption: 'New beat just dropped, what yall think? 🎵',
    hashtags: ['#producer', '#beats', '#newmusic', '#fyp'],
    sound: 'Original Sound - jaylen',
    likes: 42300,
    comments: 1820,
    shares: 3400,
    views: 385000,
    isPremium: false,
    gradient: 'linear-gradient(135deg, #1a0533, #2d1b69, #1a0533)',
    duration: 18,
  },
  {
    id: 'v2',
    creatorId: 'c2',
    caption: 'Speed painting this portrait in 30 seconds ✨',
    hashtags: ['#art', '#digitalart', '#speedpaint', '#trending'],
    sound: 'Lofi Chill - Beats To Paint To',
    likes: 18700,
    comments: 640,
    shares: 2100,
    views: 156000,
    isPremium: false,
    gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    duration: 22,
  },
  {
    id: 'v3',
    creatorId: 'c4',
    caption: 'This sound will put you to sleep in 2 minutes 🌙',
    hashtags: ['#asmr', '#sleep', '#relaxing', '#latenight'],
    sound: 'Rain & Thunder - luna.vibes',
    likes: 89400,
    comments: 3200,
    shares: 12000,
    views: 920000,
    isPremium: false,
    gradient: 'linear-gradient(135deg, #0c0c1d, #1a1a3e, #0d0d2b)',
    duration: 30,
  },
  {
    id: 'v4',
    creatorId: 'c3',
    caption: '5 exercises you NEED for bigger arms 💪',
    hashtags: ['#fitness', '#workout', '#gym', '#gains'],
    sound: 'Gym Motivation Mix',
    likes: 7200,
    comments: 380,
    shares: 910,
    views: 62000,
    isPremium: false,
    gradient: 'linear-gradient(135deg, #1a1a1a, #2d1f1f, #1a1a1a)',
    duration: 25,
  },
  {
    id: 'v5',
    creatorId: 'c5',
    caption: 'Making the perfect carbonara from scratch 🍝',
    hashtags: ['#cooking', '#recipe', '#foodtok', '#pasta'],
    sound: 'Italian Kitchen Vibes',
    likes: 31500,
    comments: 1400,
    shares: 5600,
    views: 278000,
    isPremium: false,
    gradient: 'linear-gradient(135deg, #1a1207, #2b1d0e, #1a1207)',
    duration: 20,
  },
  {
    id: 'v6',
    creatorId: 'c6',
    caption: 'You NEED to visit this hidden beach in Thailand 🏝️',
    hashtags: ['#travel', '#thailand', '#beach', '#fyp'],
    sound: 'Tropical House - Summer Mix',
    likes: 54200,
    comments: 2100,
    shares: 8900,
    views: 490000,
    isPremium: false,
    gradient: 'linear-gradient(135deg, #003d4d, #006680, #004d66)',
    duration: 15,
  },
  {
    id: 'v7',
    creatorId: 'c1',
    caption: 'Exclusive studio session preview 🎧',
    hashtags: ['#studio', '#exclusive', '#premium'],
    sound: 'Unreleased - jaylen',
    likes: 12800,
    comments: 890,
    shares: 450,
    views: 98000,
    isPremium: true,
    gradient: 'linear-gradient(135deg, #2d1b69, #4a1a8a, #2d1b69)',
    duration: 16,
  },
  {
    id: 'v8',
    creatorId: 'c4',
    caption: 'POV: 3AM and you cant sleep 🌌',
    hashtags: ['#nightowl', '#aesthetic', '#vibes', '#latenight'],
    sound: 'Midnight Drive - luna.vibes',
    likes: 67800,
    comments: 2800,
    shares: 9200,
    views: 710000,
    isPremium: false,
    gradient: 'linear-gradient(135deg, #0a0a1a, #151530, #0d0d20)',
    duration: 12,
  },
  {
    id: 'v9',
    creatorId: 'c2',
    caption: 'Full process of my latest commission 🖌️',
    hashtags: ['#artprocess', '#commission', '#premium', '#exclusive'],
    sound: 'Chill Beats - Studio Session',
    likes: 8900,
    comments: 320,
    shares: 180,
    views: 45000,
    isPremium: true,
    gradient: 'linear-gradient(135deg, #1a0a2e, #2b1040, #1a0a2e)',
    duration: 28,
  },
  {
    id: 'v10',
    creatorId: 'c5',
    caption: 'Wait for the flip... 🥞 trust me on this one',
    hashtags: ['#cooking', '#satisfying', '#pancakes', '#trending'],
    sound: 'Oh No - Kreepa',
    likes: 45600,
    comments: 2300,
    shares: 7800,
    views: 520000,
    isPremium: false,
    gradient: 'linear-gradient(135deg, #1f1005, #3a200a, #1f1005)',
    duration: 10,
  },
  {
    id: 'v11',
    creatorId: 'c3',
    caption: 'My client lost 30lbs in 3 months. Heres how 📈',
    hashtags: ['#transformation', '#fitness', '#motivation'],
    sound: 'Success Story - Motivational',
    likes: 15400,
    comments: 720,
    shares: 2300,
    views: 134000,
    isPremium: false,
    gradient: 'linear-gradient(135deg, #0a1a0a, #1a2d1a, #0a1a0a)',
    duration: 22,
  },
  {
    id: 'v12',
    creatorId: 'c6',
    caption: 'Sunrise over Santorini hits different ☀️',
    hashtags: ['#greece', '#santorini', '#sunrise', '#travel'],
    sound: 'Golden Hour - Acoustic',
    likes: 38900,
    comments: 1600,
    shares: 6400,
    views: 340000,
    isPremium: false,
    gradient: 'linear-gradient(135deg, #2d1500, #4a2a00, #2d1500)',
    duration: 14,
  },
];

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
