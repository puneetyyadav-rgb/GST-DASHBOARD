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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-2xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900/80 to-blue-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 border border-primary/30 flex items-center justify-center text-primary shadow-glow-blue">
              <Radio className="w-5 h-5 animate-pulse text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                LexGST Scrapling & Notification Hub
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  WebSocket SSE Active
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Live Portal Monitoring & Web Push Notification Architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto font-sans">
          
          {/* Tracking Architecture Overview */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
            <h3 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              1. Automated Change Detection Architecture
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our backend workers run asynchronous <strong>Scrapling & Playwright spiders</strong> every 15 seconds targeting official tax repositories. Each scraped document is checked against SHA-256 PDF content hashes in our PostgreSQL/Elasticsearch cluster to prevent duplicates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-1">
                <span className="text-slate-500">Supreme Court Portal</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync (Interval: 15s)
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-1">
                <span className="text-slate-500">CBIC Circulars Hub</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync (Interval: 30s)
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-1">
                <span className="text-slate-500">State High Courts Nodes</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync (Interval: 45s)
                </span>
              </div>
            </div>
          </div>

          {/* Push Notification Mechanism */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-mono text-primary uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4" />
                2. Real-Time Push Notifications & Delivery Channels
              </h3>
              <button
                onClick={onToggleAlerts}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  liveAlerts
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {liveAlerts ? '🔔 Browser Push: ON' : '🔕 Browser Push: OFF'}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              When a new ruling arrives, the backend pushes a broadcast event via <strong>Server-Sent Events (SSE) / WebSockets</strong> directly to this dashboard. Simultaneously, if Browser Push is enabled, our Service Worker uses <strong>Web Push VAPID protocols</strong> to trigger desktop OS banners and Slack/Webhook alert digests.
            </p>
          </div>

          {/* Live Notification Delivery Log */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-2 font-mono">
                <Send className="w-3.5 h-3.5 text-amber-400" />
                Recent Live Notification Delivery Log
              </span>
              <span className="text-slate-500 font-mono">Status: All Dispatched</span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {recentNotificationLog.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/60 text-center text-xs text-slate-500">
                  No live additions dispatched in this session yet. Click 'Simulate Live Portal Scrape' to test!
                </div>
              ) : (
                recentNotificationLog.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <div>
                        <p className="font-bold text-slate-200 line-clamp-1">{log.title}</p>
                        <p className="text-[11px] text-slate-400 font-mono">Tagged: {log.section}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{log.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-mono">VAPID Protocol v4.2 • Scrapling Spider Engine</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 transition-colors"
          >
            Close Tracking Hub
          </button>
        </div>

      </div>
    </div>
  );
};
