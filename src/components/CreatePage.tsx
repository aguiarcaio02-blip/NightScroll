'use client';

import { useState } from 'react';
import { ChevronLeft, Upload, Camera, Image, Crown, MessageCircle, Share2, Shield, Eye } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import CameraRecorder from './CameraRecorder';

const suggestedTags = ['#exclusive', '#premium', '#newcontent', '#fyp', '#trending', '#latenight', '#dance', '#aesthetic'];

const settingsRows = [
  { icon: Crown, iconColor: '#F59E0B', label: 'Premium Content', desc: 'Subscribers only', defaultOn: false, locked: false },
  { icon: MessageCircle, iconColor: '#CCCCCC', label: 'Allow Comments', desc: 'Everyone', defaultOn: true, locked: false },
  { icon: Share2, iconColor: '#CCCCCC', label: 'Allow Downloads', desc: 'Off by default', defaultOn: false, locked: false },
];

export default function CreatePage() {
  const { setActiveTab, addPost, currentUser, posting } = useApp();
  const [step, setStep] = useState(1);
  const [showCamera, setShowCamera] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [visibility, setVisibility] = useState('Public');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Premium Content': false,
    'Allow Comments': true,
    'Allow Downloads': false,
    'Age Restriction': true,
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const toggleSetting = (label: string) => {
    setToggles(prev => ({ ...prev, [label]: !prev[label] }));
  };

  if (showCamera) {
    return (
      <CameraRecorder
        onRecorded={(blob, thumb) => {
          setVideoBlob(blob);
          setVideoUrl(URL.createObjectURL(blob));
          setThumbnailUrl(thumb);
          setShowCamera(false);
          setStep(2);
        }}
        onCancel={() => setShowCamera(false)}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-bg-primary">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-bg-primary flex items-center justify-between px-lg h-[44px] border-b border-border-subtle">
        <button
          onClick={() => step === 1 ? setActiveTab('home') : setStep(1)}
          className="w-[44px] h-[44px] flex items-center justify-center"
          aria-label="Go back"
        >
          <ChevronLeft size={24} color="white" />
        </button>
        <span className="text-[15px] font-bold text-white">Create</span>
        <div className="w-[44px]" />
      </div>

      {step === 1 ? (
        <div className="flex flex-col items-center px-xl pt-3xl pb-[80px]">
          {/* Upload zone */}
          <div
            className="w-full max-w-[340px] aspect-[9/16] rounded-[12px] border-2 border-dashed border-border-default bg-bg-secondary flex flex-col items-center justify-center cursor-pointer hover:border-accent-primary hover:bg-bg-tertiary transition-all mb-2xl"
          >
            <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-lg" style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}>
              <Upload size={28} color="white" />
            </div>
            <p className="text-[15px] font-bold text-white mb-xs">Upload a video</p>
            <p className="text-[12px] text-text-muted mb-xs">MP4 or MOV up to 500MB</p>
            <p className="text-[11px] text-text-faint">Drag & drop or click to browse</p>
          </div>

          {/* Record / Gallery buttons */}
          <div className="flex gap-md w-full max-w-[340px]">
            <button
              onClick={() => setShowCamera(true)}
              className="flex-1 flex items-center justify-center gap-sm py-md rounded-[8px] text-white font-semibold text-[14px] min-h-[44px]"
              style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}
            >
              <Camera size={18} />
              Record
            </button>
            <button
              onClick={() => setStep(2)}
              className="flex-1 flex items-center justify-center gap-sm py-md rounded-[8px] text-white font-semibold text-[14px] bg-bg-tertiary border border-border-default min-h-[44px]"
            >
              <Image size={18} />
              Gallery
            </button>
          </div>
        </div>
      ) : (
        <div className="px-lg pt-lg pb-[80px]">
          {/* Preview + Caption */}
          <div className="flex gap-md mb-xl">
            <div className="w-[120px] aspect-[9/16] rounded-[8px] bg-bg-tertiary flex items-center justify-center shrink-0 overflow-hidden relative">
              {videoUrl ? (
                <video
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : thumbnailUrl ? (
                <img src={thumbnailUrl} alt="Video preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent opacity-50" />
              )}
            </div>
            <div className="flex-1 relative">
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={300}
                className="w-full h-full bg-bg-tertiary border border-border-default rounded-[8px] p-md text-[13px] text-white placeholder:text-text-faint outline-none focus:ring-1 focus:ring-accent-primary resize-none min-h-[160px]"
              />
              <span className="absolute bottom-sm right-sm text-[11px] text-text-faint">{caption.length}/300</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-xl">
            <label className="text-[13px] font-semibold text-text-secondary mb-sm block">Tags</label>
            <div className="flex flex-wrap gap-sm">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="px-md py-[6px] rounded-full text-[12px] transition-colors"
                  style={{
                    background: selectedTags.includes(tag) ? '#D946EF' : '#1A1A1A',
                    border: selectedTags.includes(tag) ? '1px solid #D946EF' : '1px solid #333',
                    color: 'white',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-bg-tertiary rounded-[12px] overflow-hidden mb-2xl">
            {settingsRows.map((row, i) => {
              const Icon = row.icon;
              const isOn = toggles[row.label];
              return (
                <div
                  key={row.label}
                  className="flex items-center px-lg py-md"
                  style={{ borderBottom: i < settingsRows.length - 1 ? '1px solid #222' : 'none' }}
                >
                  <Icon size={18} style={{ color: row.iconColor }} className="shrink-0 mr-md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-white">{row.label}</p>
                    <p className="text-[12px] text-text-muted">{row.desc}</p>
                  </div>
                  <button
                    onClick={() => !row.locked && toggleSetting(row.label)}
                    className="relative w-[44px] h-[24px] rounded-full transition-colors shrink-0"
                    style={{ background: isOn ? '#D946EF' : '#333', opacity: row.locked ? 0.6 : 1 }}
                    aria-label={`Toggle ${row.label}`}
                    disabled={row.locked}
                  >
                    <div
                      className="absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-transform"
                      style={{ left: isOn ? '22px' : '2px' }}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Visibility dropdown */}
          <div className="flex items-center bg-bg-tertiary rounded-[12px] px-lg py-md mb-2xl">
            <Eye size={18} className="text-text-secondary shrink-0 mr-md" />
            <div className="flex-1">
              <p className="text-[14px] text-white">Visibility</p>
            </div>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="bg-bg-hover text-white text-[13px] rounded-[8px] px-md py-sm border border-border-default outline-none"
            >
              <option>Public</option>
              <option>Followers</option>
              <option>Private</option>
            </select>
          </div>

          {/* Post button */}
          <button
            disabled={posting}
            onClick={async () => {
              if (!videoUrl || !currentUser || posting) return;
              try {
                await addPost({
                  caption,
                  tags: selectedTags,
                  visibility,
                  premiumContent: toggles['Premium Content'],
                  allowComments: toggles['Allow Comments'],
                  allowDownloads: toggles['Allow Downloads'],
                  ageRestriction: toggles['Age Restriction'],
                }, videoBlob, thumbnailUrl);
                // Reset state and go to profile
                setCaption('');
                setSelectedTags([]);
                setVideoBlob(null);
                setVideoUrl(null);
                setThumbnailUrl(null);
                setStep(1);
                setActiveTab('profile');
              } catch (e) {
                console.error('Post failed:', e);
              }
            }}
            className="w-full h-[48px] rounded-[8px] text-white font-bold text-[15px] disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}
          >
            {posting ? 'Uploading...' : 'Post'}
          </button>
        </div>
      )}
    </div>
  );
}
