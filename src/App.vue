<template>
  <q-app>
    <q-layout>

      <div slot="header" class="toolbar dark">
        <router-link class="go-home" :to="{ name: 'home' }">
          <q-toolbar-title :padding="0">
            Hipsterate
          </q-toolbar-title>
        </router-link>

        <button v-if="!user" @click="signIn">
          <i>supervisor_account</i>
          Sign in
        </button>
        <button v-else>
          {{ user.email }}

          <q-popover ref="popover">
            <div>
              <div @click="goMe(), $refs.popover.close()">My Page</div>
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
import { firebase } from 'utils/api'
import store from 'store'

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
    signIn () {
      firebase.signIn()
      .then(result => this.$router.push({ name: 'me' }))
      .catch(error => console.log(error))
    },
    signOut () {
      firebase.signOut()
      .then(result => this.$router.push({ name: 'home' }))
      .catch(error => console.log(error))
    },
    goMe () {
      this.$router.push({ name: 'me' })
    }
  },
  beforeCreate () {
    firebase.onAuthChanged()
    .then(user => store.setUser(user))
  }
}
</script>

<style scoped>
.go-home {
  color: #fff;
}
</style>
