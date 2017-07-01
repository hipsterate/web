<template>
  <div>
    <div class="me-container">
      <div v-if="!lastfmUsername">
        <button class="dark" @click="lastfmSignIn">Please signin with Last.fm!</button>
      </div>
      <div v-else>
        <h4>안녕하세요 {{ lastfmUsername }}님!</h4>

        <router-link :to="{ name: 'me-recentlyPlayed' }">
          <button class="dark">최근 들은 앨범</button>
        </router-link>
        <router-link :to="{ name: 'me-rated' }">
          <button class="dark">평가한 앨범</button>
        </router-link>
        <button class="dark" @click="signOut">로그아웃</button>
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
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
}
</style>
