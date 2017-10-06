import Vue from 'vue'
import {createStore} from './store'
import {createRouter} from './router'
import './config/component'
import './config/plugin'
import filters from './config/filters'
import directives from './config/directives'
import App from './components/App.vue'

import './style/index.scss'

import each from 'lodash/each'

each(
  filters,
  (filterFn, filterName) => Vue.filter(filterName, filterFn)
)

each(
  directives,
  (directiveFn, directiveName) => Vue.directive(directiveName, directiveFn)
)


export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()
  store.dispatch('serverBootstrap')

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    mounted() {
      this.$store.dispatch('clientBootstrap')
    },
    render: h => h(App)

  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
