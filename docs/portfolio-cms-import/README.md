# Portfolio CMS case-study updates

This bundle prepares updates for the existing Merxus AI, SageSet, and Route Logistics records. Keep the existing records and `/work/{slug}` URLs.

The live CMS requires an owner session. An unauthenticated request returned HTTP 403, and no authenticated owner session is available here. No production CMS records were read or changed. The existing CMS has no JSON import action, so do not submit this JSON directly to the protected API.

## Owner entry guide

1. Sign in through the normal Workside admin page and open **Content Management**.
2. Open each existing project record. Confirm its slug matches the table below. Edit that record in place; do not use **New Project** or **Import missing built-in projects**.
3. Before editing, note the record ID, publication status, featured setting, display order, links, image paths, and any owner-written text. If the record has changed since this bundle was prepared, keep the newer owner text unless the owner chooses to replace it.
4. Copy only the mapped fields from `2026-11-18-case-study-updates.json`. Do not clear or replace fields that are not listed. Save the same record, then verify the ID, slug, publication status, featured setting, ordering, image paths, links, and canonical URL remain the same.

| Project | Match this existing slug | JSON fields to enter in the CMS |
| --- | --- | --- |
| Merxus AI | `merxus-ai` | `businessProblem` → Business problem; `solution` → Solution; `keyFeatures` → Key features; `technicalCapabilities` → Technical capabilities; `developmentChallenges` → Development challenges; `outcomes` → Outcomes; `seoTitle` → SEO title; `metaDescription` → Meta description |
| SageSet | `sageset` | Same field mapping |
| Route Logistics | `route-logistics` | Same field mapping |

Enter each list item on its own line in the list fields. The `imageNote` entry is an editorial note, not a CMS field: preserve current images and galleries. In particular, keep SageSet’s `/projects/sageset-challenges.webp` screenshot, keep Merxus’s current artwork, and leave Route Logistics without a screenshot unless an approved genuine product screenshot becomes available.

## Image review

- SageSet’s existing public asset is a genuine app screenshot showing the challenge list.
- The available Merxus dashboard screenshots show an older real-estate product and do not represent the current AI receptionist product.
- No genuine Route Logistics product UI screenshot was available in the reviewed assets.

The JSON is a field-value bundle for owner-controlled entry in the existing CMS, not a request payload for the protected API.
