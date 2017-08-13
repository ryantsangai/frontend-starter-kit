import Vue from 'vue'
import store from './store'
import router from './config/router'
import Meta from 'vue-meta'

import './config/component'
import './config/http'


Vue.use(Meta)

import filters from './config/filters'
import directives from './config/directives'
import App from './components/App.vue'

import each from 'lodash/each'

each(
  filters,
  (filterFn, filterName) => Vue.filter(filterName, filterFn)
)

each(
  directives,
  (directiveFn, directiveName) => Vue.directive(directiveName, directiveFn)
)

require('./style/index.scss')

let app = new Vue({
  el: '#app',
  router: router,
  store: store,
  render(h) { return h(App) },
})
