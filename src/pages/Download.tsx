import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Apple,
  Send,
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
} from 'lucide-react';
import { useToast } from '../components/Toast';

export const DownloadPage: React.FC = () => {
  const { showToast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const ANDROID_BETA_URL =
    'https://drive.usercontent.google.com/download?id=0B_nwf0R3SE_QQmZvNVhQS1NFRVk&resourcekey=0-UwZVQcS5iAPnz6xedwbcbA&export=download&confirm=t';
  const ANDROID_LEGACY_URL =
    'https://raw.githubusercontent.com/Darkrai9x/vbook-settings/refs/heads/main/vBooks.apk';
  const IOS_IPA_URL =
    'https://drive.usercontent.google.com/download?id=1Ji0L__A-YvU9A3cAQE8pHSiTqSdjzW-F&export=download&confirm=t';
  const TELEGRAM_URL = 'https://telegram.me/vbook_beta_up_tracker_chanhnh';
  const DISCORD_URL = 'https://discord.gg/yXFRdG4kJq';
  const OFFICIAL_SITE_URL = 'https://vbookapp.com/';

  const handleCopy = (url: string, key: string, label: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    showToast(`Đã sao chép liên kết ${label}`, 'success');
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Đọc Đa Định Dạng',
      desc: 'Hỗ trợ EPUB, MOBI, AZW3, FB2, PRC, TXT, CBZ, ZIP, PDF, DOCX và nhiều định dạng sách phổ biến.',
      color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60',
    },
    {
      icon: Volume2,
      title: 'Giọng Đọc AI & Dịch',
      desc: 'Tích hợp đọc thành tiếng (TTS) tự nhiên và bộ công cụ dịch ngoại tuyến nhanh chóng ngay trên trang sách.',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60',
    },
    {
      icon: Layers,
      title: 'Nguồn Truyện Mở Rộng',
      desc: 'Trình duyệt tích hợp sẵn, dễ dàng cài đặt extension nguồn truyện và tự động theo dõi chương mới.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      icon: Sparkles,
      title: 'Tùy Biến Trực Quan',
      desc: 'Điều chỉnh linh hoạt font chữ, kích cỡ, màu nền, hình nền đọc sách và chế độ ban đêm bảo vệ mắt.',
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* 1. HERO SECTION */}
      <div className="text-center space-y-3 pt-2 pb-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 text-brand-dark dark:text-sky-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>vBook — Ứng dụng đọc truyện & quản lý thư viện cá nhân</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Tải Ứng Dụng vBook
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Trải nghiệm đọc sách mượt mà, hỗ trợ đa nguồn, giọng đọc AI và khả năng cá nhân hóa giao diện mạnh mẽ.
        </p>
      </div>

      {/* 2. CÁC NÚT TẢI CHÍNH (BẢN BETA MỚI NHẤT) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Android APK (Beta) */}
        <div className="card-flat p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-brand-primary/50 transition-all bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-sky-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Android APK</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full">
                    Bản mới nhất
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Bản Beta cập nhật thường xuyên</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <a
                href={ANDROID_BETA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 py-2.5 px-4 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Tải APK Beta (.apk)</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(ANDROID_BETA_URL, 'apk_beta', 'Android APK')}
                className="btn-secondary p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                title="Sao chép liên kết tải APK"
              >
                {copiedKey === 'apk_beta' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Hỗ trợ Android 7.0 trở lên</span>
              <span className="font-mono text-[10px]">Tải trực tiếp</span>
            </div>
          </div>
        </div>

        {/* iOS IPA (Beta) */}
        <div className="card-flat p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-400 dark:hover:border-slate-600 transition-all bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-sm flex-shrink-0 border border-slate-700">
                <Apple className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">iOS IPA</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full">
                    Sideload
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">File cài đặt iPhone / iPad (.ipa)</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <a
                href={IOS_IPA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white flex-1 py-2.5 px-4 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Tải IPA Beta (.ipa)</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(IOS_IPA_URL, 'ios_ipa', 'iOS IPA')}
                className="btn-secondary p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                title="Sao chép liên kết tải IPA"
              >
                {copiedKey === 'ios_ipa' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Cài qua TrollStore, AltStore, Scarlet...</span>
              <span>iOS 14.0+</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BẢN CŨ ỔN ĐỊNH (STABLE LEGACY) */}
      <div className="card-flat p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Bản Cũ (Bản Ổn Định)</h4>
              <span className="text-[10px] px-2 py-0.2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded font-medium">
                vBook App.apk
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Phiên bản cũ, ổn định, đã ngừng support
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={ANDROID_LEGACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary py-2 px-3.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Bản Ổn Định</span>
          </a>
          <button
            type="button"
            onClick={() => handleCopy(ANDROID_LEGACY_URL, 'legacy_apk', 'Bản Ổn Định')}
            className="btn-secondary p-2 rounded-xl text-slate-600 dark:text-slate-300"
            title="Sao chép link tải bản ổn định"
          >
            {copiedKey === 'legacy_apk' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* 4. TÍNH NĂNG NỔI BẬT (FEATURES GRID) */}
      <div className="space-y-3.5">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Tính Năng Nổi Bật
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="card-flat p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${feat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {feat.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-1">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. CỘNG ĐỒNG & KÊNH CHÍNH THỨC */}
      <div className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Kênh Cập Nhật & Cộng Đồng
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Telegram Tracker */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-flat p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-[#229ED9]/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#229ED9]/10 text-[#229ED9] flex items-center justify-center flex-shrink-0">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#229ED9] transition-colors">
                  Telegram Tracker
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Theo dõi thông báo bản cập nhật tự động
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#229ED9] transition-colors flex-shrink-0" />
          </a>

          {/* Discord Community */}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-flat p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-indigo-500/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Hỗ trợ tại Discord
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Hỗ trợ cài đặt, thảo luận & giải đáp
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0" />
          </a>
        </div>

        {/* Website Gốc Chính Thức */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <Globe className="w-4 h-4 text-brand-primary flex-shrink-0" />
            <span className="text-slate-600 dark:text-slate-400 truncate">
              Trang web gốc chính thức của ứng dụng vBook:
            </span>
          </div>
          <a
            href={OFFICIAL_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:text-brand-dark dark:hover:text-sky-300 font-bold flex items-center gap-1 flex-shrink-0 hover:underline"
          >
            <span>vbookapp.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
