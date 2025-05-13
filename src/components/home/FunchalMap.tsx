import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FEATURED_BUSINESSES } from '../../data/packages';
import { useState, useEffect, useMemo } from 'react'; // Import useMemo

// Import data URLs
import geojsonUrl from '../../../docs/map/export(1).geojson?url';
import curatedDataUrl from '../../../public/packages/madeira_btc_businesses_20250511_172142.json?url'; // Updated to actual filename

// Optional: Configure Leaflet icon (if default icons don't show up)
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// Define types for GeoJSON Feature
type PointCoordinates = [number, number]; // [lng, lat]
type PolygonCoordinates = PointCoordinates[][]; // Array of rings, first is outer

interface GeoJsonGeometry {
  type: 'Point' | 'Polygon';
  coordinates: PointCoordinates | PolygonCoordinates;
}

interface GeoJsonFeature {
  type: 'Feature';
  properties: Record<string, unknown>; // Use unknown instead of any
  geometry: GeoJsonGeometry;
}

interface GeoJsonRoot {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

interface CuratedBusiness {
  name: string;
  city: string;
  type?: string | null;
  description?: string | null;
  isFeatured?: boolean;
  // Add other fields from MadeiraBusiness.json as needed
}

interface CuratedData {
  [category: string]: CuratedBusiness[];
}

// Helper to create a unique key for lookup
const createBusinessLookupKey = (name: string, city?: string): string => {
  return `${name.toLowerCase().trim()}_${(city || 'unknown').toLowerCase().trim()}`;
};

interface FunchalMapProps {
  variant?: 'home' | 'page';
}

export function FunchalMap({ variant = 'page' }: FunchalMapProps) {
  const mapHeightClass =
    variant === 'home' ? 'h-[350px]' : 'h-[400px] sm:h-[550px] lg:h-[700px]';

  const mapCenter: LatLngTuple = [32.75, -17.0]; // Centered roughly on Madeira
  const initialZoom = 10;

  const [geojsonData, setGeojsonData] = useState<GeoJsonRoot | null>(null);
  const [curatedBusinesses, setCuratedBusinesses] = useState<CuratedData | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(geojsonUrl).then(res => res.ok ? res.json() : Promise.reject(new Error(`Failed to load GeoJSON: ${res.status}`))),
      fetch(curatedDataUrl).then(res => res.ok ? res.json() : Promise.reject(new Error(`Failed to load Curated Data: ${res.status}`)))
    ])
    .then(([geoData, curatedData]: [GeoJsonRoot, CuratedData]) => {
      setGeojsonData(geoData);
      setCuratedBusinesses(curatedData);
    })
    .catch(error => {
      console.error("Error fetching map data:", error);
      setMapError("Failed to load map data. " + error.message);
    });
  }, []);

  // Memoized lookup for curated business details
  const curatedDetailsLookup = useMemo(() => {
    if (!curatedBusinesses) return new Map<string, CuratedBusiness>();
    const lookup = new Map<string, CuratedBusiness>();
    Object.values(curatedBusinesses).forEach(category => {
      category.forEach(business => {
        lookup.set(createBusinessLookupKey(business.name, business.city), business);
      });
    });
    return lookup;
  }, [curatedBusinesses]);

  const features: GeoJsonFeature[] = geojsonData?.features || [];

  if (mapError) {
    return (
      <div className={`w-full ${mapHeightClass} flex items-center justify-center p-3 rounded-lg border border-red-500 bg-red-100 dark:bg-red-900 dark:border-red-700`}>
        <p className="text-red-700 dark:text-red-300">{mapError}</p>
      </div>
    );
  }

  if (!geojsonData || !curatedBusinesses) {
    return (
      <div className={`w-full ${mapHeightClass} flex items-center justify-center p-3 rounded-lg border border-gray-300 dark:border-gray-700`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean"></div> 
      </div>
    );
  }

  return (
    <>
      {/* Add z-10 to ensure map is below the fixed navbar (z-30) */}
      <div className={`w-full ${mapHeightClass} relative p-3 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 z-10`}>
        <MapContainer
          center={mapCenter}
          zoom={initialZoom}
          scrollWheelZoom={true} // Enable scroll wheel zoom
          style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Using CartoDB Voyager basemap for a clean look
          />

          {/* Render markers from GeoJSON data */}
          {features.map((feature: GeoJsonFeature) => {
            if (!feature.geometry || !feature.properties) return null;

            let position: LatLngTuple | null = null;

            // Type assertion for coordinates based on geometry type
            if (feature.geometry.type === 'Point') {
              const coords = feature.geometry.coordinates as PointCoordinates;
              position = [coords[1], coords[0]]; // [lat, lng]
            }
            else if (feature.geometry.type === 'Polygon') {
              const coords = feature.geometry.coordinates as PolygonCoordinates;
              if (coords[0]?.length > 0) {
                position = [coords[0][0][1], coords[0][0][0]]; // Use first point of outer ring
              }
            }

            if (!position) return null;

            const geoJsonName = (feature.properties.name as string) || 'Unnamed Location';
            const geoJsonCity = (feature.properties['addr:city'] as string) || undefined;
            const businessId = (feature.properties['@id'] as string) || JSON.stringify(feature.properties);
            
            const lookupKey = createBusinessLookupKey(geoJsonName, geoJsonCity);
            const curated = curatedDetailsLookup.get(lookupKey);

            return (
              <Marker key={businessId} position={position}>
                <Popup>
                  <strong className="text-lg">{curated?.name || geoJsonName}</strong>
                  {curated?.isFeatured && <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-bitcoin text-ocean rounded-full">Featured</span>}
                  <br />
                  {curated?.type && <p className="text-sm text-gray-600 dark:text-gray-400">Type: {curated.type}</p>}
                  {(curated?.description || feature.properties.description as string) && 
                    <p className="text-sm my-1">{(curated?.description || feature.properties.description as string)}</p>
                  }
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {(feature.properties['addr:street'] as string) || ''}
                    {(feature.properties['addr:street'] && (geoJsonCity || curated?.city)) ? ', ' : ''}
                    {geoJsonCity || curated?.city || ''}
                  </p>
                  {/* TODO: Add more details: payment types from geoJSON, website, phone */}
                  {/* TODO: Add "Book via MadTrips" button */}
                  {/* TODO: Add Nostr comments section */}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      {/* Featured Business Section - Only show if variant is 'page' */}
      {variant === 'page' && FEATURED_BUSINESSES.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Featured Bitcoin Businesses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {FEATURED_BUSINESSES.map((business) => {
              // Check if business is valid before rendering
              if (!business || !business.id) {
                return null; // Explicitly return null for invalid items
              }
              // Return the JSX element for valid items
              return (
                <div key={business.id} className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col items-center text-center max-w-sm w-full">
                  {business.image && (
                    <img src={business.image} alt={business.name} className="w-24 h-24 object-cover rounded-lg mb-4" />
                  )}
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{business.name}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{business.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{business.city}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
} 