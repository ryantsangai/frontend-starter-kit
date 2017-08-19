<template lang="pug">
.toast-container.list-unstyled
  transition(name="fadeUp", mode="out-in")
    .card(v-if="toast", flex="row align-center", :key="toast.id")
      .is-text-left {{toast.text}}
      .is-text-right(v-if="toast.action")
        button.button.is-dark.has-text-primary.is-uppercase(@click="action(toast)") {{toast.action}}
</template>

<script>

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
            <button class="button" type="button" @click="alert()">Notify and alert</button>
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
