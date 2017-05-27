<template>
  <div>
    <div class="album-grid">
      <album class="album" v-for="album of albums" :key="album.mbid" :album="album"></album>
    </div>
  </div>
</template>

<script>
import { Cookies } from 'quasar'
import lastfm from '../lastfm'
import Album from './Album'

export default {
  components: {
    Album
  },
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
      this.albums = result.topalbums.album.map(album => {
        return {
          id: album.mbid,
          name: album.name,
          image: album.image.slice(-1)[0]['#text'],
          lastfmLink: album.url,
          playCount: album.playcount,
          artistId: album.artist.mbid,
          artistName: album.artist.name,
          artistLastfmLink: album.artist.url
        }
      })
    })
  }
}
</script>

<style scoped>
.album-grid {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: strech;
  align-content: strech;
}

.album-grid>.album {
  flex-basis: 200px;
  flex-grow: 1;
}
</style>
