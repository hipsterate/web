<template>
  <h1>Now Sign-in...</h1>
</template>

<script>
import store from 'store'
import { firebase, lastfm } from 'utils/api'
import xml from 'utils/xml'

export default {
  created () {
    lastfm.getSession(this.$route.query.token)
    .then(result => result.text())
    .then(result => xml.parse(result))
    .then(result => {
      const uid = store.state.user.uid
      const lastfmUsername = result.lfm.session[0].name[0]
      const lastfmSessionKey = result.lfm.session[0].key[0]

      let updates = {}
      updates[`/user-lastfm/${uid}`] = {
        lastfmUsername: lastfmUsername,
        lastfmSessionKey: lastfmSessionKey
      }
      firebase.updateDB(updates)
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

    this.$router.push({ name: 'me' })
  }
}
</script>
