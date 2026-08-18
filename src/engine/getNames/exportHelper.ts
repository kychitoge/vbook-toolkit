import JSZip from 'jszip';

/** Chuẩn hóa tên file an toàn cho mọi hệ điều hành */
export function makeSafeFilename(value?: string, defaultName = 'vBook_Names'): string {
  if (!value) return defaultName;
  return value
    .trim()
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 100);
}

/** Kích hoạt tải file về máy qua anchor element */
function triggerDownload(url: string, filename: string): void {
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Tải file văn bản thuần (.txt) về máy */
export function downloadTextFile(filename: string, content: string): void {
  const safeName = filename.endsWith('.txt') ? filename : `${filename}.txt`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  triggerDownload(URL.createObjectURL(blob), safeName);
}

/** Đóng gói nhiều file thành .zip và tải về */
export async function downloadZipFile(
  zipFilename: string,
  files: { filename: string; content: string }[]
): Promise<void> {
  const zip = new JSZip();

  files.forEach((f, idx) => {
    const safeName = makeSafeFilename(f.filename?.replace(/\.txt$/, '') || `name_${idx + 1}`) + '.txt';
    zip.file(safeName, f.content);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  const safeZip = zipFilename.endsWith('.zip') ? zipFilename : `${zipFilename}.zip`;
  triggerDownload(URL.createObjectURL(blob), safeZip);
}
