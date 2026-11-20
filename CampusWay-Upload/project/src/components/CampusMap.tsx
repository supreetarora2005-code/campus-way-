import { useEffect, useMemo } from 'react';
import { divIcon, type LatLngTuple } from 'leaflet';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { VerifiedCampusLocation } from '@/data/verified-campus';
import { getCategoryName, getLocationDescription, getLocationName } from '@/data/verified-campus';
import { useLanguage } from '@/i18n/LanguageContext';

export type MapPoint = LatLngTuple;

export interface CampusMapProps {
  locations: VerifiedCampusLocation[];
  highlightedId?: string | null;
  userLocation?: MapPoint | null;
  route?: MapPoint[] | null;
  onSelectLocation?: (location: VerifiedCampusLocation) => void;
}

function MapCamera({
  selectedLocation,
  userLocation,
  route,
}: {
  selectedLocation?: VerifiedCampusLocation;
  userLocation?: MapPoint | null;
  route?: MapPoint[] | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (route && route.length > 1) {
      map.fitBounds(route, { padding: [40, 40], maxZoom: 18 });
      return;
    }
    if (userLocation) {
      map.flyTo(userLocation, Math.max(map.getZoom(), 17), { duration: 0.7 });
      return;
    }
    if (selectedLocation) {
      map.flyTo(
        [selectedLocation.latitude, selectedLocation.longitude],
        selectedLocation.coordinatePrecision === 'campus_reference' ? 16 : 18,
        { duration: 0.7 }
      );
    }
  }, [map, route, selectedLocation, userLocation]);

  return null;
}

export default function CampusMap({
  locations,
  highlightedId,
  userLocation,
  route,
  onSelectLocation,
}: CampusMapProps) {
  const { lang } = useLanguage();
  const selectedLocation = locations.find((location) => location.id === highlightedId);
  const initialLocation =
    selectedLocation ??
    locations.find((location) => location.locationType === 'campus') ??
    locations[0];

  const locationIcon = useMemo(
    () =>
      divIcon({
        className: 'campus-map-marker',
        html: '<span class="campus-map-marker__dot" aria-hidden="true"></span>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    []
  );

  const selectedLocationIcon = useMemo(
    () =>
      divIcon({
        className: 'campus-map-marker',
        html: '<span class="campus-map-marker__dot campus-map-marker__dot--selected" aria-hidden="true"></span>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    []
  );

  const userIcon = useMemo(
    () =>
      divIcon({
        className: 'campus-map-marker',
        html: '<span class="campus-map-user__dot" aria-hidden="true"></span>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    []
  );

  if (!initialLocation) {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 bg-navy-50 px-6 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
          <MapPin size={22} aria-hidden="true" />
        </span>
        <p className="max-w-sm text-sm font-medium text-navy-700">
          No verified campus coordinates are available to display yet.
        </p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[initialLocation.latitude, initialLocation.longitude]}
      zoom={initialLocation.coordinatePrecision === 'campus_reference' ? 16 : 18}
      minZoom={3}
      maxZoom={20}
      scrollWheelZoom
      className="h-full min-h-64 w-full"
      aria-label="Interactive map of verified campus locations"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCamera selectedLocation={selectedLocation} userLocation={userLocation} route={route} />
      {route && route.length > 1 && (
        <Polyline
          positions={route}
          pathOptions={{ color: '#0f766e', opacity: 0.9, weight: 5 }}
        />
      )}
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={location.id === highlightedId ? selectedLocationIcon : locationIcon}
          title={getLocationName(location, lang)}
          alt={getLocationName(location, lang)}
          keyboard
          zIndexOffset={location.id === highlightedId ? 1000 : 0}
          eventHandlers={{
            click: () => onSelectLocation?.(location),
          }}
        >
          <Popup>
            <div className="min-w-44">
              <p className="font-semibold text-navy-900">{getLocationName(location, lang)}</p>
              <p className="mt-1 text-xs text-navy-600">{getCategoryName(location.category, lang)}</p>
              {getLocationDescription(location, lang) && (
                <p className="mt-2 text-xs leading-relaxed text-navy-700">
                  {getLocationDescription(location, lang)}
                </p>
              )}
              {location.coordinatePrecision === 'campus_reference' && (
                <p className="mt-2 rounded-lg bg-amber-50 px-2.5 py-2 text-xs text-amber-900">
                  Approximate campus reference point, not a building entrance.
                </p>
              )}
              {location.sourceUrl && (
                <a
                  className="mt-2 inline-block text-xs font-medium text-teal-700 underline underline-offset-2"
                  href={location.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {location.sourceName ? `Source: ${location.sourceName}` : 'View source'}
                </a>
              )}
              <Link
                className="mt-2 block text-xs font-semibold text-teal-700"
                to={`/location/${location.slug}`}
              >
                View location details
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon} title="Your current location" alt="Your current location">
          <Popup>Your current location</Popup>
        </Marker>
      )}
      <span className="sr-only" aria-live="polite">
        {selectedLocation
          ? `Selected ${getLocationName(selectedLocation, lang)}`
          : `${locations.length} verified campus locations shown`}
      </span>
    </MapContainer>
  );
}
