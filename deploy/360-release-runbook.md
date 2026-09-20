# 360 Feedback release runbook

This release changes only `/products/360-feedback*` and `/astro-360-assets/*`. All other website paths remain on the existing origin.

## 1. Build and package

```bash
npm ci
npm run release:360
```

The upload-ready output is `.release/360-site`. `release-manifest.json` records every file, byte size and SHA-256 checksum.

## 2. Required inputs

- AWS account and region
- Dedicated private S3 bucket name
- CloudFront distribution ID
- Existing production origin ID
- Deployment IAM role or profile
- Preview hostname or staging distribution
- GTM owner who will map `atalent_web_interaction` into GA4 events

Do not put credentials or IDs into the repository.

## 3. Preview upload

Create a private bucket with public access blocked and CloudFront Origin Access Control. Upload only the prepared release:

```bash
aws s3 sync .release/360-site s3://$ATALENT_360_BUCKET/ --delete --dryrun
```

Review the dry run, then repeat without `--dryrun`. Never sync the repository root and never point `--delete` at the existing website bucket.

## 4. CloudFront staging

Use the two behaviors in `cloudfront-behaviors.example.json` and associate `cloudfront-uri-rewrite.js` on viewer request for the page behavior. Test on a staging distribution or preview hostname first.

Validate:

- page and hashed assets return 200
- light/dark modes, language menu, FAQ and carousel work
- canonical and hreflang remain the production URLs
- `window.dataLayer` receives `atalent_web_interaction`
- no other site path resolves to the Astro origin

## 5. Production switch

Export and save the current distribution config and ETag before changing it. Add the dedicated origin and two ordered behaviors. Invalidate:

```text
/products/360-feedback*
/astro-360-assets/*
```

## 6. Rollback

Restore the saved CloudFront distribution config and ETag, then invalidate the same two paths. The existing website origin and old page must remain untouched until the new page has passed the agreed observation period.
