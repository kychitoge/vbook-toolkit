import { ExtractResult, ScrapeProgress, SupportedSiteId } from './types';
import { detectWebsite, getSiteName } from './urlDetector';
import { parseWikicv } from './parsers/wikicvParser';
import { parseSangtacviet } from './parsers/sangtacvietParser';
import { parseChiasename } from './parsers/chiasenameParser';

export * from './types';
export * from './urlDetector';
export * from './exportHelper';
export * from './corsProxyHelper';
export * from './textHelper';

const PARSERS: Record<
  Exclude<SupportedSiteId, 'unknown'>,
  (url: string, onProgress?: (p: ScrapeProgress) => void) => Promise<ExtractResult>
> = {
  wikicv: parseWikicv,
  sangtacviet: parseSangtacviet,
  chiasename: parseChiasename,
};

/**
 * Hàm điều phối chính: Nhận diện nguồn URL và tự động gọi Parser tương ứng
 */
export async function extractNames(
  url: string,
  onProgress?: (progress: ScrapeProgress) => void
): Promise<ExtractResult> {
  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    throw new Error('Vui lòng nhập đường dẫn (URL) truyện cần lấy Names!');
  }

  const siteId = detectWebsite(trimmedUrl);

  if (siteId === 'unknown' || !(siteId in PARSERS)) {
    throw new Error(
      'Trang web này chưa được hỗ trợ! Hiện tại Get Names hỗ trợ Wikidich/Wikicv, Sangtacviet và Chiasename Blog.'
    );
  }

  const parser = PARSERS[siteId as keyof typeof PARSERS];
  if (!parser) {
    throw new Error(`Chưa có parser phù hợp cho nguồn: ${getSiteName(siteId)}`);
  }

  return parser(trimmedUrl, onProgress);
}
