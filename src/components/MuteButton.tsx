'use client';

import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  muted: boolean;
  onToggle: () => void;
}

export default function MuteButton({ muted, onToggle }: Props) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="absolute top-[60px] right-[16px] z-[50] w-[48px] h-[48px] rounded-full flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      aria-label={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? <VolumeX size={18} color="white" /> : <Volume2 size={18} color="white" />}
    </button>
  );
}
