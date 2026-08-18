# 🛠️ vBook Toolkit — Bộ Công Cụ Tiện Ích Cộng Đồng vBook

Bộ công cụ web tiện ích tập trung (All-in-One Utility Hub) dành cho người dùng **vBook**.

Giao diện được thiết kế theo phong cách phẳng tối giản (**Flat System UI / Utility Tool**), hỗ trợ đầy đủ 2 chế độ Sáng / Tối (Light & Dark mode), chạy 100% Client-Side và tối ưu hóa hiệu năng tải siêu tốc trên mọi thiết bị.

---

## 🌟 Tính Năng Nổi Bật

| STT | Công cụ | Đường dẫn | Mô tả |
|:---:|---|:---:|---|
| 1 | **Tải Ứng Dụng vBook** | `/download` | Tải nhanh bộ cài đặt Android APK (Bản Beta mới nhất & Legacy), iOS IPA (Sideload) và kênh theo dõi Telegram Tracker. |
| 2 | **Nâng Cấp Premium** | `/premium` | Bảng so sánh quyền lợi Free vs Premium, sinh mã VietQR MB Bank tự động theo chuẩn ngân hàng NAPAS và hỗ trợ qua Discord. |
| 3 | **Tên Nhiều Màu (Gradient Name)** | `/name-color` | Xem trước nickname chuyển màu động (CSS Linear Gradient), tùy biến mã HEX (lên tới 15 dòng) và tạo mã QR kích hoạt gói Màu / Combo. |
| 4 | **vBook Rule Tester Web** | `/rule-tester` | Công cụ web soát lỗi cú pháp quy tắc QuickTranslate, thử nghiệm dịch trực tiếp, hỗ trợ Drag & Drop file lớn và xuất file `.txt`. |
| 5 | **Thử Font & Hình Nền** | `/font-preview` | Live Sandbox mô phỏng đọc truyện thực tế với 94 font chữ & 96 hình nền tuyển chọn, hỗ trợ nạp font/ảnh cá nhân và tải về 1-Click. |
| 6 | **Hướng Dẫn Sử Dụng** | `/hdsd` | Chuyển hướng tức thì (302) sang GitBook Hướng dẫn sử dụng vBook chính thức. |
| 7 | **Danh Sách Nguồn Mở Rộng** | `/extension` | Chuyển hướng tức thì sang kho Extension nguồn đọc truyện `vbookext.me`. |
| 8 | **Data QT Collection** | `/qt` | Chuyển hướng tức thì sang kho bộ sưu tập dữ liệu QuickTranslate `qt.vbookext.me/collections`. |
| 9 | **Get Names (Tải Names)** | `/get-name` | Tiện ích bóc tách và tải từ điển tên riêng (QuickTranslate) từ Wikidich, Sangtacviet, Chiasename kèm Live Sandbox & xuất file. |

---

## 🏗️ Công Nghệ Sử Dụng (Tech Stack)

* **Framework:** React 18 + TypeScript + Vite 6
* **Styling:** Tailwind CSS 3 + Vanilla CSS Base (`Azure Fresh Palette`)
* **Routing:** React Router DOM v6 (Hỗ trợ SPA client-side routing & Instant Redirects)
* **Icons:** Lucide React
* **Theme Engine:** Context API + Anti-Flash Early Detection Script + OS Preference Sync
* **Deployment:** Cloudflare Pages (Tương thích `_redirects` & `_headers`)

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Môi Trường Phát Triển

### 1. Yêu cầu hệ thống
* Node.js >= 18.0.0
* `pnpm` (khuyên dùng) hoặc `npm` / `yarn`

### 2. Cài đặt dependencies
```bash
pnpm install
```

### 3. Chạy môi trường Dev
```bash
pnpm run dev
```

### 4. Build Production
```bash
pnpm run build
```
Thư mục xuất bản: `dist/`

---

## 📂 Cấu Trúc Thư Mục

```
vbook-toolkit/
├── public/
│   ├── _headers            # Security & Caching Headers (Cloudflare Pages)
│   ├── _redirects          # URL Redirects (302 & SPA 200 fallback)
│   ├── icon-64.png         # Favicon & OpenGraph thumbnail
│   └── favicon.svg
├── src/
│   ├── components/         # Header, Footer, Layout, Toast, SnowEffect, VietQrCard...
│   ├── config/             # tools.ts, sampleRules.ts
│   ├── context/            # ThemeContext.tsx (Light / Dark mode)
│   ├── engine/             # ruleEngine.ts, ruleValidator.ts (Core QT Parser)
│   ├── pages/              # Home, Download, Premium, NameColor, RuleTester, RedirectHandler
│   ├── utils/              # colorHelper.ts, qrHelper.ts, sanitizeTransfer.ts
│   ├── App.tsx             # Route declarations
│   ├── main.tsx            # Root Entry Point
│   └── index.css           # Design Tokens, Scrollbars, Base Styles
├── docs/                   # Tài liệu kiến trúc & đặc tả module
├── backlog/                # Product Backlog & Sprint Backlog
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🤝 Đóng Góp & Hỗ Trợ Cộng Đồng

* **Discord vBook:** [https://discord.gg/yXFRdG4kJq](https://discord.gg/yXFRdG4kJq)
* **Website vBook App:** [https://vbookapp.com](https://vbookapp.com)
* **Tác giả & Đóng góp:** `kychitoge`, `duongden`, `ngatngay`, `vBook Community`
