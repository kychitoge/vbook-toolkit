# 7. Phân Phối Asset Qua Cloudflare R2 CDN và Module Font & Background Sandbox

Date: 2026-08-17

## Trạng thái (Status)
Đã chấp thuận (Accepted)

## Bối cảnh (Context)
Cộng đồng vBook có nhu cầu thử nghiệm trực quan font chữ và hình nền trước khi cài đặt vào ứng dụng đọc truyện vBook. Số lượng tài nguyên khởi tạo bao gồm 93 font chữ (`.ttf`, `.otf`) và 72 hình nền (`.jpg`, `.webp`, `.png`) với tổng dung lượng ~70MB.
Nếu lưu trực tiếp toàn bộ tài nguyên tĩnh này vào source code Git và build qua Cloudflare Pages:
1. Git repository sẽ bị phình to, làm chậm quá trình clone/pull.
2. Mỗi lần cập nhật thêm font hoặc ảnh nền sẽ yêu cầu commit code và trigger build lại toàn bộ ứng dụng.

## Quyết định (Decision)
1. **Sử dụng Cloudflare R2 Storage làm CDN:**
   - Phân phối toàn bộ font và ảnh nền qua R2 Bucket được gán Custom Domain: `https://toolkit-cdn.vbookext.me`.
   - Cấu hình **CORS Policy** trên R2 cho phép các phương thức `GET`, `HEAD` từ mọi domain (`*`) để `FontFace API` của trình duyệt có thể nạp dynamic font từ xa mà không bị chặn.
2. **Quy chuẩn định danh Asset:**
   - Chuẩn hóa toàn bộ tên 72 ảnh nền theo định dạng `background_{1..72}.[ext]`.
   - Danh sách font và ảnh nền được khai báo tĩnh trong code frontend (`FONT_FILES`, `BG_FILES`), tự động phân tích tên hiển thị (Zero manifest overhead).
3. **100% Client-Side Sandbox:**
   - Nạp font động trực tiếp qua `FontFace API`.
   - Cho phép người dùng nạp font/ảnh cá nhân từ máy cục bộ qua `URL.createObjectURL` (xử lý ngay tại trình duyệt, không upload lên server).

## Hệ quả (Consequences)
* **Tích cực:**
  * Giữ Git repository siêu nhẹ (chỉ thuần source code React/TS).
  * Chi phí băng thông phân phối 0 VNĐ (Cloudflare R2 không tính phí egress data).
  * Dễ dàng mở rộng thêm hàng trăm font và hình nền mới trong tương lai mà không cần redeploy web app.
* **Tiêu cực / Rủi ro:**
  * Cần đảm bảo CORS Policy trên R2 bucket luôn được kích hoạt chính xác để `FontFace API` hoạt động thông suốt.
