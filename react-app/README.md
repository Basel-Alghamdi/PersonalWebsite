React rewrite (Vite + React 18)

Install and run

- cd react-app
- npm install
- npm run dev

Structure

- src/components: Header, MobileNav (with focus trap), RoleRotator
- src/context: ThemeProvider (persists theme + syncs <html data-theme>)
- src/hooks: useScrollSpy, usePrefersReducedMotion
- public/theme-init.js: prevents theme flash on initial paint

Migration guide

1) Styles: copy your current `styles.css` into `src/styles.css` (or split into modules). Keep class names to preserve visuals.
2) Assets: copy `assets/images` into `public/assets/images` so paths like `/assets/images/...` work in dev/prod.
3) Sections: move content from your static `index.html` into React sections inside `App.jsx` (or create components per section). Ids should remain `home`, `about`, `Experience`, `Volunteering` to keep scroll‑spy and nav working.
4) Build: `npm run build` creates a `dist` folder to deploy to any static host. You can set a base path in `vite.config.js` if deploying under a subpath.

Quick copy commands (run from repo root)

- mkdir -p react-app/public/assets
- cp -R assets/* react-app/public/assets/
- cp styles.css react-app/public/styles.css

Quality

- Accessibility: skip link, focus-trapped mobile nav, reduced motion support.
- Performance: early theme application, defer scripts, IntersectionObserver‑based effects.
- Structure: components, context, and hooks keep logic isolated and testable.
