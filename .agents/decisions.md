# Kiến Trúc & Sổ Ghi Nhận Quyết Định (Architecture Decision Records - ADR)

Tài liệu này lưu trữ các quyết định kiến trúc và chuẩn hóa giao diện hệ thống cho toàn bộ dự án `vbook-toolkit`. Mọi phiên làm việc tiếp theo phải tuân thủ nghiêm ngặt các nguyên tắc trong tài liệu này.

---

## [ADR-001] Chuẩn Hóa Design System & UI Handover từ Module Download sang Toàn Bộ Toolkit
- **Ngày**: 2026-10-12
- **Trạng thái**: Đã duyệt (Approved)
- **Bối cảnh**: 
  - Giao diện cũ của `/download` và một số công cụ trong Toolkit mang phong cách dashboard kỹ thuật thô cứng, lạm dụng `font-serif italic` gây lỗi vỡ font tiếng Việt trên trình duyệt Windows, gán cứng phiên bản tĩnh (`1.0.8`, `1.0.7`) và hiển thị khối màu đen lệch tone trên theme sáng.
  - Người dùng yêu cầu chuẩn hóa triệt để theo phong cách tối giản, thị giác cao cấp kiểu `eyedrop.ai` và văn phong Microsoft Clean UI dành cho End-User.
- **Quyết định của Tech Lead [Weekday]**:
  1. **Hệ màu nhận diện (Brand Tokens)**:
     - Màu chủ đạo: `#038fd2` (`brand-primary`), `#0277b0` (`brand-hover`).
     - Màu tương phản cao cấp: `#181d4a` (Deep Navy / Slate đậm) cho nút chính và tiêu đề.
     - Đồng bộ nền: Light Mode (`bg-[#f8fafc]` / `bg-white`), Dark Mode (`bg-slate-950` / `bg-slate-900`). Tuyệt đối không để khối đen cứng trên theme sáng.
  2. **Quy tắc Font chữ (Anti-Font Breakdown)**:
     - **CẤM**: Không sử dụng `font-serif` kết hợp `italic` cho văn bản tiếng Việt có dấu.
     - **BẮT BUỘC**: Sử dụng hệ thống font `font-sans` (Inter, Segoe UI, -apple-system). Tạo điểm nhấn bằng tương phản độ dày (`font-extrabold` / `font-bold` / `font-semibold`) thay vì chữ nghiêng.
  3. **Biểu tượng & Quy chuẩn Bo góc (Squircle / Pill System)**:
     - Logo App phải luôn được cắt tròn tuyệt đối bằng `rounded-full overflow-hidden`, không để 4 góc vuông thừa đè lên viền tròn.
     - Nút hành động chính (Primary CTAs): Dạng viên thuốc `rounded-full`, chiều cao chuẩn `h-14` đến `h-16`, hiệu ứng hover scale nhẹ `hover:scale-102`.
     - Thẻ chức năng (Feature Cards): Bo góc `rounded-[32px]` đến `rounded-[40px]`, viền mảnh `border-slate-200/80` (Dark: `border-slate-800`).
  4. **Quy tắc Dữ liệu & Phiên bản (No-Fallback & Real-time Resolution)**:
     - Tuyệt đối không gán cứng số phiên bản tĩnh vào code khi ứng dụng đang phát triển nhanh (2-3 ngày/bản).
     - Link mặc định ban đầu luôn trỏ an toàn về anchor phát hành chính thức (`#release-android`, `#release-desktop`).
     - Bóc tách phiên bản thời gian thực từ API `releases?per_page=30` bằng thuật toán chuẩn từ `vbookapp.com`.
  5. **Tối ưu Tương tác (Performance & Battery Saving)**:
     - Các hoạt ảnh tự động chạy (Auto-cycle Showcase) bắt buộc phải tích hợp `IntersectionObserver` để tự động ngắt timer khi người dùng cuộn ra ngoài màn hình.
  6. **Định vị Thương hiệu & Bản quyền**:
     - Định danh chính xác: vBook 1 là thế hệ cũ (đã ngừng phát triển); vBook hiện tại là thế hệ 2 vượt trội về mọi mặt.
     - Bản quyền chân trang đồng bộ: `© 2026 vBook · Đọc truyện và quản lý thư viện cá nhân`.
- **Hệ quả**:
  - Giao diện sạch sẽ, chuyên nghiệp, đồng bộ 100% giữa Light Mode và Dark Mode.
  - Khắc phục vĩnh viễn lỗi vỡ font tiếng Việt.
  - Chuẩn hóa nền tảng để áp dụng đồng loạt cho các trang còn lại: `/` (Home), `/premium`, `/name-color`, `/font-preview`, `/rule-tester`, `/get-name`.
