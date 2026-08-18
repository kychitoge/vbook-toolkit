import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PremiumPage } from './pages/Premium';
import { NameColorPage } from './pages/NameColor';
import { DownloadPage } from './pages/Download';
import { RuleTesterPage } from './pages/RuleTester';
import { FontPreviewPage } from './pages/FontPreview';
import { GetNamePage } from './pages/GetName';
import { RedirectHandler } from './pages/RedirectHandler';

export const App: React.FC = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/premium" element={<PremiumPage />} />
          
          {/* Alias redirect /donate -> /premium */}
          <Route path="/donate" element={<Navigate to="/premium" replace />} />
          
          <Route path="/name-color" element={<NameColorPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/rule-tester" element={<RuleTesterPage />} />
          <Route path="/font-preview" element={<FontPreviewPage />} />
          <Route path="/get-name" element={<GetNamePage />} />

          {/* Instant redirects for external services */}
          <Route
            path="/hdsd"
            element={
              <RedirectHandler
                to="https://vbookapp.gitbook.io/huong-dan-su-dung"
                title="Hướng Dẫn Sử Dụng vBook"
              />
            }
          />
          <Route
            path="/extension"
            element={
              <RedirectHandler
                to="https://www.vbookext.me"
                title="Danh Sách Nguồn Mở Rộng vBook"
              />
            }
          />
          <Route
            path="/qt"
            element={
              <RedirectHandler
                to="https://qt.vbookext.me/collections"
                title="Data QT Collection"
              />
            }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
