'use client';

import { useState, useRef } from 'react';
import { X, Check, Camera } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ open, onClose }: Props) {
  const { currentUser, updateProfile } = useApp();
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || '');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      // Resize to keep localStorage small
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 200;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Crop to square from center
        const min = Math.min(img.width, img.height);
        const sx = (img.width - min) / 2;
        const sy = (img.height - min) / 2;
        ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);

        setAvatarPreview(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile({ bio: bio.trim(), avatar: avatarPreview });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const hasImage = avatarPreview.startsWith('data:');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="relative bg-bg-tertiary rounded-[16px] w-[90%] max-w-[400px] max-h-[85vh] overflow-y-auto custom-scrollbar animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-bg-tertiary flex items-center justify-between px-lg py-md border-b border-border-subtle rounded-t-[16px]">
          <button
            onClick={onClose}
            className="w-[36px] h-[36px] flex items-center justify-center rounded-full hover:bg-bg-hover"
            aria-label="Close"
          >
            <X size={20} color="white" />
          </button>
          <h3 className="text-[16px] font-bold text-white">Edit Profile</h3>
          <button
            onClick={handleSave}
            className="px-lg py-[6px] rounded-full text-[13px] font-semibold text-white min-h-[32px]"
            style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}
          >
            {saved ? <Check size={16} /> : 'Save'}
          </button>
        </div>

        <div className="p-xl">
          {/* Profile Picture */}
          <div className="mb-2xl">
            <label className="text-[13px] font-semibold text-text-secondary mb-md block">Profile Picture</label>

            <div className="flex flex-col items-center gap-lg">
              {/* Avatar preview */}
              <div className="relative">
                <div className="w-[100px] h-[100px] rounded-full bg-bg-hover border-2 border-accent-primary flex items-center justify-center overflow-hidden">
                  {hasImage ? (
                    <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[44px]">{avatarPreview || '😎'}</span>
                  )}
                </div>
                {/* Camera overlay */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-[32px] h-[32px] rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)', border: '2px solid #1A1A1A' }}
                  aria-label="Change profile picture"
                >
                  <Camera size={14} color="white" />
                </button>
              </div>

              {/* Upload button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-xl py-sm rounded-full bg-bg-hover border border-border-default text-[13px] text-white font-medium hover:bg-border-default transition-colors min-h-[40px]"
              >
                {hasImage ? 'Change Photo' : 'Upload Photo'}
              </button>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                aria-label="Upload profile picture"
              />

              <p className="text-[11px] text-text-faint text-center">JPG, PNG, or GIF. Will be cropped to a circle.</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-xl">
            <label className="text-[13px] font-semibold text-text-secondary mb-sm block">Bio</label>
            <textarea
              placeholder="Tell the world about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={150}
              className="w-full bg-bg-hover border border-border-default rounded-[8px] p-md text-[14px] text-white placeholder:text-text-faint outline-none focus:ring-1 focus:ring-accent-primary resize-none h-[100px]"
            />
            <p className="text-[11px] text-text-faint text-right mt-[4px]">{bio.length}/150</p>
          </div>
        </div>
      </div>
    </div>
  );
}
