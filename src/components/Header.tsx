import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ExternalLink,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Download,
  BookOpen,
  Code2,
  Palette,
  Boxes,
  Type,
  FolderDown,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Đóng menu khi chuyển trang
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group flex-shrink-0">
          <img
            src="/icon-64.png"
            alt="vBook Toolkit Logo"
            className="w-7 h-7 rounded-md object-contain shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-slate-100">vBook</span>
            <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">
              Toolkit
            </span>
          </div>
        </Link>

        {/* Navigation Links trên Desktop & Tablet */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 text-xs font-medium">
          <Link
            to="/download"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors ${
              location.pathname === '/download'
                ? 'bg-slate-100 text-slate-900 font-semibold border border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải App</span>
          </Link>

          <Link
            to="/font-preview"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors ${
              location.pathname === '/font-preview'
                ? 'bg-slate-100 text-slate-900 font-semibold border border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Type className="w-3.5 h-3.5 text-sky-500" />
            <span>Thử Font & Nền</span>
          </Link>

          <Link
            to="/premium"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors ${
              location.pathname === '/premium' || location.pathname === '/donate'
                ? 'bg-amber-50 text-amber-900 font-semibold border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span>Premium</span>
          </Link>

          <Link
            to="/rule-tester"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors ${
              location.pathname === '/rule-tester'
                ? 'bg-slate-100 text-slate-900 font-semibold border border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Rule Tester</span>
          </Link>

          <Link
            to="/get-name"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors ${
              location.pathname === '/get-name'
                ? 'bg-slate-100 text-slate-900 font-semibold border border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <FolderDown className="w-3.5 h-3.5 text-emerald-500" />
            <span>Get Names</span>
          </Link>

          <div className="h-3.5 w-[1px] bg-slate-200 dark:bg-slate-800 mx-0.5"></div>

          <a
            href="https://vbookapp.gitbook.io/huong-dan-su-dung"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900 rounded-md transition-colors"
          >
            <span>HDSD</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="https://www.vbookext.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900 rounded-md transition-colors"
          >
            <span>Nguồn Ext</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <div className="h-3.5 w-[1px] bg-slate-200 dark:bg-slate-800 mx-0.5"></div>

          {/* Nút chuyển đổi Theme Sáng / Tối */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900 transition-colors"
            title={theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </nav>

        {/* Thanh công cụ rút gọn trên Mobile (< md) */}
        <div className="flex md:hidden items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <a
            href="https://vbookapp.gitbook.io/huong-dan-su-dung"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/80 rounded-full whitespace-nowrap shadow-xs hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
            <span className="text-[11.5px]">Hướng dẫn</span>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title={theme === 'dark' ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Slide-down Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 px-4 py-3 space-y-2.5 shadow-lg transition-all">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <Link
              to="/download"
              onClick={closeMenu}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:border-brand-primary/50 transition-colors"
            >
              <Download className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <span className="truncate">Tải App</span>
            </Link>

            <Link
              to="/font-preview"
              onClick={closeMenu}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:border-brand-primary/50 transition-colors"
            >
              <Type className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span className="truncate">Thử Font & Nền</span>
            </Link>

            <Link
              to="/premium"
              onClick={closeMenu}
              className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center gap-2 text-amber-950 dark:text-amber-200 hover:border-amber-400 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span className="truncate">Premium</span>
            </Link>

            <Link
              to="/name-color"
              onClick={closeMenu}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:border-brand-primary/50 transition-colors"
            >
              <Palette className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span className="truncate">Tên Nhiều Màu</span>
            </Link>

            <Link
              to="/rule-tester"
              onClick={closeMenu}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:border-brand-primary/50 transition-colors"
            >
              <Code2 className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <span className="truncate">Rule Tester</span>
            </Link>

            <Link
              to="/get-name"
              onClick={closeMenu}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:border-brand-primary/50 transition-colors"
            >
              <FolderDown className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="truncate">Get Names</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <a
              href="https://vbookapp.gitbook.io/huong-dan-su-dung"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>HDSD</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href="https://www.vbookext.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1"
            >
              <Boxes className="w-3.5 h-3.5 text-slate-400" />
              <span>Nguồn Ext</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
