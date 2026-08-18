import React, { useState } from 'react';
import {
  Download, Clipboard, X, Search,
  Loader2, FileArchive, FileText, Copy, Check,
  AlertCircle, FolderDown,
} from 'lucide-react';
import {
  extractNames, ExtractResult, ScrapeProgress,
  downloadZipFile, downloadTextFile, makeSafeFilename,
} from '../engine/getNames';
import { SupportedSitesStrip } from '../components/get-name/SupportedSitesStrip';
import { NamePackageCard } from '../components/get-name/NamePackageCard';
import { useToast } from '../components/Toast';

export const GetNamePage: React.FC = () => {
  const { showToast } = useToast();
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<ScrapeProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handlePaste = async () => {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (text) {
        setUrlInput(text);
        setError(null);
      } else {
        showToast('Bộ nhớ tạm không chứa văn bản hợp lệ', 'warning');
      }
    } catch {
      showToast('Không thể đọc bộ nhớ tạm. Vui lòng dán thủ công', 'warning');
    }
  };

  const handleExtract = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const url = urlInput.trim();
    if (!url) {
      setError('Vui lòng nhập đường dẫn truyện cần lấy Names');
      return;
    }

    setLoading(true);
    setError(null);
    setProgress({ status: 'connecting', message: 'Đang kết nối đến máy chủ...' });

    try {
      const data = await extractNames(url, setProgress);
      setResult(data);
      showToast(
        `Đã tải thành công ${data.packages.length} gói (${data.totalNames.toLocaleString('vi-VN')} names)`,
        'success'
      );
    } catch (err: any) {
      const msg = err?.message || 'Không thể bóc tách dữ liệu từ đường dẫn này';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
      setProgress(null);
    }
  };

  const handleDownloadZip = async () => {
    if (!result?.packages.length) return;
    try {
      await downloadZipFile(
        `Names_${makeSafeFilename(result.bookTitle || 'vBook_Names')}.zip`,
        result.packages.map((pkg, i) => ({
          filename: `Names_${makeSafeFilename(pkg.originalName || pkg.title || `Goi_${i + 1}`)}.txt`,
          content: pkg.content,
        }))
      );
      showToast('Đã tải xuống file ZIP', 'success');
    } catch (err: any) {
      showToast('Lỗi khi đóng gói ZIP: ' + (err?.message || ''), 'error');
    }
  };

  const handleDownloadMerged = () => {
    if (!result?.packages.length) return;
    const content = result.packages
      .filter((p) => p.content)
      .map((p) => `# === ${p.title} ===\n${p.content}`)
      .join('\n\n');
    const filename = `Names_${makeSafeFilename(result.bookTitle || 'vBook_Names')}_Merged.txt`;
    downloadTextFile(filename, content);
    showToast(`Đã tải xuống ${filename}`, 'success');
  };

  const handleCopyAll = () => {
    if (!result?.packages.length) return;
    navigator.clipboard.writeText(result.packages.map((p) => p.content).filter(Boolean).join('\n'));
    setCopiedAll(true);
    showToast(`Đã sao chép ${result.totalNames.toLocaleString('vi-VN')} names`, 'success');
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6 py-1 sm:py-2 max-w-5xl mx-auto px-1 sm:px-0">
      {/* Header */}
      <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3 sm:pb-4 flex items-start gap-2.5 sm:gap-3">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/80 flex items-center justify-center text-brand-primary dark:text-sky-400 flex-shrink-0 mt-0.5">
          <FolderDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Get Names
          </h1>
          <p className="text-[11.5px] sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
            Tải từ điển tên riêng (QuickTranslate) từ Wikidich, Sangtacviet, Chiasename
          </p>
        </div>
      </div>

      {/* Input form */}
      <form onSubmit={handleExtract} className="space-y-2.5 sm:space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          {/* Ô nhập URL */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Dán link Wikidich, Sangtacviet, Chiasename..."
              disabled={loading}
              className="w-full pl-9 pr-9 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary dark:focus:border-sky-500 transition-all shadow-xs"
            />
            {urlInput && (
              <button
                type="button"
                onClick={() => { setUrlInput(''); setError(null); }}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Xóa"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Nút hành động — Dàn 2 cột trên điện thoại, flex trên tablet/desktop */}
          <div className="grid grid-cols-2 sm:flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              disabled={loading}
              className="btn-secondary py-2.5 sm:py-3 px-3 sm:px-3.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 flex-shrink-0"
              title="Dán từ bộ nhớ tạm"
            >
              <Clipboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 dark:text-slate-400 flex-shrink-0" />
              <span>Dán link</span>
            </button>
            <button
              type="submit"
              disabled={loading || !urlInput.trim()}
              className="btn-primary py-2.5 sm:py-3 px-4 sm:px-5 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin flex-shrink-0" />
                  <span>Đang tải...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Tải Names</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Nguồn hỗ trợ */}
        <SupportedSitesStrip />
      </form>

      {/* Tiến trình bóc tách */}
      {loading && progress && (
        <div className="p-3.5 sm:p-4 rounded-xl border border-sky-200/80 dark:border-sky-800/80 bg-sky-50/50 dark:bg-sky-950/40 space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-sky-800 dark:text-sky-300">
            <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
            <span className="truncate">{progress.message}</span>
          </div>
          {progress.totalPackages! > 0 && (
            <div className="w-full bg-sky-200/60 dark:bg-sky-900/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-primary dark:bg-sky-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${Math.round(((progress.currentPackage ?? 0) / progress.totalPackages!) * 100)}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Thông báo lỗi */}
      {error && !loading && (
        <div className="p-3.5 sm:p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs sm:text-sm min-w-0">
            <p className="font-semibold text-rose-800 dark:text-rose-300">{error}</p>
            <p className="text-[11.5px] sm:text-xs text-rose-600 dark:text-rose-400 leading-snug">
              Vui lòng kiểm tra lại đường dẫn hoặc đảm bảo trang web thuộc danh sách hỗ trợ.
            </p>
          </div>
        </div>
      )}

      {/* Kết quả bóc tách */}
      {result && result.packages.length > 0 && (
        <div className="space-y-3 sm:space-y-4 pt-1">
          {/* Thanh Toolbar Thông Tin & Xuất File Nhanh */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            {/* Thông tin truyện */}
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/60 whitespace-nowrap">
                  {result.siteName}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">{result.packages.length}</strong> gói
                  {' · '}
                  <strong className="text-brand-primary dark:text-sky-400">{result.totalNames.toLocaleString('vi-VN')}</strong> names
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 truncate">
                {result.bookTitle || 'Kết quả bóc tách'}
              </h3>
            </div>

            {/* Nhóm nút xuất file nhanh */}
            <div className="flex items-center gap-2 w-full sm:w-auto pt-1 sm:pt-0">
              <button
                type="button"
                onClick={handleCopyAll}
                className="btn-secondary py-1.5 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                title="Sao chép toàn bộ"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                    <span>Chép tất cả</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadMerged}
                className="btn-secondary py-1.5 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                title="Tải gộp (.txt)"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                <span>Tải gộp (.txt)</span>
              </button>

              {result.packages.length >= 2 && (
                <button
                  type="button"
                  onClick={handleDownloadZip}
                  className="btn-primary py-1.5 px-3.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs flex-1 sm:flex-initial"
                  title="Nén tất cả thành file .zip"
                >
                  <FileArchive className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Tải .zip</span>
                </button>
              )}
            </div>
          </div>

          {/* Danh sách các gói name */}
          <div className="space-y-2.5 sm:space-y-3">
            {result.packages.map((pkg, i) => (
              <NamePackageCard key={pkg.id || i} pkg={pkg} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
