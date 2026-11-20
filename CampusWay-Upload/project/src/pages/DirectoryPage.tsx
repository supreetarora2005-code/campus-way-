import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Building2, ChevronRight, ExternalLink, MapPin, MapPinOff, Search, SearchX } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  getCategoryName,
  getLocationDescription,
  getLocationName,
  useCampusDirectory,
} from '@/data/verified-campus';

export default function DirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const categoryFilter = searchParams.get('category') ?? 'all';
  const { lang, t } = useLanguage();
  const { categories, locations, entries, isLoading, error } = useCampusDirectory();

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

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return entries.filter((entry) => {
      const matchesCategory = categoryFilter === 'all' || entry.category.slug === categoryFilter;
      const searchableText = [
        entry.name,
        entry.nameKn,
        entry.nameHi,
        entry.category.name,
        ...Object.values(entry.description),
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [categoryFilter, entries, query]);

  const updateFilters = (nextQuery: string, nextCategory: string) => {
    const next = new URLSearchParams(searchParams);
    if (nextQuery.trim()) next.set('q', nextQuery.trim());
    else next.delete('q');
    if (nextCategory === 'all') next.delete('category');
    else next.set('category', nextCategory);
    setSearchParams(next, { replace: true });
  };

  return (
    <>
      <section className="border-b border-navy-100 bg-navy-50/60">
        <div className="page-shell py-10 lg:py-12">
          <h1 className="section-title">{t('dir.title')}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-600 sm:text-base">{t('dir.subtitle')}</p>

          <div className="mt-6 max-w-xl">
            <div className="relative">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => updateFilters(event.target.value, categoryFilter)}
                placeholder={t('dir.searchPlaceholder')}
                className="input-field pl-11"
                aria-label="Search verified campus locations"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => updateFilters(query, 'all')}
              aria-pressed={categoryFilter === 'all'}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${categoryFilter === 'all' ? 'bg-navy-900 text-white shadow-sm' : 'bg-white text-navy-700 ring-1 ring-navy-200 hover:bg-navy-100'}`}
            >
              {t('dir.allLocations')}
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category.slug}
                onClick={() => updateFilters(query, category.slug)}
                aria-pressed={categoryFilter === category.slug}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${categoryFilter === category.slug ? 'bg-teal-500 text-white shadow-sm shadow-teal-500/30' : 'bg-white text-navy-700 ring-1 ring-navy-200 hover:bg-teal-50 hover:text-teal-700'}`}
              >
                {getCategoryName(category, lang)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-10 lg:py-14">
        <p className="text-sm font-medium text-navy-500" role="status" aria-live="polite">
          {isLoading
            ? 'Loading campus directory…'
            : `${filtered.length} mapped locations and ${filteredEntries.length} directory listings`}
        </p>
        {!isLoading && entries.length > 0 && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <MapPinOff size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p>
              These official department and facility listings do not have verified building coordinates yet, so they are searchable here but are not shown as map pins or walking destinations.
            </p>
          </div>
        )}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800" role="alert">
            The campus directory could not be loaded. Check the connection and try again.
          </div>
        )}

        {!isLoading && !error && filtered.length === 0 && filteredEntries.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-16 text-center">
            <SearchX size={36} className="text-navy-300" aria-hidden="true" />
            <p className="mt-4 text-base font-semibold text-navy-900">{t('dir.notFound.title')}</p>
            <p className="mt-1 max-w-sm text-sm text-navy-500">{t('dir.notFound.text')}</p>
          </div>
        ) : (
          <>
            {filtered.length > 0 && (
              <section className="mt-8" aria-labelledby="mapped-locations-heading">
                <h2 id="mapped-locations-heading" className="mb-4 text-lg font-bold text-navy-900">Mapped campus locations</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((location) => (
                    <article key={location.id} className="flex flex-col rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{getCategoryName(location.category, lang)}</p>
                          <h3 className="mt-2 text-base font-bold text-navy-900">{getLocationName(location, lang)}</h3>
                        </div>
                        <MapPin size={18} className="mt-1 shrink-0 text-teal-600" aria-hidden="true" />
                      </div>
                      <p className="mt-3 min-h-10 flex-1 text-sm leading-relaxed text-navy-600">
                        {getLocationDescription(location, lang) || 'No description has been added yet.'}
                      </p>
                      <p className="mt-4 text-xs text-navy-500">
                        {location.coordinatePrecision === 'campus_reference' ? 'Approximate campus reference' : `Verified ${location.locationType}`}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-navy-100 pt-4">
                        <Link to={`/location/${location.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900">
                          {t('dir.viewDetails')} <ChevronRight size={13} aria-hidden="true" />
                        </Link>
                        <Link to={`/explore?destination=${encodeURIComponent(location.slug)}`} className="text-xs font-semibold text-navy-700 hover:text-teal-700">
                          Show on map
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {filteredEntries.length > 0 && (
              <section className="mt-10" aria-labelledby="directory-listings-heading">
                <h2 id="directory-listings-heading" className="mb-4 text-lg font-bold text-navy-900">Departments and campus facilities</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredEntries.map((entry) => (
                    <article key={entry.id} className="flex flex-col rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{getCategoryName(entry.category, lang)}</p>
                          <h3 className="mt-2 text-base font-bold text-navy-900">
                            {(lang === 'kn' && entry.nameKn) || (lang === 'hi' && entry.nameHi) || entry.name}
                          </h3>
                        </div>
                        <Building2 size={18} className="mt-1 shrink-0 text-navy-400" aria-hidden="true" />
                      </div>
                      <p className="mt-3 min-h-10 flex-1 text-sm leading-relaxed text-navy-600">
                        {entry.description[lang] || entry.description.en || 'Listed by the official RNSIT website.'}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-amber-800">
                        <MapPinOff size={14} aria-hidden="true" /> Building location not verified
                      </p>
                      <a
                        href={entry.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 border-t border-navy-100 pt-4 text-xs font-semibold text-teal-700 hover:text-teal-900"
                      >
                        Source: {entry.sourceName} <ExternalLink size={13} aria-hidden="true" />
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <div className="mt-12 rounded-2xl bg-navy-900 px-6 py-8 text-center sm:px-10">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            {t('dir.cantFind')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-navy-200">
            {t('dir.cantFind.text')}
          </p>
          <Link
            to="/explore"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            <MapPin size={15} aria-hidden="true" /> {t('dir.openMap')}
          </Link>
        </div>
      </section>
    </>
  );
}
