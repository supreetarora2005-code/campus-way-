BEGIN;

CREATE TABLE public.campus_categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.campus_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_kn TEXT,
  name_hi TEXT,
  category_slug TEXT NOT NULL REFERENCES public.campus_categories(slug) ON UPDATE CASCADE,
  location_type TEXT NOT NULL CHECK (location_type IN ('campus', 'building', 'facility', 'entrance')),
  description JSONB NOT NULL DEFAULT '{}'::JSONB CHECK (jsonb_typeof(description) = 'object'),
  latitude NUMERIC(9, 6),
  longitude NUMERIC(9, 6),
  coordinate_precision TEXT NOT NULL DEFAULT 'approximate'
    CHECK (coordinate_precision IN ('entrance', 'building', 'facility', 'campus_reference', 'approximate')),
  verification_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  source_name TEXT,
  source_url TEXT,
  verified_at TIMESTAMPTZ,
  is_routeable BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT campus_locations_coordinate_pair CHECK ((latitude IS NULL) = (longitude IS NULL)),
  CONSTRAINT campus_locations_latitude_range CHECK (latitude IS NULL OR latitude BETWEEN -90 AND 90),
  CONSTRAINT campus_locations_longitude_range CHECK (longitude IS NULL OR longitude BETWEEN -180 AND 180),
  CONSTRAINT campus_locations_verified_has_source CHECK (
    verification_status <> 'verified'
    OR (latitude IS NOT NULL AND longitude IS NOT NULL AND source_url IS NOT NULL AND verified_at IS NOT NULL)
  ),
  CONSTRAINT campus_locations_routeable_is_precise CHECK (
    NOT is_routeable
    OR (
      verification_status = 'verified'
      AND latitude IS NOT NULL
      AND longitude IS NOT NULL
      AND coordinate_precision IN ('entrance', 'building', 'facility')
    )
  )
);

CREATE INDEX campus_locations_category_idx ON public.campus_locations(category_slug);
CREATE INDEX campus_locations_public_lookup_idx
  ON public.campus_locations(verification_status, is_active, category_slug);

ALTER TABLE public.campus_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_locations ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.campus_categories FROM anon, authenticated;
REVOKE ALL ON TABLE public.campus_locations FROM anon, authenticated;
GRANT SELECT ON TABLE public.campus_categories TO anon, authenticated;
GRANT SELECT ON TABLE public.campus_locations TO anon, authenticated;

CREATE POLICY "Public can read active campus categories"
  ON public.campus_categories
  FOR SELECT
  TO anon, authenticated
  USING (is_active);

CREATE POLICY "Public can read verified campus locations"
  ON public.campus_locations
  FOR SELECT
  TO anon, authenticated
  USING (
    is_active
    AND verification_status = 'verified'
    AND latitude IS NOT NULL
    AND longitude IS NOT NULL
  );

INSERT INTO public.campus_categories (slug, name, sort_order)
VALUES
  ('campus', 'Campus', 0),
  ('academic-blocks', 'Academic Blocks', 1),
  ('labs', 'Labs', 2),
  ('library', 'Library', 3),
  ('canteen', 'Canteen', 4),
  ('facilities', 'Facilities', 5);

INSERT INTO public.campus_locations (
  slug,
  name,
  category_slug,
  location_type,
  description,
  latitude,
  longitude,
  coordinate_precision,
  verification_status,
  source_name,
  source_url,
  verified_at
)
VALUES (
  'rns-institute-of-technology',
  'RNS Institute of Technology',
  'campus',
  'campus',
  '{"en":"Mapped RNSIT campus reference point. This is an approximate campus location, not a building or entrance.","kn":"ನಕ್ಷೆಯಲ್ಲಿ ಗುರುತಿಸಲಾದ ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಕ್ಯಾಂಪಸ್ ಉಲ್ಲೇಖ ಸ್ಥಳ. ಇದು ಅಂದಾಜು ಕ್ಯಾಂಪಸ್ ಸ್ಥಳ; ಕಟ್ಟಡ ಅಥವಾ ಪ್ರವೇಶದ್ವಾರವಲ್ಲ.","hi":"मानचित्र पर आरएनएसआईटी परिसर का संदर्भ बिंदु। यह अनुमानित परिसर स्थान है, भवन या प्रवेश द्वार नहीं।"}'::JSONB,
  12.900669,
  77.517858,
  'campus_reference',
  'verified',
  'OpenStreetMap / Nominatim',
  'https://www.openstreetmap.org/way/1120154292',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

COMMIT;
