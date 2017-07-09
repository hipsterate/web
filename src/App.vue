<template>
  <q-app>
    <q-layout :class="{ transperent: isHome }">
      <div slot="header" class="toolbar bg-blue-grey-10">
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

      <router-view class="layout-view content" v-on:toolbarStyle="changeToolbarStyle"></router-view>
    </q-layout>
  </q-app>
</template>

<script>
import store from 'store'
import firebase from 'utils/firebase'

export default {
  data () {
    return {
      store: store,
      isHome: true
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
    },
    changeToolbarStyle (where) {
      if (where === 'home') {
        this.isHome = true
      }
      else {
        this.isHome = false
      }
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

.transperent {
  opacity: 0.7;
}
</style>
