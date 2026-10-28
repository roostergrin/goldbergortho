// Real-browser audit of cookie consent. Loads the site in Chromium for each consent choice and
// fails if anything is sent to a service the visitor hasn't agreed to.
//
// Setup (once, Node 18+):  cd tools/privacy/audit && npm install && npx playwright install chromium
// Run:  node audit.js https://www.goldbergortho.com
//       AUTH=user:pass node audit.js https://goldbergortho686.e.wpstage.net   (staging basic auth)
// Exit code 1 on failure. See PRIVACY.md.

const { chromium } = require('playwright')
const { ALWAYS_ON, ANALYTICS, MARKETING, TRACKING_COOKIES } = require('../trackers')

const BASE = (process.argv[2] || 'https://www.goldbergortho.com').replace(/\/$/, '')
const AUTH = process.env.AUTH ? process.env.AUTH.split(':') : null
const PAGES = ['/', '/appointment-request']
// The banner hides itself from bots, so present as a normal desktop Chrome
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'

const failures = []
const fail = (scenario, msg) => failures.push(`[${scenario}] ${msg}`)
const matches = (list, url) => list.some(re => re.test(url))

async function newPage (browser, { gpc = false } = {}) {
  const ctx = await browser.newContext({
    userAgent: UA,
    httpCredentials: AUTH ? { username: AUTH[0], password: AUTH[1] } : undefined
  })
  await ctx.addInitScript(gpc => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false })
    if (gpc) Object.defineProperty(navigator, 'globalPrivacyControl', { get: () => true })
  }, gpc)
  const page = await ctx.newPage()
  const state = { requests: [], logs: [] }
  page.on('request', r => state.requests.push(r.url()))
  page.on('response', r => {
    if (r.url().includes('/wp-json/rg-consent/v1/log')) state.logs.push(r.status())
  })
  return { ctx, page, state }
}

async function visit (page, path) {
  await page.goto(BASE + path, { waitUntil: 'load', timeout: 90000 })
  await page.waitForTimeout(7000)
}

// allowedLists: which categories' requests are permitted in this scenario
function checkRequests (scenario, urls, allowedLists) {
  for (const url of new Set(urls)) {
    if (matches(ALWAYS_ON, url)) continue
    if (allowedLists.some(list => matches(list, url))) continue
    const known = matches(ANALYTICS, url) || matches(MARKETING, url)
    fail(scenario, known
      ? `request without consent: ${url.slice(0, 140)}`
      : `request to an undocumented service: ${url.slice(0, 140)} (add it to tools/privacy/trackers.js and the cookie policy, or remove it)`)
  }
}

async function checkCookies (scenario, ctx, expectTracking) {
  const names = (await ctx.cookies()).map(c => c.name).filter(n => TRACKING_COOKIES.test(n))
  if (!expectTracking && names.length) fail(scenario, `tracking cookies set: ${names.join(', ')}`)
}

function pageViews (urls) {
  return urls.filter(u => /\/g\/collect/.test(u) && /[?&]en=page_view/.test(u)).length
}

async function choose (page, role) {
  await page.waitForSelector(`#cc-main [data-role="${role}"]`, { timeout: 15000 })
  await page.click(`#cc-main .cm [data-role="${role}"]`)
  await page.waitForTimeout(500)
}

async function scenario (browser, name, opts, run) {
  const s = await newPage(browser, opts)
  try {
    await run(s)
  } catch (e) {
    fail(name, 'error: ' + e.message.split('\n')[0])
  }
  await s.ctx.close()
  console.log(`  ran: ${name}`)
}

;(async () => {
  console.log(`Consent audit: ${BASE}`)
  const browser = await chromium.launch()

  await scenario(browser, 'no choice', {}, async ({ ctx, page, state }) => {
    for (const p of PAGES) await visit(page, p)
    if (!(await page.isVisible('#cc-main .cm'))) fail('no choice', 'consent banner not shown')
    checkRequests('no choice', state.requests, [])
    await checkCookies('no choice', ctx, false)
  })

  await scenario(browser, 'reject all', {}, async ({ ctx, page, state }) => {
    await visit(page, '/')
    await choose(page, 'necessary')
    for (const p of PAGES) await visit(page, p)
    checkRequests('reject all', state.requests, [])
    await checkCookies('reject all', ctx, false)
    if (!state.logs.includes(201)) fail('reject all', `consent not logged (responses: ${state.logs.join(', ') || 'none'})`)
    const formFrames = page.frames().filter(f => f.url().includes('pplpractice-reviews.com'))
    if (!formFrames.length) fail('reject all', 'appointment form iframe missing after rejecting cookies')
  })

  await scenario(browser, 'analytics only', {}, async ({ page, state }) => {
    await visit(page, '/')
    await page.click('#cc-main .cm [data-role="show"]')
    await page.waitForTimeout(800)
    await page.check('#cc-main input[value="analytics"]', { force: true })
    await page.click('#cc-main .pm__btn[data-role="save"]')
    await page.waitForTimeout(1000)
    state.requests.length = 0
    await visit(page, '/meet-the-team')
    checkRequests('analytics only', state.requests, [ANALYTICS])
    const views = pageViews(state.requests)
    if (views !== 1) fail('analytics only', `expected 1 GA page_view per page load, got ${views}`)
  })

  await scenario(browser, 'accept all', {}, async ({ page, state }) => {
    await visit(page, '/')
    await choose(page, 'all')
    await page.waitForTimeout(3000)
    state.requests.length = 0
    await visit(page, '/meet-the-team')
    checkRequests('accept all', state.requests, [ANALYTICS, MARKETING])
    const views = pageViews(state.requests)
    if (views !== 1) fail('accept all', `expected 1 GA page_view per page load, got ${views}`)
  })

  await scenario(browser, 'withdraw', {}, async ({ ctx, page, state }) => {
    await visit(page, '/')
    await choose(page, 'all')
    await page.waitForTimeout(4000)
    await page.evaluate(() => window.rgShowCookiePreferences())
    await page.waitForTimeout(800)
    await Promise.all([
      page.waitForEvent('load', { timeout: 20000 }),
      page.click('#cc-main .pm__btn[data-role="necessary"]')
    ])
    state.requests.length = 0
    await visit(page, '/meet-the-team')
    checkRequests('withdraw', state.requests, [])
    await checkCookies('withdraw', ctx, false)
  })

  await scenario(browser, 'GPC + accept all', { gpc: true }, async ({ page, state }) => {
    await visit(page, '/')
    await choose(page, 'all')
    await page.waitForTimeout(1000)
    state.requests.length = 0
    await visit(page, '/meet-the-team')
    checkRequests('GPC + accept all', state.requests, [ANALYTICS])
  })

  await browser.close()
  if (failures.length) {
    console.error('\nConsent audit FAILED:\n- ' + failures.join('\n- '))
    process.exit(1)
  }
  console.log('\nConsent audit passed.')
})()
