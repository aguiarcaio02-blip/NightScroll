'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X, TrendingUp, Star, Play, Crown, User, Hash } from 'lucide-react';
import { formatCount } from '@/lib/mock-data';
import { useApp } from '@/lib/AppContext';
import { searchPosts, fetchCreators, fetchTags, SupabasePost } from '@/lib/supabase-posts';

const filterPills = ['All', 'Creators', 'Videos', 'Premium'];

interface Props {
  onProfileClick: (creatorId: string) => void;
}

export default function DiscoverPage({ onProfileClick }: Props) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchResults, setSearchResults] = useState<SupabasePost[]>([]);
  const [creators, setCreators] = useState<{ username: string; avatar: string; postCount: number }[]>([]);
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { feedVideos, allPosts } = useApp();

  // Load creators and tags on mount
  useEffect(() => {
    fetchCreators().then(setCreators).catch(() => {});
    fetchTags().then(setTags).catch(() => {});
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setSearching(true);
    const timer = setTimeout(async () => {
      const results = await searchPosts(query);
      setSearchResults(results);
      setHasSearched(true);
      setSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    setActiveFilter('All');
  };

  // Filter search results based on active pill
  const filteredResults = searchResults.filter(post => {
    if (activeFilter === 'Creators') return false; // handled separately
    if (activeFilter === 'Premium') return post.premium_content;
    return true;
  });

  // Filter creators based on search query
  const filteredCreators = query.trim()
    ? creators.filter(c => c.username.toLowerCase().includes(query.toLowerCase()))
    : creators;

  // Filter tags based on search query
  const filteredTags = query.trim()
    ? tags.filter(t => t.tag.toLowerCase().includes(query.toLowerCase()))
    : tags;

  const isSearching = query.trim().length > 0;

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-bg-primary">
      {/* Search bar */}
      <div className="sticky top-0 z-20 bg-bg-primary px-lg pt-lg pb-sm">
        <div className="relative">
          <Search size={18} className="absolute left-md top-1/2 -translate-y-1/2 text-text-faint" />
          <input
            type="text"
            placeholder="Search creators, tags, videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-bg-tertiary rounded-[8px] pl-[40px] pr-[40px] py-md text-[14px] text-white placeholder:text-text-faint outline-none focus:ring-1 focus:ring-accent-primary h-[44px]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-md top-1/2 -translate-y-1/2"
              aria-label="Clear search"
            >
              <X size={18} className="text-text-faint" />
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex gap-sm mt-md overflow-x-auto pb-sm">
          {filterPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setActiveFilter(pill)}
              className="px-lg py-[6px] rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors min-h-[32px]"
              style={{
                background: activeFilter === pill ? '#D946EF' : '#1A1A1A',
                color: 'white',
                border: activeFilter === pill ? 'none' : '1px solid #333',
              }}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      <div className="px-lg pb-[80px]">
        {/* Search Results */}
        {isSearching ? (
          <>
            {searching && (
              <div className="flex items-center justify-center py-xl">
                <p className="text-text-muted text-[14px]">Searching...</p>
              </div>
            )}

            {/* Creator results */}
            {(activeFilter === 'All' || activeFilter === 'Creators') && filteredCreators.length > 0 && (
              <div className="mb-2xl">
                <h2 className="text-[14px] font-bold text-text-muted mb-md">Creators</h2>
                {filteredCreators.map((creator) => (
                  <button
                    key={creator.username}
                    onClick={() => {
                      // Find a post by this creator to navigate to their profile view
                      const post = allPosts.find(p => p.username === creator.username);
                      if (post) onProfileClick(creator.username);
                    }}
                    className="flex items-center gap-md py-md w-full hover:bg-bg-hover rounded-[8px] px-sm transition-colors"
                  >
                    <div className="w-[44px] h-[44px] rounded-full bg-bg-tertiary flex items-center justify-center text-[20px] overflow-hidden shrink-0">
                      {creator.avatar && creator.avatar.startsWith('data:') ? (
                        <img src={creator.avatar} alt="" className="w-full h-full object-cover" />
                      ) : creator.avatar ? (
                        creator.avatar
                      ) : (
                        <User size={20} className="text-text-muted" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[14px] font-semibold text-white">@{creator.username}</p>
                      <p className="text-[12px] text-text-muted">{creator.postCount} {creator.postCount === 1 ? 'video' : 'videos'}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Tag results */}
            {(activeFilter === 'All') && filteredTags.length > 0 && (
              <div className="mb-2xl">
                <h2 className="text-[14px] font-bold text-text-muted mb-md">Tags</h2>
                {filteredTags.slice(0, 10).map((t) => (
                  <button
                    key={t.tag}
                    onClick={() => handleTagClick(t.tag)}
                    className="flex items-center gap-md py-md w-full hover:bg-bg-hover rounded-[8px] px-sm transition-colors"
                  >
                    <div className="w-[44px] h-[44px] rounded-full bg-bg-tertiary flex items-center justify-center shrink-0">
                      <Hash size={20} className="text-accent-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[14px] font-semibold text-white">{t.tag}</p>
                      <p className="text-[12px] text-text-muted">{t.count} {t.count === 1 ? 'video' : 'videos'}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Video results */}
            {activeFilter !== 'Creators' && filteredResults.length > 0 && (
              <div>
                <h2 className="text-[14px] font-bold text-text-muted mb-md">Videos</h2>
                <div className="grid grid-cols-3 gap-[2px]">
                  {filteredResults.map((post) => (
                    <div
                      key={post.id}
                      className="relative aspect-[9/16] rounded-[4px] overflow-hidden cursor-pointer group"
                      style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
                    >
                      {post.thumbnail_url && (
                        <img src={post.thumbnail_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      {post.premium_content && (
                        <div className="absolute top-[4px] right-[4px]">
                          <Crown size={12} className="text-accent-gold" fill="#F59E0B" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-[4px] bg-gradient-to-t from-black/60 to-transparent">
                        <div className="flex items-center gap-[4px]">
                          <div className="w-[16px] h-[16px] rounded-full bg-bg-tertiary flex items-center justify-center text-[8px] shrink-0 overflow-hidden">
                            {post.avatar && post.avatar.startsWith('data:') ? (
                              <img src={post.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <User size={8} className="text-text-muted" />
                            )}
                          </div>
                          <span className="text-[10px] text-white truncate">@{post.username}</span>
                        </div>
                        <div className="flex items-center gap-[2px] mt-[2px]">
                          <Play size={8} color="white" fill="white" />
                          <span className="text-[10px] text-white">{formatCount(post.views)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {hasSearched && !searching && filteredCreators.length === 0 && filteredResults.length === 0 && filteredTags.length === 0 && (
              <div className="flex flex-col items-center justify-center pt-[80px]">
                <Search size={48} className="text-text-faint mb-lg" />
                <p className="text-[16px] font-bold text-white mb-sm">No results found</p>
                <p className="text-[13px] text-text-muted text-center">Try searching for something else</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Default view — Trending Tags */}
            {tags.length > 0 && (
              <div className="mb-2xl">
                <div className="flex items-center gap-sm mb-md">
                  <TrendingUp size={16} className="text-accent-primary" />
                  <h2 className="text-[16px] font-bold text-white">Trending Tags</h2>
                </div>
                <div className="flex gap-sm overflow-x-auto pb-sm">
                  {tags.slice(0, 10).map((t) => (
                    <button
                      key={t.tag}
                      onClick={() => handleTagClick(t.tag)}
                      className="bg-bg-tertiary border border-border-subtle rounded-[8px] px-lg py-sm shrink-0 hover:bg-bg-hover transition-colors"
                    >
                      <p className="text-accent-primary text-[13px] font-semibold">{t.tag}</p>
                      <p className="text-text-faint text-[11px]">{t.count} {t.count === 1 ? 'video' : 'videos'}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Top Creators */}
            {creators.length > 0 && (
              <div className="mb-2xl">
                <div className="flex items-center gap-sm mb-md">
                  <Star size={16} className="text-accent-gold" />
                  <h2 className="text-[16px] font-bold text-white">Creators</h2>
                </div>
                <div className="flex gap-lg overflow-x-auto pb-sm">
                  {creators.map((creator) => (
                    <button
                      key={creator.username}
                      onClick={() => onProfileClick(creator.username)}
                      className="flex flex-col items-center shrink-0 min-w-[72px]"
                    >
                      <div className="p-[2px] rounded-full" style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}>
                        <div className="w-[56px] h-[56px] rounded-full bg-bg-primary p-[2px]">
                          <div className="w-full h-full rounded-full bg-bg-tertiary flex items-center justify-center text-[24px] overflow-hidden">
                            {creator.avatar && creator.avatar.startsWith('data:') ? (
                              <img src={creator.avatar} alt="" className="w-full h-full object-cover" />
                            ) : creator.avatar ? (
                              creator.avatar
                            ) : (
                              <User size={24} className="text-text-muted" />
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-white font-medium mt-[4px] max-w-[72px] truncate">
                        @{creator.username}
                      </p>
                      <p className="text-[10px] text-text-muted">{creator.postCount} videos</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Explore Grid — all videos */}
            {allPosts.length > 0 && (
              <div>
                <h2 className="text-[16px] font-bold text-white mb-md">Explore</h2>
                <div className="grid grid-cols-3 gap-[2px]">
                  {allPosts.map((post) => (
                    <div
                      key={post.id}
                      className="relative aspect-[9/16] rounded-[4px] overflow-hidden cursor-pointer group"
                      style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
                    >
                      {post.thumbnail_url && (
                        <img src={post.thumbnail_url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      {post.premium_content && (
                        <div className="absolute top-[4px] right-[4px]">
                          <Crown size={12} className="text-accent-gold" fill="#F59E0B" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-[4px] bg-gradient-to-t from-black/60 to-transparent">
                        <div className="flex items-center gap-[4px]">
                          <div className="w-[16px] h-[16px] rounded-full bg-bg-tertiary flex items-center justify-center text-[8px] shrink-0 overflow-hidden">
                            {post.avatar && post.avatar.startsWith('data:') ? (
                              <img src={post.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <User size={8} className="text-text-muted" />
                            )}
                          </div>
                          <span className="text-[10px] text-white truncate">@{post.username}</span>
                        </div>
                        <div className="flex items-center gap-[2px] mt-[2px]">
                          <Play size={8} color="white" fill="white" />
                          <span className="text-[10px] text-white">{formatCount(post.views)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {creators.length === 0 && allPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center pt-[80px]">
                <Search size={48} className="text-text-faint mb-lg" />
                <p className="text-[16px] font-bold text-white mb-sm">Nothing to explore yet</p>
                <p className="text-[13px] text-text-muted text-center">Be the first creator on the platform!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
