# VirilCert

A German-language demo of an anatomy certificate builder, built with React, TypeScript, Vite, and Tailwind CSS. This repository contains the source export for the [published Arena preview](https://019d5a16-7f9a-7e25-a1cd-aa0fa41881b8.arena.site/).

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

In the results, select **Offizielles Zertifikat erstellen** and then **Als PDF herunterladen** to save the fictional certificate. The PDF is generated in the browser.

## Verify and deploy

```sh
npm run typecheck  # Check TypeScript
npm run build      # Generate dist/index.html
npm run preview    # Serve the production build locally
```

The GitHub Actions workflow runs the type check and build on pull requests and pushes to `main`. Deploy the `dist/` directory to a static host; the existing `netlify.toml` configures Netlify to build the app and publish that directory.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Landing page, local image selection, mock assessment, and printable certificate |
| `src/main.tsx` | React entry point |
| `src/index.css` | Tailwind CSS entry point |
| `vite.config.ts` | Vite build and single-file output configuration |
| `.github/workflows/ci.yml` | Automated type and build checks |
| `netlify.toml` | Netlify build and publish settings |
