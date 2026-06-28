# Cổng Thông Tin Quy Trình Liên Kết Ngân Hàng | Tingee × HENO

## 1. Tổng quan & Tính năng

- Ứng dụng SPA được xây dựng bằng **ReactJS (v18) + TypeScript**, tối ưu hoá cấu trúc component và quản lý trạng thái động.
- **Giao diện mới**: 
  - Header cố định, nút **Back** luôn căn lề trái 20px và dẫn về trang chủ.
  - **Hero Banner** gradient đã đồng bộ trên tất cả các trang chi tiết, nằm ngoài `main‑layout‑container` để hiển thị full‑width.
  - **Logo Tingee** được chèn vào mọi trang chi tiết (Onepay, Payoo, …) ngay bên dưới tiêu đề.
  - Các tab **“Tổng quan”** và **“Thuật ngữ”** đã được loại bỏ để tránh rối mắt.
  - Khi truy cập bất kỳ trang nào, **tràn scroll sẽ tự động reset về đầu trang** (`window.scrollTo(0,0)`).
- Tìm kiếm thông minh, Dark/Light mode, PDF modal, FAQs, v.v.

## 2. Stack & Công nghệ
- **Framework**: ReactJS (v18) + TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS3 (Custom Properties, Glassmorphism, Gradient Banner)
- **Assets**: Icon SVG, Google Fonts (Inter), Logo Tingee, VietQR API

## 3. Khởi động nhanh (Quick Start)
1. Cài đặt dependencies:
```bash
npm install
```
2. Chạy dev server:
```bash
npm run dev
```
3. Build production:
```bash
npm run build
```

## 4. Cấu trúc thư mục dự án
```
src/
├─ components/
│  ├─ ui/               # Component UI chung (Accordion, PDFModal, …)
│  ├─ bank/             # Component ngân hàng
│  ├─ disbursement/     # Component dịch vụ Chi hộ
│  ├─ autodebit/        # Component Trích nợ tự động
│  └─ wallet/           # Component Ví điện tử
├─ pages/                # Các trang chính (Home, BankDetails, …)
├─ hooks/                # Custom hooks (useScrollSpy, …)
├─ context/              # ThemeContext, …
├─ styles/               # CSS files (bank.css, faqs.css, …)
├─ App.tsx               # Layout & routing
└─ main.tsx              # Entrypoint
```

## 5. Liên kết & Tài liệu tham khảo
- Tingee Developers Portal: https://developers.tingee.vn
- Cổng kết nối thanh toán Tingee: https://tingee.vn
