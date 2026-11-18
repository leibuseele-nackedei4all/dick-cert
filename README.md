# Dick Cert

A German-language demo of an anatomy certificate builder, built with React, TypeScript, Vite, and Tailwind CSS. The current source is branded **Eronite Experts**. The [published Arena preview](https://019d5a16-7f9a-7e25-a1cd-aa0fa41881b8.arena.site/) is branded **VirilCert** and is a different revision; this repository is not an export of that deployment.

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

The app previews a chosen image in the browser and generates a randomized sample certificate. It does not analyze the image, send it to a server, or call an AI service. The listed prices are illustrative: there is no payment or email integration. Use a non-sensitive sample image to try the flow. Select **PDF / Drucken** in the result to print the certificate or save it as a PDF using your browser's print dialog.

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
