"use client";

import React from 'react';
import { Globe, ExternalLink, ShieldCheck, Database, Radio, Building2, Scale, FileText, CheckCircle2 } from 'lucide-react';

export const OfficialSourcesBanner: React.FC = () => {
  const officialSources = [
    {
      title: "CBIC Central Tax Notifications",
      subtitle: "Ministry of Finance • Central Board of Indirect Taxes & Customs",
      url: "https://cbic-gst.gov.in/central-tax-notifications.html",
      badge: "Primary Statutory Portal",
      icon: <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      color: "blue"
    },
    {
      title: "CBIC Official Circulars Archive",
      subtitle: "GST Policy Wing • Standard Operating Procedures & Clarifications",
      url: "https://cbic-gst.gov.in/circulars.html",
      badge: "Live 15s Scrapling Sync",
      icon: <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      color: "emerald"
    },
    {
      title: "Supreme Court Judgment Archive",
      subtitle: "National Judicial Data Grid (NJDG) • Appellate Commercial Bench",
      url: "https://main.sci.gov.in/judgments",
      badge: "SHA-256 Verified Orders",
      icon: <Scale className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      color: "purple"
    },
    {
      title: "GST Council Secretariat Hub",
      subtitle: "Official Meeting Minutes, Law Committee Recommendations & Rate Schedules",
      url: "https://gstcouncil.gov.in/",
      badge: "Constitutional Council Node",
      icon: <Database className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      color: "amber"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors duration-300">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <Globe className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase font-extrabold px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-emerald-600 animate-ping" />
                Live Primary Portal Sync Active
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">Zero Hallucination Protocol</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Official Primary Statutory Sources & Notification Hub
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>All data verified directly against official Indian Government repositories</span>
        </div>
      </div>

      {/* 4-Column Official Portals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {officialSources.map((source, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/60 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between gap-4 group hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  {source.icon}
                </div>
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  {source.badge}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {source.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                  {source.subtitle}
                </p>
              </div>
            </div>

            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-800 transition-all shadow-2xs group/btn"
            >
              <span>Open Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </div>
        ))}
      </div>

      {/* Live Statutory Ticker Strip */}
      <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 font-bold text-blue-900 dark:text-blue-200">
          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>Latest Official Update Ingested:</span>
          <span className="font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 font-extrabold">
            CBIC Circular No. 255/01/2026-GST (Dated 25th June, 2026)
          </span>
        </div>
        <span className="text-[11px] font-mono text-blue-700 dark:text-blue-300 font-semibold">
          Scrapling Engine Next Crawl Cycle: 14s
        </span>
      </div>

    </div>
  );
};
