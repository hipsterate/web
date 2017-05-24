<template>
</template>

<script>
import md5 from 'blueimp-md5'

import lastfm from '../lastfm'
import store from '../store'

export default {
  created () {
    let params = new Map()
    params.set('token', this.$route.query.token)
    params.set('api_sig', md5(`api_key${process.env.LASTFM_API_KEY}methodauth.getSessiontoken${token}${process.env.LASTFM_API_SECRET}`))

    fetch(lastfm.apiUrl('auth.getSession', params))
    .then(resp => resp.text())
    .then((xml) => {
      xml2js.parseString(xml, (err, result) => {
        if (err) {
          console.log(`session parse error: ${err}`)
        }

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
