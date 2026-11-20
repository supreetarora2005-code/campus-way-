import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Search, Route } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CAMPUS_LOCATIONS, type CampusLocation } from '@/data/campus';

interface MapPlaceholderProps {
  highlightedId?: string | null;
  onSelectLocation?: (location: CampusLocation) => void;
}

const LANDMARKS: Record<string, { label: Record<string, string>; x: number; y: number }[]> = {
  en: [
    { label: { en: 'Main Gate', kn: 'ಮುಖ್ಯ ದ್ವಾರ', hi: 'मुख्य गेट' }, x: 8, y: 88 },
    { label: { en: 'Sports Ground', kn: 'ಕ್ರೀಡಾ ಮೈದಾನ', hi: 'खेल मैदान' }, x: 24, y: 92 },
    { label: { en: 'Parking', kn: 'ಪಾರ್ಕಿಂಗ್', hi: 'पार्किंग' }, x: 88, y: 30 },
  ],
};

export default function MapPlaceholder({
  highlightedId,
  onSelectLocation,
}: MapPlaceholderProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const activeId = highlightedId ?? hoveredId;
  const active = CAMPUS_LOCATIONS.find((l) => l.id === activeId);
  const highlighted = highlightedId
    ? CAMPUS_LOCATIONS.find((l) => l.id === highlightedId)
    : undefined;
  const landmarks = LANDMARKS.en;

  const locName = (loc: CampusLocation) =>
    lang === 'kn' && loc.nameKn ? loc.nameKn : lang === 'hi' && loc.nameHi ? loc.nameHi : loc.name;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#eef4f3]">
      {/* Grid + roads */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="cw-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d8e6e3" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cw-grid)" />
        <path d="M 0 78% L 100% 46%" stroke="#cfdedb" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M 6% 100% L 34% 0" stroke="#cfdedb" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M 55% 100% L 72% 0" stroke="#d8e6e3" strokeWidth="10" fill="none" strokeLinecap="round" />
        <ellipse cx="88%" cy="88%" rx="9%" ry="8%" fill="#d3e8e2" />
        <ellipse cx="9%" cy="12%" rx="7%" ry="9%" fill="#d3e8e2" />
      </svg>

      {/* Landmarks */}
      {landmarks.map((l) => (
        <span
          key={l.label.en}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-navy-600 shadow-sm ring-1 ring-navy-100"
          style={{ left: `${l.x}%`, top: `${l.y}%` }}
        >
          {l.label[lang] ?? l.label.en}
        </span>
      ))}

      {/* Route line from Main Gate to destination */}
      {highlighted && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <line
            x1="8%" y1="88%" x2={`${highlighted.mapX}%`} y2={`${highlighted.mapY}%`}
            stroke="#0d9488" strokeWidth="3.5" strokeDasharray="9 7" strokeLinecap="round"
          />
        </svg>
      )}

      {/* Location pins */}
      {CAMPUS_LOCATIONS.map((loc) => {
        const isActive = loc.id === activeId;
        return (
          <button
            key={loc.id}
            type="button"
            className="absolute -translate-x-1/2 -translate-y-full focus:outline-none"
            style={{ left: `${loc.mapX}%`, top: `${loc.mapY}%` }}
            onMouseEnter={() => setHoveredId(loc.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() =>
              onSelectLocation ? onSelectLocation(loc) : navigate(`/location/${loc.id}`)
            }
            aria-label={loc.name}
          >
            <span
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold shadow-md ring-1 transition-all ${
                isActive
                  ? 'scale-110 bg-teal-500 text-white ring-teal-500'
                  : 'bg-white text-navy-800 ring-navy-100 hover:bg-teal-50 hover:text-teal-700'
              }`}
            >
              <MapPin size={12} className={isActive ? 'fill-white/30' : 'text-teal-600'} />
              {locName(loc)}
            </span>
          </button>
        );
      })}

      {/* Active tooltip */}
      {active && !highlightedId && (
        <div
          className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 rounded-xl border border-navy-100 bg-white p-3.5 shadow-lg"
          style={{
            left: `${active.mapX}%`,
            top: `${active.mapY}%`,
            transform: 'translate(-50%, 12px)',
          }}
        >
          <p className="text-sm font-semibold text-navy-900">{locName(active)}</p>
          <p className="mt-1 text-xs text-navy-600">
            {t(`cat.${active.category}`)} · {active.hours}
          </p>
        </div>
      )}

      {/* Highlighted route card */}
      {highlighted && (
        <div className="absolute bottom-4 left-1/2 z-10 w-[92%] max-w-sm -translate-x-1/2 rounded-xl border border-navy-100 bg-white p-4 shadow-lg">
          <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
            <Route size={15} className="text-teal-600" />
            {t('explore.route')}: {t('explore.start').replace(/ \(.*\)/, '')} → {locName(highlighted)}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-navy-600">
            {t('explore.tapWalkPrefix')}
            {' '}
            <span className="font-semibold text-teal-700">{Math.round(2 + highlighted.mapX / 12)}</span>{' '}
            {t('explore.walk')} · {t('explore.follow')}
          </p>
        </div>
      )}

      {/* Compass */}
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-navy-100">
        <Navigation size={16} className="text-teal-600" />
      </div>

      {/* Hint chip */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 py-2 pl-3.5 pr-4 text-xs font-medium text-navy-700 shadow ring-1 ring-navy-100">
        <Search size={13} className="text-teal-600" />
        {t('explore.tapPin')}
      </div>
    </div>
  );
}
