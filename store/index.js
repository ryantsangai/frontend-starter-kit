import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      loading: false,
      lang: 'en',
    },
    mutations: {
      LOADING (state, payload) { state.loading = !!payload },
      LANG(state, payload) { state.lang = payload },
    },
    actions: {
    },
    modules: {
      browser: require('./browser.js'),
      toasts: require('./toasts.js'),
    },
  })
}

