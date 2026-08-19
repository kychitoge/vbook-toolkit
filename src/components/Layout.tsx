import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastProvider } from './Toast';
import { SnowEffect } from './SnowEffect';
import { ScrollToTop } from './ScrollToTop';
import { usePageMeta } from '../hooks/usePageMeta';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  usePageMeta();
  return (
    <ToastProvider>
      <ScrollToTop />
      <div className="relative flex flex-col min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-150">
        <SnowEffect />
        <Header />
        <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};

