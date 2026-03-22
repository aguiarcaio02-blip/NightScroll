'use client';

import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('nightscroll_cookie_consent');
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nightscroll_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('nightscroll_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-[70px] left-0 right-0 z-[90] px-md pb-md animate-in slide-in-from-bottom duration-300">
      <div className="max-w-[480px] mx-auto bg-bg-secondary border border-border-default rounded-[12px] p-md shadow-2xl">
        <div className="flex items-start gap-sm mb-sm">
          <Cookie size={18} className="text-accent-primary shrink-0 mt-[2px]" />
          <div>
            <p className="text-[13px] text-white font-semibold mb-[4px]">We use cookies</p>
            <p className="text-[12px] text-text-muted leading-[1.4]">
              We use essential cookies for site functionality and optional cookies to improve your experience.
              See our <button onClick={() => {}} className="text-accent-primary underline">Cookie Policy</button> for details.
            </p>
          </div>
        </div>
        <div className="flex gap-sm justify-end">
          <button
            onClick={handleDecline}
            className="px-md py-[6px] rounded-[6px] text-[12px] font-semibold text-text-secondary border border-border-default hover:bg-bg-hover transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="px-md py-[6px] rounded-[6px] text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
