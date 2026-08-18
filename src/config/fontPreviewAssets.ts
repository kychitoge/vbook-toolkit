export const CDN_BASE_URL = 'https://toolkit-cdn.vbookext.me';

export interface FontItem {
  id: string;
  name: string;
  family: string;
  filename: string;
  category: 'serif' | 'sans' | 'display';
  weight?: string;
  style?: 'normal' | 'italic';
  isCustom?: boolean;
  customBlobUrl?: string;
}

export interface BackgroundItem {
  id: string;
  name: string;
  filename: string;
  thumbnailUrl: string;
  fullUrl: string;
  isCustom?: boolean;
  customBlobUrl?: string;
}

export const DEFAULT_SYSTEM_FONT: FontItem = {
  id: 'system-default',
  name: 'Mặc định (Hệ thống)',
  family: 'inherit',
  filename: '',
  category: 'sans',
};

// 94 Fonts tuyển chọn (Bao gồm Font Mặc định Hệ thống + 93 Fonts CDN)
export const FONTS_DATA: FontItem[] = [
  DEFAULT_SYSTEM_FONT,
  // 1. Amasis Kobo
  { id: 'amasis-kobo-regular', name: 'Amasis Kobo Regular', family: 'amasis-kobo-regular', filename: 'amasis-kobo-regular.ttf', category: 'serif', weight: 'normal' },
  { id: 'amasis-kobo-bold', name: 'Amasis Kobo Bold', family: 'amasis-kobo-bold', filename: 'amasis-kobo-bold.ttf', category: 'serif', weight: 'bold' },
  { id: 'amasis-kobo-italic', name: 'Amasis Kobo Italic', family: 'amasis-kobo-italic', filename: 'amasis-kobo-italic.ttf', category: 'serif', style: 'italic' },
  { id: 'amasis-kobo-bolditalic', name: 'Amasis Kobo Bold Italic', family: 'amasis-kobo-bolditalic', filename: 'amasis-kobo-bolditalic.ttf', category: 'serif', weight: 'bold', style: 'italic' },

  // 2. Avenir
  { id: 'avenir-regular', name: 'Avenir Regular', family: 'avenir-regular', filename: 'avenir.ttf', category: 'sans', weight: 'normal' },
  { id: 'avenir-bold', name: 'Avenir Bold', family: 'avenir-bold', filename: 'avenir-bold.ttf', category: 'sans', weight: 'bold' },
  { id: 'avenir-italic', name: 'Avenir Italic', family: 'avenir-italic', filename: 'avenir-italic.ttf', category: 'sans', style: 'italic' },
  { id: 'avenir-bolditalic', name: 'Avenir Bold Italic', family: 'avenir-bolditalic', filename: 'avenir-bolditalic.ttf', category: 'sans', weight: 'bold', style: 'italic' },

  // 3. Bookerly (Amazon Kindle Standard)
  { id: 'bookerly-regular', name: 'Bookerly Regular', family: 'bookerly-regular', filename: 'bookerly-regular.ttf', category: 'serif', weight: 'normal' },
  { id: 'bookerly-bold', name: 'Bookerly Bold', family: 'bookerly-bold', filename: 'bookerly-bold.ttf', category: 'serif', weight: 'bold' },
  { id: 'bookerly-italic', name: 'Bookerly Italic', family: 'bookerly-italic', filename: 'bookerly-regularitalic.ttf', category: 'serif', style: 'italic' },
  { id: 'bookerly-bolditalic', name: 'Bookerly Bold Italic', family: 'bookerly-bolditalic', filename: 'bookerly-bolditalic.ttf', category: 'serif', weight: 'bold', style: 'italic' },

  // 4. Bokerlam / Bokerlam San
  { id: 'bokerlam-regular', name: 'Bokerlam Regular', family: 'bokerlam-regular', filename: 'bokerlam.ttf', category: 'serif', weight: 'normal' },
  { id: 'bokerlam-bold', name: 'Bokerlam Bold', family: 'bokerlam-bold', filename: 'bokerlamb.ttf', category: 'serif', weight: 'bold' },
  { id: 'bokerlam-italic', name: 'Bokerlam Italic', family: 'bokerlam-italic', filename: 'bokerlami.ttf', category: 'serif', style: 'italic' },
  { id: 'bokerlam-san-regular', name: 'Bokerlam San Regular', family: 'bokerlam-san-regular', filename: 'bokerlam-san.ttf', category: 'sans', weight: 'normal' },
  { id: 'bokerlam-san-bold', name: 'Bokerlam San Bold', family: 'bokerlam-san-bold', filename: 'bokerlam-san-bold.ttf', category: 'sans', weight: 'bold' },
  { id: 'bokerlam-san-italic', name: 'Bokerlam San Italic', family: 'bokerlam-san-italic', filename: 'bokerlam-san-italic.ttf', category: 'sans', style: 'italic' },
  { id: 'bokerlam-san-bolditalic', name: 'Bokerlam San Bold Italic', family: 'bokerlam-san-bolditalic', filename: 'bokerlam-san-bold-italic.ttf', category: 'sans', weight: 'bold', style: 'italic' },

  // 5. Caecilia
  { id: 'caecilia-regular', name: 'Caecilia Regular', family: 'caecilia-regular', filename: 'caecilia-regular.ttf', category: 'serif', weight: 'normal' },
  { id: 'caecilia-bold', name: 'Caecilia Bold', family: 'caecilia-bold', filename: 'caecilia-bold.ttf', category: 'serif', weight: 'bold' },
  { id: 'caecilia-italic', name: 'Caecilia Italic', family: 'caecilia-italic', filename: 'caecilia-italic.ttf', category: 'serif', style: 'italic' },
  { id: 'caecilia-bolditalic', name: 'Caecilia Bold Italic', family: 'caecilia-bolditalic', filename: 'caecilia-bold-italic.ttf', category: 'serif', weight: 'bold', style: 'italic' },

  // 6. Comfortaa
  { id: 'comfortaa-regular', name: 'Comfortaa Regular', family: 'comfortaa-regular', filename: 'comfortaa-regular.ttf', category: 'sans', weight: 'normal' },
  { id: 'comfortaa-bold', name: 'Comfortaa Bold', family: 'comfortaa-bold', filename: 'comfortaa-bold.ttf', category: 'sans', weight: 'bold' },

  // 7. Comic Taxy
  { id: 'comictaxy-regular', name: 'Comic Taxy Regular', family: 'comictaxy-regular', filename: 'comictaxy.ttf', category: 'display', weight: 'normal' },
  { id: 'comictaxy-bold', name: 'Comic Taxy Bold', family: 'comictaxy-bold', filename: 'comictaxyb.ttf', category: 'display', weight: 'bold' },
  { id: 'comictaxy-italic', name: 'Comic Taxy Italic', family: 'comictaxy-italic', filename: 'comictaxyi.ttf', category: 'display', style: 'italic' },
  { id: 'kicomictaxy', name: 'KiComic Taxy', family: 'kicomictaxy', filename: 'kicomictaxy.ttf', category: 'display' },

  // 8. Cormorant Infant
  { id: 'cormorantinfant-regular', name: 'Cormorant Infant Regular', family: 'cormorantinfant-regular', filename: 'cormorantinfant-regular.ttf', category: 'serif', weight: 'normal' },
  { id: 'cormorantinfant-bold', name: 'Cormorant Infant Bold', family: 'cormorantinfant-bold', filename: 'cormorantinfant-bold.ttf', category: 'serif', weight: 'bold' },
  { id: 'cormorantinfant-italic', name: 'Cormorant Infant Italic', family: 'cormorantinfant-italic', filename: 'cormorantinfant-italic.ttf', category: 'serif', style: 'italic' },
  { id: 'cormorantinfant-bolditalic', name: 'Cormorant Infant Bold Italic', family: 'cormorantinfant-bolditalic', filename: 'cormorantinfant-bolditalic.ttf', category: 'serif', weight: 'bold', style: 'italic' },

  // 9. Crimson Pro
  { id: 'crimsonpro-regular', name: 'Crimson Pro Regular', family: 'crimsonpro-regular', filename: 'crimsonpro.ttf', category: 'serif', weight: 'normal' },
  { id: 'crimsonpro-bold', name: 'Crimson Pro Bold', family: 'crimsonpro-bold', filename: 'crimsonpro-bold.ttf', category: 'serif', weight: 'bold' },
  { id: 'crimsonpro-italic', name: 'Crimson Pro Italic', family: 'crimsonpro-italic', filename: 'crimsonpro-italic.ttf', category: 'serif', style: 'italic' },
  { id: 'crimsonpro-bolditalic', name: 'Crimson Pro Bold Italic', family: 'crimsonpro-bolditalic', filename: 'crimsonpro-bolditalic.ttf', category: 'serif', weight: 'bold', style: 'italic' },

  // 10. Dragon & Ember Taxy
  { id: 'dragon', name: 'Dragon', family: 'dragon', filename: 'dragon.ttf', category: 'display' },
  { id: 'embertaxy-regular', name: 'Ember Taxy Regular', family: 'embertaxy-regular', filename: 'embertaxy.ttf', category: 'sans' },
  { id: 'embertaxy-bold', name: 'Ember Taxy Bold', family: 'embertaxy-bold', filename: 'embertaxyb.ttf', category: 'sans', weight: 'bold' },
  { id: 'embertaxy-italic', name: 'Ember Taxy Italic', family: 'embertaxy-italic', filename: 'embertaxyi.ttf', category: 'sans', style: 'italic' },

  // 11. Fern Micro
  { id: 'fernmicro-regular', name: 'Fern Micro Regular', family: 'fernmicro-regular', filename: 'fernmicro-regular-testing.ttf', category: 'serif' },
  { id: 'fernmicro-italic', name: 'Fern Micro Italic', family: 'fernmicro-italic', filename: 'fernmicro-italic-testing.ttf', category: 'serif', style: 'italic' },

  // 12. Georgia
  { id: 'georgia-regular', name: 'Georgia Regular', family: 'georgia-regular', filename: 'georgia.ttf', category: 'serif', weight: 'normal' },
  { id: 'georgia-bold', name: 'Georgia Bold', family: 'georgia-bold', filename: 'georgiab.ttf', category: 'serif', weight: 'bold' },
  { id: 'georgia-italic', name: 'Georgia Italic', family: 'georgia-italic', filename: 'georgiai.ttf', category: 'serif', style: 'italic' },
  { id: 'georgia-bolditalic', name: 'Georgia Bold Italic', family: 'georgia-bolditalic', filename: 'georgiaz.ttf', category: 'serif', weight: 'bold', style: 'italic' },

  // 13. Hand Taxy & Linotte
  { id: 'handtaxy', name: 'Hand Taxy', family: 'handtaxy', filename: 'handtaxy.ttf', category: 'display' },
  { id: 'linotte-light', name: 'Linotte Light', family: 'linotte-light', filename: 'linotte-light.ttf', category: 'sans' },
  { id: 'linotte-regular', name: 'Linotte Regular', family: 'linotte-regular', filename: 'linotte-regular.ttf', category: 'sans' },
  { id: 'linotte-semibold', name: 'Linotte Semi Bold', family: 'linotte-semibold', filename: 'linotte-semi-bold.ttf', category: 'sans' },
  { id: 'linotte-bold', name: 'Linotte Bold', family: 'linotte-bold', filename: 'linotte-bold.ttf', category: 'sans', weight: 'bold' },
  { id: 'linotte-heavy', name: 'Linotte Heavy', family: 'linotte-heavy', filename: 'linotte-heavy.ttf', category: 'sans', weight: 'bold' },

  // 14. Literata (Google Play Books Standard)
  { id: 'literata-regular', name: 'Literata Regular', family: 'literata-regular', filename: 'literata-regular.ttf', category: 'serif', weight: 'normal' },
  { id: 'literata-bold', name: 'Literata Bold', family: 'literata-bold', filename: 'literata-bold.ttf', category: 'serif', weight: 'bold' },
  { id: 'literata-italic', name: 'Literata Italic', family: 'literata-italic', filename: 'literata-italic.ttf', category: 'serif', style: 'italic' },
  { id: 'literata-bolditalic', name: 'Literata Bold Italic', family: 'literata-bolditalic', filename: 'literata-bolditalic.ttf', category: 'serif', weight: 'bold', style: 'italic' },

  // 15. Lora
  { id: 'lora-regular', name: 'Lora Regular', family: 'lora-regular', filename: 'lora-regular.ttf', category: 'serif', weight: 'normal' },
  { id: 'lora-bold', name: 'Lora Bold', family: 'lora-bold', filename: 'lora-bold.ttf', category: 'serif', weight: 'bold' },
  { id: 'lora-italic', name: 'Lora Italic', family: 'lora-italic', filename: 'lora-italic.ttf', category: 'serif', style: 'italic' },
  { id: 'lora-bolditalic', name: 'Lora Bold Italic', family: 'lora-bolditalic', filename: 'lora-bolditalic.ttf', category: 'serif', weight: 'bold', style: 'italic' },

  // 16. Merriweather
  { id: 'merriweather-regular', name: 'Merriweather Regular', family: 'merriweather-regular', filename: 'merriweather-regular.ttf', category: 'serif', weight: 'normal' },
  { id: 'merriweather-bold', name: 'Merriweather Bold', family: 'merriweather-bold', filename: 'merriweather-bold.ttf', category: 'serif', weight: 'bold' },
  { id: 'merriweather-italic', name: 'Merriweather Italic', family: 'merriweather-italic', filename: 'merriweather-italic.ttf', category: 'serif', style: 'italic' },
  { id: 'merriweather-bolditalic', name: 'Merriweather Bold Italic', family: 'merriweather-bolditalic', filename: 'merriweather-bolditalic.ttf', category: 'serif', weight: 'bold', style: 'italic' },

  // 17. Muli
  { id: 'muli-regular', name: 'Muli Regular', family: 'muli-regular', filename: 'muli-regular.ttf', category: 'sans', weight: 'normal' },
  { id: 'muli-bold', name: 'Muli Bold', family: 'muli-bold', filename: 'muli-bold.ttf', category: 'sans', weight: 'bold' },
  { id: 'muli-italic', name: 'Muli Italic', family: 'muli-italic', filename: 'muli-italic.ttf', category: 'sans', style: 'italic' },
  { id: 'muli-bolditalic', name: 'Muli Bold Italic', family: 'muli-bolditalic', filename: 'muli-bolditalic.ttf', category: 'sans', weight: 'bold', style: 'italic' },

  // 18. Niramit
  { id: 'niramit-regular', name: 'Niramit Regular', family: 'niramit-regular', filename: 'niramit-regular.ttf', category: 'sans', weight: 'normal' },
  { id: 'niramit-bold', name: 'Niramit Bold', family: 'niramit-bold', filename: 'niramit-bold.ttf', category: 'sans', weight: 'bold' },
  { id: 'niramit-italic', name: 'Niramit Italic', family: 'niramit-italic', filename: 'niramit-italic.ttf', category: 'sans', style: 'italic' },
  { id: 'niramit-bolditalic', name: 'Niramit Bold Italic', family: 'niramit-bolditalic', filename: 'niramit-bolditalic.ttf', category: 'sans', weight: 'bold', style: 'italic' },

  // 19. Noticia Text
  { id: 'noticiatext-regular', name: 'Noticia Text Regular', family: 'noticiatext-regular', filename: 'noticiatext-regular.ttf', category: 'serif', weight: 'normal' },
  { id: 'noticiatext-bold', name: 'Noticia Text Bold', family: 'noticiatext-bold', filename: 'noticiatext-bold.ttf', category: 'serif', weight: 'bold' },
  { id: 'noticiatext-italic', name: 'Noticia Text Italic', family: 'noticiatext-italic', filename: 'noticiatext-regularitalic.ttf', category: 'serif', style: 'italic' },
  { id: 'noticiatext-bolditalic', name: 'Noticia Text Bold Italic', family: 'noticiatext-bolditalic', filename: 'noticiatext-bolditalic.ttf', category: 'serif', weight: 'bold', style: 'italic' },

  // 20. Noto Sans & Noto Serif
  { id: 'notosans-regular', name: 'Noto Sans Regular', family: 'notosans-regular', filename: 'notosans-regular.ttf', category: 'sans' },
  { id: 'notosans-display', name: 'Noto Sans Display', family: 'notosans-display', filename: 'notosansdisplay-variablefont-wdthwght.ttf', category: 'sans' },
  { id: 'notoserif-variable', name: 'Noto Serif Variable', family: 'notoserif-variable', filename: 'notoserif-variablefont-wdthwght.ttf', category: 'serif' },

  // 21. Ovaly & Palatino Lam
  { id: 'ovaly-regular', name: 'Ovaly Regular', family: 'ovaly-regular', filename: 'ovaly-regular.ttf', category: 'display' },
  { id: 'palatinolam-regular', name: 'Palatino Lam Regular', family: 'palatinolam-regular', filename: 'palatinolam-regular.ttf', category: 'serif' },
  { id: 'palatinolam-bold', name: 'Palatino Lam Bold', family: 'palatinolam-bold', filename: 'palatinolam-bold.ttf', category: 'serif', weight: 'bold' },
  { id: 'palatinolam-italic', name: 'Palatino Lam Italic', family: 'palatinolam-italic', filename: 'palatinolam-italic.ttf', category: 'serif', style: 'italic' },

  // 22. Pecita & UVN
  { id: 'pecita', name: 'Pecita', family: 'pecita', filename: 'pecita.otf', category: 'display' },
  { id: 'uvn-maychup-r', name: 'UVN Maychup Regular', family: 'uvn-maychup-r', filename: 'uvnmaychup-r.ttf', category: 'display' },
  { id: 'uvn-maychup-b', name: 'UVN Maychup Bold', family: 'uvn-maychup-b', filename: 'uvnmaychup-b.ttf', category: 'display', weight: 'bold' },
  { id: 'uvn-maychup-i', name: 'UVN Maychup Italic', family: 'uvn-maychup-i', filename: 'uvnmaychup-i.ttf', category: 'display', style: 'italic' },
  { id: 'uvn-maychup-bi', name: 'UVN Maychup Bold Italic', family: 'uvn-maychup-bi', filename: 'uvnmaychup-bi.ttf', category: 'display', weight: 'bold', style: 'italic' },
  { id: 'uvn-saigon-r', name: 'UVN Saigon Regular', family: 'uvn-saigon-r', filename: 'uvnsaigon-r.ttf', category: 'display' },
  { id: 'uvn-saigon-b', name: 'UVN Saigon Bold', family: 'uvn-saigon-b', filename: 'uvnsaigon-b.ttf', category: 'display', weight: 'bold' },
  { id: 'uvn-saigon-i', name: 'UVN Saigon Italic', family: 'uvn-saigon-i', filename: 'uvnsaigon-i.ttf', category: 'display', style: 'italic' },
  { id: 'uvn-saigon-bi', name: 'UVN Saigon Bold Italic', family: 'uvn-saigon-bi', filename: 'uvnsaigon-bi.ttf', category: 'display', weight: 'bold', style: 'italic' },
];

// Danh sách định dạng phần mở rộng thực tế của 96 ảnh nền
const bgExtensions: Record<number, string> = {
  1: 'jpeg', 2: 'jpg', 3: 'jpg', 4: 'jpg', 5: 'webp', 6: 'jpg', 7: 'webp', 8: 'webp', 9: 'webp', 10: 'webp',
  11: 'webp', 12: 'webp', 13: 'webp', 14: 'webp', 15: 'webp', 16: 'webp', 17: 'webp', 18: 'webp', 19: 'webp', 20: 'webp',
  21: 'webp', 22: 'webp', 23: 'webp', 24: 'webp', 25: 'webp', 26: 'jpg', 27: 'jpg', 28: 'jpg', 29: 'webp', 30: 'webp',
  31: 'jpg', 32: 'jpg', 33: 'jpg', 34: 'png', 35: 'jpg', 36: 'png', 37: 'jpg', 38: 'png', 39: 'jpg', 40: 'jpg',
  41: 'jpg', 42: 'jpg', 43: 'jpg', 44: 'jpg', 45: 'jpg', 46: 'jpg', 47: 'jpg', 48: 'jpg', 49: 'jpg', 50: 'jpg',
  51: 'jpg', 52: 'jpg', 53: 'jpg', 54: 'jpg', 55: 'jpg', 56: 'jpg', 57: 'jpg', 58: 'jpg', 59: 'jpg', 60: 'jpg',
  61: 'jpg', 62: 'jpg', 63: 'jpg', 64: 'jpg', 65: 'jpg', 66: 'jpg', 67: 'jpg', 68: 'jpg', 69: 'jpg', 70: 'jpg',
  71: 'jpg', 72: 'jpg', 73: 'jpg', 74: 'jpg', 75: 'jpg', 76: 'jpg', 77: 'jpg', 78: 'jpg', 79: 'jpg', 80: 'jpg',
  81: 'jpg', 82: 'jpg', 83: 'jpg', 84: 'jpg', 85: 'jpg', 86: 'jpg', 87: 'jpg', 88: 'jpg', 89: 'png', 90: 'png',
  91: 'png', 92: 'jpg', 93: 'jpg', 94: 'jpg', 95: 'jpg', 96: 'jpg'
};

// 96 Backgrounds chuẩn hóa: background_1 -> background_96
export const BACKGROUNDS_DATA: BackgroundItem[] = Array.from({ length: 96 }, (_, idx) => {
  const index = idx + 1;
  const ext = bgExtensions[index] || 'jpg';
  const filename = `background_${index}.${ext}`;
  const url = `${CDN_BASE_URL}/background/${filename}`;
  return {
    id: `bg-${index}`,
    name: `Hình Nền ${index}`,
    filename,
    thumbnailUrl: url,
    fullUrl: url,
  };
});

// Helper lấy Font URL từ CDN
export const getFontCdnUrl = (filename: string): string => {
  return `${CDN_BASE_URL}/font/${filename}`;
};

// Đoạn văn bản mẫu đọc truyện thực tế (Tiếng Việt đầy đủ ngữ cảnh & hội thoại)
export const DEFAULT_SAMPLE_TEXT = `Chương 1: Dưới Ánh Trăng Ngàn Năm

Gió đêm khẽ lướt qua tán lá tiêu điều, mang theo hơi thở lành lạnh của sương mộc vùng sơn cước. Giữa màn đêm tĩnh mịch, ánh trăng vằng vặc rọi xuống từng phiến đá phủ rêu xanh.

Diệp Phong khẽ thở dài, nâng chén trà đã nguội lạnh, ánh mắt xa xăm nhìn về phía chân trời vô tận:
"Trần thế vạn biến, tuế nguyệt như thoi đưa. Ba ngàn năm phiêu bạt, rốt cuộc tâm này vẫn vương vấn hồng trần sao?"

Bên cạnh, tiếng suối reo róc rách hòa cùng tiếng côn trùng rả rích tạo nên một khúc nhạc thanh bình hiếm có. Hắn nhắm mắt lại, cảm nhận từng luồng thiên địa linh khí nhẹ nhàng thẩm thấu vào kinh mạch, tĩnh lặng mà hùng hậu như đại dương sâu thẳm.
`