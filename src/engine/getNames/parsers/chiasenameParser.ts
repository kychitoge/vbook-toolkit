import { ExtractResult, NamePackage, ScrapeProgress } from '../types';
import { fetchScraperSafe, fetchTextSafe } from '../corsProxyHelper';
import { normalizeWhitespace, parseNameText } from '../textHelper';

const domParser = new DOMParser();

function parseSlugTitle(url: string): string {
  const slug = url.split('/').pop()?.replace('.html', '') || 'Chiasename';
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function parseChiasename(
  url: string,
  onProgress?: (p: ScrapeProgress) => void
): Promise<ExtractResult> {
  onProgress?.({ status: 'connecting', message: 'Đang kết nối đến Chiasename Blog...' });

  const bookTitle = parseSlugTitle(url);
  let rawLines: string[] = [];

  // Strategy 1: Thử trích xuất siêu tốc qua Cloudflare Worker scraper (CORS: *, ~500ms)
  try {
    const scraped = await fetchScraperSafe(
      url,
      '.post-body p, .entry-content p, div.entry-content p, .post-body div'
    );
    if (scraped && scraped.length > 0) {
      rawLines = scraped.map(normalizeWhitespace);
    }
  } catch (err) {
    console.warn('[chiasenameParser] Scraper worker error, fallback to HTML parser:', err);
  }

  // Strategy 2: Fallback qua HTML document parser
  if (rawLines.length === 0) {
    const pageHtml = await fetchTextSafe(url);
    const htmlDoc = domParser.parseFromString(pageHtml, 'text/html');
    const elements = htmlDoc.querySelectorAll(
      'div.entry-content > p, .post-body p, .post-body div, .entry-content div'
    );

    if (elements.length > 0) {
      rawLines = [...elements].map((el) => normalizeWhitespace(el.textContent || ''));
    } else {
      const body = htmlDoc.querySelector('.post-body, .entry-content');
      if (body) rawLines = [normalizeWhitespace(body.textContent || '')];
    }
  }

  const { content, names } = parseNameText(rawLines.join('\n'));

  if (!content || names.length === 0) {
    throw new Error('Không tìm thấy danh sách Names hợp lệ trên bài viết này!');
  }

  const packages: NamePackage[] = [
    {
      id: 'chiasename_pkg',
      title: bookTitle,
      totalCount: names.length,
      site: 'chiasename',
      content,
      names,
      originalName: `Chiasename_${bookTitle.replace(/\s+/g, '_')}`,
    },
  ];

  onProgress?.({ status: 'done', message: `Hoàn tất! ${names.length} names từ Chiasename.` });

  return {
    bookTitle,
    sourceUrl: url,
    site: 'chiasename',
    siteName: 'Chiasename Blog',
    packages,
    totalNames: names.length,
  };
}
