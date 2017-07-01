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
            <album class="album" v-for="album of currentAlbums" :key="albumKey(album)" :album="album" :isPlayCount="false"></album>
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
      return this.classifiedAlbums.reverse()
    },
    isAllAlbumsEmpty () {
      return !this.classifiedAlbums.some(element => element.length !== 0)
    }
  },
  methods: {
    albumKey (album) {
      return md5(`${album.artistName}${album.name}`)
    }
  },
  created () {
    for (let album of this.albums) {
      this.classifiedAlbums[album.rating - 1].push(album)
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
  align-items: strech;
  align-content: strech;

  margin-bottom: 2em;
}

.album-grid>.album {
  flex-basis: 10em;
  flex-grow: 1;
}
</style>
