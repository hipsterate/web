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
    params.set('period', '1month')

    fetch(lastfm.url('user.getTopAlbums', params))
    .then(resp => resp.json())
    .then(result => {
      this.albums = result.topalbums.album.map(album => album.image.slice(-1)[0]['#text'])
    })
  }
}
</script>
