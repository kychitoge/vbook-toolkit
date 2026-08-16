/**
 * Helper sinh URL VietQR chuẩn theo ngân hàng, STK, số tiền và lời nhắn
 */
export function getVietQrUrl(
  bankCode: string = 'MB',
  accountNumber: string = '9704229200720097',
  amount: number,
  content: string
): string {
  return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
    content
  )}`;
}

/**
 * Tải ảnh mã QR trực tiếp về thiết bị người dùng
 */
export async function downloadQrImage(
  qrUrl: string,
  fileName: string = 'vietqr-vbook.png'
): Promise<boolean> {
  try {
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    return true;
  } catch {
    window.open(qrUrl, '_blank');
    return false;
  }
}
