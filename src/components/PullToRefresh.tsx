'use client';

import { useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

const THRESHOLD = 100; // px to pull before triggering refresh

export default function PullToRefresh({ children }: Props) {
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAtTop = useCallback(() => {
    // Check if the page is scrolled to the top
    const scrollable = containerRef.current;
    if (!scrollable) return window.scrollY <= 0;

    // Walk up to find any scrolled container
    let el: HTMLElement | null = scrollable;
    while (el) {
      if (el.scrollTop > 0) return false;
      el = el.parentElement;
    }
    return window.scrollY <= 0;
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (isAtTop() && !refreshing) {
        startY.current = e.touches[0].clientY;
        setPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!pulling || refreshing) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY.current;
      if (diff > 0) {
        // Apply resistance — pull feels heavier the further you go
        const distance = Math.min(diff * 0.4, 150);
        setPullDistance(distance);
      } else {
        setPullDistance(0);
      }
    };

    const handleTouchEnd = () => {
      if (!pulling || refreshing) return;
      if (pullDistance >= THRESHOLD * 0.4) {
        // Trigger refresh
        setRefreshing(true);
        setPullDistance(50);
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else {
        setPullDistance(0);
        setPulling(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pulling, pullDistance, refreshing, isAtTop]);

  const progress = Math.min(pullDistance / (THRESHOLD * 0.4), 1);

  return (
    <div ref={containerRef} className="relative h-full">
      {/* Pull indicator */}
      {(pullDistance > 0 || refreshing) && (
        <div
          className="absolute left-0 right-0 z-[100] flex items-center justify-center pointer-events-none transition-transform duration-200"
          style={{ top: 0, height: `${pullDistance}px` }}
        >
          <div
            className="w-[36px] h-[36px] rounded-full bg-bg-tertiary border border-border-default flex items-center justify-center shadow-lg"
            style={{ opacity: progress }}
          >
            <RefreshCw
              size={18}
              color="white"
              className={refreshing ? 'animate-spin' : ''}
              style={{
                transform: refreshing ? undefined : `rotate(${progress * 360}deg)`,
                transition: 'transform 0.1s',
              }}
            />
          </div>
        </div>
      )}

      {/* Page content */}
      <div
        style={{
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : undefined,
          transition: pulling && pullDistance > 0 ? 'none' : 'transform 0.3s ease',
        }}
        className="h-full"
      >
        {children}
      </div>
    </div>
  );
}
