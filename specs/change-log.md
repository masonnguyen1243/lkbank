# Change Log — Bank Linking Portal

All notable changes to the Bank Linking Portal project are documented here.

## [2026-06-18]
### Added
- **Dark Mode Support**:
  - Implemented toggleable light/dark themes with persistent state via `localStorage`.
  - Added theme toggle buttons to `pages/home.html` and `pages/bank.html`.
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

### Fixed
- Fixed styling consistency for accordion containers on dark theme.

---

## [Initial Version]
### Added
- Core static HTML templates `pages/home.html` and `pages/bank.html`.
- Custom CSS sheets `css/home.css` and `css/bank.css`.
- Core JS files `js/home.js` and `js/bank.js` with search, scroll spy, accordion, and PDF modal features.
- Structured document directory `docs/` with registration templates and PDF guides.
