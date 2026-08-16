# ADR 0006: Porting vBook Rule Tester sang Web Engine & Chuẩn Hóa Lời Nhắn NAPAS

## Trạng thái
Đã chấp thuận (Accepted)

## Bối cảnh
1. Tiện ích `vbook-rule-tester` của tác giả `duongden` trước đây chỉ chạy trên VS Code Extension, khiến người dùng thông thường và dịch giả không dùng VS Code gặp khó khăn khi kiểm tra cú pháp quy tắc QuickTranslate.
2. Hệ thống ngân hàng Việt Nam tự động lọc bỏ các ký tự đặc biệt (`@`, `.`, `-`, `_`) trong nội dung chuyển khoản, khiến thông tin tài khoản người dùng (`lehongky@gmail.com`) bị dính liền thành `lehongkygmailcom`, gây lỗi cho bot tự động kích hoạt Premium.
3. Người dùng cần hỗ trợ nạp các file rule lớn (lên tới 16.000 dòng) và xuất file sau khi đã xóa rule lỗi.

## Quyết định kiến trúc
1. **Chuyển đổi Engine sang TypeScript thuần:**
   * Viết lại toàn bộ bộ parser, regex compiler, BigInt numeral converter, anchor detector, và validator trong `src/engine/ruleEngine.ts` và `src/engine/ruleValidator.ts`.
   * Hỗ trợ mọi biến thể cú pháp rule: `pattern = translation`, `pattern=translation`, `"pattern"="translation"`, và phân tách bằng tab.
2. **Chuẩn hóa lời nhắn chuyển khoản (NAPAS Sanitizer):**
   * Thay thế `@`, `.`, `-`, `_` bằng khoảng trắng đơn trong `src/utils/sanitizeTransfer.ts` để sinh cú pháp: `lehongky gmail com donate vbook premium` và `lehongky gmail com color ...` hoặc `lehongky gmail com premium color ...`.
3. **Xử lý 100% Client-Side & Tối ưu DOM cho file lớn:**
   * Dùng `FileReader` API để đọc file trực tiếp trên trình duyệt, không gửi dữ liệu qua mạng.
   * Tích hợp tính năng Xuất file `.txt` và phân trang hiển thị lỗi để duy trì tốc độ 60fps trên file 16k dòng.

## Hệ quả
* Người dùng có thể kiểm tra rule và xuất file sạch trực tiếp trên trình duyệt web.
* Không có chi phí máy chủ xử lý file hoặc giới hạn tải lên mạng.
* Cú pháp chuyển khoản ngân hàng chuẩn xác 100% không bị dính chữ.
