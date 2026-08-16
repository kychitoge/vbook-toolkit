import React, { useEffect } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';

interface RedirectHandlerProps {
  to: string;
  title: string;
}

export const RedirectHandler: React.FC<RedirectHandlerProps> = ({ to, title }) => {
  useEffect(() => {
    // Instant redirect
    window.location.replace(to);
  }, [to]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
      <div className="card-flat max-w-md w-full flex flex-col items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Đang chuyển hướng...</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Đang đưa bạn đến {title}</p>
        </div>
        <a
          href={to}
          className="btn-primary w-full"
        >
          <span>Mở ngay bây giờ</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

