import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, LogIn, UserPlus, UserRound, LogOut } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { LANGUAGES, RNSIT } from '@/i18n/translations';
import { useAuth } from '@/auth/AuthContext';

const NAV_ITEMS = [
  { to: '/', key: 'nav.home' },
  { to: '/explore', key: 'nav.explore' },
  { to: '/directory', key: 'nav.directory' },
  { to: '/about', key: 'nav.about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen && !open) return;
    const onClick = (event: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, open]);

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

  const initials = (profile?.full_name?.trim()?.[0] ?? user?.email?.[0] ?? 'U').toUpperCase();

  const accountMenu = (compact: boolean) => (
    <div className={compact ? 'mt-3' : 'relative'} ref={compact ? undefined : menuRef}>
      {compact ? (
        <>
          <p className="px-4 pt-2 text-xs font-semibold uppercase tracking-wide text-navy-400">Account</p>
          <Link to="/profile" onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-sm font-medium text-navy-700 hover:bg-navy-50">
            {profile?.full_name || 'Your profile'}
          </Link>
          <button
            onClick={async () => {
              setOpen(false);
              await signOut();
              navigate('/');
            }}
            className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-navy-700 hover:bg-navy-50"
          >
            <LogOut size={15} /> Sign out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-teal-400 ring-2 ring-teal-500/40 transition hover:ring-teal-500"
            aria-label="Account menu"
            aria-expanded={menuOpen}
          >
            {initials}
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-xl">
              <div className="border-b border-navy-100 px-4 py-3">
                <p className="truncate text-sm font-bold text-navy-900">{profile?.full_name || 'CampusWay user'}</p>
                <p className="truncate text-xs text-navy-500">{user?.email}</p>
              </div>
              <div className="p-1.5">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
                >
                  <UserRound size={15} /> Your profile
                </Link>
                <button
                  onClick={async () => {
                    setMenuOpen(false);
                    await signOut();
                    navigate('/');
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-700 transition hover:bg-navy-50"
                >
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src="/images/rnsit-logo.png"
            alt="RNSIT Logo"
            className="h-8 w-auto shrink-0 object-contain sm:h-11"
          />
          <span className="hidden min-w-0 leading-tight sm:block">
            <span               className="block truncate text-base font-bold tracking-tight text-navy-900 sm:text-lg">
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
          {user ? (
            accountMenu(false)
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-navy-800 transition hover:bg-navy-50"
              >
                <LogIn size={15} /> Log In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-teal-500/30 transition hover:bg-teal-600 hover:shadow-md"
              >
                <UserPlus size={15} /> Sign Up
              </Link>
            </>
          )}
          <button
            onClick={() => navigate('/explore')}
            className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-800"
          >
            {t('nav.find')}
          </button>
        </div>

        <button
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-navy-800 transition hover:bg-navy-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-navy-100 bg-white px-4 pb-4 pt-2 md:hidden">
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

          {user ? (
            accountMenu(true)
          ) : (
            <div className="mt-3 flex gap-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy-200 px-4 py-3 text-sm font-semibold text-navy-800"
              >
                <LogIn size={15} /> Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-teal-500 px-4 py-3 text-sm font-semibold text-white"
              >
                <UserPlus size={15} /> Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={() => {
              setOpen(false);
              navigate('/explore');
            }}
            className="mt-2 w-full rounded-lg bg-navy-900 px-4 py-3 text-sm font-semibold text-white"
          >
            {t('nav.find')}
          </button>
          {langSwitcher(true)}
        </nav>
      )}
    </header>
  );
}
