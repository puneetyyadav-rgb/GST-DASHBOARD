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
  Terminal
} from 'lucide-react';
import { GSTCase } from '@/lib/types';

interface CaseCardProps {
  caseItem: GSTCase;
  onSelectCase: (caseItem: GSTCase) => void;
  onOpenDocumentViewer: (caseItem: GSTCase) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  caseItem,
  onSelectCase,
  onOpenDocumentViewer,
}) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopyCitation = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${caseItem.title} (${caseItem.courtOrAuthority}, ${caseItem.date}) - Section: ${caseItem.sectionId.toUpperCase()}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Supreme Court':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'High Court':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Advance Rulings':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Circulars':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div 
      onClick={() => onSelectCase(caseItem)}
      className="group glass-card rounded-2xl p-5 sm:p-6 border border-slate-800/80 hover:border-primary/50 transition-all duration-300 cursor-pointer space-y-4 shadow-md hover:shadow-xl relative overflow-hidden"
    >
      {/* Subtle top glow bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* HEADER SECTION: Court/Category, Impact Score, Date, Actions */}
      <div className="flex flex-col space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Pill */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeColor(caseItem.category)}`}>
              <Scale className="w-3.5 h-3.5 shrink-0" />
              <span>{caseItem.courtOrAuthority}</span>
            </span>

            {/* Impact Score Pill */}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-800/90 border border-slate-700/80 text-slate-300">
              <Zap className={`w-3 h-3 ${caseItem.impactScore >= 9.5 ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
              <span>Impact: <strong className="text-white">{caseItem.impactScore}/10</strong></span>
            </span>

            {/* AI Confidence */}
            {caseItem.aiConfidence && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-2.5 h-2.5" />
                AI Verified ({caseItem.aiConfidence}%)
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleCopyCitation}
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Copy Citation"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
              title="Bookmark Case"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'text-amber-400 fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Case Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100 group-hover:text-primary transition-colors leading-snug">
          {caseItem.title}
        </h3>

        {/* TAGS SECTION (Relevant Sections & Rules) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {caseItem.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-slate-600 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {caseItem.bench && (
            <span className="text-xs text-slate-500 font-sans pl-1 hidden md:inline">
              Bench: {caseItem.bench}
            </span>
          )}
        </div>
      </div>

      {/* AI SUMMARY SECTION (Grid format: 3 Columns on lg screens, stacked/compact on small) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/70 rounded-xl p-4 border border-slate-900 shadow-inner">
        
        {/* The Facts */}
        <div className="space-y-1.5 md:border-r md:border-slate-800/80 md:pr-4">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>The Facts</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {caseItem.summary.facts}
          </p>
        </div>

        {/* The Issue */}
        <div className="space-y-1.5 md:border-r md:border-slate-800/80 md:pr-4">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span>The Issue</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
            {caseItem.summary.issue}
          </p>
        </div>

        {/* The Verdict */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>The Verdict</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-300/90 leading-relaxed font-sans font-medium">
            {caseItem.summary.verdict}
          </p>
        </div>

      </div>

      {/* Strict Source AI Actions */}
      <div className="space-y-3 pt-4 border-t border-slate-800" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>AI Actions (Strictly Sourced — Zero Hallucination)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onOpenDocumentViewer(caseItem)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors">
            <Layers className="w-3 h-3 text-indigo-300" />
            Draft Client Advisory Email
          </button>
          <button onClick={() => onOpenDocumentViewer(caseItem)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors">
            <ShieldCheck className="w-3 h-3 text-indigo-300" />
            Extract Arguments for SCN Reply
          </button>
          <button onClick={() => onOpenDocumentViewer(caseItem)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors">
            <Terminal className="w-3 h-3 text-indigo-300" />
            Ask Specific Question on Ruling
          </button>
        </div>
        <p className="text-[10px] text-slate-500 font-mono mt-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          All AI generations are strictly confined to the 100% verified official PDF source document.
        </p>
      </div>

      {/* FOOTER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-800/80 gap-4">
        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400">
            Ruling Date: <span className="text-slate-200 font-semibold">{caseItem.date}</span>
          </div>
          {caseItem.assessmentYear && (
            <span className="text-xs font-mono bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
              {caseItem.assessmentYear}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end" onClick={(e) => e.stopPropagation()}>
          
          {/* Deep Dive / Read Analysis Button */}
          <button
            onClick={() => onSelectCase(caseItem)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-xs font-semibold text-slate-200 transition-all border border-slate-700 group/btn"
          >
            <span>Read Deep Dive</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          {/* Open Official Source / Viewer Button */}
          <button
            onClick={() => onOpenDocumentViewer(caseItem)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-blue-500 text-slate-950 font-bold text-xs shadow-glow-blue transition-all transform active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Open Official Source ({caseItem.pdfSize || '2.1 MB'})</span>
          </button>

        </div>
      </div>

    </div>
  );
};
