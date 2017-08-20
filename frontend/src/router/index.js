import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todos',
      component: require('@/components/Todos.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: require('@/components/Login.vue')
    }
    // {
    //   path: '/profile',
    //   name: 'Profile',
    //   component: Profile,
    //   meta: {
    //     permission: 'user|admin',
    //     fail: '/login'
    //   }
    // },
    // {
    //   path: '/admin/login',
    //   name: 'AdminLogin',
    //   component: AdminLogin
    // },
    // {
    //   path: '/admin/',
    //   name: 'Users',
    //   component: Users,
    //   meta: {
    //     permission: 'user',
    //     fail: '/login'
    //   }
    // }
  ]
})
