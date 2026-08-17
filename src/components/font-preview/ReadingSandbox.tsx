import React from 'react';
import { FontItem, BackgroundItem } from '../../config/fontPreviewAssets';
import { Loader2, Edit3, RotateCcw } from 'lucide-react';

export interface ReadingSandboxProps {
  activeFont: FontItem;
  activeBg: BackgroundItem | null;
  fontSize: number;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  overlayOpacity: number;
  textColor: string;
  bgColor: string;
  sampleText: string;
  setSampleText: (text: string) => void;
  isFontLoading: boolean;
  onResetText: () => void;
}

export const ReadingSandbox: React.FC<ReadingSandboxProps> = ({
  activeFont,
  activeBg,
  fontSize,
  lineHeight,
  textAlign,
  overlayOpacity,
  textColor,
  bgColor,
  sampleText,
  setSampleText,
  isFontLoading,
  onResetText,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const bgUrl = activeBg ? (activeBg.isCustom && activeBg.customBlobUrl ? activeBg.customBlobUrl : activeBg.fullUrl) : undefined;

  return (
    <div className="relative w-full h-full min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col transition-colors">
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
        style={{
          backgroundColor: bgColor,
          backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
        }}
      />

      {/* Customizable Overlay Opacity Layer */}
      {bgUrl && (
        <div
          className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
          style={{
            backgroundColor: bgColor,
            opacity: overlayOpacity / 100,
          }}
        />
      )}

      {/* Loading Indicator */}
      {isFontLoading && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs backdrop-blur-sm shadow">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
          <span>Đang nạp font...</span>
        </div>
      )}

      {/* Top Status Bar */}
      <div className="relative z-10 p-3 sm:p-3.5 flex items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 backdrop-blur-[2px]">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="px-2.5 py-0.5 rounded-md font-medium bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 border border-black/5 dark:border-white/10 backdrop-blur-md">
            Font: <span className="font-semibold text-brand-dark dark:text-sky-400">{activeFont.name}</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-md font-medium bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 border border-black/5 dark:border-white/10 backdrop-blur-md">
            Nền: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{activeBg ? activeBg.name : 'Đơn sắc'}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 border border-black/5 dark:border-white/10 flex items-center gap-1 transition-all"
            title="Nhập văn bản tùy chỉnh"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Đóng' : 'Sửa văn bản'}</span>
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onResetText}
              className="p-1 rounded-lg text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border border-black/5 dark:border-white/10 transition-all"
              title="Về văn bản mẫu ban đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Reader Content Body */}
      <div className="relative z-10 flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto max-h-[70vh] custom-scrollbar">
        {isEditing ? (
          <textarea
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="w-full h-full min-h-[300px] p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-brand-primary outline-none resize-none backdrop-blur-md"
            placeholder="Nhập hoặc dán đoạn văn bản cần thử nghiệm tại đây..."
          />
        ) : (
          <div
            className="transition-all duration-200 whitespace-pre-line select-text"
            style={{
              fontFamily: activeFont.family ? `"${activeFont.family}", serif` : 'inherit',
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              textAlign: textAlign,
              color: textColor,
            }}
          >
            {sampleText}
          </div>
        )}
      </div>
    </div>
  );
};
