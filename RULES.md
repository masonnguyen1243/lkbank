# RULES.md — Cổng Thông Tin Quy Trình Liên Kết Ngân Hàng | Tingee × HENO

## What this app does

Cổng thông tin dạng tài liệu hướng dẫn (Single Page Application - SPA) cung cấp hướng dẫn chi tiết quy trình liên kết các loại tài khoản (Cá nhân, Doanh nghiệp, Hộ kinh doanh) với hệ thống Tingee cho 14 ngân hàng tại Việt Nam.

## Stack

- **ReactJS (v18) & TypeScript** — Xây dựng giao diện hướng component, quản lý trạng thái động và kiểm tra kiểu dữ liệu tĩnh chặt chẽ.
- **Vite** — Đóng gói tối ưu và cung cấp dev server nhanh.
- **Vanilla CSS3** — Hỗ trợ Dark Mode thông qua CSS custom variables và thuộc tính `[data-theme]`.
- **VietQR Logo API** — Tự động hiển thị logo của 14 ngân hàng qua `api.vietqr.io`.

## Rules for every task

1. **Read specs first.** Before writing any code, read `specs/product-spec.md` and `specs/implementation-plan.md`.
2. **One phase at a time.** Implement only the phase or checklist item asked for. Stop and confirm before moving to the next.
3. **Keep it simple.** No extra libraries, no extra abstractions. If three places share logic, only then extract a helper.
4. **Do not change architecture** unless `specs/product-spec.md` or `specs/implementation-plan.md` has been updated first.
5. **After each implementation:** update `specs/change-log.md` and explain how to manually test the change.

## Conventions

- Tên file & Thư mục: Đặt trong cấu trúc phân chia rõ ràng `src/pages/` (trang chính), `src/components/ui/` (UI dùng chung), `src/components/[feature]/` (cụm nghiệp vụ ngân hàng/chi hộ/trích nợ/ví), `src/hooks/`, `src/context/`, và `src/styles/`.
- Bố cục CSS: Thiết kế Responsive sử dụng các biến định vị `--sw` (sidebar width) và `--sh` (header height).
- Giao diện: Dark Mode được điều khiển bằng thuộc tính `[data-theme="dark"]` trên phần tử `<html>` thông qua `ThemeContext` và lưu trữ trạng thái qua `localStorage`.

## Security rules (non-negotiable)

- Không đưa thông tin nhạy cảm, API keys hay thông tin xác thực nội bộ của HENO/Tingee lên mã nguồn.
- Kiểm tra tính hợp lệ của các đường dẫn liên kết tài liệu biểu mẫu đính kèm trong thư mục `public/docs/`.

## Key files

| File / Directory | Purpose |
|---|---|
| `src/main.tsx` | Điểm khởi chạy (Entrypoint) gắn kết React với DOM |
| `src/App.tsx` | Component gốc điều phối định tuyến và layout chính |
| `src/pages/` | Thư mục chứa các trang chính điều hướng (`Home.tsx`, `BankDetails.tsx`, `DisbursementDetails.tsx`,...) |
| `src/components/ui/` | Thư mục chứa các component giao diện dùng chung (`Accordion.tsx`, `PDFModal.tsx`, `HighlightText.tsx`,...) |
| `src/components/bank/` | Thư mục chứa component nghiệp vụ ngân hàng (`BankSection.tsx`, `BankSidebar.tsx`, và guideline chi tiết) |
| `src/components/disbursement/`| Thư mục chứa component nghiệp vụ dịch vụ Chi hộ |
| `src/components/autodebit/` | Thư mục chứa component nghiệp vụ Trích nợ tự động |
| `src/components/wallet/` | Thư mục chứa component nghiệp vụ tích hợp Ví điện tử |
| `src/hooks/useScrollSpy.ts` | Custom hook theo dõi vị trí cuộn trang để cập nhật liên kết active ở Sidebar |
| `src/context/ThemeContext.tsx` | Context quản lý chế độ giao diện Sáng / Tối (Light/Dark Theme) |
| `src/styles/` | Thư mục chứa CSS định dạng giao diện (`home.css` và `bank.css`) |
| `public/docs/` | Các biểu mẫu mẫu và quy trình đính kèm dạng file (.docx, .pdf) |

