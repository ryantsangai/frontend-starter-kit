import Vue from 'vue'
import store from './store'
import router from './config/router'

require('./config/http')

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

let vue = new Vue({
  el: '#app',
  router: router,
  store: store,
  render(h) { return h(App) },
})
