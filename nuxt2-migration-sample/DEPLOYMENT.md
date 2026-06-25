# Nuxt 2 — static deploy

See [../DEPLOYMENT.md](../DEPLOYMENT.md) for full S3 + CloudFront steps.

```bash
npm install
npm run generate:static   # output → dist/
npm run preview:static    # http://localhost:5050
```

Upload **`dist/`** to S3.
