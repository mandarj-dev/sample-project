# Nuxt 3 — static deploy

See [../DEPLOYMENT.md](../DEPLOYMENT.md) for full S3 + CloudFront steps.

```bash
npm install
npm run generate:static   # output → .output/public/
npm run preview:static    # http://localhost:5051
```

Upload **`.output/public/`** to S3.
