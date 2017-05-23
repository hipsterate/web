<template>
</template>

<script>
import md5 from 'blueimp-md5'
import xml2js from 'xml2js'
import store from '../store'

export default {
  mounted () {
    this.fetchSession()

    this.$router.push({
      name: 'index'
    })
  },
  methods: {
    fetchSession: function () {
      const token = this.$route.query.token
      const apiSig = md5(`api_key${process.env.LASTFM_API_KEY}methodauth.getSessiontoken${token}5e3113279a15f96d96cf9e65fd8a985b`)

      fetch(`${process.env.LASTFM_API_URL}?method=auth.getSession&token=${token}&api_key=${process.env.LASTFM_API_KEY}&api_sig=${apiSig}`)
      .then(resp => resp.text())
      .then((xml) => {
        xml2js.parseString(xml, (err, result) => {
          if (err) {
            console.log(`session parse error: ${err}`)
          }

          const session = result.lfm.session[0]
          store.setUser(session.name[0])
          store.setSession(session.key[0])
        })
      })
      .catch(err => console.log(err))
    }
  }
}
</script>
