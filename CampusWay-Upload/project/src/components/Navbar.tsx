import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { LANGUAGES } from '@/i18n/translations';
import { RNSIT } from '@/i18n/translations';

const NAV_ITEMS = [
  { to: '/', key: 'nav.home' },
  { to: '/explore', key: 'nav.explore' },
  { to: '/directory', key: 'nav.directory' },
  { to: '/about', key: 'nav.about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-teal-500/10 text-teal-700'
        : 'text-navy-700 hover:bg-navy-50 hover:text-navy-900'
    }`;

  const langSwitcher = (compact: boolean) => (
    <div
      className={`flex items-center gap-0.5 rounded-full bg-navy-50 p-1 ${
        compact ? 'mt-3 w-fit' : ''
      }`}
      role="group"
      aria-label="Language"
    >
      <Globe size={14} className="ml-1.5 text-navy-500" />
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
            lang === l.code
              ? 'bg-navy-900 text-white shadow-sm'
              : 'text-navy-600 hover:text-navy-900'
          }`}
          aria-pressed={lang === l.code}
        >
          {l.native}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
  src="/images/rnsit-logo.png"
  alt="RNSIT Logo"
  className="h-11 w-auto object-contain"
/>
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-navy-900">
              RNSIT <span className="text-teal-600">CampusWay</span>
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-wide text-navy-400">
              {RNSIT.fullName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {langSwitcher(false)}
          <button
            onClick={() => navigate('/explore')}
            className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-teal-500/30 transition hover:bg-teal-600 hover:shadow-md"
          >
            {t('nav.find')}
          </button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy-800 transition hover:bg-navy-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-navy-100 bg-white px-4 pb-4 pt-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium ${
                  isActive ? 'bg-teal-500/10 text-teal-700' : 'text-navy-700 hover:bg-navy-50'
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              navigate('/explore');
            }}
            className="mt-2 w-full rounded-lg bg-teal-500 px-4 py-3 text-sm font-semibold text-white"
          >
            {t('nav.find')}
          </button>
          {langSwitcher(true)}
        </nav>
      )}
    </header>
  );
}
