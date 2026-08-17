export type ToolCategory = 'install_guide' | 'donate_premium' | 'other_tools';

export interface ToolItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  author: string;
  route: string;
  category: ToolCategory;
  iconName: 'HeartHandshake' | 'Palette' | 'BookOpen' | 'Download' | 'Code2' | 'Boxes' | 'Layers' | 'Type';
  isExternal?: boolean;
  externalUrl?: string;
}

export interface CategoryGroup {
  id: ToolCategory;
  title: string;
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'install_guide',
    title: 'Cài đặt và hướng dẫn sử dụng',
  },
  {
    id: 'donate_premium',
    title: 'Donate và premium',
  },
  {
    id: 'other_tools',
    title: 'Công cụ khác',
  },
];

export const TOOLS_CONFIG: ToolItem[] = [
  // 1. CÀI ĐẶT VÀ HƯỚNG DẪN SỬ DỤNG
  {
    id: 'download',
    title: 'Tải Ứng Dụng vBook',
    tag: 'Cài đặt',
    category: 'install_guide',
    author: 'vBook Team',
    description: 'Tổng hợp link tải bộ cài đặt mới nhất cho Android (APK, Beta) và iOS.',
    route: '/download',
    iconName: 'Download',
  },
  {
    id: 'hdsd',
    title: 'Hướng Dẫn Sử Dụng',
    tag: 'Tài liệu',
    category: 'install_guide',
    author: 'duongden, ngatngay',
    description: 'Tài liệu hướng dẫn sử dụng toàn bộ tính năng của app vBook từ cơ bản đến nâng cao.',
    route: '/hdsd',
    iconName: 'BookOpen',
    isExternal: true,
    externalUrl: 'https://vbookapp.gitbook.io/huong-dan-su-dung',
  },

  // 2. DONATE VÀ PREMIUM
  {
    id: 'premium',
    title: 'Nâng Cấp Premium (Admin vBook)',
    tag: 'Tài khoản',
    category: 'donate_premium',
    author: 'vBook Community',
    description: 'Ủng hộ kinh phí cho Admin vBook và kích hoạt toàn bộ đặc quyền tài khoản Premium.',
    route: '/premium',
    iconName: 'HeartHandshake',
  },
  {
    id: 'name-color',
    title: 'Tên Nhiều Màu',
    tag: 'Cá nhân hóa',
    category: 'donate_premium',
    author: 'ngatngay',
    description: 'Xem trước hiệu ứng màu gradient cho nickname và sinh mã kích hoạt nhanh.',
    route: '/name-color',
    iconName: 'Palette',
  },

  // 3. CÔNG CỤ KHÁC
  {
    id: 'font-preview',
    title: 'Thử Font & Nền',
    tag: 'Xem trước',
    category: 'other_tools',
    author: 'duongden',
    description: 'Thử nghiệm trực quan font chữ và hình nền đọc truyện trước khi cài đặt.',
    route: '/font-preview',
    iconName: 'Type',
  },
  {
    id: 'rule-tester',
    title: 'vBook Rule Tester',
    tag: 'Dịch thuật',
    category: 'other_tools',
    author: 'duongden',
    description: 'Soát lỗi cú pháp quy tắc QuickTranslate và thử nghiệm dịch trực tiếp câu tiếng Trung.',
    route: '/rule-tester',
    iconName: 'Code2',
  },
  {
    id: 'extension',
    title: 'Danh Sách Nguồn Mở Rộng',
    tag: 'Nguồn truyện',
    category: 'other_tools',
    author: 'kychi',
    description: 'Kho extension nguồn đọc truyện phong phú dành cho ứng dụng vBook.',
    route: '/extension',
    iconName: 'Boxes',
    isExternal: true,
    externalUrl: 'https://www.vbookext.me',
  },
  {
    id: 'qt',
    title: 'Data QT Collection',
    tag: 'Dữ liệu QT',
    category: 'other_tools',
    author: 'kychi',
    description: 'Bộ sưu tập dữ liệu và từ điển QuickTranslate tổng hợp cho cộng đồng.',
    route: '/qt',
    iconName: 'Layers',
    isExternal: true,
    externalUrl: 'https://qt.vbookext.me/collections',
  },
];
