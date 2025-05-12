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
- Browse Madeira-specific travel packages and events.
- View package/event details with images sourced from Nostr.
- Read and write comments on packages/events via Nostr.
- Madeira-tailored content feed.
- User authentication via NIP-07 for interaction (commenting).

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
- **Simplify `NostrContext.tsx`**: Remove `CacheService`, `RelayService` dependencies. Rely on NDK/ndk-hooks for core Nostr functionality.
- **Resolve Linter/Vite Errors**: Focus on errors related to the simplified scope.
- **Implement Core UI**: Build out the package/event browser, comment sections, and Madeira feed using the migrated components and new simplified Nostr logic.
- **Ensure NDK Initialization**: Set up NDK singleton and `useNDKInit` correctly, likely in `main.tsx` or `App.tsx`.

# Build Documentation (Latest)

## Curation Workflow
- **Primary curation** is performed in `public/pacages/madbiz.md` (markdown, human-readable, with sections and comments).
- **Featured section** at the top highlights top picks for easy reference and UI integration.
- **Deprecated or unwanted entries** (e.g., Sweet Merenda, Sunshine Pub & Grill) are removed from the markdown and not included in the JSON.
- **Sync to JSON:**
  - After curation, the markdown is used as the source of truth to update `public/pacages/madeira_btc_businesses_20250511_172142.json`.
  - A script (`remove_tags.js`) is used to remove all `tags` and `bitcoin_payment` fields from the JSON for a clean dataset.
- **App/service integration** uses only the cleaned JSON; direct edits to the JSON are discouraged.

## Notes
- All business type clarifications and new entries should be made in the markdown first.
- The Featured section is intended for admin tools and UI highlights.
- Continue to maintain markdown as the master file for all curation and planning.

