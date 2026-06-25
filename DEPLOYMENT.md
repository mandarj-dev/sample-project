# Deployment guide (DevOps)

SPA sample apps for testing ShipDelight API migration. Both call the same endpoint from the **browser** — no Node runtime required for hosting.

**Health check API:** `GET https://appapi-dev.shipdelight.com/server/healthcheck`

## Quick commands

| Project | Install | Generate static | Preview locally |
|---------|---------|-----------------|-----------------|
| Nuxt 2 | `npm install` | `npm run generate:static` | `npm run preview:static` → http://localhost:5050 |
| Nuxt 3 | `npm install` | `npm run generate:static` | `npm run preview:static` → http://localhost:5051 |

## Static output folders (upload to S3)

| Project | Upload this folder |
|---------|-------------------|
| Nuxt 2 | `nuxt2-migration-sample/dist/` |
| Nuxt 3 | `nuxt3-migration-sample/.output/public/` |

## S3 + CloudFront (recommended)

1. Create an S3 bucket and enable static website hosting (or use CloudFront origin only).
2. Upload the output folder contents to the bucket root.
3. Create a CloudFront distribution pointing at the bucket.
4. **SPA fallback** — add custom error responses so client-side routes work on refresh:

| Project | Fallback file |
|---------|----------------|
| Nuxt 2 | `/404.html` |
| Nuxt 3 | `/200.html` |

| HTTP error | Response page | Response code |
|------------|---------------|---------------|
| 403 | fallback file above | 200 |
| 404 | fallback file above | 200 |

5. Invalidate CloudFront cache after each deploy: `/*`

## What you do NOT need

- `nuxt start` / PM2 / Node.js on the server (for static deploy)
- SSR or a VM (both apps use `ssr: false`)
- A backend proxy (API is called directly from the browser; CORS is allowed)

## Validation checklist after deploy

- [ ] Home page loads
- [ ] Health check shows **Healthy — HTTP 200**
- [ ] Navigate to `/health` and back
- [ ] Hard refresh on `/health` (should not 404 if CloudFront fallback is set)
- [ ] Browser devtools → Network: `server/healthcheck` returns 200 from `appapi-dev.shipdelight.com`

## Node deployment (optional, not required for S3)

If experimenting with VM/PM2 instead of static hosting:

```bash
npm run build
npm run start   # Nuxt 2 only
# Nuxt 3: node .output/server/index.mjs
```

This path is only needed if you later add server-side features.
