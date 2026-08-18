# 🏃 SPRINT 2: FONT & BACKGROUND SANDBOX, DOWNLOAD HUB OVERHAUL & UX POLISH

* **Mục tiêu Sprint:** 
  1. Xây dựng Module mới **Thử Font & Nền** (`/font-preview`) với Live Reading Sandbox, nạp font/ảnh linh hoạt và kết nối CDN Cloudflare R2 (`toolkit-cdn.vbookext.me`).
  2. Nâng cấp **Trang Tải Ứng Dụng** (`/download`) mang diện mạo Landing Page vBook chính thức, giữ nguyên liên kết Bản cũ ổn định, Telegram Tracker, Discord và link gốc `vbookapp.com`.
  3. Cải tiến UX **Rule Tester** (`/rule-tester`) với nút "Xóa tất cả lỗi".
* **Phiên bản mục tiêu:** `v1.1.0`
* **Hạ tầng Asset CDN:** Cloudflare R2 Bucket + Custom Domain `toolkit-cdn.vbookext.me` (Lưu ý cấu hình CORS policy cho `FontFace API`).

---

## 📌 Danh sách User Stories & Tasks Chi Tiết

### 🎨 EPIC 8: Font & Background Preview Sandbox (`/font-preview`)

| Task ID | Mô tả công việc | Trạng thái | Ưu tiên | Phụ trách |
|---|---|---|---|---|
| **SP2-01** | Chuẩn hóa tài nguyên ảnh nền: Đổi tên 96 file ảnh thành định dạng `background_{1..96}.[ext]` và chuẩn hóa 94 font chữ (bao gồm font hệ thống). | Done ✅ | P0 | Data / Dev |
| **SP2-02** | Khởi tạo cấu hình tĩnh `fontPreviewAssets.ts` ánh xạ URL tới `https://toolkit-cdn.vbookext.me` (zero-asset default load). | Done ✅ | P0 | Dev |
| **SP2-03** | Xây dựng Hook `useFontFaceLoader` quản lý nạp font động qua `FontFace API` (xử lý cache, trạng thái loading, fallback). | Done ✅ | P0 | Dev |
| **SP2-04** | Xây dựng Component `ReadingSandbox.tsx`: Khung đọc truyện giả lập văn bản mẫu, hỗ trợ đổi font, cỡ chữ, dãn dòng, căn lề, background & overlay opacity 0% mặc định. | Done ✅ | P0 | Dev |
| **SP2-05** | Xây dựng Component `FontSelector.tsx` & `BackgroundSelector.tsx`: Tìm kiếm font, chọn font theo danh mục, grid thumbnail 96 ảnh nền, tự động cuộn tức thì đến item đang chọn và lưu `localStorage`. | Done ✅ | P1 | Dev |
| **SP2-06** | Xây dựng tính năng nạp Font/Ảnh cá nhân từ thiết bị người dùng qua `URL.createObjectURL` (100% Client-Side). | Done ✅ | P1 | Dev |
| **SP2-07** | Tích hợp 2 nút tải nhanh 1-Click: `[Tải Font Hiện Tại]` và `[Tải Ảnh Hiện Tại]` trực tiếp từ CDN R2. | Done ✅ | P1 | Dev |
| **SP2-08** | Thiết kế Responsive UI: 2 cột (60/40) trên Desktop, Bottom Sheet trượt trên Mobile và tối ưu Header di động chống vỡ dòng. | Done ✅ | P1 | Dev |
| **SP2-09** | Khai báo route `/font-preview` trong `App.tsx` và thêm tool item vào `src/config/tools.ts`. | Done ✅ | P0 | Dev |

---

### 📥 EPIC 9: Download Page Landing Overhaul (`/download`)

| Task ID | Mô tả công việc | Trạng thái | Ưu tiên | Phụ trách |
|---|---|---|---|---|
| **SP2-10** | Tái cấu trúc layout `/download` tích hợp nội dung từ `vbookapp.com`: Hero Section, Features Strip, Experience Grid. | Done ✅ | P1 | Dev |
| **SP2-11** | Bố trí khu vực tải ứng dụng chính: Nút tải Android APK (Bản Beta mới nhất) và iOS IPA (Bản Beta mới nhất v1.0). | Done ✅ | P1 | Dev |
| **SP2-12** | Tích hợp khu vực Bản Cũ & Kênh Cộng Đồng (bố cục rõ ràng, chuẩn xác):<br>- **Bản cũ (ổn định):** Link GitHub APK.<br>- **Theo dõi cập nhật:** Telegram Tracker.<br>- **Hỗ trợ:** Discord Community.<br>- **Website gốc:** `vbookapp.com`. | Done ✅ | P1 | Dev |

---

### 🧪 EPIC 10: Rule Tester UX Improvements (`/rule-tester`)

| Task ID | Mô tả công việc | Trạng thái | Ưu tiên | Phụ trách |
|---|---|---|---|---|
| **SP2-13** | Bổ sung nút "Xóa tất cả lỗi" (Clear All Errors / Dismiss All) trên thanh Action Bar của danh sách lỗi Rule Tester. | Done ✅ | P1 | Dev |
| **SP2-14** | Tối ưu hóa UI/UX khi hiển thị nhiều lỗi cú pháp lớn, cải thiện performance render. | Done ✅ | P2 | Dev |

---

### 📚 Tài liệu Kỹ thuật & Đồng bộ

| Task ID | Mô tả công việc | Trạng thái | Ưu tiên | Phụ trách |
|---|---|---|---|---|
| **SP2-15** | Viết tài liệu Module `docs/modules/font-preview.md`. | Done ✅ | P1 | Tech Lead |
| **SP2-16** | Cập nhật tài liệu `docs/modules/download.md`, `docs/overview.md`, `docs/architecture.md`. | Done ✅ | P1 | Tech Lead |
| **SP2-17** | Ghi nhận Kiến trúc Quyết định `docs/adr/0007-cloudflare-r2-cdn-and-font-preview-sandbox.md`. | Done ✅ | P1 | Tech Lead |

---

## ⚠️ Điểm Lưu Ý Kỹ Thuật & Cấu Hình R2 Bucket (Checklist)

- [x] **Tên miền Custom CDN:** `https://toolkit-cdn.vbookext.me`
- [ ] **Cấu hình CORS Policy trên Cloudflare R2 (Bắt buộc):**
  ```json
  [
    {
      "AllowedOrigins": [
        "https://toolkit.vbookext.me",
        "https://vbook-toolkit.pages.dev",
        "http://localhost:5173",
        "http://localhost:4173",
        "*"
      ],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag", "Content-Type", "Content-Length"],
      "MaxAgeSeconds": 86400
    }
  ]
  ```
- [ ] **Quy tắc đặt tên ảnh nền R2:** `background_1.webp`, `background_2.jpg`, ..., `background_72.jpg`.
- [ ] **Quy tắc đặt tên font R2:** Thư mục `/fonts/` hoặc root R2, định dạng `.ttf`, `.otf`.
