import React, { useState } from 'react';
import {
  Sparkles,
  CreditCard,
  Wallet,
  Globe,
  Check,
  X,
  Copy,
  Download,
  Info,
  ExternalLink,
} from 'lucide-react';
import { useToast } from '../components/Toast';
import { generateDonateTransferContent } from '../utils/sanitizeTransfer';
import { getVietQrUrl, downloadQrImage } from '../utils/qrHelper';

interface ComparisonFeature {
  name: string;
  free: string | boolean;
  freeNote?: string;
  premium: string | boolean;
  premiumNote?: string;
}

const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    name: 'Đọc truyện trực tuyến',
    free: true,
    premium: true,
  },
  {
    name: 'Tải truyện offline',
    free: 'Tối đa 3 bộ/ngày',
    freeNote: 'Tự động reset sau 24h',
    premium: 'Không giới hạn',
    premiumNote: 'Tải không giới hạn số lượng & dung lượng',
  },
  {
    name: 'Xuất file eBook (EPUB, PDF)',
    free: false,
    premium: true,
    premiumNote: 'Hỗ trợ xuất định dạng EPUB/PDF đọc máy đọc sách',
  },
  {
    name: 'Màu nick hiển thị',
    free: 'Màu mặc định',
    premium: 'Tùy biến màu nick',
    premiumNote: 'Đổi màu nickname nổi bật trong cộng đồng',
  },
  {
    name: 'Huy hiệu Tick Xanh',
    free: false,
    premium: true,
    premiumNote: 'Có tick xanh chính chủ vBook',
  },
  {
    name: 'Thời hạn sở hữu',
    free: 'Vĩnh viễn',
    premium: 'Vĩnh viễn',
    premiumNote: 'Kích hoạt 1 lần, sở hữu vĩnh viễn theo Email',
  },
];

const AMOUNT_PRESETS = [50000, 100000, 200000, 500000];

export const PremiumPage: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [activeChannel, setActiveChannel] = useState<'bank' | 'momo' | 'viettel' | 'paypal'>('bank');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const currentAmount = customAmount ? Math.max(10000, Number(customAmount) || 0) : selectedAmount;
  const transferContent = generateDonateTransferContent(email);
  const qrUrl = getVietQrUrl('MB', '9704229200720097', currentAmount, transferContent);

  const handleCopy = (text: string, label: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`Đã sao chép ${label}`, 'success');
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleDownloadQr = async () => {
    showToast('Đang tải mã QR...', 'info');
    const success = await downloadQrImage(qrUrl, `vietqr-premium-${currentAmount}k.png`);
    if (success) {
      showToast('Tải mã QR thành công', 'success');
    } else {
      window.open(qrUrl, '_blank');
      showToast('Đã mở ảnh trong tab mới để lưu', 'info');
    }
  };

  return (
    <div className="space-y-5 w-full">
      {/* Tiêu đề trang tối giản */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <span>Nâng Cấp Tài Khoản Premium</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ủng hộ kinh phí duy trì máy chủ cho Admin vBook (VU DUC LONG) và kích hoạt toàn bộ đặc quyền
          </p>
        </div>
      </div>

      {/* Bố cục 2 Cột: Quyền Lợi (Trái) & Thanh Toán (Phải) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* CỘT 1 (TRÁI): VERTICAL FEATURE CHECKLIST (BẢNG 3 CỘT DỌC) */}
        <div className="card-flat p-4 sm:p-5 space-y-3.5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              1. Bảng So Sánh Quyền Lợi
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Ủng hộ tối thiểu 50.000đ
            </span>
          </div>

          {/* Bảng Feature Checklist 3 cột dọc */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold">
                  <th className="p-2.5 sm:p-3 w-5/12">Tính năng</th>
                  <th className="p-2.5 sm:p-3 w-3/12 border-l border-slate-200 dark:border-slate-700 text-center">
                    <div>Free</div>
                    <div className="text-[10px] font-normal text-slate-400">0đ</div>
                  </th>
                  <th className="p-2.5 sm:p-3 w-4/12 border-l border-slate-200 dark:border-slate-700 text-center bg-amber-50/50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200">
                    <div className="flex items-center justify-center gap-1">
                      <span>Premium</span>
                      <span className="text-[9px] bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 font-bold px-1 rounded">VIP</span>
                    </div>
                    <div className="text-[10px] font-normal text-amber-800 dark:text-amber-300">Từ 50.000đ</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {COMPARISON_FEATURES.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors ${
                      idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/30 dark:bg-slate-900/50'
                    }`}
                  >
                    {/* Cột 1: Tên tính năng */}
                    <td className="p-2.5 sm:p-3 font-medium text-slate-800 dark:text-slate-200">
                      {item.name}
                    </td>

                    {/* Cột 2: Tài khoản Free */}
                    <td className="p-2.5 sm:p-3 border-l border-slate-200/80 dark:border-slate-800 text-center">
                      {typeof item.free === 'boolean' ? (
                        item.free ? (
                          <Check className="w-4 h-4 text-slate-600 dark:text-slate-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <div className="leading-tight">
                          <span className="font-semibold text-slate-700 dark:text-slate-300 block">{item.free}</span>
                          {item.freeNote && (
                            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium block mt-0.5">
                              {item.freeNote}
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Cột 3: Tài khoản Premium */}
                    <td className="p-2.5 sm:p-3 border-l border-slate-200/80 dark:border-slate-800 text-center bg-amber-50/30 dark:bg-amber-950/20">
                      {typeof item.premium === 'boolean' ? (
                        item.premium ? (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto stroke-[2.5]" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <div className="leading-tight">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 block">{item.premium}</span>
                          {item.premiumNote && (
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                              {item.premiumNote}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-lg text-[11.5px] text-slate-600 dark:text-slate-300 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-brand-primary flex-shrink-0 mt-0.5" />
              <span>
                Tài khoản Premium được kích hoạt tự động theo <strong>Email</strong> và sở hữu vĩnh viễn trên mọi thiết bị.
              </span>
            </div>

            <div className="p-2.5 bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 rounded-lg text-[11.5px] text-indigo-950 dark:text-indigo-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="truncate">Nếu sau 24h chưa thấy kích hoạt, vui lòng nhắn hỗ trợ tại Discord:</span>
              </div>
              <a
                href="https://discord.gg/yXFRdG4kJq"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-[11px] py-1 px-2 text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 border-indigo-300 dark:border-indigo-700 flex items-center gap-1 flex-shrink-0"
              >
                <span>Vào Discord</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* CỘT 2 (PHẢI): THANH TOÁN & QUÉT MÃ VIETQR */}
        <div className="card-flat p-4 sm:p-5 space-y-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
            2. Thông Tin Thanh Toán
          </div>

          {/* Chọn kênh thanh toán */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kênh thanh toán
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

          {/* Nhập Email */}
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

          {/* Chọn số tiền (Chỉ hiển thị khi chọn Bank) */}
          {activeChannel === 'bank' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Số tiền ủng hộ:</span>
                <span className="font-bold text-brand-primary dark:text-sky-400 font-mono">{currentAmount.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {AMOUNT_PRESETS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-brand-tint dark:bg-sky-950/60 border-brand-primary text-brand-dark dark:text-sky-300 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                    }`}
                  >
                    {amt / 1000}k
                  </button>
                ))}
              </div>
            </div>
          )}

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

              {/* Chi tiết STK, số tiền, lời nhắn */}
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
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Số tiền ủng hộ</div>
                    <div className="font-bold text-xs sm:text-sm text-brand-primary dark:text-sky-400">{currentAmount.toLocaleString('vi-VN')} đ</div>
                  </div>
                  <button
                    onClick={() => handleCopy(currentAmount.toString(), 'Số tiền', 'amt')}
                    className="btn-secondary p-1.5 text-slate-600 dark:text-slate-300"
                    title="Sao chép số tiền"
                  >
                    {copiedField === 'amt' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Lời nhắn NAPAS */}
                <div className="p-2.5 bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-lg flex items-center justify-between">
                  <div className="pr-2 overflow-hidden">
                    <div className="text-[10px] text-sky-800 dark:text-sky-300 font-medium">Lời nhắn chuẩn (NAPAS)</div>
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
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3 text-center">
              <div className="w-10 h-10 bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800/60 rounded-full flex items-center justify-center mx-auto text-[#a50064] dark:text-pink-400">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Ủng hộ qua Ví MoMo</h3>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs text-slate-700 dark:text-slate-300">
                https://me.momo.vn/donatevbook
              </div>
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded text-xs text-amber-900 dark:text-amber-200 text-left">
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
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3 text-center">
              <div className="w-10 h-10 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-full flex items-center justify-center mx-auto text-[#ee0033] dark:text-red-400">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Ủng hộ qua Viettel Money</h3>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs text-slate-700 dark:text-slate-300 break-all">
                https://vtpay.page.link/sNV8QjDqmB2k4tw5A
              </div>
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded text-xs text-amber-900 dark:text-amber-200 text-left">
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
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3 text-center">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-full flex items-center justify-center mx-auto text-[#003087] dark:text-sky-400">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Ủng hộ qua PayPal Quốc Tế</h3>
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
    </div>
  );
};
