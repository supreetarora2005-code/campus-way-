import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Compass, ExternalLink, MapPin, Navigation } from 'lucide-react';
import CampusMap from '@/components/CampusMapLoader';
import { getCategoryName, getLocationDescription, getLocationName, useCampusDirectory } from '@/data/verified-campus';
import { useLanguage } from '@/i18n/LanguageContext';

export default function LocationDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const { locations, isLoading, error } = useCampusDirectory();
  const location = locations.find((entry) => entry.slug === id || entry.id === id);

  if (isLoading) {
    return <div className="page-shell py-20 text-center text-sm text-navy-600" role="status">Loading verified location…</div>;
  }

  if (error) {
    return (
      <div className="page-shell flex flex-col items-center py-24 text-center">
        <Compass size={40} className="text-navy-300" aria-hidden="true" />
        <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">Location unavailable</h1>
        <p className="mt-2 max-w-sm text-sm text-navy-600">The campus directory could not be reached. Please try again.</p>
        <Link to="/directory" className="mt-6 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600">Back to Directory</Link>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="page-shell flex flex-col items-center py-24 text-center">
        <Compass size={40} className="text-navy-300" aria-hidden="true" />
        <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">{t('det.notFound')}</h1>
        <p className="mt-2 max-w-sm text-sm text-navy-600">{t('det.notFound.text')}</p>
        <Link to="/directory" className="mt-6 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600">{t('det.backToDirectory')}</Link>
      </div>
    );
  }

  const name = getLocationName(location, lang);
  const description = getLocationDescription(location, lang);
  const related = locations
    .filter((entry) => entry.category.slug === location.category.slug && entry.id !== location.id)
    .slice(0, 3);

  return (
    <>
      <div className="border-b border-navy-100 bg-navy-50/60">
        <div className="page-shell flex items-center gap-2 py-4 text-xs text-navy-500">
          <Link to="/" className="transition hover:text-teal-700">{t('nav.home')}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/directory" className="transition hover:text-teal-700">{t('nav.directory')}</Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-navy-800">{name}</span>
        </div>
      </div>

      <section className="page-shell py-10 lg:py-14">
        <Link to="/directory" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 transition hover:text-teal-700">
          <ArrowLeft size={15} aria-hidden="true" /> {t('det.back')}
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
              <MapPin size={12} aria-hidden="true" /> {getCategoryName(location.category, lang)}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">{name}</h1>
            <p className="mt-4 leading-relaxed text-navy-600">
              {description || 'No description has been added to this verified location yet.'}
            </p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-navy-50 px-4 py-3">
                <dt className="text-xs font-medium text-navy-500">Location type</dt>
                <dd className="mt-1 text-sm font-semibold capitalize text-navy-800">{location.locationType.replace('_', ' ')}</dd>
              </div>
              <div className="rounded-xl bg-navy-50 px-4 py-3">
                <dt className="text-xs font-medium text-navy-500">Coordinate detail</dt>
                <dd className="mt-1 text-sm font-semibold text-navy-800">
                  {location.coordinatePrecision === 'campus_reference' ? 'Approximate campus reference' : location.coordinatePrecision.replace('_', ' ')}
                </dd>
              </div>
            </dl>

            {location.coordinatePrecision === 'campus_reference' && (
              <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
                This marker identifies the campus area only; it is not a building entrance and cannot be used for pedestrian turn-by-turn directions.
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to={`/explore?destination=${encodeURIComponent(location.slug)}`} className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition hover:-translate-y-0.5 hover:bg-teal-600">
                <Navigation size={16} aria-hidden="true" /> {t('dir.openMap')}
              </Link>
              <Link to="/directory" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-navy-800 ring-1 ring-navy-200 transition hover:bg-navy-50">
                <MapPin size={16} aria-hidden="true" /> {t('det.allLocations')}
              </Link>
            </div>

            <section className="mt-10 rounded-2xl border border-navy-100 bg-white p-5 shadow-card" aria-labelledby="location-source-title">
              <h2 id="location-source-title" className="text-sm font-bold uppercase tracking-wider text-navy-500">Verification source</h2>
              <p className="mt-2 text-sm text-navy-800">{location.sourceName || 'Source details not provided'}</p>
              {location.verifiedAt && (
                <p className="mt-1 text-xs text-navy-500">Verified {new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }).format(new Date(location.verifiedAt))}</p>
              )}
              {location.sourceUrl && (
                <a href={location.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 underline underline-offset-2">
                  Open source <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </section>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-navy-500">{t('det.map')}</h2>
            <div className="h-[360px] overflow-hidden rounded-2xl border border-navy-100 shadow-card sm:h-[480px]">
              <CampusMap locations={locations} highlightedId={location.id} />
            </div>
            <p className="mt-3 text-xs text-navy-500">Map tiles © OpenStreetMap contributors.</p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-14 border-t border-navy-100 pt-10" aria-labelledby="related-locations-title">
            <h2 id="related-locations-title" className="section-title text-xl sm:text-2xl">{t('det.more')} {getCategoryName(location.category, lang)}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((entry) => (
                <Link key={entry.id} to={`/location/${entry.slug}`} className="group rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
                  <p className="text-sm font-bold text-navy-900 group-hover:text-teal-700">{getLocationName(entry, lang)}</p>
                  <p className="mt-2 text-xs leading-relaxed text-navy-500">{getLocationDescription(entry, lang) || getCategoryName(entry.category, lang)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  );
}
