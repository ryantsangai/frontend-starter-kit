<template lang="pug">
layout#listing-page
  h1.title Listing page
  button.button(type="button", @click.prevent="$refs.modal.open()") Open
  button.button(type="button", @click.prevent="message()") Message
  modal(ref="modal")
    p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque odit facere vero soluta quas officiis nulla sequi dignissimos temporibus, magnam numquam esse, amet consectetur. Autem officiis nostrum, hic sunt nemo?

  div(flex="row align-center wrap")
    .col(v-for="i in 100")
      image-placeholder(src="http://lorempixel.com/1000/400/", :size="{width: 1, height: 1}")
</template>

<script>
import HolyGrailLayout from './layout/holy-grail.vue'
import Modal from '@cpn/util/modal.vue'
import ImagePlaceholder from '@cpn/util/img-placeholder.vue'

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
    ImagePlaceholder,
  },
}
</script>

<style lang="scss" scoped>
.col {
  width: 50%;
  padding: 10px;
}
</style>