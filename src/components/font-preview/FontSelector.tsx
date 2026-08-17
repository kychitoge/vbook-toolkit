import React, { useState, useMemo, useRef } from 'react';
import { FontItem } from '../../config/fontPreviewAssets';
import { Search, Upload, Check, Type, Sparkles } from 'lucide-react';

export interface FontSelectorProps {
  fonts: FontItem[];
  customFonts: FontItem[];
  activeFont: FontItem;
  onSelectFont: (font: FontItem) => void;
  onUploadCustomFont: (file: File) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  fonts,
  customFonts,
  activeFont,
  onSelectFont,
  onUploadCustomFont,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'serif' | 'sans' | 'display' | 'custom'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gộp font hệ thống và font cá nhân
  const allFonts = useMemo(() => {
    return [...customFonts, ...fonts];
  }, [customFonts, fonts]);

  // Bộ lọc tìm kiếm & category
  const filteredFonts = useMemo(() => {
    return allFonts.filter((font) => {
      const matchSearch =
        font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        font.filename.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (activeCategory === 'all') return true;
      if (activeCategory === 'custom') return font.isCustom;
      return font.category === activeCategory && !font.isCustom;
    });
  }, [allFonts, searchQuery, activeCategory]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.match(/\.(ttf|otf|woff|woff2)$/i)) {
        alert('Vui lòng chọn định dạng file font .ttf, .otf, .woff hoặc .woff2');
        return;
      }
      onUploadCustomFont(file);
      setActiveCategory('custom');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Bar & Custom Upload */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm font chữ..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>

        {/* Upload Custom Font Button */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".ttf,.otf,.woff,.woff2"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0"
          title="Tải font chữ cá nhân (.ttf, .otf) từ thiết bị"
        >
          <Upload className="w-3.5 h-3.5 text-brand-primary" />
          <span className="hidden sm:inline">Nạp font</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeCategory === 'all'
              ? 'bg-brand-primary text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Tất cả ({allFonts.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('serif')}
          className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeCategory === 'serif'
              ? 'bg-brand-primary text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Serif
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('sans')}
          className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeCategory === 'sans'
              ? 'bg-brand-primary text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Sans-serif
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('display')}
          className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeCategory === 'display'
              ? 'bg-brand-primary text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Display
        </button>
        {customFonts.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveCategory('custom')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeCategory === 'custom'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Cá nhân ({customFonts.length})</span>
          </button>
        )}
      </div>

      {/* Font List Scrollable */}
      <div className="space-y-1.5 max-h-[380px] sm:max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
        {filteredFonts.length === 0 ? (
          <div className="p-6 text-center text-slate-400 dark:text-slate-500 text-xs">
            Không tìm thấy font nào phù hợp.
          </div>
        ) : (
          filteredFonts.map((font) => {
            const isActive = activeFont.id === font.id;

            return (
              <button
                key={font.id}
                type="button"
                onClick={() => onSelectFont(font)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-sky-50 dark:bg-sky-950/40 border-brand-primary/60 text-brand-dark dark:text-sky-300 shadow-xs'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs flex-shrink-0 font-bold ${
                      isActive
                        ? 'bg-brand-primary text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                    }`}
                  >
                    <Type className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-[13px] font-semibold truncate flex items-center gap-1.5">
                      <span>{font.name}</span>
                      {font.isCustom && (
                        <span className="text-[10px] px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-normal">
                          Cá nhân
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                      {font.filename}
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div className="w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
