import throttle from 'lodash/throttle'

let state = {
  width: window.innerWidth,
  height: window.innerHeight,
}


const getters = {
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
    window.onresize = throttle(onWindowResize, 10)
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
