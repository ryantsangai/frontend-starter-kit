<template lang="pug">
.app
  router-view
  toast
</template>

<script>
import Toast from './singleton/toast.vue'

export default {
  data() {
    return {
    }
  },
  methods: { },
  computed: { },
  created() {
    this.$store.dispatch('browser/bindResize')
  },
  components: {
    Toast,
  },
}
</script>
