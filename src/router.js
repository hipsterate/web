import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'quasar'
import store from 'store'
import firebase from 'utils/firebase'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: load('Home')
    },
    {
      path: '/me',
      name: 'me',
      component: load('me/Home'),
      meta: { authRequired: true },
      children: [{
        path: 'recentlyplayed',
        name: 'me-recentlyPlayed',
        component: load('me/RecentlyPlayed')
      }, {
        path: 'rated',
        name: 'me-rated',
        component: load('me/rated/Home'),
        children: [{
          path: 'bytime',
          name: 'me-rated-bytime',
          component: load('me/rated/bytime')
        }, {
          path: 'byrating',
          name: 'me-rated-byrating',
          component: load('me/rated/byrating')
        }]
      }]
    },
    {
      path: '/lastfmsignincb',
      component: load('LastfmSignInCb'),
      name: 'lastfm-signin-cb',
      meta: { authRequired: true }
    },
    {
      path: '*',
      component: load('Error404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    firebase.onAuthChanged()
    .then(user => {
      if (user) {
        store.setUser(user)

        firebase.getDB(`/user-lastfm/${user.uid}`)
        .then(result => {
          const value = result.val()

          if (value) {
            store.setLastfmUsername(value.lastfmUsername)
          }
        })

        next()
      }
      else {
        Dialog.create({
          title: '로그인',
          message: '로그인이 필요한 메뉴에요 ㅜㅅㅜ 홈으로 돌아갈게요.',
          buttons: [{
            label: '확인',
            handler () {
              next({ name: 'home' })
            }
          }]
        })
      }
    })

    next(false)
  }
  else {
    next()
  }
})

export default router
