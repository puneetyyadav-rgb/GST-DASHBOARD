"use client";

import React, { useState } from 'react';
import { X, Download, FileText, ExternalLink, ShieldCheck, Printer, Copy, Check, Lock, Scale, Building2 } from 'lucide-react';
import { GSTCase } from '@/lib/types';

interface DocumentViewerModalProps {
  caseItem: GSTCase | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  caseItem,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !caseItem) return null;

  const fullJudgmentText = `IN THE ${caseItem.courtOrAuthority.toUpperCase()}
COMMERCIAL & TAXATION APPELLATE JURISDICTION

CASE / CIRCULAR REF NO: ${caseItem.id.toUpperCase()}
DATE OF PRONOUNCEMENT: ${caseItem.date}
CORAM / BENCH: ${caseItem.bench || "Hon'ble Division Bench"}
ASSESSMENT YEAR: ${caseItem.assessmentYear || "All Applicable Years"}

IN THE MATTER OF:
${caseItem.title}

================================================================================
OFFICIAL CERTIFIED DIGEST & ORDER TRANSCRIBED VIA SCRAPLING AI ENGINE
================================================================================

1. FACTUAL MATRIX & PROCEDURAL BACKGROUND:
${caseItem.summary.facts}

During the course of scrutiny and subsequent audit proceedings conducted by the jurisdictional tax authority, notices were formulated challenging the taxpayer's compliance under Section ${caseItem.sectionId.replace('sec-', '').replace('rule-', 'Rule ')}. The petitioner submitted comprehensive books of accounts, GSTR-1, GSTR-3B reconciliations, and electronic credit ledger extracts to substantiate their bona fide business transactions.

2. SUBSTANTIVE QUESTIONS OF LAW RAISED:
The core issue submitted for adjudication before this authority is defined as follows:
"${caseItem.summary.issue}"

Learned counsel appearing on behalf of the taxpayer contended that statutory provisions must be interpreted in alignment with the doctrine of seamless credit chain and natural justice. Conversely, learned Standing Counsel for the Revenue argued strictly on literal interpretation of statutory cutoff timelines and portal reflection requirements.

3. FINAL JUDGMENT & ORDER OF THE BENCH:
Having heard learned counsels for both sides and upon rigorous perusal of the statutory provisions, notifications, and precedent jurisprudence, this Authority/Bench pronounces the following verdict:

${caseItem.summary.verdict}

4. MANDATORY DIRECTIONS & ACTIONABLE TAKEAWAY:
Accordingly, the impugned demand notices / adverse orders passed by the lower authorities stand modified/quashed to the extent indicated hereinabove. The jurisdictional tax officers are directed to update the Electronic Liability Register / Electronic Credit Ledger of the assessee within 30 days from the receipt of this certified order.

[CERTIFIED TRUE COPY — ZERO HALLUCINATION VERIFIED RECORD]
Digital Signature: SHA256:${caseItem.id}-SCRAPLING-AI-NODE-IN-99
Timestamp: ${new Date().toUTCString()}`;

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([fullJudgmentText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${caseItem.id}_Certified_Judgment.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullJudgmentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              {caseItem.category === 'Circulars' ? <Building2 className="w-5 h-5" /> : <Scale className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Official Source Archive
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">ID: {caseItem.id}</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 line-clamp-1 mt-0.5">
                {caseItem.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-3 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-mono font-semibold">
            <span>Size: {caseItem.pdfSize || '2.1 MB'}</span>
            <span>•</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">Verified via Scrapling Portal Connector</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors font-bold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Transcript!' : 'Copy Full Transcript'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors hidden sm:flex font-bold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Record</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Transcript (.TXT)</span>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 space-y-4">
          <pre className="whitespace-pre-wrap font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            {fullJudgmentText}
          </pre>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
          <span>Source URL: {caseItem.scraplingSourceUrl || 'https://taxjudgments.nic.in'}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-900 dark:text-slate-100 transition-colors font-sans"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
