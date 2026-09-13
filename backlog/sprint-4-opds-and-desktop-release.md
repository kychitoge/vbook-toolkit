# 🏃 SPRINT 4: OPDS DIRECTORY INTEGRATION & DESKTOP MULTI-PLATFORM DOWNLOAD HUB

* **Mục tiêu Sprint:**
  1. Tích hợp cổng chuyển hướng kho sách chuẩn OPDS (`/opds` -> `https://opds.vbookext.me/`), kèm chỉ dẫn tài liệu tại Discord và diễn đàn vBook.
  2. Nâng cấp toàn diện Hub Tải Ứng Dụng (`/download`) hỗ trợ liên kết **Apple TestFlight** chính thức cho iOS và công bố các bộ cài **Máy tính (Desktop)**: Windows (`.msi`), macOS (`.dmg`), Linux (`.deb`/`.rpm`) từ GitHub Releases.
  3. Minh bạch thông tin lộ trình tính năng cập nhật tự động (OTA) trên Desktop.
* **Thời gian:** 2026-09-13
* **Trạng thái:** Hoàn thành (Done ✅)

---

## 📋 Danh Sách Nhiệm Vụ Kỹ Thuật (Sprint Backlog)

| Mã Task | Hạng mục công việc | Trạng thái | Ưu tiên | Người phụ trách |
|---|---|---|---|---|
| **SP4-01** | Cấu hình Edge Redirect HTTP 302 cho `/opds` trong `public/_redirects`. | Done ✅ | P1 | Thursday (Dev) |
| **SP4-02** | Bổ sung Client-side Route `/opds` với `<RedirectHandler>` trong `src/App.tsx`. | Done ✅ | P1 | Thursday (Dev) |
| **SP4-03** | Thêm Tool Item `opds` (Kho Sách Điện Tử OPDS) vào `src/config/tools.ts` và icon `Library` vào `src/pages/Home.tsx`. | Done ✅ | P1 | Thursday (Dev) |
| **SP4-04** | Tích hợp nút Apple TestFlight (`https://testflight.apple.com/join/YNPyNV1r`) song song nút IPA Sideload trong `src/pages/Download.tsx`. | Done ✅ | P1 | Thursday (Dev) |
| **SP4-05** | Thiết kế Section Máy Tính (Desktop Edition) với các badge Windows MSI, macOS DMG, Linux DEB/RPM và link GitHub Releases trong `src/pages/Download.tsx`. | Done ✅ | P1 | Thursday (Dev) |
| **SP4-06** | Bổ sung Callout lưu ý lộ trình OTA cho bản Desktop trong `src/pages/Download.tsx`. | Done ✅ | P1 | Thursday (Dev) |
| **SP4-07** | Cập nhật thẻ meta mạng xã hội và OpenGraph cho `/download` đa nền tảng trong `src/config/routesMeta.ts`. | Done ✅ | P2 | Tuesday (QA) |
| **SP4-08** | Lập tài liệu kiến trúc **ADR-0009**: Tích hợp OPDS và mở rộng đa nền tảng Desktop + iOS TestFlight. | Done ✅ | P1 | Sunday (BA) |
| **SP4-09** | Cập nhật tài liệu chuyên sâu `docs/modules/download.md` và `docs/modules/redirects.md`. | Done ✅ | P1 | Sunday (BA) |
| **SP4-10** | Cập nhật tài liệu tổng quan hệ thống `docs/overview.md` và `README.md`. | Done ✅ | P1 | Sunday (BA) |
| **SP4-11** | Kiểm thử biên dịch TypeScript và chạy build sản phẩm (`pnpm run build`). | Done ✅ | P0 | Tuesday (QA) |
