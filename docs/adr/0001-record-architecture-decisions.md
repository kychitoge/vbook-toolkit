# ADR 0001: Lưu trữ các Quyết định Kiến trúc (Architectural Decision Records)

* **Trạng thái:** Chấp thuận (Accepted)
* **Ngày:** 16/08/2026
* **Tác giả:** Kychi & Antigravity

## 1. Bối cảnh (Context)
Dự án VBOOK TOOL có nhiều quyết định kỹ thuật liên quan đến framework, cơ chế plugin, tách engine rule tester, triển khai static hosting và tối ưu trải nghiệm người dùng. Việc ghi lại các quyết định này giúp toàn bộ dev trong cộng đồng hiểu được lý do và bối cảnh đằng sau mỗi lựa chọn.

## 2. Quyết định (Decision)
Áp dụng định dạng chuẩn ADR (Architecture Decision Records) và lưu trữ trong thư mục `docs/adr/` theo thứ tự đánh số `000x-tieu-de.md`.

## 3. Hệ quả (Consequences)
Mọi thay đổi lớn về kiến trúc hoặc công nghệ trong tương lai đều phải bổ sung một bản ghi ADR mới.
