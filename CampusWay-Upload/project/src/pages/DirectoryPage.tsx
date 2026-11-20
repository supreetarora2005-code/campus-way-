import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Search, MapPin, Clock, ChevronRight, SearchX } from 'lucide-react';
import {
  CAMPUS_LOCATIONS,
  CATEGORIES,
  type Category,
} from '@/data/campus';

export default function DirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';
  const urlCategory = searchParams.get('category') as Category | null;
  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState<Category | 'All'>(urlCategory ?? 'All');
  const { lang } = useLanguage();
  const descriptionText = (l: (typeof CAMPUS_LOCATIONS)[number]) => l.description[lang] ?? l.description.en;

  const filtered = useMemo(() => {
    const q = (urlQuery || query).trim().toLowerCase();
    return CAMPUS_LOCATIONS.filter((l) => {
      const matchesCategory = category === 'All' || l.category === category;
      const matchesQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        descriptionText(l).toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.departments.some((d) => d.toLowerCase().includes(q)) ||
        l.facilities.some((f) => f.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [urlQuery, query, category]);

  const applyQuery = (value: string) => {
    setQuery(value);
    setSearchParams(value.trim() ? { q: value.trim() } : {}, { replace: true });
  };

  const applyCategory = (value: Category | 'All') => {
    setCategory(value);
    const next = new URLSearchParams(searchParams);
    if (value === 'All') next.delete('category');
    else next.set('category', value);
    setSearchParams(next, { replace: true });
  };

  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50/60">
        <div className="page-shell py-10 lg:py-12">
          <h1 className="section-title">Campus Directory</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-600 sm:text-base">
            Every building and facility on campus — search by name, department or facility,
            or filter by category.
          </p>

          {/* Search + filters */}
          <div className="mt-6 max-w-xl">
            <div className="relative">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" />
              <input
                value={urlQuery || query}
                onChange={(e) => applyQuery(e.target.value)}
                placeholder="Search buildings, labs, departments…"
                className="input-field pl-11"
                aria-label="Search the campus directory"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => applyCategory('All')}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                category === 'All'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-navy-700 ring-1 ring-navy-200 hover:bg-navy-100'
              }`}
            >
              All Locations
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => applyCategory(c)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  category === c
                    ? 'bg-teal-500 text-white shadow-sm shadow-teal-500/30'
                    : 'bg-white text-navy-700 ring-1 ring-navy-200 hover:bg-teal-50 hover:text-teal-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-10 lg:py-14">
        <p className="text-sm font-medium text-navy-500">
          Showing {filtered.length} of {CAMPUS_LOCATIONS.length} locations
        </p>

        {filtered.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-16 text-center">
            <SearchX size={36} className="text-navy-300" />
            <p className="mt-4 text-base font-semibold text-navy-900">No locations found</p>
            <p className="mt-1 max-w-sm text-sm text-navy-500">
              Try a different name or clear the category filter to see everything on campus.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((l) => (
              <Link
                key={l.id}
                to={`/location/${l.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy-800 shadow-sm">
                    {l.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-base font-bold text-navy-900 transition group-hover:text-teal-700">
                    {l.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">
                    {descriptionText(l)}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-3.5">
                    <span className="flex items-center gap-1.5 text-xs text-navy-500">
                      <Clock size={12} /> {l.hours.split('·')[0]}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700">
                      View details <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-2xl bg-navy-900 px-6 py-8 text-center sm:px-10">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            Can't find what you're looking for?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-navy-200">
            Open the interactive campus map and explore every pin, or send us feedback from
            the About page.
          </p>
          <Link
            to="/explore"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            <MapPin size={15} /> Open Campus Map
          </Link>
        </div>
      </section>
    </>
  );
}
