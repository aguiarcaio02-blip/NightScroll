'use client';

import { X, Check } from 'lucide-react';
import { useState } from 'react';
import { getCreator } from '@/lib/mock-data';
import { useApp } from '@/lib/AppContext';

const quickAmounts = [1, 5, 10, 25];

export default function TipOverlay() {
  const { tipOpen, setTipOpen, tipCreatorId } = useApp();
  const [selected, setSelected] = useState<number | null>(5);
  const [custom, setCustom] = useState('');
  const [sent, setSent] = useState(false);

  if (!tipOpen || !tipCreatorId) return null;

  const creator = getCreator(tipCreatorId);
  if (!creator) return null;

  const amount = custom ? parseFloat(custom) : selected;

  const handleSend = () => {
    if (!amount || amount <= 0) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setTipOpen(false);
      setSelected(5);
      setCustom('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={() => setTipOpen(false)}>
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="relative bg-bg-tertiary rounded-[16px] w-[90%] max-w-[360px] p-xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="flex flex-col items-center py-3xl">
            <div className="w-[64px] h-[64px] rounded-full bg-success flex items-center justify-center mb-lg">
              <Check size={32} color="white" strokeWidth={3} />
            </div>
            <p className="text-white text-[18px] font-bold">Tip Sent!</p>
            <p className="text-text-muted text-[14px] mt-sm">${amount} sent to {creator.displayName}</p>
          </div>
        ) : (
          <>
            <button
              onClick={() => setTipOpen(false)}
              className="absolute top-md right-md w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-bg-hover"
              aria-label="Close tip overlay"
            >
              <X size={18} color="#888" />
            </button>

            {/* Creator info */}
            <div className="flex flex-col items-center mb-xl">
              <div className="w-[48px] h-[48px] rounded-full bg-bg-hover flex items-center justify-center text-[22px] mb-sm">
                {creator.avatar}
              </div>
              <p className="text-white text-[15px] font-bold">{creator.displayName}</p>
            </div>

            {/* Quick amounts */}
            <div className="flex gap-sm mb-lg">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setSelected(amt); setCustom(''); }}
                  className="flex-1 py-md rounded-[8px] text-[14px] font-semibold transition-all min-h-[44px]"
                  style={{
                    background: selected === amt && !custom
                      ? 'linear-gradient(135deg, #D946EF, #A855F7)'
                      : '#2A2A2A',
                    color: 'white',
                    border: selected === amt && !custom ? 'none' : '1px solid #333',
                  }}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="relative mb-xl">
              <span className="absolute left-md top-1/2 -translate-y-1/2 text-text-muted text-[16px]">$</span>
              <input
                type="number"
                placeholder="Custom amount"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                className="w-full bg-bg-hover rounded-[8px] px-xl pl-[28px] py-md text-white text-[14px] outline-none focus:ring-1 focus:ring-accent-primary placeholder:text-text-faint h-[44px]"
              />
            </div>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!amount || amount <= 0}
              className="w-full h-[48px] rounded-[8px] text-white font-bold text-[15px] transition-opacity disabled:opacity-50"
              style={{ background: '#22C55E' }}
            >
              Send ${amount || 0} Tip
            </button>
          </>
        )}
      </div>
    </div>
  );
}
