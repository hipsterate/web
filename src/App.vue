<template>
  <q-app>
    <q-layout :class="{ transperent: isHome }">
      <div slot="header" class="toolbar bg-blue-grey-10">
        <router-link class="go-home" :to="{ name: 'home' }">
          <q-toolbar-title :padding="0">
            Hipsterate
          </q-toolbar-title>
        </router-link>
        <button v-if="!user" @click="signInDialog">
          <i>supervisor_account</i>
          로그인
        </button>
        <button v-else @click="goMe">
          {{ user.email.split('@')[0] }}
        </button>
      </div>

      <router-view class="layout-view content" v-on:toolbarStyle="changeToolbarStyle"></router-view>
    </q-layout>
  </q-app>
</template>

<script>
import { Dialog } from 'quasar'
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
    signInDialog () {
      const vm = this

      Dialog.create({
        title: '로그인',
        message: '로그인 할 계정 타입을 선택해주세요!',
        stackButtons: true,
        buttons: [{
          label: 'Google',
          handler () {
            console.log('google')
            vm.signIn('google')
          }
        }, {
          label: 'Facebook',
          handler () {
            vm.signIn('facebook')
          }
        }]
      })
    },
    signIn (provider) {
      firebase.signIn(provider)
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
