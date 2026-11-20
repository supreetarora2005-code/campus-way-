import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, BookOpen, UtensilsCrossed, GraduationCap, ArrowRight, Compass, Quote } from 'lucide-react';
import MapPlaceholder from '@/components/MapPlaceholder';
import { useLanguage } from '@/i18n/LanguageContext';
import { CAMPUS_LOCATIONS, CATEGORIES, type CampusLocation } from '@/data/campus';
import { RNSIT } from '@/i18n/translations';

const QUICK_LINKS: { key: string; query: string; icon: typeof Search }[] = [
  { key: 'quick.library', query: 'library', icon: BookOpen },
  { key: 'quick.canteen', query: 'canteen', icon: UtensilsCrossed },
  { key: 'quick.labs', query: 'labs', icon: GraduationCap },
  { key: 'quick.departments', query: 'department', icon: Compass },
];

const STATS = [
  { value: '12+', key: 'stats.locations' },
  { value: '14', key: 'stats.departments' },
  { value: '5', key: 'stats.categories' },
  { value: '24×7', key: 'stats.available' },
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/directory?q=${encodeURIComponent(query.trim())}` : '/directory');
  };

  const goToExploreWith = (loc: CampusLocation) => navigate(`/explore?destination=${loc.id}`);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 20%, #2dd4bf 0%, transparent 42%), radial-gradient(circle at 85% 75%, #4d77a4 0%, transparent 45%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
          aria-hidden="true"
        />
        <div className="page-shell relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 ring-1 ring-teal-400/30">
              <Compass size={13} /> {t('hero.badge')}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t('hero.title1')} <span className="text-teal-400">{t('hero.title2')}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">
              {t('hero.subtitle')}
            </p>

            <form onSubmit={submitSearch} className="mt-8 max-w-xl">
              <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-navy-950/30">
                <MapPin size={20} className="ml-3 shrink-0 text-teal-600" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('hero.searchPlaceholder')}
                  className="w-full bg-transparent py-3 text-sm text-navy-900 placeholder-navy-400 outline-none"
                  aria-label={t('hero.search')}
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
                >
                  {t('hero.search')}
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {QUICK_LINKS.map(({ key, query: q, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => navigate(`/directory?q=${encodeURIComponent(q)}`)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-navy-100 ring-1 ring-white/15 transition hover:bg-white/20 hover:text-white"
                >
                  <Icon size={12} /> {t(key)}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-xl"
              >
                <Navigation size={16} /> {t('hero.explore')}
              </Link>
              <Link
                to="/directory"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10"
              >
                {t('hero.browse')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Map preview */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-navy-950/50">
              <div className="h-[320px] sm:h-[420px]">
                <MapPlaceholder onSelectLocation={goToExploreWith} />
              </div>
            </div>
            <div className="absolute -bottom-5 left-6 hidden rounded-2xl bg-white px-5 py-3.5 shadow-card-hover sm:block">
              <p className="text-xs font-medium text-navy-500">{t('hero.nearest')}</p>
              <p className="text-sm font-bold text-navy-900">{t('cat.Canteen')} · 2 {t('explore.walk')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-navy-100 bg-navy-50/60">
        <div className="page-shell grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.key} className="text-center">
              <p className="font-display text-3xl font-bold text-navy-900">{s.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-navy-500">{t(s.key)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="page-shell py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">{t('section.everything.title')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-navy-600 sm:text-base">
            {t('section.everything.sub')}
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to={`/directory?category=${encodeURIComponent(c)}`}
              className="group rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-card transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-card-hover"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-500 group-hover:text-white">
                <MapPin size={20} />
              </span>
              <p className="mt-4 text-sm font-semibold text-navy-900">{t(`cat.${c}`)}</p>
              <p className="mt-1 text-xs text-navy-500">
                {CAMPUS_LOCATIONS.filter((l) => l.category === c).length} {t('section.locations')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-navy-50/60 py-16 lg:py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">{t('section.how.title')}</h2>
            <p className="mt-3 text-sm text-navy-600 sm:text-base">{t('section.how.sub')}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl border border-navy-100 bg-white p-7 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-bold text-teal-400">
                  {n}
                </span>
                <h3 className="mt-4 text-base font-bold text-navy-900">{t(`step${n}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{t(`step${n}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / CTA */}
      <section className="page-shell py-16 lg:py-20">
        <div className="overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 sm:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <Quote size={28} className="mx-auto text-teal-400" />
            <p className="mt-5 font-display text-xl font-semibold leading-relaxed text-white sm:text-2xl">
              {t('section.testimonial')}
            </p>
            <p className="mt-4 text-sm font-medium text-teal-300">{t('section.testimonial.author')}</p>
            <Link
              to="/explore"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              <Search size={16} /> {t('section.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* RNSIT note */}
      <section className="page-shell pb-16">
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-navy-500">
          {RNSIT.fullName} · Est. {RNSIT.established} · {RNSIT.contact.address}
        </p>
      </section>
    </>
  );
}
