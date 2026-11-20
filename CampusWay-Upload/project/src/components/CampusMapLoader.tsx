import { lazy, Suspense } from 'react';
import type { CampusMapProps } from './CampusMap';

const CampusMap = lazy(() => import('./CampusMap'));

export default function CampusMapLoader(props: CampusMapProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full min-h-64 w-full items-center justify-center bg-navy-50 text-sm text-navy-500" role="status">
          Loading interactive map…
        </div>
      }
    >
      <CampusMap {...props} />
    </Suspense>
  );
}
