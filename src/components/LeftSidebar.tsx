"use client";

import React from 'react';
import { Filter, Calendar, TrendingUp, CheckSquare, Square, RotateCcw, ShieldAlert, Zap } from 'lucide-react';
import { CourtCategory, DateRangeFilter, RelevanceSort } from '@/lib/types';

interface LeftSidebarProps {
  categories: Record<CourtCategory, boolean>;
  onToggleCategory: (cat: CourtCategory) => void;
  dateRange: DateRangeFilter;
  onSelectDateRange: (range: DateRangeFilter) => void;
  relevanceSort: RelevanceSort;
  onSelectRelevance: (sort: RelevanceSort) => void;
  onResetFilters: () => void;
  categoryCounts: Record<CourtCategory, number>;
}

const CATEGORY_LIST: CourtCategory[] = [
  'High Court',
  'Supreme Court',
  'Advance Rulings',
  'Circulars'
];

const DATE_RANGES: DateRangeFilter[] = [
  'All',
  'Today',
  'This Week',
  'This Month',
  'Custom'
];

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  categories,
  onToggleCategory,
  dateRange,
  onSelectDateRange,
  relevanceSort,
  onSelectRelevance,
  onResetFilters,
  categoryCounts,
}) => {
  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      
      {/* Main Filter Container */}
      <div className="glass-card rounded-2xl p-5 space-y-6 sticky top-28 border border-slate-800/80 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-sm tracking-wide uppercase text-slate-200">
              Intelligence Filters
            </h2>
          </div>
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary transition-colors font-medium"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Relevance Sort Section */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Relevance & Priority</span>
          </label>
          <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            {(['Latest', 'Highest Impact'] as RelevanceSort[]).map((sortOption) => {
              const active = relevanceSort === sortOption;
              return (
                <button
                  key={sortOption}
                  onClick={() => onSelectRelevance(sortOption)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    active
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-md font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {sortOption === 'Highest Impact' && <Zap className="w-3 h-3 text-amber-300" />}
                  <span>{sortOption}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Checkboxes Section */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Jurisdiction Category
          </label>
          <div className="space-y-2">
            {CATEGORY_LIST.map((cat) => {
              const isChecked = categories[cat];
              const count = categoryCounts[cat] || 0;
              return (
                <div
                  key={cat}
                  onClick={() => onToggleCategory(cat)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                    isChecked
                      ? 'bg-slate-800/80 border-primary/40 text-slate-100 shadow-sm'
                      : 'bg-slate-900/40 border-transparent hover:bg-slate-900/80 text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-5 h-5 rounded-md border transition-colors ${
                      isChecked 
                        ? 'bg-primary border-primary text-slate-950' 
                        : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isChecked && (
                        <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium">{cat}</span>
                  </div>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                    isChecked ? 'bg-primary/20 text-primary font-semibold' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Date Range Section */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>Ruling Date Range</span>
          </label>
          <div className="space-y-1.5">
            {DATE_RANGES.map((range) => {
              const active = dateRange === range;
              return (
                <button
                  key={range}
                  onClick={() => onSelectDateRange(range)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? 'bg-slate-800 border border-slate-600 text-white shadow'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-300'
                  }`}
                >
                  <span>{range}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrapling AI Scraper Status Card */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 border border-blue-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SCRAPLING AI ENGINE
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Auto-scraping High Courts & CBIC circulars in real-time. Verified against raw JSON APIs.
            </p>
          </div>
        </div>

      </div>
    </aside>
  );
};
