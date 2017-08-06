<template lang="pug">
.holy-grail-layout.hero.is-fullheight(flex="column align-stretch")
  header.navbar.card
    .navbar-brand
      .navbar-burger.burger.is-marginless(@click="toggleMenu")
        span(v-for="i in 3")
      h1.navbar-item Heading

  section.layout-content.relative(flex="row align-stretch", flex-item="grow-1")
    transition(name="fade")
      .is-overlay.is-hidden-tablet(v-show="showMenu", @click="toggleMenu()")

    transition(name="slide-left")
      aside.section.content-side(v-show="showMenu")
        slot(name="menu")
          nav.menu
            ul.menu-list
              li(v-for="menu in menus", :key="menu.path")
                router-link(v-if="menu.name", :to="menu.path") {{menu.name}}
    section.section.content-main(flex-item="grow-1")
      slot
        h1.title Holy Grail Layout
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit veritatis sequi dicta nam. Distinctio nam temporibus, fugit voluptatum. Quod repellat cumque, modi alias quis quidem, molestias eaque deleniti. Rem, perspiciatis.

  footer.footer.hide-if-empty
    slot(name="footer")
</template>

<script>

export default {
  data() {
    return {
      mobileMenuOpen: false,
    }
  },
  methods: {
    toggleMenu() { this.mobileMenuOpen = !this.mobileMenuOpen },
  },
  computed: {
    windowWidth() { return this.$store.state.browser.width },
    showMenu() { return this.windowWidth > 769 || this.mobileMenuOpen },
    menus() { return this.$router.options.routes },
  },
  components: { },
}
</script>

<style lang="scss" scoped>
.layout-content {
  > .is-overlay {
    z-index: 10;
    background-color: rgba(#000, 0.1);
  }
}
.content-side {
  z-index: 15;
  min-width: 300px;
  box-shadow: 1px 0 2px rgba(#000, 0.1);
  background-color: $background;
}

@media(max-width: $tablet) {
  .content-side {
    position: absolute;
    left: 0;
    height: 100%;
  }
}
</style>