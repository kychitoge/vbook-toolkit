import { ExtractResult, NamePackage, ScrapeProgress } from '../types';
import { fetchScraperSafe, fetchTextSafe } from '../corsProxyHelper';
import { parseNameText } from '../textHelper';

const domParser = new DOMParser();

function parseLinesFromRaw(raw: string): ReturnType<typeof parseNameText> {
  const cleaned = raw
    .split(/\r?\n/)
    .map((l) => l.replace(/^\$/, '').trim())
    .join('\n');
  return parseNameText(cleaned);
}

export async function parseSangtacviet(
  url: string,
  onProgress?: (p: ScrapeProgress) => void
): Promise<ExtractResult> {
  onProgress?.({ status: 'connecting', message: 'Đang kết nối đến Sangtacviet...' });

  const cleanUrl = url.trim().replace(/\/$/, '');
  const parts = cleanUrl.split('/truyen/');

  if (parts.length < 2) {
    throw new Error(
      'Đường dẫn Sangtacviet không hợp lệ!\nĐịnh dạng mẫu: https://sangtacviet.pro/truyen/[host]/[type]/[bookid]'
    );
  }

  const hostDomain = parts[0];
  const [bookHost, , bookId] = parts[1].split('/');

  if (!bookHost || !bookId) {
    throw new Error('Không thể trích xuất book host hoặc book ID từ đường dẫn Sangtacviet!');
  }

  onProgress?.({
    status: 'fetching_meta',
    message: `Đang tải Names: [${bookHost} — ${bookId}]...`,
  });

  const apiUrl = `${hostDomain}/namesys.php?host=${encodeURIComponent(bookHost)}&book=${encodeURIComponent(bookId)}`;
  const packages: NamePackage[] = [];

  // Strategy 1: Thử trích xuất siêu tốc qua Cloudflare Worker scraper (~300ms, CORS: *)
  try {
    const scrapedDivs = await fetchScraperSafe(apiUrl, 'div');
    if (scrapedDivs && scrapedDivs.length > 0) {
      scrapedDivs.forEach((divText, i) => {
        const { content, names } = parseLinesFromRaw(divText);
        if (content && names.length > 0) {
          packages.push({
            id: `stv_${i + 1}`,
            title: `Gói Name ${i + 1}`,
            totalCount: names.length,
            site: 'sangtacviet',
            content,
            names,
            originalName: `Sangtacviet_${bookHost}_${bookId}_${i + 1}`,
          });
        }
      });
    }
  } catch (err) {
    console.warn('[sangtacvietParser] Scraper error, fallback to HTML parser:', err);
  }

  // Strategy 2: Fallback qua fetchTextSafe và DOM parsing
  if (packages.length === 0) {
    const responseText = await fetchTextSafe(apiUrl);
    if (!responseText?.trim()) {
      throw new Error('Truyện này không có Names được chia sẻ trên Sangtacviet!');
    }

    const htmlDoc = domParser.parseFromString(responseText, 'text/html');
    const rows = htmlDoc.querySelectorAll('tr');

    rows.forEach((tr, idx) => {
      const cells = tr.querySelectorAll('th, td');
      if (cells.length < 2) return;

      const title = cells[0]?.textContent?.trim() || `Gói Name ${idx + 1}`;
      const rawContent = cells[1]?.textContent?.trim() || '';
      const date = cells[3]?.textContent?.trim() || '';
      const { content, names } = parseLinesFromRaw(rawContent);

      if (content && names.length > 0) {
        packages.push({
          id: `stv_${idx + 1}`,
          title,
          totalCount: names.length,
          date,
          site: 'sangtacviet',
          content,
          names,
          originalName: `Sangtacviet_${bookHost}_${bookId}_${idx + 1}`,
        });
      }
    });

    if (packages.length === 0) {
      const { content, names } = parseLinesFromRaw(responseText);
      if (content && names.length > 0) {
        packages.push({
          id: 'stv_main',
          title: `Gói Name [${bookHost}-${bookId}]`,
          totalCount: names.length,
          site: 'sangtacviet',
          content,
          names,
          originalName: `Sangtacviet_${bookHost}_${bookId}`,
        });
      }
    }
  }

  if (packages.length === 0) {
    throw new Error('Truyện này không có Names được chia sẻ trên Sangtacviet!');
  }

  const totalNames = packages.reduce((s, p) => s + p.totalCount, 0);
  onProgress?.({ status: 'done', message: `Hoàn tất! ${packages.length} gói — ${totalNames} names.` });

  return {
    bookTitle: `Sangtacviet [${bookHost}-${bookId}]`,
    sourceUrl: url,
    site: 'sangtacviet',
    siteName: 'Sangtacviet',
    packages,
    totalNames,
  };
}
