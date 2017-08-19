import Vue from 'vue'

// Vue plugins
import Meta from 'vue-meta'

import runtime from 'serviceworker-webpack-plugin/lib/runtime';

Vue.use(Meta)

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
} else {
  console.log('Service worker not supported');
}