## Map Strategy Update (2025-05-12)

*   **Decision:** Move away from embedding BTCMap via iframe.
*   **New Strategy:** Implement a native map component (e.g., using `react-leaflet` or `maplibre-gl`) populated with data sourced from `docs/map/export(1).geojson`.
*   **Rationale:** This provides full control over the UI/UX, allowing integration of MadTrips-specific features like booking requests, guide requests, P2P ATM facilitation, and Nostr-based interactions (comments, reviews) directly onto the map interface. It aligns better with the goal of MadTrips acting as a central intermediary and guide for Bitcoin travelers in Madeira. The `export(1).geojson` provides a rich, local dataset of businesses, including Bitcoin/Lightning acceptance details.
*   **Next Steps:** Refactor map components (`FunchalMap.tsx`, potentially create a new general `MapPage.tsx`) to use this approach. 