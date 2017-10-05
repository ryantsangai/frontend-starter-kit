import throttle from 'lodash/throttle'

let state = {
  width: process.env.VUE_ENV !== 'server'? window.innerWidth: 0,
  height: process.env.VUE_ENV !== 'server'? window.innerHeight: 0,
}


const getters = {
  width(state) { return state.width },
  height(state) { return state.height },
}

const mutations = {
  DIMENSION(state, payload) {
    if (payload.width) state.width = payload.width
    if (payload.height) state.height = payload.height
  },
}

const actions = {
  bindResize({ commit }) {
    function onWindowResize(e) {
      commit('DIMENSION', {
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    if (process.env.VUE_ENV !== 'server') {
      window.onresize = throttle(onWindowResize, 10)
    }
  },
}

const namespaced = true

export {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
