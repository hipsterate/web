<template>
  <q-app>
    <q-layout>

      <div slot="header" class="toolbar dark">
        <q-toolbar-title :padding="0">
          Hipsterate
        </q-toolbar-title>

        <button v-if="!user" @click="signIn">
          <i>supervisor_account</i>
          Sign in
        </button>
        <button v-else>
          {{ user.email }}
        </button>
      </div>

      <router-view class="layout-view"></router-view>

    </q-layout>
  </q-app>
</template>

<script>
// import { Cookies } from 'quasar'
import firebase from './utils/firebase'
import store from './store'

export default {
  data () {
    return {
      store: store
    }
  },
  computed: {
    user: function () {
      return this.store.state.user
    }
  },
  methods: {
    signIn: function () {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
      .then(result => {
        const token = result.credential.accessToken
        const user = result.user

        console.log(token)
        console.log(user)
      })
      .catch(error => console.log(error))

      // window.open(`${process.env.LASTFM_AUTH_PAGE}/auth/?api_key=${process.env.LASTFM_API_KEY}&cb=${process.env.SIGNIN_REDIRECT}`)
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.setUser(user)
      }
      else {
        store.setUser(null)
      }
    })
  }
}
</script>
