BEGIN;

CREATE TABLE IF NOT EXISTS public.campus_directory_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  name_kn TEXT,
  name_hi TEXT,
  category_slug TEXT NOT NULL REFERENCES public.campus_categories(slug) ON UPDATE CASCADE,
  description JSONB NOT NULL DEFAULT '{}'::JSONB
    CHECK (jsonb_typeof(description) = 'object'),
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL CHECK (source_url ~ '^https://rnsit\\.ac\\.in(/|$)'),
  verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS campus_directory_entries_category_idx
  ON public.campus_directory_entries(category_slug);

ALTER TABLE public.campus_directory_entries ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.campus_directory_entries FROM anon, authenticated;
GRANT SELECT ON TABLE public.campus_directory_entries TO anon, authenticated;

DROP POLICY IF EXISTS "Public can read active campus directory entries"
  ON public.campus_directory_entries;
CREATE POLICY "Public can read active campus directory entries"
  ON public.campus_directory_entries
  FOR SELECT
  TO anon, authenticated
  USING (is_active);

INSERT INTO public.campus_categories (slug, name, sort_order)
VALUES ('departments', 'Departments', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.campus_directory_entries (
  slug, name, category_slug, description, source_name, source_url
)
VALUES
  ('computer-science-engineering', 'Computer Science and Engineering', 'departments',
   '{"en":"Academic department listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('electronics-communication-engineering', 'Electronics and Communication Engineering', 'departments',
   '{"en":"Academic department listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('electrical-electronics-engineering', 'Electrical and Electronics Engineering', 'departments',
   '{"en":"Academic department listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('information-science-engineering', 'Information Science and Engineering', 'departments',
   '{"en":"Academic department listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('civil-engineering', 'Civil Engineering', 'departments',
   '{"en":"Academic department listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('mechanical-engineering', 'Mechanical Engineering', 'departments',
   '{"en":"Academic department listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('electronics-instrumentation-engineering', 'Electronics and Instrumentation Engineering', 'departments',
   '{"en":"Academic department listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('computer-science-ai-ml', 'Computer Science and Engineering (Artificial Intelligence and Machine Learning)', 'departments',
   '{"en":"Academic program listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('computer-science-data-science', 'Computer Science and Engineering (Data Science)', 'departments',
   '{"en":"Academic program listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('computer-science-cyber-security', 'Computer Science and Engineering (Cyber Security)', 'departments',
   '{"en":"Academic department listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('computer-science-business-systems', 'Computer Science and Business Systems', 'departments',
   '{"en":"Academic department listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('artificial-intelligence-data-science', 'Artificial Intelligence and Data Science', 'departments',
   '{"en":"Academic department listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('vlsi-design-technology', 'VLSI Design and Technology', 'departments',
   '{"en":"Academic program listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('master-of-computer-applications', 'Master of Computer Applications', 'departments',
   '{"en":"Postgraduate program listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('master-of-business-administration', 'Master of Business Administration', 'departments',
   '{"en":"Postgraduate program listed by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('central-library', 'Central Library', 'library',
   '{"en":"Campus library identified by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('campus-canteen', 'Campus Canteen', 'canteen',
   '{"en":"Campus canteen identified by RNSIT. Its specific building location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('department-laboratories', 'Department Laboratories', 'labs',
   '{"en":"RNSIT lists laboratories supporting its academic departments. Individual lab locations have not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('sports-facilities', 'Sports Facilities', 'facilities',
   '{"en":"Sports facilities are identified in RNSIT campus information. Their specific locations have not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('gymnasium', 'Gymnasium', 'facilities',
   '{"en":"Gymnasium identified in RNSIT campus information. Its specific location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('auditorium', 'Auditorium', 'facilities',
   '{"en":"Auditorium identified in RNSIT campus information. Its specific location has not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('student-hostels', 'Student Hostels', 'facilities',
   '{"en":"Student hostels identified in RNSIT campus information. Their specific locations have not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/'),
  ('centres-of-excellence', 'Centres of Excellence', 'facilities',
   '{"en":"Centres of Excellence identified in RNSIT campus information. Individual centre locations have not been verified for mapping."}'::JSONB,
   'RNSIT official website', 'https://rnsit.ac.in/')
ON CONFLICT (slug) DO NOTHING;

COMMIT;
