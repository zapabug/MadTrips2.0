# LLM Context Dump: MadTrips Project

**Date:** 2025-05-12 00:00 UTC (Reflects Simplification)

**Objective:** Provide a comprehensive context package for the MadTrips project, suitable for onboarding an LLM or developer.

**1. Project Goal & Core Concept:**

MadTrips is a **Vite + React application serving as a browser for travel packages and events in Madeira.** It will feature a Madeira-tailored content feed and an interactive map (using `react-leaflet`) displaying local businesses. Map data is sourced primarily from `docs/map/export(1).geojson` for locations and core details, enriched with curated information from `public/packages/MadeiraBusinessDetails.json` (which includes categories like "Honorable Mentions" derived from `madbiz.md`). The app leverages Nostr for displaying images and handling comment sections for trips, events, and map features. The primary focus is on providing a simple, user-friendly interface for discovering Madeira through Nostr and facilitating Bitcoin-based interactions.

**2. Planning & Decision Summary (See @Planning.md for full history):**

- Name: MadTrips
- Focus: Vite/React app for browsing Madeira trips/events using Nostr.
- UX: Simple, user-friendly interface.
- Core Features:
    - Browse travel packages/events.
    - View images from Nostr.
    - Read and post comments via Nostr.
    - Madeira-tailored content feed.
- Technology: Vite (React/TypeScript), @nostr-dev-kit/ndk, @nostr-dev-kit/ndk-hooks, Tailwind CSS.
- Nostr login (NIP-07) for commenting and interacting.
- Previous complex backend logic, payment flows, and direct "Fixer" coordination are **out of scope** for this simplified version. The app is primarily a content browser and discovery tool.

**3. Final Low-Level Design (LLD):**

See @Build.md for the definitive LLD, including:
- Project structure and setup.
- NDK setup for fetching and displaying Nostr content.
- Native map implementation (`react-leaflet`) using dual data sources (`export(1).geojson` and `public/packages/MadeiraBusinessDetails.json`) for displaying businesses and enabling MadTrips-specific booking/interaction features (See LLD 6 in Build.md).

**4. Essential Supporting Documentation Files:**

- @Build.md : Detailed LLD and implementation notes.
- @Planning.md : Complete history of brainstorming and decision-making, including the recent simplification.

**5. Instructions for LLM/Developer:**

1. Start with this `madtrips.md` overview.
2. Refer to `Build.md` for the detailed target LLD.
3. Consult `Planning.md` to understand the rationale behind decisions, especially the simplification.
4. Implement features according to the LLD, focusing on a lean Nostr integration for content display and basic interaction.
5. Leverage `@nostr-dev-kit/ndk-hooks` for subscriptions and profile data at the component level where possible.

--- 