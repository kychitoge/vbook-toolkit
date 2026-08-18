import { ExtractResult, NameItem, NamePackage, ScrapeProgress } from '../types';
import { fetchJsonSafe, fetchTextSafe } from '../corsProxyHelper';
import { parseNameText } from '../textHelper';

// Single reusable DOMParser instance
const domParser = new DOMParser();

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getBaseUrl(url: string): string {
  try {
    const { protocol, host } = new URL(url);
    return `${protocol}//${host}`;
  } catch {
    return 'https://wikicv.org';
  }
}

function parseBookId(htmlDoc: Document, htmlText: string): string | null {
  const input = htmlDoc.getElementById('bookId') as HTMLInputElement | null;
  if (input?.value) return input.value.trim();

  return htmlText.match(/var\s+bookId\s*=\s*["']([^"']+)["']/)?.[1]?.trim() ?? null;
}

function parseBookTitle(htmlDoc: Document): string {
  const el =
    htmlDoc.querySelector('.book-title, .cover-info h2, h1.title') ??
    htmlDoc.querySelector('title');
  return el?.textContent?.trim().replace(/\s*\|\s*Wikidich.*$/i, '') || 'Truyện Wikidich';
}

function getListTitle(wrapper: Element | null, index: number, id: string): string {
  const text = wrapper?.querySelector('.list-name')?.textContent?.trim().replace(/\s+/g, ' ');
  return text || (id === 'COMMON' ? 'Name hợp tác' : `Gói ${index + 1}`);
}

function getListTotal(wrapper: Element | null): string {
  return wrapper?.querySelector('.list-total')?.textContent?.trim() || '';
}

interface ListMeta { id: string; title: string; total: string }

function parseNameLists(htmlContent: string): ListMeta[] {
  const doc = domParser.parseFromString(htmlContent, 'text/html');
  const map = new Map<string, ListMeta>();

  const addEntry = (id: string | null, wrapper: Element | null, index: number) => {
    if (!id || map.has(id)) return;
    map.set(id, { id, title: getListTitle(wrapper, index, id), total: getListTotal(wrapper) });
  };

  doc.querySelectorAll('input[name="nameListId"][value]')
    .forEach((el, i) => addEntry(el.getAttribute('value'), el.closest('.name-list'), i));

  doc.querySelectorAll('[data-action="loadNameList"][data-id]')
    .forEach((el, i) => addEntry(el.getAttribute('data-id'), el.closest('.name-list'), i));

  return [...map.values()];
}

function parseNameContent(htmlContent: string): ReturnType<typeof parseNameText> {
  const doc = domParser.parseFromString(htmlContent, 'text/html');

  // Strategy 1: #listName li với data attributes
  const items = doc.querySelectorAll('#listName li');
  if (items.length > 0) {
    const names: NameItem[] = [];
    const lines: string[] = [];
    items.forEach((li) => {
      const chinese = li.getAttribute('data-ncn')?.trim();
      const vietnamese = li.getAttribute('data-nvi')?.trim();
      if (chinese && vietnamese) {
        const raw = `${chinese}=${vietnamese}`;
        names.push({ chinese, vietnamese, raw });
        lines.push(raw);
      } else {
        const text = li.textContent?.trim() || '';
        if (text) lines.push(text);
      }
    });
    return { content: lines.join('\n'), names };
  }

  // Strategy 2: textarea/div #ddListName
  const container = doc.getElementById('ddListName');
  if (container) {
    return parseNameText(container.textContent || (container as HTMLElement).innerText || '');
  }

  return { content: '', names: [] };
}

function makePackage(
  item: ListMeta,
  bookTitle: string,
  content: string,
  names: NameItem[]
): NamePackage {
  return {
    id: item.id,
    title: item.total ? `${item.title} (${item.total} names)` : item.title,
    totalCount: names.length || content.split('\n').filter(Boolean).length,
    site: 'wikicv',
    content,
    names,
    originalName: `${bookTitle}_${item.title || item.id}`,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function parseWikicv(
  url: string,
  onProgress?: (p: ScrapeProgress) => void
): Promise<ExtractResult> {
  onProgress?.({ status: 'connecting', message: 'Đang kết nối đến Wikidich / Wikicv...' });

  const pageHtml = await fetchTextSafe(url);
  const htmlDoc = domParser.parseFromString(pageHtml, 'text/html');
  const baseUrl = getBaseUrl(url);
  const bookTitle = parseBookTitle(htmlDoc);
  const bookId = parseBookId(htmlDoc, pageHtml);

  const packages: NamePackage[] = [];

  if (bookId) {
    onProgress?.({
      status: 'fetching_meta',
      message: `Book ID: ${bookId} — Đang tải danh sách các gói Name...`,
    });

    try {
      const listHtml = await fetchTextSafe(`${baseUrl}/book-name-list?bookId=${encodeURIComponent(bookId)}`);
      const nameLists = parseNameLists(listHtml);

      if (nameLists.length > 0) {
        onProgress?.({
          status: 'fetching_packages',
          message: `Tìm thấy ${nameLists.length} gói — Đang tải song song với tốc độ cao...`,
          totalPackages: nameLists.length,
          currentPackage: 0,
        });

        // Tải toàn bộ các gói Name SONG SONG (Parallel fetch) để tối ưu tốc độ phản hồi tối đa
        const packagePromises = nameLists.map(async (item) => {
          try {
            const data = await fetchJsonSafe<{ data?: { content?: string } }>(
              `${baseUrl}/name-list?bookId=${encodeURIComponent(bookId)}&id=${encodeURIComponent(item.id)}`
            );
            const { content, names } = parseNameContent(data?.data?.content || '');
            if (content) {
              return makePackage(item, bookTitle, content, names);
            }
          } catch (err) {
            console.warn(`[wikicvParser] Bỏ qua gói ${item.id}:`, err);
          }
          return null;
        });

        const results = await Promise.allSettled(packagePromises);
        results.forEach((res) => {
          if (res.status === 'fulfilled' && res.value) {
            packages.push(res.value);
          }
        });
      }
    } catch (err) {
      console.warn('[wikicvParser] Không tải được book-name-list, fallback trang chính:', err);
    }
  }

  // Fallback: parse trực tiếp trang truyện
  if (packages.length === 0) {
    onProgress?.({ status: 'parsing', message: 'Đang bóc tách từ trang chính...' });
    const { content, names } = parseNameContent(pageHtml);
    if (!content) throw new Error('Không tìm thấy danh sách Names trên trang này!');
    packages.push({
      id: 'default',
      title: bookTitle,
      totalCount: names.length || content.split('\n').filter(Boolean).length,
      site: 'wikicv',
      content,
      names,
      originalName: bookTitle,
    });
  }

  const totalNames = packages.reduce((s, p) => s + p.totalCount, 0);
  onProgress?.({ status: 'done', message: `Hoàn tất! ${packages.length} gói — ${totalNames} names.` });

  return { bookTitle, sourceUrl: url, site: 'wikicv', siteName: 'Wikidich', packages, totalNames };
}
