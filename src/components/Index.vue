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
      window.open('http://www.last.fm/api/auth/?api_key=e2c460467c4b6747ed648d0bfa84463c&cb=http://localhost:8080/#/signincallback')
    }
  }
}
</script>

<style lang="stylus">
</style>
