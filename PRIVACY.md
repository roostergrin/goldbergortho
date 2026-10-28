# Privacy & cookie consent

The site's public [Privacy Policy](src/pages/privacy-policy/privacy-policy.pug) and [Cookie Policy](src/pages/cookie-policy/cookie-policy.pug) make promises about what the site does. This file lists those promises, the code that keeps each one, and how to check it. **If you change tracking, the code, the policies and the checks must change together.**

## What the policies promise

| Promise | Where it's enforced |
|---|---|
| No analytics or marketing cookies or requests until the visitor opts in | `dist/index.php` gates trackers with `type="text/plain" data-category="..."`; Google tags only load from `static/consent/consent.js` |
| Accept and Reject are equally easy | `equalWeightButtons` in `static/consent/consent.js` |
| Choices can be changed or withdrawn at any time; withdrawing removes cookies | Footer "Cookie Preferences" button + `clearRevoked()` and `reloadPage` in `consent.js` |
| Global Privacy Control turns marketing off and it can't be enabled | `GPC` handling in `consent.js` (the Marketing category is removed) |
| Consent choices are recorded | `dist/functions/consent.php` → table `{prefix}rg_consent_log`, viewable in WP admin under **Tools → Consent Records** |
| The cookie tables list every service and cookie the site uses | Must match `tools/privacy/trackers.js`, the tables in `consent.js` and the Cookie Policy page |
| Third parties used: Google Analytics, Google Ads, Meta, ActiveCampaign (with consent); PPL Practice, UserWay, Vimeo, Cloudflare, browser-update.org (always on) | `tools/privacy/trackers.js` |

## How it works

- **`static/consent/consent.js`** configures the banner ([CookieConsent v3.1.0](https://github.com/orestbida/cookieconsent), MIT, vendored in `static/consent/`). It sets Google Consent Mode v2 to denied by default, then:
  - loads **GTM** (`GTM-WBT6DBC3`) only when **Analytics and Marketing** are both accepted. The container has no per-tag consent settings, so it must not load with only one category.
  - loads **GA4 directly** (`G-N28QPM3261`) only when **Analytics only** is accepted. Exactly one of the two runs per page, so pageviews aren't double-counted.
- **`dist/index.php`**: any other tracker must be wrapped as `<script type="text/plain" data-category="analytics|marketing">`. CookieConsent runs it after consent.
- **`dist/functions/consent.php`**: the REST endpoint `POST /wp-json/rg-consent/v1/log`, the admin screen and CSV export. It also creates the empty `privacy-policy` and `cookie-policy` WordPress pages the Vue routes need to return HTTP 200.
- **The Meta Pixel (224844199132132) lives only in the GTM container** (5 tags: PageView plus form-submit events). It was removed from `dist/index.php`, but we have no GTM access to remove it there, so it is disclosed. If GTM access is ever regained, consider deleting those tags (HIPAA risk: they report appointment-form submissions to Meta), then remove Meta from the policies and `trackers.js`.
- **The GTM container lives outside this repo.** Anything published in GTM fires for visitors who accept all. Every GTM tag must be disclosed in the policies, and the audit must be re-run after every GTM publish.

## Rules for changes

1. **Adding a tracker or third-party embed** (pixel, chat, analytics, video, widget):
   - Put it behind consent (`data-category`, or in `consent.js` for Google tags). Never put trackers in Vue code (`src/`).
   - Add it to `tools/privacy/trackers.js`, the cookie table in `consent.js`, the Cookie Policy, and the Privacy Policy's "How we share information" section.
   - Bump `REVISION` in `consent.js` so existing visitors are asked again. Update the "Last updated" date on both policy pages.
2. **Adding tags in GTM**: same disclosure rules. Prefer setting "Require additional consent" on each tag.
3. **Removing a tracker**: remove it from all the places above, including GTM.
4. **Health-related data**: don't send form contents, page paths of appointment/treatment pages, or advanced-matching data to ad platforms. The practice is a HIPAA covered entity; a cookie banner is not a HIPAA authorization.
5. Policy wording changes affect the client legally. Get the client's sign-off.

## Checks (run both before every deploy)

- **Static check** (Node 14+, no install): `npm run check-consent`. It also runs automatically after `npm run build`. It fails if an ungated script in `dist/index.php` or `index.html` loads a non-allowlisted host or contains tracker code, if Vue source contains tracker code, or if `dist/static/consent` is out of date.
- **Browser audit** (Node 18+): checks real network traffic and cookies for no choice, reject, analytics-only, accept, withdraw and GPC. It also fails on any request to a service not listed in `trackers.js`, and on more than one GA pageview per page load.
  ```
  cd tools/privacy/audit && npm install && npx playwright install chromium
  node audit.js https://www.goldbergortho.com
  AUTH=user:pass node audit.js https://<staging-host>     # BlogVault staging basic auth
  ```

## Consent records

Records keep: time (UTC), consent ID, choice, accepted/rejected categories, banner revision, GPC flag, page path, a keyed hash of the IP, and the user agent. Visitors' consent IDs are in their `cc_cookie` cookie. Records are not auto-deleted.
