'use client';

import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

export default function SignUpScreen() {
  const { signUp } = useApp();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fading, setFading] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Enter a valid email address';
    }

    if (!username.trim()) {
      errs.username = 'Username is required';
    } else if (username.length < 3) {
      errs.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errs.username = 'Only letters, numbers, and underscores';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setFading(true);
    setTimeout(() => {
      signUp({ email: email.trim(), username: username.trim().toLowerCase() });
    }, 300);
  };

  const inputWrap = "relative";
  const inputClass = "w-full bg-[#1A1A1A] border rounded-[8px] text-white text-[14px] h-[48px] pl-[44px] pr-lg outline-none transition-colors placeholder:text-[#555555]";
  const iconClass = "absolute left-md top-1/2 -translate-y-1/2 text-text-muted";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A] transition-opacity duration-300"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="w-full max-w-[420px] mx-auto px-xl">
        {/* Header */}
        <div className="text-center mb-3xl">
          <h1 className="text-[28px] font-bold gradient-text mb-sm">NightScroll</h1>
          <p className="text-[14px] text-[#888888]">Create your account to get started</p>
        </div>

        {/* Email */}
        <div className="mb-lg">
          <div className={inputWrap}>
            <Mail size={18} className={iconClass} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
              className={`${inputClass} ${errors.email ? 'border-[#EF4444]' : 'border-[#333333] focus:border-[#D946EF]'}`}
              aria-label="Email address"
            />
          </div>
          {errors.email && <p className="text-[#EF4444] text-[12px] mt-[4px] ml-[4px]">{errors.email}</p>}
        </div>

        {/* Username */}
        <div className="mb-lg">
          <div className={inputWrap}>
            <User size={18} className={iconClass} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => { setUsername(e.target.value.replace(/\s/g, '')); setErrors(prev => ({ ...prev, username: '' })); }}
              maxLength={20}
              className={`${inputClass} ${errors.username ? 'border-[#EF4444]' : 'border-[#333333] focus:border-[#D946EF]'}`}
              aria-label="Username"
            />
          </div>
          {errors.username && <p className="text-[#EF4444] text-[12px] mt-[4px] ml-[4px]">{errors.username}</p>}
          {username && !errors.username && (
            <p className="text-text-muted text-[12px] mt-[4px] ml-[4px]">@{username.toLowerCase()}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-lg">
          <div className={inputWrap}>
            <Lock size={18} className={iconClass} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (min 8 characters)"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); }}
              className={`${inputClass} pr-[44px] ${errors.password ? 'border-[#EF4444]' : 'border-[#333333] focus:border-[#D946EF]'}`}
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-md top-1/2 -translate-y-1/2 text-text-muted"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-[#EF4444] text-[12px] mt-[4px] ml-[4px]">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-2xl">
          <div className={inputWrap}>
            <Lock size={18} className={iconClass} />
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: '' })); }}
              className={`${inputClass} pr-[44px] ${errors.confirmPassword ? 'border-[#EF4444]' : 'border-[#333333] focus:border-[#D946EF]'}`}
              aria-label="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-md top-1/2 -translate-y-1/2 text-text-muted"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-[#EF4444] text-[12px] mt-[4px] ml-[4px]">{errors.confirmPassword}</p>}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full h-[48px] rounded-[8px] text-white font-bold text-[16px] flex items-center justify-center gap-sm transition-opacity hover:opacity-90 active:opacity-80"
          style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}
        >
          Create Account
          <ArrowRight size={18} />
        </button>

        {/* Fine print */}
        <p className="text-[11px] text-[#555555] mt-lg text-center leading-relaxed">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
