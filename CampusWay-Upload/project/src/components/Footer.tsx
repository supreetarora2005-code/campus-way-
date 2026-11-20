import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-navy-100 bg-navy-900 text-navy-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 font-display text-xs font-bold text-white">
              RNS
            </span>
            <img
  src="/images/rnsit-logo.png"
  alt="RNSIT Logo"
  className="h-11 w-auto object-contain"
/>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400">
            {t('footer.explore')}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="transition hover:text-white" to="/">{t('nav.home')}</Link></li>
            <li><Link className="transition hover:text-white" to="/explore">{t('nav.explore')}</Link></li>
            <li><Link className="transition hover:text-white" to="/directory">{t('nav.directory')}</Link></li>
            <li><Link className="transition hover:text-white" to="/about">{t('nav.about')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400">
            {t('footer.about')}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-navy-200">{t('footer.aboutText')}</p>
          <p className="mt-3 text-xs leading-relaxed text-navy-300">{t('footer.note')}</p>
        </div>
      </div>

      <div className="border-t border-navy-800 py-5 text-center text-xs text-navy-300">
          © {new Date().getFullYear()} CampusWay · {t('footer.rights')}
      </div>
    </footer>
  );
}
