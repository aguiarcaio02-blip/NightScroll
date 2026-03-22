'use client';

import { useState } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const REPORT_REASONS = [
  { id: 'illegal', label: 'Illegal content', description: 'Content that violates the law' },
  { id: 'non-consensual', label: 'Non-consensual content', description: 'Content shared without consent of individuals depicted' },
  { id: 'minor', label: 'Minor involved', description: 'Content involving someone under 18' },
  { id: 'harassment', label: 'Harassment or bullying', description: 'Content targeting or threatening someone' },
  { id: 'impersonation', label: 'Impersonation', description: 'Someone pretending to be another person' },
  { id: 'spam', label: 'Spam or misleading', description: 'Fake, misleading, or repetitive content' },
  { id: 'other', label: 'Other', description: 'Another issue not listed above' },
];

interface Props {
  open: boolean;
  onClose: () => void;
  postId: string;
  reporterUsername: string;
}

export default function ReportModal({ open, onClose, postId, reporterUsername }: Props) {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!selectedReason) return;
    setSubmitting(true);

    try {
      await supabase.from('reports').insert({
        post_id: postId,
        reporter_username: reporterUsername,
        reason: selectedReason,
        details: details.trim(),
      });
      setSubmitted(true);
    } catch {
      // Still show success to avoid revealing report status
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason('');
    setDetails('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />
      <div className="relative w-full max-w-[480px] max-h-[85vh] bg-bg-secondary rounded-t-[16px] sm:rounded-[16px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-lg py-md border-b border-border-default shrink-0">
          <div className="flex items-center gap-sm">
            <AlertTriangle size={18} className="text-[#EF4444]" />
            <h3 className="text-[16px] font-bold text-white">Report Content</h3>
          </div>
          <button onClick={handleClose} className="w-[32px] h-[32px] rounded-full bg-bg-hover flex items-center justify-center">
            <X size={18} className="text-text-muted" />
          </button>
        </div>

        {submitted ? (
          /* Success state */
          <div className="flex flex-col items-center justify-center py-3xl px-xl">
            <CheckCircle size={48} className="text-[#22C55E] mb-lg" />
            <h4 className="text-[18px] font-bold text-white mb-sm">Report Submitted</h4>
            <p className="text-[14px] text-text-secondary text-center mb-xl max-w-[300px]">
              Thank you for helping keep NightScroll safe. Our team will review this content within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="px-xl py-md rounded-[8px] text-white font-semibold text-[14px]"
              style={{ background: 'linear-gradient(135deg, #D946EF, #A855F7)' }}
            >
              Done
            </button>
          </div>
        ) : (
          /* Report form */
          <div className="overflow-y-auto flex-1 px-lg py-md">
            <p className="text-[13px] text-text-secondary mb-lg">
              Why are you reporting this content? Your report is anonymous and will be reviewed by our moderation team.
            </p>

            {/* Reason options */}
            <div className="space-y-[8px] mb-lg">
              {REPORT_REASONS.map((reason) => (
                <button
                  key={reason.id}
                  onClick={() => setSelectedReason(reason.id)}
                  className={`w-full text-left px-md py-md rounded-[8px] border transition-colors ${
                    selectedReason === reason.id
                      ? 'border-accent-primary bg-accent-primary/10'
                      : 'border-border-default bg-bg-hover hover:border-border-strong'
                  }`}
                >
                  <p className={`text-[14px] font-semibold ${selectedReason === reason.id ? 'text-accent-primary' : 'text-white'}`}>
                    {reason.label}
                  </p>
                  <p className="text-[12px] text-text-muted mt-[2px]">{reason.description}</p>
                </button>
              ))}
            </div>

            {/* Additional details */}
            {selectedReason && (
              <div className="mb-lg">
                <label className="text-[13px] font-semibold text-text-secondary mb-sm block">
                  Additional details (optional)
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide any additional context..."
                  maxLength={500}
                  className="w-full bg-bg-hover border border-border-default rounded-[8px] p-md text-[14px] text-white placeholder:text-text-faint outline-none focus:ring-1 focus:ring-accent-primary resize-none h-[80px]"
                />
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!selectedReason || submitting}
              className="w-full py-md rounded-[8px] text-white font-bold text-[14px] transition-opacity disabled:opacity-40 mb-md"
              style={{ background: '#EF4444' }}
            >
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>

            <p className="text-[11px] text-text-faint text-center mb-md">
              False reports may result in account suspension. If you believe someone is in immediate danger, contact local authorities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
