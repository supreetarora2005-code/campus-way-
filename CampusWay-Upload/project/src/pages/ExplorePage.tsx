import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Flag, Route as RouteIcon, X, Navigation } from 'lucide-react';
import MapPlaceholder from '@/components/MapPlaceholder';
import {
  CAMPUS_LOCATIONS,
  CATEGORIES,
  type Category,
  type CampusLocation,
} from '@/data/campus';

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [startId, setStartId] = useState('main-gate');
  const destinationId = searchParams.get('destination');

  const START_OPTIONS = useMemo(
    () => [{ id: 'main-gate', name: 'Main Gate (Default)' }, ...CAMPUS_LOCATIONS.map((l) => ({ id: l.id, name: l.name }))],
    []
  );

  const destination: CampusLocation | undefined = CAMPUS_LOCATIONS.find(
    (l) => l.id === destinationId
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CAMPUS_LOCATIONS.filter((l) => {
      const matchesCategory = category === 'All' || l.category === category;
      const matchesQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.departments.some((d) => d.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const setDestination = (loc: CampusLocation | undefined) => {
    setSearchParams(loc ? { destination: loc.id } : {});
  };

  return (
    <>
      {/* Header */}
      <section className="border-b border-navy-100 bg-navy-50/60">
        <div className="page-shell py-10 lg:py-12">
          <h1 className="section-title">Explore Campus</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-600 sm:text-base">
            Pick a category, search for a location, then set your start and destination to
            plan your route across campus.
          </p>
        </div>
      </section>

      <section className="page-shell grid gap-8 py-10 lg:grid-cols-[1fr_360px] lg:py-14">
        {/* Map */}
        <div>
          <div className="h-[420px] overflow-hidden rounded-2xl border border-navy-100 shadow-card sm:h-[520px]">
            <MapPlaceholder highlightedId={destinationId} />
          </div>
          {destination ? (
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 p-4">
              <RouteIcon size={18} className="text-teal-700" />
              <p className="text-sm text-navy-800">
                <span className="font-semibold">{destination.name}</span> is highlighted on the
                map. Approx.{' '}
                <span className="font-semibold text-teal-700">
                  {Math.round(2 + destination.mapX / 12)} min
                </span>{' '}
                walk from Main Gate.
              </p>
              <button
                onClick={() => setDestination(undefined)}
                className="ml-auto rounded-full p-1.5 text-navy-500 transition hover:bg-teal-100 hover:text-navy-800"
                aria-label="Clear destination"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-navy-500">
              Tap any pin on the map, or choose a destination from the list, to highlight a
              route.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Search */}
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            <label className="text-sm font-semibold text-navy-900">Search Location</label>
            <div className="relative mt-3">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Building, department, facility…"
                className="input-field pl-10"
              />
            </div>

            {/* Categories */}
            <p className="mt-5 text-sm font-semibold text-navy-900">Categories</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setCategory('All')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  category === 'All'
                    ? 'bg-navy-900 text-white'
                    : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    category === c
                      ? 'bg-teal-500 text-white'
                      : 'bg-navy-50 text-navy-700 hover:bg-teal-50 hover:text-teal-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Route planner */}
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
              <Navigation size={15} className="text-teal-600" /> Plan a Route
            </p>
            <div className="mt-4 space-y-3">
              <div className="relative">
                <Flag size={14} className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-teal-600" />
                <select
                  value={startId}
                  onChange={(e) => setStartId(e.target.value)}
                  className="input-field appearance-none pl-10"
                  aria-label="Starting point"
                >
                  {START_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <MapPin size={14} className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-navy-700" />
                <select
                  value={destinationId ?? ''}
                  onChange={(e) =>
                    setDestination(CAMPUS_LOCATIONS.find((l) => l.id === e.target.value))
                  }
                  className="input-field appearance-none pl-10"
                  aria-label="Destination"
                >
                  <option value="">Choose destination…</option>
                  {CAMPUS_LOCATIONS.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() =>
                  destination && navigate(`/location/${destination.id}`)
                }
                disabled={!destination}
                className="w-full rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-navy-200 disabled:text-navy-500"
              >
                Navigate Here
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            <p className="text-sm font-semibold text-navy-900">
              {filtered.length} location{filtered.length === 1 ? '' : 's'}
            </p>
            <ul className="mt-3 max-h-72 space-y-1.5 overflow-y-auto pr-1">
              {filtered.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => setDestination(l)}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-left transition ${
                      destinationId === l.id
                        ? 'bg-teal-50 ring-1 ring-teal-300'
                        : 'hover:bg-navy-50'
                    }`}
                  >
                    <p className="text-sm font-medium text-navy-900">{l.name}</p>
                    <p className="text-xs text-navy-500">{l.category}</p>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="rounded-xl bg-navy-50 px-3.5 py-3 text-sm text-navy-500">
                  No locations match your search.
                </li>
              )}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
