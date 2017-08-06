import Vue from 'vue';
import Vuex from 'vuex'
import findIndex from 'lodash/findIndex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    loading: false,
    lang: 'en',
    toasts: [],
  },
  mutations: {
    LOADING (state, payload) { state.loading = !!payload },
    LANG(state, payload) { state.lang = payload },

    ADD_TOAST(state, payload) {
      payload.id = Date.now()
      state.toasts.push(payload)
    },
    REMOVE_TOAST(state, payload) {
      let index = findIndex(state.toasts, toast => toast.id == payload)
      console.log(index);
      if (index === -1) return
      state.toasts.splice(index, 1)
    },
  },
  actions: {
    toast({ commit }, payload) {
      if (typeof(payload) === 'object') {
        commit('ADD_TOAST', {
          text: payload.text,
          action: payload.action,
        })
      } else if (typeof(payload) === 'string') {
        commit('ADD_TOAST', { text: payload, })
      }
    },
  },
  modules: {
    browser: require('./browser.js'),
  },
})


export default store