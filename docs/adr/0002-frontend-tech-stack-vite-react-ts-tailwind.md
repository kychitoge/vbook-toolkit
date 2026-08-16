# ADR 0002: Lựa chọn Tech Stack Frontend (Vite + React + TypeScript + Tailwind CSS)

* **Trạng thái:** Chấp thuận (Accepted)
* **Ngày:** 16/08/2026
* **Tác giả:** Kychi & Antigravity

## 1. Bối cảnh (Context)
Dự án cần một nền tảng web hiện đại, hỗ trợ quản lý trạng thái động (state) mượt mà cho các tính năng phức tạp như **Rule Tester** (phân tích chuỗi, quản lý hàng nghìn rule, regex) và **Name Color Live Preview** (render CSS gradient theo thời gian thực), đồng thời phải có tốc độ build static cực nhanh và dung lượng nhẹ.

## 2. Quyết định (Decision)
* **Build Tool:** Vite (tốc độ HMR tức thì, build bundle tối ưu).
* **Framework:** React 18+ (hệ sinh thái phong phú, Component-driven, tối ưu re-render).
* **Ngôn ngữ:** TypeScript (đảm bảo type-safety chặt chẽ cho parser AST và các model dữ liệu rule).
* **Styling:** Tailwind CSS cấu hình bộ màu Azure Fresh (`#085f89`, `#038fd2`, `#edf9ff`, `#989898`, `#313131`), tuân thủ phong cách Clean Utility / Light Brutalism.
* **Quản lý package:** `pnpm`.

## 3. Hệ quả (Consequences)
* **Tích cực:** Quản lý state mạch lạc, dễ mở rộng, dễ viết unit test cho parser engine, build static tương thích 100% với Cloudflare Pages.
* **Tiêu cực:** Cần cấu hình ban đầu cho TypeScript và Tailwind, nhưng chi phí này rất nhỏ so với lợi ích mang lại.
