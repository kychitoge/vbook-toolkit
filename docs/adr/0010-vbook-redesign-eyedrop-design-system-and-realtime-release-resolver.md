# 10. vBook Redesign: Eyedrop Design System & Real-Time Release Resolver

Date: 2026-10-12

## Status
Accepted

## Context
Trang tải ứng dụng vBook (`/download`) ban đầu sử dụng bố cục dashboard kỹ thuật với các thẻ chữ nhật thông thường, lạm dụng `font-serif italic` gây lỗi vỡ font tiếng Việt trên trình duyệt Windows, và gán cứng phiên bản tĩnh (`1.0.8`, `1.0.7`) dẫn đến nguy cơ lỗi thời sau 2-3 ngày phát triển.

Dự án cần một bước chuyển đổi toàn diện sang ngôn ngữ thiết kế tối giản, sạch sẽ, lấy cảm hứng từ `eyedrop.ai` và triết lý **Microsoft Clean UI**, đồng thời thiết lập cơ chế phân giải phiên bản phát hành từ GitHub Releases theo thời gian thực (zero-hardcoding).

## Decision

### 1. Áp Dụng Eyedrop Design System & Chống Vỡ Font
- **Kiến trúc thị giác**:
  - Hero với typography khổ lớn, logo thương hiệu vBook cắt tròn hoàn hảo (`rounded-full overflow-hidden`).
  - Hệ thống nút bấm dạng viên thuốc (Pill buttons) cao 56–64px với độ tương phản cao (`#181d4a` và `#038fd2`).
  - Thẻ tính năng bo góc lớn (Squircle cards `rounded-[32px]` đến `rounded-[40px]`).
  - Hoạt ảnh vòng quay tính năng Orbit với đường cong Bezier trên Canvas.
- **Quy tắc Font chữ**:
  - Loại bỏ hoàn toàn `font-serif italic` trên tiếng Việt có dấu.
  - Sử dụng 100% `font-sans` chuẩn Unicode (`Inter`, `Segoe UI`, `-apple-system`) với phân cấp độ đậm (`font-black`, `font-extrabold`, `font-bold`).
- **Thích ứng giao diện sáng / tối**:
  - Khung Showcase và vòng tròn Orbit sử dụng `bg-white dark:bg-slate-900` kết hợp viền mờ `border-slate-200/90 dark:border-slate-800`, loại bỏ hoàn toàn các khối đen cứng đục màu trên Light mode.

### 2. Thuật Toán Phân Giải Phiên Bản Thời Gian Thực (Release Resolver)
- **Không gán cứng (No-Hardcoding)**:
  - Giá trị khởi tạo trỏ an toàn về anchor phát hành GitHub: `#release-android` và `#release-desktop`.
- **Đồng bộ cơ chế từ `vbookapp.com`**:
  - Gọi duy nhất 1 API request: `https://api.github.com/repos/Darkrai9x/vbook-settings/releases?per_page=30`.
  - Quét asset mới nhất (`newest-first`), trích xuất số phiên bản qua `tên file asset` $\rightarrow$ `tiêu đề changelog markdown (## X.X.X)` $\rightarrow$ `tag_name`.
  - Phân loại chính xác các asset: Universal APK, MSI, Portable EXE, DMG, DEB, RPM.

### 3. Tối Ưu Hiệu Năng Showcase (Viewport-Aware)
- Tích hợp `IntersectionObserver` tự động kích hoạt chuyển ảnh chụp màn hình (3.8s/lần) khi người dùng cuộn đến và tự động giải phóng bộ đếm khi cuộn ra ngoài màn hình nhằm tiết kiệm tài nguyên CPU và pin thiết bị.

## Consequences
- Giao diện `/download` đạt chuẩn thẩm mỹ cao cấp, tinh tế, mượt mà trên cả thiết bị di động và máy tính.
- Khắc phục triệt để lỗi vỡ font tiếng Việt trên toàn bộ hệ thống.
- Thiết lập bộ quy chuẩn thiết kế (SSOT) để bàn giao và đồng bộ cho các trang tiếp theo (`/`, `/premium`, `/name-color`, `/font-preview`, `/rule-tester`, `/get-name`).
