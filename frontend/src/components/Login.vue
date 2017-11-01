<template>
    <div>
        <app-nav></app-nav>
        <div class='container'>
            <spinner v-show='loggingIn' message='Logging in...'></spinner>
            <form class='form-horizontal' role='form' v-on:submit.prevent='doLogin'>
                <div class='row'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6'>
                        <h2>Please Login</h2>
                        <hr>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6'>
                        <div class='form-group has-danger'>
                            <label class='sr-only' for='username'>Login</label>
                            <div class='input-group mb-2 mr-sm-2 mb-sm-0'>
                                <div class='input-group-addon' style='width: 2.6rem'><i class='fa fa-at'></i></div>
                                <input
                                  type='text'
                                  name='username'
                                  class='form-control'
                                  placeholder='johnd'
                                  v-model='credentials.username'
                                  required
                                  autofocus
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6'>
                        <div class='form-group'>
                            <label class='sr-only' for='password'>Password</label>
                            <div class='input-group mb-2 mr-sm-2 mb-sm-0'>
                                <div class='input-group-addon' style='width: 2.6rem'><i class='fa fa-key'></i></div>
                                <input
                                  type='password'
                                  name='password'
                                  class='form-control'
                                  placeholder='foo'
                                  v-model='credentials.password'
                                  required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row' style='padding-top: 1rem'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6'>
                        <div class='form-control-feedback'>
                            <span class='text-danger align-middle'>
                            {{ errorMessage }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class='row' style='padding-top: 1rem'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6'>
                        <button type='submit' class='btn btn-success'><i class='fa fa-sign-in'></i> Login</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/common/Spinner'
import AppNav from '@/components/AppNav'

export default {
  name: 'login',
  components: { AppNav, Spinner },
  methods: {
    doLogin: function () {
      this.loggingIn = true
      this.errorMessage = ''

      const credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      this.$auth.login(credentials, 'todos').then(response => {
        this.loggingIn = false
        this.errorMessage = response.body.message
      })
    }
  },
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      errorMessage: '',
      loggingIn: false
    }
  }
}
</script>