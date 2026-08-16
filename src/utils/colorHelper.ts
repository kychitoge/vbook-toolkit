import React from 'react';

/**
 * Kiểm tra và chuẩn hóa mã màu HEX (hỗ trợ cả 3 ký tự và 6 ký tự, có # hoặc không có #).
 * Ví dụ: "ff4d4f" -> "#ff4d4f", "#1677ff" -> "#1677ff"
 */
export function normalizeHexColor(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const normalized = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(normalized)) {
    return normalized.toLowerCase();
  }
  return null;
}

/**
 * Phân tích danh sách nhiều dòng mã màu HEX.
 */
export function parseHexColorLines(rawText: string): {
  validColors: string[];
  invalidLines: number[];
  lineCount: number;
} {
  const lines = rawText.split(/\r?\n/);
  const validColors: string[] = [];
  const invalidLines: number[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const color = normalizeHexColor(trimmed);
    if (color) {
      validColors.push(color);
    } else {
      invalidLines.push(index + 1);
    }
  });

  const lineCount = Math.min(15, Math.max(4, lines.length + 1));

  return { validColors, invalidLines, lineCount };
}

/**
 * Tạo CSS Linear Gradient từ danh sách mã màu HEX hợp lệ.
 */
export function generateGradientStyle(validColors: string[]): React.CSSProperties {
  if (validColors.length === 0) {
    return { color: '#64748b' };
  }
  if (validColors.length === 1) {
    return {
      backgroundImage: `linear-gradient(90deg, ${validColors[0]}, ${validColors[0]})`,
    };
  }
  const colorStops = validColors.join(', ');
  return {
    backgroundImage: `linear-gradient(90deg, ${colorStops}, ${validColors[0]})`,
  };
}
