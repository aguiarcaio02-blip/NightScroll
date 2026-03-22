'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, BadgeCheck, Crown, Send, Grid3X3, Lock, Heart, Play, DollarSign, Share2, Settings, User, X } from 'lucide-react';
import { Creator, Video, formatCount } from '@/lib/mock-data';
import { useApp } from '@/lib/AppContext';
import { fetchLikedPostIds } from '@/lib/supabase-posts';
import EditProfileModal from './EditProfileModal';
import VideoCard from './VideoCard';

interface Props {
  creator: Creator;
  isOwn?: boolean;
  onBack: () => void;
}

const contentTabs = [
  { id: 'videos', icon: Grid3X3, label: 'Videos' },
  { id: 'premium', icon: Lock, label: 'Premium' },
  { id: 'liked', icon: Heart, label: 'Liked' },
];

export default function ProfilePage({ creator, isOwn, onBack }: Props) {
  const [activeTab, setActiveTab] = useState('videos');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);
  const { openTip, setActiveTab: setAppTab, currentUser, myVideos, feedVideos } = useApp();

  // Fetch liked post IDs for own profile
  useEffect(() => {
    if (isOwn && currentUser) {
      fetchLikedPostIds(currentUser.username)
        .then(setLikedPostIds)
        .catch(() => {});
    }
  }, [isOwn, currentUser]);

  // Use current user data for own profile
  const displayAvatar = isOwn && currentUser?.avatar ? currentUser.avatar : creator.avatar;
  const displayBio = isOwn && currentUser ? (currentUser.bio || 'Welcome to my profile! Edit to add your bio.') : creator.bio;

  // For own profile show user's posts, for others filter feed by username
  const creatorVideos = isOwn
    ? myVideos
    : feedVideos.filter(v => v.creatorId === creator.username);
  const premiumVideos = creatorVideos.filter(v => v.isPremium);
  const likedVideos = feedVideos.filter(v => likedPostIds.includes(v.id));

  const displayVideos = activeTab === 'premium'
    ? premiumVideos
    : activeTab === 'liked'
    ? likedVideos
    : creatorVideos;

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-bg-primary">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-bg-primary flex items-center justify-between px-lg h-[44px] border-b border-border-subtle">
        <button onClick={onBack} className="w-[44px] h-[44px] flex items-center justify-center" aria-label="Go back">
          <ChevronLeft size={24} color="white" />
        </button>
        <span className="text-[15px] font-bold text-white">@{creator.username}</span>
        <button className="w-[44px] h-[44px] flex items-center justify-center" aria-label={isOwn ? 'Settings' : 'More options'}>
          {isOwn ? <Settings size={20} color="white" /> : <Share2 size={20} color="white" />}
        </button>
      </div>

      {/* Profile info */}
      <div className="flex flex-col items-center px-xl pt-2xl pb-lg">
        {/* Avatar */}
        <div className="relative mb-md">
          <div className="w-[80px] h-[80px] rounded-full bg-bg-tertiary flex items-center justify-center text-[36px] border-2 border-border-default overflow-hidden">
            {displayAvatar && displayAvatar.startsWith('data:') ? (
              <img src={displayAvatar} alt="Profile" className="w-full h-full object-cover" />
            ) : displayAvatar ? (
              displayAvatar
            ) : (
              <User size={36} className="text-text-muted" />
            )}
          </div>
          {creator.verified && (
            <div className="absolute -bottom-[2px] -right-[2px] w-[22px] h-[22px] rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', border: '2px solid #0A0A0A' }}>
              <Crown size={12} color="black" />
            </div>
          )}
        </div>

        {/* Name */}
        <div className="flex items-center gap-sm mb-[2px]">
          <h1 className="text-[18px] font-bold text-white">{creator.displayName}</h1>
          {creator.verified && <BadgeCheck size={16} fill="#D946EF" color="#0A0A0A" />}
        </div>
        <p className="text-[13px] text-text-muted mb-sm">@{creator.username}</p>

        {/* Bio */}
        <p className="text-[13px] text-text-secondary text-center max-w-[300px] leading-[1.5] mb-xl">
          {displayBio}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3xl mb-xl">
          {[
            { count: creator.following, label: 'Following' },
            { count: creator.followers, label: 'Followers' },
            { count: creator.likes, label: 'Likes' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-[16px] font-bold text-white">{formatCount(stat.count)}</span>
              <span className="text-[12px] text-text-muted">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        {isOwn ? (
          <button
            onClick={() => setEditOpen(true)}
            className="px-xl py-sm rounded-full bg-bg-tertiary border border-border-default text-[14px] text-white font-semibold min-h-[40px]"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-sm">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className="px-xl py-sm rounded-full text-[14px] font-semibold transition-all min-h-[40px]"
              style={{
                background: isFollowing ? 'transparent' : 'linear-gradient(135deg, #D946EF, #A855F7)',
                border: isFollowing ? '1px solid #333' : 'none',
                color: 'white',
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            {creator.subscriptionPrice && (
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className="px-xl py-sm rounded-full text-[14px] font-semibold flex items-center gap-sm transition-all min-h-[40px]"
                style={{
                  background: isSubscribed ? 'transparent' : 'linear-gradient(135deg, #F59E0B, #D97706)',
                  border: isSubscribed ? '1px solid #F59E0B' : 'none',
                  color: isSubscribed ? '#F59E0B' : 'black',
                }}
              >
                <Crown size={14} />
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            )}
            <button
              onClick={() => setAppTab('messages')}
              className="w-[40px] h-[40px] rounded-full bg-bg-tertiary border border-border-default flex items-center justify-center"
              aria-label="Message creator"
            >
              <Send size={16} color="white" />
            </button>
          </div>
        )}
      </div>

      {/* Subscription tiers */}
      {!isOwn && creator.tiers.length > 0 && (
        <div className="px-lg mb-lg">
          <h3 className="text-[14px] font-bold text-white mb-md">Subscription Plans</h3>
          <div className="flex gap-sm overflow-x-auto pb-sm">
            {creator.tiers.map((tier) => (
              <div
                key={tier.name}
                className="shrink-0 w-[160px] bg-bg-tertiary rounded-[12px] p-md"
                style={{ borderLeft: `3px solid ${tier.color}` }}
              >
                <div className="flex items-center gap-sm mb-sm">
                  <Crown size={14} style={{ color: tier.color }} />
                  <span className="text-[13px] font-bold text-white">{tier.name}</span>
                </div>
                <p className="text-[16px] font-bold text-white mb-sm">${tier.price}<span className="text-[11px] text-text-muted font-normal">/mo</span></p>
                <ul className="space-y-[4px]">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="text-[11px] text-text-muted leading-[1.3]">• {perk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content tabs */}
      <div className="sticky top-[44px] z-10 bg-bg-primary border-b border-border-subtle flex">
        {contentTabs.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-sm py-md min-h-[44px] relative"
              aria-label={tab.label}
            >
              <Icon size={16} color={active ? 'white' : '#555'} />
              <span className="text-[13px]" style={{ color: active ? 'white' : '#555' }}>
                {tab.label}
              </span>
              {active && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-accent-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-3 gap-[2px] pb-[80px]">
        {displayVideos.length > 0 ? (
          displayVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="relative aspect-[9/16] rounded-[4px] overflow-hidden cursor-pointer group"
              style={{ background: video.gradient }}
            >
              {video.thumbnailUrl && (
                <img src={video.thumbnailUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              {video.isPremium && (
                <div className="absolute top-[4px] right-[4px]">
                  <Crown size={12} className="text-accent-gold" fill="#F59E0B" />
                </div>
              )}
              <div className="absolute bottom-[4px] left-[4px] flex items-center gap-[2px]">
                <Play size={10} color="white" fill="white" />
                <span className="text-[11px] text-white">{formatCount(video.views)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-3xl text-center">
            {activeTab === 'liked' ? (
              <Heart size={32} className="text-text-faint mx-auto mb-md" />
            ) : (
              <Lock size={32} className="text-text-faint mx-auto mb-md" />
            )}
            <p className="text-text-muted text-[14px]">
              {activeTab === 'premium'
                ? 'No premium content yet'
                : activeTab === 'liked'
                ? 'No liked videos yet'
                : 'No content yet'}
            </p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isOwn && <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />}

      {/* Full-screen video viewer */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[200] bg-black">
          <VideoCard video={selectedVideo} onProfileClick={() => {}} />
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-[16px] left-[16px] z-[300] w-[40px] h-[40px] rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
            aria-label="Close video"
          >
            <X size={22} color="white" />
          </button>
        </div>
      )}
    </div>
  );
}
