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
          로그인
        </button>
        <button v-else @click="goMe">
          {{ user.email }}
        </button>
      </div>

      <router-view class="layout-view"></router-view>

    </q-layout>
  </q-app>
</template>

<script>
import store from 'store'
import firebase from 'utils/firebase'

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
      .then(result => {
        store.setUser(result.user)
        this.$router.push({ name: 'me' })
      })
      .catch(error => console.log(error))
    },
    goMe () {
      this.$router.push({ name: 'me' })
    }
  },
  created () {
    firebase.onAuthChanged()
    .then(user => {
      store.setUser(user)
    })
  }
}
</script>

<style scoped>
.go-home {
  color: #fff;
}
</style>
