# 0009. Tích hợp Kho Sách Chuẩn OPDS và Mở Rộng Hỗ Trợ Đa Nền Tảng (Desktop & iOS TestFlight)

* **Trạng thái:** Chấp thuận (Accepted)
* **Ngày:** 2026-09-13
* **Người quyết định:** Weekday (Tech Lead), Sunday (BA & Technical Writer), Thursday (Lead Developer)
* **Người tư vấn:** Tuesday (QA/Security Specialist)

---

## 1. Bối cảnh & Vấn đề đặt ra (Context)

Hệ sinh thái đọc truyện **vBook** liên tục mở rộng phục vụ độc giả và người đóng góp nội dung:
1. **Nhu cầu kết nối kho sách điện tử trực tuyến chuẩn OPDS:**
   - Chuẩn **OPDS** (Open Publication Distribution System) cho phép người dùng duyệt, tìm kiếm và tải sách trực tiếp vào ứng dụng đọc truyện mà không cần tải file thủ công.
   - Kho sách OPDS cộng đồng vBook được triển khai tại địa chỉ `https://opds.vbookext.me/`. Cần một lối tắt chuyển hướng nhanh `/opds` trên hệ thống vBook Toolkit và giới thiệu tiện ích này trên trang chủ, định hướng người dùng đến kênh hướng dẫn cấu hình chi tiết (Discord & diễn đàn vBook).
2. **Nâng cấp kênh phân phối ứng dụng vBook:**
   - **Đối với người dùng iOS:** Trước đây chỉ có thể cài đặt thông qua phương thức Sideload file `.ipa` (yêu cầu máy tính hoặc các ứng dụng ký chứng chỉ như TrollStore/AltStore/Scarlet với thời hạn 7 ngày). Nay vBook đã chính thức có liên kết tham gia **Apple TestFlight** (`https://testflight.apple.com/join/YNPyNV1r`), giúp việc cài đặt và nhận cập nhật trở nên dễ dàng và ổn định.
   - **Đối với người dùng Máy tính (Desktop/PC):** vBook đã chính thức công khai các gói cài đặt đa nền tảng gồm:
     - Windows: Gói cài `.msi`
     - macOS: Gói cài `.dmg`
     - Linux: Gói cài `.deb` (Debian/Ubuntu) và `.rpm` (Fedora/RHEL)
     Các gói được phân phối chính thức qua GitHub Releases: `https://github.com/Darkrai9x/vbook-settings/releases`.
     Cần lưu ý thông tin kỹ thuật rằng cơ chế cập nhật tự động (OTA) trên desktop đang được hoàn thiện và sẽ sớm ra mắt.

---

## 2. Quyết định kỹ thuật (Decision)

### 2.1. Kiến trúc Chuyển Hướng Kép (Dual-Layer Redirection) cho `/opds`
- **Edge Layer (Cloudflare Pages):** Khai báo quy tắc chuyển hướng HTTP 302 trong file `public/_redirects`:
  ```text
  /opds   https://opds.vbookext.me/   302
  ```
  Đảm bảo tốc độ phản hồi tính bằng mili-giây tại các cụm máy chủ biên của Cloudflare.
- **Client SPA Layer:** Bổ sung Route `/opds` trong `src/App.tsx` sử dụng `<RedirectHandler>` để xử lý trường hợp người dùng click chuyển trang từ nội bộ SPA.
- **Directory Card (Trang chủ):** Đăng ký mục `opds` vào `TOOLS_CONFIG` thuộc nhóm `other_tools`, gắn icon `Library`, mô tả dẫn hướng tới tài liệu Discord & Diễn đàn vBook.

### 2.2. Tái cấu trúc Trang Download Hub (`/download`)
- Phân tách rõ ràng thành 2 phân khu nền tảng thiết bị:
  1. **Ứng Dụng Di Động (Mobile):**
     - **Android:** Bản APK Beta mới nhất (Google Drive CDN) và Bản cũ ổn định Legacy (GitHub Raw).
     - **iOS:** Nút chính "Tham Gia TestFlight" (App Store TestFlight URL) và nút phụ "Tải IPA Sideload".
  2. **Phiên Bản Máy Tính (Desktop Edition):**
     - Card giao diện chuyên biệt hỗ trợ 3 hệ điều hành lớn (Windows `.msi`, macOS `.dmg`, Linux `.deb`/`.rpm`).
     - Nút hành động dẫn trực tiếp tới GitHub Releases repository.
     - Callout cảnh báo kỹ thuật: *"Việc OTA sẽ sớm được hỗ trợ"*.

---

## 3. Hệ quả & Lợi ích (Consequences)

### Lợi ích:
- **Tối ưu hóa hành trình người dùng (Frictionless Onboarding):** Người dùng iPhone/iPad không còn bị rào cản sideload chứng chỉ 7 ngày nhờ TestFlight. Người dùng PC có thể tải đúng định dạng gói cài cho hệ điều hành mình sử dụng.
- **Tính nhất quán kiến trúc:** Cổng chuyển hướng `/opds` tuân thủ 100% mô hình serverless redirect 0-cost trên Cloudflare Pages đã áp dụng cho `/hdsd`, `/extension`, `/qt`.
- **Minh bạch lộ trình:** Người dùng Desktop nắm rõ trạng thái hiện tại (bản cài công khai) và lộ trình tính năng (OTA sắp hỗ trợ), giảm thiểu thắc mắc cho ban quản trị cộng đồng.

### Ràng buộc & Đánh đổi:
- Liên kết TestFlight có thể bị giới hạn số lượng người dùng thử nghiệm theo chính sách của Apple (tối đa 10.000 testers). Do đó, việc giữ song song liên kết IPA Sideload là biện pháp dự phòng bắt buộc.
