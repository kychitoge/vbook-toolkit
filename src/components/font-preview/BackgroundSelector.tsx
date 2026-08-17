import React, { useRef } from 'react';
import { BackgroundItem } from '../../config/fontPreviewAssets';
import { Upload, Ban, Check } from 'lucide-react';

export interface BackgroundSelectorProps {
  backgrounds: BackgroundItem[];
  customBackgrounds: BackgroundItem[];
  activeBg: BackgroundItem | null;
  onSelectBg: (bg: BackgroundItem | null) => void;
  onUploadCustomBg: (file: File) => void;
}

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  backgrounds,
  customBackgrounds,
  activeBg,
  onSelectBg,
  onUploadCustomBg,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file hình ảnh (.jpg, .png, .webp, .jpeg)');
        return;
      }
      onUploadCustomBg(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const allBackgrounds = [...customBackgrounds, ...backgrounds];

  return (
    <div className="space-y-3">
      {/* Top Action Bar: Upload Local Image & Clear Image */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSelectBg(null)}
          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeBg === null
              ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Ban className="w-3.5 h-3.5" />
          <span>Nền đơn sắc</span>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0"
          title="Tải ảnh nền cá nhân từ thiết bị"
        >
          <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="hidden sm:inline">Nạp ảnh</span>
        </button>
      </div>

      {/* Background Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[380px] sm:max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
        {allBackgrounds.map((bg) => {
          const isActive = activeBg?.id === bg.id;
          const previewUrl = bg.isCustom && bg.customBlobUrl ? bg.customBlobUrl : bg.thumbnailUrl;

          return (
            <button
              key={bg.id}
              type="button"
              onClick={() => onSelectBg(bg)}
              className={`group relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all text-left ${
                isActive
                  ? 'border-brand-primary shadow-md scale-[1.02]'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
              }`}
            >
              {/* Background Thumbnail Image */}
              <img
                src={previewUrl}
                alt={bg.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay Gradient on Hover/Active */}
              <div
                className={`absolute inset-0 transition-opacity ${
                  isActive ? 'bg-brand-primary/25 opacity-100' : 'bg-black/20 opacity-0 group-hover:opacity-100'
                }`}
              />

              {/* Active Check Badge */}
              {isActive && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-primary text-white flex items-center justify-center shadow">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}

              {/* Title label at bottom */}
              <div className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/80 to-transparent text-[10px] font-medium text-white truncate text-center">
                {bg.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
