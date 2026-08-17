import React from 'react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Pipette,
  Check,
} from 'lucide-react';

export interface TypographyControlsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  lineHeight: number;
  setLineHeight: (height: number) => void;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  setTextAlign: (align: 'left' | 'center' | 'right' | 'justify') => void;
  overlayOpacity: number;
  setOverlayOpacity: (opacity: number) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  hasBackground: boolean;
}

const textColorPresets = [
  { label: 'Đen than', color: '#1e293b' },
  { label: 'Trắng', color: '#f8fafc' },
  { label: 'Nâu cổ', color: '#433422' },
  { label: 'Xanh rêu', color: '#1a3328' },
  { label: 'Xám', color: '#64748b' },
  { label: 'Vàng hổ phách', color: '#d97706' },
];

const bgColorPresets = [
  { label: 'Trắng sáng', color: '#ffffff' },
  { label: 'Đen than', color: '#0f172a' },
  { label: 'Giấy cổ', color: '#fbf0d9' },
  { label: 'Xanh dịu', color: '#e8f5e9' },
  { label: 'Đen OLED', color: '#000000' },
  { label: 'Xám nhạt', color: '#f1f5f9' },
];

const comboPresets = [
  { name: 'Sáng', text: '#1e293b', bg: '#f8fafc' },
  { name: 'Tối', text: '#f1f5f9', bg: '#0f172a' },
  { name: 'Giấy cổ', text: '#433422', bg: '#fbf0d9' },
  { name: 'Dịu mắt', text: '#1a3328', bg: '#e8f5e9' },
  { name: 'OLED', text: '#e2e8f0', bg: '#000000' },
];

export const TypographyControls: React.FC<TypographyControlsProps> = ({
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  textAlign,
  setTextAlign,
  overlayOpacity,
  setOverlayOpacity,
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  hasBackground,
}) => {
  return (
    <div className="space-y-4 text-xs sm:text-sm">
      {/* 1. KHỐI ĐIỀU CHỈNH MÀU CHỮ & MÀU NỀN */}
      <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
            Điều chỉnh màu chữ và màu nền
          </span>
        </div>

        {/* 5 Combo Nhanh (Chia đều 5 cột, không bị tràn cuộn) */}
        <div className="grid grid-cols-5 gap-1">
          {comboPresets.map((combo) => {
            const isSelected =
              textColor.toLowerCase() === combo.text.toLowerCase() &&
              bgColor.toLowerCase() === combo.bg.toLowerCase();

            return (
              <button
                key={combo.name}
                type="button"
                onClick={() => {
                  setTextColor(combo.text);
                  setBgColor(combo.bg);
                }}
                className={`py-1.5 px-1 rounded-xl border flex flex-col sm:flex-row items-center justify-center gap-1 transition-all ${
                  isSelected
                    ? 'border-brand-primary bg-sky-50 dark:bg-sky-950/70 text-brand-dark dark:text-sky-300 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full border border-black/15 flex-shrink-0"
                  style={{ backgroundColor: combo.bg }}
                />
                <span className="text-[10.5px] leading-tight truncate">{combo.name}</span>
              </button>
            );
          })}
        </div>

        {/* Màu chữ (7 cột: 6 swatches + 1 color picker) */}
        <div className="space-y-1.5 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Màu chữ</span>
            <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
              {textColor}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {textColorPresets.map((p) => {
              const isSelected = textColor.toLowerCase() === p.color.toLowerCase();
              return (
                <button
                  key={p.color}
                  type="button"
                  onClick={() => setTextColor(p.color)}
                  className={`h-7 rounded-lg border transition-all flex items-center justify-center relative ${
                    isSelected
                      ? 'border-brand-primary ring-2 ring-brand-primary/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:scale-105'
                  }`}
                  style={{ backgroundColor: p.color }}
                  title={p.label}
                >
                  {isSelected && (
                    <Check className="w-3 h-3 text-white mix-blend-difference" />
                  )}
                </button>
              );
            })}

            {/* Custom Color Picker Button */}
            <label className="h-7 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-all relative" title="Chọn màu chữ tùy chỉnh">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
              />
              <Pipette className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            </label>
          </div>
        </div>

        {/* Màu nền (7 cột: 6 swatches + 1 color picker) */}
        <div className="space-y-1.5 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Màu nền</span>
            <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
              {bgColor}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {bgColorPresets.map((p) => {
              const isSelected = bgColor.toLowerCase() === p.color.toLowerCase();
              return (
                <button
                  key={p.color}
                  type="button"
                  onClick={() => setBgColor(p.color)}
                  className={`h-7 rounded-lg border transition-all flex items-center justify-center relative ${
                    isSelected
                      ? 'border-brand-primary ring-2 ring-brand-primary/40 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:scale-105'
                  }`}
                  style={{ backgroundColor: p.color }}
                  title={p.label}
                >
                  {isSelected && (
                    <Check className="w-3 h-3 text-white mix-blend-difference" />
                  )}
                </button>
              );
            })}

            {/* Custom Color Picker Button */}
            <label className="h-7 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-all relative" title="Chọn màu nền tùy chỉnh">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
              />
              <Pipette className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            </label>
          </div>
        </div>
      </div>

      {/* 2. CỠ CHỮ */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Cỡ chữ</span>
          <span className="font-mono text-brand-dark dark:text-sky-400 font-bold">{fontSize}px</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-mono text-slate-400">14</span>
          <input
            type="range"
            min={14}
            max={36}
            step={1}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="flex-1 accent-brand-primary h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] font-mono text-slate-400">36</span>
        </div>
      </div>

      {/* 3. CHIỀU CAO DÒNG */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Chiều cao dòng</span>
          <span className="font-mono text-brand-dark dark:text-sky-400 font-bold">{lineHeight.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-mono text-slate-400">1.4</span>
          <input
            type="range"
            min={1.4}
            max={2.8}
            step={0.1}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            className="flex-1 accent-brand-primary h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] font-mono text-slate-400">2.8</span>
        </div>
      </div>

      {/* 4. CĂN LỀ */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Căn lề</span>
        <div className="grid grid-cols-4 gap-1.5">
          <button
            type="button"
            onClick={() => setTextAlign('left')}
            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1 transition-all ${
              textAlign === 'left'
                ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Căn trái"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setTextAlign('center')}
            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1 transition-all ${
              textAlign === 'center'
                ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Căn giữa"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setTextAlign('right')}
            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1 transition-all ${
              textAlign === 'right'
                ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Căn phải"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setTextAlign('justify')}
            className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1 transition-all ${
              textAlign === 'justify'
                ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Căn đều hai bên"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. LỚP PHỦ NỀN */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Lớp phủ nền
          </span>
          <span className="font-mono text-brand-dark dark:text-sky-400 font-bold">{overlayOpacity}%</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-mono text-slate-400">0%</span>
          <input
            type="range"
            min={0}
            max={90}
            step={5}
            disabled={!hasBackground}
            value={overlayOpacity}
            onChange={(e) => setOverlayOpacity(Number(e.target.value))}
            className={`flex-1 accent-brand-primary h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer ${
              !hasBackground ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          />
          <span className="text-[11px] font-mono text-slate-400">90%</span>
        </div>
        {!hasBackground && (
          <p className="text-[11px] text-slate-400 italic">
            * Chọn một ảnh nền để kích hoạt lớp phủ.
          </p>
        )}
      </div>
    </div>
  );
};
