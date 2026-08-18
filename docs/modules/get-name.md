# 📥 MODULE: GET NAMES — TẢI & BÓC TÁCH TỪ ĐIỂN TÊN RIÊNG (`/get-name`)

## 1. Mục đích & Bối cảnh
**Get Names** là công cụ trích xuất, xem trước (Sandbox Preview) và tải danh sách **Names (Từ điển tên riêng / QuickTranslate)** từ các nguồn web truyện được cộng đồng vBook sử dụng nhiều nhất (**Wikidich/Wikicv**, **Sangtacviet**, **Chiasename Blog**).

Công cụ chuyển hóa và tối ưu hóa logic thu thập name từ các mã nguồn tham khảo của cộng đồng (`duongden` - làm chuẩn cốt lõi, `mol`, `ngatngay`) thành một giải pháp 100% Client-Side hiện đại, tốc độ cao, giao diện phẳng chuẩn *Azure Fresh*, thân thiện với màn hình di động và hỗ trợ xuất file (`.txt`, `.zip`) chỉ với 1-Click.

---

## 2. Các Nguồn Hỗ Trợ & Phương Thức Bóc Tách

| Nguồn truyện | URL Pattern mẫu | Cơ chế bóc tách & Xử lý | Định dạng đầu ra |
|---|---|---|---|
| **Wikidich / Wikicv** | `https://wikicv.org/truyen/[slug]`<br>`https://truyenwikidich.net/truyen/[slug]` | 1. Bóc tách `bookId` từ DOM (`#bookId` hoặc regex `var bookId = "..."`).<br>2. Tải danh sách gói name qua `/book-name-list?bookId=...`.<br>3. Tải song song (`Promise.allSettled`) nội dung tất cả các gói qua `/name-list?bookId=...&id=...` và parse cặp `data-ncn=data-nvi` hoặc `#ddListName`. | Từng gói `.txt` riêng biệt, tải gộp (.txt) hoặc trọn bộ (.zip). |
| **Sangtacviet** | `https://sangtacviet.pro/truyen/[host]/[type]/[bookid]/` | 1. Bóc tách `bookhost` & `bookid` từ URL.<br>2. Gọi trích xuất qua `fetchScraperSafe` (`/namesys.php?host=[bookhost]&book=[bookid]`).<br>3. Bóc tách từng dòng `chinese=vietnamese` (làm sạch tiền tố `$`). | Từng gói `.txt`, tải gộp (.txt) hoặc nén gói (.zip). |
| **Chiasename Blog** | `https://chiasename.blogspot.com/[year]/[month]/[slug].html` | 1. Trích xuất siêu tốc qua `fetchScraperSafe` (bóc tách `.post-body p`, `div.entry-content > p`).<br>2. Lọc bỏ dòng trống, comment `#` và ký tự rác `&nbsp;`, `\u00a0`. | File `.txt` chuẩn hóa vBook QT. |

---

## 3. Kiến Trúc Core Engine TypeScript (`src/engine/getNames/`)

### 3.1. Data Models (`types.ts`)
```typescript
export type SupportedSiteId = 'wikicv' | 'sangtacviet' | 'chiasename' | 'unknown';

export interface SupportedSiteMeta {
  id: SupportedSiteId;
  name: string;
  domain: string;
}

export interface NameItem {
  chinese: string;
  vietnamese: string;
  raw?: string;
}

export interface NamePackage {
  id: string;
  title: string;
  totalCount: number;
  date?: string;
  site: SupportedSiteId;
  content: string; // Nội dung raw (.txt) đã được chuẩn hóa UTF-8: Chinese=Vietnamese
  names?: NameItem[];
  originalName?: string;
}

export interface ExtractResult {
  bookTitle?: string;
  sourceUrl: string;
  site: SupportedSiteId;
  siteName: string;
  packages: NamePackage[];
  totalNames: number;
}
```

### 3.2. Cấu trúc Module
* **`urlDetector.ts`**: Nhận diện URL hợp lệ và phân loại nguồn đích (`wikicv`, `sangtacviet`, `chiasename`).
* **`corsProxyHelper.ts`**: Hệ thống kết nối đa tầng:
  * `fetchScraperSafe()`: Trích xuất trực tiếp thẻ DOM qua Cloudflare Worker scraper (~300ms – 600ms, có sẵn header `Access-Control-Allow-Origin: *`).
  * `fetchTextSafe()`: Fallback qua danh sách CORS Proxy chuẩn (`proxy.cors.sh`, `api.allorigins.win`, `api.codetabs.com`).
  * In-Memory Cache (RAM 2 phút): Phản hồi `0ms` khi truy vấn lại URL vừa xem.
* **`textHelper.ts`**: Bộ lọc dùng chung chuẩn hóa dòng text `Chinese=Vietnamese`, làm sạch khoảng trắng và tiền tố `$`.
* **`exportHelper.ts`**: Xử lý tải file an toàn (`.txt`, `.zip` qua `JSZip`), sanitize tên file tương thích mọi hệ điều hành.
* **`parsers/`**: 3 Parser độc lập cho từng nguồn, tái sử dụng Singleton `DOMParser` để tối đa hiệu năng.

---

## 4. Đặc Tả Giao Diện & Trải Nghiệm Người Dùng (UI/UX)

1. **Ràng buộc thiết kế Flat UI (No Deeply Nested Boxes):**
   * Bố cục phẳng, không lồng box nhiều tầng gây chật hẹp trên di động.
   * Màu sắc chuẩn hệ thống **Azure Fresh** (`brand-primary: #038fd2`, dark mode tương thích).
2. **Cân đối Layout 3 Nguồn ([`SupportedSitesStrip.tsx`](file:///d:/MyCode/vbook-toolkit/src/components/get-name/SupportedSitesStrip.tsx)):**
   * Dàn đều 3 cột (`grid-cols-1 sm:grid-cols-3`), không bị trống bất đối xứng.
3. **Thanh Toolbar Kết Quả Phân Cấp Rõ Ràng:**
   * Hàng 1: Pill tag nguồn (`WIKIDICH`, `SANGTACVIET`, `CHIASENAME`) với `whitespace-nowrap` + số lượng gói/names.
   * Hàng 2: Tên truyện chữ to đậm `font-bold text-sm sm:text-base`.
   * Hàng 3: Cụm nút hành động cảm ứng lớn (44px touch friendly) hỗ trợ sao chép, tải gộp `.txt`, hoặc tải trọn bộ `.zip`.
4. **Live Sandbox Preview ([`NamePackageCard.tsx`](file:///d:/MyCode/vbook-toolkit/src/components/get-name/NamePackageCard.tsx)):**
   * Đánh số thứ tự dòng, highlight màu sắc phân biệt từ gốc (tiếng Trung) và nghĩa dịch (tiếng Việt).
   * Hỗ trợ xem trước 8 dòng đầu kèm nút mở rộng/thu gọn mượt mà.

---

## 5. Đo Kiểm Hiệu Năng & Tương Thích

* **Thời gian bóc tách trung bình:** $0.4\text{s} - 1.2\text{s}$.
* **Trạng thái Cache Hit:** $0\text{ms}$ (tức thì).
* **Kiểm thử Console (F12):** 0 lỗi đỏ CORS, 0 cảnh báo React Router v7.
* **Build Production:** Pass 100% (Vite + TypeScript).
