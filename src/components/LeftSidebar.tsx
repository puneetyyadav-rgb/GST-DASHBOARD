"use client";

import React from 'react';
import { Filter, Calendar, TrendingUp, CheckSquare, Square, RotateCcw } from 'lucide-react';
import { CourtCategory, DateRangeFilter, RelevanceSort } from '@/lib/types';

interface LeftSidebarProps {
  categories: Record<CourtCategory, boolean>;
  onToggleCategory: (category: CourtCategory) => void;
  dateRange: DateRangeFilter;
  onSelectDateRange: (range: DateRangeFilter) => void;
  relevanceSort: RelevanceSort;
  onSelectRelevance: (sort: RelevanceSort) => void;
  onResetFilters: () => void;
  categoryCounts: Record<CourtCategory, number>;
}

const CATEGORY_LIST: CourtCategory[] = [
  'Supreme Court',
  'High Court',
  'Advance Rulings',
  'Circulars',
  'Notifications',
];

const DATE_RANGES: DateRangeFilter[] = [
  'Today',
  'This Week',
  'This Month',
  'All',
];

const RELEVANCE_SORTS: RelevanceSort[] = [
  'Latest',
  'Highest Impact',
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors duration-300">
        
        {/* Header & Reset */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900 dark:text-slate-100">
            <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Jurisdiction & Filters</span>
          </div>
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            title="Reset All Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* 1. Category Checkboxes */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-mono">
            Court & Authority Category
          </label>
          <div className="space-y-2">
            {CATEGORY_LIST.map((cat) => {
              const isChecked = categories[cat];
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => onToggleCategory(cat)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      isChecked
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-transparent group-hover:border-blue-500'
                    }`}>
                      <CheckSquare className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className={`text-xs font-semibold transition-colors ${isChecked ? 'text-slate-900 dark:text-slate-100 font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                      {cat}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Date Range Filter */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>Pronouncement Window</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {DATE_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => onSelectDateRange(range)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                  dateRange === range
                    ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 dark:border-blue-700 text-blue-700 dark:text-blue-300 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Relevance & Impact Sorting */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Relevance & Impact Ranking</span>
          </div>
          <div className="flex flex-col gap-2">
            {RELEVANCE_SORTS.map((sort) => (
              <button
                key={sort}
                onClick={() => onSelectRelevance(sort)}
                className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all border ${
                  relevanceSort === sort
                    ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 dark:border-blue-700 text-blue-700 dark:text-blue-300 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>{sort === 'Latest' ? '⏳ Chronological (Newest First)' : '🔥 Highest Litigation Score'}</span>
                {relevanceSort === sort && <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm" />}
              </button>
            ))}
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between font-mono font-semibold">
          <span>Scrapling Engine:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live Sync
          </span>
        </div>

      </div>
    </aside>
  );
};
