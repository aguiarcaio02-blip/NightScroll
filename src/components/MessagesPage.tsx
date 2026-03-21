'use client';

import { useState } from 'react';
import { ChevronLeft, Send, DollarSign, BadgeCheck, MessageCircle } from 'lucide-react';
import { conversations, chatMessages, creators } from '@/lib/mock-data';
import { useApp } from '@/lib/AppContext';

interface Props {
  onProfileClick: (creatorId: string) => void;
}

export default function MessagesPage({ onProfileClick }: Props) {
  const { setActiveTab, openTip } = useApp();
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const conv = activeConv ? conversations.find(c => c.id === activeConv) : null;

  if (conv) {
    return (
      <div className="h-full flex flex-col bg-bg-primary">
        {/* Chat header */}
        <div className="flex items-center gap-md px-lg h-[56px] border-b border-border-subtle shrink-0">
          <button
            onClick={() => setActiveConv(null)}
            className="w-[44px] h-[44px] flex items-center justify-center"
            aria-label="Back to messages"
          >
            <ChevronLeft size={24} color="white" />
          </button>
          <button
            onClick={() => onProfileClick(conv.user.id)}
            className="flex items-center gap-sm flex-1 min-w-0"
          >
            <div className="w-[32px] h-[32px] rounded-full bg-bg-tertiary flex items-center justify-center text-[14px] shrink-0">
              {conv.user.avatar}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-bold text-white truncate">{conv.user.displayName}</span>
                {conv.user.verified && <BadgeCheck size={12} fill="#D946EF" color="#0A0A0A" />}
              </div>
              {conv.user.online && (
                <span className="text-[11px] text-success">Online</span>
              )}
            </div>
          </button>
          <button
            onClick={() => openTip(conv.user.id)}
            className="w-[44px] h-[44px] flex items-center justify-center"
            aria-label="Send tip"
          >
            <DollarSign size={20} color="#22C55E" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-lg py-md space-y-sm">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[75%]">
                <div
                  className="px-lg py-sm text-[13px] text-white"
                  style={{
                    background: msg.isMine
                      ? 'linear-gradient(135deg, #D946EF, #A855F7)'
                      : '#1A1A1A',
                    borderRadius: msg.isMine
                      ? '16px 16px 4px 16px'
                      : '16px 16px 16px 4px',
                  }}
                >
                  {msg.text}
                </div>
                <p
                  className="text-[10px] text-text-faint mt-[2px]"
                  style={{ textAlign: msg.isMine ? 'right' : 'left' }}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-sm px-lg py-md border-t border-border-subtle shrink-0">
          <button
            onClick={() => openTip(conv.user.id)}
            className="w-[36px] h-[36px] flex items-center justify-center shrink-0"
            aria-label="Send tip"
          >
            <DollarSign size={18} color="#22C55E" />
          </button>
          <input
            type="text"
            placeholder="Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-bg-tertiary rounded-full px-lg py-sm text-[13px] text-white placeholder:text-text-faint outline-none focus:ring-1 focus:ring-accent-primary h-[40px]"
          />
          <button
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors"
            style={{ background: newMessage ? '#D946EF' : '#333' }}
            aria-label="Send message"
          >
            <Send size={16} color="white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-bg-primary">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-bg-primary flex items-center justify-between px-lg h-[56px] border-b border-border-subtle">
        <button
          onClick={() => setActiveTab('inbox')}
          className="w-[44px] h-[44px] flex items-center justify-center"
          aria-label="Back to inbox"
        >
          <ChevronLeft size={24} color="white" />
        </button>
        <h1 className="text-[20px] font-bold text-white">Messages</h1>
        <button className="w-[44px] h-[44px] flex items-center justify-center" aria-label="New message">
          <Send size={20} color="white" />
        </button>
      </div>

      {/* Conversation list */}
      <div className="pb-[80px]">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-[120px]">
            <MessageCircle size={48} className="text-text-faint mb-lg" />
            <p className="text-[16px] font-bold text-white mb-sm">No messages yet</p>
            <p className="text-[13px] text-text-muted">Start a conversation with a creator</p>
          </div>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConv(conv.id)}
              className="flex items-center gap-md px-lg py-md w-full hover:bg-bg-hover transition-colors text-left"
            >
              <div className="relative shrink-0">
                <div className="w-[48px] h-[48px] rounded-full bg-bg-tertiary flex items-center justify-center text-[22px]">
                  {conv.user.avatar}
                </div>
                {conv.user.online && (
                  <div className="absolute bottom-0 right-0 w-[12px] h-[12px] rounded-full bg-success" style={{ border: '2px solid #0A0A0A' }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-[4px]">
                  <span className="text-[14px] font-bold text-white truncate">{conv.user.displayName}</span>
                  {conv.user.verified && <BadgeCheck size={12} fill="#D946EF" color="#0A0A0A" />}
                </div>
                <p className="text-[13px] text-text-muted truncate">{conv.lastMessage}</p>
              </div>
              <div className="flex flex-col items-end gap-[4px] shrink-0">
                <span className="text-[11px] text-text-faint">{conv.timestamp}</span>
                {conv.unread > 0 && (
                  <div className="w-[20px] h-[20px] rounded-full bg-accent-primary flex items-center justify-center">
                    <span className="text-[11px] text-white font-bold">{conv.unread}</span>
                  </div>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
