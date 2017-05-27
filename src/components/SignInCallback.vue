<template>
  <h1>Now Sign-in...</h1>
</template>

<script>
import { Cookies } from 'quasar'
import md5 from 'blueimp-md5'
import store from '../store'
import lastfm from '../lastfm'
import xml from '../utils/xml'

export default {
  created () {
    const params = new Map()
    const token = this.$route.query.token
    params.set('token', token)
    params.set('api_sig', md5(`api_key${process.env.LASTFM_API_KEY}methodauth.getSessiontoken${token}${process.env.LASTFM_API_SECRET}`))

    fetch(lastfm.url('auth.getSession', params, false))
    .then(resp => resp.text())
    .then(text => xml.parse(text))
    .then(result => {
      Cookies.set('isAuth', true)
      Cookies.set('username', result.lfm.session[0].name[0])
      Cookies.set('sessionkey', result.lfm.session[0].key[0])
      store.setUsername(result.lfm.session[0].name[0])
    })
    .catch(err => console.log(err))

    this.$router.push({
      name: 'albums'
    })
  }
}
</script>
