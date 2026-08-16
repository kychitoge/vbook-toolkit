# ADR 0004: Tách Core Engine Độc Lập cho Rule Tester

* **Trạng thái:** Chấp thuận (Accepted)
* **Ngày:** 16/08/2026
* **Tác giả:** Kychi & Antigravity

## 1. Bối cảnh (Context)
Tiện ích `vbook-rule-tester-0.3.2` ban đầu được viết dưới dạng VS Code Extension (dùng VS Code Webview API, workspace edits và node runtime). Để đưa lên web, chúng ta không thể sử dụng trực tiếp các API của VS Code.

## 2. Quyết định (Decision)
* Trích xuất và refactor toàn bộ logic phân tích cú pháp, regex compiler, validator và bộ chuyển đổi chữ số tiếng Hán (`chineseNumber`, `digit`, `convert`) sang module TypeScript thuần túy (`src/engine/ruleEngine.ts` và `src/engine/ruleValidator.ts`).
* Độc lập hoàn toàn với framework UI để có thể tái sử dụng hoặc test bằng Vitest/Jest.
* UI của Rule Tester trên Web sẽ cung cấp cơ chế **Drag & Drop file `.txt`**, Textarea editor và bộ lọc trực quan thay thế cho Editor của VS Code.

## 3. Hệ quả (Consequences)
* Rule Tester chạy hoàn toàn mượt mà trên mọi trình duyệt (cả Mobile và Desktop).
* Giữ nguyên 100% độ chính xác của logic soát lỗi và đối sánh rule từ extension gốc.
