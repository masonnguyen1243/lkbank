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

