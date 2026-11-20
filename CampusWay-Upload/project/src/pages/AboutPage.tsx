import { useState } from 'react';
import {
  Target,
  Users,
  MapPinned,
  Accessibility,
  Clock,
  CheckCircle2,
  Send,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { RNSIT } from '@/i18n/translations';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    const subject = encodeURIComponent('CampusWay location feedback');
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nReply email: ${email.trim()}\n\n${message.trim()}`
    );
    window.location.href = `mailto:${RNSIT.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

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

      {/* Contact / feedback */}
      <section className="page-shell py-14 lg:py-18">
        <div className="overflow-hidden rounded-3xl border border-navy-100 shadow-card">
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            <div className="bg-navy-900 p-8 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-white">
                Contact & Feedback
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-200">
                Have a correction for a verified location or an idea to improve CampusWay? Use the form to prepare an email to RNSIT; it is submitted only when you send it from your email app.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-navy-100">
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <Mail size={15} className="text-teal-400" />
                  </span>
                  <a href={`mailto:${RNSIT.contact.email}`} className="transition hover:text-white">{RNSIT.contact.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <Phone size={15} className="text-teal-400" />
                  </span>
                  <a href={`tel:${RNSIT.contact.phone.replace(/[^+\d]/g, '')}`} className="transition hover:text-white">{RNSIT.contact.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <MapPin size={15} className="text-teal-400" />
                  </span>
                  {RNSIT.contact.address}
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 sm:p-10">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
                    <CheckCircle2 size={28} className="text-teal-600" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy-900">Thank you, {name.trim()}!</h3>
                  <p className="mt-2 max-w-xs text-sm text-navy-600" role="status">
                    Your email app should open with a ready-to-send draft. Send it there to submit your feedback.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-6 text-sm font-semibold text-teal-700 underline-offset-4 transition hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submitFeedback} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fb-name" className="text-sm font-semibold text-navy-900">
                        Name
                      </label>
                      <input
                        id="fb-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="input-field mt-1.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="fb-email" className="text-sm font-semibold text-navy-900">
                        Email
                      </label>
                      <input
                        id="fb-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@college.edu"
                        className="input-field mt-1.5"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fb-message" className="text-sm font-semibold text-navy-900">
                      Message
                    </label>
                    <textarea
                      id="fb-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share feedback, a correction, or an idea…"
                      rows={5}
                      className="input-field mt-1.5 resize-none"
                    />
                  </div>
                  {error && (
                    <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 sm:w-auto sm:px-8"
                  >
                    <Send size={15} /> Send Feedback
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
