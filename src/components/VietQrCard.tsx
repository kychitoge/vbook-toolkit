import React, { useState } from 'react';
import { Copy, Check, Download, QrCode } from 'lucide-react';
import { useToast } from './Toast';
import { getVietQrUrl, downloadQrImage } from '../utils/qrHelper';

interface VietQrCardProps {
  bankCode?: string;
  accountNumber?: string;
  accountName?: string;
  amount: number;
  content: string;
  title?: string;
}

export const VietQrCard: React.FC<VietQrCardProps> = ({
  bankCode = 'MB',
  accountNumber = '9704229200720097',
  accountName = 'VU DUC LONG',
  amount,
  content,
  title = 'Mã VietQR MB Bank',
}) => {
  const { showToast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const qrUrl = getVietQrUrl(bankCode, accountNumber, amount, content);

  const handleCopy = (text: string, label: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`Đã sao chép ${label}`, 'success');
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleDownloadQr = async () => {
    showToast('Đang tải mã QR...', 'info');
    const success = await downloadQrImage(qrUrl, `vietqr-vbook-${amount}k.png`);
    if (success) {
      showToast('Tải mã QR thành công', 'success');
    } else {
      showToast('Đã mở ảnh trong tab mới để lưu', 'info');
    }
  };


  return (
    <div className="card-flat p-4 sm:p-5 space-y-4 shadow-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-brand-primary flex-shrink-0" />
          <h3 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">{title}</h3>
        </div>
        <span className="text-[10px] sm:text-[11px] px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-full font-medium border border-emerald-200/60 dark:border-emerald-800/60 whitespace-nowrap">
          Tự động điền
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-center">
        {/* Khung ảnh QR to rõ nét & co giãn tự nhiên theo màn hình */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-xl w-full">
          <div className="bg-white p-2 border border-slate-200 rounded-lg w-full max-w-[260px] sm:max-w-[300px] aspect-square flex items-center justify-center shadow-sm">
            <img
              src={qrUrl}
              alt="Mã VietQR"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <button
            onClick={handleDownloadQr}
            className="btn-secondary text-xs w-full max-w-[260px] sm:max-w-[300px] mt-3 py-2 font-medium"
          >
            <Download className="w-4 h-4 flex-shrink-0" />
            <span>Tải ảnh mã QR</span>
          </button>
        </div>

        {/* Thông tin chuyển khoản chi tiết */}
        <div className="space-y-2.5 sm:space-y-3 w-full">
          {/* Ngân hàng */}
          <div className="p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800 rounded-lg flex items-center justify-between text-xs">
            <div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Ngân hàng</div>
              <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">MB Bank (Quân Đội)</div>
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded">
              MB
            </span>
          </div>

          {/* Số tài khoản */}
          <div className="p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800 rounded-lg flex items-center justify-between text-xs">
            <div className="min-w-0 pr-2">
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">Số tài khoản ({accountName})</div>
              <div className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">{accountNumber}</div>
            </div>
            <button
              onClick={() => handleCopy(accountNumber, 'Số tài khoản', 'acc')}
              className="btn-secondary p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex-shrink-0"
              title="Sao chép STK"
            >
              {copiedField === 'acc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Số tiền */}
          <div className="p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800 rounded-lg flex items-center justify-between text-xs">
            <div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Số tiền</div>
              <div className="font-bold text-sm sm:text-base text-brand-primary dark:text-sky-400">
                {amount.toLocaleString('vi-VN')} đ
              </div>
            </div>
            <button
              onClick={() => handleCopy(amount.toString(), 'Số tiền', 'amt')}
              className="btn-secondary p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex-shrink-0"
              title="Sao chép số tiền"
            >
              {copiedField === 'amt' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Nội dung chuyển khoản */}
          <div className="p-2.5 sm:p-3 bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-lg flex items-center justify-between text-xs">
            <div className="pr-2 min-w-0 flex-1">
              <div className="text-[10px] text-sky-800 dark:text-sky-300 font-medium">Lời nhắn chuẩn (NAPAS)</div>
              <div className="font-mono font-bold text-xs sm:text-sm text-sky-950 dark:text-sky-100 truncate">
                {content || '[Vui lòng nhập email]'}
              </div>
            </div>
            <button
              onClick={() => handleCopy(content, 'Nội dung', 'content')}
              className="btn-primary p-2 flex-shrink-0"
              title="Sao chép nội dung"
              disabled={!content}
            >
              {copiedField === 'content' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
