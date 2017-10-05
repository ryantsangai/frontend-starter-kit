import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

function view(name) {
  return resolve => require([(`./components/pages/${name}.vue`)], resolve)
}

let routes = [
  {
    path: '/',
    name: 'Index',
    component: view('index'),
  }, {
    path: '/layout',
    name: 'Layout',
    component: view('layout'),
  }, {
    path: '*',
    redirect: '/',
  }
]

export function createRouter () {
  return new Router({
    routes: routes,
    scrollBehavior(to, from, savedPosition) { return { y: 0 } },
    mode: 'history',
  })
}
