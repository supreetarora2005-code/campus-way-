import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Send, X, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { CAMPUS_LOCATIONS, locationKeywords, type CampusLocation } from '@/data/campus';

interface Message {
  role: 'bot' | 'user';
  text: string;
  location?: CampusLocation;
}

const SUGGESTIONS: Record<'en' | 'kn' | 'hi', string[]> = {
  en: ['Where is the library?', 'Canteen location', 'ECE department', 'Samsung lab'],
  kn: ['ಗ್ರಂಥಾಲಯ ಎಲ್ಲಿದೆ?', 'ಅಪ್ಪಣೆ ಎಲ್ಲಿದೆ?', 'ಇಸಿಇ ಇಲಾಖೆ', 'ಸ್ಯಾಮ್‌ಸಂಗ್ ಪ್ರಯೋಗಾಲಯ'],
  hi: ['पुस्तकालय कहां है?', 'कैंटीन कहां है?', 'ईसीई विभाग', 'सैमसंग लैब'],
};

const SYN: Record<string, string[]> = {
  library: ['library', 'ಗ್ರಂಥಾಲಯ', 'पुस्तकालय', 'lib', 'books'],
  canteen: ['canteen', 'ಅಪ್ಪಣೆ', 'कैंटीन', 'food', 'eat', 'cafe', 'kiosk', 'juice'],
  ece: ['ece', 'electronics', 'ಇಸಿಇ', 'ईसीई', 'ec ', 'vlsi'],
  cse: ['cse', 'computer science', 'ಸಿಎಸ್‌ಇ', 'सीएसई', 'cs ', 'aiml', 'ai & ml', 'data science', 'cyber'],
  eee: ['eee', 'electrical', 'ಇಇಇ', 'ईईई', 'ee '],
  mech: ['mech', 'mechanical', 'ಮೆಕ್ಯಾನಿಕಲ್', 'मैकेनिकल', 'civil', 'ಸಿವಿಲ್', 'सिविल'],
  mba: ['mba', 'ಎಂಬಿಎ', 'एमबीए', 'mca', 'ಎಂಸಿಎ', 'एमसीए', 'management', 'csbs'],
  samsung: ['samsung', 'ಸ್ಯಾಮ್‌ಸಂಗ್', 'सैमसंग', 'innovation', 'sic'],
  labs: ['lab', 'labs', 'ಪ್ರಯೋಗಾಲಯ', 'लैब', 'research'],
  sports: ['sports', 'ground', 'ಕ್ರೀಡಾ', 'खेल', 'gym', 'cricket', 'play'],
  admin: ['admin', 'office', 'principal', 'admission', 'exam cell', 'accounts', 'ಆಡಳಿತ', 'प्रशासन'],
};

function findLocation(query: string): CampusLocation | undefined {
  const q = query.toLowerCase();
  const direct = CAMPUS_LOCATIONS.find(
    (l) => locationKeywords(l).split(/[,/]/).some((kw) => kw.trim() && q.includes(kw.trim())) ||
      CAMPUS_LOCATIONS.some((x) => x.id === l.id && q.includes(x.name.toLowerCase()))
  );
  if (direct) return direct;

  for (const words of Object.values(SYN)) {
    if (words.some((w) => q.includes(w))) {
      const key = Object.keys(SYN).find((k) => SYN[k] === words)!;
      const target = SYN_MATCH[key];
      if (target) return CAMPUS_LOCATIONS.find((l) => target.includes(l.id));
    }
  }

  return CAMPUS_LOCATIONS.find((l) => {
    const kw = locationKeywords(l);
    return q.split(/\s+/).some((word) => word.length > 3 && kw.includes(word));
  });
}

const SYN_MATCH: Record<string, string[]> = {
  library: ['central-library'],
  canteen: ['main-canteen', 'food-court'],
  ece: ['ece-block'],
  cse: ['cse-block'],
  eee: ['eee-block'],
  mech: ['mech-civil-block'],
  mba: ['mba-mca-block'],
  samsung: ['samsung-ic'],
  labs: ['research-labs', 'samsung-ic'],
  sports: ['sports-ground'],
  admin: ['admin-block'],
};

export default function AiAssistant() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'bot', text: t('ai.greeting') }]);
  }, [lang, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  const ask = (raw: string) => {
    const query = raw.trim();
    if (!query) return;
    setMessages((m) => [...m, { role: 'user', text: query }]);
    setInput('');
    setTyping(true);
    window.setTimeout(() => {
      const loc = findLocation(query);
      setTyping(false);
      if (loc) {
        const name = lang === 'kn' && loc.nameKn ? loc.nameKn : lang === 'hi' && loc.nameHi ? loc.nameHi : loc.name;
        setMessages((m) => [
          ...m,
          {
            role: 'bot',
            location: loc,
            text: `${name} ${t('ai.whereIs')} — approx. ${Math.round(2 + loc.mapX / 12)} ${t('ai.walkTime')}.`,
          },
        ]);
      } else {
        setMessages((m) => [...m, { role: 'bot', text: t('ai.notFound') }]);
      }
    }, 600);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-white shadow-xl shadow-teal-500/40 transition hover:scale-105 hover:bg-teal-600"
          aria-label={t('ai.title')}
        >
          <Sparkles size={22} />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-4 right-4 z-50 flex h-[520px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 bg-navy-900 px-4 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
              <Bot size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">{t('ai.title')}</p>
              <p className="truncate text-xs text-navy-200">{t('ai.subtitle')}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-navy-200 transition hover:bg-white/10 hover:text-white"
              aria-label="Close assistant"
            >
              <X size={17} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-navy-50/60 px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-teal-500 text-white'
                      : 'rounded-bl-md border border-navy-100 bg-white text-navy-800'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.location && (
                    <div className="mt-2.5 flex flex-col gap-1.5 border-t border-navy-100 pt-2.5">
                      <Link
                        to={`/location/${m.location.id}`}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:underline"
                      >
                        <MapPin size={12} /> {t('ai.viewDetails')}
                      </Link>
                      <button
                        onClick={() => {
                          setOpen(false);
                          navigate(`/explore?destination=${m.location!.id}`);
                        }}
                        className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-teal-700 hover:underline"
                      >
                        <Sparkles size={12} /> {t('ai.navigateTo')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-navy-100 bg-white px-4 py-3">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-500 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-500 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-500 [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="flex gap-1.5 overflow-x-auto border-t border-navy-100 bg-white px-3 py-2">
            {SUGGESTIONS[lang].map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="shrink-0 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700 ring-1 ring-teal-200 transition hover:bg-teal-100"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 border-t border-navy-100 bg-white p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('ai.placeholder')}
              className="flex-1 rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
            />
            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white transition hover:bg-teal-600"
              aria-label={t('ai.send') ?? 'Send'}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
