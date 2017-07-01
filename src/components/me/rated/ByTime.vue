<template>
  <div>
    <template v-if="sortedAlbums !== null"> 
      <div class="album-grid" v-if="albums.length">
        <album class="album" v-for="album of sortedAlbums" :key="albumKey(album)" :album="album" :isPlayCount="false"></album>
      </div>
      <div v-else>
        아직 평가한 앨범이 없어요 ㅜㅅㅜ<br>
        위의 "최근 들은 앨범" 메뉴로 이동해서 평가를 시작하세요!
      </div>
    </template>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import Album from 'components/Album'

export default {
  props: ['albums', 'order'],
  components: {
    Album
  },
  data () {
    return {
      sortedAlbums: null
    }
  },
  methods: {
    albumKey (album) {
      return md5(`${album.artistName}${album.name}`)
    },
    sortAlbums () {
      if (this.order === 'asc') {
        this.sortedAlbums = this.albums.sort((a, b) => a.updatedAt - b.updatedAt)
      }
      else {
        this.sortedAlbums = this.albums.sort((a, b) => b.updatedAt - a.updatedAt)
      }
    }
  },
  watch: {
    order () {
      this.sortAlbums()
    }
  },
  created () {
    this.sortAlbums()
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
