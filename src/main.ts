// // === DEFAULT / CUSTOM STYLE ===
// // WARNING! always comment out ONE of the two require() calls below.
// // 1. use next line to activate CUSTOM STYLE (./src/themes)
// // require(`./themes/app.${__THEME}.styl`)
// // 2. or, use next line to activate DEFAULT QUASAR STYLE
// import(`quasar/dist/quasar.${__THEME}.css`)
// // ==============================

// import Vue from 'vue'
// import Quasar from 'quasar-framework'
// import router from './router'

// Vue.use(Quasar) // Install Quasar Framework

// Quasar.start(() => {
//   new Vue({
//     el: '#q-app',
//     router,
//     render: h => h(require('./App'))
//   })
// })

import Vue from 'vue'

new Vue({
  el: '#app'
})
