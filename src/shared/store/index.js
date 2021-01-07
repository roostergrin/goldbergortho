import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createCache from 'vuex-cache'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Store({
  state: {
    app: {},
    pages: {},
    nav: {},
    blog: {},
    sortedBlog: {},
    currentBlog: {},
    body: {},
    types: {},
    showModal: {},
    modalContent: {},
    loading: true
  },
  plugins: [createCache()],
  mutations: mutations,
  actions: actions
})
store.cache.dispatch('GET_BLOG')
store.cache.dispatch('GET_CATEGORY')

export default store
