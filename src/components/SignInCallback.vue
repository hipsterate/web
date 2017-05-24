<template>
</template>

<script>
import md5 from 'blueimp-md5'

import store from '../store'
import lastfm from '../lastfm'
import xml from '../utils/xml'

export default {
  created () {
    const params = new Map()
    params.set('token', this.$route.query.token)
    params.set('api_sig', md5(`api_key${process.env.LASTFM_API_KEY}methodauth.getSessiontoken${token}${process.env.LASTFM_API_SECRET}`))

    fetch(lastfm.url('auth.getSession', params))
    .then(resp => xml.parse(resp.text()))
    .then(result => {
        const session = result.lfm.session[0]
        store.setIsAuth(true)
        store.setUser(session.name[0])
        store.setSession(session.key[0])
      })
    })
    .catch(err => console.log(err))

    this.$router.push({
      name: 'index'
    })
  }
}
</script>
