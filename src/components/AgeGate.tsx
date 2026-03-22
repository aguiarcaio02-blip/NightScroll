'use client';

import { useState, useRef } from 'react';
import { Shield } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

export default function AgeGate() {
  const { setAgeVerified } = useApp();
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [fading, setFading] = useState(false);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleVerify = () => {
    setError('');
    const m = parseInt(month);
    const d = parseInt(day);
    const y = parseInt(year);

    if (!m || !d || !y || m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > 2100) {
      setError('Please enter a valid date of birth');
      return;
    }

    const dob = new Date(y, m - 1, d);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 18) {
      setError('You must be 18 or older to enter this site');
      return;
    }

    setFading(true);
    setTimeout(() => setAgeVerified(true), 300);
  };

  const inputClass = "bg-[#1A1A1A] border border-[#333333] rounded-[8px] text-center text-white text-[16px] h-[48px] outline-none focus:border-[#D946EF] transition-colors placeholder:text-[#555555]";

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0A0A0A] overflow-y-auto transition-opacity duration-300"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="w-full max-w-[420px] mx-auto px-xl text-center min-h-full flex flex-col justify-center py-[40px]">
        {/* 18+ Shield */}
        <div className="mb-xl flex justify-center">
          <div className="relative w-[72px] h-[72px] flex items-center justify-center">
            <Shield size={72} color="#D946EF" strokeWidth={1.5} />
            <span className="absolute text-white font-bold text-[18px]">18+</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-[26px] font-bold text-white mb-sm">
          You must be 18+ to enter
        </h1>
        <p className="text-[14px] text-[#888888] mb-xl">
          This website contains age-restricted content. By entering, you confirm you are at least 18 years old.
        </p>

        {/* DOB Inputs */}
        <div className="flex gap-md mb-lg">
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            placeholder="MM"
            value={month}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setMonth(val);
              if (val.length === 2) dayRef.current?.focus();
            }}
            className={`${inputClass} flex-1`}
            aria-label="Month"
          />
          <input
            ref={dayRef}
            type="text"
            inputMode="numeric"
            maxLength={2}
            placeholder="DD"
            value={day}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setDay(val);
              if (val.length === 2) yearRef.current?.focus();
            }}
            className={`${inputClass} flex-1`}
            aria-label="Day"
          />
          <input
            ref={yearRef}
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
            className={`${inputClass} flex-[1.5]`}
            aria-label="Year"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-[#EF4444] text-[13px] mb-md">{error}</p>
        )}

        {/* CTA Button */}
        <button
          onClick={handleVerify}
          className="w-full h-[48px] rounded-[8px] text-white font-bold text-[16px] transition-opacity hover:opacity-90 active:opacity-80"
          style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}
        >
          Enter NightScroll
        </button>

        {/* Fine print */}
        <p className="text-[11px] text-[#555555] mt-lg leading-relaxed">
          By entering, you agree to our{' '}
          <span className="text-[#D946EF] underline">Terms of Service</span> and{' '}
          <span className="text-[#D946EF] underline">Privacy Policy</span>.
          This site uses cookies to verify your age.
        </p>
      </div>
    </div>
  );
}
