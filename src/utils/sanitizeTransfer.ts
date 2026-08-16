/**
 * Chuẩn hóa email / text thành cú pháp chuyển khoản ngân hàng an toàn cho NAPAS / VietQR.
 * Thay thế các ký tự @, ., -, _ thành khoảng trắng và loại bỏ ký tự đặc biệt.
 * Ví dụ: "lehongky@gmail.com" -> "lehongky gmail com"
 */
export function sanitizeEmailForBanking(email: string): string {
  if (!email || !email.trim()) return '';

  return email
    .toLowerCase()
    .trim()
    .replace(/[@._\-+]/g, ' ')       // Thay thế các ký tự @ . - _ + thành dấu cách
    .replace(/[^a-z0-9\s]/g, '')     // Bỏ tất cả ký tự lạ ngoài chữ số và dấu cách
    .replace(/\s+/g, ' ')            // Gộp nhiều dấu cách liên tiếp thành 1 dấu cách
    .trim();
}

/**
 * Sinh chuỗi nội dung chuyển khoản Donate chuẩn:
 * Ví dụ: "lehongky gmail com donate vbook premium"
 */
export function generateDonateTransferContent(email: string, suffix: string = 'donate vbook premium'): string {
  const sanitized = sanitizeEmailForBanking(email);
  if (!sanitized) return suffix;
  return `${sanitized} ${suffix}`.trim();
}

/**
 * Sinh chuỗi nội dung chuyển khoản Name Color chuẩn:
 * - Gói màu: "lehongky gmail com color ff4d4f faad14 52c41a"
 * - Gói combo: "lehongky gmail com premium color ff4d4f faad14 52c41a"
 */
export function generateColorTransferContent(
  email: string,
  colorsWithoutHash: string[],
  isCombo: boolean = false
): string {
  const sanitized = sanitizeEmailForBanking(email);
  const colorStr = colorsWithoutHash.join(' ');
  const emailPart = sanitized || 'email';
  const prefix = isCombo ? 'premium color' : 'color';
  return `${emailPart} ${prefix} ${colorStr}`.trim();
}

