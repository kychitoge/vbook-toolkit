# 🎨 NGUYÊN TẮC THIẾT KẾ FLAT UI & HẠN CHẾ BOX LỒNG NHAU (ANTI-NESTING PRINCIPLES)

* **Trạng thái:** Tiêu chuẩn thiết kế chính thức (Design Standard)
* **Phạm vi áp dụng:** Toàn bộ giao diện các trang & linh kiện trong `vBook Toolkit`

---

## 1. Vấn đề của hiện tượng "Box Lồng Nhau" (Nested Boxception)

Trong thiết kế giao diện web tiện ích (Utility Web App), việc lồng ghép quá nhiều lớp thẻ hộp (Card bên trong Card, Box bên trong Box) là nguyên nhân hàng đầu khiến:
1. **Giao diện bị thu hẹp diện tích khả dụng:** Mỗi lớp hộp con thường kéo theo padding (`p-3`, `p-4`) và margin (`m-2`, `m-3`). Qua 2-3 tầng lồng, diện tích hiển thị nội dung thực tế trên màn hình bị ép lại rất bé.
2. **Gây cảm giác ngột ngạt, bí bách:** Mắt người dùng phải tiếp nhận quá nhiều đường viền (`border`), đổ bóng (`shadow`), và màu nền xám khác nhau, làm giảm độ tập trung vào dữ liệu chính.
3. **Trải nghiệm kém trên điện thoại (Mobile UX):** Trên màn hình có chiều ngang hẹp (360px - 412px), các box lồng nhau khiến chữ bị rớt dòng liên tục và nút bấm bị bóp méo.

---

## 2. Các nguyên tắc thiết kế cốt lõi (Anti-Nesting Rules)

### Quy tắc 1: Tối đa 1 tầng Container chính (Single Layer Card)
* Một vùng tính năng chỉ sử dụng **duy nhất một thẻ Card bao ngoài** (`card-flat`) hoặc sử dụng bố cục không thẻ (Cardless / Borderless).
* Tuyệt đối không đặt thêm một `card-flat` khác bên trong `card-flat`.

### Quy tắc 2: Phân tách bằng khoảng trắng & đường kẻ mảnh (Dividers & Spacing over Boxes)
* Thay vì bọc mỗi mục dữ liệu trong một hộp chữ nhật có viền và màu nền riêng, hãy dùng:
  - Danh sách phẳng với đường kẻ phân cách mảnh: `divide-y divide-slate-100 dark:divide-slate-800`
  - Khoảng cách dọc/ngang hợp lý: `space-y-3`, `gap-2.5`
  - Thay đổi độ đậm nhạt của chữ (Typography hierarchy) để phân cấp thông tin.

### Quy tắc 3: Tích hợp trực tiếp (Integrated Controls)
* **Kéo thả file:** Tích hợp trạng thái kéo thả (`drag-over`) trực tiếp lên toàn bộ diện tích của khung soạn thảo (`textarea` / `code editor`), thay vì tạo một ô kéo thả riêng bên trên làm chật chội không gian làm việc.
* **Mã QR:** Để ảnh mã QR nằm trực tiếp trên nền của Card cha, không tạo thêm hộp wrapper lồng thêm hộp wrapper.
* **Thanh công cụ (Toolbars):** Nằm phẳng ở đầu trang hoặc đầu Card, không bọc thêm Card độc lập.

---

## 3. Bảng đối chiếu thực tế trong dự án

| Vị trí | Thiết kế cũ (Bị lồng box) | Thiết kế chuẩn mới (Làm phẳng) |
| :--- | :--- | :--- |
| **Trang Premium / QR** | Card cha ➔ Khung xám ngoài ➔ Khung trắng trong ➔ Mã QR (3 lớp viền) | Card cha ➔ Khung hiển thị QR 1 lớp viền mảnh duy nhất, phóng to tối đa diện tích quét mã. |
| **Thông tin chuyển khoản** | 3 box con độc lập (STK, Số tiền, Lời nhắn) xếp chồng nhau | 1 danh sách phẳng (Flat List) chia dòng bằng `divide-y`, tối giản viền thừa. |
| **Rule Tester (Soạn thảo)** | Card cha ➔ Box Drag & Drop riêng biệt ➔ Textarea | Tích hợp sự kiện Drag & Drop trực tiếp lên Textarea, mở rộng 30% chiều cao cho code editor. |
| **Rule Tester (Kết quả)** | Mỗi kết quả khớp là 1 box chữ nhật riêng biệt | Danh sách bảng phẳng phân dòng nhẹ nhàng, dễ đọc và cuộn mượt hơn. |
| **Get Names (Nguồn hỗ trợ)** | 3 box lớn dạng card chiếm diện tích | Dải chip/badge ngang gọn gàng 1 dòng (`inline chips`). |
| **Font Preview (Toolbar)** | Toolbar bọc riêng trong 1 card biệt lập | Toolbar phẳng hòa nhập cùng trang, tối đa hóa chiều cao cho Reading Sandbox. |

---

## 4. Checklist kiểm tra giao diện (UI Review Checklist)

Mỗi khi tạo mới hoặc sửa một component:
- [ ] Không có thẻ `div` nào có `border` nằm bên trong một thẻ con khác cũng có `border` và `p-4` (trừ bảng dữ liệu có cấu trúc `table`).
- [ ] Không có quá 2 cấp độ màu nền tương phản trong cùng một khối.
- [ ] Trên màn hình di động (375px), nội dung không bị thụt lề quá 16px ở hai bên mép.
- [ ] Các nút bấm và ô nhập liệu tận dụng tối đa chiều ngang khả dụng.
