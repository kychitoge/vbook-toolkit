import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300">vBook Toolkit</span>
          <span>·</span>
          <span>Phát triển cho cộng đồng</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            Build with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> by vBook Community
          </span>
          <span>·</span>
          <a
            href="https://discord.gg/yXFRdG4kJq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
          >
            Hỗ trợ Discord
          </a>
        </div>
      </div>
    </footer>
  );
};
