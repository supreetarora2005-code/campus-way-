import { useEffect, useRef, useState } from 'react';
import { BookOpen, Building2, ChevronRight, ExternalLink, MapPinOff, X } from 'lucide-react';
import type { Language } from '@/i18n/translations';
import { getCategoryName, type CampusDirectoryEntry } from '@/data/verified-campus';

interface DirectoryEntryCardProps {
  entry: CampusDirectoryEntry;
  language: Language;
}

export default function DirectoryEntryCard({ entry, language }: DirectoryEntryCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const name =
    (language === 'kn' && entry.nameKn) ||
    (language === 'hi' && entry.nameHi) ||
    entry.name;
  const description =
    entry.description[language] || entry.description.en || 'Listed by the official RNSIT website.';
  const hasImage = Boolean(entry.imageUrl) && !imageFailed;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <>
      <article className="group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
        <button
          type="button"
          onClick={() => {
            setImageFailed(false);
            setIsOpen(true);
          }}
          aria-label={`View details for ${name}`}
          className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-navy-100 via-teal-50 to-navy-200">
            {hasImage ? (
              <img
                src={entry.imageUrl!}
                alt={`${name} at RNSIT`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-navy-500" aria-hidden="true">
                {entry.category.slug === 'library' ? <BookOpen size={34} strokeWidth={1.5} /> : <Building2 size={34} strokeWidth={1.5} />}
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-800 shadow-sm">
              {getCategoryName(entry.category, language)}
            </span>
            {hasImage && (
              <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/75 px-2.5 py-1 text-[10px] font-medium text-white">
                RNSIT photo
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold text-navy-900">{name}</h3>
            <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-navy-600">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-teal-700 transition group-hover:text-teal-900">
              View details <ChevronRight size={14} aria-hidden="true" />
            </span>
          </div>
        </button>
      </article>

      <dialog
        ref={dialogRef}
        aria-labelledby={`directory-entry-${entry.id}-title`}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setIsOpen(false);
        }}
        className="m-auto max-h-[90vh] w-[min(44rem,calc(100vw-2rem))] overflow-y-auto rounded-3xl bg-white p-0 text-navy-900 shadow-2xl backdrop:bg-navy-950/70"
      >
        <div className="relative">
          {hasImage ? (
            <img
              src={entry.imageUrl ?? undefined}
              alt={`${name} at RNSIT`}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="h-40 w-full bg-navy-100 object-cover sm:h-56"
            />
          ) : (
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-navy-100 via-teal-50 to-navy-200 text-navy-500 sm:h-36" aria-hidden="true">
              {imageFailed ? <Building2 size={40} strokeWidth={1.5} /> : <BookOpen size={40} strokeWidth={1.5} />}
            </div>
          )}
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close details"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-navy-800 shadow transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{getCategoryName(entry.category, language)}</p>
          <h2 id={`directory-entry-${entry.id}-title`} className="mt-2 font-display text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
            {name}
          </h2>
          <p className="mt-4 text-sm leading-7 text-navy-700">{description}</p>
          {!hasImage && (
            <p className="mt-4 text-sm text-navy-500">No official photo is available for this listing right now.</p>
          )}
          <p className="mt-5 flex items-start gap-2 rounded-xl bg-navy-50 px-4 py-3 text-xs leading-relaxed text-navy-600">
            <MapPinOff size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
            Exact building coordinates can be added when campus map data is available.
          </p>
          <a
            href={entry.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Visit {entry.sourceName} <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </dialog>
    </>
  );
}
