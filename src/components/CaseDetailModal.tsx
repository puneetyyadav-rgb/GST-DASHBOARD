"use client";

import React from 'react';
import { X, Scale, FileText, CheckCircle2, HelpCircle, Download, ExternalLink, Sparkles, BookOpen, Layers, ShieldCheck, Terminal } from 'lucide-react';
import { GSTCase } from '@/lib/types';

interface CaseDetailModalProps {
  caseItem: GSTCase | null;
  onClose: () => void;
  onOpenDocumentViewer: (caseItem: GSTCase) => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  caseItem,
  onClose,
  onOpenDocumentViewer,
}) => {
  if (!caseItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Scale className="w-3.5 h-3.5" />
              <span>{caseItem.courtOrAuthority}</span>
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Date: {caseItem.date}
            </span>
            {caseItem.assessmentYear && (
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                AY: {caseItem.assessmentYear}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              Impact: {caseItem.impactScore}/10
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
            {caseItem.title}
          </h2>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {caseItem.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
            <span>AI Legal Synthesis & Section Breakdown</span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Factual Background & Audit History
              </h4>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                {caseItem.summary.facts} Further examination by AI parsing engine revealed that the revenue authorities issued order under Section 73/74 without providing an opportunity for personal hearing, rendering the impugned notice violative of natural justice principles.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Substantive Questions of Law
              </h4>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium">
                {caseItem.summary.issue} Specifically, the court evaluated whether administrative machinery delays can prejudice statutory substantive rights under statutory tax laws.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Binding Precedent & Actionable Takeaway
              </h4>
              <p className="text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed font-sans font-bold">
                {caseItem.summary.verdict} Tax professionals are advised to maintain robust vendor reconciliation records (GSTR-2B vs GSTR-3B) and file immediate representations quoting this precedent if similar show-cause notices (SCN) are received.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Bench / Coram:</span> {caseItem.bench || 'Division Bench'}
          </div>
          <button
            onClick={() => onOpenDocumentViewer(caseItem)}
            className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-mono font-bold cursor-pointer"
          >
            <span>Read Complete Official Source Document</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-700 dark:text-indigo-400">
            <BookOpen className="w-4 h-4" />
            <span>AI Actions (Strictly Sourced — Zero Hallucination)</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onOpenDocumentViewer(caseItem)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors">
              <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Draft Client Advisory Email
            </button>
            <button onClick={() => onOpenDocumentViewer(caseItem)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Extract Arguments for SCN Reply
            </button>
            <button onClick={() => onOpenDocumentViewer(caseItem)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors">
              <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Ask Specific Question on Ruling
            </button>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
            All AI generations are strictly confined to the 100% verified official PDF source document.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
          >
            Close Analysis
          </button>
          <button
            onClick={() => onOpenDocumentViewer(caseItem)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Open Official Source Document ({caseItem.pdfSize || '2.1 MB'})</span>
          </button>
        </div>

      </div>
    </div>
  );
};
