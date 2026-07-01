"use client";

import React from 'react';
import { Terminal, X, Database, Code2, Cpu, CheckCircle2 } from 'lucide-react';

interface BackendSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendSchemaModal: React.FC<BackendSchemaModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950 px-2 py-0.5 rounded border border-cyan-300 dark:border-cyan-800 flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  FastAPI Python Backend Spec
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                FastAPI Backend Schema & Scrapling Integration
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

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          <div className="space-y-2">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 uppercase tracking-wider text-xs font-mono">
              <Code2 className="w-4 h-4" />
              1. REST API Endpoints Specification
            </h4>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-extrabold border border-emerald-300 dark:border-emerald-800">GET</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">/api/v1/cases</span>
                <span className="text-slate-500 dark:text-slate-400">— List all GST cases with filtering & pagination</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-extrabold border border-emerald-300 dark:border-emerald-800">GET</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">/api/v1/cases/&#123;id&#125;</span>
                <span className="text-slate-500 dark:text-slate-400">— Get full AI synthesis report & certified order</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 font-extrabold border border-emerald-300 dark:border-emerald-800">GET</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">/api/v1/cases/search?q=&#123;query&#125;</span>
                <span className="text-slate-500 dark:text-slate-400">— Full-text semantic legal search</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 font-extrabold border border-blue-300 dark:border-blue-800">POST</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">/api/v1/scrape/trigger</span>
                <span className="text-slate-500 dark:text-slate-400">— Trigger background Scrapling spider</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-400 font-extrabold border border-purple-300 dark:border-purple-800">SSE</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">/api/v1/alerts/subscribe</span>
                <span className="text-slate-500 dark:text-slate-400">— Server-Sent Events stream for live alerts</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2 uppercase tracking-wider text-xs font-mono">
              <Cpu className="w-4 h-4" />
              2. Pydantic v2 Schema Mirroring Frontend
            </h4>
            <pre className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-xs overflow-x-auto text-slate-800 dark:text-slate-200">
{`from pydantic import BaseModel, Field
from typing import List, Optional

class AISummary(BaseModel):
    facts: str = Field(..., description="Factual matrix and audit history")
    issue: str = Field(..., description="Core substantive questions of law")
    verdict: str = Field(..., description="Binding court precedent and order")

class GSTCase(BaseModel):
    id: str
    title: str
    courtOrAuthority: str
    category: str
    date: str
    rawDate: str
    impactScore: float
    sectionId: str
    tags: List[str]
    summary: AISummary
    pdfUrl: Optional[str] = None
    pdfSize: Optional[str] = None`}
            </pre>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 uppercase tracking-wider text-xs font-mono">
              <Database className="w-4 h-4" />
              3. Scrapling Live Portal Integration (`d4vinci/Scrapling`)
            </h4>
            <pre className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 font-mono text-xs overflow-x-auto text-slate-800 dark:text-slate-200">
{`from scrapling import Fetcher

fetcher = Fetcher(auto_match=True)

async def scrape_cbic_circulars():
    page = fetcher.get('https://cbic-gst.gov.in/circulars.html')
    circulars = page.css('.circular-row')
    for c in circulars:
        title = c.css_first('.title').text()
        pdf_link = c.css_first('a.pdf-download').attrib['href']
        yield {"title": title, "pdfUrl": pdf_link}`}
            </pre>
          </div>

        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono font-bold">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            Data Pipeline: Scrapling → FastAPI → Next.js Dashboard
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-900 dark:text-slate-100 transition-colors font-sans"
          >
            Close Schema Preview
          </button>
        </div>

      </div>
    </div>
  );
};
