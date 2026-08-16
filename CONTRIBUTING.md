# 🤝 Hướng Dẫn Đóng Góp (Contributing Guide)

Cảm ơn bạn đã quan tâm đến việc đóng góp cho **vBook Toolkit**! Dự án được phát triển phi lợi nhuận bởi và vì cộng đồng đọc truyện vBook.

---

## 🛠️ Quy Trình Đóng Góp

### 1. Fork & Clone Repository
```bash
git clone https://github.com/kychitoge/vbook-toolkit.git
cd vbook-toolkit
pnpm install
```

### 2. Tạo Branch Mới
Đặt tên branch theo tính năng hoặc lỗi bạn đang sửa:
```bash
git checkout -b feat/ten-tinh-nang
# hoặc
git checkout -b fix/ten-loi
```

### 3. Nguyên Tắc Phát Triển
* **Kiến trúc Plugin/Tool:** Khi thêm công cụ mới, chỉ cần tạo trang trong `src/pages/`, đăng ký trong `src/config/tools.ts` và khai báo route trong `src/App.tsx`.
* **Theme Support:** Đảm bảo mọi component hỗ trợ cả 2 chế độ **Light** và **Dark** mode.
* **Type Safety:** Tuân thủ chặt chẽ TypeScript, không dùng `any`.
* **Client-Side First:** Tất cả xử lý logic ưu tiên chạy 100% tại Client.

### 4. Kiểm Tra Trước Khi Mở PR
Chạy lệnh build kiểm tra TypeScript và bundle:
```bash
pnpm run build
```

### 5. Tạo Pull Request (PR)
Mô tả rõ ràng các thay đổi bạn đã thực hiện, đính kèm ảnh chụp màn hình (nếu có thay đổi giao diện) và liên kết đến Issue liên quan.
