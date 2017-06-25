<template>
  <div>
    <div class="album-grid">
      <album class="album" v-for="album of albums" :key="album.mbid" :album="album" :isPlayCount="false"></album>
    </div>
  </div>
</template>

<script>
import store from 'store'
import firebase from 'utils/firebase'
import lastfm from 'utils/lastfm'
import Album from 'components/Album'

export default {
  components: {
    Album
  },
  data () {
    return {
      albums: []
    }
  },
  methods: {
    fetchAlbums (lastfmUsername) {
      const params = new Map()
      params.set('user', lastfmUsername)
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
  },
  created () {
    firebase.database().ref(`/user-lastfm/${store.state.user.uid}`)
    .once('value')
    .then(snapshot => {
      const result = snapshot.val()
      this.fetchAlbums(result.lastfmUsername)
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
