/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import App from './App.vue'
import Vue from 'vue'
import store from './../store'
import './../style/index.scss';

require('./../config/http')

import filters from './../config/filters'
import directives from './../config/directives'

import each from 'lodash/each'
// components
import Modal from './util/modal.vue'

each(
  filters,
  (filterFn, filterName) => Vue.filter(filterName, filterFn)
)

each(
  directives,
  (directiveFn, directiveName) => Vue.directive(directiveName, directiveFn)
)

storiesOf('Modal', module).add('Normal', () => ({
  template: `<div>
    <button class="button" type="button" @click="open()">Open</button>
    <modal ref="modal">
      <h1 class="title">Modal title</h1>
      <p>Press <code>ESC</code> to close</p>
    </modal>
  </div>`,
  methods: {
    // action: linkTo('Button')
    open() {
      this.$refs.modal.open()
    },
  },
  components: {
    Modal,
  },

}));
//
// storiesOf('Button', module)
//   .add('with text', () => ({
//     components: { MyButton },
//     template: '<my-button @click="action">Hello Button</my-button>',
//     methods: { action: action('clicked') },
//   }))
//   .add('with some emoji', () => ({
//     components: { MyButton },
//     template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
//     methods: { action: action('clicked') },
//   }));
