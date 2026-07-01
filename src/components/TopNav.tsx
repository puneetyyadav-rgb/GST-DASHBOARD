"use client";

import React from 'react';
import { Search, Bell, Sparkles, ShieldCheck, Cpu, Terminal, Radio, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl transition-colors duration-300 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              LexGST<span className="text-blue-600 dark:text-blue-400 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">AI</span>
            </span>
            <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-wider uppercase font-semibold">
              Section-Wise GST Intelligence Engine
            </span>
          </div>
        </div>

        {/* Highly Prominent Center Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search sections, e.g., GSTR-2B, Sec 16, ITC, Rule 28, detention..."
              className="w-full pl-10 pr-24 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all shadow-inner font-sans"
            />
            {totalResults >= 0 && (
              <div className="absolute right-3 font-mono font-bold text-[11px] px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 pointer-events-none hidden sm:block shadow-2xs">
                {totalResults} {totalResults === 1 ? 'Ruling' : 'Rulings'}
              </div>
            )}
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Light / Dark Mode Visual Switcher */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all shadow-2xs cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
                <span className="hidden md:inline font-sans">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-blue-600 animate-pulse" />
                <span className="hidden md:inline font-sans">Dark Mode</span>
              </>
            )}
          </button>

          {/* Tracking Hub Button */}
          <button
            onClick={onOpenNotificationHub}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all shadow-2xs"
            title="Inspect Tracking Architecture & Push Log"
          >
            <Radio className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse shrink-0" />
            <span className="hidden lg:inline font-mono">Tracking Hub</span>
          </button>

          {/* Python FastAPI Preview Button */}
          <button
            onClick={onOpenBackendModal}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 transition-all shadow-2xs"
            title="Inspect Python FastAPI Backend & JSON Schema"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>FastAPI Preview</span>
          </button>

          {/* Live Alerts / Push Notifications Toggle */}
          <button
            onClick={onToggleAlerts}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 shadow-2xs cursor-pointer ${
              liveAlerts
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="Toggle Live Web Push Alerts"
          >
            <Bell className={`w-3.5 h-3.5 ${liveAlerts ? 'text-emerald-600 dark:text-emerald-400 animate-bounce' : 'text-slate-400'}`} />
            <span className="font-mono">
              {liveAlerts ? 'Push: ON' : 'Push: OFF'}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
