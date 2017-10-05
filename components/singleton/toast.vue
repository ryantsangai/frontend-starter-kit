<template lang="pug">
.toast-container.list-unstyled
  transition(name="fadeUp", mode="out-in")
    .card(v-if="toast", flex="row align-center", :key="toast.id")
      .is-text-left {{toast.text}}
      .is-text-right(v-if="toast.action")
        button.button.is-dark.has-text-primary.is-uppercase(@click="action(toast)") {{toast.action}}
</template>

<script>
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

export default {
  data() {
    return {
      toast: null,
      timeoutId: null,
    }
  },
  computed: {
    currentMsg() { return this.$store.getters['toasts/currentMsg'] },
  },
  methods: {
    remove() {
      this.toast = null
      clearTimeout(this.timeoutId)
      setTimeout(() => {
        this.$store.commit('toasts/REMOVE')
      }, 200)
    },

    action(toast) {
      if (!this.toast) return
      this.$store.commit('toasts/RESOLVE', toast)
      this.remove()
    }
  },
  watch: {
    currentMsg(val, oldVal) {
      this.toast = val
    },

    toast(val) {
      if (!val) return
      this.timeoutId = setTimeout(() => {
        this.remove()
      }, 5000)
    },

  },
  beforeCreate() {
    if (this.$store) {
      this.$store.registerModule('toasts', { namespaced, state, getters, mutations, actions })
    } else {
      console.error('Toast components need vuex to work');
    }
  },
  destroyed() {
     this.$store.unregisterModule('toasts')
  }
}
</script>

<style lang="scss" scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.fadeUp-enter-active { animation: fadeUp .2s 1 ease-in-out; }
.fadeUp-leave-active { animation: fadeUp .2s 1 reverse ease-in-out; }


.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: calc(100% - 40px);
  z-index: 30;
}
.card {
  padding: 10px 15px;
  min-width: 200px;
  background-color: $dark;
  color: #fff;
}

.is-text-right {
  margin-left: 50px;
}
button {
  text-decoration: none;
}

@media(max-width: $tablet) {
  .toast-container {
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: none;
  }
}
</style>


<story>
  {
    template: `<div >
      <div class="section">
        <ul>
          <li>Pop a message by dispatching <code>toast/add</code></li>
          <li>Payload can be string(text) or object(text, action)</li>
          <li>if <code>action</code> is provided in payload, you can use <code>.then()</code> to fire follow up question</li>
          <li>Following material design, only single toast can exist</li>
          <li>If more <code>toast/add</code> is dispatched before former one is destroyed, it will queue up</li>
          <li>The toast will be remove after 5s or the action button is clicked</li>
        </ul>

        <hr>

        <form @submit.prevent="notify()">
          <div class="field has-addons">
            <div class="control">
              <input type="text" class="input" v-model="msg">
            </div>
            <div class="control">
              <button class="button" type="submit">Notify</button>
            </div>
          </div>

          <div class="field">
            <button class="button" type="button" @click="alert()">Notify and Log the time</button>
          </div>
        </form>
      </div>
      <toast></toast>
    </div>`,
    data() {
      return {
        msg: 'Hi Auntie'
      }
    },
    methods: {
      notify() {
        this.$store.dispatch('toasts/add', this.msg)
      },
      alert() {
        let from = Date.now()
        this.$store.dispatch('toasts/add', {
          text: 'It will add a logger when click OK',
          action: 'OK'
        }).then(response => {
          let to = Date.now()
          this.action(`after ${to - from} ms`)
        })
      }
    },
  }
</story>
