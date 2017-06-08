<template>
  <div>
    <h1>My Page</h1>
    <button class="dark" @click="lastfmSignIn" v-if="!lastfmUsername">Please signin with Last.fm!</button>
    <div v-else>{{ lastfmUsername }}</div>
  </div>
</template>

<script>
import store from '../store'
import firebase from '../utils/firebase'

export default {
  data () {
    return {
      lastfmUsername: null
    }
  },
  methods: {
    lastfmSignIn: function () {
      window.open(`${process.env.LASTFM_AUTH_PAGE}/auth/?api_key=${process.env.LASTFM_API_KEY}&cb=${process.env.LASTFM_SIGNIN_CB}`)
    }
  },
  created () {
    firebase.database().ref(`/user-lastfm/${store.state.user.uid}`)
    .once('value')
    .then(snapshot => {
      const result = snapshot.val()
      this.lastfmUsername = result.lastfmUsername
    })
  }
}
</script>
