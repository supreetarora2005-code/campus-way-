import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 25%, #2dd4bf 0%, transparent 42%), radial-gradient(circle at 82% 78%, #4d77a4 0%, transparent 45%)',
        }}
        aria-hidden="true"
      />
      <div className="page-shell relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-2xl sm:p-10">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <Compass size={22} />
            </span>
            <h1 className="mt-5 text-center font-display text-2xl font-bold tracking-tight text-navy-900">
              {title}
            </h1>
            <p className="mt-2 text-center text-sm leading-relaxed text-navy-500">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </div>
          <p className="mt-6 text-center text-xs text-navy-300">
            <Link to="/" className="transition hover:text-teal-300">RNSIT CampusWay</Link> · Campus navigation
          </p>
        </div>
      </div>
    </section>
  );
}
