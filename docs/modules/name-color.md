# 🎨 MODULE 2: TÊN NHIỀU MÀU (`/name-color`)

## 1. Mục đích
Cho phép người dùng tạo hiệu ứng chuyển màu động (Gradient Animation) cho nickname trong vBook, xem trước trực quan trên cả 2 chế độ nền sáng và nền tối, đồng thời tạo mã chuyển khoản VietQR để kích hoạt tính năng.

Tác giả module gốc: `ngatngay`.

---

## 2. Thiết Kế & Bố Cục 2 Cột Cân Bằng

### Cột 1 (Trái) — Thiết Kế & Xem Trước:
1. **Tên hiển thị (Nickname):** Ô nhập tên linh hoạt.
2. **Khung Preview Name:**
   * Hiển thị Avatar chữ cái đầu + Tên nhấp nháy chuyển màu bằng CSS Linear Gradient Keyframes.
   * Dải swatch màu mini trực quan.
   * **Nút chuyển đổi chế độ nền Sáng / Tối** tích hợp ngay góc trên để người dùng kiểm tra độ tương phản màu trên cả giao diện Light & Dark của app.
3. **Danh sách mã HEX:**
   * Textarea tự động co giãn theo số dòng (tối đa 15 dòng).
   * Kiểm tra tính hợp lệ từng dòng (báo lỗi nếu mã HEX không đúng định dạng `#RRGGBB` hoặc `RRGGBB`).

### Cột 2 (Phải) — Gói Kích Hoạt & Thanh Toán:
1. **Chọn Gói Kích Hoạt:**
   * **Gói Màu Nick (50.000đ):** Cú pháp `[email] color [hex1] [hex2] ...`
   * **Combo Trọn Gói (100.000đ - Premium + Màu Nick):** Cú pháp `[email] premium color [hex1] [hex2] ...`
2. **Email kích hoạt:** Chuẩn hóa theo chuẩn NAPAS (thay `@`, `.`, `-`, `_` bằng khoảng trắng).
3. **Phương thức thanh toán:** Các tab MB Bank, MoMo, Viettel Money, PayPal.
4. **Mã VietQR MB Bank:** Khung QR lớn 360px vuông vắn, có icon tải ảnh góc phải và nút sao chép STK, Số tiền, Lời nhắn chuẩn.

---

## 3. Cú Pháp Chuyển Khoản Mẫu
* **Ví dụ Màu Nick:** `lehongky gmail com color ff4d4f faad14 52c41a 13c2c2 1677ff 722ed1`
* **Ví dụ Combo Trọn Gói:** `lehongky gmail com premium color ff4d4f faad14 52c41a 13c2c2 1677ff 722ed1`
