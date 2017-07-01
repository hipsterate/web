<template>
  <div>
    <template v-if="albums !== null">
      <div class="album-grid" v-if="albums.length">
        <album class="album" v-for="album of albums" :key="albumKey(album)" :album="album" :isPlayCount="true"></album>
      </div>
      <div v-else>
        아직 Last.fm에 업로드된 앨범이 없어요 ㅜㅅㅜ
      </div>
    </template>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import store from 'store'
import lastfm from 'utils/lastfm'
import Album from 'components/Album'

export default {
  components: {
    Album
  },
  data () {
    return {
      albums: null
    }
  },
  computed: {
    lastfmUsername () {
      return store.state.lastfmUsername
    }
  },
  methods: {
    albumKey (album) {
      return md5(`${album.artistName}${album.name}`)
    }
  },
  created () {
    lastfm.getTopAlbums(this.lastfmUsername)
    .then(result => result.json())
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
  flex-basis: 10em;
  flex-grow: 1;
}
</style>
