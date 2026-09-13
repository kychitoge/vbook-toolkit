# 🔗 MODULE: INSTANT REDIRECTS (`/hdsd`, `/extension`, `/qt`, `/opds`)

## 1. Danh sách đường dẫn chuyển hướng tức thì
Hệ thống chuyển hướng ngay lập tức (HTTP 302 / client-side instant redirect) khi người dùng truy cập các đường dẫn sau:

| Đường dẫn nội bộ | Đích chuyển hướng | Mục đích | Hướng dẫn bổ trợ |
|---|---|---|---|
| `/hdsd` | `https://vbookapp.gitbook.io/huong-dan-su-dung` | Hướng dẫn sử dụng vBook toàn tập | GitBook chính thức |
| `/extension` | `https://www.vbookext.me` | Kho extension nguồn truyện vBook | Website danh mục extension |
| `/qt` | `https://qt.vbookext.me/collections` | Bộ sưu tập dữ liệu QuickTranslate | Kho từ điển dịch giả |
| `/opds` | `https://opds.vbookext.me/` | Kho danh mục sách điện tử chuẩn OPDS | Hướng dẫn cấu hình tại Discord & diễn đàn vBook |

## 2. Cơ chế thực thi kép (Dual-Layer Execution)
* **Cloudflare Pages Edge (`public/_redirects`):** Chuyển hướng cấp độ server/edge với mã HTTP 302 ngay khi request vừa tới Cloudflare CDN, độ trễ tối thiểu.
* **React Router Fallback (`RedirectHandler.tsx`):** Chuyển hướng cấp độ client `window.location.replace()` nếu người dùng điều hướng qua SPA client routing.
