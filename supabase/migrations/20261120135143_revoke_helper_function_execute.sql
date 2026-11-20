/*
# Lock down EXECUTE on internal helper functions

1. What this does
- `set_updated_at()` and `handle_new_user()` are only used by triggers; nobody
  should be able to call them through the API. Revokes EXECUTE from PUBLIC,
  anon and authenticated (the trigger itself still runs with owner rights).
- `is_admin()` stays executable by `authenticated` (the frontend needs to check
  admin status), but is revoked from PUBLIC and anon as before.

2. Security
- Resolves security advisor warnings about SECURITY DEFINER functions being
  publicly executable. No data or policy changes.
*/

REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
