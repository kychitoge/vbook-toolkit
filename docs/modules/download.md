# 📥 MODULE 3: DOWNLOAD HUB (`/download`)

## 1. Mục đích
Cung cấp cổng giới thiệu và tải ứng dụng vBook chính thức (thế hệ 2), tích hợp đầy đủ thông tin tính năng chuẩn hóa từ trang chủ `vbookapp.com`, đồng thời cung cấp các gói cài đặt cho mọi nền tảng: Thiết bị di động (Apple App Store cho iOS, Android APK tự động phân giải từ GitHub Releases), Máy tính (Windows MSI & Portable, macOS DMG, Linux DEB & RPM) và các kênh cộng đồng.

---

## 2. Cấu Trúc Giao Diện & Trải Nghiệm (Design System Eyedrop.ai)

Giao diện được tái thiết kế toàn diện theo tiêu chuẩn tối giản, thị giác cao cấp lấy cảm hứng từ `eyedrop.ai` và triết lý **Microsoft Clean UI**:

### 🚀 1. Hero & Nhận Diện Thương Hiệu
* **Logo App**: Biểu tượng vBook cắt tròn hoàn hảo (`rounded-full overflow-hidden`), lồng trong vòm gradient mềm mại.
* **Typography**: Chữ `v` navy đậm `#181d4a` kết hợp `Book` gradient xanh chuyển màu (`#038fd2` $\rightarrow$ `#085f89`). Sử dụng 100% `font-sans` chống vỡ font tiếng Việt.
* **Định vị cốt lõi**: *"Đọc sách và quản lý thư viện cá nhân — mượt mà, riêng tư."*
* **Nút bấm kép (Dual Pill Buttons)**:
  * **Android APK**: Nút pill lớn 64px, nền navy `#181d4a`, hover chuyển `#038fd2`, tự động cập nhật số phiên bản theo thời gian thực (real-time).
  * **Apple App Store**: Nút pill lớn 64px, màu chủ đạo `#038fd2`, liên kết chính thức đến [Apple App Store](https://apps.apple.com/us/app/vbook-%C4%91%E1%BB%8Dc-truy%E1%BB%87n-s%C3%A1ch/id6808265499).
* **Yêu cầu hệ thống**: *"Hỗ trợ iOS 15.1+ và Android 7.0+. Hoàn toàn miễn phí, không quảng cáo."*

### 📱 2. Khu Vực Trình Diễn (Showcase)
* **Tiêu đề**: *"Mở sách. Thư giãn. Đọc mọi lúc."*
* **Tự động chuyển cảnh (Auto-cycle)**: Tích hợp `IntersectionObserver` tự động luân chuyển mượt mà (3.8s/lần) giữa 3 màn hình thực tế từ Apple CDN (`Trình đọc` $\rightarrow$ `Kệ sách` $\rightarrow$ `Nghe & Dịch AI`) khi người dùng cuộn đến, và tự ngắt khi cuộn ra ngoài để tiết kiệm pin.
* **Thích ứng giao diện**: Khung điện thoại và vùng chứa tự động đồng bộ tone màu sáng (Light mode) và tối (Dark mode), không còn hiện tượng khối đen đục trên nền sáng.

### 🛡️ 3. Ba Trụ Cột Triết Lý
* **100% Riêng tư**: Toàn bộ dữ liệu và lịch sử đọc lưu trữ cục bộ trên thiết bị của bạn.
* **Tối ưu phần cứng**: Lật trang 120Hz mượt mà, hiển thị tối ưu trên màn hình E-ink và siêu tiết kiệm pin.
* **Không thuê bao**: Trải nghiệm trọn vẹn $0. Không phí hàng tháng, không quảng cáo.

### 🪐 4. Vòng Quay Tính Năng Nổi Bật (Orbit Features)
Đồng bộ 100% ngữ cảnh với tài liệu `vbookapp.com`:
1. **Đọc đa định dạng**: EPUB, MOBI, AZW3, CBZ, PDF, PRC, TXT, DOCX...
2. **Giọng đọc AI tự nhiên**: Đọc thành tiếng ngoại tuyến, ngữ điệu truyền cảm, không cần mạng.
3. **Dịch nhanh ngoại tuyến**: Tra từ và dịch câu tức thì ngay trên trang sách.
4. **Trình duyệt & Nguồn mở rộng**: Trình duyệt tích hợp, kết nối kho truyện phong phú qua extension.
5. **Kệ sách & Tiến độ đọc**: Quản lý thư viện cá nhân, tự động lưu vị trí và đánh dấu trang.

### 💻 5. Khu Vực Máy Tính (Desktop Edition)
Ba thẻ Squircle bo góc lớn đồng đều 100% về chiều cao và cấu trúc nút bấm:
* 🪟 **Windows**: Nút chính `Tải gói cài đặt (.msi)` + tùy chọn phụ `Hoặc tải bản Portable (.exe)`.
* 🍎 **macOS**: Nút chính `Tải gói cài đặt (.dmg)` + chú thích `Hỗ trợ Apple Silicon & Intel`.
* 🐧 **Linux**: Nút chính `Tải gói Debian / Ubuntu (.deb)` + tùy chọn phụ `Hoặc tải gói Fedora / RHEL (.rpm)` với icon Linux Tux penguin chuẩn quốc tế.

### ❓ 6. Câu Hỏi Thường Gặp (FAQs Accordion)
Đồng bộ nguyên bản từ trung tâm hỗ trợ `vbookapp.com/support`:
1. vBook là gì?
2. Cách thêm sách vào thư viện vBook như thế nào?
3. vBook hỗ trợ những định dạng sách và tài liệu nào?
4. Dữ liệu đọc sách và quyền riêng tư được quản lý ra sao?
5. Làm thế nào để báo cáo nội dung hoặc nhận hỗ trợ?

### 📦 7. Phân Biệt Thế Hệ vBook & Bản Quyền Chân Trang
* **Định vị thế hệ**: Phân định rõ vBook 1 là thế hệ cũ (đã ngừng phát triển) và vBook hiện tại là thế hệ 2 vượt trội về mọi mặt. Giữ liên kết tải bản cũ ổn định trên GitHub:
  `https://raw.githubusercontent.com/Darkrai9x/vbook-settings/refs/heads/main/vBooks.apk`.
* **Bản quyền chính thức**: `© 2026 vBook · Đọc truyện và quản lý thư viện cá nhân`.

---

## 3. Kiến Trúc Kỹ Thuật (Real-time Release Resolver)

* **Service:** `src/services/releaseService.ts`
* **Cơ chế:**
  * Khởi tạo link ban đầu trỏ về anchor GitHub Release: `#release-android` và `#release-desktop` (tuyệt đối không hardcode phiên bản tĩnh).
  * Gọi duy nhất 1 API request: `https://api.github.com/repos/Darkrai9x/vbook-settings/releases?per_page=30`.
  * Phân giải theo cơ chế `newest-first`, trích xuất số phiên bản qua filename regex $\rightarrow$ changelog header $\rightarrow$ tag name.
  * Tự động gán link tải trực tiếp cho APK, MSI, DMG, DEB, RPM ngay khi tải trang.

---

## 4. Cấu Hình Chia Sẻ Mạng Xã Hội (Social Share Preview Banner - OG Image)

Duy nhất trang `/download` ("only download") được trang bị ảnh xem trước độ phân giải cao tiêu chuẩn quốc tế khi chia sẻ liên kết trên các mạng xã hội và ứng dụng nhắn tin (Facebook, Zalo, Telegram, Discord, Twitter/X, iMessage):

* **Tệp ảnh:** `public/og-download.png` (Kích thước: 1200 x 630 px, tỷ lệ chuẩn 1.91:1, dung lượng tối ưu ~155 KB).
* **Nội dung banner:**
  * Biểu tượng vBook cắt tròn 3D badge phát sáng (`glow`).
  * Huy hiệu thế hệ: `✦ vBook Thế Hệ 2 · Miễn Phí 100%`.
  * Tiêu đề: `Tải Ứng Dụng vBook Đa Nền Tảng`.
  * Huy hiệu nền tảng tương thích: App Store (iOS), Android APK, Windows, macOS, Linux.
  * Địa chỉ chính thức: `tool.vbookext.me/download`.
* **Thẻ Meta sinh tĩnh:**
  * `og:image`: `https://tool.vbookext.me/og-download.png`
  * `og:image:width`: `1200`
  * `og:image:height`: `630`
  * `twitter:card`: `summary_large_image`
  * `twitter:image`: `https://tool.vbookext.me/og-download.png`
* **Phạm vi bảo toàn:** Các route khác trong hệ thống giữ nguyên cấu hình mặc định, không bị ảnh hưởng.

