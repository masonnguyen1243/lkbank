# Product Specification — Cổng Thông Tin Quy Trình Liên Kết Ngân Hàng

## 1. Overview & Goals
The **Bank Linking Guideline Portal** is a static web application developed to guide HENO sales staff (CBB), customer support agents, and merchants on how to connect bank accounts to the Tingee payment collection gateway. 

The primary goal is to provide a single, unified reference point that simplifies the linking procedures for 14 Vietnamese commercial banks, detailing the required steps, documents, and contacts.

## 2. Target Users & Personas
- **HENO Sales / Customer Care Agents**: Need a quick lookup tool during support calls or sales pitches.
- **Merchants / Business Owners**: Need step-by-step instructions to link their own bank accounts self-service.

## 3. Core Features
- **Landing Page (`pages/home.html`)**: Entry point displaying different document catalogs.
- **Responsive Guideline Layout (`pages/bank.html`)**:
  - **Navigation Sidebar**: Quick shortcuts to Overview, Terminology, and the 13 banks.
  - **Interactive Search**: Real-time filtering of banks in the sidebar with matching text highlight (`.sb-hl`).
  - **Scroll Spy**: Automatically highlights the active bank section in the sidebar during page scrolling and scrolls the sidebar view.
  - **Collapsible Instructions**: Accordions showing customized step-by-step workflows for Individual (TKCN), Business Household (HKD), and Corporate (TKDN) accounts.
  - **Document Attachment Manager**: Inline preview for PDF forms using a modal iframe (`#pdfModal`) and download links for `.docx` and `.pdf` files.
  - **Theme Toggle**: Persistence-enabled Sáng/Tối (Light/Dark) theme mode.
  - **Scroll Progress & Back Button**: Visual progress bar at the top and a back button with hover indicators.

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
