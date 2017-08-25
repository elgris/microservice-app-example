import Vue from 'vue'

import Auth from '@/auth'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login.vue')
    },
    {
      path: '/',
      alias: '/todos',
      name: 'todos',
      component: require('@/components/Todos.vue'),
      beforeEnter: requireLoggedIn
    },
    {
      path: '/profile',
      name: 'profile',
      component: require('@/components/Profile.vue'),
      beforeEnter: requireLoggedIn
    },
    {
      path: '/admin/',
      name: 'users',
      component: require('@/components/Users.vue'),
      beforeEnter: requireAdmin
    }
  ]
})

function requireLoggedIn (to, from, next) {
  if (!Auth.isLoggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

function requireAdmin (to, from, next) {
  if (!Auth.isAdmin()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

