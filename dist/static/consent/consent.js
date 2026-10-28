/*
 * Cookie consent (opt-in) for Goldberg Orthodontics.
 *
 * Nothing non-essential runs until the visitor opts in:
 * - Google Tag Manager / Google Analytics are loaded from this file, after Consent Mode is updated.
 * - Every other tracker sits in index.php as <script type="text/plain" data-category="...">
 *   and is released by CookieConsent once that category is accepted.
 * Any new tracking script must follow one of those two patterns.
 *
 * Library: CookieConsent v3.1.0 (MIT) https://github.com/orestbida/cookieconsent
 */
(function () {
  var GTM_ID = 'GTM-WBT6DBC3'
  var GA_ID = 'G-N28QPM3261'
  var LOG_URL = '/wp-json/rg-consent/v1/log'
  // Bump when categories or trackers change so every visitor is asked again
  var REVISION = 1
  // Global Privacy Control: treat as a standing "no" to marketing/advertising
  var GPC = navigator.globalPrivacyControl === true

  window.dataLayer = window.dataLayer || []
  function gtag () { window.dataLayer.push(arguments) }
  window.gtag = window.gtag || gtag

  // Google Consent Mode v2: everything denied until the visitor chooses
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  })
  gtag('set', 'ads_data_redaction', true)

  function loadScript (src) {
    var s = document.createElement('script')
    s.async = true
    s.src = src
    document.head.appendChild(s)
  }

  var gaLoaded = false
  var gtmLoaded = false

  function applyGoogleConsent () {
    var analytics = CookieConsent.acceptedCategory('analytics')
    var marketing = CookieConsent.acceptedCategory('marketing')

    gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: marketing ? 'granted' : 'denied',
      ad_user_data: marketing ? 'granted' : 'denied',
      ad_personalization: marketing ? 'granted' : 'denied'
    })

    // Exactly one of these runs per page, so GA4 counts each pageview once:
    // - analytics + marketing: GTM, which holds the GA4 and Google Ads tags. The container has no
    //   per-tag consent checks, so it must not load with only one category (denied tags would
    //   still send cookieless pings to Google).
    // - analytics only: GA4 directly, without the Ads tags.
    if (gaLoaded || gtmLoaded) {
      // A choice changed after a Google tag loaded; the other setup takes over on the next page
      return
    }
    if (analytics && marketing) {
      gtmLoaded = true
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      loadScript('https://www.googletagmanager.com/gtm.js?id=' + GTM_ID)
    } else if (analytics) {
      gaLoaded = true
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + GA_ID)
      gtag('js', new Date())
      gtag('config', GA_ID)
    }
  }

  // Google sets cookies on the parent domain (.goldbergortho.com), which CookieConsent's
  // autoClear can't reach, so revoked categories are cleaned up here on every domain level.
  // _fbp/_fbc come from the Meta Pixel tags inside the GTM container.
  var CATEGORY_STORAGE = {
    analytics: { cookies: /^(_ga|_gid)/, localStorage: [] },
    marketing: { cookies: /^(_gcl|_fbp|_fbc)/, localStorage: ['_gcl_ls', 'lastExternalReferrer', 'lastExternalReferrerTime'] }
  }

  function clearRevoked () {
    var parts = location.hostname.split('.')
    Object.keys(CATEGORY_STORAGE).forEach(function (category) {
      if (CookieConsent.acceptedCategory(category)) return
      var storage = CATEGORY_STORAGE[category]
      document.cookie.split(';').forEach(function (cookie) {
        var name = cookie.split('=')[0].trim()
        if (!storage.cookies.test(name)) return
        var expired = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
        document.cookie = expired
        for (var i = 0; i < parts.length - 1; i++) {
          document.cookie = expired + '; domain=.' + parts.slice(i).join('.')
        }
      })
      storage.localStorage.forEach(function (key) {
        try { localStorage.removeItem(key) } catch (e) {}
      })
    })
  }

  // Proof of consent: stored by dist/functions/consent.php
  function logConsent (event) {
    var cookie = CookieConsent.getCookie()
    var prefs = CookieConsent.getUserPreferences()
    try {
      fetch(LOG_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consent_id: cookie.consentId,
          event: event,
          accept_type: prefs.acceptType,
          accepted: prefs.acceptedCategories,
          rejected: prefs.rejectedCategories,
          revision: cookie.revision,
          gpc: GPC,
          page: location.pathname
        }),
        keepalive: true
      })
    } catch (e) {
      window.console && console.warn('Consent log failed', e)
    }
  }

  var policyLinks = '<a href="/privacy-policy">Privacy Policy</a> · <a href="/cookie-policy">Cookie Policy</a>'
  var gpcNote = GPC
    ? '<br><br><strong>Your browser is sending a Global Privacy Control signal, so marketing cookies are turned off and cannot be enabled.</strong>'
    : ''

  var categories = {
    necessary: { enabled: true, readOnly: true },
    // reloadPage: scripts that already ran can't be unloaded, so revoking a category reloads the page
    analytics: { autoClear: { cookies: [], reloadPage: true } }
  }

  var sections = [
    {
      description: 'We use cookies and similar technologies to run this website. With your permission, we also use them to understand how the site is used and to measure our advertising. Non-essential cookies stay off unless you turn them on, and you can change your choice at any time from the “Cookie Preferences” link at the bottom of every page.' + gpcNote
    },
    {
      title: 'Strictly necessary',
      description: 'Required for the site to work and to remember your cookie choices. This includes our appointment and contact forms (PPL Practice), the accessibility tool (UserWay), embedded videos (Vimeo) and security checks. These cannot be turned off.',
      linkedCategory: 'necessary'
    },
    {
      title: 'Analytics',
      description: 'Helps us understand how visitors use the site (pages viewed, time on site, general location) so we can improve it. Provider: Google Analytics.',
      linkedCategory: 'analytics',
      cookieTable: {
        headers: { name: 'Cookie', domain: 'Provider', desc: 'Purpose' },
        body: [
          { name: '_ga, _ga_*', domain: 'Google Analytics', desc: 'Distinguishes visitors and sessions. Expires after up to 13 months.' }
        ]
      }
    }
  ]

  if (!GPC) {
    categories.marketing = { autoClear: { cookies: [], reloadPage: true } }
    sections.push({
      title: 'Marketing',
      description: 'Measures and improves our advertising and follows up on enquiries. Providers: Google Ads, Meta (Facebook/Instagram) and ActiveCampaign. These providers may combine this data with other information they hold about you.',
      linkedCategory: 'marketing',
      cookieTable: {
        headers: { name: 'Cookie', domain: 'Provider', desc: 'Purpose' },
        body: [
          { name: '_gcl_*', domain: 'Google Ads', desc: 'Measures ad clicks and conversions. Expires after 90 days.' },
          { name: '_fbp, _fbc', domain: 'Meta', desc: 'Measures ad performance and form submissions. Expires after 90 days.' },
          { name: 'prism_*', domain: 'ActiveCampaign', desc: 'Records site visits for email follow-up. Expires after 30 days.' }
        ]
      }
    })
  }

  sections.push({
    title: 'More information',
    description: 'See our ' + policyLinks + ', or contact us at <a href="tel:+15164841123">(516) 484-1123</a> with any questions.'
  })

  CookieConsent.run({
    revision: REVISION,
    guiOptions: {
      consentModal: { layout: 'box', position: 'bottom center', equalWeightButtons: true, flipButtons: false },
      preferencesModal: { layout: 'box', equalWeightButtons: true, flipButtons: false }
    },
    categories: categories,
    onFirstConsent: function () { logConsent('first') },
    onConsent: applyGoogleConsent,
    onChange: function () {
      logConsent('change')
      clearRevoked()
      applyGoogleConsent()
    },
    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: 'Your privacy choices',
            description: 'We use cookies to run this site and, only if you agree, for analytics and advertising. You can accept, reject or choose which cookies to allow.' + gpcNote,
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage preferences',
            // CookieConsent adds its own separator between footer links
            footer: '<a href="/privacy-policy">Privacy Policy</a><a href="/cookie-policy">Cookie Policy</a>'
          },
          preferencesModal: {
            title: 'Cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save my choices',
            closeIconLabel: 'Close',
            sections: sections
          }
        }
      }
    }
  })

  window.rgShowCookiePreferences = function () {
    CookieConsent.showPreferences()
  }
})()
