/*
# CampusWay core schema: locations, FAQs, admin profiles

1. New Tables
- `campus_locations` — every building / facility on campus.
  - `id` (uuid, primary key, auto-generated)
  - `slug` (text, unique, not null) — stable URL identifier, e.g. "cse-block"
  - `name` (text, not null)
  - `name_kn`, `name_hi` (text, nullable) — Kannada and Hindi display names
  - `category` (text, not null) — one of the allowed campus categories
  - `description_en`, `description_kn`, `description_hi` (text, not null default '')
  - `image_url` (text, nullable)
  - `latitude`, `longitude` (double precision, nullable) — real coordinates; NULL means position not yet surveyed
  - `departments` (text array, default empty)
  - `facilities` (text array, default empty)
  - `floors` (jsonb, default '[]') — array of { name, rooms[] }
  - `hours` (text, nullable) — opening hours
  - `accessibility` (text, nullable) — accessibility information
  - `is_verified` (boolean, default false) — only admins set this; unverified rows are clearly flagged in the UI
  - `created_at`, `updated_at` (timestamptz)
- `faqs` — campus FAQs.
  - `id` (uuid, primary key)
  - `question` (text, not null)
  - `answer` (text, not null)
  - `language` (text, not null, default 'en') — 'en' | 'kn' | 'hi'
  - `is_published` (boolean, default true)
  - `created_at`, `updated_at` (timestamptz)

2. Modified Tables
- `profiles` (created in this migration) — one row per user, linked to auth.users.
  - `id` (uuid, primary key, matches auth.users.id)
  - `full_name` (text)
  - `is_admin` (boolean, default false) — NEVER settable by users; only service_role / direct DB config
  - `created_at`, `updated_at` (timestamptz)
  - Auto-provisioned for every new signup via trigger.

3. Security
- RLS ENABLED on all three tables.
- `campus_locations`: SELECT open to anon + authenticated (public campus info).
  INSERT / UPDATE / DELETE restricted to authenticated admins via a security-definer `is_admin()` helper.
- `faqs`: SELECT open (published rows only for non-admins); writes admin-only.
- `profiles`: each user reads/updates only their own row; `is_admin` is column-restricted so users cannot grant themselves admin. Admins may read all profiles.
- Explicit GRANTs for anon / authenticated / service_role, column-restricted UPDATE on profiles.
- `is_admin()` is SECURITY DEFINER with a fixed search_path, EXECUTE revoked from public/anon.

4. Notes
- Seed data is NOT part of this migration; existing locations are migrated separately as unverified.
*/

-- Categories enforced via check constraint
CREATE TABLE IF NOT EXISTS public.campus_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  name_kn text,
  name_hi text,
  category text NOT NULL CHECK (category IN ('Academic Blocks', 'Labs', 'Library', 'Canteen', 'Facilities')),
  description_en text NOT NULL DEFAULT '',
  description_kn text NOT NULL DEFAULT '',
  description_hi text NOT NULL DEFAULT '',
  image_url text,
  latitude double precision,
  longitude double precision,
  departments text[] NOT NULL DEFAULT '{}',
  facilities text[] NOT NULL DEFAULT '{}',
  floors jsonb NOT NULL DEFAULT '[]'::jsonb,
  hours text,
  accessibility text,
  is_verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  language text NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'kn', 'hi')),
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  is_admin boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- updated_at touch trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_campus_locations_updated_at ON public.campus_locations;
CREATE TRIGGER set_campus_locations_updated_at
  BEFORE UPDATE ON public.campus_locations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_faqs_updated_at ON public.faqs;
CREATE TRIGGER set_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create a profile row for every new signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Admin check helper (security definer, locked search_path)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- Enable RLS
ALTER TABLE public.campus_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Grants: campus_locations
GRANT SELECT ON public.campus_locations TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.campus_locations TO authenticated;
GRANT ALL ON public.campus_locations TO service_role;

-- Grants: faqs
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;

-- Grants: profiles (column-restricted writes — is_admin is never user-settable)
GRANT SELECT ON public.profiles TO authenticated;
GRANT UPDATE (full_name) ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- Policies: campus_locations (public read, admin writes)
DROP POLICY IF EXISTS "Public can read locations" ON public.campus_locations;
CREATE POLICY "Public can read locations"
  ON public.campus_locations FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can insert locations" ON public.campus_locations;
CREATE POLICY "Admins can insert locations"
  ON public.campus_locations FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update locations" ON public.campus_locations;
CREATE POLICY "Admins can update locations"
  ON public.campus_locations FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete locations" ON public.campus_locations;
CREATE POLICY "Admins can delete locations"
  ON public.campus_locations FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Policies: faqs (public read of published, admin writes)
DROP POLICY IF EXISTS "Public can read published faqs" ON public.faqs;
CREATE POLICY "Public can read published faqs"
  ON public.faqs FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Admins can insert faqs" ON public.faqs;
CREATE POLICY "Admins can insert faqs"
  ON public.faqs FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update faqs" ON public.faqs;
CREATE POLICY "Admins can update faqs"
  ON public.faqs FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete faqs" ON public.faqs;
CREATE POLICY "Admins can delete faqs"
  ON public.faqs FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- Policies: profiles (own row only, is_admin immutable via API)
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Users can update own name" ON public.profiles;
CREATE POLICY "Users can update own name"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Indexes for search / filtering
CREATE INDEX IF NOT EXISTS idx_campus_locations_category ON public.campus_locations (category);
CREATE INDEX IF NOT EXISTS idx_campus_locations_verified ON public.campus_locations (is_verified);
CREATE INDEX IF NOT EXISTS idx_faqs_language_published ON public.faqs (language, is_published);
