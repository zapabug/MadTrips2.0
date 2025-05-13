## LLD 1: 2025-05-12 00:00 UTC — MadTrips (Simplified)

Project Name & Goal:
MadTrips — A Vite + React application serving as a **browser for travel packages and events in Madeira.** It will feature a Madeira-tailored content feed, leveraging Nostr for displaying images and handling comment sections for trips and events. The primary focus is on providing a simple, user-friendly interface for discovering Madeira through Nostr.

Theme:
Simplicity, travel discovery, and Nostr-powered content for Madeira.

Core User Flow:
1. User opens the app.
2. User browses a feed of Madeira-related content (packages, events, articles).
3. User can view details of a package/event, including images (from Nostr) and descriptions.
4. User can read comments (from Nostr) associated with an item.
5. User can log in via Nostr (NIP-07) to post comments.

Key Features:
- [ ] Browse Madeira-specific travel packages and events.
- [ ] View package/event details with images sourced from Nostr.
- [ ] Read and write comments on packages/events via Nostr.
- [ ] Madeira-tailored content feed.
- [x] User authentication via NIP-07 for interaction (commenting). (NDK setup in place)

Out of Scope (for this simplified version):
- Complex backend trip booking/coordination by a "Fixer".
- Payment processing or deposit systems.
- Advanced admin dashboards beyond basic content curation (if any).
- Custom `CacheService` and `RelayService` (rely on NDK and `ndk-hooks`).

Technology Stack:
- Frontend: Vite (React/TypeScript)
- Nostr Integration: @nostr-dev-kit/ndk, @nostr-dev-kit/ndk-hooks
- Styling: Tailwind CSS

## LLD 2: 2025-05-11 19:30 UTC — Initial Project Setup & Code Migration

Project Initialization:
- Vite project created with React and TypeScript template.
- Switched to `pnpm` as the package manager.
- `package.json` name updated to `madtrips`.

Core Dependencies Installed:
- `@nostr-dev-kit/ndk`
- `@nostr-dev-kit/ndk-hooks`
- `tailwindcss`, `postcss`, `autoprefixer`, `tailwindcss-animate`
- `react-router-dom`

Styling Setup:
- Tailwind CSS configured (`tailwind.config.js`, `postcss.config.cjs`).
- Tailwind directives added to `src/index.css`.
- Brand colors integrated into Tailwind config.

Project Structure Created in `src/`:
- `components/` (with `home/`, `packages/`, `ui/`, `layout/` subdirectories)
- `hooks/` (Note: `useCache.ts` is now likely to be removed or heavily refactored)
- `contexts/` (`NostrContext.tsx` to be simplified)
- `data/`
- `constants/`

Code Migration from Previous Project (via `docs/` staging):
- React Components: `CallToAction`, `FeaturedPackages`, `FloatingLoginButton`, `FunchalMap`, `Hero`, `Navigation` migrated.
- Custom Hooks: `useCache.ts` (pending removal/refactor).
- Contexts: `NostrContext.tsx` (pending simplification).
- Data: `packages.ts`.
- Constants: `nostr.ts`, `relays.ts`.

Next Steps (Revised for Simplification):
- [x] **Simplify `NostrContext.tsx`**: Remove `CacheService`, `RelayService` dependencies. Rely on NDK/ndk-hooks for core Nostr functionality.
- [x] **Resolve Linter/Vite Errors**: Focus on errors related to the simplified scope. (Ongoing, many resolved)
- [ ] **Implement Core UI**: Build out the package/event browser, comment sections, and Madeira feed using the migrated components and new simplified Nostr logic. (Package browser partially implemented)
- [x] **Ensure NDK Initialization**: Set up NDK singleton and `useNDKInit` correctly, likely in `main.tsx` or `App.tsx`.

## LLD 3: 2025-05-12 (approx) — Routing, Map Variants, Page Structure, Footer

Key Updates:
- [x] **Routing Setup**: 
  - [x] `react-router-dom` installed and configured in `src/App.tsx`.
  - [x] Redundant `<BrowserRouter>` removed from `src/main.tsx` to fix nesting errors.
  - [x] Routes established for `/`, `/map`, `/community`, `/packages`, `/packages/custom`, and `/packages/:id`.
- [x] **Page Components Created (in `src/pages/`)**:
  - [x] `MapPage.tsx`: Renders the full map component.
  - [x] `CommunityPage.tsx`: Placeholder created.
  - [x] `PackagesPage.tsx`: Placeholder created, then populated by porting `docs/packages/pacages.page.tsx`.
  - [x] `CustomPackagePage.tsx`: Placeholder created, references `CustomPackageBuilder` component.
  - [x] `PackageDetailPage.tsx`: Placeholder created, then populated with a simplified port of `docs/packages/id.page.tsx` (cart/checkout/Nostr logic stubbed).
- [x] **Map Component (`FunchalMap.tsx`) Enhancements**:
  - [x] Populated with `FEATURED_BUSINESSES` data from `src/data/packages.ts` (sourced from `madbiz.md`).
  - [x] Added `variant` prop (`home` | `page`).
  - [x] `variant="home"` (used in `App.tsx`) shows a smaller map-only view.
  - [x] `variant="page"` (default, used in `MapPage.tsx`) shows the larger map and the featured business list.
- [x] **Layout Components (`src/components/layout/`)**:
  - [x] `Navigation.tsx`: Confirmed existing links align with new routes.
  - [x] `Footer.tsx`: Created, initially basic, then replaced with a more detailed version adapted from `docs/contexts/ClientLayout.tsx`. Added to `App.tsx` layout.
- [x] **Package Components (`src/components/packages/`)**:
  - [x] `CustomPackageBuilder.tsx`: Placeholder created (fully implemented later).

Next Steps:
- [x] Port the `CustomPackageBuilder` component from the Next.js project. (Completed in LLD 4/5)
- [ ] Implement Cart/Checkout functionality (porting/creating store, wrapper, page).
- [ ] Integrate Nostr context/authentication as needed. (Ongoing)

# Build Documentation (Latest)

## Curation Workflow
- **Primary curation** is performed in `public/packages/madbiz.md` (markdown, human-readable, with sections and comments, including a dedicated "Pending Updates & Additions" section).
- **Featured section** at the top highlights top picks for easy reference and UI integration.
- **Deprecated or unwanted entries** (e.g., Sweet Merenda, Sunshine Pub & Grill) are removed from the markdown and not included in the JSON.
- **Sync to JSON:**
  - After curation, the `scripts/update-business-data.cjs` script is run (`node scripts/update-business-data.cjs`) from the project root.
  - This script parses the "Pending Updates & Additions" section of `madbiz.md` and adds/updates entries in `public/packages/madeira_btc_businesses_20250511_172142.json`.
  - The script handles creating new categories and updating existing entries.
  - (Optional/Previous Step) A script (`remove_tags.js`) was previously mentioned to remove `tags` and `bitcoin_payment` fields - review if this is still needed after the primary update script runs.
- **App/service integration** uses only the updated `madeira_btc_businesses_20250511_172142.json`; direct edits to the JSON are discouraged.

## Notes
- All business type clarifications and new entries should be made in the `madbiz.md` "Pending Updates & Additions" section first.
- The Featured section is intended for admin tools and UI highlights.
- Continue to maintain markdown as the master file for all curation.

## LLD 4: 2025-05-12 (approx) — Footer, Responsive Packages, Background Fix

Key Updates:
- [x] **Footer Enhancements & Styling**:
  - [x] Background color changed to teal (`#14857c`).
  - [x] Added Nostr profile link (`njump.me` desktop / `nostr:` mobile).
  - [x] Corrected assets folder name (`asssets` -> `assets`) and verified icon display.
- [x] **Responsive Homepage Packages**:
  - [x] Created `src/hooks/useResponsiveNumItems.ts`.
  - [x] Created `src/components/PackageCard.tsx`.
  - [x] Created `src/pages/HomePage.tsx` using the hook and card.
- [x] **Packages Page Implementation**:
  - [x] Ported `CustomPackageBuilder` to `src/components/CustomPackageBuilder.tsx`.
  - [x] Created `src/pages/PackagesPage.tsx` to display featured packages and the `CustomPackageBuilder`.
- [x] **Error Resolution**:
  - [x] Fixed Vite module loading errors.
- [x] **Layout Background Fix**:
  - [x] Corrected visual layout issue with background gradient.

Next Steps:
- [ ] Replace mock package data in `HomePage.tsx` and `PackagesPage.tsx` with actual data fetching/management.
- [ ] Implement Cart/Checkout/Booking functionality if required.
- [ ] Integrate Nostr context/authentication for commenting and interaction. (Ongoing)

## LLD 5: Current Date (Reflects recent UI/UX changes and component restructuring)

Key Updates:
- [x] **Custom Package Builder & Page Separation**:
  - [x] `CustomPackageBuilder` component (`src/components/packages/CustomPackageBuilder.tsx`) implemented with interactive UI.
  - [x] Dedicated page `src/pages/CustomPackagePage.tsx` created.
  - [x] Styling for the `CustomPackageBuilder` and `CustomPackagePage` refined.
- [x] **`PackagesPage.tsx` Restructuring**:
  - [x] Added a main page title.
  - [x] Removed the integrated `CustomPackageBuilder`.
  - [x] Created `src/components/BusinessCard.tsx`.
  - [x] Created `src/components/KidFriendlyCard.tsx`.
  - [x] Repurposed space to feature new sections ("Bitcoin Essentials & Family Fun", "Honorable Mentions").
- [x] **`madbiz.md` (Business Listings Curation)**: (Process, not a checkable item)
  - [x] Added new sections and updated listings.
- [x] **Brand Colors & Tailwind**: 
  - [x] New color palette added to `docs/brandColors.md`.
  - [x] Guidance provided for `tailwind.config.js`.
- [x] **Code Maintenance**: 
  - [x] Resolved linter errors in `PackagesPage.tsx`.

Next Steps:
- [ ] Populate "Honorable Mentions" section with data in `PackagesPage.tsx`.
- [x] Consider dynamic data fetching for business listings in `PackagesPage.tsx` from `madbiz.md` (or its JSON counterpart) instead of manual arrays. (Partially addressed by map component, ongoing for PackagesPage)
- [ ] Continue with Nostr integration for comments and business "claiming" features as per LLD 5 in `Planning.md`.

## LLD 6: (Current Date) — Native Map Implementation (`FunchalMap.tsx` Refactor)

Key Updates:
- [x] **Technology**: Replaced the previous `iframe`-based map with `react-leaflet`.
- [x] **Data Sources**:
    - [x] `docs/map/export(1).geojson`: Primary source.
    - [x] `public/packages/madeira_btc_businesses_20250511_172142.json`: Secondary source (corrected filename).
- [x] **Data Fetching & Handling**:
    - [x] Uses Vite's `?url` import suffix.
    - [x] Employs `useEffect` and `fetch`.
    - [x] Manages data and loading/error states using `useState`.
    - [x] Defines TypeScript interfaces.
- [x] **Data Merging Logic**:
    - [x] Uses `useMemo` to create an efficient lookup map.
    - [x] Iterates through `geojsonData.features` for merging and rendering `Popup`s.
- [x] **Error Handling & UI**: Includes basic loading message and error display.
- [x] **Component Props**: Retains the `variant` prop.
- [x] **Issue Resolution**: Addresses previous Vite/JSON import errors (path, filename, typo) and linter/type errors. Also resolved map display overlap with navigation bar (z-index).

Next Steps:
- [ ] Integrate interactive elements into Popups (e.g., booking buttons).
- [ ] Connect business listings to Nostr for comments/reviews/claiming.
- [ ] Style Popups for better readability and user experience.

