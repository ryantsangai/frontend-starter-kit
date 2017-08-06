<template lang="pug">
router-view
</template>

<script>

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
  components: { },
}
</script>
