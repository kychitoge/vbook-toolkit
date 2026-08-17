# 📦 MODULE 8: THỬ FONT & HÌNH NỀN (/font-preview)

## 1. Tổng quan & Mục tiêu
* **Tên module:** Thử Font & Hình Nền Đọc Truyện (Font & Background Preview Sandbox).
* **Đường dẫn:** `/font-preview`
* **Tác giả:** `duongden`
* **Mục tiêu:** Cung cấp không gian tương tác trực quan (Live Sandbox) mô phỏng trải nghiệm đọc sách/truyện thực tế với văn bản mẫu, cho phép độc giả tùy chỉnh font chữ, hình nền, cỡ chữ, căn lề, độ mờ overlay trước khi tải về cài đặt vào ứng dụng vBook.
* **Nguồn tài nguyên cộng đồng:** ~93 font chữ tuyển chọn và ~72 hình nền đọc truyện.
* **Credit Google Drive:** `https://drive.google.com/drive/folders/1sZrmJYPV6Jw69w31dG2NyY6S8SYnbrX4`

---

## 2. Kiến trúc Hạ tầng & Phân phối Asset
* **Lưu trữ CDN:** Cloudflare R2 Storage.
* **Custom Domain CDN:** `https://toolkit-cdn.vbookext.me`
* **CORS Policy:** Đã mở `GET`, `HEAD` cho phép trình duyệt nạp dynamic font qua `FontFace API`.
* **Quy ước đặt tên Asset:**
  * Ảnh nền: Chuẩn hóa về định dạng `background_{index}.[webp|jpg|png]` (ví dụ: `background_1.webp`, `background_2.jpg`...).
  * Font chữ: Đặt tên file chuẩn, lưu tại `/fonts/` trên CDN R2.
* **Cấu hình tĩnh (Zero Manifest JSON):**
  * Danh sách URL được khai báo tĩnh trong code (`FONT_FILES`, `BG_FILES`). Tên hiển thị được trích xuất và format tự động bằng regex helper.

---

## 3. Tính năng Cốt Lõi

### 📖 3.1. Màn hình Đọc thử nghiệm (Live Reading Sandbox)
* Giả lập khung đọc sách thực tế với đoạn văn bản mẫu Tiếng Việt phong phú (có đủ dấu thanh, ngoặc kép, hội thoại).
* Thanh điều khiển thông số Typography:
  * **Cỡ chữ (Font Size):** 14px - 32px.
  * **Chiều cao dòng (Line Height):** 1.4 - 2.6.
  * **Căn lề (Text Alignment):** Trái (Left), Giữa (Center), Phải (Right), Đều 2 bên (Justify).
  * **Độ mờ lớp phủ nền (Overlay Opacity):** 0% - 90% (giúp đọc rõ chữ trên nền ảnh rực rỡ).
  * **Màu chữ:** Tự động điều chỉnh theo theme Sáng/Tối hoặc tùy chọn tương phản.

### 🔤 3.2. Quản lý & Nạp Font Chữ
* Danh sách 93 font chữ phân loại rõ ràng (Serif, Sans-serif, Display, Thư pháp/Viết tay).
* Nạp font on-demand qua **`FontFace API`** để tối ưu tốc độ tải trang, chỉ tải font khi người dùng chọn.
* **Nạp font cá nhân (Local Upload):** Hỗ trợ kéo/thả hoặc chọn file `.ttf`, `.otf` từ máy tính/điện thoại để xem trước ngay lập tức qua `URL.createObjectURL` (100% Client-Side, không upload lên server).

### 🖼️ 3.3. Quản lý & Chọn Hình Nền
* Grid thumbnail 72 ảnh nền đọc truyện được tối ưu hóa hiển thị.
* **Nạp ảnh nền cá nhân:** Cho phép người dùng upload ảnh từ máy để kiểm tra độ tương phản văn bản với hình nền riêng.

### ⚡ 3.4. Tác vụ Tải xuống 1-Click
* 2 nút tác vụ cố định trên Top Bar:
  * `[Tải Font Hiện Tại]`: Tải file `.ttf`/`.otf` gốc từ CDN R2 về máy.
  * `[Tải Ảnh Hiện Tại]`: Tải file ảnh gốc độ phân giải cao từ CDN R2 về máy.

---

## 4. Thiết kế Giao diện (Responsive UI)
* **Desktop (Bố cục 2 cột 60/40):**
  * Cột trái (60%): Khung hiển thị Live Sandbox + Top Bar nút tải nhanh.
  * Cột phải (40%): Bảng điều khiển cuộn độc lập (Tìm kiếm font, Grid ảnh nền, Sliders thông số).
* **Mobile (Full Screen + Bottom Sheet):**
  * Khung đọc truyện toàn màn hình + Top Bar.
  * **Bottom Sheet** trượt từ cạnh đáy màn hình để tinh chỉnh font, nền và cỡ chữ mà không che khuất hoàn toàn tầm nhìn văn bản.
