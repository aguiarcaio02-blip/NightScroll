'use client';

import { X, Link2, MessageCircle, Send } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

const shareOptions = [
  { icon: <Link2 size={20} color="white" />, label: 'Copy Link', bg: '#333333' },
  { icon: <Send size={20} color="white" />, label: 'Messages', bg: '#D946EF' },
  { icon: <span className="text-[18px] font-bold">𝕏</span>, label: 'Twitter/X', bg: '#1DA1F2' },
  { icon: <span className="text-[16px]">📸</span>, label: 'Instagram', bg: '#E4405F' },
  { icon: <span className="text-[16px]">👻</span>, label: 'Snapchat', bg: '#FFFC00' },
  { icon: <MessageCircle size={20} color="white" />, label: 'WhatsApp', bg: '#25D366' },
  { icon: <Send size={20} color="white" />, label: 'Telegram', bg: '#0088CC' },
];

export default function ShareSheet() {
  const { shareOpen, setShareOpen } = useApp();

  if (!shareOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" onClick={() => setShareOpen(false)}>
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="absolute bottom-0 left-0 right-0 bg-bg-tertiary rounded-t-[16px] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-lg py-md border-b border-border-subtle">
          <h3 className="text-[15px] font-bold text-white">Share to</h3>
          <button
            onClick={() => setShareOpen(false)}
            className="w-[36px] h-[36px] flex items-center justify-center rounded-full hover:bg-bg-hover"
            aria-label="Close share sheet"
          >
            <X size={20} color="white" />
          </button>
        </div>

        {/* Share options */}
        <div className="flex gap-xl px-lg py-xl overflow-x-auto">
          {shareOptions.map((opt, i) => (
            <button key={i} className="flex flex-col items-center gap-sm min-w-[56px]" aria-label={`Share to ${opt.label}`}>
              <div
                className="w-[48px] h-[48px] rounded-full flex items-center justify-center"
                style={{ background: opt.bg }}
              >
                {opt.icon}
              </div>
              <span className="text-[10px] text-text-muted whitespace-nowrap">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Additional actions */}
        <div className="border-t border-border-subtle px-lg py-md pb-[calc(env(safe-area-inset-bottom,0px)+16px)]">
          {['Report', 'Not Interested', 'Add to Playlist'].map((action) => (
            <button
              key={action}
              className="w-full text-left py-md px-sm text-[14px] text-text-secondary hover:text-white hover:bg-bg-hover rounded-[8px] transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
