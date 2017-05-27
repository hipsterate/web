export default {
  state: {
    session: {
      isAuth: false,
      user: '',
      session: ''
    }
  },
  setSession (session) {
    this.state.session.isAuth = session.isAuth
    this.state.session.user = session.user
    this.state.session.key = session.key
  }
}
