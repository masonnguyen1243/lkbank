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



---

### Thứ tự thực hiện (Execution Order) cho Phase 4:
Để đảm bảo tính ổn định và tuân thủ chặt chẽ quy định tại [RULES.md](file:///d:/Code/lkbank/RULES.md) (Làm từng bước, không thay đổi kiến trúc đột ngột khi chưa chuẩn bị):
1. **Bước 1**: Cập nhật chi tiết các tính năng mới hỗ trợ người dùng vào [product-spec.md](file:///d:/Code/lkbank/specs/product-spec.md).
2. **Bước 2**: Thực thi **Giai đoạn 4.1** (Tối ưu giao diện trang chủ, tăng khả năng mở rộng) trên phiên bản trang tĩnh hiện tại. Cập nhật [change-log.md](file:///d:/Code/lkbank/specs/change-log.md) và kiểm thử.
3. **Bước 3**: Thực thi **Giai đoạn 4.2** (Copy nhanh, bộ lọc loại tài khoản, Service Worker) trên phiên bản trang tĩnh. Cập nhật [change-log.md](file:///d:/Code/lkbank/specs/change-log.md) và kiểm thử.
4. **Bước 4**: Khởi động **Giai đoạn 4.3** (Chuyển đổi hoàn toàn sang ReactJS). Thực hiện tuần tự các task từ 4.3.1 đến 4.3.7. Sau khi hoàn thành toàn bộ và xác thực thành công, cập nhật [change-log.md](file:///d:/Code/lkbank/specs/change-log.md) bản chính thức.


