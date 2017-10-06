import Vue from 'vue';
import Vuex from 'vuex'
import Promise from 'bluebird'

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
      serverBootstrap({ dispatch}) {
        return Promise.all([
        ])
      },

      // add all actions here when app
      // will be called on `mounted` callback on client
      clientBootstrap({ dispatch }) {
        return Promise.all([
          dispatch('browser/bindResize', null, { root: true }),
        ])
      },
    },
    modules: {
      browser: require('./browser.js'),
    },
  })
}
