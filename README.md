# Pretty's Eats — prettyeats402.com

A fast, mobile-first rebuild of the Pretty's Eats website (previously Wix), built with **Vue 3 + Vite** and deployed free on **GitHub Pages**.

> Pretty's Eats is a Black-owned, family-run food truck in Omaha, NE — loaded rice bowls, loaded baked potatoes, and hand-shaken lemonade.

---

## Quick start

```bash
npm install
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

Requires Node 20+.

---

## Deploying to GitHub Pages

Deployment is automatic. `.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.

**One-time repo setup:**

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).

The site then goes live at `https://<user>.github.io/<repo>/`.

### Using the custom domain (www.prettyeats402.com)

1. Create a file named `CNAME` in `public/` containing exactly:
   ```
   www.prettyeats402.com
   ```
2. At the domain registrar, point DNS at GitHub Pages:
   - `CNAME` record: `www` → `<user>.github.io`
   - For the apex domain (`prettyeats402.com`), add `A` records to GitHub's IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. In **Settings → Pages → Custom domain**, enter `www.prettyeats402.com` and enable **Enforce HTTPS**.

No `vite.config.js` change is needed for any of this — the build uses a relative `base` and the router uses hash history, so the same build works from a user site, a project subpath, or a custom domain.

---

## Editing the site content

Almost everything the owner needs to change lives in two plain-JavaScript files — no component editing required.

| What | File |
| --- | --- |
| Phone, email, tagline, city, hours, social links, nav labels | `src/data/site.js` |
| The full menu — categories, items, prices, sizes, flavors, extras | `src/data/menu.js` |

**Changing a price** is a one-line edit in `src/data/menu.js`; it updates the menu page and the home page at once. Commit and push, and the live site rebuilds itself in about a minute.

Images live in `src/assets/images/` (referenced by the pages) and `public/` (favicon, social share card).

---

## The contact form

This is a static site, so there's no server to receive form posts. The form is built to work either way:

- **Out of the box (zero setup):** submitting composes a pre-filled email to `Prettyeats402@gmail.com` and opens it in the visitor's mail app.
- **Recommended upgrade — real inbox delivery:** create a free form endpoint at [Formspree](https://formspree.io) (or similar), then set the constant at the top of `src/components/contact/ContactForm.vue`:

  ```js
  const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx'
  ```

  With that set, the form POSTs directly and shows an inline success message — the visitor never leaves the site.

---

## Project structure

```
src/
  assets/
    images/            real brand photos + logo
    styles/
      tokens.css       design tokens (color, type, space, radius, shadow)
      base.css         reset, global utilities, buttons, focus states
  components/          AppHeader (with mobile nav), AppFooter, SocialIcon
  data/
    site.js            business facts — single source of truth
    menu.js            menu — single source of truth
  router/index.js      routes (hash history for Pages compatibility)
  views/               HomeView, MenuView, AboutView, ContactView, NotFoundView
public/                favicon, social card, robots.txt
```

## Notes on the build

- **Mobile-first** throughout, with a dedicated mobile nav drawer and layouts written for 360px up.
- **Dark theme** built from the truck's real logo palette: matte black, neon red, warm gold.
- Routes are **code-split** and lazy-loaded; only the home page ships in the initial chunk.
- No UI framework, no icon library, no external JS — just Vue and CSS.
- Fonts (Anton + Inter) are the only third-party request, loaded from Google Fonts with `preconnect`.
- Respects `prefers-reduced-motion`; all animation is CSS transform/opacity.
