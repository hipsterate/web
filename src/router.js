import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import firebase from './utils/firebase'

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
      component: load('me/Me'),
      meta: { authRequired: true },
      children: [
        { path: 'home', name: 'me-home', component: load('me/Home') },
        { path: 'recentlyplayed', name: 'me-recentlyPlayed', component: load('me/RecentlyPlayed') }
      ]
    },
    { path: '/lastfmsignincb', component: load('LastfmSignInCb'), name: 'lastfm-signin-cb', meta: { authRequired: true } },
    { path: '*', component: load('Error404') }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref(`/user-lastfm/${user.uid}`)
      .once('value')
      .then(snapshot => {
        const result = snapshot.val()
        if (result) {
          store.setLastfmUsername(result.lastfmUsername)
        }
      })

      if (user) {
        store.setUser(user)
        next()
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
