export interface RouteMeta {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
}

export const SITE_BASE_URL = 'https://tool.vbookext.me';
export const DEFAULT_OG_IMAGE = 'https://tool.vbookext.me/icon-64.png';
export const DOWNLOAD_OG_IMAGE = 'https://tool.vbookext.me/og-download.png';

/**
 * Quy ước cho ogTitle / ogDescription (theo Microsoft Style Guide, tiếng Việt):
 * - ogTitle: tối đa 60 ký tự, mẫu "Tên tính năng | vBook Toolkit", viết hoa kiểu câu.
 * - ogDescription: 60-125 ký tự (tối đa 160), kết thúc bằng dấu chấm, xưng "bạn" khi cần.
 * - Thuật ngữ: tải xuống, phông chữ, hình nền, biệt danh, chuyển màu, xem trước, kiểm thử, quy tắc.
 * - Giữ nguyên tên riêng: vBook, Premium, QuickTranslate, Android, iOS, Windows, macOS, Linux.
 */
export const ROUTES_META: Record<string, RouteMeta> = {
  '/': {
    title: 'vBook Toolkit — Bộ công cụ tiện ích cộng đồng vBook',
    description:
      'Tổng hợp các công cụ, tiện ích dành cho người dùng và cộng đồng dịch giả vBook: Nâng cấp Premium, Tên nhiều màu, Tải app APK/IPA, Rule Tester, Get Names, Thử Font.',
    keywords:
      'vbook, vbook toolkit, vbook app, quicktranslate, vbook rule tester, name color, download vbook apk ipa, get name wikidich sangtacviet, donate vbook',
    ogTitle: 'vBook Toolkit | Công cụ cho cộng đồng vBook',
    ogDescription:
      'Nâng cấp Premium, tải ứng dụng, đổi màu tên, kiểm thử quy tắc và nhiều tiện ích khác dành cho người dùng và dịch giả vBook.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/download': {
    title: 'Download | vBook Toolkit',
    description: 'Tải vBook mới nhất cho Android, iOS, Windows, macOS và Linux.',
    keywords:
      'tai vbook, download vbook apk, vbook beta, vbook ipa, vbook ios testflight, vbook desktop, vbook windows msi, vbook macos dmg, vbook linux deb rpm, vbook app',
    ogTitle: 'Tải ứng dụng vBook | vBook Toolkit',
    ogDescription:
      'Tải vBook mới nhất cho Android, iOS, Windows, macOS và Linux. Đọc truyện miễn phí, riêng tư và mượt mà.',
    ogImage: DOWNLOAD_OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
  },
  '/premium': {
    title: 'Premium | vBook Toolkit',
    description:
      'Ủng hộ kinh phí duy trì máy chủ cho vBook và kích hoạt tài khoản Premium vĩnh viễn.',
    keywords:
      'nang cap vbook premium, donate vbook, premium vbook, vbook vip, mua premium vbook',
    ogTitle: 'Nâng cấp Premium | vBook Toolkit',
    ogDescription:
      'Ủng hộ kinh phí duy trì máy chủ để kích hoạt Premium vĩnh viễn cho tài khoản vBook của bạn.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/name-color': {
    title: 'Name Color | vBook Toolkit',
    description: 'Xem hiệu ứng màu sắc cho nickname tài khoản vBook.',
    keywords:
      'doi mau nick vbook, vbook ten nhieu mau, vbook ten mau sac, gradient nickname vbook, name color vbook',
    ogTitle: 'Tên nhiều màu | vBook Toolkit',
    ogDescription:
      'Xem trước hiệu ứng chuyển màu cho biệt danh tài khoản vBook của bạn.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/font-preview': {
    title: 'Font & Background | vBook Toolkit',
    description: 'Xem trước font chữ tiếng Việt và hình nền đọc truyện vBook.',
    keywords:
      'font chu vbook, hinh nen doc truyen vbook, font tieng viet dep, preview font vbook',
    ogTitle: 'Phông chữ và hình nền đọc truyện | vBook Toolkit',
    ogDescription:
      'Xem trước phông chữ tiếng Việt và hình nền đọc truyện, rồi tải xuống tài nguyên bạn thích.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/rule-tester': {
    title: 'Rule Tester | vBook Toolkit',
    description:
      'Công cụ kiểm thử và sửa lỗi quy tắc QT dành cho dịch giả vBook.',
    keywords:
      'vbook rule tester, quicktranslate rule, kiem tra quy tac vbook, dich truyen trung viet, regex rule tester',
    ogTitle: 'Kiểm thử quy tắc QuickTranslate | vBook Toolkit',
    ogDescription:
      'Kiểm thử và sửa lỗi quy tắc QuickTranslate (QT) ngay trên trình duyệt, dành cho dịch giả vBook.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/get-name': {
    title: 'Get Names | vBook Toolkit',
    description:
      'Công cụ tải từ điển tên riêng (Names) QuickTranslate từ Wikidich, Sangtacviet, Chiasename.',
    keywords:
      'get name wikidich, get name sangtacviet, get name chiasename, tai tu dien name vbook, quicktranslate name downloader',
    ogTitle: 'Tải từ điển tên riêng | vBook Toolkit',
    ogDescription:
      'Tải từ điển tên riêng (Names) cho QuickTranslate từ Wikidich, Sangtacviet và Chiasename.',
    ogImage: DEFAULT_OG_IMAGE,
  },
};