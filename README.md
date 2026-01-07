# Base Trader Bot — Cloudflare Workers + GitHub (Static Assets)

This repo deploys a single-file HTML dapp (your trading bot) on Cloudflare Workers using Workers Static Assets.

The point:
- Serve the bot over HTTPS (normal web origin so extension wallets behave)
- Keep everything static (wallet stays in your extension)
- Deploy by pushing to GitHub using Cloudflare's Workers Git integration

## Repo layout
- public/index.html — the bot UI (served at /)
- src/worker.js — minimal Worker that serves assets via env.ASSETS.fetch(...) and adds headers
- wrangler.jsonc — Wrangler config (assets directory + ASSETS binding)
- package.json — pins the Wrangler version used by CI builds

## Deploy (GitHub + Workers Builds)

1) Create a new GitHub repository.

2) Upload these files to the repo (or git clone/push).

3) In the Cloudflare dashboard:
- Go to Workers & Pages
- Create application
- Import a repository
- Pick your GitHub account and select this repo

4) When asked for build settings, use:
- Build command: npm ci
- Deploy command: npm run deploy

5) Save and deploy.

Cloudflare will build and deploy on every push to the configured branch.

## Update
Edit public/index.html (or replace it with a newer bot build), commit, and push to GitHub.
A new deployment will trigger automatically.

## Notes
- The Worker name in the dashboard should match the "name" in wrangler.jsonc.
- Cache-Control is set to no-store by the Worker so you always load the latest HTML.
