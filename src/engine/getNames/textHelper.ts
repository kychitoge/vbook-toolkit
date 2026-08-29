import { NameItem } from './types';

/** Giải mã HTML entities (ví dụ: &amp;, &#39;, &quot;, &#x4e00;...) và chuẩn hóa ký tự Unicode */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  if (!text.includes('&')) return text;
  try {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent || text;
  } catch {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'");
  }
}

/** Chuẩn hóa &nbsp; và non-breaking space thành khoảng trắng thông thường */
export function normalizeWhitespace(text: string): string {
  return decodeHtmlEntities(text)
    .replace(/&nbsp;/g, ' ')
    .replace(/\u00a0/g, ' ');
}

/**
 * Parse 1 dòng text thành NameItem.
 * Hỗ trợ 2 định dạng: `Chinese=Vietnamese` (chuẩn vBook QT) và `Chinese\tVietnamese` (Chivi).
 * Trả về null nếu dòng không hợp lệ.
 */
export function parseNameLine(line: string): NameItem | null {
  const clean = normalizeWhitespace(line).trim();
  if (!clean || clean.startsWith('#')) return null;

  const eqIdx = clean.indexOf('=');
  if (eqIdx > 0) {
    const chinese = clean.slice(0, eqIdx).trim();
    const vietnamese = clean.slice(eqIdx + 1).trim();
    if (chinese) return { chinese, vietnamese, raw: `${chinese}=${vietnamese}` };
  }

  const tabIdx = clean.indexOf('\t');
  if (tabIdx > 0) {
    const chinese = clean.slice(0, tabIdx).trim();
    const vietnamese = clean.slice(tabIdx + 1).trim();
    if (chinese) return { chinese, vietnamese, raw: `${chinese}=${vietnamese}` };
  }

  return null;
}

/**
 * Parse toàn bộ chuỗi văn bản thành mảng NameItem + content chuẩn hóa.
 * Bỏ qua comment (#), dòng trống, và dòng không có dấu phân tách.
 */
export function parseNameText(
  rawText: string,
  requireSeparator = true
): { content: string; names: NameItem[] } {
  const names: NameItem[] = [];
  const lines: string[] = [];

  for (const line of rawText.split(/\r?\n/)) {
    const item = parseNameLine(line);
    if (item) {
      names.push(item);
      lines.push(item.raw!);
    } else if (!requireSeparator) {
      const clean = line.trim();
      if (clean && !clean.startsWith('#')) lines.push(clean);
    }
  }

  return { content: lines.join('\n'), names };
}
