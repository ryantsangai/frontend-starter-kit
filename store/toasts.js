import findIndex from 'lodash/findIndex'
import Promise from 'bluebird'

// keep it out of store state,
// as it dont need to be reactive
// and bluebird promise will update it self which cause vuex warning
let promises = []

let state = {
  msgs: [],
}


const getters = {
  currentMsg(state) { return state.msgs.length? state.msgs[0]: null },
  length(state) { return state.msgs.length },
}

const mutations = {
  ADD(state, payload) {
    let resolve, reject
    let promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
    promises.push({promise, reject, resolve})

    payload.id = Date.now()
    state.msgs.push(payload)
  },

  REMOVE(state) {
    state.msgs.shift()
    promises.shift()
  },

  RESOLVE(state, payload) {
    if (promises.length === 0) return console.warn('No Toast to call action')
    promises[0].resolve(payload)
  },
}

const actions = {
  add({ commit, getters, }, payload) {
    if (typeof(payload) === 'object') {
      commit('ADD', {
        text: payload.text,
        action: payload.action,
      })
    } else if (typeof(payload) === 'string') {
      commit('ADD', { text: payload, })
    }
    return promises[getters.length - 1].promise
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
