"use client";

import React, { useState, useMemo } from 'react';
import { SearchX, Sparkles, Filter, RotateCcw, Radio, Bell, X, Send } from 'lucide-react';
import { TopNav } from '@/components/TopNav';
import { LeftSidebar } from '@/components/LeftSidebar';
import { CaseCard } from '@/components/CaseCard';
import { CaseDetailModal } from '@/components/CaseDetailModal';
import { BackendSchemaModal } from '@/components/BackendSchemaModal';
import { SectionExplorer } from '@/components/SectionExplorer';
import { NotificationHubModal } from '@/components/NotificationHubModal';
import { DocumentViewerModal } from '@/components/DocumentViewerModal';
import { INITIAL_GST_CASES, GST_SECTIONS_DATA, STREAMING_CASE_BANK } from '@/lib/mockData';
import { CourtCategory, DateRangeFilter, RelevanceSort, GSTCase, ViewMode } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  // Main Data State (Supports live real-time additions via simulated Scrapling stream)
  const [cases, setCases] = useState<GSTCase[]>(INITIAL_GST_CASES);
  const [streamIndex, setStreamIndex] = useState(0);

  // Filter & Navigation States
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Record<CourtCategory, boolean>>({
    'High Court': true,
    'Supreme Court': true,
    'Advance Rulings': true,
    'Circulars': true,
  });
  const [dateRange, setDateRange] = useState<DateRangeFilter>('All');
  const [relevanceSort, setRelevanceSort] = useState<RelevanceSort>('Latest');
  const [liveAlerts, setLiveAlerts] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('landmark-sections');

  // Modals
  const [selectedCase, setSelectedCase] = useState<GSTCase | null>(null);
  const [viewerCase, setViewerCase] = useState<GSTCase | null>(null);
  const [showBackendModal, setShowBackendModal] = useState(false);
  const [showNotificationHub, setShowNotificationHub] = useState(false);

  // Tracking Log State & Toast Notification State
  const [notificationLog, setNotificationLog] = useState<{ id: string; title: string; section: string; time: string }[]>([]);
  const [activeToast, setActiveToast] = useState<{ title: string; section: string } | null>(null);

  // Trigger Simulated Live Scrape / Auto-Add New Ruling
  const handleTriggerLiveScrape = () => {
    if (streamIndex < STREAMING_CASE_BANK.length) {
      const nextCase = STREAMING_CASE_BANK[streamIndex];
      setCases(prev => [nextCase, ...prev]);
      setStreamIndex(prev => prev + 1);

      const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const logEntry = {
        id: `notif-${Date.now()}`,
        title: nextCase.title,
        section: nextCase.sectionId.toUpperCase(),
        time: timeStr
      };

      setNotificationLog(prev => [logEntry, ...prev]);

      if (liveAlerts) {
        setActiveToast({ title: nextCase.title, section: nextCase.sectionId.toUpperCase() });
        setTimeout(() => {
          setActiveToast(null);
        }, 6000);
      }
    }
  };

  const hasMoreLiveCases = streamIndex < STREAMING_CASE_BANK.length;

  // Toggle category checkbox
  const handleToggleCategory = (cat: CourtCategory) => {
    setCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setCategories({
      'High Court': true,
      'Supreme Court': true,
      'Advance Rulings': true,
      'Circulars': true,
    });
    setDateRange('All');
    setRelevanceSort('Latest');
  };

  // Filter cases based on searchQuery, category checkboxes, and dateRange
  const filteredCases = useMemo(() => {
    return cases.filter((caseItem) => {
      // 1. Search Query (match title, authority, tags, or any summary field)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = caseItem.title.toLowerCase().includes(query);
        const matchesCourt = caseItem.courtOrAuthority.toLowerCase().includes(query);
        const matchesTags = caseItem.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesFacts = caseItem.summary.facts.toLowerCase().includes(query);
        const matchesIssue = caseItem.summary.issue.toLowerCase().includes(query);
        const matchesVerdict = caseItem.summary.verdict.toLowerCase().includes(query);

        if (!matchesTitle && !matchesCourt && !matchesTags && !matchesFacts && !matchesIssue && !matchesVerdict) {
          return false;
        }
      }

      // 2. Category Checkboxes (if any selected, must match; if all unselected, show all)
      const anyCategorySelected = Object.values(categories).some(Boolean);
      if (anyCategorySelected && !categories[caseItem.category]) {
        return false;
      }

      // 3. Date Range Filter
      if (dateRange !== 'All') {
        const todayStr = new Date().toISOString().split('T')[0];
        const caseDateStr = caseItem.rawDate;

        if (dateRange === 'Today') {
          if (caseDateStr !== todayStr && caseDateStr !== '2026-07-01') return false;
        } else if (dateRange === 'This Week') {
          const caseDate = new Date(caseDateStr);
          const now = new Date();
          const diffDays = (now.getTime() - caseDate.getTime()) / (1000 * 3600 * 24);
          if (diffDays > 7 && caseDateStr !== '2026-07-01') return false;
        } else if (dateRange === 'This Month') {
          const caseDate = new Date(caseDateStr);
          const now = new Date();
          const diffDays = (now.getTime() - caseDate.getTime()) / (1000 * 3600 * 24);
          if (diffDays > 30 && caseDateStr !== '2026-07-01') return false;
        }
      }

      return true;
    });
  }, [cases, searchQuery, categories, dateRange]);

  // Compute unfiltered counts per category for sidebar badges
  const categoryCounts = useMemo(() => {
    const counts: Record<CourtCategory, number> = {
      'High Court': 0,
      'Supreme Court': 0,
      'Advance Rulings': 0,
      'Circulars': 0,
    };
    cases.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [cases]);

  return (
    <div className="min-h-screen bg-background bg-grid-pattern text-foreground flex flex-col relative">
      {/* Sticky Top Navigation */}
      <TopNav
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        liveAlerts={liveAlerts}
        onToggleAlerts={() => setLiveAlerts(!liveAlerts)}
        onOpenBackendModal={() => setShowBackendModal(true)}
        onOpenNotificationHub={() => setShowNotificationHub(true)}
        totalResults={filteredCases.length}
      />

      {/* Interactive Live Web Push Toast Popup */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full glass-panel rounded-2xl p-4 border border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.35)] bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-emerald-950/80"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Bell className="w-4 h-4 animate-bounce" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Scrapling Push Alert
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Just Now</span>
                </div>
                <p className="text-xs font-bold text-white leading-snug line-clamp-2">
                  {activeToast.title}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Section: {activeToast.section} • Auto-appended to feed
                </p>
              </div>
              <button
                onClick={() => setActiveToast(null)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar (Filters) */}
          <LeftSidebar
            categories={categories}
            onToggleCategory={handleToggleCategory}
            dateRange={dateRange}
            onSelectDateRange={setDateRange}
            relevanceSort={relevanceSort}
            onSelectRelevance={setRelevanceSort}
            onResetFilters={handleResetFilters}
            categoryCounts={categoryCounts}
          />

          {/* Main Feed Section */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Feed Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    GST Case Intelligence Engine
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Live Stream v3.2
                    </span>
                  </h1>
                  <p className="text-xs text-slate-400">
                    Showing <strong className="text-slate-200">{filteredCases.length}</strong> of {cases.length} official AI-analyzed tax rulings
                  </p>
                </div>
              </div>
            </div>

            {/* If no results found */}
            {filteredCases.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-3xl p-12 text-center border border-slate-800/80 space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-900 mx-auto flex items-center justify-center border border-slate-800 shadow-inner">
                  <SearchX className="w-8 h-8 text-slate-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-200">No matching GST rulings found</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    We couldn&apos;t find any case laws or circulars matching your search filters. Try adjusting jurisdiction categories or resetting search queries.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-slate-950 font-bold text-xs shadow-glow-blue hover:bg-blue-500 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </motion.div>
            ) : (
              /* Section Explorer Split View & Feed */
              <SectionExplorer
                sections={GST_SECTIONS_DATA}
                cases={filteredCases}
                viewMode={viewMode}
                onSelectViewMode={setViewMode}
                onSelectCase={setSelectedCase}
                onOpenDocumentViewer={(c) => setViewerCase(c)}
                onTriggerLiveScrape={handleTriggerLiveScrape}
                hasMoreLiveCases={hasMoreLiveCases}
              />
            )}

          </div>
        </div>
      </main>

      {/* Detail Deep Dive Modal */}
      <CaseDetailModal
        caseItem={selectedCase}
        onClose={() => setSelectedCase(null)}
        onOpenDocumentViewer={(c) => {
          setSelectedCase(null);
          setViewerCase(c);
        }}
      />

      {/* Complete Official Document Viewer & Transcript Modal */}
      <DocumentViewerModal
        caseItem={viewerCase}
        isOpen={!!viewerCase}
        onClose={() => setViewerCase(null)}
      />

      {/* Backend & Scrapling Preview Modal */}
      <BackendSchemaModal
        isOpen={showBackendModal}
        onClose={() => setShowBackendModal(false)}
      />

      {/* Notification Tracking Architecture & Push Logs Modal */}
      <NotificationHubModal
        isOpen={showNotificationHub}
        onClose={() => setShowNotificationHub(false)}
        liveAlerts={liveAlerts}
        onToggleAlerts={() => setLiveAlerts(!liveAlerts)}
        recentNotificationLog={notificationLog}
      />
    </div>
  );
}
