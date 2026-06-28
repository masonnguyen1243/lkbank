# Implementation Plan — Bank Linking Portal

Roadmap and developmental checklist for the HENO × Tingee Bank Linking Portal project.

## Development Phases

### Phase 1: Base Portal & Content Structure (Completed)
- Set up directory structure and initial pages `index.html` and `pages/bank.html`.
- Populate standard guidelines and step-by-step lists for 14 Vietnamese banks.
- Create static assets, CSS styles (`css/bank.css`, `css/home.css`), and icons.
- Add document directory `docs/` and load actual bank documents (ACB, BIDV, VPBank, VTB).

### Phase 2: Interactive Functionality (Completed)
- Implement sidebar quick links and scroll behavior.
- Build collapsible accordions for Account Types (Cá nhân, Doanh nghiệp, Hộ kinh doanh).
- Implement client-side sidebar search to filter bank lists by typing name.
- Develop JavaScript scroll spy to sync sidebar active highlights during main content scrolling.
- Build custom modal iframe window for inline PDF document preview.

### Phase 3: Premium Polish & Visual Updates (Completed)
- Integrate toggleable Dark Mode support for both pages using CSS custom variables and `localStorage` persistence.
- Add visual text matching highlights (`<mark class="sb-hl">`) inside the search input.
- Create a header back-to-home button with customized hover slide animations.
- Integrate a gradient scroll progress bar at the top of the body viewport.
- Add micro-transitions on interactive links, badges, and contact cards.

### Phase 4: Tối ưu UI/UX, Tính năng bổ trợ & Di chuyển sang ReactJS (Completed)
 
- **Giai đoạn 4.1: Tối ưu UI/UX và Mở rộng nội dung (Trang tĩnh) (Completed)**
  - **Task 4.1.1: Tái cấu trúc Trang chủ để chuẩn bị mở rộng quy mô** (Hoàn thành)
  - **Task 4.1.2: Nâng cấp trực quan Trang hướng dẫn chi tiết** (Hoàn thành)
 
- **Giai đoạn 4.2: Các tính năng bổ trợ tăng trải nghiệm người dùng (Trang tĩnh / React) (Completed)**
  - **Task 4.2.1: Tích hợp nút Copy nhanh dữ liệu** (Được chuyển đổi trực tiếp trong React)
  - **Task 4.2.2: Lọc nhanh theo Phân loại tài khoản** (Hoàn thành)
  - **Task 4.2.3: Hỗ trợ ngoại tuyến (Offline cache - PWA)** (Hỗ trợ đóng gói tĩnh qua Vite, sẵn sàng cho cấu hình caching phía server)
 
- **Giai đoạn 4.3: Lộ trình chuyển đổi sang ReactJS (Migrate to React) (Completed)**
  - **Task 4.3.1: Khởi tạo và thiết lập kiến trúc dự án React** (Hoàn thành)
  - **Task 4.3.2: Chuyển đổi mã CSS và Context giao diện toàn cục** (Hoàn thành)
  - **Task 4.3.3: Porting Trang chủ thành Component React** (Hoàn thành)
  - **Task 4.3.4: Porting Trang chi tiết và các Accordion Component** (Hoàn thành)
  - **Task 4.3.5: Viết Custom React Hooks cho Search và Scroll Spy** (Hoàn thành)
  - **Task 4.3.6: Porting Modal xem tài liệu PDF** (Hoàn thành)
  - **Task 4.3.7: Biên dịch Production và Kiểm thử** (Hoàn thành - Biên dịch thành công với 0 lỗi tsc/Vite)
  - **Task 4.3.8: Tích hợp định tuyến URL qua Hash (Hash-based Routing)** (Đang thực hiện)


### Phase 5: Mở rộng phân loại "Quy trình dịch vụ Chi hộ", "Trích nợ tự động" và "Ví điện tử"

- **Giai đoạn 5.1: Dựng khung giao diện và cấu trúc định tuyến (Skeleton/Routing) (Completed)**
  - **Task 5.1.1: Cấu trúc hóa Định tuyến & Trạng thái trong App.tsx** (Hoàn thành)
  - **Task 5.1.2: Thiết kế Category Card mới tại Home.tsx** (Hoàn thành)
  - **Task 5.1.3: Tạo Component hiển thị chi tiết cho các phân loại mới (`DisbursementDetails.tsx`, `AutoDebitDetails.tsx`, `WalletDetails.tsx`)** (Hoàn thành)

- **Giai đoạn 5.2: Triển khai nội dung chi tiết dựa trên thông tin cung cấp từ Prompt**
  - **Task 5.2.1: Tiếp nhận và xử lý dữ liệu dịch vụ từ Prompt của USER** (Hoàn thành đối với dịch vụ Chi hộ BIDV)
  - **Task 5.2.2: Tích hợp thông tin vào các file React component** (Hoàn thành đối với dịch vụ Chi hộ BIDV)
    - Cập nhật danh sách dịch vụ và các bước thực hiện vào các file thành phần:
      - Chi hộ: [DisbursementSections.tsx](file:///d:/Code/lkbank/src/components/disbursement/DisbursementSections.tsx) & [DisbursementDetails.tsx](file:///d:/Code/lkbank/src/pages/DisbursementDetails.tsx) (Hoàn thành)
      - Trích nợ tự động: [AutoDebitSections.tsx](file:///d:/Code/lkbank/src/components/autodebit/AutoDebitSections.tsx) & [AutoDebitDetails.tsx](file:///d:/Code/lkbank/src/pages/AutoDebitDetails.tsx) (Đang chờ dữ liệu)
      - Ví điện tử: [WalletSections.tsx](file:///d:/Code/lkbank/src/components/wallet/WalletSections.tsx) & [WalletDetails.tsx](file:///d:/Code/lkbank/src/pages/WalletDetails.tsx) (Đang chờ dữ liệu)
    - Lưu trữ và liên kết chính xác các biểu mẫu tài liệu thực tế trong thư mục `public/docs/bidv/`. (Hoàn thành)
  - **Task 5.2.3: Tích hợp và tối ưu bộ lọc & Tìm kiếm (Search/Filters)** (Hoàn thành)
  - **Task 5.2.4: Đồng bộ Dark Mode & Tối ưu UI/UX** (Hoàn thành)
  - **Task 5.2.5: Kiểm thử và Biên dịch Production** (Hoàn thành - Biên dịch thành công 0 lỗi)

---

### Thứ tự thực hiện (Execution Order) cho Phase 5:
Để đảm bảo tính ổn định và tuân thủ chặt chẽ quy định tại [RULES.md](file:///d:/Code/lkbank/RULES.md) (Làm từng bước, không thay đổi kiến trúc đột ngột khi chưa chuẩn bị):
1. **Bước 1**: Cập nhật thông tin các phân loại mới vào [product-spec.md](file:///d:/Code/lkbank/specs/product-spec.md).
2. **Bước 2**: Thực thi **Giai đoạn 5.1** để hoàn thiện khung giao diện (Skeleton), cấu trúc định tuyến (Routing) và kết nối sự kiện trên Trang chủ cho tất cả các phân loại mới (Chi hộ, Trích nợ tự động, Ví điện tử).
3. **Bước 3**: Tiếp nhận dữ liệu thực tế từ prompt của USER. Thực hiện **Giai đoạn 5.2** để hoàn thiện giao diện nội dung cho các trang dịch vụ tương ứng.
4. **Bước 4**: Kiểm thử tổng thể (Desktop/Mobile, Light/Dark Mode, Search, Sidebar Navigation), chạy build production (`npm run build`) để kiểm tra lỗi, sau đó cập nhật [change-log.md](file:///d:/Code/lkbank/specs/change-log.md).

### Phase 6: FAQs Pay By Bank (Completed & Revised)
- **Task 6.1: Cấu hình định tuyến & Nút điều hướng** (Hoàn thành)
  - Đăng ký trang `faqs` và hash route `#/faqs` trong `src/App.tsx`.
  - Thay thế card CategoryCard giữ chỗ tại trang chủ thành "FAQs Pay By Bank" trỏ sang trang FAQs mới.
- **Task 6.2: Triển khai Giao diện & CSS cho FAQs** (Hoàn thành)
  - Tạo tệp `src/styles/faqs.css` định dạng giao diện tương thích responsive và Dark/Light mode.
  - Tạo tệp `src/pages/FaqsDetails.tsx` hiển thị bộ 16 câu hỏi phân nhóm rõ ràng.
- **Task 6.3: Tích hợp logic Tìm kiếm tiếng Việt & Highlights** (Hoàn thành)
  - Viết hàm `removeAccents` loại bỏ dấu tiếng Việt hỗ trợ tìm kiếm không dấu.
  - Thiết kế `FaqHighlightText` highlight từ khóa khớp, tự động mở rộng accordion và hiển thị thông báo liên hệ khi không có kết quả.
- **Task 6.4: Tích hợp lưới logo ngân hàng VietQR API** (Hoàn thành)
  - Tạo lưới 14 ngân hàng hỗ trợ tại câu hỏi số 5 gọi API `api.vietqr.io`.
  - Xử lý sự kiện `onError` fallback sang vòng tròn chữ viết tắt.
- **Task 6.5: Hỗ trợ Deep-linking & Kiểm thử** (Hoàn thành)
  - Theo dõi hash trên mount để tự động mở rộng và cuộn đến câu hỏi được chỉ định (vd: `#/faqs/faq-1`).
  - Kiểm thử biên dịch thành công 0 lỗi.
- **Task 6.6: Tích hợp cơ chế đồng bộ chủ đề Iframe (Theme Message Sync)** (Hoàn thành)
  - Đăng ký bộ lắng nghe sự kiện `message` để nhận lệnh đổi theme từ trang cha và đồng bộ với context.
- **Task 6.7: Nút xóa nhanh nội dung tìm kiếm (Search Input Clear Button)** (Hoàn thành)
  - Thiết kế và CSS nút clear `✕` trên thanh tìm kiếm để reset nhanh từ khóa.
- **Task 6.8: Cập nhật màu sắc thương hiệu fallback cho 14 logo ngân hàng** (Hoàn thành)
  - Đồng bộ mã màu HEX thương hiệu chính thức cho 14 vòng tròn fallback logo.
- **Task 6.9: Điều chỉnh bộ câu hỏi chuẩn hóa FAQs v1 (Câu 4, 8, 9, 10, 13, 16)** (Hoàn thành)
  - Cập nhật nội dung câu hỏi và câu trả lời tương ứng theo PRD sửa đổi mới nhất.

### Phase 7: Cải cách Giao diện & Đồng bộ Banner các Trang chi tiết (Completed)
- **Task 7.1: Đồng bộ thiết kế dải banner lớn (Hero Banner Sync)** (Hoàn thành)
  - Di chuyển các khối tiêu đề `.db-hero` ra ngoài và thay thế bằng dải banner lớn `.faq-hero-section` với nền gradient từ xanh navy sang đỏ Tingee trên tất cả các trang con.
  - Tích hợp ô tìm kiếm mờ kính (Glassmorphism Search Box) trên trang Ngân hàng (`BankDetails.tsx`) và Chi hộ (`PayoutDetails.tsx`).
- **Task 7.2: Khắc phục lỗi vị trí cuộn trang (Scroll Position Reset)** (Hoàn thành)
  - Thêm `window.scrollTo(0, 0)` khi có sự kiện thay đổi hash trong `App.tsx` để reset vị trí cuộn trang khi chuyển hướng.
- **Task 7.3: Tích hợp Logo Tingee thu gọn** (Hoàn thành)
  - Thêm logo Tingee thu gọn (`logo-compact.png`) bên cạnh nút quay lại ở Header của cả 6 trang chi tiết để đồng nhất nhận diện thương hiệu.
- **Task 7.4: Căn chỉnh nút Quay lại và Reset Header Padding** (Hoàn thành)
  - Sửa đổi padding mặc định của `.hdr` trong `bank.css` từ `padding: 0 20px 0 calc(var(--sw) + 20px)` sang `padding: 0 20px`.
  - Thiết lập thuộc tính `paddingLeft` động trong React để nút quay lại tự động căn sát lề trái 20px khi Sidebar ẩn (màn hình danh sách tổng quan) và co giãn khi Sidebar hiển thị.
- **Task 7.5: Tinh giản Sidebar và Bổ sung mô tả tổng quan** (Hoàn thành)
  - Loại bỏ hoàn toàn liên kết "Tổng quan" và "Thuật ngữ" khỏi `BankSidebar` và `PayoutSidebar`.
  - Di chuyển thông tin tổng quan giới thiệu và bảng thuật ngữ ra bên ngoài hiển thị trực tiếp trên trang danh sách tổng quan.
- **Task 7.6: Cập nhật hình ảnh đối tác & Loại bỏ bộ lọc thương hiệu độc quyền** (Hoàn thành)
  - Sửa lỗi đường dẫn logo Bảo Kim thành `/logo/Logo-Bao-Kim.png` và hiển thị logo thực tế trên grid chi hộ.
  - Loại bỏ các từ khóa mang tính chất độc quyền thương hiệu riêng tại hộp tìm kiếm nhanh để bảo đảm tính cạnh tranh công bằng.
- **Task 7.7: Căn chỉnh nút Dark Mode và sửa lỗi giao diện phụ** (Hoàn thành)
  - Căn chỉnh vị trí hiển thị và bóng đổ của nút chuyển đổi Dark Mode trên các trang con.
- **Task 7.8: Tích hợp luồng liên kết VPBank Virtual Account (VPBank VA) & Cung cấp tài liệu mẫu** (Hoàn thành)
  - Tạo cấu trúc Accordion hướng dẫn tích hợp dịch vụ tài khoản ảo VPBank VA cho khách hàng doanh nghiệp & hộ kinh doanh.
  - Hướng dẫn thu thập hồ sơ pháp lý, ảnh chụp văn phòng, tài khoản định danh VNeID mức 2.
  - Tích hợp 3 tài liệu mẫu Word đính kèm: Hợp đồng cung ứng dịch vụ MerchantQR, Giấy đề nghị sử dụng dịch vụ, và Văn bản thỏa thuận bảo vệ dữ liệu cá nhân của VPBank.
