# ADR 0005: Triển khai Cloudflare Pages và Cơ chế Instant Redirects

* **Trạng thái:** Chấp thuận (Accepted)
* **Ngày:** 16/08/2026
* **Tác giả:** Kychi & Antigravity

## 1. Bối cảnh (Context)
Dự án có các đường dẫn tiện ích trỏ ra ngoài hệ thống (`/hdsd`, `/extension`, `/qt`). Cần đảm bảo khi người dùng gõ trực tiếp URL vào trình duyệt hoặc bấm link, việc chuyển hướng phải diễn ra ngay lập tức với độ trễ thấp nhất.

## 2. Quyết định (Decision)
* Cấu hình chuyển hướng cấp độ Edge bằng file `public/_redirects`:
  ```
  /hdsd        https://vbookapp.gitbook.io/huong-dan-su-dung  302
  /extension   https://www.vbookext.me                        302
  /qt          https://qt.vbookext.me/collections             302
  /*           /index.html                                    200
  ```
* Bổ sung component `RedirectHandler.tsx` ở cấp độ React Router DOM để xử lý điều hướng mượt mà trong trường hợp client routing nội bộ.
* Quy trình deploy: Chỉ commit và deploy khi có lệnh tường minh từ tác giả.

## 3. Hệ quả (Consequences)
* Chuyển hướng tức thì đạt tốc độ cao nhất (Edge 302).
* SPA routing hoạt động hoàn hảo khi reload bất kỳ route con nào trên Cloudflare Pages nhờ rule fallback `/* /index.html 200`.
