<template>
  <q-layout>

    <div slot="header" class="toolbar dark">
      <q-toolbar-title :padding="0">
        Hipsterate
      </q-toolbar-title>

      <button @click="signInDialog">
        <i>supervisor_account</i>
      </button>
    </div>

    <router-view class="layout-view">
    </router-view>

  </q-layout>
</template>

<script>
import { Dialog, Toast } from 'quasar'

export default {
  data () {
    return {
    }
  },
  methods: {
    signInDialog: function () {
      Dialog.create({
        title: 'Sign In',
        message: 'Sign in with your last.fm account',
        form: {
          account: {
            type: 'textbox',
            label: 'Account',
            model: ''
          },
          password: {
            type: 'password',
            label: 'Password',
            model: ''
          }
        },
        buttons: [
          {
            label: 'Sign In',
            handler (signInData) {
              Toast.create.positive(`Welcome, ${signInData.account}`)
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
