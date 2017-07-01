<template>
  <div>
    <div class="me-container">
      <div v-if="!lastfmUsername">
        <button class="dark" @click="lastfmSignIn">Please signin with Last.fm!</button>
      </div>
      <div v-else>
        <h4>Hello, {{ lastfmUsername }}!</h4>

        <router-link :to="{ name: 'me-recentlyPlayed' }">
          <button class="dark">Recently Played</button>
        </router-link>
        <router-link :to="{ name: 'me-rated' }">
          <button class="dark">Rated</button>
        </router-link>
        <button class="dark" @click="signOut">Sign Out</button>
      </div>
    </div>

    <router-view class="layout-view"></router-view>
  </div>
</template>

<script>
import store from 'store'
import firebase from 'utils/firebase'

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
    },
    signOut () {
      firebase.signOut()
      .then(result => {
        store.setUser(null)
        this.$router.push({ name: 'home' })
      })
      .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.me-container {
  padding: 1em;
}
</style>
