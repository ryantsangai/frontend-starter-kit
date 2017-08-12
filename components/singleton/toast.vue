<template lang="pug">
.toast-container.list-unstyled
  transition(name="fadeUp", mode="out-in")
    .card(v-if="toast", flex="row align-center", :key="toast.id")
      .is-text-left {{toast.text}}
      .is-text-right(v-if="toast.action")
        button.button.is-dark.has-text-primary.is-uppercase(@click="action(toast)") {{toast.action.text}}
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
    msgs() { return this.$store.state.toasts },
    firstMsg() { return this.msgs.length? this.msgs[0]: null },
  },
  methods: {
    remove(id) {
      this.toast = null
      clearTimeout(this.timeoutId)
      setTimeout(() => {
        this.$store.commit('REMOVE_TOAST', id)
      }, 200)
    },

    action(toast) {
      if (!this.toast ) return
      this.remove(toast.id)
      if (toast.action.callback) toast.action.callback()
    }
  },
  watch: {
    firstMsg(val, oldVal) {
      this.toast = val
    },

    toast(val) {
      if (!val) return
      this.timeoutId = setTimeout(() => {
        this.remove(val.id)
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
</style>


<story>
  {
    template: `<div class="section">
      <ul>
        <li>Still WIP</li>
      </ul>
      <form @submit.prevent="message()">
        <div class="field has-addons">
          <div class="control">
            <input type="text" class="input" v-model="msg">
          </div>
          <div class="control">
            <button class="button" type="submit">Notify</button>
          </div>
        </div>
      </form>
      <toast></toast>
    </div>`,
    data() {
      return {
        msg: 'Hi Auntie'
      }
    },
    methods: {
      message() {
        this.$store.dispatch('toast', this.msg)
      }
    },
  }
</story>
