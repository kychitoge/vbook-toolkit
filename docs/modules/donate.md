# 💎 MODULE 1: NÂNG CẤP TÀI KHOẢN PREMIUM (`/premium`)

## 1. Mục đích
Cung cấp cổng ủng hộ kinh phí duy trì máy chủ cho Admin vBook (`VU DUC LONG`) và hướng dẫn người dùng kích hoạt tài khoản Premium tự động bằng cú pháp chuyển khoản chuẩn hóa.

*Ghi chú định tuyến:* Đổi route từ `/donate` sang `/premium` để người dùng không hiểu nhầm là donate cho tác giả bộ toolkit (`kychi`). Route `/donate` tự động chuyển hướng về `/premium`.

---

## 2. Bảng So Sánh Quyền Lợi (Feature Matrix)

| Quyền lợi / Tính năng | Tài khoản Free (0đ) | Tài khoản Premium (Từ 50.000đ) |
|---|---|---|
| **Đọc truyện trực tuyến** | ✅ Đầy đủ | ✅ Đầy đủ |
| **Tải truyện offline** | ⚠️ Tối đa 3 bộ/ngày (reset sau 24h) | ✅ **Không giới hạn** (mọi dung lượng) |
| **Xuất file eBook (EPUB/PDF)** | ❌ Không hỗ trợ | ✅ **Hỗ trợ xuất eBook** |
| **Màu nick hiển thị** | ❌ Màu mặc định | ✅ **Tùy biến màu nick cá nhân** |
| **Huy hiệu Tick Xanh** | ❌ Không có | ✅ **Có tick xanh chính chủ** |
| **Thời hạn sở hữu** | Vĩnh viễn | **Vĩnh viễn theo Email** |

---

## 3. Chuẩn Hóa Lời Nhắn Ngân Hàng (NAPAS Sanitization)
Hệ thống ngân hàng Việt Nam tự động lọc bỏ các ký tự đặc biệt (`@`, `.`, `-`, `_`) khi chuyển khoản, gây dính liền chữ (vd: `lehongky@gmail.com` $\to$ `lehongkygmailcom`).

**Quy tắc chuẩn hóa:**
Thay thế tất cả các ký tự `@`, `.`, `-`, `_` thành **khoảng trắng đơn**:
$$\text{lehongky@gmail.com} \longrightarrow \text{lehongky gmail com donate vbook premium}$$

---

## 4. Tích Hợp VietQR & Kênh Thanh Toán
* **Ngân hàng MB Bank (Chính thức):**
  * Tên chủ tài khoản: `VU DUC LONG`
  * Số tài khoản: `9704229200720097`
  * Mã VietQR sinh tự động: Khung QR to 360px rõ nét kèm icon tải ảnh về máy.
  * Các nút sao chép 1-chạm: STK, Số tiền, Lời nhắn chuẩn.
* **Các kênh khác:** Ví MoMo (`me.momo.vn/donatevbook`), Viettel Money, PayPal Quốc Tế.
* **Hỗ trợ kích hoạt sau 24h:** Hộp thông báo kèm link máy chủ **[Discord vBook Community](https://discord.gg/yXFRdG4kJq)**.
