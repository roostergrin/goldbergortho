// Single source of truth for what the site is allowed to load, by consent category.
// Used by check-consent.js (static) and audit/audit.js (real browser).
// If you add, remove or move a third-party service, update this file AND:
//   - static/consent/consent.js (banner text + cookie tables)
//   - src/pages/cookie-policy/cookie-policy.pug and src/pages/privacy-policy/privacy-policy.pug
// See PRIVACY.md.

module.exports = {
  // Hosts allowed in <script>/<noscript> tags that are NOT consent-gated (checked by check-consent.js)
  ALWAYS_ON_SCRIPT_HOSTS: [
    'cdn.userway.org', // accessibility widget
    'userway.org', // link inside the UserWay <noscript>
    'clients-cdn.pplpractice.com', // chat menu (links only, no tracking)
    'pplpractice-reviews.com', // appointment / contact forms (iframes)
    'ajax.googleapis.com', // Google WebFont loader
    'browser-update.org' // outdated-browser notice
  ],

  // Network requests allowed before/without consent (checked by audit.js). Regexes run on the full URL.
  ALWAYS_ON: [
    /^https:\/\/([^/]+\.)?goldbergortho\.com\//,
    /^https:\/\/[^/]+\.wpstage\.net\//,
    /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
    /^https:\/\/(cdn|api)\.userway\.org\//,
    /^https:\/\/maxcdn\.bootstrapcdn\.com\//,
    /^https:\/\/wowjs\.uk\//,
    /^https:\/\/lh3\.googleusercontent\.com\//,
    /^https:\/\/ajax\.googleapis\.com\//,
    /^https:\/\/browser-update\.org\//,
    /^https:\/\/([^/]+\.)?(vimeo\.com|vimeocdn\.com)\//,
    /^https:\/\/([^/]+\.)?pplpractice(-reviews)?\.com\//,
    /^https:\/\/[^/]+\.azurefd\.net\//, // PPL form assets
    /^https:\/\/([^/]+\.)?challenges\.cloudflare\.com\//, // Turnstile spam check on PPL forms
    /^https:\/\/www\.google\.com\/recaptcha\//,
    /^https:\/\/www\.gstatic\.com\//,
    /^data:/,
    /^blob:/
  ],

  // Allowed once the visitor accepts Analytics
  ANALYTICS: [
    /^https:\/\/www\.googletagmanager\.com\/gtag\/js/,
    /^https:\/\/(www\.|region1\.)?google-analytics\.com\//,
    /^https:\/\/([^/]+\.)?analytics\.google\.com\//,
    /^https:\/\/www\.google\.com\/g\/collect/
  ],

  // Allowed once the visitor accepts Marketing (GTM only loads when Analytics + Marketing are both accepted)
  MARKETING: [
    /^https:\/\/www\.googletagmanager\.com\//,
    /^https:\/\/([^/]+\.)?doubleclick\.net\//,
    /^https:\/\/www\.googleadservices\.com\//,
    /^https:\/\/www\.google\.com\/(pagead|ccm|ads|rmkt|measurement)/,
    /^https:\/\/([^/]+\.)?app-us1\.com\//, // ActiveCampaign site tracking
    // Meta Pixel: 5 tags inside the GTM container (no GTM access to remove them, Oct 2026)
    /^https:\/\/connect\.facebook\.net\//,
    /^https:\/\/www\.facebook\.com\/tr/,
    /^https:\/\/capi-automation\.s3\.us-east-2\.amazonaws\.com\//
  ],

  // First-party cookies that must not exist without consent
  TRACKING_COOKIES: /^(_ga|_gid|_gcl|_fbp|_fbc)/,

  // Strings that indicate a tracker snippet; Vue source must never contain these (trackers live in index.php / consent.js)
  TRACKER_SNIPPETS: [/googletagmanager\.com/, /gtag\(/, /fbq\(/, /connect\.facebook\.net/, /app-us1\.com/, /smilesnap\.com\/js/, /hotjar/, /clarity\.ms/]
}
