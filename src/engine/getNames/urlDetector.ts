import { SupportedSiteId, SupportedSiteMeta } from './types';

export const SUPPORTED_SITES: SupportedSiteMeta[] = [
  {
    id: 'wikicv',
    name: 'Wikidich',
    domain: 'wikicv.org, truyenwikidich.net',
  },
  {
    id: 'sangtacviet',
    name: 'Sangtacviet',
    domain: 'sangtacviet.pro, sangtacviet.app',
  },
  {
    id: 'chiasename',
    name: 'Chiasename',
    domain: 'chiasename.blogspot.com',
  },
];

export function detectWebsite(rawUrl: string): SupportedSiteId {
  const url = rawUrl.trim().toLowerCase();
  if (!url) return 'unknown';

  // Wikidich / Wikicv
  if (
    url.includes('wikicv.org') ||
    url.includes('wikicv.net') ||
    url.includes('truyenwikidich') ||
    url.includes('wikidichvip') ||
    url.includes('wikidich.com') ||
    url.includes('wikidich.net')
  ) {
    return 'wikicv';
  }

  // Sangtacviet
  if (
    url.includes('sangtacviet.pro') ||
    url.includes('sangtacviet.app') ||
    url.includes('sangtacviet.com') ||
    url.includes('sangtacviet.vip') ||
    url.includes('sangtacviet.me')
  ) {
    return 'sangtacviet';
  }

  // Chiasename Blog
  if (url.includes('chiasename.blogspot.com') || url.includes('chiasenames.blogspot.com')) {
    return 'chiasename';
  }

  return 'unknown';
}

export function getSiteName(siteId: SupportedSiteId): string {
  const found = SUPPORTED_SITES.find((s) => s.id === siteId);
  return found ? found.name : 'Nguồn chưa xác định';
}
