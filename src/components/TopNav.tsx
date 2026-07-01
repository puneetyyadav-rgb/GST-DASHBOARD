"use client";

import React from 'react';
import { Search, Bell, Sparkles, ShieldCheck, Cpu, Terminal, Radio } from 'lucide-react';

interface TopNavProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  liveAlerts: boolean;
  onToggleAlerts: () => void;
  onOpenBackendModal: () => void;
  onOpenNotificationHub: () => void;
  totalResults: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  searchQuery,
  onSearchChange,
  liveAlerts,
  onToggleAlerts,
  onOpenBackendModal,
  onOpenNotificationHub,
  totalResults,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white shadow-glow-blue">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
              LexGST<span className="text-primary font-mono text-xs px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">AI</span>
            </span>
            <span className="hidden sm:block text-[10px] text-slate-400 font-mono tracking-wider uppercase">
              Section-Wise GST Intelligence Engine
            </span>
          </div>
        </div>

        {/* Highly Prominent Center Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search sections, e.g., GSTR-2B, Sec 16, ITC, Rule 28, detention..."
              className="w-full pl-10 pr-24 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner font-sans"
            />
            {totalResults >= 0 && (
              <div className="absolute right-3 font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 pointer-events-none">
                {totalResults} {totalResults === 1 ? 'Ruling' : 'Rulings'}
              </div>
            )}
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Tracking Hub & Notification Logs Button */}
          <button
            onClick={onOpenNotificationHub}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-all shadow-sm"
            title="Inspect Tracking Architecture & Push Log"
          >
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
            <span className="hidden md:inline font-mono">Tracking Hub</span>
          </button>

          {/* Python FastAPI Backend Inspection Button */}
          <button
            onClick={onOpenBackendModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-400 transition-all shadow-sm"
            title="Inspect Python FastAPI Backend & JSON Schema"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>FastAPI Backend Preview</span>
          </button>

          {/* Live Alerts / Push Notifications Toggle */}
          <button
            onClick={onToggleAlerts}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-300 shadow-sm cursor-pointer ${
              liveAlerts
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Live Web Push Alerts"
          >
            <Bell className={`w-3.5 h-3.5 ${liveAlerts ? 'text-emerald-400 animate-bounce' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Push Alerts:</span>
            <span className={`font-mono font-bold ${liveAlerts ? 'text-emerald-400' : 'text-slate-500'}`}>
              {liveAlerts ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Status Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Sourced</span>
          </div>

        </div>

      </div>
    </header>
  );
};
