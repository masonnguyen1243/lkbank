# Product Specification — Cổng Thông Tin Quy Trình Liên Kết Ngân Hàng

## 1. Overview & Goals
The **Bank Linking Guideline Portal** is a Single Page Application (SPA) built with ReactJS, TypeScript, and Vite, designed to guide HENO sales staff (CBB), customer support agents, and merchants on how to connect bank accounts to the Tingee payment collection gateway. 

The primary goal is to provide a single, unified reference point that simplifies the linking procedures for 14 Vietnamese commercial banks, detailing the required steps, documents, and contacts, as well as integration and operation guidelines for the Disbursement Service (Dịch vụ Chi hộ), Auto-debit (Trích nợ tự động), and E-wallet (Ví điện tử) systems.

## 2. Target Users & Personas
- **HENO Sales / Customer Care Agents**: Need a quick lookup tool during support calls or sales pitches.
- **Merchants / Business Owners**: Need step-by-step instructions to link their own bank accounts self-service.

## 3. Core Features
- **Homepage Component (`Home.tsx`)**: Entry point displaying different document catalogs via modular `<CategoryCard>` templates:
  - **Quy trình Liên kết Ngân hàng**: Navigates to the bank linking guidelines.
  - **Quy trình dịch vụ Chi hộ**: Navigates to the disbursement service guidelines.
  - **Trích nợ tự động**: Navigates to the auto-debit service guidelines.
  - **Ví điện tử**: Navigates to the e-wallet integration guidelines.
- **Responsive Guidelines Component (`BankDetails.tsx`)**:
  - **Navigation Sidebar (`BankSidebar.tsx`)**: Quick shortcuts to Overview, Terminology, and the 14 banks.
  - **Interactive Search**: Real-time filtering of banks in the sidebar with matching text highlight (`HighlightText.tsx`) in both sidebar bank items and main bank section headers.
  - **Scroll Spy (`useScrollSpy.ts` Custom Hook)**: Automatically highlights the active bank section in the sidebar during page scrolling and scroll-aligns the active list items.
  - **Account Type Filters (`BankSection.tsx`)**: Responsive tab controls at the top of bank sections allowing users to filter guidelines by Individual (Cá nhân), Household (Hộ kinh doanh), or Corporate (Doanh nghiệp) accounts, hiding irrelevant steps. Dynamically expands accordion details if only a single option matches.
  - **Document Attachment Manager (`PDFModal.tsx`)**: Premium inline PDF document viewer modal supporting smooth scale/opacity entry/exit transitions, keyboard `Escape` closing, and body scroll-locking.
  - **Theme Toggle (`ThemeContext.tsx`)**: Persistence-enabled Sáng/Tối (Light/Dark) theme mode, loaded early in HTML to prevent initial rendering flash.
  - **Scroll Progress & Back Navigation**: Responsive top gradient progress bar and navigation triggers routing from home to guideline viewports.
- **Disbursement Service Component (`DisbursementDetails.tsx`)**:
  - Similar to the bank linking view, providing structured guidance, scroll tracking, theme synchronizations, and quick search filters for the disbursement services.
  - Includes **Chi hộ BIDV (Direct Link x Heno)**: GUID and flow detailing eform registrations, offline change request BM02 form, online admin control guides, Tingee authentication redirects, and segregated internal approval roles (Maker/Checker).
- **Auto-debit Component (`AutoDebitDetails.tsx`)**:
  - Structured view detailing registration procedures, API connection endpoints, and guidelines for auto-debit accounts.
- **E-wallet Component (`WalletDetails.tsx`)**:
  - Guidelines and specs covering API integration flows, sandbox credentials, and operation instructions for third-party e-wallets.



## 4. Supported Banks
1. Vietinbank (VTB)
2. BIDV
3. OCB
4. MB Bank
5. ACB
6. Vietcombank (VCB)
7. VPBank
8. Sacombank
9. VIB
10. PGBank
11. ShinhanBank
12. Co-op Bank
13. MSB
14. TPBank

