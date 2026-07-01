"use client";

import React from 'react';
import { X, Terminal, Database, Code2, Cpu } from 'lucide-react';

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-violet-600/30 to-blue-600/30 border border-violet-500/20">
              <Terminal className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                FastAPI Backend Schema & Scrapling Integration
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                v1.0.0 &middot; Python 3.12 &middot; Async Pipeline
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: API Endpoints */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-400">
            <Database className="w-4 h-4" />
            <span>REST API Endpoints</span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300">
              OpenAPI 3.1
            </span>
          </div>
          <pre className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 overflow-x-auto text-[13px] leading-relaxed font-mono">
            <code>
              <span className="text-slate-500"># ── FastAPI Router: /api/v1 ──────────────────────────</span>{'\n'}
              {'\n'}
              <span className="text-emerald-400">GET</span>
              <span className="text-slate-300">    /api/v1/</span>
              <span className="text-sky-400">cases</span>
              <span className="text-slate-500">            # List all GST cases with filtering</span>{'\n'}
              <span className="text-slate-500">                                    # Query params: category, date_from,</span>{'\n'}
              <span className="text-slate-500">                                    #   date_to, sort_by, page, limit</span>{'\n'}
              {'\n'}
              <span className="text-emerald-400">GET</span>
              <span className="text-slate-300">    /api/v1/</span>
              <span className="text-sky-400">cases</span>
              <span className="text-amber-400">/&#123;id&#125;</span>
              <span className="text-slate-500">       # Get single case detail</span>{'\n'}
              <span className="text-slate-500">                                    # Returns: GSTCase with full AI summary</span>{'\n'}
              {'\n'}
              <span className="text-emerald-400">GET</span>
              <span className="text-slate-300">    /api/v1/</span>
              <span className="text-sky-400">cases/search</span>
              <span className="text-amber-400">?q=&#123;query&#125;</span>
              <span className="text-slate-500"> # Full-text search</span>{'\n'}
              <span className="text-slate-500">                                    # Powered by: PostgreSQL tsvector</span>{'\n'}
              {'\n'}
              <span className="text-violet-400">POST</span>
              <span className="text-slate-300">   /api/v1/</span>
              <span className="text-sky-400">scrape/trigger</span>
              <span className="text-slate-500">    # Trigger Scrapling scraper</span>{'\n'}
              <span className="text-slate-500">                                    # Body: &#123; &quot;source&quot;: &quot;cbic-gst&quot; &#125;</span>{'\n'}
              {'\n'}
              <span className="text-emerald-400">GET</span>
              <span className="text-slate-300">    /api/v1/</span>
              <span className="text-sky-400">alerts/subscribe</span>
              <span className="text-slate-500">  # SSE endpoint for live alerts</span>{'\n'}
              <span className="text-slate-500">                                    # Content-Type: text/event-stream</span>
            </code>
          </pre>
        </div>

        {/* Section 2: Pydantic Model */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
            <Code2 className="w-4 h-4" />
            <span>Pydantic Data Model</span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300">
              pydantic v2
            </span>
          </div>
          <pre className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 overflow-x-auto text-[13px] leading-relaxed font-mono">
            <code>
              <span className="text-violet-400">from</span>
              <span className="text-slate-300"> pydantic </span>
              <span className="text-violet-400">import</span>
              <span className="text-sky-400"> BaseModel</span>
              <span className="text-slate-300">, </span>
              <span className="text-sky-400">Field</span>{'\n'}
              <span className="text-violet-400">from</span>
              <span className="text-slate-300"> typing </span>
              <span className="text-violet-400">import</span>
              <span className="text-sky-400"> Optional</span>
              <span className="text-slate-300">, </span>
              <span className="text-sky-400">Literal</span>
              <span className="text-slate-300">, </span>
              <span className="text-sky-400">List</span>{'\n'}
              <span className="text-violet-400">from</span>
              <span className="text-slate-300"> datetime </span>
              <span className="text-violet-400">import</span>
              <span className="text-sky-400"> date</span>{'\n'}
              {'\n'}
              <span className="text-emerald-400">CourtCategory</span>
              <span className="text-slate-300"> = </span>
              <span className="text-sky-400">Literal</span>
              <span className="text-slate-300">[</span>
              <span className="text-amber-300">&apos;High Court&apos;</span>
              <span className="text-slate-300">, </span>
              <span className="text-amber-300">&apos;Supreme Court&apos;</span>
              <span className="text-slate-300">, </span>
              <span className="text-amber-300">&apos;Advance Rulings&apos;</span>
              <span className="text-slate-300">, </span>
              <span className="text-amber-300">&apos;Circulars&apos;</span>
              <span className="text-slate-300">]</span>{'\n'}
              {'\n'}
              <span className="text-violet-400">class</span>
              <span className="text-emerald-400"> AISummary</span>
              <span className="text-slate-300">(</span>
              <span className="text-sky-400">BaseModel</span>
              <span className="text-slate-300">):</span>{'\n'}
              <span className="text-slate-300">    facts</span>
              <span className="text-slate-500">:   </span>
              <span className="text-sky-400">str</span>{'\n'}
              <span className="text-slate-300">    issue</span>
              <span className="text-slate-500">:   </span>
              <span className="text-sky-400">str</span>{'\n'}
              <span className="text-slate-300">    verdict</span>
              <span className="text-slate-500">: </span>
              <span className="text-sky-400">str</span>{'\n'}
              {'\n'}
              <span className="text-violet-400">class</span>
              <span className="text-emerald-400"> GSTCase</span>
              <span className="text-slate-300">(</span>
              <span className="text-sky-400">BaseModel</span>
              <span className="text-slate-300">):</span>{'\n'}
              <span className="text-slate-300">    id</span>
              <span className="text-slate-500">:                </span>
              <span className="text-sky-400">str</span>{'\n'}
              <span className="text-slate-300">    title</span>
              <span className="text-slate-500">:             </span>
              <span className="text-sky-400">str</span>{'\n'}
              <span className="text-slate-300">    court_or_authority</span>
              <span className="text-slate-500">: </span>
              <span className="text-sky-400">str</span>{'\n'}
              <span className="text-slate-300">    category</span>
              <span className="text-slate-500">:          </span>
              <span className="text-emerald-400">CourtCategory</span>{'\n'}
              <span className="text-slate-300">    date</span>
              <span className="text-slate-500">:              </span>
              <span className="text-sky-400">str</span>{'\n'}
              <span className="text-slate-300">    raw_date</span>
              <span className="text-slate-500">:          </span>
              <span className="text-sky-400">date</span>{'\n'}
              <span className="text-slate-300">    impact_score</span>
              <span className="text-slate-500">:      </span>
              <span className="text-sky-400">int</span>
              <span className="text-slate-300"> = </span>
              <span className="text-sky-400">Field</span>
              <span className="text-slate-300">(ge=</span>
              <span className="text-amber-300">0</span>
              <span className="text-slate-300">, le=</span>
              <span className="text-amber-300">10</span>
              <span className="text-slate-300">)</span>{'\n'}
              <span className="text-slate-300">    tags</span>
              <span className="text-slate-500">:              </span>
              <span className="text-sky-400">List</span>
              <span className="text-slate-300">[</span>
              <span className="text-sky-400">str</span>
              <span className="text-slate-300">]</span>{'\n'}
              <span className="text-slate-300">    summary</span>
              <span className="text-slate-500">:           </span>
              <span className="text-emerald-400">AISummary</span>{'\n'}
              <span className="text-slate-300">    pdf_url</span>
              <span className="text-slate-500">:           </span>
              <span className="text-sky-400">Optional</span>
              <span className="text-slate-300">[</span>
              <span className="text-sky-400">str</span>
              <span className="text-slate-300">] = </span>
              <span className="text-amber-300">None</span>{'\n'}
              <span className="text-slate-300">    bench</span>
              <span className="text-slate-500">:             </span>
              <span className="text-sky-400">Optional</span>
              <span className="text-slate-300">[</span>
              <span className="text-sky-400">str</span>
              <span className="text-slate-300">] = </span>
              <span className="text-amber-300">None</span>{'\n'}
              <span className="text-slate-300">    ai_confidence</span>
              <span className="text-slate-500">:    </span>
              <span className="text-sky-400">Optional</span>
              <span className="text-slate-300">[</span>
              <span className="text-sky-400">float</span>
              <span className="text-slate-300">] = </span>
              <span className="text-amber-300">None</span>
            </code>
          </pre>
        </div>

        {/* Section 3: Scrapling Integration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <Cpu className="w-4 h-4" />
            <span>Scrapling Integration</span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300">
              scrapling v0.2
            </span>
          </div>
          <pre className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-slate-950/80 to-slate-950/80 border border-emerald-800/30 overflow-x-auto text-[13px] leading-relaxed font-mono">
            <code>
              <span className="text-violet-400">from</span>
              <span className="text-slate-300"> scrapling </span>
              <span className="text-violet-400">import</span>
              <span className="text-sky-400"> Fetcher</span>{'\n'}
              {'\n'}
              <span className="text-slate-300">fetcher = </span>
              <span className="text-sky-400">Fetcher</span>
              <span className="text-slate-300">(</span>
              <span className="text-slate-300">auto_match=</span>
              <span className="text-amber-300">True</span>
              <span className="text-slate-300">)</span>{'\n'}
              <span className="text-slate-300">page = fetcher.</span>
              <span className="text-emerald-400">get</span>
              <span className="text-slate-300">(</span>
              <span className="text-amber-300">&apos;https://cbic-gst.gov.in/circulars.html&apos;</span>
              <span className="text-slate-300">)</span>{'\n'}
              {'\n'}
              <span className="text-slate-300">circulars = page.</span>
              <span className="text-emerald-400">css</span>
              <span className="text-slate-300">(</span>
              <span className="text-amber-300">&apos;.circular-row&apos;</span>
              <span className="text-slate-300">)</span>{'\n'}
              {'\n'}
              <span className="text-violet-400">for</span>
              <span className="text-slate-300"> c </span>
              <span className="text-violet-400">in</span>
              <span className="text-slate-300"> circulars:</span>{'\n'}
              <span className="text-slate-300">    title = c.</span>
              <span className="text-emerald-400">css_first</span>
              <span className="text-slate-300">(</span>
              <span className="text-amber-300">&apos;.title&apos;</span>
              <span className="text-slate-300">).</span>
              <span className="text-emerald-400">text</span>
              <span className="text-slate-300">()</span>{'\n'}
              <span className="text-slate-300">    pdf_link = c.</span>
              <span className="text-emerald-400">css_first</span>
              <span className="text-slate-300">(</span>
              <span className="text-amber-300">&apos;a.pdf-download&apos;</span>
              <span className="text-slate-300">).attrib[</span>
              <span className="text-amber-300">&apos;href&apos;</span>
              <span className="text-slate-300">]</span>
            </code>
          </pre>
        </div>

        {/* Footer: Data Pipeline */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-semibold">Data Pipeline:</span>
            <span className="font-mono text-xs flex items-center gap-1.5">
              <span className="text-emerald-400">Scrapling</span>
              <span className="text-slate-600">→</span>
              <span className="text-violet-400">FastAPI</span>
              <span className="text-slate-600">→</span>
              <span className="text-sky-400">React Dashboard</span>
            </span>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            PIPELINE ACTIVE
          </span>
        </div>

      </div>
    </div>
  );
};
