# Cổng Thông Tin Quy Trình Liên Kết Ngân Hàng | Tingee × HENO

Hệ thống tài liệu hướng dẫn quy trình liên kết tài khoản ngân hàng (Cá nhân, Doanh nghiệp, Hộ kinh doanh) dành cho đội ngũ hỗ trợ của HENO, Sales và Khách hàng liên kết với cổng thanh toán Tingee.

## Tổng quan

Cổng thông tin được xây dựng dưới dạng ứng dụng trang tĩnh (Static Web App) tối ưu hóa cao về hiệu năng và trải nghiệm người dùng:
- **Trang chủ (`index.html`)**: Điều hướng người dùng truy cập các danh mục tài liệu.
- **Trang quy trình (`bank.html`)**: Trình bày chi tiết hướng dẫn của 14 ngân hàng thương mại tại Việt Nam.
- **Tìm kiếm thông minh**: Lọc danh sách ngân hàng ở sidebar theo thời gian thực và tự động đánh dấu (Highlight) từ khóa khớp.
- **Dark Mode**: Hỗ trợ chuyển đổi nhanh chủ đề Sáng / Tối và lưu trạng thái ưu tiên.
- **Xem tài liệu trực tiếp**: Hỗ trợ Modal xem biểu mẫu PDF tích hợp không cần rời trang hoặc mở tab mới.

## Stack & Công nghệ sử dụng

- **Front-end**: HTML5, Vanilla CSS3 (Sử dụng CSS Custom Properties để thiết kế hệ thống màu sắc động).
- **Logic & Tương tác**: JavaScript (ES6+).
- **Tài nguyên ngoài**: Icon SVG, Font Google (Plus Jakarta Sans, Inter), Logo ngân hàng từ VietQR Logo API (`api.vietqr.io`).

## Khởi động nhanh

Vì đây là dự án trang tĩnh thuần túy (Static Web Portal), bạn chỉ cần:

1. Clone dự án về máy tính cá nhân.
2. Mở trực tiếp file `index.html` bằng trình duyệt web bất kỳ (Chrome, Edge, Safari, Firefox).
3. Hoặc chạy máy chủ tĩnh đơn giản trên cổng 8080:
   ```bash
   # Nếu bạn có Python cài sẵn
   python -m http.server 8080
   ```
   Sau đó truy cập: `http://localhost:8080/index.html`

## Cấu trúc thư mục

- `index.html` — Trang đích chính.
- `pages/bank.html` — Hướng dẫn chi tiết liên kết 14 ngân hàng.
- `css/home.css` — CSS trang chủ.
- `css/bank.css` — CSS cốt lõi trang hướng dẫn và các tiện ích (Dark Mode, Modal, Scroll Spy).
- `js/home.js` — JavaScript điều hướng và đổi chủ đề trang chủ.
- `js/bank.js` — JavaScript điều khiển toàn bộ chức năng động trang chi tiết.
- `docs/` — Thư mục chứa các tài liệu quy trình, công văn thực tế từ ngân hàng (ACB, BIDV, VPBank, Vietinbank).


## Liên kết và Tài liệu tham khảo

- Tingee Developers Portal: https://developers.tingee.vn
- Cổng kết nối thanh toán Tingee: https://tingee.vn
