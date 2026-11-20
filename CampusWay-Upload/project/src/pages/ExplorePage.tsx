import { useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Navigation, Route as RouteIcon, Search, X } from 'lucide-react';
import CampusMap from '@/components/CampusMapLoader';
import type { MapPoint } from '@/components/CampusMap';
import {
  canWalkRouteTo,
  getCategoryName,
  getLocationDescription,
  getLocationName,
  useCampusDirectory,
  type VerifiedCampusLocation,
} from '@/data/verified-campus';
import { useLanguage } from '@/i18n/LanguageContext';

interface WalkingRoute {
  positions: MapPoint[];
  distanceMeters: number;
  durationSeconds: number;
}

interface RoutingResponse {
  code?: string;
  routes?: Array<{
    distance: number;
    duration: number;
    geometry: { coordinates: number[][] };
  }>;
}

function formatDistance(meters: number) {
  return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(1)} km`;
}

function getGeolocationMessage(code: number) {
  if (code === 1) return 'Location access was denied. Allow it in your browser settings to use walking directions.';
  if (code === 3) return 'Location detection timed out. Check your device location settings and try again.';
  return 'Your current location is unavailable. Check your device location settings and try again.';
}

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang, t } = useLanguage();
  const { categories, locations, isLoading, error } = useCampusDirectory();
  const [query, setQuery] = useState('');
  const [userLocation, setUserLocation] = useState<MapPoint | null>(null);
  const [locationError, setLocationError] = useState('');
  const [route, setRoute] = useState<WalkingRoute | null>(null);
  const [routeError, setRouteError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const lastRouteRequestAt = useRef(0);
  const destinationKey = searchParams.get('destination');
  const destination = locations.find(
    (location) => location.slug === destinationKey || location.id === destinationKey
  );
  const categoryFilter = searchParams.get('category') ?? 'all';
  const canRoute = destination ? canWalkRouteTo(destination) : false;

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return locations.filter((location) => {
      const matchesCategory = categoryFilter === 'all' || location.category.slug === categoryFilter;
      const searchableText = [
        location.name,
        location.nameKn,
        location.nameHi,
        location.category.name,
        ...Object.values(location.description),
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [categoryFilter, locations, query]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    setSearchParams(next, { replace: true });
  };

  const setDestination = (location?: VerifiedCampusLocation) => {
    updateSearchParams({ destination: location?.slug ?? null });
    setRoute(null);
    setRouteError('');
  };

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('This browser does not support location detection.');
      return;
    }
    setIsLocating(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation([coords.latitude, coords.longitude]);
        setIsLocating(false);
      },
      (geolocationError) => {
        setLocationError(getGeolocationMessage(geolocationError.code));
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12_000, maximumAge: 30_000 }
    );
  };

  const requestWalkingRoute = async () => {
    if (!destination || !userLocation || !canRoute || isRouting) return;
    if (Date.now() - lastRouteRequestAt.current < 1_000) {
      setRouteError('Please wait a moment before requesting another route.');
      return;
    }
    lastRouteRequestAt.current = Date.now();
    setIsRouting(true);
    setRouteError('');

    try {
      const [startLatitude, startLongitude] = userLocation;
      const routeUrl = new URL(
        `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${startLongitude},${startLatitude};${destination.longitude},${destination.latitude}`
      );
      routeUrl.searchParams.set('overview', 'full');
      routeUrl.searchParams.set('geometries', 'geojson');
      routeUrl.searchParams.set('steps', 'false');
      routeUrl.searchParams.set('alternatives', 'false');
      const response = await fetch(routeUrl, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Routing service is unavailable.');
      const result = (await response.json()) as RoutingResponse;
      const selectedRoute = result.routes?.[0];
      if (
        result.code !== 'Ok' ||
        !selectedRoute ||
        !Array.isArray(selectedRoute.geometry?.coordinates) ||
        !Number.isFinite(selectedRoute.distance) ||
        selectedRoute.distance < 0 ||
        !Number.isFinite(selectedRoute.duration) ||
        selectedRoute.duration < 0
      ) {
        throw new Error('No walking route is available for this start and destination.');
      }
      const positions = selectedRoute.geometry.coordinates.flatMap((coordinate) => {
        const [longitude, latitude] = coordinate;
        return Number.isFinite(latitude) && Number.isFinite(longitude)
          ? [[latitude, longitude] as MapPoint]
          : [];
      });
      if (positions.length < 2) throw new Error('The walking route response did not contain a usable path.');
      setRoute({
        positions,
        distanceMeters: selectedRoute.distance,
        durationSeconds: selectedRoute.duration,
      });
    } catch (routeFailure) {
      setRoute(null);
      setRouteError(
        routeFailure instanceof Error
          ? routeFailure.message
          : 'Walking directions could not be calculated. Please try again.'
      );
    } finally {
      setIsRouting(false);
    }
  };

  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50/60">
        <div className="page-shell py-10 lg:py-12">
          <h1 className="section-title">{t('explore.title')}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-600 sm:text-base">{t('explore.subtitle')}</p>
        </div>
      </section>

      <section className="page-shell grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-12">
        <div className="min-w-0">
          <div className="h-[420px] overflow-hidden rounded-2xl border border-navy-100 shadow-card sm:h-[560px]">
            <CampusMap
              locations={locations}
              highlightedId={destination?.id}
              userLocation={userLocation}
              route={route?.positions}
              onSelectLocation={setDestination}
            />
          </div>

          {destination ? (
            <div className="mt-4 rounded-2xl border border-teal-200 bg-teal-50 p-4">
              <div className="flex items-start gap-3">
                <RouteIcon size={18} className="mt-0.5 shrink-0 text-teal-700" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy-900">{getLocationName(destination, lang)}</p>
                  <p className="mt-1 text-sm text-navy-700">
                    {getLocationDescription(destination, lang) || destination.category.name}
                  </p>
                  {route ? (
                    <p className="mt-3 text-sm font-semibold text-teal-800" role="status">
                      Walking route: {formatDistance(route.distanceMeters)} · {Math.max(1, Math.round(route.durationSeconds / 60))} min
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-navy-600">
                      {canRoute
                        ? 'The destination is routeable. Share your current location to request a walking route.'
                        : 'This is not a precise, routeable building or entrance point, so walking directions are unavailable.'}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setDestination(undefined)}
                  className="rounded-full p-1.5 text-navy-500 transition hover:bg-teal-100 hover:text-navy-800"
                  aria-label="Clear destination"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-navy-500">
              Select a marker or choose a verified location from the list to highlight it on the map.
            </p>
          )}
          <p className="mt-3 text-xs leading-relaxed text-navy-500">
            Map tiles © OpenStreetMap contributors. Walking routes use the{' '}
            <a href="https://routing.openstreetmap.de/" target="_blank" rel="noreferrer" className="underline underline-offset-2">OpenStreetMap foot-routing service</a>{' '}
            under its fair-use limits. Help improve map data at{' '}
            <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noreferrer" className="underline underline-offset-2">OpenStreetMap Fix the Map</a>.
          </p>
        </div>

        <aside className="flex flex-col gap-5">
          <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card" aria-labelledby="explore-search-title">
            <h2 id="explore-search-title" className="text-sm font-semibold text-navy-900">{t('explore.search')}</h2>
            <div className="relative mt-3">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Building, department, facility…"
                className="input-field pl-10"
                aria-label="Search verified campus locations"
              />
            </div>
            <h3 className="mt-5 text-sm font-semibold text-navy-900">Categories</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => updateSearchParams({ category: null })}
                aria-pressed={categoryFilter === 'all'}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${categoryFilter === 'all' ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'}`}
              >
                {t('explore.all')}
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.slug}
                  onClick={() => updateSearchParams({ category: category.slug })}
                  aria-pressed={categoryFilter === category.slug}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${categoryFilter === category.slug ? 'bg-teal-500 text-white' : 'bg-navy-50 text-navy-700 hover:bg-teal-50 hover:text-teal-700'}`}
                >
                  {getCategoryName(category, lang)}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card" aria-labelledby="route-planner-title">
            <h2 id="route-planner-title" className="flex items-center gap-2 text-sm font-semibold text-navy-900">
              <Navigation size={15} className="text-teal-600" aria-hidden="true" /> {t('explore.plan')}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-navy-600">
              Your location is requested only when you press the button. It is used in this session and is not saved.
            </p>
            <button
              type="button"
              onClick={detectCurrentLocation}
              disabled={isLocating}
              className="mt-4 w-full rounded-xl border border-navy-200 px-4 py-3 text-sm font-semibold text-navy-800 transition hover:border-teal-400 hover:bg-teal-50 disabled:cursor-wait disabled:opacity-60"
            >
              {isLocating ? 'Finding your location…' : userLocation ? 'Refresh my location' : 'Use my current location'}
            </button>
            {locationError && <p className="mt-2 text-xs text-red-700" role="alert">{locationError}</p>}
            <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-navy-500" htmlFor="walking-destination">
              Destination
            </label>
            <select
              id="walking-destination"
              value={destination?.slug ?? ''}
              onChange={(event) => setDestination(locations.find((location) => location.slug === event.target.value))}
              className="input-field mt-2"
            >
              <option value="">{t('explore.destination')}</option>
              {locations.map((location) => (
                <option key={location.id} value={location.slug}>{getLocationName(location, lang)}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={requestWalkingRoute}
              disabled={!userLocation || !canRoute || isRouting}
              className="mt-3 w-full rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-navy-200 disabled:text-navy-500"
            >
              {isRouting ? 'Calculating route…' : 'Get walking directions'}
            </button>
            {!canRoute && destination && (
              <p className="mt-2 text-xs leading-relaxed text-amber-800" role="status">
                This campus reference is approximate. A verified building or entrance coordinate is needed before routing is enabled.
              </p>
            )}
            {routeError && <p className="mt-2 text-xs text-red-700" role="alert">{routeError}</p>}
          </section>

          <section className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card" aria-labelledby="verified-results-title">
            <h2 id="verified-results-title" className="text-sm font-semibold text-navy-900">
              {isLoading ? 'Loading verified locations…' : `${filtered.length} ${t('explore.results')}`}
            </h2>
            {error && <p className="mt-3 text-sm text-red-700" role="alert">Campus locations could not be loaded. Check the connection and try again.</p>}
            <ul className="mt-3 max-h-80 overflow-y-auto pr-1">
              {filtered.map((location) => (
                <li key={location.id} className="border-b border-navy-100 last:border-0">
                  <button
                    type="button"
                    onClick={() => setDestination(location)}
                    aria-pressed={destination?.id === location.id}
                    className={`w-full rounded-xl px-3 py-3 text-left transition ${destination?.id === location.id ? 'bg-teal-50' : 'hover:bg-navy-50'}`}
                  >
                    <span className="block text-sm font-medium text-navy-900">{getLocationName(location, lang)}</span>
                    <span className="mt-1 block text-xs text-navy-500">{getCategoryName(location.category, lang)}</span>
                  </button>
                  <Link className="mb-2 ml-3 inline-block text-xs font-semibold text-teal-700 hover:text-teal-900" to={`/location/${location.slug}`}>
                    View details
                  </Link>
                </li>
              ))}
              {!isLoading && !error && filtered.length === 0 && (
                <li className="rounded-xl bg-navy-50 px-3.5 py-3 text-sm text-navy-600">
                  {locations.length === 0 ? 'No verified locations with coordinates are available yet.' : t('explore.noResults')}
                </li>
              )}
            </ul>
          </section>
        </aside>
      </section>
    </>
  );
}
