# Goldberg Orthodontics theme

WordPress site with a Vue 2 theme. Source is in `src/`; the deployed theme is `dist/` (built with `npm run build` on Node 14). The production page template is the hand-maintained `dist/index.php`; `index.html` is only for local dev.

## Privacy & cookie consent: required reading

The site's public Privacy Policy and Cookie Policy promise opt-in consent for all analytics and marketing tracking. Read [PRIVACY.md](PRIVACY.md) before touching any of:
- scripts, pixels, embeds or third-party widgets in `dist/index.php`, `index.html` or `src/`
- `static/consent/`, `dist/functions/consent.php`, `tools/privacy/`
- the privacy/cookie policy pages, or the Google Tag Manager container (GTM-WBT6DBC3)

Rules:
- Never add a tracker that runs before consent. Never put tracking code in Vue components.
- Any change to tracking must update the code, `tools/privacy/trackers.js`, the banner cookie tables and both policy pages together, and bump `REVISION` in `static/consent/consent.js`.
- `npm run check-consent` must pass (it also runs after `npm run build`). After deploying, or after any GTM publish, run the browser audit in `tools/privacy/audit` (see PRIVACY.md) and report its result.
- Don't change policy wording without telling the user that the client needs to sign off.

## Deploying

WP Pusher is not installed on this site. Deploy by uploading changed files from `dist/` to `wp-content/themes/dist/` over SFTP. Don't do full BlogVault staging-to-live merges: they overwrite content edits made on live.
