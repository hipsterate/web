export default {
  state: {
    user: null,
    lastfmUsername: null
  },
  setUser: function (user) {
    this.state.user = user
  },
  setLastfmUsername: function (lastfmUsername) {
    this.state.lastfmUsername = lastfmUsername
  }
}
