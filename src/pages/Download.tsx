import React, { useEffect, useState, useRef } from 'react';
import {
  Download,
  BookOpen,
  Volume2,
  ShieldCheck,
  Zap,
  Sparkles,
  Languages,
  ChevronDown,
  Monitor,
  Send,
  MessageSquare,
  Globe,
  BookmarkCheck,
  Compass,
} from 'lucide-react';
import {
  OfficialReleases,
  INITIAL_RELEASES,
  fetchLatestReleases,
  IOS_APP_STORE_URL,
  GITHUB_LEGACY_APK_URL,
  OFFICIAL_SITE_URL,
  TELEGRAM_URL,
  DISCORD_URL,
  GITHUB_REPO_URL,
} from '../services/releaseService';

// Official Brand SVG Vector Icons
const AppleBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.61 1.34-.55.63-.99 1.68-.86 2.7.99.08 2-.46 2.54-1.19z" />
  </svg>
);

const AndroidBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.411 13.8559 8.127 12 8.127c-1.856 0-3.5908.284-5.1367.8227L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9974 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3433-4.1021-2.689-7.5743-6.1185-9.4396" />
  </svg>
);

const WindowsBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801" />
  </svg>
);

const LinuxBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.003 2c-2.485 0-4.5 2.015-4.5 4.5 0 .88.254 1.702.693 2.396C7.45 9.497 7 10.443 7 11.5c0 1.25.642 2.35 1.616 2.996C8.225 15.228 8 16.088 8 17c0 1.353.486 2.593 1.3 3.553C8.618 20.803 8 21.34 8 22h8c0-.66-.618-1.197-1.3-1.447.814-.96 1.3-2.2 1.3-3.553 0-.912-.225-1.772-.616-2.504C16.358 13.85 17 12.75 17 11.5c0-1.057-.45-2.003-1.193-2.604.439-.694.693-1.516.693-2.396 0-2.485-2.015-4.5-4.5-4.5zm-1.5 4a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z" />
  </svg>
);

export const DownloadPage: React.FC = () => {
  const [releases, setReleases] = useState<OfficialReleases>(INITIAL_RELEASES);

  // Tab ảnh chụp màn hình trong Showcase (0, 1, 2)
  const [activeScreenIndex, setActiveScreenIndex] = useState<number>(0);
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const [isIntersectingShowcase, setIsIntersectingShowcase] = useState<boolean>(false);

  // Active Orbit Feature Index (0 .. 4)
  const [activeOrbitIndex, setActiveOrbitIndex] = useState<number>(0);

  // Accordion FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Canvas ref cho đường lượn sóng orbit
  const orbitCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const orbitContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Tự động tải thông tin phiên bản mới nhất từ GitHub Releases theo thời gian thực
  useEffect(() => {
    let isMounted = true;
    fetchLatestReleases().then((data) => {
      if (isMounted) {
        setReleases(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Danh mục ảnh chụp thực tế từ Apple App Store CDN
  const appScreenshots = [
    {
      tab: 'Trình đọc',
      headline: 'Đọc truyện thoải mái & Tùy biến mọi chi tiết',
      desc: 'Tùy chỉnh font chữ, cỡ chữ, khoảng cách dòng, lật trang mượt 120Hz và chế độ đọc ban đêm bảo vệ mắt.',
      url: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/f4/3f/49/f43f491f-9655-50e8-5f00-7e5e9dba3b80/01-Screen-1.png/600x1300bb.webp',
    },
    {
      tab: 'Kệ sách',
      headline: 'Quản lý toàn bộ thư viện trong tầm tay',
      desc: 'Sắp xếp sách cá nhân theo danh mục, tự động lưu vị trí trang và tìm kiếm tác phẩm yêu thích nhanh chóng.',
      url: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/ee/81/b9/ee81b980-5211-00db-2f9a-4e95752f18dc/02-Screen-2.png/600x1300bb.webp',
    },
    {
      tab: 'Nghe & Dịch AI',
      headline: 'Nghe đọc tự nhiên & Dịch ngoại tuyến',
      desc: 'Giọng đọc AI tự nhiên khi di chuyển hoặc làm việc. Tra cứu và dịch nhanh câu từ trực tiếp không cần mạng.',
      url: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/1c/e5/1a/1ce51ab6-17d7-ff7b-69b4-bcd0fadab1cb/03-Screen-3.png/600x1300bb.webp',
    },
  ];

  // TỰ ĐỘNG CHUYỂN SCREENSHOT KHI LƯỚT ĐẾN KHU VỰC SHOWCASE
  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersectingShowcase(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersectingShowcase) return;

    const interval = setInterval(() => {
      setActiveScreenIndex((prev) => (prev + 1) % appScreenshots.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isIntersectingShowcase, appScreenshots.length]);

  // 5 tính năng Orbit chuẩn ngữ cảnh vbookapp.com
  const orbitFeatures = [
    {
      id: 'formats',
      title: 'Đọc đa định dạng',
      desc: 'Mở mượt mà EPUB, MOBI, AZW3, truyện tranh CBZ, PDF, PRC, TXT, DOCX và tài liệu.',
      icon: BookOpen,
      badge: '15+ định dạng',
    },
    {
      id: 'ai-voice',
      title: 'Giọng đọc AI tự nhiên',
      desc: 'Nghe đọc thành tiếng bằng giọng AI ngoại tuyến, ngữ điệu tự nhiên, không cần mạng.',
      icon: Volume2,
      badge: 'TTS ngoại tuyến',
    },
    {
      id: 'offline-trans',
      title: 'Dịch nhanh ngoại tuyến',
      desc: 'Tra cứu và dịch thuật câu từ tức thì ngay trên trang sách mà không tốn dữ liệu.',
      icon: Languages,
      badge: 'Không cần mạng',
    },
    {
      id: 'extensions',
      title: 'Trình duyệt & Nguồn mở rộng',
      desc: 'Tích hợp trình duyệt web và kết nối kho nguồn truyện phong phú từ cộng đồng.',
      icon: Compass,
      badge: 'Mở rộng thư viện',
    },
    {
      id: 'library',
      title: 'Kệ sách & Tiến độ đọc',
      desc: 'Tự động lưu lịch sử, đánh dấu trang và quản lý thư viện cá nhân gọn gàng.',
      icon: BookmarkCheck,
      badge: 'Quản lý dễ dàng',
    },
  ];

  // Canvas render đường cong uốn lượn nối tâm và các nút orbit kiểu eyedrop.ai
  useEffect(() => {
    const canvas = orbitCanvasRef.current;
    const container = orbitContainerRef.current;
    if (!canvas || !container) return;

    let animId: number;

    const renderLines = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const centerRadius = 145; // Bán kính vòng tròn trung tâm

      const time = Date.now() * 0.001;

      ctx.clearRect(0, 0, rect.width, rect.height);

      buttonRefs.current.forEach((btn, index) => {
        if (!btn) return;
        const bRect = btn.getBoundingClientRect();
        const btnCenterX = bRect.left + bRect.width / 2 - rect.left;
        const btnCenterY = bRect.top + bRect.height / 2 - rect.top;

        const angle = Math.atan2(btnCenterY - centerY, btnCenterX - centerX);
        const startX = centerX + centerRadius * Math.cos(angle);
        const startY = centerY + centerRadius * Math.sin(angle);

        const isActive = index === activeOrbitIndex;

        ctx.strokeStyle = isActive ? 'rgba(3, 143, 210, 0.75)' : 'rgba(3, 143, 210, 0.2)';
        ctx.lineWidth = isActive ? 2.5 : 1.5;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        const controlX1 =
          startX + (btnCenterX - startX) * 0.35 + Math.sin(time * 1.5 + index) * 14;
        const controlY1 =
          startY + (btnCenterY - startY) * 0.35 + Math.cos(time * 1.5 + index) * 14;
        const controlX2 =
          startX + (btnCenterX - startX) * 0.7 + Math.sin(time * 1.2 + index) * 10;
        const controlY2 =
          startY + (btnCenterY - startY) * 0.7 + Math.cos(time * 1.2 + index) * 10;

        ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, btnCenterX, btnCenterY);
        ctx.stroke();
      });

      animId = requestAnimationFrame(renderLines);
    };

    animId = requestAnimationFrame(renderLines);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeOrbitIndex]);

  // CÂU HỎI THƯỜNG GẶP (ĐỒNG BỘ 100% TỪ VBOOKAPP.COM/SUPPORT VÀ HƯỚNG DẪN CHÍNH THỨC)
  const faqs = [
    {
      q: 'vBook là gì?',
      a: 'vBook là ứng dụng đọc sách, truyện tranh và tài liệu cho thư viện cá nhân, kèm đọc thành tiếng bằng giọng AI, dịch ngoại tuyến, trình duyệt nguồn trực tuyến và cộng đồng đọc sách.',
    },
    {
      q: 'Cách thêm sách vào thư viện vBook như thế nào?',
      a: 'Mở tab "Thư viện", chọn thêm tệp sách từ thiết bị (EPUB, MOBI, PDF, CBZ...) hoặc thêm nguồn trực tuyến do bạn tự cấu hình. vBook không tích hợp sẵn nguồn nội dung nào; mọi nguồn đều do người dùng tự thêm.',
    },
    {
      q: 'vBook hỗ trợ những định dạng sách và tài liệu nào?',
      a: 'Ứng dụng hỗ trợ mở mượt mà EPUB, MOBI, AZW/AZW3, FB2, PRC, TXT, HTML, truyện tranh CBZ, ZIP, PDF, DOC/DOCX, HWP và UMD.',
    },
    {
      q: 'Dữ liệu đọc sách và quyền riêng tư được quản lý ra sao?',
      a: 'Thư viện, dấu trang và tiến độ đọc nằm cục bộ 100% trên thiết bị của bạn — không nằm trên máy chủ. Bạn có thể xóa tài khoản và dữ liệu cá nhân bất cứ lúc nào trong cài đặt ứng dụng.',
    },
    {
      q: 'Làm thế nào để báo cáo nội dung hoặc nhận hỗ trợ?',
      a: 'Trong cộng đồng, bạn có thể báo cáo nội dung hoặc chặn người dùng ngay trên bài viết. Khi gặp lỗi ứng dụng, bạn có thể gửi email kèm ảnh chụp tới support@vbookapp.com hoặc tham gia server Discord cộng đồng.',
    },
  ];

  const activeFeature = orbitFeatures[activeOrbitIndex];
  const ActiveIcon = activeFeature.icon;

  return (
    <div className="w-full -mt-6 sm:-mt-8 space-y-20 sm:space-y-32 pb-20 font-sans selection:bg-brand-primary selection:text-white">
      {/* ============================================================== */}
      {/* 1. HERO & APP INFO (SẠCH, GỌN, LOGO TRÒN, NÚT TẢI DUY NHẤT)   */}
      {/* ============================================================== */}
      <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-16 text-center flex flex-col items-center justify-center">
        {/* LOGO TRÒN HOÀN TOÀN (CẮT GỌT CHUẨN) */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-b from-sky-200 to-sky-50 dark:from-sky-900/40 dark:to-transparent flex items-center justify-center mb-6 shadow-md">
          <div className="w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-white dark:border-slate-800 flex items-center justify-center bg-[#038fd2]">
            <img
              src="/icon-64.png"
              alt="vBook Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* LOGO TYPOGRAPHY KHỔ LỚN */}
        <div className="mb-3">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-[#181d4a] dark:text-white flex items-center justify-center">
            <span>v</span>
            <span className="bg-gradient-to-r from-[#038fd2] via-[#0277b0] to-[#085f89] bg-clip-text text-transparent">
              Book
            </span>
          </h1>
        </div>

        {/* SUBTITLE GỌN GÀNG */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-normal text-[#181d4a]/90 dark:text-slate-200 max-w-xl px-4 tracking-tight leading-snug mb-8">
          Đọc sách và quản lý thư viện cá nhân — mượt mà, riêng tư.
        </h2>

        {/* 2 NÚT PILL TO BẢN ĐẶC TRƯNG CỦA EYEDROP.AI */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-lg px-4">
          {/* NÚT 1: ANDROID APK */}
          <a
            href={releases.android.universalApkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-60 h-16 rounded-full bg-[#181d4a] hover:bg-[#038fd2] text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 group px-5"
          >
            <AndroidBrandIcon className="w-7 h-7 text-white flex-shrink-0" />
            <div className="text-left">
              <div className="text-[11px] font-medium text-slate-300 group-hover:text-white/90 leading-tight">
                {releases.android.version ? `Bản v${releases.android.version}` : 'Bản mới nhất'}
              </div>
              <div className="text-[17px] font-bold leading-tight">
                Tải Android APK
              </div>
            </div>
          </a>

          {/* NÚT 2: APPLE APP STORE */}
          <a
            href={IOS_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-60 h-16 rounded-full bg-[#038fd2] hover:bg-[#0277b0] text-white flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 group px-5"
          >
            <AppleBrandIcon className="w-7 h-7 text-white flex-shrink-0" />
            <div className="text-left">
              <div className="text-[11px] font-medium text-white/80 leading-tight">
                Có sẵn trên
              </div>
              <div className="text-[17px] font-bold text-white leading-tight">
                App Store
              </div>
            </div>
          </a>
        </div>

        {/* DÒNG YÊU CẦU HỆ THỐNG GỌN */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-6 max-w-md px-4 leading-relaxed">
          Hỗ trợ iOS 15.1+ và Android 7.0+. Hoàn toàn miễn phí, không quảng cáo.
        </p>
      </section>

      {/* ============================================================== */}
      {/* 2. SHOWCASE (TỰ ĐỘNG CHẠY KHI LƯỚT ĐẾN NƠI)                    */}
      {/* ============================================================== */}
      <section ref={showcaseRef} className="relative px-4 max-w-5xl mx-auto text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#181d4a] dark:text-white tracking-tight">
            Mở sách. Thư giãn. Đọc mọi lúc.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-normal">
            Mở sách ngay, nghe đọc AI và lưu ngoại tuyến.
          </p>
        </div>

        {/* CONTAINER SHOWCASE THÍCH ỨNG THEME */}
        <div className="relative rounded-[32px] sm:rounded-[44px] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden p-6 sm:p-10 transition-colors">
          {/* Tabs chọn màn hình */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {appScreenshots.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveScreenIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  activeScreenIndex === idx
                    ? 'bg-brand-primary text-white shadow-md shadow-sky-500/20 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {item.tab}
              </button>
            ))}
          </div>

          {/* Vùng hiển thị màn hình & thuyết minh */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto text-left">
            {/* Mockup điện thoại */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-52 sm:w-60 aspect-[9/19] rounded-[32px] overflow-hidden border-4 border-slate-200 dark:border-slate-700 shadow-xl bg-slate-50 dark:bg-black relative">
                <img
                  src={appScreenshots[activeScreenIndex].url}
                  alt={appScreenshots[activeScreenIndex].headline}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>
            </div>

            {/* Mô tả tính năng gọn */}
            <div className="md:col-span-7 space-y-3 p-2">
              <h3 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                {appScreenshots[activeScreenIndex].headline}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {appScreenshots[activeScreenIndex].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. BA TRỤ CỘT CỐT LÕI                                          */}
      {/* ============================================================== */}
      <section className="px-4 max-w-5xl mx-auto text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#181d4a] dark:text-white tracking-tight">
            Dữ liệu luôn thuộc về bạn
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Xử lý hoàn toàn trên thiết bị cá nhân · Không máy chủ theo dõi
          </p>
        </div>

        {/* 3 THẺ SQUIRCLE ĐỒNG BỘ THEME */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900 p-7 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 text-center hover:shadow-md transition-all space-y-3">
            <div className="w-13 h-13 rounded-full bg-sky-50 dark:bg-sky-950/80 text-brand-primary flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              100% Riêng tư
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Dữ liệu và lịch sử đọc lưu trọn vẹn trên máy bạn. Không gửi bất kỳ dữ liệu nào ra ngoài.
            </p>
          </div>

          <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900 p-7 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 text-center hover:shadow-md transition-all space-y-3">
            <div className="w-13 h-13 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-500 flex items-center justify-center mx-auto shadow-xs">
              <Zap className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Tối ưu phần cứng
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Lật trang mượt mà 120Hz, hiển thị sắc nét trên màn hình E-ink và siêu tiết kiệm pin.
            </p>
          </div>

          <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900 p-7 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 text-center hover:shadow-md transition-all space-y-3">
            <div className="w-13 h-13 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-500 flex items-center justify-center mx-auto shadow-xs">
              <Sparkles className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Không thuê bao
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Trải nghiệm trọn vẹn $0. Không phí định kỳ hàng tháng và hoàn toàn không quảng cáo.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. TÍNH NĂNG NỔI BẬT (ORBIT CHUẨN VBOOKAPP.COM)                 */}
      {/* ============================================================== */}
      <section className="relative px-4 max-w-5xl mx-auto text-center space-y-6 overflow-hidden">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#181d4a] dark:text-white tracking-tight">
            Tính năng nổi bật
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Trải nghiệm đọc sách hoàn chỉnh từ offline đến online.
          </p>
        </div>

        {/* VÙNG ORBIT DESKTOP VÀ MOBILE */}
        <div
          ref={orbitContainerRef}
          className="relative w-full max-w-3xl mx-auto min-h-[420px] sm:min-h-[520px] flex items-center justify-center"
        >
          {/* Canvas vẽ các đường cong */}
          <canvas
            ref={orbitCanvasRef}
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* Vòng tròn trung tâm */}
          <div className="relative z-10 w-60 h-60 sm:w-72 sm:h-72 rounded-full border-2 border-brand-primary/40 dark:border-brand-primary shadow-xl bg-white dark:bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-6 text-center transition-all duration-300">
            <div className="space-y-2.5 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-sky-50 dark:bg-sky-950/80 flex items-center justify-center text-brand-primary border border-sky-100 dark:border-sky-800 shadow-sm">
                <ActiveIcon className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-semibold text-brand-primary bg-sky-50 dark:bg-sky-950 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                {activeFeature.badge}
              </span>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {activeFeature.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-[200px] leading-relaxed">
                {activeFeature.desc}
              </p>
            </div>
          </div>

          {/* 5 NÚT BẤM FLOATING TRÊN DESKTOP */}
          <button
            ref={(el) => (buttonRefs.current[0] = el)}
            type="button"
            onClick={() => setActiveOrbitIndex(0)}
            className={`hidden md:block absolute px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm z-20 cursor-pointer ${
              activeOrbitIndex === 0
                ? 'bg-brand-primary text-white scale-105 shadow-md shadow-sky-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-102 border border-slate-200 dark:border-slate-700'
            }`}
            style={{ top: '6%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            Đọc đa định dạng
          </button>

          <button
            ref={(el) => (buttonRefs.current[1] = el)}
            type="button"
            onClick={() => setActiveOrbitIndex(1)}
            className={`hidden md:block absolute px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm z-20 cursor-pointer ${
              activeOrbitIndex === 1
                ? 'bg-brand-primary text-white scale-105 shadow-md shadow-sky-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-102 border border-slate-200 dark:border-slate-700'
            }`}
            style={{ top: '35%', left: '86%', transform: 'translate(-50%, -50%)' }}
          >
            Giọng đọc AI tự nhiên
          </button>

          <button
            ref={(el) => (buttonRefs.current[2] = el)}
            type="button"
            onClick={() => setActiveOrbitIndex(2)}
            className={`hidden md:block absolute px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm z-20 cursor-pointer ${
              activeOrbitIndex === 2
                ? 'bg-brand-primary text-white scale-105 shadow-md shadow-sky-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-102 border border-slate-200 dark:border-slate-700'
            }`}
            style={{ top: '88%', left: '74%', transform: 'translate(-50%, -50%)' }}
          >
            Dịch nhanh ngoại tuyến
          </button>

          <button
            ref={(el) => (buttonRefs.current[3] = el)}
            type="button"
            onClick={() => setActiveOrbitIndex(3)}
            className={`hidden md:block absolute px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm z-20 cursor-pointer ${
              activeOrbitIndex === 3
                ? 'bg-brand-primary text-white scale-105 shadow-md shadow-sky-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-102 border border-slate-200 dark:border-slate-700'
            }`}
            style={{ top: '88%', left: '26%', transform: 'translate(-50%, -50%)' }}
          >
            Trình duyệt &amp; Tiện ích
          </button>

          <button
            ref={(el) => (buttonRefs.current[4] = el)}
            type="button"
            onClick={() => setActiveOrbitIndex(4)}
            className={`hidden md:block absolute px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm z-20 cursor-pointer ${
              activeOrbitIndex === 4
                ? 'bg-brand-primary text-white scale-105 shadow-md shadow-sky-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-102 border border-slate-200 dark:border-slate-700'
            }`}
            style={{ top: '35%', left: '14%', transform: 'translate(-50%, -50%)' }}
          >
            Kệ sách &amp; Tiến độ
          </button>
        </div>

        {/* NÚT WRAP CHO MOBILE */}
        <div className="flex md:hidden flex-wrap items-center justify-center gap-2 pt-2">
          {orbitFeatures.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveOrbitIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeOrbitIndex === idx
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PHIÊN BẢN MÁY TÍNH (SỬA LẠI 3 CARD ĐỒNG BỘ, ĐẸP, CHUẨN)      */}
      {/* ============================================================== */}
      <section className="px-4 max-w-5xl mx-auto text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#181d4a] dark:text-white tracking-tight">
            vBook cho Máy tính
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Trải nghiệm đọc màn hình lớn với các gói cài đặt chính thức.
          </p>
        </div>

        {/* 3 THẺ SQUIRCLE ĐỒNG NHẤT 100% CẤU TRÚC VÀ CHIỀU CAO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left">
          {/* WINDOWS */}
          <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/80 text-brand-primary flex items-center justify-center">
                <WindowsBrandIcon className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Windows
                </h4>
                {releases.desktop.version && (
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    v{releases.desktop.version}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Tương thích Windows 10 và 11 (64-bit). Cung cấp gói MSI tiêu chuẩn và bản Portable chạy ngay.
              </p>
            </div>

            <div className="pt-6 space-y-2 border-t border-slate-100 dark:border-slate-800 mt-6">
              <a
                href={releases.desktop.windowsMsiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-full bg-[#181d4a] hover:bg-[#038fd2] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải gói cài đặt (.msi)</span>
              </a>
              <div className="text-center pt-1">
                <a
                  href={releases.desktop.windowsPortableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-brand-primary dark:text-slate-400 dark:hover:text-brand-primary inline-flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Hoặc tải bản Portable (.exe)</span>
                </a>
              </div>
            </div>
          </div>

          {/* MACOS */}
          <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center">
                <AppleBrandIcon className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  macOS
                </h4>
                {releases.desktop.version && (
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    v{releases.desktop.version}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Tối ưu cho chip Apple Silicon (M1/M2/M3/M4) và chip Intel, hỗ trợ macOS 12 Monterey trở lên.
              </p>
            </div>

            <div className="pt-6 space-y-2 border-t border-slate-100 dark:border-slate-800 mt-6">
              <a
                href={releases.desktop.macDmgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-full bg-[#181d4a] hover:bg-[#038fd2] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải gói cài đặt (.dmg)</span>
              </a>
              <div className="text-center pt-1">
                <span className="text-xs text-slate-400 dark:text-slate-500 inline-block">
                  Hỗ trợ Apple Silicon &amp; Intel
                </span>
              </div>
            </div>
          </div>

          {/* LINUX (ICON TUX PENGUIN CHUẨN, KHÔNG CÒN HÌNH NẤM) */}
          <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <LinuxBrandIcon className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Linux
                </h4>
                {releases.desktop.version && (
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    v{releases.desktop.version}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Tương thích các phân phối Debian, Ubuntu (.deb), Fedora, RedHat và openSUSE (.rpm) 64-bit.
              </p>
            </div>

            <div className="pt-6 space-y-2 border-t border-slate-100 dark:border-slate-800 mt-6">
              <a
                href={releases.desktop.linuxDebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-full bg-[#181d4a] hover:bg-[#038fd2] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Gói Debian / Ubuntu (.deb)</span>
              </a>
              <div className="text-center pt-1">
                <a
                  href={releases.desktop.linuxRpmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-brand-primary dark:text-slate-400 dark:hover:text-brand-primary inline-flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Hoặc tải gói Fedora / RHEL (.rpm)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. FAQS ACCORDION (ĐỒNG BỘ 100% VBOOKAPP.COM/SUPPORT)           */}
      {/* ============================================================== */}
      <section className="px-4 max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#181d4a] dark:text-white tracking-tight">
            Câu hỏi thường gặp
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-[24px] sm:rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex-1">
                    {faq.q}
                  </h4>
                  <div
                    className={`w-10 h-10 rounded-full bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-brand-primary flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-brand-primary text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    <p className="pt-3.5">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. BOTTOM CALL TO ACTION                                       */}
      {/* ============================================================== */}
      <section className="px-4 max-w-3xl mx-auto text-center space-y-6 pt-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#181d4a] dark:text-white tracking-tight">
          Bắt đầu đọc cùng vBook ngay hôm nay
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Tải ứng dụng miễn phí trên điện thoại và máy tính.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto pt-2">
          <a
            href={releases.android.universalApkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-56 h-14 rounded-full bg-[#181d4a] hover:bg-[#038fd2] text-white flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg hover:scale-102"
          >
            <AndroidBrandIcon className="w-5 h-5 text-white" />
            <span className="text-sm font-bold">Tải Android APK</span>
          </a>

          <a
            href={IOS_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-56 h-14 rounded-full bg-[#038fd2] hover:bg-[#0277b0] text-white flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg hover:scale-102"
          >
            <AppleBrandIcon className="w-5 h-5 text-white" />
            <span className="text-sm font-bold">Tải trên App Store</span>
          </a>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. FOOTER: CHUẨN XÁC VỀ THẾ HỆ VBOOK VÀ BẢN QUYỀN VBOOKAPP.COM  */}
      {/* ============================================================== */}
      <footer className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl mx-auto text-center px-4">
        {/* Bản vBook 1 thế hệ cũ (đã ngừng phát triển) */}
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <span>vBook hiện tại là thế hệ 2. Bạn cần tìm lại thế hệ vBook 1 cũ (đã ngừng phát triển)? </span>
          <a
            href={GITHUB_LEGACY_APK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:underline font-medium inline-flex items-center gap-1"
          >
            <span>Tải bản vBook 1 trên GitHub</span>
          </a>
        </div>

        {/* Các liên kết cộng đồng chính thức */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600 dark:text-slate-400">
          <a
            href={OFFICIAL_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5 text-brand-primary" />
            <span>vbookapp.com</span>
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            <Send className="w-3.5 h-3.5 text-[#229ED9]" />
            <span>Telegram Tracker</span>
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
            <span>Discord</span>
          </a>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            <Monitor className="w-3.5 h-3.5 text-slate-500" />
            <span>GitHub Releases</span>
          </a>
        </div>

        <div className="text-[11px] text-slate-400 dark:text-slate-500 pb-2">
          © 2026 vBook · Đọc truyện và quản lý thư viện cá nhân
        </div>
      </footer>
    </div>
  );
};
