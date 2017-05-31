import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: load('Home'), name: 'home' },
    { path: '/me', component: load('Me'), name: 'me' },
    { path: '/signincallback', component: load('SignInCallback'), name: 'signin-callback' },
    { path: '/albums', component: load('AlbumView'), name: 'albums' },
    { path: '*', component: load('Error404') }
  ]
})
