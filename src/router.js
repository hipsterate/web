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
    { path: '/', component: load('Home'), name: 'home' },
    { path: '/me', component: load('Me'), name: 'me', meta: { authRequired: true } },
    { path: '/lastfmsignincb', component: load('LastfmSignInCb'), name: 'lastfm-signin-cb', meta: { authRequired: true } },
    { path: '/albums', component: load('AlbumView'), name: 'albums', meta: { authRequired: true } },
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
