/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import App from './App.vue'
import Vue from 'vue'
import _ from 'lodash'
import './../style/index.scss';
import { createApp } from '../index'

const { app, router, store } = createApp()

import filters from './../config/filters'
import directives from './../config/directives'

import each from 'lodash/each'

// components
const files = require.context('./../components', true, /\.vue$/)
const filePaths = files.keys()
const skipped = ['App'] // format 'util/modal'

let components = filePaths.reduce(function(result, filePath) {
  let path = filePath.replace(/(\.\/|\.vue)/g, '')
  let paths = path.split('/')

  if (skipped.indexOf(path) === -1 && files(filePath).$story) {
    _.set(result, paths, files(filePath))
  }

  return result
}, {})

each(
  filters,
  (filterFn, filterName) => Vue.filter(filterName, filterFn)
)

each(
  directives,
  (directiveFn, directiveName) => Vue.directive(directiveName, directiveFn)
)

store.dispatch('browser/bindResize')

function makeStory(components, parentStory = null) {
  _.each(components, function(component, name) {
    var story = parentStory || storiesOf(_.capitalize(name), module)
    // add vuex to each story component
    if (component.render) {
      story.add(_.capitalize(name), () => {
        // inject its component as dependency
        component.$story.components = component.$story.components || {}
        component.$story.components[name] = component
        // add vuex to each story component
        component.$story.store = store
        _.set(component.$story.methods, 'action', (...args) => {
          action(name)(...args)
        })
        return component.$story
      })
    } else {
      makeStory(component, story)
    }
  })
}

makeStory(components)

