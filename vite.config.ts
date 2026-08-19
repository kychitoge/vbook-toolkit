import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { ROUTES_META, SITE_BASE_URL, DEFAULT_OG_IMAGE } from './src/config/routesMeta';

/**
 * Plugin sinh tĩnh các trang HTML đa route với thẻ <head> riêng biệt cho Cloudflare Pages
 */
function generateMetaPagesPlugin(): Plugin {
  return {
    name: 'vite-plugin-generate-meta-pages',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const templatePath = path.join(distDir, 'index.html');

      if (!fs.existsSync(templatePath)) return;

      const templateHtml = fs.readFileSync(templatePath, 'utf-8');

      for (const [route, meta] of Object.entries(ROUTES_META)) {
        if (route === '/') continue;

        const cleanSubdir = route.replace(/^\//, '');
        const targetDir = path.join(distDir, cleanSubdir);

        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        const canonicalUrl = `${SITE_BASE_URL}${route}`;
        const ogTitle = meta.ogTitle || meta.title;
        const ogDescription = meta.ogDescription || meta.description;
        const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;

        let html = templateHtml;

        // Thay thế <title>
        html = html.replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`);

        // Thay thế <meta name="title" content="...">
        html = html.replace(
          /<meta name="title" content=".*?" \/>/s,
          `<meta name="title" content="${meta.title}" />`
        );

        // Thay thế <meta name="description" content="...">
        html = html.replace(
          /<meta name="description" content=".*?" \/>/s,
          `<meta name="description" content="${meta.description}" />`
        );

        // Thay thế <meta name="keywords" content="...">
        if (meta.keywords) {
          html = html.replace(
            /<meta name="keywords" content=".*?" \/>/s,
            `<meta name="keywords" content="${meta.keywords}" />`
          );
        }

        // Thay thế Open Graph Tags
        html = html.replace(
          /<meta property="og:title" content=".*?" \/>/s,
          `<meta property="og:title" content="${ogTitle}" />`
        );
        html = html.replace(
          /<meta property="og:description" content=".*?" \/>/s,
          `<meta property="og:description" content="${ogDescription}" />`
        );
        html = html.replace(
          /<meta property="og:image" content=".*?" \/>/s,
          `<meta property="og:image" content="${ogImage}" />\n    <meta property="og:url" content="${canonicalUrl}" />`
        );

        // Thay thế Twitter Tags
        html = html.replace(
          /<meta property="twitter:title" content=".*?" \/>/s,
          `<meta property="twitter:title" content="${ogTitle}" />`
        );
        html = html.replace(
          /<meta property="twitter:description" content=".*?" \/>/s,
          `<meta property="twitter:description" content="${ogDescription}" />`
        );
        html = html.replace(
          /<meta property="twitter:image" content=".*?" \/>/s,
          `<meta property="twitter:image" content="${ogImage}" />\n    <meta property="twitter:url" content="${canonicalUrl}" />`
        );

        fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
        console.log(`[generate-meta-pages] ✅ Đã tạo: dist/${cleanSubdir}/index.html [${meta.title}]`);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), generateMetaPagesPlugin()],
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
});
