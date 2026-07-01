"use client";

import React, { useState } from 'react';
import { 
  FolderOpen, 
  Flame, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  Zap, 
  PlusCircle, 
  Radio, 
  Layers, 
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { GSTCase, GSTSectionInfo, ViewMode } from '@/lib/types';
import { CaseCard } from './CaseCard';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionExplorerProps {
  sections: GSTSectionInfo[];
  cases: GSTCase[];
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  onSelectCase: (caseItem: GSTCase) => void;
  onOpenDocumentViewer: (caseItem: GSTCase) => void;
  onTriggerLiveScrape: () => void;
  hasMoreLiveCases: boolean;
}

export const SectionExplorer: React.FC<SectionExplorerProps> = ({
  sections,
  cases,
  viewMode,
  onSelectViewMode,
  onSelectCase,
  onOpenDocumentViewer,
  onTriggerLiveScrape,
  hasMoreLiveCases,
}) => {
  // Keep track of which sections are currently expanded (default: open top 2 most litigated sections)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "sec-16": true,
    "sec-17-5": true,
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    sections.forEach(s => { all[s.id] = true; });
    setExpandedSections(all);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  // Sort cases newest to oldest
  const sortedCasesChronological = [...cases].sort((a, b) => {
    if (a.rawDate > b.rawDate) return -1;
    if (a.rawDate < b.rawDate) return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      
      {/* View Mode Switcher & Live Scrape Streamer Banner */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-blue-950/30">
        
        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => onSelectViewMode('landmark-sections')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              viewMode === 'landmark-sections'
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-glow-blue'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Popular Sections Split</span>
          </button>

          <button
            onClick={() => onSelectViewMode('chronological')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              viewMode === 'chronological'
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-glow-blue'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>All Rulings (Newest to Oldest)</span>
          </button>
        </div>

        {/* Live Scrape Stream Action Button */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-800/40">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">Scrapling Stream:</span>
            <span className="font-bold">Active</span>
          </div>

          <button
            onClick={onTriggerLiveScrape}
            disabled={!hasMoreLiveCases}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 ${
              hasMoreLiveCases
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transform active:scale-95 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{hasMoreLiveCases ? '⚡ Simulate Live Portal Scrape' : '✓ All Portal Cases Scraped'}</span>
          </button>
        </div>

      </div>

      {/* VIEW MODE 1: POPULAR SECTIONS SPLIT (Section-Wise) */}
      {viewMode === 'landmark-sections' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
                GST Statutory Sections — Organized by Litigation & Popularity
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <button onClick={expandAll} className="hover:text-primary transition-colors underline cursor-pointer">Expand All</button>
              <span>•</span>
              <button onClick={collapseAll} className="hover:text-primary transition-colors underline cursor-pointer">Collapse All</button>
            </div>
          </div>

          <div className="space-y-5">
            {sections.map((section) => {
              // Filter all cases belonging to this section, and sort them Newest to Oldest!
              const sectionCases = cases
                .filter(c => c.sectionId === section.id)
                .sort((a, b) => (a.rawDate < b.rawDate ? 1 : -1));

              const isExpanded = !!expandedSections[section.id];

              return (
                <div 
                  key={section.id}
                  className="glass-card rounded-2xl border border-slate-800/90 overflow-hidden shadow-lg transition-all duration-300"
                >
                  {/* Section Header Banner */}
                  <div 
                    onClick={() => toggleSection(section.id)}
                    className={`p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
                      isExpanded ? 'bg-slate-900/90 border-b border-slate-800' : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary font-mono font-bold text-xs shadow-sm">
                          {section.sectionNumber}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-sans">
                          {section.chapter}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                          Popularity: {section.litigationScore}/10
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {section.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                        {section.summaryDescription}
                      </p>

                      {/* Keywords */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {section.popularKeywords.map((kw, idx) => (
                          <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                            • {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center justify-between w-full md:w-auto gap-4 md:flex-col md:items-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/60">
                      <div className="flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold font-mono text-emerald-300">
                          {sectionCases.length} {sectionCases.length === 1 ? 'Ruling' : 'Rulings'} Available
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(section.id);
                        }}
                        className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Rulings' : 'View All Rulings'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Rulings Feed for this Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="p-4 sm:p-6 bg-slate-950/60 space-y-4 max-h-[850px] overflow-y-auto pr-2"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-xs text-slate-400 sticky top-0 bg-slate-950/90 py-2 z-10">
                          <span className="font-mono text-cyan-400">
                            Showing {sectionCases.length} rulings sorted from <strong className="text-white">Newest to Oldest</strong>
                          </span>
                          <span>Click card or 'Open Official Source'</span>
                        </div>

                        {sectionCases.length === 0 ? (
                          <div className="text-center py-8 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                            <p className="text-sm font-medium text-slate-300">No rulings currently filtered under this section.</p>
                            <p className="text-xs text-slate-500 mt-1">Try clicking 'Simulate Live Portal Scrape' or resetting sidebar filters.</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {sectionCases.map((caseItem) => (
                              <div key={caseItem.id} className={caseItem.isNewArrival ? "ring-2 ring-emerald-500/80 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all" : ""}>
                                <CaseCard
                                  caseItem={caseItem}
                                  onSelectCase={onSelectCase}
                                  onOpenDocumentViewer={onOpenDocumentViewer}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: CHRONOLOGICAL FEED (All Rulings Newest to Oldest) */}
      {viewMode === 'chronological' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
                All Rulings & Circulars — Strict Chronological Stream (Newest to Oldest)
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Total: {sortedCasesChronological.length} records
            </span>
          </div>

          <div className="space-y-5">
            {sortedCasesChronological.map((caseItem) => (
              <div key={caseItem.id} className={caseItem.isNewArrival ? "ring-2 ring-emerald-500/80 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all" : ""}>
                <CaseCard
                  caseItem={caseItem}
                  onSelectCase={onSelectCase}
                  onOpenDocumentViewer={onOpenDocumentViewer}
                />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
