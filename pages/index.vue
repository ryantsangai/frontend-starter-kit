<template lang="pug">
landing-layout#index-page
  section.section.hero.is-fullheight
    .hero-body
      .container.has-text-centered
        h1.title Frontend Starter Kit

  .navbar-end(slot="top-menu")
    a.navbar-item(href="/storybook", target="_blank") Components
    router-link.navbar-item(to="/layout") Layouts
</template>

<script>
import LandingLayout from './layout/landing.vue'

export default {
  data() {
    return {
    }
  },
  methods: { },
  computed: { },
  components: {
    LandingLayout,
  },
}
</script>

<style lang="scss" scoped>


h1 {
  color: $red;
}

</style>