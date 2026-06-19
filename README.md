# Cổng Thông Tin Quy Trình Liên Kết Ngân Hàng | Tingee × HENO

Hệ thống tài liệu hướng dẫn quy trình liên kết tài khoản ngân hàng (Cá nhân, Doanh nghiệp, Hộ kinh doanh) dành cho đội ngũ hỗ trợ của HENO, Sales và Khách hàng liên kết với cổng thanh toán Tingee.

---

## 1. Tổng quan & Tính năng

Ứng dụng đã được nâng cấp từ trang tĩnh đơn thuần sang Single Page Application (SPA) xây dựng trên nền tảng **ReactJS**, tối ưu hóa cấu trúc component và quản lý trạng thái động:
- **Trang chủ**: Giao diện trực quan điều hướng người dùng truy cập các danh mục tài liệu.
- **Trang quy trình**: Trình bày chi tiết hướng dẫn của 14 ngân hàng thương mại tại Việt Nam.
- **Bộ lọc loại tài khoản**: Lọc nhanh theo Cá nhân (CN), Hộ kinh doanh (HKD), và Doanh nghiệp (DN) trên từng ngân hàng để thu gọn thông tin, tự động mở rộng accordion khi lọc ra kết quả duy nhất.
- **Tìm kiếm thông minh**: Lọc danh sách ngân hàng ở sidebar theo thời gian thực và tự động đánh dấu (Highlight) từ khóa khớp.
- **Dark Mode**: Hỗ trợ chuyển đổi nhanh chủ đề Sáng / Tối và lưu trạng thái ưu tiên qua React Context.
- **Xem tài liệu trực tiếp**: Hỗ trợ Modal xem biểu mẫu PDF tích hợp không cần rời trang hoặc mở tab mới.

---

## 2. Stack & Công nghệ sử dụng

- **Framework**: ReactJS (v18) + TypeScript
- **Build Tool**: Vite (cho thời gian load dev server cực nhanh và đóng gói tối ưu)
- **Styling**: Vanilla CSS3 (Sử dụng hệ thống biến màu CSS Custom Properties hỗ trợ Dark/Light Theme)
- **Tài nguyên ngoài**: Icon SVG, Font Google (Plus Jakarta Sans, Inter), Logo ngân hàng từ VietQR Logo API (`api.vietqr.io`).

---

## 3. Khởi động nhanh (Quick Start)

> [!WARNING]
> Vì ứng dụng React sử dụng ES Modules (`<script type="module">`), trình duyệt sẽ chặn tải tài nguyên nếu mở file `index.html` trực tiếp từ ổ đĩa (`file:///`) do chính sách CORS. Bạn **bắt buộc** phải khởi chạy qua máy chủ (Local Server) theo hướng dẫn dưới đây.

Yêu cầu máy tính đã cài đặt **Node.js** (khuyến nghị phiên bản LTS mới nhất).

1. **Cài đặt các gói phụ thuộc (Dependencies)**:
   ```bash
   npm install
   ```

2. **Khởi chạy máy chủ phát triển (Development Server)**:
   ```bash
   npm run dev
   ```
   Sau đó truy cập địa chỉ được hiển thị trên console (mặc định là `http://localhost:5173`).

3. **Biên dịch và đóng gói ứng dụng (Build Production)**:
   ```bash
   npm run build
   ```
   Sau khi hoàn tất, thư mục `/dist` được tạo ra chứa các tệp tĩnh tối ưu hóa cao, sẵn sàng đưa lên các host tĩnh như Vercel, Netlify, hoặc GitHub Pages.

---

## 4. Cấu trúc thư mục dự án

```text
├── legacy-static/         # Bản sao lưu toàn bộ source code phiên bản trang tĩnh cũ
├── public/                # Thư mục chứa tài nguyên tĩnh không qua compile
│   └── docs/              # Tài liệu, công văn, biểu mẫu đăng ký liên kết (.docx, .pdf)
├── src/                   # Thư mục mã nguồn chính (React)
│   ├── components/        # Các React Components dùng chung
│   ├── hooks/             # Custom React Hooks (như useScrollSpy, useSearchHighlight)
│   ├── context/           # React Context (quản lý Dark Mode, User state)
│   ├── styles/            # Các file CSS định dạng giao diện
│   ├── App.tsx            # Component gốc điều hướng và layout chính
│   ├── main.tsx           # Điểm khởi chạy (Entrypoint) gắn kết React với DOM
│   └── index.css          # Tệp reset CSS toàn cục
├── index.html             # Tệp HTML khung của ứng dụng
├── package.json           # Khai báo script và các thư viện dependencies
├── tsconfig.json          # Cấu hình compiler TypeScript
└── vite.config.ts         # Cấu hình đóng gói/chạy server của Vite
```

---

## 5. Liên kết và Tài liệu tham khảo

- Tingee Developers Portal: https://developers.tingee.vn
- Cổng kết nối thanh toán Tingee: https://tingee.vn
