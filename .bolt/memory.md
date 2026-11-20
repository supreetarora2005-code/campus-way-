# Project memory

## Product intent & audience

- Location directory / exploration app with locations, directory, explore, and location-detail pages.
- Multi-language support planned for EN / HI / KN (English, Hindi, Kannada); auth screens currently English-only.
- Admin-gated tools; admin status is database-controlled, never app-settable.
- Development proceeds in phases; Phase 3 (auth) complete, Phase 4 (interactive map) next.

## Brand personality & voice

- Professional, clear, instructional tone in user-facing copy and summaries.
- Contributor-facing communication is concise and action-oriented.

## Visual design & UX direction

- Navbar: desktop and mobile variants; visitor state shows Log In / Sign Up buttons; signed-in state shows circular avatar with initial → dropdown (Profile, Admin Dashboard for admins, Sign Out).
- Auth pages: email-format validation, live password-strength feedback, confirm-password matching, show/hide password toggle, error/success messaging.
- Password reset: forgot-password page emails reset link; reset page enforces same strength rules.
- Profile page: name/email display, admin tools when applicable, name update, password change, sign out.
- Session persistence across reloads.
- Location descriptions fixed to render and search correctly across Directory, Explore, and Location Details; searches respect selected language.

## Decisions, constraints & rationale

- Admin role sourced only from database profile; granting admin is a trusted manual step outside the app.
- Email-confirmation flow conditional on email-verification being enabled; otherwise user is signed in immediately after registration.
- Profile auto-created on first signup.
- Auth UI text deferred to English-only for now; EN/HI/KN translation to be added later.
- Phase 4 will replace placeholder diagram with real interactive map using Leaflet + OpenStreetMap driven by database.

## Open questions & assumptions

- Live auth flow (signup, email delivery, signin) still needs browser verification.
- Which email provider/service is configured for confirmation and reset links is unconfirmed.
- Whether full EN/HI/KN translations for auth screens are still desired before launch.
- Map data schema and tile-source preferences for Phase 4 not yet specified.