<template lang="pug">
layout#listing-page
  h1.title Listing page
  button.button(type="button", @click.prevent="$refs.modal.open()") Open
  button.button(type="button", @click.prevent="message()") Message
  modal(ref="modal")
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque odit facere vero soluta quas officiis nulla sequi dignissimos temporibus, magnam numquam esse, amet consectetur. Autem officiis nostrum, hic sunt nemo?
</template>

<script>
import HolyGrailLayout from './layout/holy-grail.vue'
import Modal from 'Comp/util/modal.vue'

export default {
  data() {
    return {
    }
  },
  methods: {
    message() {
      this.$store.dispatch('toast', {
        text: 'Hi, Toast Message',
        action: { text: 'OK', }
      })
    }
  },
  computed: { },
  components: {
    Layout: HolyGrailLayout,
    Modal: Modal,
  },
}
</script>

<style lang="scss" scoped>

</style>