'use client';

import { useState } from 'react';
import { AppProvider, useApp } from '@/lib/AppContext';
import { creators } from '@/lib/mock-data';
import AgeGate from '@/components/AgeGate';
import SignUpScreen from '@/components/SignUpScreen';
import BottomNav from '@/components/BottomNav';
import Sidebar from '@/components/Sidebar';
import VideoFeed from '@/components/VideoFeed';
import DiscoverPage from '@/components/DiscoverPage';
import CreatePage from '@/components/CreatePage';
import InboxPage from '@/components/InboxPage';
import MessagesPage from '@/components/MessagesPage';
import ProfilePage from '@/components/ProfilePage';
import CommentsDrawer from '@/components/CommentsDrawer';
import ShareSheet from '@/components/ShareSheet';
import TipOverlay from '@/components/TipOverlay';
import PullToRefresh from '@/components/PullToRefresh';

function AppContent() {
  const { ageVerified, signedUp, currentUser, activeTab, setActiveTab, allPosts } = useApp();
  const [viewingProfile, setViewingProfile] = useState<string | null>(null);

  if (!ageVerified) {
    return <AgeGate />;
  }

  if (!signedUp) {
    return <SignUpScreen />;
  }

  const handleProfileClick = (creatorId: string) => {
    setViewingProfile(creatorId);
  };

  const handleBackFromProfile = () => {
    setViewingProfile(null);
  };

  // If viewing someone's profile (by username)
  if (viewingProfile) {
    // Build a Creator object from Supabase post data
    const postByUser = allPosts.find(p => p.username === viewingProfile);
    const profileCreator = postByUser ? {
      id: viewingProfile,
      username: viewingProfile,
      displayName: viewingProfile,
      avatar: postByUser.avatar || '',
      bio: '',
      verified: false,
      online: false,
      followers: 0,
      following: 0,
      likes: 0,
      subscriptionPrice: null as number | null,
      tiers: [] as { name: string; price: number; color: string; perks: string[] }[],
    } : null;

    if (profileCreator) {
      return (
        <div className="h-full">
          <div className="lg:ml-[240px] h-full">
            <ProfilePage creator={profileCreator} onBack={handleBackFromProfile} />
          </div>
          <Sidebar />
          <BottomNav />
          <CommentsDrawer />
          <ShareSheet />
          <TipOverlay />
        </div>
      );
    }
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed onProfileClick={handleProfileClick} />;
      case 'discover':
        return <DiscoverPage onProfileClick={handleProfileClick} />;
      case 'create':
        return <CreatePage />;
      case 'inbox':
        return <InboxPage />;
      case 'messages':
        return <MessagesPage onProfileClick={handleProfileClick} />;
      case 'profile':
        return (
          <ProfilePage
            creator={{
              id: 'me',
              username: currentUser?.username || 'user',
              displayName: currentUser?.username || 'User',
              avatar: '😎',
              bio: 'Welcome to my profile! Edit to add your bio.',
              verified: false,

              online: true,
              followers: 0,
              following: 0,
              likes: 0,
              subscriptionPrice: null,
              tiers: [],
            }}
            isOwn
            onBack={() => setActiveTab('home')}
          />
        );
      default:
        return <VideoFeed onProfileClick={handleProfileClick} />;
    }
  };

  return (
    <PullToRefresh>
      <div className="h-full">
        <div className="lg:ml-[240px] h-full pb-[60px] lg:pb-0">
          {renderPage()}
        </div>
        <Sidebar />
        <BottomNav isFeed={activeTab === 'home'} />
        <CommentsDrawer />
        <ShareSheet />
        <TipOverlay />
      </div>
    </PullToRefresh>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
