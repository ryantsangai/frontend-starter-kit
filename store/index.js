import Vue from 'vue';
import Vuex from 'vuex'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    loading: false,
    lang: 'en',
    window: {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  },
  mutations: {
    LOADING (state, payload) { state.loading = !!payload },
    LANG(state, payload) { state.lang = payload },
    WINDOW_SIZE(state, payload) {
      if (payload.width) state.window.width = payload.width
      if (payload.height) state.window.height = payload.height
    },
  },
  modules: {
  },
})


window.onresize = throttle(onWindowResize, 10)

function onWindowResize(e) {
  store.commit('WINDOW_SIZE', {
    width: window.innerWidth,
    height: window.innerHeight,
  })
}

export default store