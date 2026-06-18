# RULES.md — Cổng Thông Tin Quy Trình Liên Kết Ngân Hàng | Tingee × HENO

## What this app does

Cổng thông tin dạng tài liệu hướng dẫn (Static Web Portal) cung cấp hướng dẫn chi tiết quy trình liên kết các loại tài khoản (Cá nhân, Doanh nghiệp, Hộ kinh doanh) với hệ thống Tingee cho 14 ngân hàng tại Việt Nam.

## Stack

- **HTML5 & CSS3** — Giao diện phản hồi (Responsive), hỗ trợ Dark Mode thông qua CSS custom variables.
- **Vanilla JavaScript** — Điều hướng cuộn trang (Scroll Spy), Tìm kiếm và làm nổi bật từ khóa (Search Highlight), Đóng/Mở các nhóm quy trình (Accordion), và Modal xem tài liệu PDF trực tiếp bằng iframe.
- **VietQR Logo API** — Tự động hiển thị logo của 14 ngân hàng qua `api.vietqr.io`.

## Rules for every task

1. **Read specs first.** Before writing any code, read `specs/product-spec.md` and `specs/implementation-plan.md`.
2. **One phase at a time.** Implement only the phase or checklist item asked for. Stop and confirm before moving to the next.
3. **Keep it simple.** No extra libraries, no extra abstractions. If three places share logic, only then extract a helper.
4. **Do not change architecture** unless `specs/product-spec.md` or `specs/implementation-plan.md` has been updated first.
5. **After each implementation:** update `specs/change-log.md` and explain how to manually test the change.

## Conventions

- Tên file: Tách biệt rõ ràng các tệp trong các thư mục `pages/`, `css/`, `js/`.
- Bố cục CSS: Thiết kế Responsive sử dụng các biến định vị `--sw` (sidebar width) và `--sh` (header height).
- Giao diện: Dark Mode được điều khiển bằng thuộc tính `[data-theme="dark"]` trên phần tử `<html>` và lưu trữ trạng thái qua `localStorage`.

## Security rules (non-negotiable)

- Không đưa thông tin nhạy cảm, API keys hay thông tin xác thực nội bộ của HENO/Tingee lên mã nguồn trang tĩnh.
- Kiểm tra tính hợp lệ của các đường dẫn liên kết tài liệu biểu mẫu đính kèm trong thư mục `docs/`.

## Key files

| File | Purpose |
|---|---|
| `index.html` | Trang chủ cổng thông tin hướng dẫn |
| `pages/bank.html` | Trang chi tiết hướng dẫn liên kết 14 ngân hàng |
| `css/home.css` | Phong cách thiết kế cho trang chủ |
| `css/bank.css` | CSS cốt lõi cho trang chi tiết, Sidebar, Scroll Spy, Modal và Dark Mode |
| `js/home.js` | JavaScript xử lý chuyển đổi giao diện trang chủ |
| `js/bank.js` | JavaScript xử lý tương tác điều hướng, tìm kiếm, xem PDF và Dark Mode cho trang chi tiết |
| `docs/` | Thư mục chứa các tài liệu, công văn, biểu mẫu đăng ký liên kết (.docx, .pdf) |
