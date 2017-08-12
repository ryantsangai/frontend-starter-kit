<template lang="pug">
transition(name="fade")
  .modal.is-active(v-if="show", v-keydown.Escape="cancel")
    .modal-background
    .modal-content
      .box
        slot
    button.modal-close.is-large(type="button", @click.prevent="cancel()")
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  methods: {
    open() {
      this.show = true
      this.$emit('open')
    },
    cancel() {
      this.show = false
      this.$emit('close')
      this.$emit('cancel')
    },
    confirm(payload) {
      this.show = false
      this.$emit('close')
      this.$emit('confirm', payload)
    },

  },
  created() {
  },
  components: { },
}
</script>

