/*const route = '//www.goldbergortho.com/wp-json'

const api = () => {
  try {
    return (document.location.protocol === 'https:' ? 'https://ssl' : 'http://') + route
  } catch (e) {
    return 'https://' + route
  }
}

export default api() */

const api = () => {
  return 'https://www.goldbergortho.com/wp-json'
}

export default api()
