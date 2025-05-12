### Map Component (`src/components/home/FunchalMap.tsx` and potential `src/pages/MapPage.tsx`)

*   **Data Source:** Utilize `docs/map/export(1).geojson` as the primary data source for map features. This file contains business information, coordinates, and Bitcoin/Lightning payment acceptance details.
*   **Implementation:** Use a native map rendering library (e.g., `react-leaflet` or `maplibre-gl`).
*   **Features:**
    *   Display businesses from the GeoJSON data as markers/points on the map.
    *   Clicking a business should show a popup/card with details (name, address, services, payment info).
    *   Integrate "Book via MadTrips" button/flow for each business, allowing users to initiate booking requests through the app.
    *   Consider "Request a Guide" or "P2P ATM info" options where applicable.
    *   Implement Nostr-powered comment/review sections for businesses, using the OSM `@id` from the GeoJSON as a unique identifier for event tagging (`#d` tag).
    *   Allow filtering/searching of map features (e.g., by city, business type, Lightning acceptance).
*   **Nostr Integration:** Fetch and display Nostr events (comments, reviews) related to specific businesses using `useSubscribe` from `@nostr-dev-kit/ndk-hooks` at the component level (e.g., within the business detail popup).
*   **UI/UX:** Prioritize a clean, user-friendly interface. Avoid 'loading' states where possible; render data as it becomes available. Provide sane defaults if data is not yet fetched. 