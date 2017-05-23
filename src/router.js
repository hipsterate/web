import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: load('Index') },
    { path: '/signincallback', component: load('SignInCallback') },
    { path: '*', component: load('Error404') }
  ]
})
