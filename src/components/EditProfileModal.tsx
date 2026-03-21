'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

const avatarOptions = [
  '😎', '🌙', '🔥', '💋', '👑', '✨', '🖤', '♠️',
  '🌹', '💜', '🦋', '🌊', '🎭', '💫', '🐺', '🦊',
  '🍑', '🌸', '💎', '🎵', '🌺', '⭐', '🔮', '🎀',
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ open, onClose }: Props) {
  const { currentUser, updateProfile } = useApp();
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || '😎');
  const [saved, setSaved] = useState(false);

  if (!open) return null;

  const handleSave = () => {
    updateProfile({ bio: bio.trim(), avatar: selectedAvatar });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

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

            {/* Current avatar preview */}
            <div className="flex justify-center mb-lg">
              <div className="w-[80px] h-[80px] rounded-full bg-bg-hover border-2 border-accent-primary flex items-center justify-center text-[36px]">
                {selectedAvatar}
              </div>
            </div>

            {/* Avatar grid */}
            <div className="grid grid-cols-6 gap-sm">
              {avatarOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedAvatar(emoji)}
                  className="w-full aspect-square rounded-[12px] flex items-center justify-center text-[24px] transition-all"
                  style={{
                    background: selectedAvatar === emoji ? '#2A2A2A' : 'transparent',
                    border: selectedAvatar === emoji ? '2px solid #D946EF' : '2px solid transparent',
                  }}
                  aria-label={`Select ${emoji} as profile picture`}
                >
                  {emoji}
                </button>
              ))}
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
