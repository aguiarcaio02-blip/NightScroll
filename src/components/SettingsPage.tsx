'use client';

import { useState } from 'react';
import { ArrowLeft, FileText, Shield, Scale, Cookie, AlertTriangle, LogOut, Trash2, ChevronRight } from 'lucide-react';
import { useApp } from '@/lib/AppContext';
import TermsPage from './legal/TermsPage';
import PrivacyPage from './legal/PrivacyPage';
import DMCAPage from './legal/DMCAPage';
import CompliancePage from './legal/CompliancePage';
import CookiePage from './legal/CookiePage';

type LegalPage = 'terms' | 'privacy' | 'dmca' | 'compliance' | 'cookies' | null;

export default function SettingsPage() {
  const { setActiveTab, signOut } = useApp();
  const [activeLegalPage, setActiveLegalPage] = useState<LegalPage>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Render legal sub-page if one is active
  if (activeLegalPage === 'terms') return <TermsPage onBack={() => setActiveLegalPage(null)} />;
  if (activeLegalPage === 'privacy') return <PrivacyPage onBack={() => setActiveLegalPage(null)} />;
  if (activeLegalPage === 'dmca') return <DMCAPage onBack={() => setActiveLegalPage(null)} />;
  if (activeLegalPage === 'compliance') return <CompliancePage onBack={() => setActiveLegalPage(null)} />;
  if (activeLegalPage === 'cookies') return <CookiePage onBack={() => setActiveLegalPage(null)} />;

  const legalLinks = [
    { id: 'terms' as LegalPage, label: 'Terms of Service', icon: FileText },
    { id: 'privacy' as LegalPage, label: 'Privacy Policy', icon: Shield },
    { id: 'dmca' as LegalPage, label: 'DMCA Policy', icon: Scale },
    { id: 'compliance' as LegalPage, label: '2257 Compliance', icon: AlertTriangle },
    { id: 'cookies' as LegalPage, label: 'Cookie Policy', icon: Cookie },
  ];

  return (
    <div className="h-full bg-bg-primary overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-border-default">
        <div className="flex items-center gap-md px-lg py-md">
          <button onClick={() => setActiveTab('profile')} className="w-[36px] h-[36px] rounded-full bg-bg-hover flex items-center justify-center">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[18px] font-bold text-white">Settings</h1>
        </div>
      </div>

      <div className="px-lg py-lg">
        {/* Legal & Compliance Section */}
        <div className="mb-xl">
          <h2 className="text-[13px] font-semibold text-text-muted uppercase tracking-wider mb-md">Legal & Compliance</h2>
          <div className="bg-bg-secondary rounded-[12px] overflow-hidden divide-y divide-border-default">
            {legalLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveLegalPage(link.id)}
                className="w-full flex items-center justify-between px-lg py-md hover:bg-bg-hover transition-colors"
              >
                <div className="flex items-center gap-md">
                  <link.icon size={18} className="text-text-secondary" />
                  <span className="text-[14px] text-white">{link.label}</span>
                </div>
                <ChevronRight size={16} className="text-text-faint" />
              </button>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-xl">
          <h2 className="text-[13px] font-semibold text-text-muted uppercase tracking-wider mb-md">Account</h2>
          <div className="bg-bg-secondary rounded-[12px] overflow-hidden divide-y divide-border-default">
            <button
              onClick={() => {
                signOut();
                setActiveTab('home');
              }}
              className="w-full flex items-center gap-md px-lg py-md hover:bg-bg-hover transition-colors"
            >
              <LogOut size={18} className="text-text-secondary" />
              <span className="text-[14px] text-white">Log Out</span>
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center gap-md px-lg py-md hover:bg-bg-hover transition-colors"
            >
              <Trash2 size={18} className="text-[#EF4444]" />
              <span className="text-[14px] text-[#EF4444]">Delete Account</span>
            </button>
          </div>
        </div>

        {/* App info */}
        <div className="text-center mb-xl">
          <p className="text-[12px] text-text-faint">NightScroll v1.0.0</p>
          <p className="text-[11px] text-text-faint mt-[4px]">This platform is for adults 18+ only</p>
        </div>
      </div>

      {/* Delete account confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-bg-secondary rounded-[16px] p-xl max-w-[340px] w-full mx-md">
            <h3 className="text-[18px] font-bold text-white mb-sm">Delete Account?</h3>
            <p className="text-[14px] text-text-secondary mb-xl leading-[1.5]">
              This will permanently delete your account, all your videos, and all your data. This action cannot be undone.
            </p>
            <div className="flex gap-md">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-md rounded-[8px] text-[14px] font-semibold text-white border border-border-default hover:bg-bg-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  signOut();
                  setActiveTab('home');
                }}
                className="flex-1 py-md rounded-[8px] text-[14px] font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
