import useSWR from 'swr';
import { supabase } from '@/lib/supabase';
import { translate, type Language } from '@/i18n/translations';

export interface CampusCategory {
  slug: string;
  name: string;
  sortOrder: number;
}

export type CoordinatePrecision =
  | 'entrance'
  | 'building'
  | 'facility'
  | 'campus_reference'
  | 'approximate';

export interface VerifiedCampusLocation {
  id: string;
  slug: string;
  name: string;
  nameKn: string | null;
  nameHi: string | null;
  category: CampusCategory;
  locationType: 'campus' | 'building' | 'facility' | 'entrance';
  description: Record<string, string>;
  latitude: number;
  longitude: number;
  coordinatePrecision: CoordinatePrecision;
  verificationStatus: 'verified';
  sourceName: string | null;
  sourceUrl: string | null;
  verifiedAt: string | null;
  isRouteable: boolean;
}

export interface CampusDirectoryEntry {
  id: string;
  slug: string;
  name: string;
  nameKn: string | null;
  nameHi: string | null;
  category: CampusCategory;
  description: Record<string, string>;
  imageUrl: string | null;
  sourceName: string;
  sourceUrl: string;
  verifiedAt: string;
}

interface CampusCategoryRow {
  slug: string;
  name: string;
  sort_order: number;
}

interface CampusLocationRow {
  id: string;
  slug: string;
  name: string;
  name_kn: string | null;
  name_hi: string | null;
  category_slug: string;
  location_type: VerifiedCampusLocation['locationType'];
  description: unknown;
  latitude: number | string | null;
  longitude: number | string | null;
  coordinate_precision: CoordinatePrecision;
  verification_status: string;
  source_name: string | null;
  source_url: string | null;
  verified_at: string | null;
  is_routeable: boolean;
}

interface CampusDirectoryEntryRow {
  id: string;
  slug: string;
  name: string;
  name_kn: string | null;
  name_hi: string | null;
  category_slug: string;
  description: unknown;
  source_name: string;
  source_url: string;
  verified_at: string;
}

interface CampusDirectory {
  categories: CampusCategory[];
  locations: VerifiedCampusLocation[];
  entries: CampusDirectoryEntry[];
}

const DIRECTORY_KEY = 'campusway:verified-campus-directory';

function getOfficialCampusImageUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !['rnsit.ac.in', 'www.rnsit.ac.in'].includes(url.hostname)) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

async function fetchCampusDirectory(): Promise<CampusDirectory> {
  const [categoryResult, locationResult, entryResult] = await Promise.all([
    supabase
      .from('campus_categories')
      .select('slug, name, sort_order')
      .eq('is_active', true)
      .order('sort_order'),
    supabase
      .from('campus_locations')
      .select(
        'id, slug, name, name_kn, name_hi, category_slug, location_type, description, latitude, longitude, coordinate_precision, verification_status, source_name, source_url, verified_at, is_routeable'
      )
      .eq('is_active', true)
      .eq('verification_status', 'verified')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .order('name'),
    supabase
      .from('campus_directory_entries')
      .select('id, slug, name, name_kn, name_hi, category_slug, description, source_name, source_url, verified_at')
      .eq('is_active', true)
      .order('name'),
  ]);

  if (categoryResult.error) throw categoryResult.error;
  if (locationResult.error) throw locationResult.error;
  if (entryResult.error) throw entryResult.error;

  const categories = (categoryResult.data ?? []) as CampusCategoryRow[];
  const categoriesBySlug = new Map(
    categories.map((category) => [
      category.slug,
      {
        slug: category.slug,
        name: category.name,
        sortOrder: category.sort_order,
      },
    ])
  );

  const locations = ((locationResult.data ?? []) as CampusLocationRow[]).flatMap((row) => {
    const latitude = Number(row.latitude);
    const longitude = Number(row.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return [];

    const category = categoriesBySlug.get(row.category_slug) ?? {
      slug: row.category_slug,
      name: row.category_slug,
      sortOrder: Number.MAX_SAFE_INTEGER,
    };
    const description =
      row.description && typeof row.description === 'object' && !Array.isArray(row.description)
        ? (row.description as Record<string, string>)
        : {};

    return [
      {
        id: row.id,
        slug: row.slug,
        name: row.name,
        nameKn: row.name_kn,
        nameHi: row.name_hi,
        category,
        locationType: row.location_type,
        description,
        latitude,
        longitude,
        coordinatePrecision: row.coordinate_precision,
        verificationStatus: 'verified' as const,
        sourceName: row.source_name,
        sourceUrl: row.source_url,
        verifiedAt: row.verified_at,
        isRouteable:
          row.is_routeable &&
          ['entrance', 'building', 'facility'].includes(row.coordinate_precision),
      },
    ];
  });

  const entries = ((entryResult.data ?? []) as CampusDirectoryEntryRow[]).map((row) => {
    const category = categoriesBySlug.get(row.category_slug) ?? {
      slug: row.category_slug,
      name: row.category_slug,
      sortOrder: Number.MAX_SAFE_INTEGER,
    };
    const description =
      row.description && typeof row.description === 'object' && !Array.isArray(row.description)
        ? (row.description as Record<string, string>)
        : {};

    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      nameKn: row.name_kn,
      nameHi: row.name_hi,
      category,
      description,
      imageUrl: getOfficialCampusImageUrl(description.image_url),
      sourceName: row.source_name,
      sourceUrl: row.source_url,
      verifiedAt: row.verified_at,
    };
  });

  return {
    categories: Array.from(categoriesBySlug.values()),
    locations,
    entries,
  };
}

export function useCampusDirectory() {
  const { data, error, isLoading, mutate } = useSWR(DIRECTORY_KEY, fetchCampusDirectory, {
    dedupingInterval: 60_000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    categories: data?.categories ?? [],
    locations: data?.locations ?? [],
    entries: data?.entries ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function getCategoryName(category: CampusCategory, language: Language): string {
  const key = `cat.${category.name}`;
  const translated = translate(key, language);
  return translated === key ? category.name : translated;
}

export function getLocationName(location: VerifiedCampusLocation, language: Language): string {
  if (language === 'kn' && location.nameKn) return location.nameKn;
  if (language === 'hi' && location.nameHi) return location.nameHi;
  return location.name;
}

export function getLocationDescription(
  location: VerifiedCampusLocation,
  language: Language
): string {
  return location.description[language] || location.description.en || '';
}

export function canWalkRouteTo(location: VerifiedCampusLocation): boolean {
  return (
    location.verificationStatus === 'verified' &&
    location.isRouteable &&
    ['entrance', 'building', 'facility'].includes(location.coordinatePrecision)
  );
}
