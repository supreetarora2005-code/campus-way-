import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Navigation,
  Layers,
  Building2,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import MapPlaceholder from '@/components/MapPlaceholder';
import { getLocationById, CAMPUS_LOCATIONS } from '@/data/campus';

export default function LocationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const location = getLocationById(id);

  if (!location) {
    return (
      <div className="page-shell flex flex-col items-center py-24 text-center">
        <Compass size={40} className="text-navy-300" />
        <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">
          Location not found
        </h1>
        <p className="mt-2 max-w-sm text-sm text-navy-600">
          The location you're looking for isn't in the campus directory.
        </p>
        <Link
          to="/directory"
          className="mt-6 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
        >
          Back to Directory
        </Link>
      </div>
    );
  }

  const related = CAMPUS_LOCATIONS.filter(
    (l) => l.category === location.category && l.id !== location.id
  ).slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-navy-100 bg-navy-50/60">
        <div className="page-shell flex items-center gap-2 py-4 text-xs text-navy-500">
          <Link to="/" className="transition hover:text-teal-700">Home</Link>
          <span>/</span>
          <Link to="/directory" className="transition hover:text-teal-700">Directory</Link>
          <span>/</span>
          <span className="font-medium text-navy-800">{location.name}</span>
        </div>
      </div>

      <section className="page-shell py-10 lg:py-14">
        <Link
          to="/directory"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 transition hover:text-teal-700"
        >
          <ArrowLeft size={15} /> Back to directory
        </Link>

        <div className="mt-5 grid gap-10 lg:grid-cols-2">
          {/* Info column */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
              <MapPin size={12} /> {location.category}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              {location.name}
            </h1>
            <p className="mt-4 leading-relaxed text-navy-600">{location.longDescription}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl bg-navy-50 px-4 py-2.5 text-sm text-navy-700">
                <Clock size={15} className="text-teal-600" /> {location.hours}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl bg-navy-50 px-4 py-2.5 text-sm text-navy-700">
                <Layers size={15} className="text-teal-600" /> {location.floors.length}{' '}
                floor{location.floors.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={`/explore?destination=${location.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition hover:-translate-y-0.5 hover:bg-teal-600"
              >
                <Navigation size={16} /> Navigate Here
              </Link>
              <Link
                to="/directory"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-navy-800 ring-1 ring-navy-200 transition hover:bg-navy-50"
              >
                <Building2 size={16} /> All Locations
              </Link>
            </div>

            {/* Departments */}
            <h2 className="mt-10 text-sm font-bold uppercase tracking-wider text-navy-500">
              Departments & Offices
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {location.departments.map((d) => (
                <span
                  key={d}
                  className="rounded-full bg-navy-900 px-4 py-1.5 text-xs font-medium text-white"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Facilities */}
            <h2 className="mt-8 text-sm font-bold uppercase tracking-wider text-navy-500">
              Facilities Available
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {location.facilities.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-navy-700">
                  <CheckCircle2 size={15} className="shrink-0 text-teal-600" /> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Image + map column */}
          <div className="space-y-6">
            <div className="h-60 overflow-hidden rounded-2xl shadow-card sm:h-72">
              <img
                src={location.image}
                alt={location.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-navy-500">
                Location on Campus Map
              </h2>
              <div className="h-[340px] overflow-hidden rounded-2xl border border-navy-100 shadow-card">
                <MapPlaceholder highlightedId={location.id} />
              </div>
            </div>

            {/* Floors */}
            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-navy-500">
                Floors & Rooms
              </h2>
              <div className="space-y-3">
                {location.floors.map((floor) => (
                  <div
                    key={floor.name}
                    className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card"
                  >
                    <p className="text-sm font-bold text-navy-900">{floor.name}</p>
                    <ul className="mt-2 space-y-1">
                      {floor.rooms.map((room) => (
                        <li key={room} className="flex items-center gap-2 text-sm text-navy-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> {room}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14 border-t border-navy-100 pt-10">
            <h2 className="section-title text-xl sm:text-2xl">
              More in {location.category}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((l) => (
                <Link
                  key={l.id}
                  to={`/location/${l.id}`}
                  className="group flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-navy-900 group-hover:text-teal-700">
                      {l.name}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-navy-500">{l.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
