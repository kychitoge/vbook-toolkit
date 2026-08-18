/** Helper hỗ trợ tải tài nguyên vượt rào cản CORS với tốc độ cao */

const CORS_PROXIES = [
  (url: string) => `https://proxy.cors.sh/${url}`,
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

const TIMEOUT_MS = 6_000;

function makeTimeoutSignal(ms = TIMEOUT_MS): AbortSignal {
  return AbortSignal.timeout ? AbortSignal.timeout(ms) : (() => {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), ms);
    return ctrl.signal;
  })();
}

// In-memory cache lưu kết quả fetch gần nhất trong 2 phút
const responseCache = new Map<string, { data: string; timestamp: number }>();
const CACHE_TTL_MS = 120_000;

/**
 * Fetch HTML / Text qua danh sách proxy có header Access-Control-Allow-Origin: * chuẩn
 */
export async function fetchTextSafe(targetUrl: string, options?: RequestInit): Promise<string> {
  const cached = responseCache.get(targetUrl);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  let lastError: unknown;

  for (const buildProxy of CORS_PROXIES) {
    const proxyUrl = buildProxy(targetUrl);
    try {
      const res = await fetch(proxyUrl, {
        ...options,
        signal: makeTimeoutSignal(),
      });
      if (res.ok) {
        const text = await res.text();
        if (text && text.length > 0) {
          responseCache.set(targetUrl, { data: text, timestamp: Date.now() });
          return text;
        }
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(
    lastError instanceof Error
      ? lastError.message
      : `Không thể kết nối đến máy chủ (${targetUrl}). Vui lòng kiểm tra lại đường dẫn.`
  );
}

/**
 * Trích xuất text siêu tốc qua Cloudflare Worker scraper (CORS: * mặc định, phản hồi ~300ms)
 */
export async function fetchScraperSafe(
  targetUrl: string,
  selector: string = 'div'
): Promise<string[]> {
  const cacheKey = `scrape_${targetUrl}_${selector}`;
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    try {
      return JSON.parse(cached.data);
    } catch {
      // ignore
    }
  }

  const workerUrl = `https://web.scraper.workers.dev/?url=${encodeURIComponent(targetUrl)}&selector=${encodeURIComponent(selector)}&scrape=text&pretty=true`;
  const res = await fetch(workerUrl, { signal: makeTimeoutSignal(7000) });
  if (!res.ok) throw new Error(`Scraper failed with status ${res.status}`);

  const json = await res.json();
  const items: string[] = json.result ? (Object.values(json.result).flat() as string[]) : [];

  if (items.length > 0) {
    responseCache.set(cacheKey, { data: JSON.stringify(items), timestamp: Date.now() });
  }

  return items;
}

export async function fetchJsonSafe<T = unknown>(targetUrl: string, options?: RequestInit): Promise<T> {
  const text = await fetchTextSafe(targetUrl, options);
  return JSON.parse(text) as T;
}
