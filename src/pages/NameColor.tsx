import React, { useState, useMemo, useEffect } from 'react';
import {
  Palette,
  CreditCard,
  Wallet,
  Globe,
  Copy,
  Check,
  RotateCcw,
  Sun,
  Moon,
  AlertTriangle,
  Download,
  ExternalLink,
} from 'lucide-react';
import { useToast } from '../components/Toast';
import { useTheme } from '../context/ThemeContext';
import { generateColorTransferContent } from '../utils/sanitizeTransfer';
import { parseHexColorLines, generateGradientStyle } from '../utils/colorHelper';
import { getVietQrUrl, downloadQrImage } from '../utils/qrHelper';

const DEFAULT_HEX_COLORS = [
  '#ff4d4f',
  '#faad14',
  '#52c41a',
  '#13c2c2',
  '#1677ff',
  '#722ed1',
];

const DEFAULT_NAME = 'vBook Reader';

export const NameColorPage: React.FC = () => {
  const { showToast } = useToast();
  const { theme } = useTheme();

  // Form states
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [hexInput, setHexInput] = useState<string>(DEFAULT_HEX_COLORS.join('\n'));
  const [previewDarkBg, setPreviewDarkBg] = useState<boolean>(() => theme === 'dark');
  const [isCombo, setIsCombo] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [activeChannel, setActiveChannel] = useState<'bank' | 'momo' | 'viettel' | 'paypal'>('bank');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Tự động đồng bộ chế độ nền Preview khi theme toàn trang đổi
  useEffect(() => {
    setPreviewDarkBg(theme === 'dark');
  }, [theme]);

  // Phân tích danh sách mã HEX qua helper
  const { validColors, invalidLines, lineCount } = useMemo(() => {
    return parseHexColorLines(hexInput);
  }, [hexInput]);

  // CSS Linear Gradient background qua helper
  const gradientStyle = useMemo(() => {
    return generateGradientStyle(validColors);
  }, [validColors]);

  // Chuẩn hóa cú pháp chuyển khoản
  const hexValuesClean = validColors.map((c) => c.replace('#', ''));
  const amount = isCombo ? 100000 : 50000;
  const transferContent = generateColorTransferContent(email, hexValuesClean, isCombo);

  // URL VietQR MB Bank
  const qrUrl = getVietQrUrl('MB', '9704229200720097', amount, transferContent);

  const handleReset = () => {
    setName(DEFAULT_NAME);
    setHexInput(DEFAULT_HEX_COLORS.join('\n'));
    setIsCombo(false);
    showToast('Đã đặt lại mặc định', 'info');
  };

  const handleCopy = (text: string, label: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`Đã sao chép ${label}`, 'success');
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleDownloadQr = async () => {
    showToast('Đang tải mã QR...', 'info');
    const success = await downloadQrImage(qrUrl, `vietqr-color-${amount}k.png`);
    if (success) {
      showToast('Tải mã QR thành công', 'success');
    } else {
      showToast('Đã mở ảnh trong tab mới để lưu', 'info');
    }
  };


  return (
    <div className="space-y-5 w-full">
      {/* Tiêu đề trang tối giản */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Palette className="w-5 h-5 text-brand-primary" />
            <span>Tên Nhiều Màu (Gradient Name)</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Xem trước màu gradient nickname và tạo mã VietQR kích hoạt
          </p>
        </div>
        <button
          onClick={handleReset}
          className="btn-secondary text-xs py-1 px-2.5"
          title="Đặt lại mặc định"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Mặc định</span>
        </button>
      </div>

      {/* Bố cục 2 Cột */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* CỘT 1: PREVIEW NAME, SÁNG/TỐI, HEX (MAX 15 DÒNG) */}
        <div className="card-flat p-4 sm:p-5 space-y-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
            1. Tên Hiển Thị & Xem Trước
          </div>

          {/* Nhập Tên Nick */}
          <div className="space-y-1">
            <label htmlFor="name_input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tên hiển thị (Nickname)
            </label>
            <input
              id="name_input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên nick..."
              className="input-flat text-xs"
            />
          </div>

          {/* Khung Live Preview kèm nút Toggle Sáng / Tối */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Xem trước trực tiếp:</span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setPreviewDarkBg(false)}
                  className={`p-1 rounded text-[11px] flex items-center gap-1 transition-colors ${
                    !previewDarkBg
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm font-semibold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                  title="Nền sáng"
                >
                  <Sun className="w-3 h-3" />
                  <span>Sáng</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDarkBg(true)}
                  className={`p-1 rounded text-[11px] flex items-center gap-1 transition-colors ${
                    previewDarkBg
                      ? 'bg-slate-800 dark:bg-slate-600 text-white shadow-sm font-semibold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                  title="Nền tối"
                >
                  <Moon className="w-3 h-3" />
                  <span>Tối</span>
                </button>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-lg border transition-colors flex items-center justify-between gap-3 ${
                previewDarkBg
                  ? 'bg-[#18181b] border-zinc-700 text-white'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 border ${
                    previewDarkBg
                      ? 'bg-zinc-800 text-zinc-200 border-zinc-600'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 shadow-sm'
                  }`}
                >
                  {(name.trim() || 'V')[0].toUpperCase()}
                </div>
                <div className="min-w-0 overflow-hidden">
                  {validColors.length > 0 ? (
                    <span
                      className="name-gradient-animated text-base sm:text-lg font-bold tracking-tight select-none truncate block"
                      style={gradientStyle}
                    >
                      {name.trim() || DEFAULT_NAME}
                    </span>
                  ) : (
                    <span className="text-xs text-rose-500 font-medium">
                      Cần ít nhất 1 mã màu hợp lệ
                    </span>
                  )}
                </div>
              </div>

              {/* Dải swatch */}
              {validColors.length > 0 && (
                <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
                  {validColors.map((col, idx) => (
                    <span
                      key={idx}
                      className="w-3.5 h-3.5 rounded border border-black/10 dark:border-white/20 shadow-sm"
                      style={{ backgroundColor: col }}
                      title={col}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Textarea Mã HEX kéo dài theo số dòng (Max 15 dòng) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="hex_textarea" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Danh sách mã màu HEX (mỗi dòng 1 mã)
              </label>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {validColors.length} màu hợp lệ
              </span>
            </div>
            <textarea
              id="hex_textarea"
              rows={lineCount}
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              placeholder="#ff4d4f&#10;#faad14&#10;#52c41a"
              className="input-flat font-mono text-xs leading-relaxed transition-all"
              style={{ maxHeight: '380px', minHeight: '140px' }}
            />
            {invalidLines.length > 0 ? (
              <div className="flex items-center gap-1 text-[11px] text-rose-600 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Mã không hợp lệ ở dòng: {invalidLines.join(', ')}</span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">
                Hỗ trợ cả mã có dấu <code>#</code> hoặc không có (vd: <code>ff4d4f</code>).
              </p>
            )}
          </div>
        </div>

        {/* CỘT 2: GÓI, EMAIL, QR / CÁC PHƯƠNG THỨC KHÁC */}
        <div className="card-flat p-4 sm:p-5 space-y-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
            2. Gói Kích Hoạt & Thanh Toán
          </div>

          {/* Chọn Gói: Màu Nick (50k) vs Combo Trọn Gói (100k) */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Chọn gói đăng ký
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsCombo(false)}
                className={`p-2.5 rounded-lg border text-left transition-all text-xs ${
                  !isCombo
                    ? 'bg-brand-tint dark:bg-sky-950/60 border-brand-primary font-medium text-brand-dark dark:text-sky-300 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-slate-100">Màu Nick</div>
                <div className="text-[11px] text-brand-primary dark:text-sky-400 font-semibold mt-0.5">50.000đ</div>
              </button>

              <button
                type="button"
                onClick={() => setIsCombo(true)}
                className={`p-2.5 rounded-lg border text-left transition-all text-xs ${
                  isCombo
                    ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 dark:border-amber-700 font-medium text-amber-950 dark:text-amber-200 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-slate-100">Combo Trọn Gói</div>
                <div className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-0.5">100.000đ (Premium + Màu)</div>
              </button>
            </div>
          </div>

          {/* Nhập Email kích hoạt */}
          <div className="space-y-1">
            <label htmlFor="user_email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Email vBook kích hoạt <span className="text-rose-500">*</span>
            </label>
            <input
              id="user_email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vi_du@gmail.com"
              className="input-flat text-xs"
            />
          </div>

          {/* Tabs chọn Phương Thức Thanh Toán */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Phương thức thanh toán
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'bank', label: 'MB Bank', icon: CreditCard },
                { id: 'momo', label: 'MoMo', icon: Wallet },
                { id: 'viettel', label: 'Viettel', icon: Wallet },
                { id: 'paypal', label: 'PayPal', icon: Globe },
              ].map((ch) => {
                const Icon = ch.icon;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setActiveChannel(ch.id as any)}
                    className={`py-1.5 px-1 text-center rounded-lg border text-xs font-medium flex items-center justify-center gap-1 transition-all ${
                      activeChannel === ch.id
                        ? 'bg-brand-primary text-white border-brand-primary shadow-sm font-semibold'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{ch.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* KHUNG THANH TOÁN (MB Bank VietQR hoặc Phương Thức Khác) */}
          {activeChannel === 'bank' ? (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              {/* QR Image to rõ nét tối đa */}
              <div className="flex flex-col items-center justify-center p-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl relative group">
                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="absolute top-3.5 right-3.5 btn-secondary p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-sm rounded-md"
                  title="Tải ảnh mã QR về máy"
                >
                  <Download className="w-4 h-4" />
                </button>
                <div className="bg-white p-2 border border-slate-200 rounded-lg w-full max-w-[320px] sm:max-w-[360px] aspect-square flex items-center justify-center shadow-sm">
                  <img
                    src={qrUrl}
                    alt="Mã VietQR"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Chi tiết chuyển khoản & Copy 1-chạm */}
              <div className="space-y-2 text-xs">
                {/* MB Bank */}
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Ngân hàng MB Bank (VU DUC LONG)</div>
                    <div className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">9704229200720097</div>
                  </div>
                  <button
                    onClick={() => handleCopy('9704229200720097', 'STK', 'stk')}
                    className="btn-secondary p-1.5 text-slate-600 dark:text-slate-300"
                    title="Sao chép STK"
                  >
                    {copiedField === 'stk' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Số tiền */}
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Số tiền ({isCombo ? 'Combo' : 'Màu'})</div>
                    <div className="font-bold text-xs sm:text-sm text-brand-primary dark:text-sky-400">{amount.toLocaleString('vi-VN')} đ</div>
                  </div>
                  <button
                    onClick={() => handleCopy(amount.toString(), 'Số tiền', 'amt')}
                    className="btn-secondary p-1.5 text-slate-600 dark:text-slate-300"
                    title="Sao chép số tiền"
                  >
                    {copiedField === 'amt' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Lời nhắn NAPAS */}
                <div className="p-2.5 bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-lg flex items-center justify-between">
                  <div className="pr-2 overflow-hidden">
                    <div className="text-[10px] text-sky-800 dark:text-sky-300 font-medium">Lời nhắn ({isCombo ? 'premium color' : 'color'})</div>
                    <div className="font-mono font-bold text-xs sm:text-[13px] text-sky-950 dark:text-sky-100 truncate">
                      {transferContent}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(transferContent, 'Lời nhắn', 'content')}
                    className="btn-primary p-1.5 flex-shrink-0"
                    title="Sao chép lời nhắn"
                  >
                    {copiedField === 'content' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ) : activeChannel === 'momo' ? (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-center">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs text-slate-700 dark:text-slate-300">
                https://me.momo.vn/donatevbook
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded text-[11px] text-amber-900 dark:text-amber-200 text-left">
                <strong>Lời nhắn MoMo:</strong> <span className="font-mono">{transferContent}</span>
              </div>
              <a
                href="https://me.momo.vn/donatevbook"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full bg-[#a50064] hover:bg-[#850050]"
              >
                <span>Mở Ví MoMo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : activeChannel === 'viettel' ? (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-center">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs text-slate-700 dark:text-slate-300 break-all">
                https://vtpay.page.link/sNV8QjDqmB2k4tw5A
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded text-[11px] text-amber-900 dark:text-amber-200 text-left">
                <strong>Lời nhắn:</strong> <span className="font-mono">{transferContent}</span>
              </div>
              <a
                href="https://vtpay.page.link/sNV8QjDqmB2k4tw5A"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full bg-[#ee0033] hover:bg-[#cc002c]"
              >
                <span>Mở Viettel Money</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-center">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs text-slate-700 dark:text-slate-300">
                https://paypal.me/donatevbook
              </div>
              <a
                href="https://paypal.me/donatevbook"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full bg-[#003087] hover:bg-[#00205b]"
              >
                <span>Mở PayPal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Keyframes animation */}
      <style>{`
        .name-gradient-animated {
          display: inline-block;
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: name_rainbow_anim 1000s linear infinite;
        }
        @keyframes name_rainbow_anim {
          to {
            background-position: 4500vh;
          }
        }
      `}</style>
    </div>
  );
};
