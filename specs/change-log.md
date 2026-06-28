# Change Log — Bank Linking Portal

All notable changes to the Bank Linking Portal project are documented here.

## [2026-06-28] - Add VPBank VA Flow & Spacing Improvements
### Added
- **VPBank VA (Virtual Account) Flow (`Banks6to10.tsx`)**:
  - Developed a new 3-step merchant linking flow for "Tài khoản Doanh nghiệp & Hộ kinh doanh (VPBank VA)" that guides users to coordinate with VPBank, submit legal paperwork (VNeID level 2, license, charter, photos, MCC parameter setup), sign official MerchantQR documents, obtain Merchant ID / Terminal ID, and contact HENO/Tingee developers for manual dashboard configurations.
  - Linked three new downloadable Word documents under VPBank attachments: *Hợp đồng cung ứng dịch vụ MerchantQR*, *Giấy đề nghị sử dụng dịch vụ MerchantQR*, and *Văn bản thỏa thuận bảo vệ và xử lý dữ liệu cá nhân*.
  - Updated the bank account support table badge for VPBank corporate accounts to indicate "TK gốc & VA" support.

## [2026-06-28] - Add Contact Information Section
### Added
- **Contact Details Component (`ContactDetails.tsx` & `contact.css`)**:
  - Developed the new `<ContactDetails>` component representing a dedicated page for team and support contacts.
  - Divided the page into two main sections:
    - **Loa thông báo (TingeeBox) Support**: Details Zalo OA (TINGEE by HENO with placeholder QR code), Hotline (1900.255.567 with Phím 1), and emails (`hotro@heno.vn`, `doanhnghiep@heno.vn`). Includes region-specific sales cards (Northern, Central, Southern regions) and a General Manager banner (Mr. Đức Hạnh).
    - **Open API (Pay by Bank) Support**: Set up as a "Coming Soon" placeholder card to receive user content updates in the future.
  - Implements copy-to-clipboard functionality with a visual tooltip ("Đã copy!") on phone numbers and email links.
- **Routing & Home Navigation Integration**:
  - Added `'contact'` to `Page` union type and registered route `#/contact` in [App.tsx](file:///d:/Code/lkbank/src/App.tsx).
  - Integrated the "Thông tin liên hệ" `<CategoryCard>` navigation card on the home page [Home.tsx](file:///d:/Code/lkbank/src/pages/Home.tsx).

## [2026-06-26] - Update Bao Kim Payout Content
### Changed
- **Bao Kim Payout Content ("Tính năng chi hộ (Payout)")**:
  - Emphasized the collaborative payout service (Payout from e-wallet) between Tingee and Bao Kim.
  - Replaced the direct API integration section with the wallet link & synchronization flow (obtaining Wallet ID from Bao Kim, configuring it on Tingee, and invoking the sync API on Tingee to leverage the Tingee x Bao Kim API suite).
  - Completely removed the transfer limit policy section and the FAQs section for Bao Kim wallet.

## [2026-06-25] - Reorganize Service Classifications to Match Partners (Payoo, Baokim, Onepay)
### Changed
- **Payout / Disbursement Category ("Tính năng chi hộ (Payout)")**:
  - Reorganized the "Quy trình dịch vụ Chi hộ" category to "Tính năng chi hộ (Payout)" under [PayoutDetails.tsx](file:///d:/Code/lkbank/src/pages/PayoutDetails.tsx).
  - Merged the existing BIDV Direct Link guide and the Baokim E-wallet guide (now adapted for Payout) into [PayoutSections.tsx](file:///d:/Code/lkbank/src/components/payout/PayoutSections.tsx).
  - Implemented [PayoutSidebar.tsx](file:///d:/Code/lkbank/src/components/payout/PayoutSidebar.tsx) to support unified searching and navigation for both BIDV and Baokim services.
- **Payoo Category ("Tính năng thanh toán thẻ, payment link, smartpos")**:
  - Renamed the former "Ví điện tử" category to "Tính năng thanh toán thẻ, payment link, smartpos" representing Payoo gateway.
  - Developed [PayooDetails.tsx](file:///d:/Code/lkbank/src/pages/PayooDetails.tsx), [PayooSidebar.tsx](file:///d:/Code/lkbank/src/components/payoo/PayooSidebar.tsx), and [PayooSections.tsx](file:///d:/Code/lkbank/src/components/payoo/PayooSections.tsx) with detailed instructions for domestic/international card payment gates, Payment Link generation, and SmartPOS device operation (with 0% interest credit card installment instructions).
  - *Note*: Temporarily set the Payoo services list to empty (`[]`), removed the Terminology section/link, and displayed a dotted placeholder card per user request.
- **Onepay Category ("Trích nợ tự động (direct debit)")**:
  - Renamed the former "Trích nợ tự động" category to "Trích nợ tự động (direct debit)" representing OnePay.
  - Developed [OnepayDetails.tsx](file:///d:/Code/lkbank/src/pages/OnepayDetails.tsx), [OnepaySidebar.tsx](file:///d:/Code/lkbank/src/components/onepay/OnepaySidebar.tsx), and [OnepaySections.tsx](file:///d:/Code/lkbank/src/components/onepay/OnepaySections.tsx).
  - *Note*: Temporarily set the Onepay services list to empty (`[]`), removed the Terminology section/link, and displayed a dotted placeholder card per user request.
- **Cleanup and Routing Updates**:
  - Removed outdated files and folders under `src/components/wallet/`, `src/components/disbursement/`, `src/components/autodebit/`, and outdated page files in `src/pages/`.
  - Updated CategoryCard items in [Home.tsx](file:///d:/Code/lkbank/src/pages/Home.tsx) and path hash mapping in [App.tsx](file:///d:/Code/lkbank/src/App.tsx) (`#/payout`, `#/payoo`, `#/onepay`).
  - Successfully compiled the project using `npm run build` with zero errors.

## [2026-06-24] - Integrate FAQs Pay By Bank Self-Service Help Center (Revised)
### Added
- **FaqsDetails Page & Routing**:
  - Developed the `<FaqsDetails>` page component (`src/pages/FaqsDetails.tsx`) displaying 16 standard FAQs across 4 categories (Technical, Onboarding, Operations, Business).
  - Wired `#/faqs` hash routing in `src/App.tsx` and replaced the homepage placeholder CategoryCard in `src/pages/Home.tsx` to link to the new FAQs view.
- **Accents-Insensitive Search, Highlighting & Clear Button**:
  - Created a custom Vietnamese accents-insensitive search engine to filter FAQs dynamically.
  - Implemented `FaqHighlightText` wrapping matched search terms in `<mark class="highlight">` elements.
  - Configured automatic accordion expansions upon active search inputs, a custom "No results found" alert with direct Zalo / Telegram buttons.
  - Integrated a clickable clear button `✕` inside the search bar to clear search input, with absolute positioning and hover transitions styled in `src/styles/faqs.css`.
- **Dynamic VietQR Logo Grid & Brand-Specific Fallbacks**:
  - Created a responsive grid for 14 banks in Q5 calling `api.vietqr.io`.
  - Implemented `onError` fallback circles with bank abbreviations and custom background colors matching the official branding of the 14 commercial banks.
- **Deep-linking & Iframe Theme Message Sync**:
  - Added URL hash deep-linking (e.g., `#/faqs/faq-1`) which auto-scrolls to and expands designated questions on mount.
  - Registered a message event listener inside `FaqsDetails.tsx` to handle `{ type: 'THEME_CHANGE', theme: 'dark' | 'light' }` from parent pages, synchronizing the theme automatically.
- **FAQ Content Revisions & Updates**:
  - Pointed the bank guideline link in Q5 to the precise URL `https://trienkhai.tingee.vn/#/bank`.
  - Updated Q11 to state that "Doanh nghiệp" (instead of "Vận hành") should contact Tingee support for transaction verification.
  - Refined Q15 support channel link text to display "Zalo OA - Tingee By Heno".
- **System Specifications Updates**:
  - Documented features in `specs/product-spec.md` and updated the roadmap in `specs/implementation-plan.md`.

## [2026-06-22] - Integrate Baokim E-Wallet Onboarding Guidelines
### Added
- **Baokim E-Wallet Onboarding Guidelines**:
  - Converted the PDF guide `public/docs/baokim/Hướng dẫn Onboard VĐT Baokim.pdf` into a structural markdown guide.
  - Created a new component `src/components/wallet/WalletSections.tsx` that exports `<BaokimWalletSection>`.
  - Implemented details for the 5 onboarding steps on the Baokim app side (App download, account registration, KYC/NFC verification, bank link transfer, and electronic signature authorization activation).
  - Designed the transfer limit tables for Individual, New Business, and Established Business/Corporate accounts.
  - Configured 11 FAQ items via nested `<Accordion>` elements to address common merchant errors.
  - Linked the guide to the online PDF viewer using the modular `<DocSection>` and `<DocItem>` tools.
- **Wallet Page Wiring and Registration**:
  - Registered `baokim_wallet` in the `WALLET_SERVICES` array in `src/pages/WalletDetails.tsx`.
  - Mounted the `<BaokimWalletSection>` inside the main viewport of `WalletDetails.tsx` to display active statistics and connect the search query and the `handleViewPDF` trigger.
  - Verified the changes build successfully without compilation or TypeScript errors.

## [2026-06-22] - Reorganize Directory Structure
### Changed
- **Folder Restructuring & Clean Up**:
  - Moved top-level page components (`Home.tsx`, `BankDetails.tsx`, `DisbursementDetails.tsx`, `AutoDebitDetails.tsx`, `WalletDetails.tsx`) from `src/components/...` to a new `src/pages/` folder.
  - Grouped reusable UI controls (`Accordion.tsx`, `CategoryCard.tsx`, `ContactCard.tsx`, `HighlightText.tsx`, `NoteBox.tsx`, `PDFModal.tsx`) into a new `src/components/ui/` folder.
  - Grouped bank-specific layouts and templates (`BankSection.tsx`, `BankSidebar.tsx` [renamed from `Sidebar.tsx`], and `banks/` details) under `src/components/bank/`.
  - Updated relative import statements in all modified `.tsx` files.
  - Validated that the production build (`npm run build`) runs successfully with 0 TypeScript/Vite errors.

## [2026-06-19] - Phase 5.2: Integrate BIDV Payout (Chi hộ) Service
### Added
- **BIDV Payout Content Integration**:
  - Developed the `<BIDVDisbursementSection>` component inside `src/components/disbursement/DisbursementSections.tsx` incorporating the full step-by-step registration guidelines for BIDV Direct.
  - Documented onboarding paths: Case 1 (E-form online registration via `https://www.bidv.com.vn/BIDVDirect` for Gói nâng cao ERP/Heno integration) and Case 2 (Way 1 via BM02 paper request and Way 2 via online configuration on BIDV Direct portal).
  - Outlined the account verification redirect flow and internal authorization control roles (Maker and Checker).
- **Wiring and Navigation Support**:
  - Integrated `BIDVDisbursementSection` inside the main `<DisbursementDetails>` page.
  - Registered the service item inside the `DISBURSEMENT_SERVICES` array in `src/components/DisbursementDetails.tsx` with customized theme color fallback (`#006B68`) and live search attributes.
  - Linked file attachments (`HD_Dang_ky_bieu_mau_Eform.pdf`, `BM02_Thay_doi_thong_tin_dich_vu_Direct.doc`, and `HDSD_KH_Quan_ly_ket_noi_Direct_Link.docx`) inside the DocSection of the BIDV Payout view supporting online visualization and download triggers.

## [2026-06-19] - Phase 5.1: Disbursement, Auto-debit, and E-wallet Frame & Routing
### Added
- **New Page Layout Components**:
  - Developed `<DisbursementDetails>` (`src/components/DisbursementDetails.tsx`), `<AutoDebitDetails>` (`src/components/AutoDebitDetails.tsx`), and `<WalletDetails>` (`src/components/WalletDetails.tsx`) as the skeleton views for their respective services.
  - Implemented identical layout styles (Header back navigation, Scroll Progress, Theme Toggles, Scroll Spy, Back-to-Top, PDFModal integration) to maintain uniform aesthetics and responsive behaviors across all views.
  - Formatted generic overview/introductions and terminology definitions for each domain.
- **Dedicated Sidebar Components**:
  - Developed `<DisbursementSidebar>` (`src/components/DisbursementSidebar.tsx`), `<AutoDebitSidebar>` (`src/components/AutoDebitSidebar.tsx`), and `<WalletSidebar>` (`src/components/WalletSidebar.tsx`) to support dynamic item rendering, scrolling synchronizations, and keyword searches.
- **Homepage & Router Integration**:
  - Added new category cards for "Quy trình dịch vụ Chi hộ", "Trích nợ tự động", and "Ví điện tử" to the `<Home>` component in `src/components/Home.tsx` with dedicated custom SVG icons.
  - Integrated routing and state machine handling for `'disbursement'`, `'autodebit'`, and `'wallet'` layouts inside `src/App.tsx`.
- **Product Specification & Roadmap Updates**:
  - Updated `specs/product-spec.md` with descriptions and components for the three new service classifications.
  - Updated `specs/implementation-plan.md` to reflect Phase 5.1 extension details.

## [2026-06-23] - Hash-based Routing & Deep Linking
### Added
- **Hash-based URL routing**:
  - Configured state and listeners in `src/App.tsx` using `window.location.hash` and `hashchange` to handle seamless transitioning between the Homepage (`#/` or empty) and Bank Details page (`#/bank`).
  - Added URL hash synchronization in `src/components/BankDetails.tsx` utilizing `window.history.replaceState` when `activeId` changes, updating the URL in real-time as the user scrolls (e.g. to `#/bank/bidv`) without polluting browser navigation history.
  - Implemented client-side deep linking on mount and manual url changes in `src/components/BankDetails.tsx`, automatically scrolling to the requested bank's anchor block (e.g., `acb` if hash is `#/bank/acb`) after loading. Added layout shift resilience by polling the scroll position multiple times during asset loading.
- **Specifications & Documentation Updates**:
  - Updated `specs/product-spec.md` with Hash-based routing definitions.
  - Updated `specs/implementation-plan.md` to declare Phase 4 Task 4.3.8.
- **Terminology Table Synchronization**:
  - Updated terminology definitions inside `DisbursementDetails.tsx` (adding `ERP`, `Maker`, `Checker`) and `WalletDetails.tsx` (adding `KYC`, `NFC`, `ĐDPL`, `ĐKKD`, `SMS OTP`) to match actual onboarding content.

## [2026-06-18] - Port Document Viewer Modal
### Added
- **PDFModal Component**:
  - Developed `<PDFModal>` in `src/components/PDFModal.tsx` replacing the static iframe from the legacy page.
  - Handled keyboard events (listening to `Escape` keypress to close the viewer automatically).
  - Managed body layout scroll locking state dynamically when the modal is active (applying and cleaning up `overflow: hidden` on `document.body` via `useEffect` hook).
  - Wired the component inside the parent `<BankDetails>` viewport overlay.
  - **Smooth Transition Animations**: Redesigned modal animations to use custom CSS scale and opacity transitions via opacity, pointer-events, and visibility styling rules. Kept elements in the DOM structure while mounting the iframe conditionally to ensure smooth opening/closing visuals without background document pre-fetching.
  - **Modern Typography Support**: Linked Google Fonts preconnection and Plus Jakarta Sans styles inside the root `index.html` to render premium font faces.
  - **Flicker-free Theme Loading**: Embedded the theme initializer script early in the HTML head to parse `localStorage` and set `data-theme` before React mounts, avoiding light/dark flash visual bugs.


## [2026-06-18] - Port Search & Scroll Spy Logic
### Added
- **useScrollSpy Hook**:
  - Developed custom hook `useScrollSpy.ts` under `src/hooks/` to listen to window scroll positions and calculate which monitored section is active in the viewport.
- **HighlightText Component**:
  - Developed `<HighlightText>` in `src/components/HighlightText.tsx` utilizing safe regex splitting to format matching keyword characters with `<mark className="sb-hl">` tags globally.
- **Search Lifted State & Highlights Connection**:
  - Moved search query state from `<Sidebar>` up to `<BankDetails>`, allowing the query to be shared and passed down to both the sidebar and individual bank card sections.
  - Applied `<HighlightText>` to main content headers (bank name and bank code/full name) inside `<BankSection>` dynamically, highlighting matching search terms live in the main text as the user types.
  - Linked `<Sidebar>` to use the parent's lifted search state and query highlights.
  - Refactored `<BankDetails>` scroll spy logic to import and run the custom `useScrollSpy` hook.

## [2026-06-18] - Port Guideline Viewer & Accordion Components
### Added
- **BankDetails Wrapper**:
  - Developed `<BankDetails>` main component in `src/components/BankDetails.tsx` which integrates the overall page layouts, headers, brand branding logo, scroll spy highlights, scroll progress, back-to-top button, and PDF viewer modal state.
- **Sidebar Component**:
  - Developed `<Sidebar>` in `src/components/Sidebar.tsx` with search input, keywords highlight formatting, and click handlers synced with parent scrolling overrides.
- **Modular Bank Components**:
  - Created `src/components/banks/Banks1to5.tsx`, `src/components/banks/Banks6to10.tsx`, and `src/components/banks/Banks11to14.tsx` porting all 14 bank guidelines, support tables, accordions, contact information blocks, note warnings, and document link attachments into React/TSX components.
- **Reusable Bank Layout and Subcomponents**:
  - Developed `<BankSection>` container in `src/components/BankSection.tsx` managing the local segmented account type filters (All, Individual, Household, Corporate) dynamically.
  - Developed `<DocSection>` and `<DocItem>` subcomponents to unify the document attachment layout lists.
- **App Routing Integration**:
  - Integrated `<BankDetails>` routing inside `src/App.tsx` replacing the placeholder view.

## [2026-06-18] - Port Landing Page
### Added
- **Homepage Component**:
  - Developed `<Home>` component in `src/components/Home.tsx` based on the static landing page.
  - Developed `<CategoryCard>` reusable sub-component in `src/components/CategoryCard.tsx`.
  - Isolated body stylesheet styles in `src/styles/home.css` from the global `body` selector to `.home-layout` wrapper class to avoid CSS styling collisions in SPA.
  - Linked page view state routing inside `src/App.tsx` enabling seamless transition from `Home` page to bank guidelines page.

---

## [2026-06-18] - Styles & Global Theme Context
### Added
- **Global CSS Porting**:
  - Created `src/styles/` directory and copied `home.css` and `bank.css` from legacy files.
- **ThemeContext**:
  - Developed a React Context Provider and Custom hook (`ThemeProvider`, `useTheme`) inside `src/context/ThemeContext.tsx` to handle dark/light mode state and local storage persistence.
  - Wrapped the entrypoint in `src/main.tsx` with `<ThemeProvider>` to enforce global theme availability.

---

## [2026-06-18] - React Migration Setup
### Added
- **ReactJS Project Structure**:
  - Safely backed up the entire previous static site code into `legacy-static/`.
  - Configured Vite + React + TypeScript compilation workspace with `package.json`, `tsconfig.json`, `vite.config.ts`, and root `index.html`.
  - Set up source tree structure (`src/main.tsx`, `src/App.tsx`, `src/index.css`).
  - Set up static assets structure inside `public/docs/`.

---

## [2026-06-18]
### Added
- **Dark Mode Support**:
  - Implemented toggleable light/dark themes with persistent state via `localStorage`.
  - Added theme toggle buttons to `index.html` and `pages/bank.html`.
  - Defined CSS custom properties under `[data-theme="dark"]` for colors, backgrounds, borders, shadows, and badges.
- **Search Highlight**:
  - Added Javascript search matching text highlight inside the sidebar bank list using `<mark class="sb-hl">`.
- **Scroll Progress**:
  - Added a responsive, gradient-colored scroll progress bar at the top of the details page.
- **Back Button**:
  - Added a Back-to-Home icon button with micro-animations in the header.
- **Micro-animations**:
  - Added hover translation transitions for contact cards, sidebar links, document list items, and buttons.
- **Documentation**:
  - Initialized project specs directory with `product-spec.md`, `implementation-plan.md`, and `change-log.md`.
  - Generated `RULES.md` and `README.md` in the project root.
- **TPBank Integration**:
  - Added TPBank (14th bank) with detailed guidelines for Individual and Business/Corporate accounts, styled accordions, and custom note details.
- **MSB Corporate Guidelines Update**:
  - Appended specific instructions detailing MSB Merchant service registration paths (via counter or bank staff) and HO processing times (1-3 business days) under the MSB section.

### Fixed
- Fixed styling consistency for accordion containers on dark theme.
- **Homepage Responsiveness (Hot Fix)**:
  - Added media queries for tablet and mobile viewports in `css/home.css`.
  - Configured adaptive grids, repositioned theme toggles, and scaled down font assets to prevent horizontal scroll and overlapping.
- **Details Page Visual Optimization**:
  - Designed variable-driven colors for info, warning, and important states for notes and contact cards inside `css/bank.css` (compatible with dark and light themes).
  - Categorized and updated `.note` containers to `.note-warning` and `.note-important` with matching inline SVG icons.
  - Categorized and updated contact cards `.c-card` to `.c-info` and `.c-important` with customized hover elevation behaviors.
- **Account Type Filter**:
  - Implemented dynamic JS logic in `js/bank.js` to parse accordion titles and assign `data-acc-type` attributes automatically.
  - Added filter segment controls (All, Individual, Household, Corporate) dynamically injected into the top of each bank guideline card.
  - Styled filter bars in `css/bank.css` with adaptive light/dark theme variables and click-toggle animations.
  - Added a supportive UX touch: automatically expands the single remaining accordion when filtered down to one result.
- **Homepage Responsiveness**:
  - Implemented responsive media queries for tablets (`max-width: 768px`) and mobile screens (`max-width: 480px`) in `css/home.css`.
  - Added adaptive layouts to prevent horizontal scrolling and layout overflow on small display widths.
  - Repositioned the theme toggle button and added padding to the homepage header to prevent text overlap on mobile devices.
  - Added responsive theme variables for card icons and integrated a smooth card-arrow hover translation transition.

---

## [Initial Version]
### Added
- Core static HTML templates `index.html` and `pages/bank.html`.
- Custom CSS sheets `css/home.css` and `css/bank.css`.
- Core JS files `js/home.js` and `js/bank.js` with search, scroll spy, accordion, and PDF modal features.
- Structured document directory `docs/` with registration templates and PDF guides.
