import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import 'normalize.css';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  components: {
    App
  },
  render: h => h(App),
});
