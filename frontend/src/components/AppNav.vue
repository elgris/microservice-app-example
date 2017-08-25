
<template>
  <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
    <a class="navbar-brand" href="#">70d0 0v3r3n61n33r1n6</a>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" v-show="isAdmin()">
        <a class="btn btn-success mr-sm-2" href="#/admin">Admin</a>
      </li>
    </ul>

    <ul class="navbar-nav">
      <li class="nav-item" v-show="!isLoggedIn()">
        <a class="btn btn-success mr-sm-2" href="#/login">Login</a>
      </li>
      <li class="nav-item" v-show="isLoggedIn()">
        <button class="btn btn-danger mr-sm-2" href="#" @click="logout()" >Logout</button>
      </li>
    </ul>
  </nav>

</template>

<script>

import Auth from '@/auth'

export default {
  name: 'app-nav',

  methods: {
    logout () {
      Auth.logout()
    },
    isLoggedIn () {
      return Auth.isLoggedIn()
    },
    isAdmin () {
      return Auth.isAdmin()
    }
  }
}
</script>