import Vue from 'vue'
import { createApp } from '../index'
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  const registration = runtime.register();
} else {
  console.log('Service worker not supported');
}
