import React, { useState, useRef, useEffect } from 'react';
import {
  FONTS_DATA,
  DEFAULT_SYSTEM_FONT,
  BACKGROUNDS_DATA,
  BackgroundItem,
  getFontCdnUrl,
  DEFAULT_SAMPLE_TEXT,
} from '../config/fontPreviewAssets';
import { useFontFaceLoader } from '../hooks/useFontFaceLoader';
import { ReadingSandbox } from '../components/font-preview/ReadingSandbox';
import { FontSelector } from '../components/font-preview/FontSelector';
import { BackgroundSelector } from '../components/font-preview/BackgroundSelector';
import { TypographyControls } from '../components/font-preview/TypographyControls';
import { useToast } from '../components/Toast';
import {
  Download,
  Type,
  Image as ImageIcon,
  Sliders,
  ExternalLink,
  RotateCcw,
  X,
  ChevronUp,
} from 'lucide-react';

interface FontPreviewPreferences {
  activeFontId?: string;
  activeBgId?: string | null;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  overlayOpacity?: number;
  textColor?: string;
  bgColor?: string;
  sampleText?: string;
}

const STORAGE_KEY = 'vbook_font_preview_prefs';

const loadSavedPreferences = (): Partial<FontPreviewPreferences> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.warn('Failed to load font preview preferences', e);
  }
  return {};
};

export const FontPreviewPage: React.FC = () => {
  const { showToast } = useToast();
  const initialPrefs = useRef(loadSavedPreferences()).current;

  // Initial font setup (mặc định là font hệ thống/web để load nhanh)
  const initialFont =
    (initialPrefs.activeFontId && FONTS_DATA.find((f) => f.id === initialPrefs.activeFontId)) ||
    DEFAULT_SYSTEM_FONT;

  // Font loader hook
  const {
    activeFont,
    setActiveFont,
    isLoading: isFontLoading,
    error: fontError,
    loadCustomFontFile,
    customFonts,
  } = useFontFaceLoader(initialFont);

  // Background states (mặc định là null / Nền đơn sắc để load trang tức thì)
  const getInitialBg = (): BackgroundItem | null => {
    if (!initialPrefs.activeBgId) return null;
    const found = BACKGROUNDS_DATA.find((b) => b.id === initialPrefs.activeBgId);
    return found || null;
  };

  const [activeBg, setActiveBg] = useState<BackgroundItem | null>(getInitialBg);
  const [customBackgrounds, setCustomBackgrounds] = useState<BackgroundItem[]>([]);

  // Reader typography & color states (mặc định overlayOpacity = 0 vì vbook không có lớp phủ nền)
  const [fontSize, setFontSize] = useState<number>(initialPrefs.fontSize ?? 18);
  const [lineHeight, setLineHeight] = useState<number>(initialPrefs.lineHeight ?? 1.8);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>(
    initialPrefs.textAlign ?? 'justify'
  );
  const [overlayOpacity, setOverlayOpacity] = useState<number>(initialPrefs.overlayOpacity ?? 0);
  const [textColor, setTextColor] = useState<string>(initialPrefs.textColor ?? '#1e293b');
  const [bgColor, setBgColor] = useState<string>(initialPrefs.bgColor ?? '#f8fafc');
  const [sampleText, setSampleText] = useState<string>(
    initialPrefs.sampleText ?? DEFAULT_SAMPLE_TEXT
  );

  // Lưu cài đặt vào localStorage
  useEffect(() => {
    try {
      const prefs: FontPreviewPreferences = {
        activeFontId: activeFont.isCustom ? undefined : activeFont.id,
        activeBgId: activeBg ? (activeBg.isCustom ? undefined : activeBg.id) : null,
        fontSize,
        lineHeight,
        textAlign,
        overlayOpacity,
        textColor,
        bgColor,
        sampleText: sampleText === DEFAULT_SAMPLE_TEXT ? undefined : sampleText,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Bỏ qua lỗi quota/storage nếu có
    }
  }, [
    activeFont,
    activeBg,
    fontSize,
    lineHeight,
    textAlign,
    overlayOpacity,
    textColor,
    bgColor,
    sampleText,
  ]);

  // UI Control Panel Tab State
  const [activeTab, setActiveTab] = useState<'fonts' | 'backgrounds' | 'typography'>('fonts');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Xử lý nạp ảnh nền cá nhân
  const handleUploadCustomBg = (file: File) => {
    try {
      const blobUrl = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '').trim();
      const newCustomBg: BackgroundItem = {
        id: `custom-bg-${Date.now()}`,
        name: cleanName,
        filename: file.name,
        thumbnailUrl: blobUrl,
        fullUrl: blobUrl,
        isCustom: true,
        customBlobUrl: blobUrl,
      };

      setCustomBackgrounds((prev) => [newCustomBg, ...prev]);
      setActiveBg(newCustomBg);
      showToast(`Đã nạp ảnh: ${cleanName}`, 'success');
    } catch {
      showToast('Không thể đọc file ảnh nền', 'error');
    }
  };

  // Xử lý nạp font cá nhân
  const handleUploadCustomFont = async (file: File) => {
    const loaded = await loadCustomFontFile(file);
    if (loaded) {
      showToast(`Đã nạp font: ${loaded.name}`, 'success');
    } else {
      showToast('Lỗi khi nạp file font', 'error');
    }
  };

  // 1-Click Download Font
  const handleDownloadActiveFont = () => {
    if (!activeFont.filename) {
      showToast('Đang dùng font mặc định của hệ thống', 'info');
      return;
    }
    const downloadUrl =
      activeFont.isCustom && activeFont.customBlobUrl
        ? activeFont.customBlobUrl
        : getFontCdnUrl(activeFont.filename);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = activeFont.filename;
    a.target = '_blank';
    a.click();
    showToast(`Đang tải font: ${activeFont.name}`, 'success');
  };

  // 1-Click Download Background
  const handleDownloadActiveBg = () => {
    if (!activeBg) {
      showToast('Chưa chọn ảnh nền', 'info');
      return;
    }
    const downloadUrl =
      activeBg.isCustom && activeBg.customBlobUrl ? activeBg.customBlobUrl : activeBg.fullUrl;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = activeBg.filename;
    a.target = '_blank';
    a.click();
    showToast(`Đang tải ảnh nền: ${activeBg.name}`, 'success');
  };

  // Reset to default settings
  const handleResetSettings = () => {
    setFontSize(18);
    setLineHeight(1.8);
    setTextAlign('justify');
    setOverlayOpacity(0);
    setTextColor('#1e293b');
    setBgColor('#f8fafc');
    setSampleText(DEFAULT_SAMPLE_TEXT);
    setActiveFont(DEFAULT_SYSTEM_FONT);
    setActiveBg(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    showToast('Đã khôi phục mặc định', 'info');
  };

  // Render chung cho các Tabs điều khiển
  const renderTabContent = () => {
    switch (activeTab) {
      case 'fonts':
        return (
          <FontSelector
            fonts={FONTS_DATA}
            customFonts={customFonts}
            activeFont={activeFont}
            onSelectFont={setActiveFont}
            onUploadCustomFont={handleUploadCustomFont}
          />
        );
      case 'backgrounds':
        return (
          <BackgroundSelector
            backgrounds={BACKGROUNDS_DATA}
            customBackgrounds={customBackgrounds}
            activeBg={activeBg}
            onSelectBg={setActiveBg}
            onUploadCustomBg={handleUploadCustomBg}
          />
        );
      case 'typography':
        return (
          <TypographyControls
            fontSize={fontSize}
            setFontSize={setFontSize}
            lineHeight={lineHeight}
            setLineHeight={setLineHeight}
            textAlign={textAlign}
            setTextAlign={setTextAlign}
            overlayOpacity={overlayOpacity}
            setOverlayOpacity={setOverlayOpacity}
            textColor={textColor}
            setTextColor={setTextColor}
            bgColor={bgColor}
            setBgColor={setBgColor}
            hasBackground={activeBg !== null}
          />
        );
    }
  };

  const renderTabButtons = () => (
    <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
      <button
        type="button"
        onClick={() => setActiveTab('fonts')}
        className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
          activeTab === 'fonts'
            ? 'bg-white dark:bg-slate-900 text-brand-dark dark:text-sky-300 shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <Type className="w-3.5 h-3.5" />
        <span>Font chữ</span>
      </button>

      <button
        type="button"
        onClick={() => setActiveTab('backgrounds')}
        className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
          activeTab === 'backgrounds'
            ? 'bg-white dark:bg-slate-900 text-brand-dark dark:text-sky-300 shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <ImageIcon className="w-3.5 h-3.5" />
        <span>Hình nền</span>
      </button>

      <button
        type="button"
        onClick={() => setActiveTab('typography')}
        className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
          activeTab === 'typography'
            ? 'bg-white dark:bg-slate-900 text-brand-dark dark:text-sky-300 shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <Sliders className="w-3.5 h-3.5" />
        <span>Tùy chỉnh</span>
      </button>
    </div>
  );

  return (
    <div className="space-y-4 py-2">
      {/* 1. TOP TOOLBAR */}
      <div className="card-flat p-3.5 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        {/* Title & Description */}
        <div className="space-y-0.5">
          <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Thử Font & Hình Nền
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Xem trước trực quan font chữ và hình nền đọc truyện
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Nút Tải Font */}
          <button
            type="button"
            onClick={handleDownloadActiveFont}
            disabled={!activeFont.filename}
            className={`flex-1 sm:flex-none py-2 px-3.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeFont.filename
                ? 'btn-primary shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 cursor-not-allowed'
            }`}
            title={activeFont.filename ? `Tải file ${activeFont.filename}` : 'Đang dùng font mặc định của hệ thống'}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Font</span>
          </button>

          {/* Nút Tải Nền */}
          <button
            type="button"
            onClick={handleDownloadActiveBg}
            disabled={!activeBg}
            className={`flex-1 sm:flex-none py-2 px-3.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeBg
                ? 'btn-secondary shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 cursor-not-allowed'
            }`}
            title={activeBg ? `Tải ảnh ${activeBg.filename}` : 'Chưa chọn ảnh nền'}
          >
            <ImageIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Tải Nền</span>
          </button>

          {/* Nút Khôi phục mặc định */}
          <button
            type="button"
            onClick={handleResetSettings}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Khôi phục cài đặt mặc định"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Nguồn Google Drive Credit */}
          <a
            href="https://drive.google.com/drive/folders/1sZrmJYPV6Jw69w31dG2NyY6S8SYnbrX4"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
            title="Thư mục Google Drive nguồn chia sẻ của cộng đồng"
          >
            <span className="hidden sm:inline text-[11px]">Drive Nguồn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Font error warning banner if any */}
      {fontError && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between gap-2">
          <span>{fontError}</span>
        </div>
      )}

      {/* 2. MAIN CONTENT (2-COLUMN RESPONSIVE LAYOUT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: READING SANDBOX */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
          <ReadingSandbox
            activeFont={activeFont}
            activeBg={activeBg}
            fontSize={fontSize}
            lineHeight={lineHeight}
            textAlign={textAlign}
            overlayOpacity={overlayOpacity}
            textColor={textColor}
            bgColor={bgColor}
            sampleText={sampleText}
            setSampleText={setSampleText}
            isFontLoading={isFontLoading}
            onResetText={() => setSampleText(DEFAULT_SAMPLE_TEXT)}
          />

          {/* Mobile Bottom Bar Trigger Button */}
          <div className="lg:hidden mt-3">
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Sliders className="w-4 h-4" />
              <span>Tùy chỉnh Font, Nền & Thông số</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTROL PANEL */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4 space-y-3">
          <div className="card-flat p-4 space-y-4">
            {renderTabButtons()}
            <div>{renderTabContent()}</div>
          </div>
        </div>
      </div>

      {/* 3. MOBILE BOTTOM SHEET DRAWER */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div
            className="w-full max-h-[85vh] bg-white dark:bg-slate-900 rounded-t-2xl border-t border-slate-200 dark:border-slate-800 p-4 shadow-2xl flex flex-col space-y-3.5 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-primary" />
                <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  Bảng Điều Khiển
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Tabs */}
            {renderTabButtons()}

            {/* Mobile Tab Content Scrollable */}
            <div className="flex-1 overflow-y-auto max-h-[50vh] pr-1 custom-scrollbar">
              {renderTabContent()}
            </div>

            {/* Bottom Close Button */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-full py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
