'use client';

import { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from 'react';
import { Video } from '@/lib/mock-data';
import { saveVideoBlob, getVideoBlob, deleteVideoBlob } from '@/lib/storage';

export interface UserAccount {
  email: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface UserPost {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  tags: string[];
  visibility: string;
  premiumContent: boolean;
  allowComments: boolean;
  allowDownloads: boolean;
  ageRestriction: boolean;
  createdAt: number;
  username: string;
}

// Metadata stored in localStorage (everything except blob URL)
type PostMeta = Omit<UserPost, 'videoUrl'>;

interface AppContextType {
  ageVerified: boolean;
  setAgeVerified: (v: boolean) => void;
  signedUp: boolean;
  currentUser: UserAccount | null;
  signUp: (account: UserAccount) => void;
  updateProfile: (updates: Partial<UserAccount>) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  feedTab: string;
  setFeedTab: (t: string) => void;
  commentsOpen: boolean;
  setCommentsOpen: (v: boolean) => void;
  shareOpen: boolean;
  setShareOpen: (v: boolean) => void;
  tipOpen: boolean;
  setTipOpen: (v: boolean) => void;
  tipCreatorId: string | null;
  openTip: (creatorId: string) => void;
  currentVideoId: string | null;
  setCurrentVideoId: (id: string | null) => void;
  userPosts: UserPost[];
  addPost: (post: Omit<UserPost, 'id' | 'createdAt'>, videoBlob: Blob | null) => void;
  deletePost: (id: string) => void;
  userVideos: Video[];
}

const AppContext = createContext<AppContextType | null>(null);

const POSTS_KEY = 'nightscroll_posts';

function loadUser(): UserAccount | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('nightscroll_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function loadPostMeta(): PostMeta[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(POSTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function savePostMeta(posts: UserPost[]) {
  if (typeof window === 'undefined') return;
  // Strip videoUrl (blob URLs) before saving — they're not valid across sessions
  const metas: PostMeta[] = posts.map(({ videoUrl, ...rest }) => rest);
  localStorage.setItem(POSTS_KEY, JSON.stringify(metas));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ageVerified, setAgeVerified] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.cookie.includes('age_verified=true');
    }
    return false;
  });
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(loadUser);
  const [activeTab, setActiveTab] = useState('home');
  const [feedTab, setFeedTab] = useState('foryou');
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
  const [tipCreatorId, setTipCreatorId] = useState<string | null>(null);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  // Restore posts from localStorage + IndexedDB on mount
  useEffect(() => {
    async function restorePosts() {
      const metas = loadPostMeta();
      if (metas.length === 0) {
        setPostsLoaded(true);
        return;
      }

      const restored: UserPost[] = [];
      for (const meta of metas) {
        try {
          const blob = await getVideoBlob(meta.id);
          restored.push({
            ...meta,
            videoUrl: blob ? URL.createObjectURL(blob) : '',
          });
        } catch {
          // If blob retrieval fails, still show post with thumbnail
          restored.push({ ...meta, videoUrl: '' });
        }
      }
      setUserPosts(restored);
      setPostsLoaded(true);
    }
    restorePosts();
  }, []);

  // Persist post metadata whenever posts change (after initial load)
  useEffect(() => {
    if (postsLoaded) {
      savePostMeta(userPosts);
    }
  }, [userPosts, postsLoaded]);

  const addPost = useCallback(async (post: Omit<UserPost, 'id' | 'createdAt'>, videoBlob: Blob | null) => {
    const newPost: UserPost = {
      ...post,
      id: `post_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(),
    };

    // Save video blob to IndexedDB
    if (videoBlob) {
      try {
        await saveVideoBlob(newPost.id, videoBlob);
      } catch (e) {
        console.error('Failed to save video blob:', e);
      }
    }

    setUserPosts(prev => [newPost, ...prev]);
  }, []);

  const deletePost = useCallback(async (id: string) => {
    // Remove blob from IndexedDB
    try {
      await deleteVideoBlob(id);
    } catch (e) {
      console.error('Failed to delete video blob:', e);
    }
    setUserPosts(prev => prev.filter(p => p.id !== id));
  }, []);

  // Convert user posts to Video format for feed/profile display
  const userVideos: Video[] = useMemo(() => {
    return userPosts.map(post => ({
      id: post.id,
      creatorId: currentUser?.username || 'me',
      caption: post.caption + (post.tags.length > 0 ? ' ' + post.tags.join(' ') : ''),
      hashtags: post.tags,
      sound: 'Original audio',
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      isPremium: post.premiumContent,
      gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      duration: 15,
      videoUrl: post.videoUrl,
      thumbnailUrl: post.thumbnailUrl,
    }));
  }, [userPosts, currentUser]);

  const openTip = useCallback((creatorId: string) => {
    setTipCreatorId(creatorId);
    setTipOpen(true);
  }, []);

  const handleSetAgeVerified = useCallback((v: boolean) => {
    setAgeVerified(v);
    if (v && typeof document !== 'undefined') {
      document.cookie = 'age_verified=true; max-age=86400; path=/; SameSite=Lax';
    }
  }, []);

  const signUp = useCallback((account: UserAccount) => {
    setCurrentUser(account);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nightscroll_user', JSON.stringify(account));
    }
  }, []);

  const updateProfile = useCallback((updates: Partial<UserAccount>) => {
    setCurrentUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem('nightscroll_user', JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  return (
    <AppContext.Provider value={{
      ageVerified, setAgeVerified: handleSetAgeVerified,
      signedUp: currentUser !== null,
      currentUser, signUp, updateProfile,
      activeTab, setActiveTab,
      feedTab, setFeedTab,
      commentsOpen, setCommentsOpen,
      shareOpen, setShareOpen,
      tipOpen, setTipOpen, tipCreatorId, openTip,
      currentVideoId, setCurrentVideoId,
      userPosts, addPost, deletePost, userVideos,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
