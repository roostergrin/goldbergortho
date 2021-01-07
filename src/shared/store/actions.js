import axios from 'axios'
import api from 'api'
import {
  GET_PAGES,
  GET_BLOG,
  SET_BLOG,
  GET_CATEGORY,
  GET_APP,
  VIEW_NAV,
  VIEW_BODY,
  VIEW_TYPES,
  VIEW_SHOWMODAL,
  VIEW_MODALCONTENT
} from './mutation-types'

const actions = {
  GET_PAGES ({ commit }) {
    (async () => {
      try {
        const response = await axios.get(`${api}/wp/v2/pages?page=1&per_page=100`)
        const total = response.headers['x-wp-totalpages']
        let page = 1

        while (page < total) {
          page++
          let res = axios.get(`${api}/wp/v2/pages?page=${page}&per_page=100`)
          response.data.concat(res.data)
        }

        const data = response.data.reduce(
          (allData, data) => ({ ...allData, [data.slug]: data }),
          {}
        )
        commit(GET_PAGES, data)
      } catch (e) {
        console.log('PAGES API: ' + e)
      }
    })()
  },
  GET_APP ({ commit }) {
    (async () => {
      try {
        const response = await axios.get(`${api}/wp/v2/app`)
        const data = response.data.reduce(
          (allData, data) => ({ ...allData, [data.slug]: data }),
          {}
        )
        commit(GET_APP, data)
      } catch (e) { console.log('APP API: ' + e) }
    })()
  },
  GET_BLOG ({ commit }) {
    (async () => {
      try {
        var response = await axios.get(`${api}/wp/v2/posts?_embed&per_page=100`)
        const total = response.headers['x-wp-totalpages']
        let page = 1
        while (page < total) {
          page++
          let res = await axios.get(`${api}/wp/v2/posts?_embed&page=${page}&per_page=100`)
          response.data = response.data.concat(res.data)
        }
        const data = response.data.reduce(
          (allData, data) => ({ ...allData, [data.slug]: data }),
          {}
        )
        commit(GET_BLOG, response.data)
        commit(SET_BLOG, data)
      } catch (e) {
        console.log(e)
      }
    })()
  },
  GET_CATEGORY ({ commit }) {
    (async () => {
      try {
        const response = await axios.get(`${api}/wp/v2/categories?per_page=100`)
        const data = response.data.reduce(
          (allData, data) => ({ ...allData, [data.slug]: data }),
          {}
        )
        commit(GET_CATEGORY, data)
      } catch (e) {
        console.log(e)
      }
    })()
  },
  VIEW_NAV ({ commit }, data) {
    commit(VIEW_NAV, data)
  },
  VIEW_BODY ({ commit }, data) {
    commit(VIEW_BODY, data)
  },
  VIEW_TYPES ({ commit }, data) {
    commit(VIEW_TYPES, data)
  },
  VIEW_SHOWMODAL ({ commit }, data) {
    commit(VIEW_SHOWMODAL, data)
  },
  VIEW_MODALCONTENT ({ commit }, data) {
    commit(VIEW_MODALCONTENT, data)
  }
}

export default actions
