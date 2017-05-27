<template>
  <q-app>
    <q-layout>

      <div slot="header" class="toolbar dark">
        <q-toolbar-title :padding="0">
          Hipsterate
        </q-toolbar-title>

        <button v-if="!username" @click="signIn">
          <i>supervisor_account</i>
          Sign in with last.fm
        </button>
        <button v-else>
          {{ username }}
        </button>
      </div>

      <router-view class="layout-view"></router-view>

    </q-layout>
  </q-app>
</template>

<script>
import { Cookies } from 'quasar'
import store from './store'

export default {
  data () {
    return {
      store: store
    }
  },
  computed: {
    username: function () {
      return this.store.state.username || Cookies.get('username')
    }
  },
  methods: {
    signIn: function (account, password) {
      window.open(`${process.env.LASTFM_AUTH_PAGE}/auth/?api_key=${process.env.LASTFM_API_KEY}&cb=${process.env.SIGNIN_REDIRECT}`)
    }
  }
}
</script>
