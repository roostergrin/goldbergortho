// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './base/app'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './shared/store'
import VeeValidate from 'vee-validate'
// import VueCookies from 'vue-cookies'
import * as customFilters from './shared/filters/filters'
// import VueParallaxJs from 'vue-parallax-js'
import VueScrollTo from 'vue-scrollto'
// import VueWaypoint from 'vue-waypoint'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// import VueAxe from 'vue-axe'
import VideoBg from 'vue-videobg'
import VueWow from 'vue-wow'

// Vue config
Vue.config.productionTip = false

// Vue filters
Object.keys(customFilters).forEach(function (key) {
  Vue.filter(key, customFilters[key])
})
Vue.component('video-bg', VideoBg)
sync(store, router)

// Vue use
Vue.use(VeeValidate)
// Vue.use(VueParallaxJs, { minWidth: 1024 })
Vue.use(VueWow)

Vue.use(VueAwesomeSwiper, /* { default global options } */)
import 'swiper/dist/css/swiper.css'

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 1500,
  easing: 'ease',
  offset: -80,
  cancelable: true,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
// Vue.use(VueWaypoint)

// Vue.use(VueCookies)

// Vue.use(VueAxe, {
//   config: {
//     rules: [
//       { id: 'heading-order', enabled: true },
//       { id: 'label-title-only', enabled: true },
//       { id: 'link-in-text-block', enabled: true },
//       { id: 'region', enabled: true },
//       { id: 'skip-link', enabled: true },
//       { id: 'help-same-as-label', enabled: true }
//     ]
//   }
// })

/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  store: store,
  render (h) { return h(App) }
}).$mount('#app')
