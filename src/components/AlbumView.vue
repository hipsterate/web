<template>
  <q-gallery :src="albums">
  </q-gallery>
</template>

<script>
import { Cookies } from 'quasar'
import lastfm from '../lastfm'

export default {
  data () {
    return {
      albums: []
    }
  },
  created () {
    const params = new Map()
    params.set('user', Cookies.get('username'))
    params.set('limit', 10)

    fetch(lastfm.url('user.getRecentTracks', params))
    .then(resp => resp.json())
    .then(json => console.log(json))
  }
}
</script>
