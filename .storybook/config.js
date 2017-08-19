import { configure } from '@storybook/vue'

import Vue from 'vue'


// require('../style/index.scss')

function loadStories() {
  require('./storybook.js')
}

configure(loadStories, module)
