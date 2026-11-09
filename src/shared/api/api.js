// Same origin in production, so staging reads the staging API and live reads live.
// Local dev (npm run dev) reads the live API.
const api = () => {
  if (process.env.NODE_ENV === 'production') {
    return window.location.origin + '/wp-json'
  }
  return 'https://www.goldbergortho.com/wp-json'
}

export default api()
