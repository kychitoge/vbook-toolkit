# 📖 VBOOK TOOLKIT — TỔNG QUAN HỆ THỐNG

## 1. Giới thiệu dự án
**vBook Toolkit** là bộ công cụ web tiện ích tất cả trong một (All-in-One Utility Hub) dành cho cộng đồng người dùng, dịch giả và biên tập viên của ứng dụng đọc truyện **vBook**.

Dự án được xây dựng theo phong cách giao diện phẳng tối giản (**Flat System UI / Utility Tool**), loại bỏ các chi tiết thừa thãi, tối ưu hóa tốc độ tải và đảm bảo tương thích 100% trên mọi kích thước màn hình từ điện thoại đến máy tính.

---

## 2. Mục tiêu & Định hướng thiết kế
* **Tối giản & Tiện ích:** Giao diện phẳng với đường viền 1px mỏng nhẹ, thẻ công cụ dạng Flat, độ tương phản sắc nét, bố cục 2 cột cân bằng.
* **100% Client-Side:** Tất cả các tác vụ xử lý quy tắc QuickTranslate, tính toán mã màu, tạo mã VietQR đều diễn ra trực tiếp trên trình duyệt của người dùng (Offline-ready, bảo mật, không lưu dữ liệu nhạy cảm).
* **Chuẩn hóa giao dịch ngân hàng (NAPAS Standard):** Tự động chuyển đổi các ký tự đặc biệt trong email sang dấu cách để đảm bảo hệ thống ngân hàng không làm mất thông tin khi chuyển tiền.

---

## 3. Danh mục công cụ & Tính năng cốt lõi

| STT | Tên công cụ | Đường dẫn | Tác giả | Mô tả ngắn |
|---|---|---|---|---|
| 1 | **Nâng Cấp Premium** | `/premium` (`/donate`) | vBook Community | Bảng so sánh quyền lợi Free vs Premium, sinh mã VietQR MB Bank kích hoạt tự động theo Email và hỗ trợ qua Discord. |
| 2 | **Tên Nhiều Màu** | `/name-color` | `ngatngay` | Trình tạo hiệu ứng chuyển màu Gradient cho nickname, hỗ trợ xem trước nền sáng/tối và sinh mã chuyển khoản gói Màu (50k) hoặc Combo (100k). |
| 3 | **Tải Ứng Dụng vBook** | `/download` | vBook Team | Landing Page giới thiệu vBook, hỗ trợ tải Android APK (Bản Beta & Bản cũ ổn định), iOS IPA, Telegram Tracker và Discord. |
| 4 | **vBook Rule Tester** | `/rule-tester` | `duongden` | Công cụ web kiểm tra và soát lỗi cú pháp quy tắc QuickTranslate, thử nghiệm dịch trực tiếp, hỗ trợ Drag & Drop file lớn và Xuất file `.txt`. |
| 5 | **Thử Font & Nền** | `/font-preview` | `duongden` | Không gian thử nghiệm Live Sandbox cho 94 font chữ (kèm font hệ thống) và 96 hình nền đọc truyện, kết nối CDN Cloudflare R2, nạp font/ảnh cá nhân. |
| 6 | **Hướng Dẫn Sử Dụng** | `/hdsd` | `duongden`, `ngatngay` | Redirect tức thì (302) sang GitBook Hướng dẫn sử dụng vBook chính thức. |
| 7 | **Nguồn Mở Rộng** | `/extension` | `kychi` | Redirect tức thì (302) sang kho Nguồn mở rộng `vbookext.me`. |
| 8 | **Data QT Collection** | `/qt` | `kychi` | Redirect tức thì (302) sang kho bộ sưu tập dữ liệu QuickTranslate `qt.vbookext.me/collections`. |
| 9 | **Get Names (Tải Names)** | `/get-name` | `duongden`, `mol` | Tiện ích bóc tách và tải từ điển tên riêng (QuickTranslate) từ Wikidich, Sangtacviet, Chiasename kèm Live Sandbox & xuất file. |


---

## 4. Kênh Hỗ Trợ & Đóng Góp Cộng Đồng
* **Discord vBook:** [https://discord.gg/yXFRdG4kJq](https://discord.gg/yXFRdG4kJq)
* **GitHub Tác Giả:** [https://github.com/kychitoge](https://github.com/kychitoge)
* **Người đóng góp:** `kychitoge`, `duongden`, `ngatngay`
