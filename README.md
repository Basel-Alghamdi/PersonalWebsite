# PersonalWebsite — static + React migration

What’s included

- Static site improvements: inline JS extracted to `scripts/` and SEO/meta and accessibility (skip link) added.
- React app scaffold in `react-app/` (Vite + React 18) with core interactions ported and a clean component structure.

Run the React app

- cd `react-app`
- npm install
- npm run dev

Migration plan

- Copy `styles.css` into `react-app/src/styles.css` (or split to modules).
- Copy `assets/images` to `react-app/public/assets/images` to preserve image paths.
- Move HTML content section by section into React components. Keep ids: `home`, `about`, `Experience`, `Volunteering`.

Enhancement checklist

- Accessibility: focus states, color contrast, meaningful alt text, ARIA landmarks, focus trap in overlays.
- Performance: compress images (WebP/AVIF), preload critical assets, code split where beneficial.
- Quality: add ESLint + Prettier + Husky (pre-commit), Vitest + React Testing Library.
- Security: set a strict Content Security Policy when serving, audit dependencies regularly.
