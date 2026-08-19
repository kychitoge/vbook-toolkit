import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES_META, RouteMeta, SITE_BASE_URL, DEFAULT_OG_IMAGE } from '../config/routesMeta';

function updateMetaTag(attribute: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function usePageMeta(customMeta?: Partial<RouteMeta>) {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const baseMeta = ROUTES_META[pathname] || ROUTES_META['/'];
    const title = customMeta?.title || baseMeta?.title || 'vBook Toolkit';
    const description = customMeta?.description || baseMeta?.description || '';
    const keywords = customMeta?.keywords || baseMeta?.keywords;
    const ogTitle = customMeta?.ogTitle || baseMeta?.ogTitle || title;
    const ogDescription = customMeta?.ogDescription || baseMeta?.ogDescription || description;
    const ogImage = customMeta?.ogImage || baseMeta?.ogImage || DEFAULT_OG_IMAGE;

    // 1. Cập nhật Title
    document.title = title;

    // 2. Primary Meta Tags
    updateMetaTag('name', 'title', title);
    updateMetaTag('name', 'description', description);
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // 3. Open Graph / Facebook
    const canonicalUrl = `${SITE_BASE_URL}${pathname === '/' ? '' : pathname}`;
    updateMetaTag('property', 'og:title', ogTitle);
    updateMetaTag('property', 'og:description', ogDescription);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:image', ogImage);

    // 4. Twitter
    updateMetaTag('property', 'twitter:title', ogTitle);
    updateMetaTag('property', 'twitter:description', ogDescription);
    updateMetaTag('property', 'twitter:url', canonicalUrl);
    updateMetaTag('property', 'twitter:image', ogImage);
  }, [location.pathname, customMeta]);
}
