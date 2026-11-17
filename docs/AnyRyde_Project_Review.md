# AnyRyde Project Review

**Review date:** 2026-11-17  
**Reviewed source:** `C:\Users\sjroy\Source\rydeIQ`  
**Product name:** AnyRyde  
**Project website:** [anyryde.com](https://anyryde.com/)  
**Review type:** Source-code review; no credentials or live transaction access used

## Project summary

AnyRyde began as a way to compare ride-share rates, then developed into a two-sided ride-matching product. The source contains a rider mobile application, a driver mobile application, and a React web application. Rider components support ride requests, offer/bid review and selection, and tracking. Driver code listens for eligible ride requests and submits offers. Firebase Authentication, Firestore, and callable Cloud Functions are used across the product; the source also includes mapping, location, payment, and notification integration paths.

The product is **shelved**, as directed by the owner. This review confirms what is present in the source, not whether the website, backend, payment flow, or mobile builds currently operate in production. No native release status was verified.

## What the code demonstrates

- Distinct rider and driver experiences, with a separate web application.
- Firestore ride-request records, real-time listeners, and driver offer data.
- Rider-side bid management, new-bid notifications, bid acceptance, cancellation, and tracking UI.
- Driver-side request discovery and offer submission.
- A callable Cloud Function that checks authentication, ride state and expiry, bid amount, driver eligibility, online state, and duplicate offers before returning validation success.
- Mobile integrations and source paths for maps, location, external ride-service handoff, payments, and notifications.

These are implementation signals from repository code. They are not evidence that every flow is complete, deployed, approved by providers, or currently usable by riders and drivers.

## Obvious gaps and risks

1. **Rate comparison is not a verified provider quote integration.** The comparison service attempts requests to Uber and Lyft web/API endpoints and describes simulated scraping in its implementation. This is brittle, may not return real current fares, and should not be represented as an official or dependable price feed. The rider app also contains third-party ride-service links, which are a different capability from obtaining live quotes.
2. **The central bid validator does not itself persist the offer.** The callable function validates an offer and returns success; driver app code separately writes bid data to the ride-request document. The end-to-end authorization and race behavior should be tested as one workflow before any revival.
3. **Payment readiness is unverified.** Payment-related source exists, but this review did not verify provider configuration, authorization/capture/refund behavior, webhook handling, idempotency, or a complete ride-to-payment path.
4. **Security rules warrant a focused least-privilege review before reopening.** The current Firestore rules allow authenticated users to list `users`, `driverApplications`, and `rideRequests`; actual query access is still subject to Firestore rule evaluation, but the broad list grants deserve review against the app's sensitive identity, location, and ride data.
5. **Privacy-sensitive features need a release review.** The repository includes location, camera/video, medical-ride, and safety-related code paths. Retention, consent, access control, disclosures, and applicable obligations were not validated in this source-only pass. Avoid compliance claims without a separate substantiated review.
6. **Brand and app identifiers are inconsistent.** Rider and driver Expo manifests use AnyRyde display names alongside legacy `rydeiq` slugs, RydeIQ bundle/package IDs, and driver app-link domains under `rydeiq.com`. Confirm intended identities and deep-link domains before preparing new builds.
7. **Reproducible quality evidence is limited.** The repositories have sparse test files relative to the breadth of the apps, and the driver package has no test script. Existing project documents make broader readiness claims that were not reproduced in this review. Establish a working local build and automated rider/driver/backend workflow tests before restarting development.
8. **Map key restrictions should be checked.** An embedded Google Maps key is present in mobile app configuration. Mobile keys are necessarily distributed in app bundles; confirm platform/package and API restrictions are narrow, and rotate the key if it was exposed without suitable restrictions.

## Proposed enhancements if the project is revived

### Priority 1 — Decide the product promise

Choose whether AnyRyde is a quote-comparison/referral product or a ride marketplace based on driver offers. If both remain, separate the flows and label quote source, timestamp, coverage, and limitations. Use provider-authorized APIs or documented referral links; retire scraping-based estimates unless an approved, reliable source is established.

### Priority 2 — Prove the ride lifecycle

Add automated integration tests using Firebase emulators for rider request creation, driver eligibility, competing offers, duplicate/racing submissions, bid acceptance, cancellation/expiry, status transitions, location visibility, and failure recovery. Put authoritative offer validation and state transitions behind server-side transactional operations.

### Priority 3 — Review security and personal data

Audit Firestore rules and callable-function authorization for least privilege, especially ride/location access and driver profile fields. Document data collection, consent, retention/deletion, incident handling, and operational access for location, video, medical, and safety workflows. Verify payment-provider controls before taking any payment.

### Priority 4 — Make releases supportable

Align the AnyRyde name, bundle/package IDs, URL schemes, associated domains, and website links. Add a reproducible build/release checklist, crash/error monitoring, provider-integration health checks, support/contact handling, and a defined driver onboarding and service-area plan.

## Portfolio asset coverage

The source includes an authentic AnyRyde rider app icon, which is used as the portfolio logo. No product screenshots were found in the supplied image folder, so the Workside entry does not invent or substitute screenshots. The public portfolio page is explicitly marked shelved and links only to the public website supplied by the owner.

## Review limitations

This was a source review, not a build, penetration test, Firebase production inspection, payment test, mobile-store verification, or live ride transaction. The project website URL is owner-provided and was not used to infer current product availability. Historical repository documents were treated as leads rather than current proof.
