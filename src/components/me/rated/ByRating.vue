<template>
  <div>
    <template v-if="!isAllAlbumsEmpty">
      <div v-for="(currentAlbums, i) of reversedClassifiedAlbums">
        <template v-if="currentAlbums.length">
          <div class="rating">
            <span class="label bg-blue-grey-10 text-white">
              <i class="left-detail">star</i> {{10 - i}}
            </span>
          </div>

          <div class="album-grid">
            <album class="album" v-for="album of currentAlbums" :key="albumKey(album)" :album="album" :isPlayCount="false" @changeRate="changeRate"></album>
          </div>
        </template>
      </div>
    </template>
    <div class="no-albums-message" v-else>
      아직 평가한 앨범이 없어요 ㅜㅅㅜ<br>
      위의 "최근 들은 앨범" 메뉴로 이동해서 평가를 시작하세요!
    </div>
  </div>
</template>
<script>
import md5 from 'blueimp-md5'
import Album from 'components/Album'

export default {
  props: ['albums'],
  components: {
    Album
  },
  data () {
    return {
      classifiedAlbums: [[], [], [], [], [], [], [], [], [], []]
    }
  },
  computed: {
    reversedClassifiedAlbums () {
      return this.classifiedAlbums.slice().reverse()
    },
    isAllAlbumsEmpty () {
      return !this.classifiedAlbums.some(element => element.length !== 0)
    }
  },
  methods: {
    albumKey (album) {
      return md5(`${album.artistName}${album.name}`)
    },
    changeRate (targetAlbum, from, to) {
      for (let album of this.classifiedAlbums[from - 1]) {
        if (targetAlbum.name === album.name && targetAlbum.artistName === album.artistName) {
          this.remove(album, from)
          this.add(album, to)
        }
      }
    },
    remove (album, from) {
      const fromAlbums = this.classifiedAlbums[from - 1]
      fromAlbums.splice(fromAlbums.indexOf(album), 1)
      fromAlbums.sort(this.albumsCompare)
      this.classifiedAlbums.splice(from - 1, 1, fromAlbums)
    },
    add (album, to) {
      const toAlbums = this.classifiedAlbums[to - 1]
      toAlbums.push(album)
      toAlbums.sort(this.albumsCompare)
      this.classifiedAlbums.splice(to - 1, 1, toAlbums)
    },
    albumsCompare (a, b) {
      if (a.artistName < b.artistName) return -1
      if (a.artistName > b.artistName) return 1
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    }
  },
  created () {
    for (let album of this.albums) {
      this.classifiedAlbums[album.rating - 1].push(album)
    }

    for (let albums of this.classifiedAlbums) {
      albums.sort(this.albumsCompare)
    }
  }
}
</script>

<style scoped>
.rating {
  padding-left: 2em;
  margin-bottom: 1em;
}

.album-grid {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: strech;
  margin-bottom: 2em;
}

.album-grid>.album {
  flex-basis: 10em;
  flex-grow: 1;
  min-width: 10em;
  max-width: 15em;
}
</style>
