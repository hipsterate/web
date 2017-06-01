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

          <q-popover ref="popover">
            <div>
              <div @click="signOut(), $refs.popover.close()">Sign Out</div>
            </div>
          </q-popover>
        </button>
      </div>

      <router-view class="layout-view"></router-view>

    </q-layout>
  </q-app>
</template>

<script>
import store from './store'
import firebase from './utils/firebase'

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
      .then(result => this.$router.push({ name: 'me' }))
      .catch(error => console.log(error))
    },
    signOut: function () {
      firebase.auth().signOut()
      .then(result => this.$router.push({ name: 'home' }))
      .catch(error => console.log(error))
    }
  },
  beforeCreate () {
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
