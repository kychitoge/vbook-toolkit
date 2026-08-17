# 🏛️ KIẾN TRÚC HỆ THỐNG (Architecture Overview)

## 1. Mô hình tổng thể (High-Level Architecture)
Hệ thống được thiết kế theo mô hình **Static Single Page Application (SPA)** chạy 100% tại Client, triển khai trên nền tảng **Cloudflare Pages**.

```mermaid
graph TD
    User([Người dùng]) --> CF[Cloudflare Pages]
    CF --> SPA[vBook Toolkit SPA]
    
    subgraph Root_Providers [Cấu Trúc Root Providers]
        SPA --> ThemeProv[ThemeProvider (Light / Dark Mode)]
        ThemeProv --> Router[React Router DOM]
        Router --> ToastProv[ToastProvider]
    end

    subgraph SPA_Modules [Kiến trúc Module / Công Cụ]
        ToastProv --> Layout[Layout + Header + Footer + SnowEffect]
        Layout --> Home[Trang Chủ Toolkit]
        Layout --> Premium[Nâng Cấp Premium + VietQR MB Bank]
        Layout --> NameColor[Tên Nhiều Màu Live Preview]
        Layout --> Download[Tải Ứng Dụng vBook]
        Layout --> RuleTester[vBook Rule Tester Web]
        Layout --> FontPreview[Thử Font & Nền Live Sandbox]
        
        Layout -. Instant Redirect .-> GitBook[HDSD GitBook /hdsd]
        Layout -. Instant Redirect .-> VBookExt[Nguồn Extension /extension]
        Layout -. Instant Redirect .-> QTColl[Data QT Collection /qt]
    end

    subgraph CDN_Asset_Pipeline [Hạ tầng Phân Phối Asset R2]
        R2[Cloudflare R2 Bucket] --> CustomDomain[toolkit-cdn.vbookext.me]
        CustomDomain --> FontPreview
    end

    subgraph Core_Engines [Core Engine Độc Lập]
        RuleTester --> RuleParser[Rule Parser & Compiler]
        RuleTester --> RuleValidator[Rule Syntax & Anchor Validator]
    end
```

---

## 2. Hệ thống Thiết kế & Quản Lý Theme (Design System & Theme Engine)
Tuân theo định hướng **Flat System UI / Minimalist Utility Tool**:
* **Chế độ Sáng / Tối (Light / Dark Mode):**
  - Quản lý qua `ThemeContext` đặt tại Root (`src/main.tsx`).
  - Tự động áp dụng class `dark` lên `document.documentElement` và `document.body`.
  - Tự động đồng bộ với thiết lập hệ điều hành (`prefers-color-scheme: dark`) và giữa các tab trình duyệt (`storage` event).
  - Tích hợp công tắc đổi theme 1-chạm mượt mà trên cả thanh điều hướng Desktop và Mobile toolbar.
* **Bảng màu Azure Fresh Palette:**
  - `brand-dark`: `#085f89`
  - `brand-primary`: `#038fd2`
  - `brand-hover`: `#0277b0`
  - `brand-tint`: `#edf9ff`
  - `brand-surface`: `#ffffff`
  - `brand-text`: `#1e293b`
  - `brand-muted`: `#64748b`
  - `brand-border`: `#e2e8f0`

---

## 3. Cơ chế Mở rộng Dạng Plugin (Plugin Registry)
Mỗi công cụ được đăng ký thông qua cấu hình `src/config/tools.ts`:
```typescript
export interface ToolItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  author: string;
  route: string;
  category: ToolCategory;
  iconName: 'HeartHandshake' | 'Palette' | 'BookOpen' | 'Download' | 'Code2' | 'Boxes' | 'Layers';
  isExternal?: boolean;
  externalUrl?: string;
}
```
Khi muốn phát triển một tool mới:
1. Tạo page/component mới trong `src/pages/` hoặc `src/components/`.
2. Thêm một entry vào `src/config/tools.ts`.
3. Khai báo route trong `src/App.tsx`.
Trang chủ sẽ tự động hiển thị thẻ công cụ một cách đồng bộ và tự động nhóm theo danh mục.

