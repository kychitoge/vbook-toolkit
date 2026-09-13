import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  ExternalLink,
  Globe,
  BookOpen,
  Volume2,
  Layers,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  Send,
  Radio,
} from 'lucide-react';
import { useToast } from '../components/Toast';

// Brand SVG Icons
const WindowsBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801" />
  </svg>
);

const AppleBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.61 1.34-.55.63-.99 1.68-.86 2.7.99.08 2-.46 2.54-1.19z" />
  </svg>
);

const AndroidBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.411 13.8559 8.127 12 8.127c-1.856 0-3.5908.284-5.1367.8227L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9974 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3433-4.1021-2.689-7.5743-6.1185-9.4396" />
  </svg>
);

const LinuxBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 0C8.5 0 7.2 2.8 7.2 6.1c0 .9.1 1.9.4 2.8C6 9.4 4.8 11 4.8 13.2c0 2.4 1.5 4.3 3.6 4.8-.4 1.4-.6 3.1-.6 4.8 0 .7.5 1.2 1.2 1.2h6c.7 0 1.2-.5 1.2-1.2 0-1.7-.2-3.4-.6-4.8 2.1-.5 3.6-2.4 3.6-4.8 0-2.2-1.2-3.8-2.8-4.3.3-.9.4-1.9.4-2.8C16.8 2.8 15.5 0 12.001 0z" />
  </svg>
);

export const DownloadPage: React.FC = () => {
  const { showToast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const ANDROID_BETA_URL =
    'https://drive.usercontent.google.com/download?id=0B_nwf0R3SE_QQmZvNVhQS1NFRVk&resourcekey=0-UwZVQcS5iAPnz6xedwbcbA&export=download&confirm=t';
  const ANDROID_LEGACY_URL =
    'https://raw.githubusercontent.com/Darkrai9x/vbook-settings/refs/heads/main/vBooks.apk';
  const IOS_TESTFLIGHT_URL = 'https://testflight.apple.com/join/YNPyNV1r';
  const IOS_IPA_URL =
    'https://drive.usercontent.google.com/download?id=1Ji0L__A-YvU9A3cAQE8pHSiTqSdjzW-F&export=download&confirm=t';
  const DESKTOP_RELEASES_URL = 'https://github.com/Darkrai9x/vbook-settings/releases';
  const TELEGRAM_URL = 'https://telegram.me/vbook_beta_up_tracker_chanhnh';
  const DISCORD_URL = 'https://discord.gg/yXFRdG4kJq';
  const OFFICIAL_SITE_URL = 'https://vbookapp.com/';

  const handleCopy = (e: React.MouseEvent, url: string, key: string, label: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    showToast(`Đã sao chép link ${label}`, 'success');
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const desktopPlatforms = [
    {
      os: 'Windows',
      ext: '.msi',
      desc: 'Windows 10 / 11 (64-bit)',
      IconComponent: WindowsBrandIcon,
      color: 'text-[#0078D4] bg-[#0078D4]/10 border-[#0078D4]/20',
      buttonClass: 'bg-[#0078D4] hover:bg-[#006abc] text-white shadow-md shadow-[#0078D4]/25',
    },
    {
      os: 'macOS',
      ext: '.dmg',
      desc: 'Apple Silicon & Intel',
      IconComponent: AppleBrandIcon,
      color: 'text-slate-900 dark:text-white bg-slate-200/70 dark:bg-slate-800 border-slate-300 dark:border-slate-700',
      buttonClass: 'bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-md shadow-slate-900/20 dark:shadow-white/10',
    },
    {
      os: 'Linux',
      ext: '.deb / .rpm',
      desc: 'Ubuntu, Debian, Fedora',
      IconComponent: LinuxBrandIcon,
      color: 'text-[#E95420] bg-[#E95420]/10 border-[#E95420]/20',
      buttonClass: 'bg-[#E95420] hover:bg-[#d44816] text-white shadow-md shadow-[#E95420]/25',
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Đa Định Dạng',
      desc: 'EPUB, MOBI, AZW3, FB2, PRC, TXT, CBZ, ZIP, PDF, DOCX.',
      color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60',
    },
    {
      icon: Volume2,
      title: 'Giọng Đọc & Dịch',
      desc: 'Đọc thành tiếng AI (TTS) và bộ dịch ngoại tuyến.',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60',
    },
    {
      icon: Layers,
      title: 'Kho Nguồn Mở Rộng',
      desc: 'Trình duyệt tích hợp, cài extension và tự động tìm chương.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      icon: Sparkles,
      title: 'Tùy Biến Trực Quan',
      desc: 'Font chữ tuyển chọn, ảnh nền đọc truyện, chế độ ban đêm.',
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-9 py-2">
      {/* 1. HERO HEADER */}
      <div className="text-center space-y-3 pt-2 pb-1">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
          <span>vBook - Đọc và tải truyện</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Tải Ứng Dụng vBook
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Đọc truyện đa nguồn, giọng đọc AI và tùy biến giao diện trên Di Động và Máy Tính.
        </p>

        {/* Global OTA Announcement Pill */}
        <div className="pt-1 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-[11px] sm:text-xs font-medium shadow-xs">
            <Radio className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 animate-pulse flex-shrink-0" />
            <span>
              <strong>OTA:</strong> Tính năng cập nhật tự động sẽ sớm được hỗ trợ.
            </span>
          </div>
        </div>
      </div>

      {/* 2. MOBILE APPS SECTION (ANDROID & IOS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Thiết Bị Di Động
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Android & iOS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Android */}
          <div className="group relative rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-xs">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 flex-shrink-0">
                    <AndroidBrandIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                        Android
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                        Bản Mới Nhất
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Hỗ trợ Android 7.0 trở lên
                    </p>
                  </div>
                </div>

                {/* Quick Copy Link */}
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, ANDROID_BETA_URL, 'apk_beta', 'APK Beta')}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Sao chép liên kết tải APK"
                >
                  {copiedKey === 'apk_beta' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Actions Area */}
            <div className="space-y-3 pt-6">
              <a
                href={ANDROID_BETA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 active:scale-[0.98] transition-all"
              >
                <Download className="w-5 h-5" />
                <span>Tải APK Beta (.apk)</span>
              </a>

              {/* Sub-action: Bản cũ ổn định */}
              <div className="flex items-center justify-between pt-1 px-1 text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Bản cũ ổn định:</span>
                </span>
                <a
                  href={ANDROID_LEGACY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-sky-300 font-medium flex items-center gap-1 hover:underline"
                >
                  <span>vBooks.apk (Ngừng hỗ trợ)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Card iOS */}
          <div className="group relative rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-sky-500/50 transition-all shadow-xs">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-600/20 flex-shrink-0">
                    <AppleBrandIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                        iOS (Apple)
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300">
                        TestFlight
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      iPhone & iPad • iOS 14.0+
                    </p>
                  </div>
                </div>

                {/* Quick Copy Link */}
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, IOS_TESTFLIGHT_URL, 'ios_tf', 'link TestFlight')}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Sao chép liên kết TestFlight"
                >
                  {copiedKey === 'ios_tf' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Actions Area */}
            <div className="space-y-3 pt-6">
              <a
                href={IOS_TESTFLIGHT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-600/25 hover:shadow-lg hover:shadow-sky-600/35 active:scale-[0.98] transition-all"
              >
                <AppleBrandIcon className="w-5 h-5" />
                <span>Cài qua Apple TestFlight</span>
              </a>

              {/* Sub-action: Sideload IPA */}
              <div className="flex items-center justify-between pt-1 px-1 text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sideload độc lập:</span>
                </span>
                <a
                  href={IOS_IPA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-sky-300 font-medium flex items-center gap-1 hover:underline"
                >
                  <span>Tải file .ipa</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DESKTOP APPS SECTION */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Phiên Bản Máy Tính (Desktop)
            </span>
          </div>
          <a
            href={DESKTOP_RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-primary hover:text-brand-dark dark:hover:text-sky-300 font-semibold flex items-center gap-1 hover:underline"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 3 Cột Tải Nền Tảng Riêng Biệt với Visual Cực Mạnh */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {desktopPlatforms.map((item) => {
            const Icon = item.IconComponent;
            return (
              <div
                key={item.os}
                className="group rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-slate-400 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-5 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.ext}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {item.os}
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <a
                  href={DESKTOP_RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all ${item.buttonClass}`}
                >
                  <Download className="w-4 h-4" />
                  <span>Tải {item.os} ({item.ext})</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. FEATURES STRIP */}
      <div className="space-y-3 pt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-0.5">
          Tính Năng
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 space-y-2"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed mt-0.5">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. FOOTER COMMUNITY CHANNELS */}
      <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800/70 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 flex items-center justify-between text-slate-600 dark:text-slate-400 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Send className="w-3.5 h-3.5 text-[#229ED9]" />
            <span className="font-medium text-slate-800 dark:text-slate-200">Telegram Tracker</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 flex items-center justify-between text-slate-600 dark:text-slate-400 transition-colors"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-medium text-slate-800 dark:text-slate-200">Discord Hỗ Trợ</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        <a
          href={OFFICIAL_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 flex items-center justify-between text-slate-600 dark:text-slate-400 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-brand-primary" />
            <span className="font-medium text-slate-800 dark:text-slate-200">Trang chủ vbookapp.com</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>
    </div>
  );
};
