import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SUPPORTED_SITES } from '../../engine/getNames';

export const SupportedSitesStrip: React.FC = () => (
  <div className="space-y-1.5">
    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">
      Nguồn được hỗ trợ
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
      {SUPPORTED_SITES.map((site) => (
        <div
          key={site.id}
          className="py-2.5 px-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 flex items-center justify-between gap-2.5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          <div className="min-w-0">
            <p className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate">
              {site.name}
            </p>
            <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">{site.domain}</p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        </div>
      ))}
    </div>
  </div>
);
