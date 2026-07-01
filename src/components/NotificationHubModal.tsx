"use client";

import React from 'react';
import { X, Bell, Radio, CheckCircle2, ShieldAlert, Cpu, Globe, RefreshCw, Terminal, Sparkles, Send } from 'lucide-react';

interface NotificationHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  liveAlerts: boolean;
  onToggleAlerts: () => void;
  recentNotificationLog: { id: string; title: string; section: string; time: string }[];
}

export const NotificationHubModal: React.FC<NotificationHubModalProps> = ({
  isOpen,
  onClose,
  liveAlerts,
  onToggleAlerts,
  recentNotificationLog,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-slate-900 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Radio className="w-5 h-5 animate-pulse text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
                LexGST Scrapling & Notification Hub
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  WebSocket SSE Active
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Live Portal Monitoring & Web Push Notification Architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto font-sans">
          
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
            <h3 className="text-xs font-extrabold font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              1. Automated Change Detection Architecture
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Our backend workers run asynchronous <strong>Scrapling & Playwright spiders</strong> every 15 seconds targeting official tax repositories. Each scraped document is checked against SHA-256 PDF content hashes in our PostgreSQL/Elasticsearch cluster to prevent duplicates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-[11px]">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 font-bold">Supreme Court Portal</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Sync (15s)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 font-bold">CBIC Circulars Hub</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Sync (30s)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-1 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 font-bold">State High Courts Nodes</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Sync (45s)
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4" />
                2. Real-Time Push Notifications & Delivery Channels
              </h3>
              <button
                onClick={onToggleAlerts}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  liveAlerts
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {liveAlerts ? '🔔 Browser Push: ON' : '🔕 Browser Push: OFF'}
              </button>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              When a new ruling arrives, the backend pushes a broadcast event via <strong>Server-Sent Events (SSE) / WebSockets</strong> directly to this dashboard. Simultaneously, if Browser Push is enabled, our Service Worker uses <strong>Web Push VAPID protocols</strong> to trigger desktop OS banners and Telegram/Slack alert digests.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2 font-mono">
                <Send className="w-3.5 h-3.5 text-amber-500" />
                Recent Live Notification Delivery Log
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-mono font-bold">Status: All Dispatched</span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {recentNotificationLog.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                  No live additions dispatched in this session yet. Click &apos;Simulate Live Portal Scrape&apos; to test!
                </div>
              ) : (
                recentNotificationLog.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{log.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Tagged: {log.section}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">{log.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
          <span>VAPID Protocol v4.2 • Scrapling Spider Engine</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-900 dark:text-slate-100 transition-colors font-sans"
          >
            Close Tracking Hub
          </button>
        </div>

      </div>
    </div>
  );
};
