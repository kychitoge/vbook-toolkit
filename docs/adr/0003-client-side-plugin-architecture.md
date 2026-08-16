# ADR 0003: Kiến trúc Plugin Hoàn toàn ở Client-Side

* **Trạng thái:** Chấp thuận (Accepted)
* **Ngày:** 16/08/2026
* **Tác giả:** Kychi & Antigravity

## 1. Bối cảnh (Context)
VBook Toolkit hướng tới mục tiêu là một trung tâm công cụ cộng đồng. Các công cụ có thể do nhiều lập trình viên khác nhau đóng góp (ví dụ tác giả `ngatngay`, `duongden`, `kychi`...). Cần một cấu trúc mã nguồn sao cho việc thêm mới hoặc gỡ bỏ công cụ không làm vỡ các phần còn lại.

## 2. Quyết định (Decision)
* Xây dựng Registry công cụ tập trung tại `src/config/tools.ts`.
* Mỗi công cụ được đóng gói thành một trang / plugin độc lập có metadata (id, title, author, route, icon).
* Toàn bộ xử lý chạy 100% tại Client (Browser).

## 3. Hệ quả (Consequences)
* Không tốn chi phí duy trì backend server.
* Tốc độ phản hồi cực nhanh, không lo nghẽn mạng server.
* Dễ dàng bảo trì hoặc cho phép dev khác tạo PR bổ sung tool mới.
