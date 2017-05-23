<template>
  <q-layout>

    <div slot="header" class="toolbar dark">
      <q-toolbar-title :padding="0">
        Hipsterate
      </q-toolbar-title>

      <button @click="signIn">
        <i>supervisor_account</i>
        Sign in with last.fm
      </button>
    </div>

    <router-view class="layout-view">
    </router-view>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    signIn: function (account, password) {
      window.open(`${process.env.LASTFM_API_URL}/auth/?api_key=${process.env.LASTFM_API_KEY}&cb=${process.env.SIGNIN_REDIRECT}`)
    }
  }
}
</script>

<style lang="stylus">
</style>
