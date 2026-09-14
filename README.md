# Portfolio — Mohamed Habib Msahel

Interactive terminal portfolio built with Next.js, deployed to GitHub Pages.

**Live:** https://mohamedhabibmsahel.github.io/portfolio-mohamed-habib-msahel/

## Stack

Next.js (static export) · TypeScript · Framer Motion · Web Audio API

## Development

```bash
cd hacker-portfolio
npm ci
npm run dev
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-nextjs.yml`, which builds
`hacker-portfolio` and publishes `hacker-portfolio/out` to GitHub Pages.

The site is served under the `/portfolio-mohamed-habib-msahel` base path, set in
`next.config.ts`. Raw `<img>` tags and Open Graph image paths do **not** get that
prefix automatically — write it out in full, as the existing asset paths do.
