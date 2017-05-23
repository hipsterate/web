export default {
  state: {
    isAuth: false,
    user: '',
    session: ''
  },
  setIsAuth (isAuth) {
    this.state.isAuth = isAuth
  },
  setUser (user) {
    this.state.user = user
  },
  setSession (session) {
    this.state.session = session
  }
}
