import Vue from 'vue';
import Vuetify from 'vuetify';
import 'normalize.css';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import store from './store';
import App from './App.vue';

Vue.use(Vuetify);

new Vue({
  el: '#app',
  components: {
    App
  },
  store,
  render: h => h(App),
});
