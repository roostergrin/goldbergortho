#!/usr/bin/env node
// Static check that no tracker can run before cookie consent. No dependencies (Node 14+).
// Usage: node tools/privacy/check-consent.js   (exit code 1 on failure)
// See PRIVACY.md for the rules this enforces.

const fs = require('fs')
const path = require('path')
const { ALWAYS_ON_SCRIPT_HOSTS, TRACKER_SNIPPETS } = require('./trackers')

const root = path.resolve(__dirname, '../..')
const errors = []
const CATEGORIES = ['analytics', 'marketing']

function hostsIn (text) {
  const hosts = []
  const re = /(?:https?:)?\/\/([a-z0-9.-]+\.[a-z]{2,})/gi
  let m
  while ((m = re.exec(text))) hosts.push(m[1].toLowerCase())
  return hosts
}

function allowed (host) {
  return ALWAYS_ON_SCRIPT_HOSTS.some(h => host === h || host.endsWith('.' + h))
}

// 1. Templates: every <script>/<noscript> that talks to a non-allowlisted host must be consent-gated
for (const file of ['dist/index.php', 'index.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8').replace(/<!--[\s\S]*?-->/g, '')
  const tags = /<(script|noscript)\b([^>]*)>([\s\S]*?)<\/\1>/gi
  let m
  while ((m = tags.exec(html))) {
    const [, tag, attrs, body] = m
    const gated = /type=["']text\/plain["']/i.test(attrs)
    const category = (attrs.match(/data-category=["']([^"']+)["']/i) || [])[1]
    if (gated) {
      if (!CATEGORIES.includes(category)) {
        errors.push(`${file}: gated <script> has unknown data-category "${category}" (use ${CATEGORIES.join(' or ')})`)
      }
      continue
    }
    for (const host of hostsIn(attrs + body)) {
      if (!allowed(host) && host !== 'www.googletagmanager.com') {
        errors.push(`${file}: ungated <${tag}> loads ${host}. Add type="text/plain" data-category="analytics|marketing", or (only if it is truly essential) add it to ALWAYS_ON in tools/privacy/trackers.js and the cookie policy.`)
      }
    }
    if (TRACKER_SNIPPETS.some(re => re.test(attrs + body))) {
      errors.push(`${file}: ungated <${tag}> contains tracker code. Google tags belong in static/consent/consent.js; anything else needs type="text/plain" data-category="analytics|marketing".`)
    }
  }
}

// 2. Vue source must not inject trackers (they would bypass consent)
function walk (dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) walk(p, out)
    else if (/\.(vue|pug|js|html)$/.test(name)) out.push(p)
  }
  return out
}
for (const file of walk(path.join(root, 'src'), [])) {
  const text = fs.readFileSync(file, 'utf8')
  for (const re of TRACKER_SNIPPETS) {
    if (re.test(text)) errors.push(`${path.relative(root, file)}: contains tracker code (${re}). Trackers belong in dist/index.php (gated) or static/consent/consent.js.`)
  }
}

// 3. Built consent files must match the source copies
for (const name of fs.readdirSync(path.join(root, 'static/consent'))) {
  const src = path.join(root, 'static/consent', name)
  const built = path.join(root, 'dist/static/consent', name)
  if (!fs.existsSync(built) || !fs.readFileSync(src).equals(fs.readFileSync(built))) {
    errors.push(`dist/static/consent/${name} is missing or out of date: run npm run build`)
  }
}

if (errors.length) {
  console.error('Consent check FAILED:\n- ' + errors.join('\n- '))
  process.exit(1)
}
console.log('Consent check passed.')
