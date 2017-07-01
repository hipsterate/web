<template>
  <div>
    <div class="album-grid" v-if="isAlbums">
      <album class="album" v-for="album of albums" :key="albumKey(album)" :album="album" :isPlayCount="false"></album>
    </div>
    <div v-else>
      아직 평가한 앨범이 없어요 ㅜㅅㅜ
      위의 "최근 들은 앨범" 메뉴로 이동해서 평가를 시작하세요!
    </div>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import store from 'store'
import firebase from 'utils/firebase'
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
    isAlbums () {
      if (this.albums !== null) {
        if (this.albums.length) {
          return true
        }
      }

      return false
    }
  },
  methods: {
    albumKey (album) {
      return md5(`${album.artistName}${album.name}`)
    }
  },
  created () {
    firebase.getDB(`/user-albums/${store.state.user.uid}`)
    .then(result => {
      const value = result.val()

      if (value) {
        const rateds = Object.keys(value).map(key => {
          return value[key]
        })

        this.albums = rateds.sort((a, b) => b.updatedAt - a.updatedAt)
      }
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
