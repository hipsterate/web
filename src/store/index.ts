import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {};

export default new Vuex.Store({
  state,
  actions,
  mutations,
});

// export default {
//   state: {
//     user: null,
//     lastfmUsername: null
//   },
//   setUser: function (user) {
//     this.state.user = user
//   },
//   setLastfmUsername: function (lastfmUsername) {
//     this.state.lastfmUsername = lastfmUsername
//   }
// }
