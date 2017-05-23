export default {
  state: {
    user: '',
    session: ''
  },
  setUser (user) {
    this.state.user = user
  },
  setSession (session) {
    this.state.session = session
    console.log(this.state)
  }
}
