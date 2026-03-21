'use client';

import { createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode } from 'react';
import { Video } from '@/lib/mock-data';
import { uploadVideo, uploadThumbnail, createPost, fetchPosts, fetchUserPosts, deletePostById, SupabasePost } from '@/lib/supabase-posts';

export interface UserAccount {
  email: string;
  username: string;
  bio: string;
  avatar: string;
}

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
  // Posts from Supabase
  allPosts: SupabasePost[];
  myPosts: SupabasePost[];
  addPost: (params: {
    caption: string;
    tags: string[];
    visibility: string;
    premiumContent: boolean;
    allowComments: boolean;
    allowDownloads: boolean;
    ageRestriction: boolean;
  }, videoBlob: Blob | null, thumbnailDataUrl: string | null) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  refreshPosts: () => Promise<void>;
  posting: boolean;
  feedVideos: Video[];
  myVideos: Video[];
}

const AppContext = createContext<AppContextType | null>(null);

function loadUser(): UserAccount | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('nightscroll_user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function postToVideo(post: SupabasePost): Video {
  return {
    id: post.id,
    creatorId: post.username,
    caption: post.caption + (post.tags.length > 0 ? ' ' + post.tags.join(' ') : ''),
    hashtags: post.tags,
    sound: 'Original audio',
    likes: post.likes,
    comments: post.comments_count,
    shares: post.shares,
    views: post.views,
    isPremium: post.premium_content,
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    duration: 15,
    videoUrl: post.video_url,
    thumbnailUrl: post.thumbnail_url,
  };
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
  const [allPosts, setAllPosts] = useState<SupabasePost[]>([]);
  const [posting, setPosting] = useState(false);

  // Fetch all posts on mount
  useEffect(() => {
    fetchPosts()
      .then(setAllPosts)
      .catch(e => console.error('Failed to fetch posts:', e));
  }, []);

  const refreshPosts = useCallback(async () => {
    try {
      const posts = await fetchPosts();
      setAllPosts(posts);
    } catch (e) {
      console.error('Failed to refresh posts:', e);
    }
  }, []);

  // Filter posts by current user
  const myPosts = useMemo(() => {
    if (!currentUser) return [];
    return allPosts.filter(p => p.username === currentUser.username);
  }, [allPosts, currentUser]);

  const addPost = useCallback(async (
    params: {
      caption: string;
      tags: string[];
      visibility: string;
      premiumContent: boolean;
      allowComments: boolean;
      allowDownloads: boolean;
      ageRestriction: boolean;
    },
    videoBlob: Blob | null,
    thumbnailDataUrl: string | null,
  ) => {
    if (!currentUser || !videoBlob) return;
    setPosting(true);

    try {
      // Generate a unique ID for file naming
      const fileId = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

      // Upload video to Supabase Storage
      const videoUrl = await uploadVideo(videoBlob, fileId);

      // Upload thumbnail
      let thumbnailUrl = '';
      if (thumbnailDataUrl) {
        thumbnailUrl = await uploadThumbnail(thumbnailDataUrl, fileId);
      }

      // Create post record in database
      const newPost = await createPost({
        username: currentUser.username,
        avatar: currentUser.avatar || '',
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
        caption: params.caption,
        tags: params.tags,
        visibility: params.visibility,
        premium_content: params.premiumContent,
        allow_comments: params.allowComments,
        allow_downloads: params.allowDownloads,
        age_restriction: params.ageRestriction,
      });

      // Add to local state immediately
      setAllPosts(prev => [newPost, ...prev]);
    } catch (e) {
      console.error('Failed to create post:', e);
      throw e;
    } finally {
      setPosting(false);
    }
  }, [currentUser]);

  const deletePost = useCallback(async (id: string) => {
    try {
      await deletePostById(id);
      setAllPosts(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error('Failed to delete post:', e);
    }
  }, []);

  // Convert to Video format for components
  const feedVideos: Video[] = useMemo(() => allPosts.map(postToVideo), [allPosts]);
  const myVideos: Video[] = useMemo(() => myPosts.map(postToVideo), [myPosts]);

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
      allPosts, myPosts, addPost, deletePost, refreshPosts, posting,
      feedVideos, myVideos,
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
