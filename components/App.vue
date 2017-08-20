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
  // meta data that share with all pages
  metaInfo: {
    titleTemplate: 'Frontend Starter Kit'
  },
  methods: { },
  computed: { },
  created() {
  },
  components: {
    Toast,
  },
}
</script>
