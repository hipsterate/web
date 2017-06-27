import Vue from 'vue'
import VueRouter from 'vue-router'
import { firebase } from 'utils/api'
import store from './store'
import firebaseApp from './utils/firebase'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: load('Home') },
    {
      path: '/me',
      name: 'me',
      component: load('me/Home'),
      meta: { authRequired: true },
      children: [
        { path: 'recentlyplayed', name: 'me-recentlyPlayed', component: load('me/RecentlyPlayed') },
        { path: 'rated', name: 'me-rated', component: load('me/Rated') }
      ]
    },
    { path: '/lastfmsignincb', component: load('LastfmSignInCb'), name: 'lastfm-signin-cb', meta: { authRequired: true } },
    { path: '*', component: load('Error404') }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    firebase.onAuthChanged()
    .then(user => {
      if (user) {
        store.setUser(user)

        firebaseApp.database().ref(`/user-lastfm/${user.uid}`)
        .once('value')
        .then(snapshot => {
          const result = snapshot.val()
          if (result) {
            store.setLastfmUsername(result.lastfmUsername)
            next()
          }
        })

        next(false)
      }
      else {
        alert('Please signin first!')
        next({ name: 'home' })
      }
    })

    next(false)
  }
  else {
    next()
  }
})

export default router
