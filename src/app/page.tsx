'use client';

import { useState } from 'react';
import { AppProvider, useApp } from '@/lib/AppContext';
import { creators } from '@/lib/mock-data';
import AgeGate from '@/components/AgeGate';
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

function AppContent() {
  const { ageVerified, activeTab, setActiveTab } = useApp();
  const [viewingProfile, setViewingProfile] = useState<string | null>(null);

  if (!ageVerified) {
    return <AgeGate />;
  }

  const handleProfileClick = (creatorId: string) => {
    setViewingProfile(creatorId);
  };

  const handleBackFromProfile = () => {
    setViewingProfile(null);
  };

  // If viewing someone's profile
  if (viewingProfile) {
    const creator = creators.find(c => c.id === viewingProfile);
    if (creator) {
      return (
        <div className="h-full">
          <div className="lg:ml-[240px] h-full">
            <ProfilePage creator={creator} onBack={handleBackFromProfile} />
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
              username: 'your_name',
              displayName: 'Your Name',
              avatar: '😎',
              bio: 'Welcome to my profile! Edit to add your bio.',
              verified: false,
              isLive: false,
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
  );
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
