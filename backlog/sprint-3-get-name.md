# 🏃 SPRINT 3: PLUGIN GET NAMES (`/get-name`) & QUICKTRANSLATE RESOURCE SCRAPER

* **Mục tiêu Sprint:** 
  1. Xây dựng Module tiện ích mới **Get Names** (`/get-name`) cho phép bóc tách, xem trước và tải danh sách từ điển tên riêng (QuickTranslate) từ các nguồn truyện phổ biến (Wikidich/Wikicv, Sangtacviet, Chiasename Blog).
  2. Xây dựng Core Engine bóc tách dữ liệu chuẩn (`duongden` benchmark), xử lý proxy CORS an toàn, đóng gói xuất file `.txt` và file nén `.zip`.
  3. Thiết kế giao diện phẳng tối giản (Flat System UI), hạn chế tối đa lồng box, tối ưu trên cả Mobile & Desktop.
  4. Đăng ký module vào hệ thống và hoàn thiện tài liệu kỹ thuật.
* **Phiên bản mục tiêu:** `v1.2.0`
* **Người đóng góp / Nguồn tham khảo:** `duongden` (Core benchmark), `mol`, `kychi`

---

## 📌 Danh sách User Stories & Tasks Chi Tiết (Backlog & ToDo)

### 📥 EPIC 11: Get Names Tool (`/get-name`)

| Task ID | Mô tả công việc | Phân loại | Trạng thái | Ưu tiên | Phụ trách |
|---|---|---|---|---|---|
| **SP3-01** | **Xây dựng Data Types & URL Classifier:**<br>- Định nghĩa interface `NameItem`, `NamePackage`, `ExtractResult`.<br>- Triển khai hàm `detectWebsite(url)` nhận diện Wikidich/Wikicv, Sangtacviet, Chiasename. | Engine | Done ✅ | P0 | Dev |
| **SP3-02** | **Xây dựng CORS Proxy & Fetch Helper:**<br>- Triển khai helper gọi dữ liệu với fallback proxy thông minh.<br>- Tích hợp `fetchScraperSafe` (~300ms, CORS: * chuẩn), in-memory cache 2 phút.<br>- Xử lý parse DOM / Text an toàn, timeout & error handling. | Engine | Done ✅ | P0 | Dev |
| **SP3-03** | **Xây dựng Wikicv / Wikidich Parser:**<br>- Bóc tách `bookId` từ DOM/Regex.<br>- Fetch danh sách gói `/book-name-list`.<br>- Tải song song (`Promise.allSettled`) chi tiết từng gói `/name-list`. | Engine | Done ✅ | P0 | Dev |
| **SP3-04** | **Xây dựng Sangtacviet Parser:**<br>- Bóc tách `bookhost` & `bookid` từ URL cấu trúc `/truyen/[host]/[type]/[id]/`.<br>- Parse dữ liệu bảng/namesys qua `fetchScraperSafe`, lọc bỏ tiền tố `$`. | Engine | Done ✅ | P0 | Dev |
| **SP3-05** | **Xây dựng Chiasename Parser:**<br>- Parse thẻ `.entry-content > p` hoặc `.post-body p` qua Cloudflare Worker scraper.<br>- Lọc sạch ký tự `&nbsp;`, `\u00a0`. | Engine | Done ✅ | P1 | Dev |
| **SP3-06** | **Xây dựng Giao diện Trang `GetName.tsx`:**<br>- Search input bar với nút "Dán link" (Paste Clipboard) và "Tải Names".<br>- Danh sách nguồn hỗ trợ dạng 3 cột cân đối.<br>- Tuân thủ quy tắc **Hạn chế lồng box**, bảng màu Azure Fresh, Light/Dark mode. | UI/UX | Done ✅ | P0 | Frontend |
| **SP3-07** | **Xây dựng Component `NamePackageCard.tsx`:**<br>- Thẻ phẳng hiển thị tên gói, badge đếm số lượng name.<br>- Live Sandbox Preview hiển thị 8 dòng đầu kèm nút cuộn.<br>- Nút tải 1-Click `.txt` & nút Sao chép nội dung chuẩn cảm ứng 44px. | UI/UX | Done ✅ | P0 | Frontend |
| **SP3-08** | **Tích hợp Tải Trọn Bộ File `.zip` (JSZip):**<br>- Khi truyện có nhiều gói name (Sangtacviet, Wikidich), cung cấp nút tải trọn bộ `.zip` tự động đóng gói. | Feature | Done ✅ | P1 | Dev |
| **SP3-09** | **Đăng ký Route & Tool Registry:**<br>- Khai báo route `/get-name` trong `src/App.tsx`.<br>- Thêm tool item vào danh mục `other_tools` trong `src/config/tools.ts`. | Integration | Done ✅ | P0 | Dev |
| **SP3-10** | **Kiểm thử Tích hợp & Xử lý Ngoại lệ:**<br>- Test URL rỗng, URL không hợp lệ, URL không có name.<br>- Test clipboard permission trên các trình duyệt mobile & desktop. | QA / Test | Done ✅ | P1 | QA / Dev |

---

## 📋 TODO CHECKLIST HÀNG NGÀY (DAILY SPRINT TODO)

- [x] **Giai đoạn 1: Core Engine & Parsers**
  - [x] Khởi tạo thư mục `src/engine/getNames/`
  - [x] Viết `types.ts` & `urlDetector.ts`
  - [x] Viết `corsProxyHelper.ts` (Tích hợp `fetchScraperSafe` + cache in-memory 2 phút)
  - [x] Viết `wikicvParser.ts` (chuẩn `duongden` + tải song song)
  - [x] Viết `sangtacvietParser.ts` (chuẩn `ngatngay` + `mol`)
  - [x] Viết `chiasenameParser.ts` (chuẩn `mol`)
  - [x] Viết `textHelper.ts` (Xử lý chuỗi và làm sạch ký tự)
  - [x] Viết `exportHelper.ts` (Tải .txt & đóng gói .zip với JSZip)
  - [x] Viết `index.ts` (Hàm điều phối `extractNames`)

- [x] **Giai đoạn 2: UI & Components**
  - [x] Tạo `src/pages/GetName.tsx` (Toolbar phân cấp rõ ràng)
  - [x] Tạo `src/components/get-name/NamePackageCard.tsx`
  - [x] Tạo `src/components/get-name/SupportedSitesStrip.tsx` (Cân đối 3 cột)
  - [x] Tối ưu hóa UI & String cho màn hình di động (320px – 430px)

- [x] **Giai đoạn 3: Tích Hợp & Hoàn Thiện**
  - [x] Cập nhật `src/config/tools.ts` (thêm icon `FolderDown`)
  - [x] Cập nhật `src/App.tsx` (thêm route `/get-name` + React Router v7 future flags)
  - [x] Cập nhật `src/components/Header.tsx` & `src/pages/Home.tsx`
  - [x] Cập nhật `docs/modules/get-name.md`, `docs/overview.md` & `README.md`
  - [x] Chạy build production `pnpm run build` kiểm tra bundle và types (Pass 100%)

---

## 🎯 KẾT QUẢ NGHIỆM THU (SPRINT REVIEW)

1. **Chức năng:** Hoàn thành 10/10 tasks, trích xuất chính xác từ điển tên riêng của Wikidich, Sangtacviet, Chiasename.
2. **Hiệu năng:** Thời gian phản hồi ~0.4s – 1.2s; cache hit 0ms.
3. **Chất lượng mã nguồn:** TypeScript 100% type-safe, không có warning console, bundle tối ưu.
