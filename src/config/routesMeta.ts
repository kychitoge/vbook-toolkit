export interface RouteMeta {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export const SITE_BASE_URL = 'https://tool.vbookext.me';
export const DEFAULT_OG_IMAGE = 'https://tool.vbookext.me/icon-64.png';

export const ROUTES_META: Record<string, RouteMeta> = {
  '/': {
    title: 'vBook Toolkit — Bộ công cụ tiện ích cộng đồng vBook',
    description:
      'Tổng hợp các công cụ, tiện ích dành cho người dùng và cộng đồng dịch giả vBook: Nâng cấp Premium, Tên nhiều màu, Tải app APK/IPA, Rule Tester, Get Names, Thử Font.',
    keywords:
      'vbook, vbook toolkit, vbook app, quicktranslate, vbook rule tester, name color, download vbook apk ipa, get name wikidich sangtacviet, donate vbook',
    ogTitle: 'vBook Toolkit — Bộ công cụ tiện ích cộng đồng vBook',
    ogDescription:
      'Tổng hợp các công cụ, tiện ích dành cho người dùng và cộng đồng dịch giả vBook.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/download': {
    title: 'Download | vBook Toolkit',
    description: 'Tải vBook mới nhất cho thiết bị của bạn',
    keywords:
      'tai vbook, download vbook apk, vbook beta, vbook ipa, vbook ios, vbook android, vbook app',
    ogTitle: 'Tải Ứng Dụng vBook — vBook Toolkit',
    ogDescription: 'Tải vBook mới nhất cho Android và iOS.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/premium': {
    title: 'Premium | vBook Toolkit',
    description:
      'Ủng hộ kinh phí duy trì máy chủ cho vBook và kích hoạt tài khoản Premium vĩnh viễn.',
    keywords:
      'nang cap vbook premium, donate vbook, premium vbook, vbook vip, mua premium vbook',
    ogTitle: 'Nâng Cấp Premium & Donate vBook — vBook Toolkit',
    ogDescription:
      'Ủng hộ kinh phí duy trì máy chủ cho Admin vBook và kích hoạt Premium.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/name-color': {
    title: 'Name Color | vBook Toolkit',
    description: 'Xem hiệu ứng màu sắc cho nickname tài khoản vBook.',
    keywords:
      'doi mau nick vbook, vbook ten nhieu mau, vbook ten mau sac, gradient nickname vbook, name color vbook',
    ogTitle: 'Tạo Tên Nhiều Màu vBook (Gradient Nickname) — vBook Toolkit',
    ogDescription: 'Công cụ tạo hiệu ứng màu sắc cho nickname vBook.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/font-preview': {
    title: 'Font & Background | vBook Toolkit',
    description: 'Xem trước font chữ tiếng Việt và hình nền đọc truyện vBook.',
    keywords:
      'font chu vbook, hinh nen doc truyen vbook, font tieng viet dep, preview font vbook',
    ogTitle: 'Font Chữ & Hình Nền Đọc Truyện — vBook Toolkit',
    ogDescription:
      'Xem trước font chữ tiếng Việt và hình nền đọc truyện vBook và tải xuống các tài nguyên có sẵn',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/rule-tester': {
    title: 'Rule Tester | vBook Toolkit',
    description:
      'Công cụ kiểm thử và sửa lỗi quy tắc QT dành cho dịch giả vBook.',
    keywords:
      'vbook rule tester, quicktranslate rule, kiem tra quy tac vbook, dich truyen trung viet, regex rule tester',
    ogTitle: 'vBook Rule Tester — vBook Toolkit',
    ogDescription:
      'Công cụ kiểm thử và sửa lỗi quy tắc QT dành cho dịch giả vBook.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/get-name': {
    title: 'Get Names | vBook Toolkit',
    description:
      'Công cụ tải từ điển tên riêng (Names) QuickTranslate từ Wikidich, Sangtacviet, Chiasename.',
    keywords:
      'get name wikidich, get name sangtacviet, get name chiasename, tai tu dien name vbook, quicktranslate name downloader',
    ogTitle: 'Get Names — vBook Toolkit',
    ogDescription:
      'Bóc tách và tải từ điển tên riêng QuickTranslate từ Wikidich, Sangtacviet, Chiasename.',
    ogImage: DEFAULT_OG_IMAGE,
  },
};
