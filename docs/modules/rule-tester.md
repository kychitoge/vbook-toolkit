# 🧪 MODULE 4: VBOOK RULE TESTER WEB (`/rule-tester`)

## 1. Mục đích
Chuyển đổi tiện ích VS Code Extension (`vbook-rule-tester-0.3.2` của tác giả `duongden`) thành công cụ Web độc lập, giúp dịch giả và cộng đồng kiểm tra, soát lỗi cú pháp quy tắc dịch QuickTranslate trực tiếp trên trình duyệt mà không cần cài đặt VS Code.

---

## 2. Kiến Trúc Core Engine TypeScript

### `src/engine/ruleEngine.ts`:
* **Parser linh hoạt (`parseRulesFromText`):** Tự động nhận diện mọi biến thể định dạng:
  * `pattern = translation` (có khoảng trắng)
  * `pattern=translation` (dấu `=` viết liền)
  * `"pattern"="translation"` (dấu ngoặc kép bao quanh)
  * `pattern\ttranslation` (phân cách bằng phím Tab)
* **Compiler (`compile`):** Biên dịch pattern thành RegExp capture groups.
  * Hỗ trợ token: `<n>` (số Hán tự), `<y>` (năm/chữ số thuần), `<L>` (nhãn chương `章卷集节節幕回折`), `<ne>`, `<pn>`, `<vp>`, `<hv>`, `<w>`, và range `:min-max` (vd `<n:1-4>`).
  * Nhóm chọn lựa `(a|b|c)` và tùy chọn `(a)?`.
* **Bộ chuyển đổi chữ số (`chineseNumber`):** Sử dụng thuật toán **BigInt** chuyển đổi chuẩn xác mọi số Hán tự từ đơn giản đến phức tạp (`〇零一二两兩三四五六七八九十百千万萬亿億兆0-9`).
* **Trình so khớp & Ưu tiên (`executeRules`):** Khớp các match không chồng lấn, sắp xếp ưu tiên theo `literalLength` $\to$ `wildcardCapacity` $\to$ độ dài text gốc $\to$ số dòng.
* **Tạo ví dụ tự động (`makeExample`):** Sinh chuỗi ví dụ `Input → Output` từ pattern để người dùng xem trực quan.

### `src/engine/ruleValidator.ts`:
* **Phát hiện Anchor (`findAnchor`):** Kiểm tra ký tự neo cố định của rule.
* **Lỗi nghiêm trọng (Hard Errors):**
  * Lỗi cú pháp thẻ `<spec>` hoặc nhóm ngoặc `()`.
  * Không có wildcard hoặc thiếu anchor.
  * Anchor quá phổ biến (`的了是不存在在上下个個`).
  * Chứa ký tự phân tách đa nghĩa `¦`.
  * Tham chiếu placeholder `{0}`, `{1}` không tồn tại hoặc capture bị bỏ quên.
* **Cảnh báo (Warnings):**
  * Pattern bị lặp lại trong file.
  * Nhóm neo quá đông (> 20 rule dùng chung 1 neo).
  * Wildcard từ điển chưa giới hạn độ dài.

---

## 3. Tính Năng Giao Diện Web

* **Kéo & Thả (Drag & Drop) & Xử lý file lớn:**
  * Hỗ trợ nạp file `.txt` có dung lượng bất kỳ (kể cả file **16.000 dòng**). Toàn bộ quá trình đọc file diễn ra 100% Client-Side qua `FileReader` API.
  * Tự động giới hạn số lượng thẻ lỗi hiển thị (60 thẻ ban đầu + nút "Xem thêm") để DOM không bị giật lag khi có hàng trăm lỗi.
* **Xuất file `.txt` (Export):** Cho phép tải file rule đã chỉnh sửa/xóa lỗi về máy chỉ với 1-chạm.
* **Tích hợp Kho Data QT:** Nút mở nhanh kho dữ liệu cộng đồng `https://qt.vbookext.me/collections`.
* **Bộ Rule mẫu chính thức:** Nạp bộ rule QuickTranslate chuẩn của cộng đồng vBook (`src/config/sampleRules.ts`).
* **Phím tắt:** Hỗ trợ `Ctrl + Enter` / `Cmd + Enter` để chạy kiểm tra thử nghiệm dịch nhanh.
