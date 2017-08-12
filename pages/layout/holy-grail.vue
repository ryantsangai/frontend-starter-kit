<template lang="pug">
.holy-grail-layout.hero.is-fullheight(flex="column align-stretch")
  header.navbar.card
    .navbar-brand
      .navbar-burger.burger.is-marginless(@click="toggleMenu")
        span(v-for="i in 3")
      router-link.navbar-item(to="/") Home
    .navbar-menu
      slot(name="top-menu")

  section.layout-content.relative(flex="row align-stretch", flex-item="grow-1")
    transition(name="fade")
      .is-overlay.is-hidden-tablet(v-show="showMenu", @click="toggleMenu()")

    transition(name="slide-left")
      aside.section.content-side(v-show="showMenu")
        slot(name="left-menu")

    section.content-main(flex-item="grow-1")
      slot
        blockquote.
          The Holy Grail refers to a web page layout which has multiple, equal height columns that are defined with style sheets. It is commonly desired and implemented, although the ways in which it can be implemented with current technologies all have drawbacks. Because of this, finding an optimal implementation has been likened to searching for the elusive Holy Grail.

          The limitations of CSS and HTML, the desirability of semantically meaningful pages that rank well in search engines, and the deficiencies of various browsers combine to create a situation in which there is no way to create this type of layout that would be considered totally correct. As the underlying technologies do not provide a proper solution, web designers have found various ways to work around the limitations. Common workarounds include changes in page structure, the addition of graphics, scripting, and the creative use of CSS. These methods are imperfect, inconvenient, and may even be considered abuse of the web standards and their intent.

          Upcoming web standards will deal with this and other layout issues in a much more elegant fashion. However, the problem will continue until these standards are finalized and widely implemented.

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
.content-main {
  overflow: auto;
}

@media(max-width: $tablet) {
  .content-side {
    position: absolute;
    left: 0;
    height: 100%;
  }
}
</style>