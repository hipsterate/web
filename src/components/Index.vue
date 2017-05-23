<template>
  <q-layout>

    <div slot="header" class="toolbar dark">
      <q-toolbar-title :padding="0">
        Hipsterate
      </q-toolbar-title>

      <button v-if="!store.state.isAuth" @click="signIn">
        <i>supervisor_account</i>
        Sign in with last.fm
      </button>
      <button v-else>
        {{ store.state.user }}
      </button>
    </div>

    <router-view class="layout-view">
    </router-view>

  </q-layout>
</template>

<script>
import store from '../store'

export default {
  data () {
    return {
      store: store
    }
  },
  methods: {
    signIn: function (account, password) {
      window.open(`${process.env.LASTFM_AUTH_PAGE}/auth/?api_key=${process.env.LASTFM_API_KEY}&cb=${process.env.SIGNIN_REDIRECT}`)
    }
  }
}
</script>
