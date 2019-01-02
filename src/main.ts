import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import 'normalize.css';
import 'vuetify/dist/vuetify.min.css';
import router from './router';

Vue.use(Vuetify);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(require('./components/App')),
  router,
});

