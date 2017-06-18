<template>
  <div>
    <h1>My Page</h1>
    <button class="dark" @click="lastfmSignIn" v-if="!lastfmUsername">Please signin with Last.fm!</button>
    <div v-else>{{ lastfmUsername }}</div>
  </div>
</template>

<script>
import store from '../store'

export default {
  data () {
    return {
    }
  },
  computed: {
    lastfmUsername () {
      return store.state.lastfmUsername
    }
  },
  methods: {
    lastfmSignIn: function () {
      window.open(`${process.env.LASTFM_AUTH_PAGE}/auth/?api_key=${process.env.LASTFM_API_KEY}&cb=${process.env.LASTFM_SIGNIN_CB}`)
    }
  }
}
</script>
