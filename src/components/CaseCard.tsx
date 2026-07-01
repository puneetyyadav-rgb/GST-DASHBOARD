"use client";

import React, { useState } from 'react';
import { 
  Download, 
  Scale, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Bookmark, 
  Zap,
  ChevronRight,
  BookOpen,
  Layers,
  ShieldCheck,
  Terminal,
  Volume2
} from 'lucide-react';
import { GSTCase } from '@/lib/types';

interface CaseCardProps {
  caseItem: GSTCase;
  onSelectCase: (caseItem: GSTCase) => void;
  onOpenDocumentViewer: (caseItem: GSTCase) => void;
  onPlayAudioBriefing?: (caseItem: GSTCase) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  caseItem,
  onSelectCase,
  onOpenDocumentViewer,
  onPlayAudioBriefing,
}) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopyCitation = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${caseItem.title} (${caseItem.courtOrAuthority}, ${caseItem.date}) - Section: ${caseItem.sectionId.toUpperCase()}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case 'Supreme Court':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/50';
      case 'High Court':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/50';
      case 'Advance Rulings':
        return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/50';
      case 'Circulars':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/50';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div 
      onClick={() => onSelectCase(caseItem)}
      className="group bg-white dark:bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/50 transition-all duration-300 cursor-pointer space-y-5 shadow-sm hover:shadow-lg relative overflow-hidden"
    >
      {/* Top hover accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* HEADER SECTION: Category, Impact Score, Date, Actions */}
      <div className="flex flex-col space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Pill */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getCategoryBadgeStyle(caseItem.category)}`}>
              <Scale className="w-3.5 h-3.5 shrink-0" />
              <span>{caseItem.courtOrAuthority}</span>
            </span>

            {/* Impact Score Pill */}
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <Zap className={`w-3.5 h-3.5 ${caseItem.impactScore >= 9.5 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
              <span>Impact: <strong className="font-extrabold">{caseItem.impactScore}/10</strong></span>
            </span>

            {/* AI Verified Badge */}
            {caseItem.aiConfidence && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60">
                <Sparkles className="w-3 h-3 text-blue-500" />
                AI Verified ({caseItem.aiConfidence}%)
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleCopyCitation}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors border border-slate-200 dark:border-slate-700"
              title="Copy Citation"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors border border-slate-200 dark:border-slate-700"
              title="Bookmark Case"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-amber-500 fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Case Title */}
        <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {caseItem.title}
        </h3>

        {/* TAGS SECTION */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {caseItem.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {caseItem.bench && (
            <span className="text-xs text-slate-500 dark:text-slate-400 font-sans pl-1 hidden md:inline">
              Bench: {caseItem.bench}
            </span>
          )}
        </div>
      </div>

      {/* AI SUMMARY 3-COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        
        {/* The Facts */}
        <div className="bg-blue-50/60 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>The Facts</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {caseItem.summary.facts}
          </p>
        </div>

        {/* The Issue */}
        <div className="bg-amber-50/60 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>The Issue</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium">
            {caseItem.summary.issue}
          </p>
        </div>

        {/* The Verdict */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/25 p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/40 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>The Verdict</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed font-sans font-semibold">
            {caseItem.summary.verdict}
          </p>
        </div>

      </div>

      {/* Strict Source AI Actions */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>AI Actions (Strictly Sourced — Zero Hallucination)</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button onClick={() => onOpenDocumentViewer(caseItem)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 transition-colors shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Draft Client Advisory Email
          </button>
          <button onClick={() => onOpenDocumentViewer(caseItem)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 transition-colors shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Extract Arguments for SCN Reply
          </button>
          <button onClick={() => onOpenDocumentViewer(caseItem)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 transition-colors shadow-2xs">
            <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Ask Specific Question on Ruling
          </button>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
          All AI generations are strictly confined to the 100% verified official PDF source document.
        </p>
      </div>

      {/* FOOTER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Ruling Date: <span className="text-slate-900 dark:text-slate-100 font-bold">{caseItem.date}</span>
          </div>
          {caseItem.assessmentYear && (
            <span className="text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {caseItem.assessmentYear}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end" onClick={(e) => e.stopPropagation()}>
          
          {/* Audio Summary Button */}
          {onPlayAudioBriefing && (
            <button
              onClick={() => onPlayAudioBriefing(caseItem)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-100 dark:hover:bg-blue-900 text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition-all shadow-2xs group/btn cursor-pointer"
              title="Listen to 30s AI Audio Summary"
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover/btn:scale-110 transition-transform" />
              <span>🎙️ Audio Briefing</span>
            </button>
          )}

          {/* Deep Dive Button */}
          <button
            onClick={() => onSelectCase(caseItem)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700 group/btn"
          >
            <span>Read Deep Dive</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          {/* Open Official Source Button */}
          <button
            onClick={() => onOpenDocumentViewer(caseItem)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all transform active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Open Official Source ({caseItem.pdfSize || '2.1 MB'})</span>
          </button>

        </div>
      </div>

    </div>
  );
};
