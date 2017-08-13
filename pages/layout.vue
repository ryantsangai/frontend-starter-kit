<template lang="pug">
component#layout-page(:is="layout")
  .section.is-fullheight
    //- content
    .container
      .has-text-right
        .select
          select(v-model="layout")
            option(v-for="option in layoutOptions", :value="option.value") {{option.display}}
      h1.title Main Content
      img(src="http://lorempixel.com/1000/500")
      p.p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

      img(src="http://lorempixel.com/1000/500")
      p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos iure distinctio cupiditate magnam odit veniam dolores, earum vitae id aut, neque dolorum. Asperiores illo iusto nesciunt, totam nihil officiis consequuntur.

      p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio necessitatibus adipisci unde dolores ipsa quidem similique molestiae ad odit accusamus nulla a, deserunt quo totam illum assumenda ullam mollitia obcaecati.

  //- top menu
  .navbar-end(slot="top-menu")
    external-link.navbar-item(href="/storybook", target="_blank") Components
    router-link.navbar-item(to="/layout") Layouts

  //- left menu
  nav.menu(slot="left-menu")
    ul.menu-list
      li(v-for="menu in menus")
        external-link(:href="menu.url", target="_blank") {{menu.display}}

  //- footer
  .container(slot="footer")
    p This is footer
</template>

<script>
import HolyGrail from './layout/holy-grail.vue'
import Landing from './layout/landing.vue'

export default {
  data() {
    return {
      layout: 'landing',
      layoutOptions: [
        {
          display: 'Landing',
          value: 'landing',
        }, {
          display: 'HolyGrail',
          value: 'holy-grail',
        }
      ],
      menus: [
        {
          display: 'Vue',
          url: 'https://vuejs.org/',
        }, {
          display: 'Webpack',
          url: 'https://webpack.js.org/',
        }, {
          display: 'Bluma',
          url: 'http://bulma.io/',
        }
      ],
    }
  },
  methods: {
  },
  components: {
    HolyGrail,
    Landing,
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 100%;
}
.select {
  z-index: 2;
}
</style>