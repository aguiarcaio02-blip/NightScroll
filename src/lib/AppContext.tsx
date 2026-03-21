'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface UserAccount {
  email: string;
  username: string;
}

interface AppContextType {
  ageVerified: boolean;
  setAgeVerified: (v: boolean) => void;
  signedUp: boolean;
  currentUser: UserAccount | null;
  signUp: (account: UserAccount) => void;
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

  return (
    <AppContext.Provider value={{
      ageVerified, setAgeVerified: handleSetAgeVerified,
      signedUp: currentUser !== null,
      currentUser, signUp,
      activeTab, setActiveTab,
      feedTab, setFeedTab,
      commentsOpen, setCommentsOpen,
      shareOpen, setShareOpen,
      tipOpen, setTipOpen, tipCreatorId, openTip,
      currentVideoId, setCurrentVideoId,
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
