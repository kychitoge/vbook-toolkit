import { useState, useEffect, useCallback, useRef } from 'react';
import { FontItem, getFontCdnUrl } from '../config/fontPreviewAssets';

export interface UseFontFaceLoaderReturn {
  activeFont: FontItem;
  setActiveFont: (font: FontItem) => void;
  isLoading: boolean;
  error: string | null;
  loadFont: (font: FontItem) => Promise<boolean>;
  loadCustomFontFile: (file: File) => Promise<FontItem | null>;
  customFonts: FontItem[];
}

export const useFontFaceLoader = (initialFont: FontItem): UseFontFaceLoaderReturn => {
  const [activeFont, setActiveFont] = useState<FontItem>(initialFont);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [customFonts, setCustomFonts] = useState<FontItem[]>([]);
  
  // Set lưu các font family đã được nạp thành công vào document.fonts
  const loadedFamilies = useRef<Set<string>>(new Set());

  const loadFont = useCallback(async (font: FontItem): Promise<boolean> => {
    // Nếu font mặc định hệ thống hoặc đã nạp rồi
    if (!font.filename || font.family === 'inherit' || font.id === 'system-default' || loadedFamilies.current.has(font.family)) {
      setIsLoading(false);
      setError(null);
      return true;
    }

    setIsLoading(true);
    setError(null);

    try {
      let fontSource: string;

      if (font.isCustom && font.customBlobUrl) {
        fontSource = `url(${font.customBlobUrl})`;
      } else {
        const fontUrl = getFontCdnUrl(font.filename);
        fontSource = `url(${fontUrl})`;
      }

      // Khởi tạo FontFace
      const fontFace = new FontFace(font.family, fontSource, {
        weight: font.weight || 'normal',
        style: font.style || 'normal',
      });

      // Tải và nạp font vào document
      const loadedFace = await fontFace.load();
      document.fonts.add(loadedFace);
      loadedFamilies.current.add(font.family);

      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Không thể nạp font chữ';
      console.warn(`Lỗi nạp font ${font.name}:`, errMsg);
      setError(`Không thể nạp font ${font.name}. Hãy kiểm tra kết nối CDN hoặc CORS.`);
      setIsLoading(false);
      return false;
    }
  }, []);

  // Xử lý nạp font cục bộ từ máy người dùng
  const loadCustomFontFile = useCallback(async (file: File): Promise<FontItem | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const cleanName = file.name.replace(/\.[^/.]+$/, '').trim();
      const customId = `custom-font-${Date.now()}`;
      const familyName = `CustomFont_${customId}`;
      const blobUrl = URL.createObjectURL(file);

      // Đọc array buffer để nạp FontFace
      const buffer = await file.arrayBuffer();
      const fontFace = new FontFace(familyName, buffer);
      const loadedFace = await fontFace.load();
      document.fonts.add(loadedFace);
      loadedFamilies.current.add(familyName);

      const newFontItem: FontItem = {
        id: customId,
        name: `${cleanName} (Cá nhân)`,
        family: familyName,
        filename: file.name,
        category: 'display',
        isCustom: true,
        customBlobUrl: blobUrl,
      };

      setCustomFonts((prev) => [newFontItem, ...prev]);
      setActiveFont(newFontItem);
      setIsLoading(false);
      return newFontItem;
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Lỗi xử lý file font';
      setError(`Không thể đọc file font cá nhân: ${errMsg}`);
      setIsLoading(false);
      return null;
    }
  }, []);

  // Tự động nạp font khi activeFont thay đổi
  useEffect(() => {
    loadFont(activeFont);
  }, [activeFont, loadFont]);

  return {
    activeFont,
    setActiveFont,
    isLoading,
    error,
    loadFont,
    loadCustomFontFile,
    customFonts,
  };
};
