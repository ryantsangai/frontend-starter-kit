<template lang="pug">
#index-page.hero.is-fullheight
  .hero-body
    .container.has-text-centered
      h1.title HiHi
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: { },
  computed: { },
  components: { },
}
</script>

<style lang="scss" scoped>
@import "~style/global";

@media (max-width: $tablet) {
  h1 {
    color: $red;
  }
}


</style>