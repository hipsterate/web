<template>
  <div class="me-container">
    <div v-if="!lastfmUsername">
      <button class="dark" @click="lastfmSignIn">Please signin with Last.fm!</button>
    </div>
    <div v-else>
      <h4>Hello, {{ lastfmUsername }}!</h4>
    </div>
    <div>
      <router-link class="go-recently-played" :to="{ name: 'recentlyPlayed' }">
        <button class="dark">Recently Played</button>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from 'store'

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

<style scoped>
.me-container {
  padding: 1em;
}
</style>
