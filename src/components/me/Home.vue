<template>
  <div>
    <div class="me-container">
      <div v-if="!lastfmUsername">
        <button class="dark" @click="lastfmSignIn">Last.fm 로그인</button>
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
import { Dialog } from 'quasar'
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
      const vm = this

      Dialog.create({
        title: '로그아웃',
        message: '정말 로그아웃 하실 건가요? ㅜㅅㅜ',
        buttons: [{
          label: '네',
          handler () {
            firebase.signOut()
            .then(result => {
              store.setUser(null)
              vm.$router.push({ name: 'home' })
            })
            .catch(error => console.log(error))
          }
        }, {
          label: '그럴리가요'
        }]
      })
    }
  }
}
</script>

<style scoped>
.me-container {
  padding: 1em 2em 2em 2em;
}
</style>
