import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'Index',
    component: view('index'),
  }, {
    path: '*',
    redirect: '/',
  }
]

let router = new Router({
  routes: routes,
  scrollBehavior(to, from, savedPosition) { return { x: 0, y: 0 } },
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  next()
})

function view(name) {
    return resolve => require([`./../pages/${name}.vue`], resolve)
}

export default router