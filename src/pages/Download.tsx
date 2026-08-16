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
  const OFFICIAL_SITE_URL = 'https://vbookapp.com/';

  const handleCopy = (url: string, key: string, label: string) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(key);
    showToast(`Đã sao chép link ${label}`, 'success');
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2">
      {/* Tiêu đề trang tối giản */}
      <div className="text-center space-y-1.5 pb-2">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2">
          <Download className="w-6 h-6 text-brand-primary" />
          <span>Tải Ứng Dụng vBook</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Chọn phiên bản cài đặt phù hợp với thiết bị của bạn
        </p>
      </div>

      {/* 2 NÚT DOWNLOAD PILL CHÍNH */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nút Android APK Pill */}
        <div className="card-flat p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-3 hover:border-brand-primary/60 transition-all group bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-sky-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-slate-900 dark:text-slate-100">Android APK</span>
                <span className="text-[10px] font-bold px-2 py-0.2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full">
                  Khuyên dùng
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Bản Beta mới nhất</p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <a
              href={ANDROID_BETA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Tải APK Beta (.apk)</span>
            </a>
            <button
              type="button"
              onClick={() => handleCopy(ANDROID_BETA_URL, 'apk_beta', 'Android APK')}
              className="btn-secondary p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              title="Sao chép link tải APK"
            >
              {copiedKey === 'apk_beta' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <a
              href={ANDROID_LEGACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 dark:hover:text-slate-300 underline underline-offset-2"
            >
              Bản cũ (ngừng hỗ trợ)
            </a>
            <span>Android 7.0+</span>
          </div>
        </div>

        {/* Nút iOS IPA Pill */}
        <div className="card-flat p-4 sm:p-5 rounded-2xl flex flex-col justify-between space-y-3 hover:border-slate-400 transition-all group bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-sm flex-shrink-0 border border-slate-700">
              <Apple className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-slate-900 dark:text-slate-100">iOS IPA</span>
                <span className="text-[10px] font-bold px-2 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full">
                  Sideload
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">File cài đặt iPhone / iPad (.ipa)</p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <a
              href={IOS_IPA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Tải IPA Beta (.ipa)</span>
            </a>
            <button
              type="button"
              onClick={() => handleCopy(IOS_IPA_URL, 'ios_ipa', 'iOS IPA')}
              className="btn-secondary p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              title="Sao chép link tải IPA"
            >
              {copiedKey === 'ios_ipa' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>Cài qua TrollStore, AltStore, Scarlet...</span>
            <span>iOS 14.0+</span>
          </div>
        </div>
      </div>

      {/* FOOTER & CREDIT TRANG GỐC CHÍNH THỨC */}
      <div className="space-y-3">
        {/* Telegram Tracker & Discord */}
        <div className="card-flat p-3.5 bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-[#229ED9] flex-shrink-0" />
            <span>Theo dõi cập nhật:</span>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#229ED9] font-semibold hover:underline flex items-center gap-0.5"
            >
              <span>Telegram Tracker</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <a
            href="https://discord.gg/yXFRdG4kJq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Hỗ trợ tại Discord</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Credit Trang Gốc vBook Official */}
        <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 min-w-0">
            <Globe className="w-4 h-4 text-brand-primary flex-shrink-0" />
            <span className="truncate">
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
