# 🔗 MODULE 3, 6, 7: INSTANT REDIRECTS

## 1. Danh sách đường dẫn chuyển hướng tức thì
Hệ thống chuyển hướng ngay lập tức (HTTP 302 / client-side instant redirect) khi người dùng truy cập các đường dẫn sau:

| Đường dẫn nội bộ | Đích chuyển hướng | Mục đích |
|---|---|---|
| `/hdsd` | `https://vbookapp.gitbook.io/huong-dan-su-dung` | Hướng dẫn sử dụng vBook |
| `/extension` | `https://www.vbookext.me` | Kho extension nguồn truyện vBook |
| `/qt` | `https://qt.vbookext.me/collections` | Bộ sưu tập dữ liệu QuickTranslate |

## 2. Cơ chế thực thi
* **Cloudflare Pages (`public/_redirects`):** Chuyển hướng cấp độ server/edge ngay khi request vừa tới Cloudflare.
* **React Router Fallback (`RedirectHandler.tsx`):** Chuyển hướng cấp độ client `window.location.replace()` nếu người dùng điều hướng qua SPA router.
