# ADR 0008: Cơ Chế Cập Nhật Head Title, Meta Tags & Pre-rendered Social Embeds Theo Từng Route

* **Trạng thái:** Chấp thuận (Accepted)
* **Ngày:** 19/08/2026
* **Tác giả:** Kychi & Antigravity

---

## 1. Bối cảnh (Context)
Dự án **vBook Toolkit** là một Single Page Application (SPA) xây dựng trên nền tảng React + Vite và triển khai trên **Cloudflare Pages**.

Trước đây, hệ thống chỉ cấu hình một tiêu đề chung duy nhất tại `index.html`:
- Title: `vBook Toolkit — Bộ công cụ tiện ích cộng đồng vBook`
- Description: `Tổng hợp các công cụ, tiện ích dành cho người dùng và cộng đồng dịch giả vBook...`

### Hệ quả gặp phải:
1. **Trải nghiệm người dùng trên trình duyệt (Browser UX):** Khi điều hướng qua các trang con như `/download`, `/premium`, `/name-color`, `/font-preview`, `/rule-tester`, `/get-name`, tiêu đề tab trình duyệt không thay đổi, gây khó khăn cho việc phân biệt nhiều tab.
2. **Hiển thị liên kết xem trước trên mạng xã hội (Social Previews / Discord / Facebook / Zalo):** Khi chia sẻ link cụ thể (ví dụ `https://tool.vbookext.me/download`), các bot crawler (Discord Bot, Facebook Crawler) không thực thi mã nguồn JavaScript mà chỉ đọc trực tiếp thẻ HTML tĩnh ban đầu. Do đó, Discord embed luôn hiển thị tiêu đề và mô tả trang chủ chung chung, làm giảm tính trực quan và chuyên nghiệp.

---

## 2. Quyết định (Decision)

Chúng tôi áp dụng giải pháp **Kiến trúc 2 Lớp (Hybrid 2-Tier Metadata Architecture)**:

```
                  ┌────────────────────────────────────────────────────────┐
                  │              VBOOK TOOLKIT METADATA ARCHITECTURE      │
                  └──────────────────────────────────┬─────────────────────┘
                                                     │
                   ┌─────────────────────────────────┴────────────────────────────────┐
                   ▼                                                                  ▼
┌──────────────────────────────────────┐                           ┌──────────────────────────────────────┐
│  LỚP 1: CLIENT RUNTIME (usePageMeta) │                           │  LỚP 2: BUILD-TIME VITE PLUGIN SSG   │
├──────────────────────────────────────┤                           ├──────────────────────────────────────┤
│ • Hook `usePageMeta` / `<PageMeta>`  │                           │ • `generateMetaPagesPlugin` trong    │
│ • Cập nhật `document.title`          │                           │   `vite.config.ts` (closeBundle hook)│
│ • Cập nhật `<meta name="description">│                           │ • Sinh file `dist/{route}/index.html`│
│ • Cập nhật Open Graph & Twitter tags │                           │ • Chèn sẵn <title>, <meta og:...>    │
│ • Hoạt động khi user duyệt web (SPA) │                           │ • Phục vụ Discord / Facebook Bots    │
└──────────────────────────────────────┘                           └──────────────────────────────────────┘
```

### 2.1. Lớp 1: Dynamic Client Runtime (`usePageMeta`)
* Quản lý cấu hình metadata tập trung tại `src/config/routesMeta.ts`.
* Hook `usePageMeta` tự động cập nhật:
  - `document.title`
  - `<meta name="title">`
  - `<meta name="description">`
  - `<meta property="og:title">`
  - `<meta property="og:description">`
  - `<meta property="og:url">`
  - `<meta property="twitter:title">`
  - `<meta property="twitter:description">`

### 2.2. Lớp 2: Static Route Pre-generation (Vite Plugin) cho Cloudflare Pages
* Trong quá trình build (`pnpm run build`), `generateMetaPagesPlugin` trong `vite.config.ts` sẽ đọc file `dist/index.html` mẫu và nhân bản ra các thư mục con:
  - `dist/download/index.html`
  - `dist/premium/index.html`
  - `dist/name-color/index.html`
  - `dist/font-preview/index.html`
  - `dist/rule-tester/index.html`
  - `dist/get-name/index.html`
* Script thay thế các thẻ `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:url` tương ứng của từng trang.
* Khi crawler gửi request tới `https://tool.vbookext.me/download`, Cloudflare Pages ưu tiên phục vụ file tĩnh `download/index.html` ngay lập tức với mã HTTP 200 OK.
* Khi trình duyệt tải xong HTML tĩnh này, bundle JS của SPA tiếp tục chạy và React Router nhận diện route để render component tương ứng mà không làm gián đoạn trải nghiệm người dùng.

---

## 3. Hệ quả (Consequences)

### Tích cực:
* **Discord & Social Embeds 100% chính xác:** Mọi đường dẫn công cụ con khi chia sẻ vào Discord, Telegram, Facebook, Zalo đều hiển thị đúng tiêu đề, mô tả và hình ảnh riêng biệt.
* **SEO tối ưu:** Các công cụ tìm kiếm thu thập đúng nội dung từng route mà không cần thiết lập máy chủ SSR phức tạp.
* **Không tăng chi phí vận hành:** Toàn bộ quá trình diễn ra trên hạ tầng tĩnh (Static Asset) của Cloudflare Pages.
* **Đồng bộ mã nguồn:** Cấu hình metadata nằm ở một nơi duy nhất (`routesMeta.ts`), dễ bảo trì và mở rộng thêm công cụ mới.
