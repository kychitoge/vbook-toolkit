import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  Palette,
  BookOpen,
  Download,
  Code2,
  Boxes,
  Layers,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { TOOLS_CONFIG, CATEGORY_GROUPS, ToolItem } from '../config/tools';
import { useToast } from '../components/Toast';

const iconMap = {
  HeartHandshake,
  Palette,
  BookOpen,
  Download,
  Code2,
  Boxes,
  Layers,
};

export const Home: React.FC = () => {
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sao chép link rút gọn chưa direct (vd: https://domain/hdsd)
  const handleCopyShortLink = (e: React.MouseEvent, tool: ToolItem) => {
    e.preventDefault();
    e.stopPropagation();
    const shortUrl = `${window.location.origin}${tool.route}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(tool.id);
    showToast(`Đã sao chép link: ${tool.route}`, 'success');
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-8 py-2">
      {/* 1. HERO SECTION PHIÊN BẢN 1 — KHÔNG CARD, KHÔNG MÀU NỀN */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-2">
        <div className="flex items-center justify-center">
          <img
            src="/icon-64.png"
            alt="vBook Logo"
            className="w-14 h-14 rounded-2xl shadow-sm object-contain"
          />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            vBook Toolkit
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
            Bộ công cụ tiện ích tập trung dành cho cộng đồng vBook
          </p>
        </div>

        {/* 2 Nút CTA chính */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <Link
            to="/download"
            className="btn-primary py-2.5 px-5 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Tải vBook</span>
          </Link>
          <Link
            to="/premium"
            className="btn-secondary py-2.5 px-5 text-xs font-semibold rounded-xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Nâng Premium</span>
          </Link>
        </div>
      </div>

      {/* 2. DANH SÁCH CÔNG CỤ PHÂN CHIA THÀNH 3 NHÓM CHÍNH */}
      <div className="space-y-8">
        {CATEGORY_GROUPS.map((group) => {
          const groupTools = TOOLS_CONFIG.filter((t) => t.category === group.id);

          return (
            <div key={group.id} className="space-y-3">
              {/* Tiêu đề nhóm */}
              <div className="border-b border-slate-200/80 dark:border-slate-800 pb-2 flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  {group.title}
                </h2>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {groupTools.length} mục
                </span>
              </div>

              {/* Lưới công cụ của nhóm */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {groupTools.map((tool: ToolItem) => {
                  const IconComponent = iconMap[tool.iconName] || Code2;
                  const isCopied = copiedId === tool.id;

                  const CardContent = (
                    <div className="card-flat group p-3.5 h-full flex flex-col justify-between cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-brand-tint group-hover:text-brand-dark group-hover:border-brand-primary/40 dark:group-hover:bg-sky-950/50 dark:group-hover:text-sky-300 transition-colors flex-shrink-0 mt-0.5">
                          <IconComponent className="w-4 h-4" />
                        </div>

                        {/* 3 Dòng nội dung */}
                        <div className="flex-1 min-w-0">
                          {/* Dòng 1: Tên & Action Buttons */}
                          <div className="flex items-center justify-between gap-1">
                            <h3 className="font-semibold text-[13.5px] text-slate-900 dark:text-slate-100 group-hover:text-brand-dark dark:group-hover:text-sky-400 transition-colors truncate">
                              {tool.title}
                            </h3>

                            <div className="flex items-center gap-1 flex-shrink-0">
                              {/* Nút copy link rút gọn cho các trang redirect (hdsd, qt, extension) */}
                              {tool.isExternal && (
                                <button
                                  type="button"
                                  onClick={(e) => handleCopyShortLink(e, tool)}
                                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                  title={`Sao chép link rút gọn ${tool.route}`}
                                >
                                  {isCopied ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              )}

                              {tool.isExternal ? (
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 flex-shrink-0" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                              )}
                            </div>
                          </div>

                          {/* Dòng 2: Tác giả + ChipTag */}
                          <div className="flex items-center gap-1.5 mt-1 text-[11.5px] text-slate-500 dark:text-slate-400">
                            <span>{tool.author}</span>
                            <span>·</span>
                            <span className="chip-tag text-[10px] py-0 px-1.5">
                              {tool.tag}
                            </span>
                          </div>

                          {/* Dòng 3: Mô tả */}
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );

                  if (tool.isExternal && tool.externalUrl) {
                    return (
                      <a
                        key={tool.id}
                        href={tool.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block no-underline"
                      >
                        {CardContent}
                      </a>
                    );
                  }

                  return (
                    <Link key={tool.id} to={tool.route} className="block no-underline">
                      {CardContent}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
