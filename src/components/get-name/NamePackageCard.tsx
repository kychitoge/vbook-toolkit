import React, { useState } from 'react';
import { Download, Copy, Check, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { NamePackage, downloadTextFile, makeSafeFilename } from '../../engine/getNames';
import { useToast } from '../Toast';

const PREVIEW_LIMIT = 8;

interface Props {
  pkg: NamePackage;
  index: number;
}

export const NamePackageCard: React.FC<Props> = ({ pkg, index }) => {
  const { showToast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const lines = pkg.content ? pkg.content.split('\n').filter(Boolean) : [];
  const displayLines = expanded ? lines : lines.slice(0, PREVIEW_LIMIT);
  const hasMore = lines.length > PREVIEW_LIMIT;

  const handleDownload = () => {
    downloadTextFile(`Names_${makeSafeFilename(pkg.originalName || pkg.title)}.txt`, pkg.content);
    showToast(`Đã tải xuống "${pkg.title}"`, 'success');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pkg.content);
    setCopied(true);
    showToast(`Đã sao chép ${pkg.totalCount.toLocaleString('vi-VN')} names`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3.5 sm:p-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold text-xs flex-shrink-0 mt-0.5">
            {index + 1}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
              {pkg.title}
            </h4>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5 text-[10.5px] sm:text-[11px]">
              <span className="font-medium text-brand-primary dark:text-sky-400">
                {pkg.totalCount.toLocaleString('vi-VN')} names
              </span>
              {pkg.date && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="flex items-center gap-1 text-slate-400 truncate">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    {pkg.date}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Nút hành động — dạng 2 cột trên điện thoại, flex trên tablet/desktop */}
        <div className="grid grid-cols-2 sm:flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto pt-1 sm:pt-0">
          <button
            type="button"
            onClick={handleCopy}
            className="btn-secondary py-1.5 px-2.5 sm:px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
            title="Sao chép toàn bộ danh sách"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="text-emerald-600 dark:text-emerald-400">Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                <span>Sao chép</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="btn-primary py-1.5 px-2.5 sm:px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5"
            title="Tải file .txt"
          >
            <Download className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Tải .txt</span>
          </button>
        </div>
      </div>

      {/* Preview Sandbox */}
      <div className="mt-2.5 sm:mt-3 bg-slate-50 dark:bg-slate-950/80 rounded-lg border border-slate-200/60 dark:border-slate-800 p-2 sm:p-2.5 font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto max-h-60 sm:max-h-80 overflow-y-auto">
        {displayLines.length > 0 ? (
          <div className="divide-y divide-slate-200/40 dark:divide-slate-800/40">
            {displayLines.map((line, idx) => {
              const eq = line.indexOf('=');
              return (
                <div key={idx} className="py-0.5 flex items-baseline gap-1.5 sm:gap-2">
                  <span className="text-slate-400 text-[9.5px] sm:text-[10px] select-none w-5 text-right flex-shrink-0">
                    {idx + 1}
                  </span>
                  {eq > 0 ? (
                    <div className="flex items-baseline gap-1 sm:gap-1.5 flex-1 min-w-0">
                      <span className="text-sky-700 dark:text-sky-300 font-medium truncate">
                        {line.slice(0, eq)}
                      </span>
                      <span className="text-slate-400 select-none">=</span>
                      <span className="text-emerald-700 dark:text-emerald-300 truncate">
                        {line.slice(eq + 1)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-600 dark:text-slate-300 truncate">{line}</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-2 italic text-xs">Gói dữ liệu trống</p>
        )}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-2 w-full text-xs font-semibold text-brand-primary dark:text-sky-400 inline-flex items-center justify-center gap-1 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Thu gọn</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Xem tất cả ({lines.length.toLocaleString('vi-VN')} dòng)</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
