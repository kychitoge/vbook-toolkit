export type SupportedSiteId = 'wikicv' | 'sangtacviet' | 'chiasename' | 'unknown';

export interface SupportedSiteMeta {
  id: SupportedSiteId;
  name: string;
  domain: string;
}

export interface NameItem {
  chinese: string;
  vietnamese: string;
  raw?: string;
}

export interface NamePackage {
  id: string;
  title: string;
  totalCount: number;
  date?: string;
  site: SupportedSiteId;
  content: string; // Nội dung raw (.txt) đã được chuẩn hóa UTF-8: Chinese=Vietnamese
  names?: NameItem[];
  originalName?: string;
}

export interface ExtractResult {
  bookTitle?: string;
  sourceUrl: string;
  site: SupportedSiteId;
  siteName: string;
  packages: NamePackage[];
  totalNames: number;
}

export type ScrapeProgressStatus =
  | 'connecting'
  | 'fetching_meta'
  | 'fetching_packages'
  | 'parsing'
  | 'done'
  | 'error';

export interface ScrapeProgress {
  status: ScrapeProgressStatus;
  message: string;
  currentPackage?: number;
  totalPackages?: number;
}
