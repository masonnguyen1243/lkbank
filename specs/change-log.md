# Change Log — Bank Linking Portal

All notable changes to the Bank Linking Portal project are documented here.

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
