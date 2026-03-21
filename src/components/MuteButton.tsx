'use client';

import { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  muted: boolean;
  onToggle: () => void;
}

// Standalone mute button that handles its own touch events
// via native DOM listeners to bypass React's event system
// and scroll-snap touch interception
export default function MuteButton({ muted, onToggle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const touchedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchedRef.current = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      // Stop the scroll container from seeing this touch
      e.stopPropagation();
    };

    const onTouchMove = (e: TouchEvent) => {
      // If finger moved more than 10px, it's a scroll not a tap
      const dx = Math.abs(e.touches[0].clientX - startX);
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dx > 10 || dy > 10) {
        touchedRef.current = false;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchedRef.current) {
        e.preventDefault(); // Prevent click from also firing
        e.stopPropagation();
        onToggle();
      }
      touchedRef.current = false;
    };

    // Use native listeners with capture phase and non-passive
    el.addEventListener('touchstart', onTouchStart, { passive: false, capture: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: false, capture: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart, { capture: true } as EventListenerOptions);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd, { capture: true } as EventListenerOptions);
    };
  }, [onToggle]);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        // Desktop only — on mobile, touch handlers fire instead
        e.stopPropagation();
        onToggle();
      }}
      className="absolute top-[60px] right-[16px] z-[50] w-[48px] h-[48px] rounded-full flex items-center justify-center cursor-pointer select-none"
      style={{
        background: 'rgba(0,0,0,0.6)',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'none',
      }}
      aria-label={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? <VolumeX size={18} color="white" /> : <Volume2 size={18} color="white" />}
    </div>
  );
}
