import { Link } from 'react-router-dom';
import {
  Target,
  Users,
  MapPinned,
  Accessibility,
  Clock,
  CheckCircle2,
} from 'lucide-react';

const BENEFITS = [
  {
    icon: Clock,
    title: 'Save Time Every Day',
    text: 'Find verified campus records from any device. More detailed building information can be added as it is checked.'
  },
  {
    icon: Users,
    title: 'Welcome for Visitors',
    text: 'Visitors can review a location description, its coordinate precision and its published source before choosing it.'
  },
  {
    icon: Accessibility,
    title: 'Accessible for Everyone',
    text: 'Clear categories and location details make it easy for every student and staff member to get around.',
  },
  {
    icon: MapPinned,
    title: 'One Source of Truth',
    text: 'Verified locations and their descriptions come from one shared campus directory.'
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 25%, #2dd4bf 0%, transparent 40%), radial-gradient(circle at 15% 80%, #4d77a4 0%, transparent 45%)',
          }}
          aria-hidden="true"
        />
        <div className="page-shell relative py-16 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 ring-1 ring-teal-400/30">
            <Target size={13} /> About the Project
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Find Verified Locations Across Campus
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-navy-100 sm:text-lg">
            CampusWay is a campus directory and interactive map for RNSIT. Only locations with verified coordinates and a published source appear, and precise walking directions are enabled as routeable destinations are verified.
          </p>
        </div>
      </section>

      {/* Purpose */}
      <section className="page-shell py-14 lg:py-18">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Our Purpose</h2>
            <p className="mt-4 leading-relaxed text-navy-600">
              Large campuses can be confusing — especially during admissions, orientation
              week and examination days. CampusWay was created to remove that confusion with
              a single, easy-to-use map and directory that works on any device.
            </p>
            <p className="mt-4 leading-relaxed text-navy-600">
              CampusWay reads verified location records from the connected campus database. Approximate campus references are labeled clearly, and walking directions remain unavailable until precise building or entrance coordinates are verified.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Icon size={18} />
                </span>
                <h3 className="mt-3 text-sm font-bold text-navy-900">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-navy-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="bg-navy-50/60 py-14 lg:py-18">
        <div className="page-shell">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">What CampusWay Includes</h2>
            <p className="mt-3 text-sm text-navy-600 sm:text-base">
              Everything works together as one complete navigation experience.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Interactive Campus Map',
                text: 'OpenStreetMap tiles show verified campus coordinates; select a pin to see its description and source.'
              },
              {
                title: 'Searchable Directory',
                text: 'Search verified location records and filter them by active campus categories.'
              },
              {
                title: 'Route Planning',
                text: 'Walking directions are requested from your location only for precise, verified, routeable destinations.'
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
              >
                <CheckCircle2 size={20} className="text-teal-600" />
                <h3 className="mt-3 text-base font-bold text-navy-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CampusWay project callout */}
      <section className="page-shell py-14 lg:py-18">
        <div className="flex flex-col gap-6 rounded-3xl bg-navy-900 p-8 shadow-card sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">CampusWay</span>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
              Built to make campus discovery simpler
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-200 sm:text-base">
              CampusWay brings a searchable campus directory and interactive map together, with clear sources and a focus on accurate location information.
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            <MapPinned size={16} /> Explore CampusWay
          </Link>
        </div>
      </section>
    </>
  );
}
