'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';

const MOCK_ADS = [
  {
    id: 'ad-1',
    brand: 'Glow Skin',
    tagline: 'Your skin deserves the best.',
    cta: 'Shop Now',
    ctaUrl: '#',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #D946EF 50%, #8B5CF6 100%)',
    logo: '✨',
  },
  {
    id: 'ad-2',
    brand: 'FitFuel',
    tagline: 'Premium supplements for real results.',
    cta: 'Get 20% Off',
    ctaUrl: '#',
    gradient: 'linear-gradient(135deg, #22C55E 0%, #0EA5E9 50%, #6366F1 100%)',
    logo: '💪',
  },
  {
    id: 'ad-3',
    brand: 'NightWear',
    tagline: 'Confidence looks good on you.',
    cta: 'Browse Collection',
    ctaUrl: '#',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 50%, #8B5CF6 100%)',
    logo: '🌙',
  },
  {
    id: 'ad-4',
    brand: 'VibeCheck',
    tagline: 'The dating app that gets you.',
    cta: 'Download Free',
    ctaUrl: '#',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #F97316 50%, #FBBF24 100%)',
    logo: '🔥',
  },
];

export default function AdCard() {
  const [ad, setAd] = useState(MOCK_ADS[0]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const randomAd = MOCK_ADS[Math.floor(Math.random() * MOCK_ADS.length)];
    setAd(randomAd);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className="video-card relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: ad.gradient }}
    >
      {/* Sponsored label */}
      <div className="absolute top-[60px] left-md z-10 flex items-center gap-[6px]">
        <span className="px-[8px] py-[3px] rounded-full text-[11px] font-semibold bg-black/40 text-white/80 backdrop-blur-sm">
          Sponsored
        </span>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-[60px] right-md z-10 w-[32px] h-[32px] rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
      >
        <X size={16} className="text-white/80" />
      </button>

      {/* Ad content */}
      <div className="flex flex-col items-center justify-center px-xl text-center z-[5]">
        {/* Brand logo */}
        <div className="w-[80px] h-[80px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-xl">
          <span className="text-[36px]">{ad.logo}</span>
        </div>

        {/* Brand name */}
        <h2 className="text-[28px] font-bold text-white mb-sm tracking-tight">
          {ad.brand}
        </h2>

        {/* Tagline */}
        <p className="text-[16px] text-white/80 mb-xl max-w-[260px] leading-[1.4]">
          {ad.tagline}
        </p>

        {/* CTA button */}
        <a
          href={ad.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-sm px-xl py-md rounded-full text-[15px] font-bold text-black bg-white hover:bg-white/90 transition-colors min-h-[48px]"
          onClick={(e) => e.stopPropagation()}
        >
          {ad.cta}
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-[15%] left-[10%] w-[120px] h-[120px] rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-[20%] right-[5%] w-[180px] h-[180px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-[50%] left-[60%] w-[100px] h-[100px] rounded-full bg-white/10 blur-xl" />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-[80px] left-0 right-0 px-lg z-[5]">
        <p className="text-[12px] text-white/50 text-center">
          Ad · Learn more about advertising on NightScroll
        </p>
      </div>
    </div>
  );
}
