# \*Nacke\*Dei\*-Proffessionell-Certification

A German-language demo of an anatomy certificate builder, built with React, TypeScript, Vite, and Tailwind CSS. This project is based on the source export for the [original Arena preview](https://019d5a16-7f9a-7e25-a1cd-aa0fa41881b8.arena.site/).

## Run locally

Use Node.js **22.12 or newer** and npm. If you use nvm, run `nvm install` and `nvm use` to select Node 22 from `.nvmrc`.

```sh
git clone https://github.com/leibuseele-nackedei4all/dick-cert.git
cd dick-cert
npm ci
npm run dev
```

Open the URL printed by Vite. No environment variables, API keys, or backend are required.

## What the demo does

Select **Analyse starten**, enter a demo name, and choose a non-sensitive sample image. The app previews the image locally and generates randomized sample results; it does not analyze the image, send it to a server, or call an AI service. The email field and prices are for demonstration only. There are no payments or emails.

The results show the detailed report and the fictional certificate together. The overall score is the equally weighted average of the four category scores, rounded to one decimal; the report and certificate use the same score, name, and date. Select **Bewertung & Urkunde als PDF herunterladen** to save one two-page A4 PDF: the detailed report first and the certificate second. The PDF is generated in the browser.

## Verify and deploy

```sh
npm test           # Verify scoring and result consistency
npm run typecheck  # Check TypeScript
npm run build      # Generate dist/index.html
npm run preview    # Serve the production build locally
```

The GitHub Actions workflow runs the tests, type check, and build on pull requests and pushes to `main`. The existing `netlify.toml` also supports building and publishing `dist/` on Netlify.

### GitHub Pages

The [GitHub Pages site](https://leibuseele-nackedei4all.github.io/dick-cert/) serves the built `dist/` directory. In **Settings → Pages**, set **Source** to **GitHub Actions**, and make sure the `github-pages` environment allows deployments from `main`.

The **CI** workflow deploys the build after successful checks on `main`. To redeploy manually, open **Actions → CI → Run workflow** and select `main`. Pull requests build the app but do not deploy it. Do not deploy the repository root directly from a branch: its `index.html` loads TypeScript source that must be built first.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Landing page, local image selection, and result flow |
| `src/analysis.ts` | Demo result data and shared scoring |
| `src/components/` | Report, certificate, and result view |
| `src/utils/assessmentPdf.ts` | Two-page PDF export |
| `src/main.tsx` | React entry point |
| `src/index.css` | Tailwind CSS entry point |
| `vite.config.ts` | Vite build and single-file output configuration |
| `.github/workflows/ci.yml` | Automated checks and GitHub Pages deployment from `main` |
| `netlify.toml` | Netlify build and publish settings |
